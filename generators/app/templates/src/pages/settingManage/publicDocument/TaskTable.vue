<!--
* @Author: GOTINTIN
* @Date: 2019-1-21
* @remark: 任务列表(公用)
-->
<template>
    <div>
        <el-table
            class="task-table"
            height="100%"
            width="100%"
            :size="tableSize"
            :data="tableData"
            border
            :highlight-current-row="true"
            :stripe="true">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="taskType"
                show-overflow-tooltip
                label="任务类型">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                label="执行开始时间"
                prop="taskBeginTime"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.taskBeginTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                label="执行结束时间"
                prop="taskEndTime"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.taskEndTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="result"
                show-overflow-tooltip
                label="执行结果">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="content"
                show-overflow-tooltip
                label="执行内容">
            </el-table-column>
            <el-table-column width="80" label="日志查看">
                <template slot-scope="scope">
                    <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth
            };
        },
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            // 查看
            handleDetail (data) {
                console.log('查看', data);
                this.$emit('handleDetail', data);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .task-table{
        .el-button--text{
            color: #4579C5;
        }
    }
</style>
