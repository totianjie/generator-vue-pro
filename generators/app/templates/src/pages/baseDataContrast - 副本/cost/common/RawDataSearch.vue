<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-02 11:06:47
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-02 11:06:47
* @remark: 左边  原始数据模块  查询
-->
<template>
    <v-search-box>
        <div>
            <el-col :span="span">
                <v-input label="数据批次：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <v-select
                        v-model.trim="searchParams.batchNo"
                        :list="batchNOList"
                        :props="selectProps"
                        :size="formSize"
                    >
                    </v-select>
                </v-input>
            </el-col>
            <el-col :span="span">
                <v-input label="原始项目编码：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-input v-model.trim="searchParams.instCatalogCode" placeholder="请输入原始项目编码" :size="formSize"></el-input>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8">
                <v-input label="标准名称：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-input v-model.trim="searchParams.catalogName" placeholder="请输入标准名称" :size="formSize"></el-input>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8">
                <v-input label="原始项目名称：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-input v-model.trim="searchParams.instCatalogName" placeholder="请输入原始项目名称" :size="formSize"></el-input>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8">
                <v-input label="对照时间：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-date-picker
                        :size="formSize"
                        class="w-fill"
                        v-model.trim="dates"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        range-separator="至"
                        @change="handlerChange"
                        :clearable="true"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8">
                <v-input label="对照人：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-input v-model.trim="searchParams.compareOptUser" placeholder="请输入对照人" :size="formSize"></el-input>
                </v-input>
            </el-col>
        </div>
        <div slot="btn">
            <el-button @click="handlerSearch" type="primary" class="m-l-20" :size="btnSize">查询</el-button>
            <el-button @click="handlerClear" type="primary" style="margin-left: 20px; margin-top: 8px;" class="m-l-20 block" :size="btnSize">清空</el-button>
            <el-button @click="handlerSetting" type="primary" style="margin-left: 20px; margin-top: 8px;" class="m-l-20 block" :size="btnSize">设置</el-button>
        </div>
        <table-col-setting ref="setting" type="cost"/>
    </v-search-box>
</template>
<script>
    import CONFIG from 'src/config';
    import TableColSetting from './../../components/TableColSetting';
    export default {
        data () {
            return {
                lableWidth: 136,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                selectProps: {
                    name: 'keyName',
                    value: 'keyValue'
                },
                dates: []
            };
        },
        computed: {
            span () {
                // return this.tabsActive !== 4 ? 12 : 8;
                return this.tabsActive !== 4 ? 12 : 12;
            }
        },
        props: {
            searchParams: {
                type: Object,
                default () {
                    return {
                        compareOptUser: '', // 对照人
                        batchNo: '', //  批次号
                        instCatalogCode: '', // 原始疾病编码
                        instCatalogName: '', // 原始疾病名称
                        catalogName: '', // 标准疾病名称
                        startTime: '', // 筛选条件-起始时间
                        endTime: '' // 筛选条件-结束时间
                    };
                }
            },
            tabsActive: {
                type: [Number],
                default: 0
            },
            batchNOList: {
                type: Array,
                default: []
            }
        },
        mounted () {
            let {startTime, endTime} = this.searchParams;
            startTime && this.dates.push(startTime);
            endTime && this.dates.push(endTime);
        },
        methods: {
            // 查询
            handlerSearch () {
                let bSing = false;
                for (let value of Object.values(this.searchParams)) {
                    if (value) {
                        bSing = true;
                        break;
                    }
                }
                if (bSing) {
                    this.$emit('update:searchParams', this.searchParams);
                    this.$emit('search', this.searchParams);
                    return false;
                }
                this.$toast('请输入查询条件');
            },
            handlerClear () { // 清空
                // this.dates = [];
                this.$emit('clear');
            },
            handlerChange () {
                console.log(this.dates);
                let [startTime = '', endTime = ''] = this.dates || [];
                this.searchParams.startTime = startTime;
                this.searchParams.endTime = endTime;
            },
            handlerSetting () {
                this.$refs.setting.setting();
            }
        },
        components: { TableColSetting }
    };
</script>
<style scoped>
    .m-t-8 {
        margin-top: 8px;
    }
</style>

