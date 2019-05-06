<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第2步
-->
<template>
    <div class="step2-body">
        <div class="table-list" v-if="templetType===3">
            <div class="text-select-count">已选中路径:{{selectCount}}条</div>
            <disease-table v-if="isShowDiseaseList"
                class="disease-table"
                :diseaseList="diseaseList"
                @update="_updateDisease()">
            </disease-table>
        </div>
        <v-paging
	        :total="total"
	        ref="Fpage2"
	        @pagingChange="handlePagingChange" v-if="templetType===3">
        </v-paging>
        <div class="table-list text-select-count" v-if="templetType===1">
            业务配置：全量-替换
        </div>
        <div class="table-list text-select-count" v-if="templetType===4">
            业务配置：全量-新增
        </div>
        <div class="table-list" v-if="templetType===2">
            <div class="text-select-count">业务配置：增量</div>
            <el-table
                    class="t-m-60"
                    :size="tableSize"
                    :data="listData"
                    :highlight-current-row="true"
                    :stripe="true"
                    border
                    width="100%"
                >
                <el-table-column
                    label="序号"
                    type="index"
                    width="70"
                >
                </el-table-column>
                <el-table-column
                    label="源库"
                    show-overflow-tooltip
                    prop="sourceDataBaseName"
                    :min-width="colWidth"
                >
                </el-table-column>
                <el-table-column
                    label="增量字段"
                    show-overflow-tooltip
                    prop="timestampColumn"
                    :min-width="colWidth"
                >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import CONFIG from 'src/config';
    import DiseaseTable from '.././components/DiseaseTable';
    import { medRouter } from "js/api/managementTool/moduleManage";

    export default {
        data () {
            return {
                test: '',
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.baseBtn,
                isShowDiseaseList: true,
                diseaseList: [],
                total: 0,
                parameters: {
                    limit: 20,
                    offset: 1,
                    templetDrugId: ''
                },
                listData: [],
                selectCount: 0
            };
        },
        props: {
            templetType: {
                type: Number,
                default () {
                    return 0;
                }
            },
            params: {
                type: Object,
                default () {
                    return {};
                }
            },
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            moudleId: {
                type: Number,
                default () {
                    return '';
                }
            },
            isEdit: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            modelEx: {
                type: Object,
                default () {
                    return {};
                }
            },
            indexValue: {
                type: Number,
                default () {
                    return 1;
                }
            }
        },
        beforeUpdate () {
        },
        created () {
        },
        watch: {
            indexValue (value_) {
            }
        },
        methods: {
            _init (tempData) {
                this.listData = [];
                this.listData = this.listData.concat(tempData || this.modelEx.dbList);
                if (this.modelEx.templetDrugId && this.modelEx.templetDrugId > 0 && this.templetType === 3) {
                    this.parameters = Object.assign({}, this.parameters, {templetDrugId: this.modelEx.templetDrugId});
                    this._getData();
                }
            },
            buildE () {
                if (this.modelEx.templetDrugId && this.modelEx.templetDrugId > 0) {
                    this.parameters = Object.assign({}, this.parameters, {templetDrugId: this.modelEx.templetDrugId});
                    this._getData();
                }
            },
            handlePagingChange (data) {
                this.parameters = Object.assign({}, this.parameters, data);
                this._getData();
            },
            _getData () {
                try {
                    if (!this.parameters.templetDrugId) {
                        return;
                    }
                    medRouter(this.parameters).then((res) => {
                        let {list = [], total} = res.data;
                        this.diseaseList = list || [];
                        this.total = total;
                        this.selectCount = total;
                    });
                } catch (e) {

                }
            }
        },
        components: {DiseaseTable}

    };
</script>

<style scoped lang="scss">
    .step2-body{
        height: calc(100% - 106px) !important;
        width: 100%;
    }
    .table-list {
        margin-top: 15px;
        height: calc(100% - 52px);
        width: 100%;
    }

    .disease-table {
        margin-top: 5px;
        height: calc(100% - 60px);
        // background-color: orange;
    }
    .text-select-count {
        display:block;
        padding-left: 24px;
        height:14px;
        font-size:14px;
        line-height:14px;
        color:black;
        padding-top: 20px;
        padding-bottom: 20px;

    }
    .t-m-60{
        min-height:64px;
        width: 100%;
    }
    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }
</style>
