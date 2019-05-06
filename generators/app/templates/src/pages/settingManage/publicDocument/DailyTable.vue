<!--
* @Author: GOTINTIN
* @Date: 2019-1-21
* @remark: 日志列表
-->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="tableData"
            highlight-current-row
            :stripe="true"
            border
            height="100%"
            width="100%"
            class="dailyTable">
            <el-table-column
                label="序号"
                type="index"
                width="55">
            </el-table-column>
            <el-table-column
                prop="optTime"
                :min-width="colWidth"
                show-overflow-tooltip
                label="操作时间">
                <template slot-scope="scope">
                    {{scope.row.optTime  | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="optUser"
                label="操作人">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="modelName"
                label="模块名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="optResult"
                label="操作结果">
                <template slot-scope="scope">
                    <span class="rowContent" @click="handleContent(scope.row, '操作结果')">{{scope.row.optResult}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="optContent"
                label="操作内容">
                <template slot-scope="scope">
                    <span class="rowContent" @click="handleContent(scope.row,'操作内容')">{{scope.row.optContent}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="clientIP"
                label="客户端IP">
            </el-table-column>
            <el-table-column
                prop="serverIP "
                :min-width="colWidth"
                show-overflow-tooltip
                label="服务端IP">
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth
            };
        },
        methods: {
            handleContent (row, column) {
                console.log('row操作内容', row, column);
                this.$emit('handleContent', row, column);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .dailyTable{
        /deep/ .rowContent{
            cursor: pointer;
        }
    }
</style>
