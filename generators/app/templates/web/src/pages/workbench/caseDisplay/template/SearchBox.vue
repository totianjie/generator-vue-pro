<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 查询区域
-->
<template>
    <v-search-box class="wrapper">
        <div>
            <el-col :span="10" class="m-t-8">
                <v-input label="出院日期：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-date-picker
                        :size="formSize"
                        class="w-fill"
                        v-model.trim="dates"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        range-separator="至"
                        @change="handlerChange"
                        :clearable="false"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8">
                <v-input label="区域：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-cascader
                        :size="formSize"
                        expand-trigger="hover"
                        placeholder="请选择"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleCascaderChange">
                    </el-cascader>
                </v-input>
            </el-col>
        </div>
        <div slot="btn">
            <el-button @click="handlerSearch" type="primary" class="m-l-20" :size="btnSize">查询</el-button>
        </div>
    </v-search-box>
</template>

<script>
    import CONFIG from 'src/config';
    import {getListOpa} from 'js/api/workbench/caseDisplay/index';

    export default {
        data () {
            return {
                span: 8,
                lableWidth: 136,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                dates: [],
                options: [],
                selectedOptions: []
            };
        },
        props: {
            value: {
                type: [Object],
                default: {
                    opa: '', // 筛选条件-当地统筹区编码（如深圳、南昌市） ,
                    opaProvince: '', //  筛选条件-当地统筹区编码[省级]（如广东省、黑龙江省等） ,
                    outHpDateEnd: '', // 筛选条件-出院日期结束 ,
                    outHpDateStart: '' // 筛选条件-出院日期开始
                }
            }
        },
        created () {
            getListOpa().then((res) => {
                this.options = Object.assign([], res.data);
                console.log(this.options);
            });
        },
        methods: {
            handlerSearch () { // 查询
                console.log('查询');
                this.$emit('search');
            },
            handlerChange () { // 时间选择
                let [outHpDateStart, outHpDateEnd] = this.dates;
                console.log('时间选择', outHpDateStart, outHpDateEnd);
                this.$emit('input', Object.assign({}, this.value, {outHpDateStart, outHpDateEnd}));
            },
            handleCascaderChange ([opaProvince, opa]) { // 区域选择时
                console.log(opaProvince, opa);
                this.$emit('input', Object.assign({}, this.value, {opaProvince, opa}));
            }
        }
    };
</script>

<style scoped>
    .wrapper {
        background-color: #fff;
    }
</style>
