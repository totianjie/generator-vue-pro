<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-02 14:31:00
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-02 14:31:00
* @remark: 查看详情的弹框
-->
<template>
    <el-dialog
        :visible.sync="value"
        width="40%"
        min-width="500"
        @close="handlerClose"
        class="raw-data-dialog"
    >
        <span class="dialog-title" slot="title">详情</span>
        <div style="padding: 0 10px; max-height: 400px; overflow: auto;">
            <el-table
                :size="tableSize"
                :data="list"
                class="table-wrap"
                height="170px"
                :highlight-current-row="true"
                :stripe="true"
            >
                <el-table-column
                    prop="catalogCode"
                    show-overflow-tooltip
                    label="标准编码"
                >
                </el-table-column>
                <el-table-column
                    prop="catalogName"
                    show-overflow-tooltip
                    label="标准名称"
                >
                </el-table-column>
                <el-table-column
                    prop="drugForm"
                    show-overflow-tooltip
                    label="标准剂型"
                >
                </el-table-column>
                <el-table-column
                    prop=""
                    label=""
                    width="38"
                >
                    <template slot-scope="scope">
                        <i @click="handlerDelete(scope.row)" v-show="detailDialogData.status !== '2'" class="el-icon-close pointer"></i>
                    </template>
                </el-table-column>
            </el-table>
            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="原始编码：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.instCatalogCode}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.instCatalogCode}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="原始名称：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.instCatalogName}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.instCatalogName}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="数据批次：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.dataFrom}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.dataFrom}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="对照类型：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.compareType}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.compareType}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="审核时间：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.verifyOptTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.verifyOptTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="审核人：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.verifyOptUser}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.verifyOptUser}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="状态：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.statusName}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.statusName}}</div>
            </v-item-detail>

            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="是否同步：" :span="span">
                <span class="block text-ellipsis">--</span>
                <div slot="content" class="tooltip-item">--</div>
            </v-item-detail>

            <v-item-detail :tooltip="true" :pxUnit="true" :labelWidth="labelWidth" label="备注：" :span="span">
                <span class="block text-ellipsis">{{detailDialogData.remark}}</span>
                <div slot="content" class="tooltip-item">{{detailDialogData.remark}}</div>
            </v-item-detail>

            <ul class="log-wrap">
                <li class="item title">操作日志</li>
                <li class="item" title="2019-01-01 12：00：00 test01 对照操作2019-01-01 12：00：00 test01 对照操作2019-01-01 12：00：00 test01 对照操作">
                    2019-01-01 12：00：00 test01 对照操作2019-01-01 12：00：00 test01 对照操作2019-01-01 12：00：00 test01 对照操作
                </li>
            </ul>
        </div>
    </el-dialog>
</template>
<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                labelWidth: 130,
                tableSize: CONFIG.tableSize,
                span: 5,
                flag: false // 在详情页面是否有做删除操作， 如果有做删除操作：关闭详情时刷新列表数据， 如果没有做：关闭详情时不做刷新
            };
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            detailDialogData: {
                type: Object,
                default: {}
            }
        },
        computed: {
            list () {
                let {catalogCode, catalogName, drugForm} = this.detailDialogData;
                if (!catalogName) {
                    return [];
                }
                let catalogCodeArr = catalogCode.split(';');
                let drugFormArr = drugForm.split(';');
                return catalogName.split(';').map((item, index) => {
                    return {
                        catalogName: item,
                        catalogCode: catalogCodeArr[index],
                        drugForm: drugFormArr[index],
                        index
                    };
                });
            }
        },
        methods: {
            handlerClose () { // 浮层关闭
                console.log('dialog关闭');
                if (this.flag) {
                    this.flag = false;
                    this.$emit('closeDetail', this.detailDialogData);
                    return false;
                }
                this.$emit('closeDetail', null);
            },
            handlerDelete (row) { // 表格删除
                console.log(row);
                this.flag = true;
                let {versionId, versionName, id, catalogType} = this.detailDialogData;
                let params = {
                    catalogCode: '',
                    catalogName: '',
                    drugForm: '',
                    versionId,
                    catalogType,
                    versionName,
                    id
                };
                this.list.splice(row.index, 1);
                this.list.forEach((item, index) => {
                    let symbol = '';
                    if (index === 0) {
                        symbol = '';
                    } else {
                        symbol = ';';
                    }
                    params.catalogCode += `${symbol}${item.catalogCode}`;
                    params.catalogName += `${symbol}${item.catalogName}`;
                    params.drugForm += `${symbol}${item.drugForm}`;
                });

                console.log(params);
                this.$emit('deleteDetail', params);
            }
        },
        watch: {
            detailDialogData: {
                handler (newobj, oldobj) {
                    console.log(newobj, oldobj);
                },
                deep: true
            }
        }
    };
</script>
<style scoped>
    .dialog-title {
        padding-left: 11px;
        font-size: 18px;
        color: #333333;
        border-left: 4px solid #4579C5;
    }

    .raw-data-dialog /deep/ .el-dialog__body {
        line-height: 100%;
    }

    .table-wrap {
        width: 100%;
        border-left: 1px solid #DAEFFF;
        border-right: 1px solid #DAEFFF;
    }

    .table-wrap::before {
        background-color: #DAEFFF;
    }

    .log-wrap {
        margin-top: 14px;
        padding: 10px 20px;
        border: 1px solid #E8E8E8;
    }
    .log-wrap .item {
        padding: 2px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .log-wrap .item.title {

    }
</style>

