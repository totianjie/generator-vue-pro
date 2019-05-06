<!-- Created by Nelson on 2019/01/24 -->
<template>
    <section class="wrap">
        <el-table
            class="table"
            :size="tableSize"
            :data="tableData"
            style="width: 100%"
            cell-class-name="pointer"
            type="selection"
            ref="multipleTable" height="100%"
            border
            :highlight-current-row="true"
            :stripe="true"
            @row-dblclick="handleRowDblclick"
            @row-click="handleRowClick"
            @select="handleSelect"
            @selection-change="handleSelectionChange"
            @select-all="handleSelectAll"
        >
            <el-table-column
                type="selection"
                width="30"
                :prop="columnTableList[9]"
            >
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="50"
            >
            </el-table-column>
            <el-table-column
                :prop="columnTableList[0]"
                :label="columnTableText[0]"
                show-overflow-tooltip
                :min-width="colWidth"
            >
            </el-table-column>
            <el-table-column
                :prop="columnTableList[1]"
                :label="columnTableText[1]"
                show-overflow-tooltip
                :min-width="colWidth"
            >
            </el-table-column>

            <el-table-column
                :prop="columnTableList[2]"
                :label="columnTableText[2]"
                show-overflow-tooltip
                width="90"
            >
                <template slot-scope="scope">
                    {{scope.row[columnTableList[2]] | formatStatus }}
                </template>
            </el-table-column>
            <el-table-column
                :prop="columnTableList[3]"
                :label="columnTableText[3]"
                show-overflow-tooltip
                width="160"
            >
                <template slot-scope="scope">
                    <span>{{scope.row[columnTableList[3]] | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                :prop="columnTableList[4]"
                :label="columnTableText[4]"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column 
                :label="columnTableText[5]"
                width="60">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    import configInfo from './config.js';
    
    export default {
        data () {
            return {
                test: '',
                colWidth: CONFIG.colWidth,
                tableSize: CONFIG.tableSize,
                // multipleSelection: [],
                columnTableList: [],
                columnTableText: []
            };
        },
        created () {
            this.columnTableList = configInfo.columnList;
            this.columnTableText = configInfo.columnText;
        },
        props: {
            tableData: {
                type: Array,
                default: []
            },
            multipleSelection: {
                type: Array,
                default: []
            }
        },
        model: {
            prop: 'tableData'
        },
        methods: {
            handleSelectionChange (val) {
                this.multipleSelection = val;
                this.$emit("select", this.multipleSelection);
            },
            edit (data) {
                this.$emit("edit", data);
            },
            // 某一行被双击
            handleRowDblclick (row, event) {
            },
            // 当某一行被点击时
            handleRowClick (row = {}, event, column = {}) {
                this.$emit('rowClick', {row, event, column});
            },
            // 单个选择取消
            handleSelect (selection, row) {
                this.$emit('selection', selection);
            },
            // 选择全部   取消全部
            handleSelectAll (selections) {
                this.multipleSelection = selections;
                this.$emit("selection", selections);
            }
        },
        filters: {
            formatStatus (input) {
                let resultGT = typeof input === 'number' ? input : parseInt(input);
                return resultGT === 2 ? '已审核' : '未审核';
            }
        }
    };
</script>

<style scoped lang="scss">
@import "./../../../scss/common";
@import "./../../../scss/variables";
    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }
    .edit-btn-class{
        color: $base-color !important;
        // font-size: 12px;
        // font-weight: 400;
    }
</style>
