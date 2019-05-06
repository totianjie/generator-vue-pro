<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-01 16:48:23
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-01 16:48:23
* @remark: 左边  原始数据模块
-->
<template>
    <section class="h-fill">
        <main class="main-wrap">
            <raw-data-search
                :batchNOList="batchNOList"
                @search="handleSearch"
                :searchParams.sync="searchParams"
                :tabsActive="tabsActive"
                @clear="handlerClear"
            />
            <tabs @tabsClick="handleTabsClick" :tabsData="tabsData" :tabsActive="tabsActive"/>
            <btns @submit="handleSubmit" :tabsActive="tabsActive"/>
            <raw-data-table
                v-if="tabsActiveChange"
                :rawData.sync="rawData"
                :rawDataList.sync="rawDataList"
                :tableData="tableData"
                @sort="handleSort"
                ref="rawDataTable"
                :detailDialog="detailDialog"
                :detailDialogData="detailDialogData"
                @checkDetail="handlerCheckDetail"
                :style="{height: setTableHeight}"
                @deleteDetail="handleDelete"
                @closeDetail="handleCloseDetail"
                :sortObj="sortObj"
                :tabsActive="tabsActive"
            />
        </main>
        <v-paging
            :total="total"
            ref="paging"
            @pagingChange="handlePagingChange"
            :pageSize="pagingParams.limit"
        ></v-paging>
        <el-dialog
            :visible.sync="dialogShow"
            width="40%"
            min-width="500"
            class="dialog"
            @close="dialogShow = false"
        >
            <span class="dialog-title" slot="title">多项对照审核</span>
            <div style="max-height: 350px; overflow-y: auto;">
                <v-item-detail :pxUnit="true" :labelWidth="labelWidth" label="选定的原始名称数量：" :span="span">
                    <span class="block text-ellipsis" v-text="rawDataList.length"></span>
                </v-item-detail>
                <v-item-detail :pxUnit="true" :labelWidth="labelWidth" label="选定的标准名称数量：" :span="span">
                    <span class="block text-ellipsis" v-text="standardDataList.length"></span>
                </v-item-detail>
                <v-item-detail class="item-detail" :border="false" :pxUnit="true" :labelWidth="labelWidth" label="原始名称：" :span="span">
                    <ul class="dialog-list">
                        <li class="dialog-item" v-for="(item, index) in rawDataList" :key="index" :title="item.instCatalogName" v-text="item.instCatalogName"></li>
                    </ul>
                </v-item-detail>
                <v-item-detail class="item-detail" :border="false" :pxUnit="true" :labelWidth="labelWidth" label="标准名称：" :span="span">
                    <ul class="dialog-list">
                        <li class="dialog-item" v-for="(item, index) in standardDataList" :key="index" :title="item.catalogName" v-text="item.catalogName"></li>
                    </ul>
                </v-item-detail>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button :size="btnSize" @click="dialogShow = false">取消</el-button>
                <el-button :size="btnSize" type="primary" @click="handlerDialogVisible">确定</el-button>
            </span>
        </el-dialog>
        <!-- 自动对照 -->
        <el-dialog
            :visible.sync="automaticControlShow"
            width="40%"
            min-width="500"
            class="dialog"
            @close="automaticControlShow = false"
        >
        <span class="dialog-title" slot="title">自动对照</span>
        <div style="max-height: 350px; overflow-y: auto;">
            <v-input label="数据批次：" :pxUnit="true" :labelWidth="lableWidth">
                <v-select
                    v-model.trim="automaticControlParams.batchNo"
                    :list="batchNOList"
                    :props="selectProps"
                    :size="formSize"
                >
                </v-select>
            </v-input>
            <v-input class="m-t-10" label="数据来源：" :pxUnit="true" :labelWidth="lableWidth">
                <el-radio v-model="automaticControlParams.dataFrom" label="1">收费</el-radio>
                <el-radio class="m-l-10" v-model="automaticControlParams.dataFrom" label="2">医嘱</el-radio>
            </v-input>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button :size="btnSize" @click="automaticControlShow = false">取消</el-button>
            <el-button :size="btnSize" type="primary" @click="_handleAutomaticControl">确定</el-button>
        </span>
        </el-dialog>

        <!-- 同步 -->
        <el-dialog
            :visible.sync="synchronousShow"
            width="40%"
            min-width="500"
            class="dialog"
            @close="synchronousShow = false"
        >
        <span class="dialog-title" slot="title">同步</span>
        <div style="max-height: 350px; overflow-y: auto;">
            <v-input v-show="!rawDataList.length" label="数据批次：" :pxUnit="true" :labelWidth="lableWidth">
                <v-select
                    v-model.trim="synchronousParams.batchNo"
                    :list="batchNOList"
                    :props="selectProps"
                    :size="formSize"
                >
                </v-select>
            </v-input>
            <span 
                v-show="rawDataList.length"
                style="display: block; line-height: 22px; text-align: center;"
            >
                同步功能只针对数据状态为“已审核（已对照）”、“已审核（不能对照）”;其他状态的数据不作处理；是否确认本操作？
            </span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button :size="btnSize" @click="synchronousShow = false">取消</el-button>
            <el-button :size="btnSize" type="primary" @click="_handleSynchronous">确定</el-button>
        </span>
        </el-dialog>
    </section>
</template>
<script>
    import Tabs from './../../components/Tabs';
    import RawDataSearch from './RawDataSearch';
    import RawDataTable from './RawDataTable';
    import Btns from './Btns';
    import CONFIG from 'src/config';
    import busEvent from 'src/busEvent';
    import {
        getDiseaseRelationList,
        audit, // 审核
        cancelAudit, // 撤销审核
        getItemData, // 根据id获取单个疾病对照数据
        match, // 对照操作
        noMatch, // 不能对照操作
        submit, // 提交
        statistics, // 统计数
        manytoone, // 多对一
        onetomany, // 一对多
        matchingCatalog,
        exportTpl,
        synAuditDataByBatchNo,
        synAuditDataByIds
    } from "js/api/baseDataContrast/cost";

    export default {
        data () {
            return {
                tabsActiveChange: true,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                detailDialog: false, // 查看详情
                detailDialogData: [], // 详情数据
                rawData: null, // 原始数据是否被单选了，如果单选了就会是一个对象，没有被单选时是一个null
                rawDataList: [], // 原始数据是否被多选了，如果多选了就是数组中就有值，没有多选数组就为空
                standardData: null, // 标准数据是否被单选了，如果单选了就会是一个对象，没有被单选时是一个null
                standardDataList: [], // 标准数据是否被多选了，如果多选了就是数组中就有值，没有多选数组就为空
                dialogShow: false, // 多项对照dialog
                labelWidth: 150,
                span: 5,
                /* 自动对照相关数据 start */
                automaticControlShow: false, // 自动对照
                selectProps: {
                    name: 'keyName',
                    value: 'keyValue'
                },
                lableWidth: 100,
                automaticControlParams: { // 自动对照参数
                    batchNo: '', // 数据批次
                    dataFrom: '', // 数据来源：1-费用明细 2-医嘱 ,
                    status: 0 // 筛选状态-0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照 ,
                },
                /* 自动对照相关数据 end */
                /* 同步start */
                synchronousShow: false,
                synchronousParams: {
                    batchNo: ''
                }
                /* 同步end */
            };
        },
        props: {
            tabsActive: {
                type: [Number],
                default: 0
            },
            batchNOList: {
                type: Array,
                default: []
            },
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            },
            searchParams: {
                type: Object,
                default () {
                    return { // 查询的参数
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
            tabsStatus: {
                type: [Object, Number, String],
                default: null
            },
            pagingParams: {
                type: Object,
                default () {
                    return {
                        limit: CONFIG.limit,
                        offset: 1
                    };
                }
            },
            total: {
                type: [Number, String],
                default: 0
            },
            tabsData: { // tabs页面数据
                type: Array,
                default: []
            },
            sortObj: {
                type: Object,
                default: function () {
                    return { // 排序
                        orderByName: null,
                        orderBy: null // orderBy 排序（1 升序，2 降序）
                    };
                }
            },
            oldSearchParams: { // // 查询条件只保留用户点击查询时的条件，双击，单击对照等情况下输入的条件都不带入
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        computed: {
            setTableHeight () {
                // return this.tabsActive === 4 ? 'calc(100% - 44px - 33px - 88px)' : 'calc(100% - 44px - 33px - 128px)';
                return 'calc(100% - 44px - 33px - 128px)';
            }
        },
        mounted () {
            // 标准数据  checkbox选择变化
            busEvent.$on('baseDataContrast/operation/common/StandardData.standardDataList', (arr = []) => {
                console.log('标准数据多选 数据 变化', arr);
                this.standardDataList = arr;
            });
            // 标准数据  dbClick  双击
            busEvent.$on('baseDataContrast/operation/common/StandardData.dbClick', (json = null) => {
                if (this.rawData === null) {
                    this.$toast('请选择原始数据');
                    return false;
                }
                if (json === null || !json) {
                    this.$toast('标准数据传递有误');
                    return false;
                }
                console.log('双击对照', json);

                this._dbMatch(json);
            });
            // 标准数据  单击  主要用于批量学习做判断和接口提交
            busEvent.$on('baseDataContrast/operation/common/StandardData.standardData', (json = null) => {
                if (json) {
                    this.standardData = Object.assign({}, json);
                }
                console.log('单选', json);
            });
        },
        methods: {
            handlerClear () {
                this.$emit('clear');
            },
            // 获取表格数据
            _getTableData (
                {
                    resetStatus = true,
                    status = this.tabsStatus,
                    pagingParams = this.pagingParams,
                    sortObj = this.sortObj,
                    oldSearchParams = this.oldSearchParams
                } = {}) {
                console.log('获取原始数据...', oldSearchParams);
                if (oldSearchParams.batchNo) {
                    let params = Object.assign({}, oldSearchParams, {status}, pagingParams, sortObj);

                    return Promise.all([statistics({batchNo: oldSearchParams.batchNo}), getDiseaseRelationList(params)]).then(([dataCount, {data}]) => {
                        let {
                            nocontrol, // 未对照总数 ,
                            nocontrolRate, // 未对照占比 ,

                            compared, // 已对照未审核总数 ,
                            comparedRate, // 已对照未审核占比 ,

                            revoke, // 已撤销总数 ,
                            revokeRate, // 已撤销占比 ,

                            auditing, // 已审核总数 ,
                            auditingRate // 已审核占比 ,
                        } = dataCount.data;
                        let tabsData = Object.assign([], [ // tabs 数据 筛选状态-0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照
                            {rate: '', name: '全部', count: dataCount.data.total, status: null, index: 0},
                            {rate: `(${nocontrolRate})%`, name: '未对照', count: nocontrol, status: 0, index: 1},
                            {rate: `(${comparedRate}%)`, name: '已对照未审核', count: compared, status: 1, index: 2},
                            {rate: '', name: '不能对照未审核', count: '', status: 5, index: 5},
                            {rate: `(${revokeRate}%)`, name: '撤销审核', count: revoke, status: 3, index: 3},
                            {rate: `(${auditingRate}%)`, name: '已对照已审核', count: auditing, status: 2, index: 4},
                            {rate: '', name: '不能对照已审核', count: '', status: 6, index: 6}
                        ]);
                        this.$emit('update:tabsData', tabsData);

                        let {list, total, pageSize, pageNum} = data;
                        this.$emit('update:total', total);
                        this.$emit('update:pagingParams', Object.assign({}, this.pagingParams, {limit: pageSize, offset: pageNum === 0 ? 1 : pageNum}));
                        this.$emit('update:tableData', Object.assign([], list));
                        if (resetStatus) {
                            this._reset();
                        }
                        return Promise.resolve();
                    });
                }
                let tabsData = Object.assign([], [ // tabs 数据 筛选状态-0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照
                    {rate: '', name: '全部', count: '', status: null, index: 0},
                    {rate: '', name: '未对照', count: '', status: 0, index: 1},
                    {rate: '', name: '已对照未审核', count: '', status: 1, index: 2},
                    {rate: '', name: '不能对照未审核', count: '', status: 5, index: 5},
                    {rate: '', name: '撤销审核', count: '', status: 3, index: 3},
                    {rate: '', name: '已对照已审核', count: '', status: 2, index: 4},
                    {rate: '', name: '不能对照已审核', count: '', status: 6, index: 6}
                ]);
                this.$emit('update:tabsData', tabsData);
                this.$emit('update:tableData', []);
                this.$emit('update:pagingParams', pagingParams);

                this.$emit('update:total', 0);
                return Promise.reject();
            },
            // 查询
            handleSearch (params) {
                let pagingParams = {
                    limit: this.pagingParams.limit,
                    offset: 1
                };
                console.log('查询', params);
                this.$emit('update:searchParams', params);
                this.$emit('update:pagingParams', pagingParams);
                this.$emit('update:oldSearchParams', params);
                this.$refs.paging._init();
                this._getTableData({pagingParams, oldSearchParams: params}).catch(() => {
                });
            },
            // tabs切换  请求时带上查询条件
            handleTabsClick (status, index) {
                console.log("index: ", index);
                let pagingParams = {
                    limit: this.pagingParams.limit,
                    offset: 1
                };
                this.$emit('update:pagingParams', pagingParams);
                // this.sortObj = {
                //     orderByName: 'serialNum',
                //     orderBy: 1 // orderBy 排序（1 升序，2 降序）
                // };

                this.$refs.paging._init();
                this._getTableData({status, pagingParams}).then(() => { // 数据回来在切换页面，避免有数据不出来的问题
                    this.$emit('update:tabsActive', index);
                    this.$emit('update:tabsStatus', status);
                }).catch(() => {
                    this.$emit('update:tabsActive', index);
                    this.$emit('update:tabsStatus', status);
                });
            },
            _reset () {
                console.log('重置状态');
                this.rawData = null;
                this.rawDataList = [];

                this.$refs.rawDataTable && this.$refs.rawDataTable._reset();
                return Promise.resolve();
            },
            // 批量学习  多项对照  不能对照  审核  撤销  提交 点击  标准数据双击对照
            handleSubmit ({index}) {
                console.log('this.rawData', this.rawData);
                console.log('this.rawDataList', this.rawDataList);
                switch (index) {
                case 0: // 批量学习
                    this._study();
                    break;
                case 1: // 多项对照
                    this._multitermMatch();
                    break;
                case 2: // 不能对照
                    this._noMatch();
                    break;
                case 3: // 审核
                    this._audit();
                    break;
                case 4: // 撤销
                    this._cancelAudit();
                    break;
                case 5: // 提交
                    this._submit();
                    break;
                case 6: // 自动对照
                    this.automaticControlShow = true;
                    break;
                case 7: // 下载模板
                    this._handleDownloadTpl();
                    break;
                case 8: // 上传
                    this._handleUpload();
                    break;
                case 9: // 上传
                    this.synchronousShow = true;
                    break;
                default:
                    this.$toast('批量学习  多项对照  不能对照  审核  撤销  提交  点击时没有传入参数');
                    return false;
                }
            },
            _study () { // 批量学习
                if (this.rawDataList.length === 0) {
                    this.$toast('批量学习至少勾选一条原始数据');
                    return false;
                }

                if (this.standardData === null || !this.standardData) { // 批量学习   原始数据复选框要选择了多个  标准数据选择了一个
                    this.$toast('请选择标准数据');
                    return false;
                }

                // 批量学习接口调用成功后
                // 调用 this._getTableData(); // 批量学习不需要设置回当前选中行，直接重置就可以了
            },
            _multitermMatch () { // 多项对照  单项对照
                if (this.rawDataList.length === 0 && this.standardDataList.length === 0) {
                    this.$toast('请勾选原始数据与标准数据。');
                    return false;
                }
                if (this.rawDataList.length === 0) {
                    this.$toast('请勾选原始数据。');
                    return false;
                }
                if (this.standardDataList.length === 0) { // 多项对照   原始数据选择了一个   标准数据必需选择多个
                    this.$toast('请勾选标准数据。');
                    return false;
                }
                if (this.rawDataList.some((item) => Number.isNaN(item.status) || Number(item.status) === 2)) { // 原始数据中有已审核的数据，不给做对照
                    this.$toast('您好！该记录已审核，请不要重复操作，谢谢！');
                    return false;
                }
                /* if (this.rawDataList.length > 1 && this.standardDataList.length > 1) { // 目前只开放多对一的情况和一对多的情况
                    this.$toast('该功能暂未开放。');
                    return false;
                } */
                if (this.standardDataList.length >= 4 || this.rawDataList.length >= 4) {
                    this.dialogShow = true;
                } else {
                    this.handlerDialogVisible();
                }
            },
            handlerDialogVisible () { // 多项对照dialog点击确定
                let result = this._uniq(this.rawDataList, this.standardDataList); // TODO 结果
                let request = null;
                if (this.rawDataList.length === 1) { // 一对多   勾选一对一
                    request = onetomany;
                } else { // 多对一
                    request = manytoone;
                }
                request(result).then(res => {
                    this._callBackFn();
                    this.dialogShow = false;
                }).catch(() => {
                    this.dialogShow = false;
                });
            },
            _dbMatch (json) { // 双击对照
                if (!this._test()) {
                    return false;
                }
                if (this.rawDataList.length > 0 || this.standardDataList.length > 0) {
                    this.$toast('请将勾选项取消。');
                    return false;
                }
                if (Number.isNaN(this.rawData.status) || Number(this.rawData.status) === 2) {
                    this.$toast('您好！该记录已审核，请不要重复操作，谢谢！');
                    return false;
                }
                let arr = this._uniq([this.rawData], [json]);
                match(arr).then(res => {
                    this._callBackFn();
                });
            },
            _uniq (oldList, newList) { // 去重
                let newArr = oldList.map(({id, catalogCode, catalogName, drugForm}) => { // 原始数据整理，准备做去重
                    catalogCode = catalogCode === null ? '' : catalogCode;
                    catalogName = catalogName === null ? '' : catalogName;
                    drugForm = drugForm === null ? '' : drugForm;
                    let codeList = catalogCode.split(';');

                    let ids = codeList.map((item, index) => {
                        return item;
                    });
                    return {
                        versionId: '',
                        versionName: '',
                        id,
                        catalogCode,
                        catalogName,
                        drugForm,
                        ids
                    };
                });
                newList.forEach(({versionId, versionName, catalogCode, catalogName, drugForm}) => {
                    catalogCode = catalogCode === null ? '' : catalogCode;
                    catalogName = catalogName === null ? '' : catalogName;
                    drugForm = drugForm === null ? '' : drugForm;
                    let keys = catalogCode;
                    newArr.forEach((item, index) => {
                        if (!item.ids.includes(keys)) {
                            item.versionId = versionId;
                            item.versionName = versionName;
                            item.catalogCode = this._strJoin(item.catalogCode, catalogCode);
                            item.catalogName = this._strJoin(item.catalogName, catalogName);
                            item.drugForm = this._strJoin(item.drugForm, drugForm);

                            if (item.catalogCode.charAt(0) === ';' && item.catalogName.charAt(0) === ';') {
                                item.catalogCode = item.catalogCode.substring(1);
                                item.catalogName = item.catalogName.substring(1);
                                item.drugForm = item.drugForm.substring(1);
                            }
                        } else {
                            console.log('存在');
                        }
                    });
                });
                let catalogType = newList[0].catalogType; // TODO 收费对照 新加了一个类型给后台
                newArr.forEach((item) => {
                    delete item.ids;
                    item.catalogType = catalogType;
                });
                return newArr;
            },
            _strJoin (oldStr, newStr) {
                // return oldStr ? `${oldStr};${newStr}` : `${newStr}`;
                return `${oldStr};${newStr}`;
            },
            _noMatch    () { // 不能对照
                if (!this._test()) {
                    return false;
                }

                if (Number.isNaN(this.rawData.status) || Number(this.rawData.status) === 2) {
                    this.$toast('您好！该记录已审核，请不要重复操作，谢谢！');
                    return false;
                }
                // 不能对照  必需选择一个原始数据
                noMatch({id: this.rawData.id}).then(res => {
                    this._callBackFn();
                });
            },
            _audit () { // 审核
                if (!this._test()) {
                    return false;
                }
                if (Number(this.rawData.status) === 0) { // 0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照 ,
                    this.$toast('只有对照好的数据才可做审核');
                    return false;
                }
                if (Number(this.rawData.status) === 2) { // 0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照 ,
                    this.$toast('您好！该记录已审核，请不要重复操作，谢谢！');
                    return false;
                }
                if (!this.rawData.auditId) {
                    this.$toast('无auditId');
                    return false;
                }
                // 审核  必需选择一个原始数据
                audit({auditId: this.rawData.auditId}).then(res => {
                    this._callBackFn();
                });
            },
            _cancelAudit () { // 撤销审核
                if (!this._test()) {
                    return false;
                }
                if (!Number.isNaN(this.rawData.status) && Number(this.rawData.status) !== 2) {
                    this.$toast('只有已审核的数据才可撤消审核');
                    return false;
                }
                // 撤销  必需选择一个原始数据
                cancelAudit({auditId: this.rawData.auditId}).then(res => {
                    this._callBackFn();
                });
            },
            _submit () { // 提交
                if (!this._test()) {
                    return false;
                }
                if (Number.isNaN(this.rawData.status) || Number(this.rawData.status) !== 0) { // 0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照 ,
                    this.$toast('该数据状态不支持“提交”操作。');
                    return false;
                }

                if (!this.rawData.catalogName) { // 0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照 ,
                    this.$toast('原始数据未对照，无法提交');
                    return false;
                }
                
                // 提交  必需选择一个原始数据
                submit({id: this.rawData.id}).then(res => {
                    this._callBackFn();
                });
            },
            _test () { // 没有选择原始数据
                if (this.rawData === null) {
                    this.$toast('请选择原始数据');
                    return false;
                }
                return true;
            },
            _callBackFn () {
                this._getTableData({resetStatus: false}).then(() => {
                    if (this.rawData) {
                        let result = this.tableData.find(item => item.id === this.rawData.id);
                        if (result) { // 如果请求回来的数据中有上次选中的数据就把上次选中的数据设置为高亮，TODO： 目前这个版本不需要把复选框的数据设置回去，只需要设置单选行就ok
                            this.rawDataList = []; // 复选框的状态
                            this.rawData = Object.assign({}, result);
                            this.$refs.rawDataTable._setCurrentRow(this.rawData);
                            console.log('设置');
                            return false;
                        }
                        this._reset(); // 如果没有就把所有都重置一次
                    }
                });
            },
            handleSort ({column, prop, order}) { // 排序
                console.log('// 排序', column, prop, order);
                let orderBy = null;

                // sortObj
                if (prop && order) {
                    if (order === 'ascending') { // 升序 1
                        orderBy = 1;
                    } else if (order === 'descending') { // 降序 2
                        orderBy = 2;
                    }
                }
                if (orderBy === this.sortObj.orderBy && prop === this.sortObj.orderByName) {
                    console.log('同一个');
                    return false;
                }
                let sortObj = {
                    orderBy,
                    orderByName: prop
                };
                this.$emit('update:sortObj', sortObj);

                this._getTableData({sortObj}).catch(() => {
                });
            },
            handlePagingChange (data) { // 分页
                this.$emit('update:pagingParams', Object.assign({}, data));
                console.log('==>>', data);
                console.log('分页', this.pagingParams);
                this._getTableData({pagingParams: data});
            },
            handlerCheckDetail ({data}) { // 查看详情
                console.log(data);
                getItemData({id: data.id}).then(({data}) => {
                    console.log(`detailData: ==>>`, data);
                    this.detailDialogData = data;
                    this.detailDialog = true;
                });
            },
            handleDelete (params) { // 详情删除
                match([params]).then(res => {
                    getItemData({id: params.id}).then(({data}) => {
                        this.detailDialogData = data;
                    });
                });
            },
            handleCloseDetail (data = null) { // 详情关闭
                this.detailDialog = false;
                if (data) {
                    this._callBackFn();
                }
            },
            // 自动对照
            _handleAutomaticControl () {
                let {batchNo, dataFrom} = this.automaticControlParams;
                if (!batchNo || !dataFrom) {
                    this.$toast('请选择数据批次，数据来源');
                    return false;
                }
                matchingCatalog(this.automaticControlParams).then(res => {
                    console.log(res);
                });
                this.automaticControlShow = false;
                console.log('自动对照', this.automaticControlParams);
            },
            // 下载模板
            _handleDownloadTpl () {
                exportTpl().then(res => {
                    this._$download(res);
                });
            },
            // 上传 成功后
            _handleUpload () {
                this.$alert('<p style="text-align: center;">上传成功，请刷新界面</p>', '温馨提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log('上传成功', action);
                    }
                });
                console.log('上传');
            },
            // 同步
            _handleSynchronous () {
                let len = this.rawDataList.length;
                if (len === 0 && !this.synchronousParams.batchNo) {
                    this.$toast('请选择数据批次');
                    return false;
                }
                let request = null;
                let params = {};
                if (len > 0) {
                    request = synAuditDataByIds;
                    let ids = this.rawDataList.filter(item => item.auditId).map(item => item.auditId);
                    if (ids.length === 0) {
                        alert.call(this, 0, 0);
                        return false;
                    }
                    params = {auditId: ids.join(';')};
                } else {
                    request = synAuditDataByBatchNo;
                    params = Object.assign({}, this.synchronousParams);
                }
                
                request(params).then(({data}) => { // {insertNum: 0, updateNum: 0}
                    let {insertNum = 0, updateNum = 0} = data;
                    alert.call(this, insertNum, updateNum);
                    this._callBackFn();
                });
                function alert (insertNum = 0, updateNum = 0) {
                    this.$alert(`<p style="text-align: center;">新增数据${insertNum}条，更新数据${updateNum}条</p>`, '同步完成', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: '确定',
                        callback: action => {
                            this.synchronousParams.batchNo = '';
                            this.synchronousShow = false;
                        }
                    });
                }
            }
        },
        watch: {
            tabsActive: function (newt, oldt) {
                this.tabsActiveChange = false;
                setTimeout(() => {
                    this.tabsActiveChange = true;
                });
            }
        },
        destroyed () {
            busEvent.$off('baseDataContrast/operation/common/StandardData.dbClick');
        },
        components: {Tabs, RawDataSearch, Btns, RawDataTable}
    };
</script>
<style lang="scss" scoped>
    .main-wrap {
        width: 100%;
        height: calc(100% - 52px);
    }

    .dialog {
        .item-detail.v-item-detail /deep/ .text {
            padding: 0;
        }
        .dialog-list {
        }
        .dialog-item {
            height: 42px;
            line-height: 42px;
            border-bottom: 1px solid #D8D8D8;
            text-indent: 2px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    .dialog-title {
        padding-left: 11px;
        font-size: 18px;
        color: #333333;
        border-left: 4px solid #4579C5;
    }

    /deep/ .el-dialog__body {
        line-height: 100%;
    }
</style>
