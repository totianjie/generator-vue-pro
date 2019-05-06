<!-- Created by TIANJIE on 2018/6/7 -->
<template>
    <div class="over-hidden">
        <v-search-box>
            <div>
                <el-col :span="span">
                    <v-input label="关键词：" :labelWidth="75" :pxUnit="true">
                        <el-input @blur="searchCheck" v-model="name" placeholder="请输入关键词" :size="formSize"></el-input>
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="日期：" :labelWidth="70" :pxUnit="true">
                        <el-date-picker
                            :size="formSize"
                            value-format="yyyy-MM-dd"
                            class="w-fill"
                            v-model="date"
                            type="daterange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="状态：" :labelWidth="70" :pxUnit="true">
                        <v-select v-model="status" :list="options" :size="formSize" class="w-fill" :props="selectProps" placeholder="请选择" />
                    </v-input>
                </el-col>
            </div>
            <div slot="btn">
                <el-button @click="handlerSearch" :size="btnSize">查询</el-button>
            </div>
        </v-search-box>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        props: {},
        data () {
            return {
                selectProps: {
                    name: 'label',
                    value: 'value'
                },
                name: '',
                status: '',
                span: 8,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                date: '',
                options: [
                    {
                        value: '0',
                        label: '禁用'
                    },
                    {
                        value: '1',
                        label: '启用'
                    }
                ],
                pickerOptions: {
                    disabledDate (time) {
                        return time.getTime() > Date.now();
                    }
                }
            };
        },

        computed: {
            beginDate () {
                return Array.isArray(this.date) ? this.date[0] : '';
            },
            endDate () {
                return Array.isArray(this.date) ? this.date[1] : '';
            }
        },

        watch: {
            name (val) {
                this.changeText(val);
            }
        },

        methods: {
            searchCheck (data) {
                if (typeof data !== 'string') {
                    return true;
                }
                if (!data.length) {
                    return true;
                }
                
                let pattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
                if (!pattern.test(data)) {
                    this.$toast('输入不正确（须中文、英文、数字输入），请重新输入');
                    return false;
                }
                return true;
            },
            changeText (data) {
                if (typeof data !== 'string') {
                    return true;
                }
                if (!data.length) {
                    return true;
                }
                
                let pattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
                let patternArr = data.split("'");
                var resultPattern = true;
                for (let i = 0; i < patternArr.length; i++) {
                    resultPattern = patternArr[i].length ? true : false && resultPattern;
                }
                if (!pattern.test(data) && !resultPattern) {
                    this.$toast('输入不正确（须中文、英文、数字输入），请重新输入');
                    return false;
                }
                return true;
            },
            handlerSearch () {
                if (!this.searchCheck(this.name)) {
                    return;
                }
                let keyWordSearch = this.name.replace(/%/, '');
                let form = {
                    keyword: keyWordSearch,
                    name: keyWordSearch,
                    status: this.status,
                    beginDate: this.beginDate,
                    endDate: this.endDate
                };
                this.$emit('search', form);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .m-t-5 {
        margin-top: 5px;
    }
    /deep/ .v-search-box > .input-wrap {
        width: calc(100% - 140px) !important;
        padding-right: 20px !important;
    }
    /deep/ .v-search-box > .btn-wrap {
        width: 106px !important;
    }
</style>
