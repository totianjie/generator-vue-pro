<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark:
-->
<template>
    <section class="box">
        <!--table部分-->
        <section class="main">
            <!-- 表格 -->
            <case-info-display-table
                class="case-display-table"
                v-model="tableData"
                :currentItem="currentItem"
                @rowClick="handleRowClick"
                @selection="handleSelection"
                ref="caseDislayRef"

            >
                <!-- 表格下的分页 -->
                <section class="paging-wrap">
                    <v-paging
                        class="paging pull-right"
                        :total="total"
                        ref="pagingRef"
                        layout='total, sizes, prev, next, jumper'
                        @pagingChange="handlePagingChange"
                    ></v-paging>
                </section>
            </case-info-display-table>
            <!-- 违规信息 -->
            <illegal-information :currentItem="currentItem"
                                 ref="illegalInformationRef"
                                 class="illegal-information float-last"/>
        </section>
        <section class="auditCase-main">
            <section class="auditCase-detail">
                <!--nav部份 -->
                <nav-box ref="navBoxRef" @change="handlerTabsChange" :pageType="pageType" class="nav-box"/>
                <!-- 详细 -->
                <component :is="temp" class="detail-box" ref="temp"/>
            </section>
            <!--疑点审核-->
            <case-audit-form :currentItem="currentItem" ref="caseAuditFormRef" @success="refresh" class="case-audit-form" :pageType="pageType" v-show="pageType !=='all'"/>
        </section>
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    // import busEvent from 'src/busEvent';
    import SearchBox from './template/SearchBox';
    import IllegalInformation from './template/IllegalInformation';
    import CaseInfoDisplayTable from './template/CaseInfoDisplayTable';

    import NavBox from './template/NavBox';
    import DetailBox from './template/DetailBox';
    import CaseAuditForm from './template/CaseAuditForm';

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

    import {getList, submit} from 'js/api/workbench/auditCase/index';
    import {beginDate} from './list.js';

    export default {
        data () {
            return {
                showSearch: false,
                temp: 'DiagnoseTable',
                total: 0,
                codes: { // 左边菜单点击时的code
                    diseaseCode: '', // 筛选条件-疾病CODE ,
                    orgCode: '', // 医院code
                    ruleCode: '' // 筛选条件-规则CODE
                },
                showNav: true,
                rowData: {},
                tableData: [],
                btnSize: CONFIG.homeBtn,
                selectionList: []
            };
        },
        mounted () {
            this.$nextTick(() => {
                this.navBoxDOM = this.$refs.navBoxRef;
                this.illegalInformationDOM = this.$refs.illegalInformationRef;
                this.pagingDOM = this.$refs.pagingRef;
                this.caseAuditFormDom = this.$refs.caseAuditFormRef;
            });
        },
        created () {
            console.log('tag-page2--->', this.pageType);
        },
        props: {
            pageType: {
                type: String,
                default: 'all'
            },
            currentItem: {
                type: Object,
                default: {
                    current: '',
                    nodeName: '',
                    nodeCode: ''
                }
            },
            pagingData: {
                type: Object,
                default: {
                    limit: CONFIG.limit,
                    offset: 1
                }
            },
            searchParameter: {
                type: Object,
                default: {

                }
            }
        },
        watch: {
            pageType (val) {
                console.log('tag-pageType--->', val);
                this._reset();
            }
        },
        methods: {
            defaultResult () {
                this.searchParameter = {
                    outHpDateEnd: new Date().getTime(),
                    outHpDateStart: this.stringToDate(beginDate).getTime()
                };
                this._getList();
            },
            testSS (q1, q2 = {}) {
            },
            _getList () { // 获取表格信息
                try {
                    console.log('_getList', this.searchParams, this.searchParameter);
                    if (!this.searchParameter === undefined || this.searchParameter === null || this.searchParameter === {}) {
                        this.defaultResult();
                        return;
                    }
                    if (this.searchParameter.outHpDateStart === 0) {
                        this.searchParameter.outHpDateStart = '';
                        this.searchParameter.outHpDateEnd = '';
                    }
                    let params = Object.assign(
                        {},
                        this.searchParameter,
                        this.pagingData,
                        this.codes,
                        {nodeCode: this.currentItem.nodeCode || ''}
                    );
                    console.log('_getList', params);
                    getList(params).then(({data}) => {
                        let {list = [], total = 0} = data;
                        this.total = total;
                        // this.pagingData = {
                        //     limit: pageSize,
                        //     offset: pageNum
                        // };
                        this.tableData = Object.assign([], list);
                        if (this.tableData.length === 0 && this.pageType !== 'all') {
                            this.$emit("refresh", "Aside");
                        }
                    });
                } catch (error) {
                    console.error('error', error);
                }
            },
            refresh (val) {
                if (this.illegalInformationDOM) {
                    this.illegalInformationDOM._reset();
                }
                if (this.$refs.temp) {
                    this.$refs.temp._reset();
                }
                if (this.caseAuditFormDom) {
                    this.caseAuditFormDom._reset();
                }
                this._getList();
            },
            handleSearch () { // 查询
                if (!this.codes.diseaseCode && !this.codes.ruleCode && !this.codes.orgCode) {
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
                this._getList();
            },
            handlerTabsChange ({item, index}) { // tabs点击
                console.log('tabs-change', item, index);
                if (this.temp === item.value) {
                    return false;
                }
                this.temp = item.value;
                setTimeout(() => {
                    if (this.$refs.temp) {
                        this.$refs.temp._getData(this.rowData);
                    }
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
                console.info('key=>', key, 'pathKey=>', pathKey, 'status=>', status);
                this._reset();
                // 开始获取表格数据 。。。
                if (status === 0) {
                    this.codes = {
                        diseaseCode: '', // 筛选条件-疾病CODE ,
                        orgCode: '',
                        ruleCode: pathKey[1] // 筛选条件-规则CODE
                    };
                } else if (status === 1) {
                    this.codes = {
                        diseaseCode: pathKey[1], // 筛选条件-疾病CODE ,
                        orgCode: '',
                        ruleCode: '' // 筛选条件-规则CODE
                    };
                } else if (status === 2) {
                    this.codes = {
                        orgCode: pathKey[0], // 筛选条件-医院 CODE
                        diseaseCode: '', // 筛选条件-疾病CODE ,
                        ruleCode: pathKey[1] || '' // 筛选条件-规则CODE
                    };
                }
                this._resetChildren();
                this._getList();
                console.log('开始获取表格数据');
            },
            _emitGetData (row) { // 通知子级获取数据
                if (this.$refs.temp) {
                    this.$refs.temp._reset();
                    if (this.navBoxDOM) {
                        this.navBoxDOM._reset();
                    }
                    this.temp = 'DiagnoseTable';
                    console.info('tag', this.temp);
                    setTimeout(() => {
                        this.$refs.temp._getData(this.rowData);
                    }, 50);
                }
                if (this.caseAuditFormDom) {
                    this.caseAuditFormDom._reset(row);
                }
                if (this.illegalInformationDOM) {
                    this.illegalInformationDOM._reset();
                    setTimeout(() => {
                        this.illegalInformationDOM._getData(row);
                    }, 50);
                }
            },
            _resetChildren () {
                if (this.illegalInformationDOM) {
                    this.illegalInformationDOM._reset();
                }
                this.selectionList = [];
                if (this.$refs.temp) {
                    this.$refs.temp._reset();
                }
                this.temp = 'DiagnoseTable';
                if (this.navBoxDOM) {
                    this.navBoxDOM._reset();
                }
                if (this.caseAuditFormDom) {
                    this.caseAuditFormDom._reset();
                }
                this.rowData = {};
                this.tableData = [];
            },
            _reset (flag = false) {
                if (this.illegalInformationDOM) {
                    this.illegalInformationDOM._reset();
                }
                this.selectionList = [];
                if (this.$refs.temp) {
                    this.$refs.temp._reset();
                }
                this.temp = 'DiagnoseTable';
                if (this.navBoxDOM) {
                    this.navBoxDOM._reset();
                }
                if (this.caseAuditFormDom) {
                    this.caseAuditFormDom._reset();
                }
                this.rowData = {};
                this.tableData = [];
                // 以下代码是否恢复默认情况
                if (flag) {
                    if (this.pagingDOM) {
                        this.pagingDOM._init();
                    }
                }
                this.codes = {
                    diseaseCode: '', // 筛选条件-疾病CODE ,
                    orgCode: '',
                    ruleCode: ''
                };
                this.pagingData.offset = 1;
                this.total = 0;
                if (this.$refs.caseDislayRef) {
                    this.$refs.caseDislayRef._reset();
                }
            }
        },
        components: {
            SearchBox,
            IllegalInformation,
            CaseInfoDisplayTable,
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
            IllnessReportTable,
            CaseAuditForm
        },
        destroyed () {
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
            height: 250px;
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
            height: calc(100% - 38px);
            background-color: #fff;
        }

        .auditCase-main{
            display: flex;
            width: 100%;
            height: calc(100% - 250px);
            .auditCase-detail{
                flex: 1;
                overflow: hidden;
            }
            .case-audit-form{
                flex: 0 0 340px;
                @include com;
                margin-left: 8px;
                overflow: hidden;
                overflow-y: auto;
            }
        }
    }
</style>
