<!--
* @Author: GOTINTIN
* @Date: 2019-3-18
* @remark: 查看更多执行记录弹出框
-->
<template>
    <el-dialog
        title="查看更多执行记录"
        :visible.sync="value"
        @handleDialogShow="handleDialogShow"
        @close="handleClose"
        width="850px"
        class="more-record-dialog page">
        <section>
            <div v-if="!moreRecordList.length" class="empty-data">
                暂无数据
            </div>
            <ul class="list-wrap">
                <li v-for="item in moreRecordList" :key="item.executeCode" v-show="moreRecordList.length">
                    <el-row>
                        <el-col :span="8">
                            <v-item-detail :border="false" :pxUnit="true" :labelWidth="labelWidth" label="执行开始时间：" :span="span" >
                                <span class="block text-ellipsis">{{item.taskBeginTime| formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                            </v-item-detail>
                        </el-col>
                        <el-col :span="8">
                            <v-item-detail :border="false" :pxUnit="true" :labelWidth="labelWidth" label="执行开结束时间：" :span="span" class="m-t-34">
                                <span class="block text-ellipsis">{{item.taskEndTime| formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                            </v-item-detail>
                        </el-col>
                        <el-col :span="6">
                            <v-item-detail :border="false" :pxUnit="true" :labelWidth="labelWidth" label="任务执行结果：" :span="span" class="m-t-34">
                                <span class="block text-ellipsis">{{item.executeStatus | formatTaskStatus}}</span>
                            </v-item-detail>
                        </el-col>
                        <el-col :span="2" class="m-t-8">
                            <div @click="clickShow(item.index,item.showTable)">
                                <!--<span >{{item.showTable? '收起': '展开'}}</span>-->
                                <i class="font-12 icon" :class="item.showTable? 'el-icon-arrow-up': 'el-icon-arrow-down'"></i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table
                            v-if="item.showTable"
                            :size="tableSize"
                            :data="item.logs"
                            border
                            highlight-current-row
                            :stripe="true"
                            class="table-wrap">
                            <el-table-column
                                label="序号"
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                :min-width="colWidth"
                                show-overflow-tooltip
                                prop="creatTime"
                                label="时间">
                                <template slot-scope="scope">
                                    {{scope.row.creatTime | formatTime('yyyy-MM-dd hh:mm:ss')}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                :min-width="colWidth"
                                show-overflow-tooltip
                                prop="descr"
                                label="内容">
                            </el-table-column>
                    </el-table>
                </li>
            </ul>
            <v-paging
                :total="total"
                v-if="moreRecordList.length"
                @pagingChange="handlePagingChange"
                ref="rPages">
            </v-paging>
        </section>
    </el-dialog>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {getMoreRecordList} from 'js/api/taskManage/common';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: '200px',
                labelWidth: '120px',
                total: 0, // 总页数
                // 表格参数
                moreRecordParams: {
                    offset: 1, // 当前页数
                    limit: CONFIG.limit, // 每页数量
                    taskCode: '' // 任务编码
                },
                moreRecordList: [] // 列表
            };
        },
        props: {
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            }
        },
        mounted () {
            // this._getMoreRecordList();
        },
        filters: {
            formatTaskStatus (taskStatus) {
                console.log(typeof taskStatus);
                // 执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
                let json = {"1": "未执行", "2": "执行中", "3": "执行暂停", "4": "执行终止", "5": "执行完成"};
                return json[taskStatus];
            }
        },
        methods: {
            // 表格显示隐藏
            clickShow (index, showTable) {
                console.warn(index, showTable);
                let obj = this.moreRecordList[index];
                obj.showTable = !showTable;
                this.moreRecordList.splice(index, 1, obj);
            },
            // 表格数据
            _getMoreRecordList () {
                getMoreRecordList(this.moreRecordParams).then(res => {
                    this.total = res.data.total;
                    let moreRecordList_ = res.data.list.map((res2, index) => {
                        res2.showTable = false;
                        res2.index = index;
                        return res2;
                    });
                    this.moreRecordList = moreRecordList_;
                });
            },
            // 弹出框
            handleDialogShow (data) {
                console.log('查看更多执行记录', data);
                this.moreRecordParams = Object.assign({}, this.moreRecordParams, data);
                this._getMoreRecordList(this.moreRecordParams);
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handleChange', data);
                this.moreRecordParams = Object.assign({}, this.moreRecordParams, data);
                this._getMoreRecordList(this.moreRecordParams);
            },
            // 关闭
            handleClose () {
                this.$emit('moreReDialog');
            }
        }
    };
</script>
<style lang="scss" scoped>
    .more-record-dialog{
        /deep/ .el-dialog__body{
            width: 100%;
            box-sizing: border-box;
        }
        /deep/ .el-dialog__title{
            padding-left: 11px;
            font-size: 18px;
            color: #333333;
            border-left: 4px solid #4579C5;
        }
        /deep/ .el-dialog__body {
            padding-top: 10px;
        }
        /deep/ .el-table .el-table__row:hover{
            cursor: pointer;
        }
        .table-wrap {
            border-left: 1px solid #DAEFFF;
            border-right: 1px solid #DAEFFF;
            width: 100%;
        }
        .block, .text-ellipsis{
            line-height: 19px;
        }
        .list-wrap{
            height: 350px;
            width: 100%;
            overflow: auto;
        }
        .font-12{
            font-size: 14px;
        }
        .icon{
            color: #333;
            font-weight: 700;
            cursor: pointer;
        }
        .empty-data{
            margin-left: 16px;
        }
        /deep/ .v-item-detail .name{
            padding-right: 0;
        }
        .m-t-8{
            margin-top: 8px;
        }
    }
</style>
