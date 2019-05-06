<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 查询区域
-->
<template>
    <v-search-box class="wrapper">
        <div>
            <el-col :span="span" class="m-t-8">
                <v-input label="出院日期：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-date-picker
                        :size="formSize"
                        class="w-fill"
                        v-model="dates"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        range-separator="至"
                        :editable="false"
                        @change="handlerChange"
                        :picker-options="pickerOptions"
                        :clearable="true"
                        start-placeholder="开始日期"
                        @blur="blur"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8" v-if="pageType==='all'">
                <v-input label="就诊编号：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-input @blur="searchCheck" maxlength="30" v-model.trim="jzCode" placeholder="请输入" :size="formSize" :class="!check?'red-border':''"></el-input>
                </v-input>
            </el-col>
            <el-col :span="4" class="m-t-8" v-if="pageType==='all' && !check" style="height: 32px;">
                <div style="line-height: 32px;margin-left: 20px;color:#f56c6c;font-size: 12px;">
                    请输入正确的就诊编号
                </div>
            </el-col>
        </div>
        <div slot="btn">
            <el-button  type="primary" @click="outPut"  :size="btnSize">导出</el-button>
            <el-button @click="handlerSearch" type="primary" class="m-l-20" :size="btnSize">查询</el-button>
        </div>
    </v-search-box>
</template>

<script>
import CONFIG from "src/config";
import {outPutExcel} from 'src/js/api/workbench/auditCase';
export default {
    data () {
        return {
            date1: Object,
            date2: Object,
            check: true,
            jzCode: "",
            span: 8,
            lableWidth: 136,
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            dates: [],
            options: [],
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now();
                }
            },
            selectedOptions: []
        };
    },
    props: {
        value: {
            type: [Object],
            default: {
                opa: "", // 筛选条件-当地统筹区编码（如深圳、南昌市） ,
                outHpDateEnd: "", // 筛选条件-出院日期结束 ,
                outHpDateStart: "" // 筛选条件-出院日期开始
            }
        },
        pageType: {
            type: String,
            default: "all"
        }
    },
    created () {
    // getListOpa().then((res) => {
    //     this.options = Object.assign([], res.data);
    // // });
    // let date1 = this.stringToDate(beginDate).getTime();
    // let date2 = new Date().getTime();
    // this.dates = [date1, date2];
    },
    mounted () {
        this.date1 = this.$el.getElementsByClassName("el-range-input")[0];
        this.date2 = this.$el.getElementsByClassName("el-range-input")[1];
    },
    watch: {
        pageType (newList, oldList) {
            console.log(newList, oldList);
        }
    },
    methods: {
        outPut () {
            let startDate = '';
            let endDate = '';
            if (this.dates !== null) {
                let [outHpDateStart = 0, outHpDateEnd = 0] = this.dates;
                startDate = outHpDateStart;
                endDate = outHpDateEnd;
            }
            let obj = {startDate, endDate};
            console.log('outPut', obj);
            outPutExcel(obj).then(res => {
                this._$download(res);
            });
        },
        blur (self) {
            // let p1 = this.date1.value;
            // let p2 = this.date2.value;
            // let p3 = this.stringToDate(p1).getTime();
            // let p4 = this.stringToDate(p2).getTime();
            // let p5 = new Date().getTime();
            // console.log('blur', p3, p4, p5, p1, p2);
            // if (p3 > p4) {
            //     alert(3);
            // } else if (p3 > p5) {
            //     alert(2);
            // } else if (p4 > p5) {
            //     alert(1);
            // }
            // console.log('dataPickerFun', val);
            // let self = this;
            // return {
            //     disabledDate (time) {
            //         let [outHpDateStart, outHpDateEnd] = self.dates;
            //         return outHpDateStart < outHpDateEnd;
            //     }
            // };
        },
        stringToDate (dateStr, separator = "-") {
            console.log("stringToDate", dateStr);
            let dateArr = dateStr.split(separator);
            let year = parseInt(dateArr[0]);
            let month;
            // 处理月份为04这样的情况
            let temp = typeof dateArr[1] === "string" ? dateArr[1] : dateArr[1] + "";
            if (temp.indexOf("0") === 0) {
                month = parseInt(dateArr[1].substring(1));
            } else {
                month = parseInt(dateArr[1]);
            }
            let day = parseInt(dateArr[2]);
            let date = new Date(year, month - 1, day);
            console.log("stringToDate", date);
            return date;
        },
        searchCheck (val) {
            console.log('searchCheck', this.jzCode);
            if (this.jzCode === '') {
                this.check = true;
                return;
            }
            if (/^[0-9a-zA-Z，。、·\！@#￥%……&*（）——+=\-；‘’：“”\/\{\}【】\|？《》~`\!@#$%^&*\(\)_+,\.\/\?\>\<;’:”\[\]\{\}=\-~+\-.ωαβ]+$/.test(this.jzCode)) {
                this.check = true;
                console.info('searchCheck', this.jzCode);
            } else {
                this.check = false;
                console.info('searchCheck', this.jzCode);
            }
        },
        _reset () {
            console.info("tag", "_reset-search");
            console.info("tag", this.pageType);
            this.dates = [];
            this.jzCode = "";
        },
        handlerSearch () {
            // 查询
            if (!this.check) {
                return;
            }
            console.log("查询");
            try {
                if (this.dates === null) {
                    this.$emit("search", {
                        jzCode: this.jzCode,
                        jzcode: this.jzCode,
                        outHpDateStart: 0,
                        outHpDateEnd: 0
                    });
                    return;
                }
                let [outHpDateStart = 0, outHpDateEnd = 0] = this.dates;
                if (outHpDateStart !== 0) {
                    let timeAmp = new Date().getTime();
                    if (outHpDateEnd > timeAmp) {
                        this.$toast("结束日期均不能晚于当前日期");
                        return;
                    }
                }
                // if (outHpDateStart === 0) {
                //     this.$toast("请填写开始日期和结果日期后查询");
                //     return;
                // }
                console.log('tag1', this.jzCode);
                console.log('tag2', outHpDateStart);
                console.log('tag3', outHpDateEnd);
                console.warn('tag', {jzCode: this.jzCode, outHpDateStart: outHpDateStart, outHpDateEnd: outHpDateEnd});
                this.$emit("search", {
                    jzcode: this.jzCode,
                    jzCode: this.jzCode,
                    outHpDateStart: outHpDateStart,
                    outHpDateEnd: outHpDateEnd
                });
            } catch (error) {
                console.error(error);
                
            }
        },
        formatDateTime (inputTime) {
            let date = new Date(inputTime);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            let d = date.getDate();
            d = d < 10 ? "0" + d : d;
            let h = date.getHours();
            h = h < 10 ? "0" + h : h;
            let minute = date.getMinutes();
            let second = date.getSeconds();
            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;
            return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
        },
        handlerChange () {
            // 时间选择
            console.log("时间选择", this.dates);
            if (this.dates === null) {
                return;
            }
            try {
                let [outHpDateStart, outHpDateEnd] = this.dates;
                let timeAmp = new Date().getTime();
                if (outHpDateEnd > timeAmp) {
                    this.$toast("开始和结束日期均不能晚于当前日期");
                    return;
                }
                console.log("时间选择", outHpDateStart, outHpDateEnd);
                this.$emit(
                    "input",
                    Object.assign({}, this.value, { outHpDateStart, outHpDateEnd })
                );
            } catch (e) {
                console.error('handlerChange', this.dates);
            }
        },
        getNowFormatDate () {
            let date = new Date();
            // let seperator1 = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = year + "年" + month + "月" + strDate + "日";
            return currentdate;
        }
    }
};
</script>

<style scoped>
    .wrapper {
      background-color: #fff;

    }
    .export {
        color: #fff;
    }
    /deep/ .red-border .el-input__inner{
        border-color: #f56c6c;
    }
</style>
