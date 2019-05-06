<!--
* @Author: GOTINTIN
* @Date: 2019-3-18
* @remark: 日志弹出框
-->
<template>
    <el-dialog
        title="执行日志"
        :visible.sync="value"
        @handleDialogShow="handleDialogShow"
        @close="handleClose"
        width="537px"
        class="daily-dialog">
        <section>
            <el-table
                class="m-t-20"
                :size="tableSize"
                :data="dailyList"
                border
                highlight-current-row
                :stripe="true"
                height="242"
                width="100%">
                <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    :min-width="colWidth"
                    show-overflow-tooltip
                    prop="optTime"
                    label="时间">
                    <template slot-scope="scope">
                        {{scope.row.optTime | dateTimeDowith}}
                    </template>
                </el-table-column>
                <el-table-column
                    :min-width="colWidth"
                    show-overflow-tooltip
                    prop="optContent"
                    label="内容">
                </el-table-column>
            </el-table>
        </section>
    </el-dialog>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {getDailyList} from 'js/api/taskManage/common';
    export default {
        data () {
            return {
                colWidth: '120px',
                // 表格参数
                dailyListParams: {
                    offset: 1, // 当前页数
                    limit: CONFIG.limit, // 每页数量
                    executeCode: '', // 任务执行编码
                    taskCode: '' // 任务编码
                },
                dailyList: [] // 列表
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
        },
        methods: {
            // 查看日志弹出框
            handleDialogShow (data) {
                console.log('查看日志弹出data', data);
                this.dailyListParams = Object.assign({}, this.dailyListParams, data);
                getDailyList(this.dailyListParams).then(res => {
                    this.dailyList = res.data.list;
                });
            },
            // 关闭
            handleClose () {
                this.$emit('closeDailyDialog');
            }
        },
        filters: {
            dateTimeDowith (datetime) {
                if (datetime === null || datetime === undefined) {
                    return '';
                }
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .daily-dialog{
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
    }
</style>
