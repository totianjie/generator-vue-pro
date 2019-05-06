<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-01 16:48:23
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-01 16:48:23
* @remark: 右边  标准数据模块
-->
<template>
    <section class="h-fill">
        <main class="main-wrap">
            <!-- 查询区 -->
            <standard-data-search
                :searchParams.sync="searchParams"
                :diseaseVersionsList="diseaseVersionsList"
                @search="handleSearch"
                @clear="handlerClear"
            />

            <!-- 表格区 -->
            <standard-data-table
                :standardDataList.sync="standardDataList"
                :tableData="tableData"
                ref="standardDataTable"
                @rowClick="handleRowClick"
                @rowDbClick="handleRowDbClick"
                @selection="handleSelection"
                @sort="handleSort"
            />
        </main>
        <v-paging
            :total="total"
            ref="paging"
            className='disease-control-paging'
            layout='total, sizes, prev, next, jumper'
            @pagingChange="handlePagingChange"
            :pageSize="pagingParams.limit"
        ></v-paging>
    </section>
</template>
<script>
    import StandardDataSearch from './StandardDataSearch';
    import StandardDataTable from './StandardDataTable';
    import busEvent from 'src/busEvent';
    import {getStandardList} from "js/api/baseDataContrast/operation";
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                total: 0, // 分面总条数
                tableData: [ // 表格数据
                    // {
                    //     "id": null,
                    //     "diseaseCode": "A15.151",
                    //     "diseaseName": "结核性肺纤维变性，仅经痰培养所证实",
                    //     "diseaseCodeAdd": null,
                    //     "diseaseHeadVersionId": 1,
                    //     "diseaseHeadVersionName": "医保疾病表(1015条)"
                    // }
                ],
                pagingParams: {
                    limit: CONFIG.limit,
                    offset: 1
                },
                standardDataList: [], // 标准数据是否被多选了，如果多选了就是数组中就有值，没有多选数组就为空
                sortObj: { // 排序
                    orderByName: null,
                    orderBy: null // orderBy 排序（1 升序，2 降序）
                }
            };
        },
        props: {
            diseaseVersionsList: {
                type: [Array],
                default: []
            },
            searchParams: {
                type: Object,
                default: {
                    operationHeadVersion: '',
                    operationCode: '',
                    operationName: ''
                }
            },
            limit: {
                type: Number,
                default: CONFIG.limit
            },
            oldStandardSearchParams: {
                type: Object,
                default: {}
            }
        },
        mounted () {
            if (this.oldStandardSearchParams.operationHeadVersion) {
                this._getTableData();
            }
            this.pagingParams.limit = this.limit;
            // 原始数据点击
            busEvent.$on('baseDataContrast/operation/common/RawDataTableMixins.rowClick', ({instOperationName} = {}) => {
                let result = Object.assign({}, this.searchParams, {operationName: instOperationName});
                this.$emit('update:searchParams', result);
            });
        },
        methods: {
            handleRowClick (row = null) { // 单击
                busEvent.$emit('baseDataContrast/operation/common/StandardData.standardData', row);
            },
            handleRowDbClick (row = null) { // 双击
                busEvent.$emit('baseDataContrast/operation/common/StandardData.dbClick', row);
            },
            handleSelection (arr = []) { // 复选框选择  改变
                this.standardDataList = arr;
                busEvent.$emit('baseDataContrast/operation/common/StandardData.standardDataList', arr);
            },
            handleSearch (params) { // 查询
                this.pagingParams.offset = 1;
                this.searchParams = Object.assign({}, this.searchParams, params);
                this.$emit('update:oldStandardSearchParams', this.searchParams);
                this.$refs.paging._init();
                this._getTableData(params);
                this._reset();
            },
            handlePagingChange (data) { // 分页变化
                console.log(data);
                this.pagingParams = Object.assign({}, data);
                this.$emit('update:limit', data.limit);
                this._getTableData();
                this._reset();
            },
            handlerClear () { // 清空查询条件
                // this.searchParams = Object.assign({}, {
                //     operationHeadVersion: '',
                //     operationCode: '',
                //     operationName: ''
                // });
                let result = Object.assign({}, {
                    operationHeadVersion: this.searchParams.operationHeadVersion,
                    operationCode: '',
                    operationName: ''
                });
                this.$emit('update:searchParams', result);
                this.$emit('update:oldStandardSearchParams', result);
            },
            _getTableData (searchParams = this.oldStandardSearchParams) {
                let bSing = false;
                for (let value of Object.values(searchParams)) {
                    if (value !== '' && value) {
                        bSing = true;
                        break;
                    }
                }
                if (bSing) {
                    let params = Object.assign({}, this.pagingParams, searchParams, this.sortObj);
                    return getStandardList(params).then(({data}) => {
                        let {list, total, pageSize, pageNum} = data;
                        this.tableData = Object.assign([], list);
                        this.total = total;
                        this.pagingParams = Object.assign({}, this.pagingParams, {limit: pageSize, offset: pageNum});
                    });
                } else {
                    this.tableData = [];
                }
            },
            _reset () {
                this.$refs.standardDataTable._reset(); // 重置表格状态
                this.standardDataList = []; // 标准数据是否被多选了，如果多选了就是数组中就有值，没有多选数组就为空
                busEvent.$emit('baseDataContrast/operation/common/StandardData.standardDataList', []);
                busEvent.$emit('baseDataContrast/operation/common/StandardData.standardData', null);
            },
            // 排序
            handleSort ({column, prop, order}) { // 排序
                console.log('// 排序', column, prop, order);
                let orderBy = null;
                if (prop && order) {
                    if (order === 'ascending') { // 升序 1
                        orderBy = 1;
                    } else if (order === 'descending') { // 降序 2
                        orderBy = 2;
                    }
                }
                this.sortObj = {
                    orderBy,
                    orderByName: prop
                };
                this._getTableData().catch(() => {
                });
            }
        },
        components: {StandardDataSearch, StandardDataTable}
    };
</script>
<style lang="scss" scoped>
    .main-wrap {
        width: 100%;
        height: calc(100% - 52px);
    }
</style>
<style lang="scss">
    .el-pagination.disease-control-paging {
        .el-pagination__total, .el-pagination__sizes {
            margin-right: 5px;
        }
        .el-pagination__sizes {
            margin-right: 0;
        }

        .btn-prev {
            padding-right: 6px;
        }
        .btn-next {
            padding-left: 6px;
        }
        .el-pagination__jump {
            margin-left: 0;
        }
    }
</style>



