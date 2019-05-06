<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark:
-->
<template>
    <section class="box">
        <!-- 查询 -->
        <search-box @search="handleSearch" v-model="searchParams" class="search-box"/>
        <section class="main">
            <!-- 表格 -->
            <case-display-table
                class="case-display-table"
                v-model="tableData"
                @rowClick="handleRowClick"
                @selection="handleSelection"
            >
                <!-- 表格下的分页 -->
                <section class="paging-wrap">
                    <section class="paging-btns pull-left">
                        <el-button @click="handlerSubmit" style="margin-left: 5px;" :size="btnSize">提交</el-button>
                        <el-button @click="handlerExport" style="margin-left: 2px;" :size="btnSize">导出</el-button>
                    </section>
                    <v-paging
                        class="paging pull-right"
                        :total="total"
                        ref="paging"
                        layout='total, sizes, prev, next, jumper'
                        @pagingChange="handlePagingChange"
                    ></v-paging>
                </section>
            </case-display-table>
            <!-- 违规信息 -->
            <illegal-information ref="illegalInformation" class="illegal-information"/>
        </section>
        <!-- tabs部份 -->
        <nav-box ref="navBox" @change="handlerTabsChange" class="nav-box"/>
        <!-- 详细 -->
        <component
            :is="temp"
            class="detail-box"
            ref="temp"
        />
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    import busEvent from 'src/busEvent';
    import SearchBox from './template/SearchBox';
    import IllegalInformation from './template/IllegalInformation';
    import CaseDisplayTable from './template/CaseDisplayTable';
    import NavBox from './template/NavBox';
    import DetailBox from './template/DetailBox';

    const DiagnoseTable = () => import(/* webpackChunkName: "group-workbench" */ './info/DiagnoseTable');
    const VisitDetail = () => import(/* webpackChunkName: "group-workbench" */ './info/VisitDetail');
    const CaseDetail = () => import(/* webpackChunkName: "group-workbench" */ './info/CaseDetail');
    const VisitDiagnoseTable = () => import(/* webpackChunkName: "group-workbench" */ './info/VisitDiagnoseTable');
    const CaseDiagnoseTable = () => import(/* webpackChunkName: "group-workbench" */ './info/CaseDiagnoseTable');
    const MedicalInfoTable = () => import(/* webpackChunkName: "group-workbench" */ './info/MedicalInfoTable');
    const ChargeTable = () => import(/* webpackChunkName: "group-workbench" */ './info/ChargeTable');
    const LeaveHosTable = () => import(/* webpackChunkName: "group-workbench" */ './info/LeaveHosTable');
    const CaseOperationTable = () => import(/* webpackChunkName: "group-workbench" */ './info/CaseOperationTable');
    const OperationRecordTable = () => import(/* webpackChunkName: "group-workbench" */ './info/OperationRecordTable');
    const CheckReportTable = () => import(/* webpackChunkName: "group-workbench" */ './info/CheckReportTable');
    const CheckResultsTable = () => import(/* webpackChunkName: "group-workbench" */ './info/CheckResultsTable');
    const IllnessReportTable = () => import(/* webpackChunkName: "group-workbench" */ './info/IllnessReportTable');

    import {getList, submit} from 'js/api/workbench/caseDisplay/index';

    export default {
        data () {
            return {
                temp: 'DiagnoseTable',
                total: 0,
                codes: { // 左边菜单点击时的code
                    diseaseCode: '', // 筛选条件-疾病CODE ,
                    ruleCode: '' // 筛选条件-规则CODE
                },
                pagingData: {
                    limit: CONFIG.limit,
                    offset: 1
                },
                searchParams: {
                    opa: '', // 筛选条件-当地统筹区编码（如深圳、南昌市） ,
                    opaProvince: '', //  筛选条件-当地统筹区编码[省级]（如广东省、黑龙江省等） ,
                    outHpDateEnd: '', // 筛选条件-出院日期结束 ,
                    outHpDateStart: '' // 筛选条件-出院日期开始
                },
                rowData: {},
                tableData: [],
                btnSize: CONFIG.homeBtn,
                selectionList: []
            };
        },
        mounted () {
            this.navBoxDOM = this.$refs.navBox;
            this.illegalInformationDOM = this.$refs.illegalInformation;
            this.pagingDOM = this.$refs.paging;
            busEvent.$on('workbench/caseDisplay.menuSelect', this.menuSelect);
        },
        methods: {
            _getList () { // 获取表格信息
                this._reset();
                let params = Object.assign(
                    {},
                    this.pagingData,
                    this.searchParams,
                    this.codes
                );
                getList(params).then(({data}) => {
                    let {list = [], total = 0, pageNum = 0, pageSize = 0} = data;
                    this.total = total;
                    this.pagingData = {
                        limit: pageSize,
                        offset: pageNum
                    };
                    this.tableData = Object.assign([], list);
                });
            },
            handleSearch () { // 查询
                if (!this.codes.diseaseCode && !this.codes.ruleCode) {
                    this.$toast('请先选择（规则、疾病）');
                    return false;
                }
                this._getList();
            },
            handlerSubmit () { // 提交
                if (this.selectionList.length === 0) {
                    this.$toast('请先选择');
                    return false;
                }
                submit(this.selectionList.map((item) => item.jzcode)).then((result) => {
                    this.$toast('提交成功');
                });
                console.log('提交');
            },
            handlerExport () { // 导出
                console.log('导出');
            },
            handlePagingChange (pagingRes) { // 分页改变
                console.log('分页改变', pagingRes);
                this.pagingData = Object.assign({}, pagingRes);
            },
            handlerTabsChange ({item, index}) { // tabs点击
                console.log('tabs-change', item, index);
                if (this.temp === item.value) {
                    return false;
                }
                this.temp = item.value;
                setTimeout(() => {
                    this.$refs.temp._getData(this.rowData);
                }, 30);
            },
            handleRowClick ({row = {}, event, column}) { // 表格单行点击
                console.log('当某一行被点击时', row, event, column);
                if (this.rowData.jzcode === row.jzcode) {
                    return false;
                }

                this.rowData = Object.assign({}, row);
                this._emitGetData(row);
            },
            handleSelection (selections) { // 表格复选框选择
                this.selectionList = Object.assign([], selections);
                console.log('选择全部   取消全部', selections);
            },
            menuSelect ({key, pathKey, status}) { // 左边菜单选择时
                console.log('左边菜单选择时');
                console.log(key, pathKey, status);
                // 开始获取表格数据 。。。

                if (status === 0) {
                    this.codes = {
                        diseaseCode: '', // 筛选条件-疾病CODE ,
                        ruleCode: key // 筛选条件-规则CODE
                    };
                } else {
                    this.codes = {
                        diseaseCode: key, // 筛选条件-疾病CODE ,
                        ruleCode: '' // 筛选条件-规则CODE
                    };
                }

                this._getList();
                console.log('开始获取表格数据');
            },
            _emitGetData (row) { // 通知子级获取数据
                this.illegalInformationDOM._getData(row);
                this.$refs.temp._getData(row);
            },
            _reset () {
                this.selectionList = [];
                this.$refs.temp._reset();
                this.temp = 'DiagnoseTable';
                this.navBoxDOM._reset();
                this.illegalInformationDOM._reset();
                this.rowData = {};
                this.pagingDOM._init();
                this.pagingData = {
                    limit: CONFIG.limit,
                    offset: 1
                };
                this.total = 0;
            }
        },
        components: {
            SearchBox,
            IllegalInformation,
            CaseDisplayTable,
            NavBox,
            DetailBox,

            DiagnoseTable,
            VisitDetail,
            CaseDetail,
            VisitDiagnoseTable,
            CaseDiagnoseTable,
            MedicalInfoTable,
            ChargeTable,
            LeaveHosTable,
            CaseOperationTable,
            OperationRecordTable,
            CheckReportTable,
            CheckResultsTable,
            IllnessReportTable
        },
        destroyed () {
            busEvent.$off('workbench/caseDisplay.menuSelect');
        }
    };
</script>

<style scoped lang="scss">
    @mixin com() {
        margin-top: 8px;
        background-color: #fff;
    }

    .box {
        display: flex;
        flex-direction: column;
        .search-box {
        }
        .main {
            height: 226px;
            display: flex;
            .case-display-table {
                flex: 1;
                margin-right: 8px;
                @include com;
                .paging-wrap {
                    flex: 0 0 38px;
                    box-sizing: border-box;
                    .paging-btns {
                        padding-top: 2px;

                    }
                    .paging {
                        padding-top: 3px;
                        padding-bottom: 0;
                    }
                }
            }
            .illegal-information {
                flex: 0 0 340px;
                @include com;
            }
        }
        .nav-box {
            height: 30px;
            @include com;
        }
        .detail-box {
            flex: 1;
            height: 410px;
            //@include com;
            background-color: #fff;
        }
    }
</style>
