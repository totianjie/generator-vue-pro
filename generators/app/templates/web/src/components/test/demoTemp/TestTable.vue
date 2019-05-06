<template>
    <el-table
        :data="tableData"
        style="width: 100%"
        type="selection"
        ref="multipleTable"
        height="300px"
        :highlight-current-row="true"
        :stripe="true"
        :row-class-name="tableRowClassName"
        @row-dblclick="handleRowDblclick"
        @row-click="handleRowClick"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @sort-change="handleSortChange"
    >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            sortable="custom"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            sortable="custom"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
    </el-table>
</template>

<script>
    import {addEvent} from 'js/utils/dom';

    export default {
        data () {
            return {
                tableData: [
                    {
                        id: 1,
                        index: 0,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 2,
                        index: 1,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        id: 3,
                        index: 2,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        id: 4,
                        index: 3,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },
                    {
                        id: 5,
                        index: 4,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 6,
                        index: 5,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        id: 7,
                        index: 6,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        id: 8,
                        index: 7,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ],
                shiftKey: false, // 是否按下了shift键
                lastTimeIndex: '', // 当前选中第几个，用于shiftKey 加点击做比较
                selectionList: [] // 所有被选中的checkbox 用于shiftKey 加点击做比较
            };
        },
        mounted () {
            addEvent(document, 'keydown', () => {
                this.shiftKey = true;
                return false;
            });
            addEvent(document, 'keyup', () => {
                this.shiftKey = false;
                return false;
            });
        },
        methods: {
            // 某一行被双击
            handleRowDblclick (row, event) {
                // console.log(row, event);
            },
            // 当某一行被点击时
            handleRowClick (row = {}, {shiftKey} = {}, column = {}) {
            },
            // 单个选择取消
            handleSelect (selection, row) {
                if (selection.length > this.selectionList.length) { // 是取消
                    if (this.lastTimeIndex !== '' && this.shiftKey) { // 按下shift的时候

                        let start = '';
                        let end = '';

                        /* if (row.index > this.lastTimeIndex) { // 从上向下选
                            start = Math.min(this.lastTimeIndex + 1, row.index);
                            end = Math.max(this.lastTimeIndex + 1, row.index);
                        } else { // 下往上选
                            start = Math.min(this.lastTimeIndex, row.index + 1);
                            end = Math.max(this.lastTimeIndex, row.index + 1);
                        } */
                        if (row.index > this.lastTimeIndex) { // 从上向下选
                            start = Math.min(this.lastTimeIndex, row.index + 1);
                            end = Math.max(this.lastTimeIndex, row.index + 1);
                        } else { // 下往上选
                            start = Math.min(this.lastTimeIndex + 1, row.index);
                            end = Math.max(this.lastTimeIndex + 1, row.index);
                        }
                        // 去除被选中的，把没有被选中的挑出来  在下一步设置为选中
                        let currentSelect = this.tableData.slice(start, end).filter(item => selection.findIndex(child => child.id === item.id) === -1);

                        currentSelect.forEach(item => {
                            this.$refs.multipleTable.toggleRowSelection(item);
                        });
                    }
                    this.lastTimeIndex = row.index;
                } else {
                    this.lastTimeIndex = '';
                }
                this.selectionList = JSON.parse(JSON.stringify(selection));
            },
            // 选择全部   取消全部
            handleSelectAll (selection) {
                if (selection.length) {
                    this.selectionList = JSON.parse(JSON.stringify(selection));
                } else {
                    this.selectionList.length = 0;
                }
                this.lastTimeIndex = '';
            },
            // 排序
            handleSortChange ({column, prop, order}) {
                console.log(column, prop, order);
            },
            // 行className
            tableRowClassName ({row, rowIndex}) {
                // if (rowIndex % 2 === 1) {
                //     return 'highlight-row';
                // } else {
                //     return '';
                // }
            },
            _setKeyCode (b) {
                this.shiftKey = b;
                return false;
            }
        },
        destroyed () {
        }
    };
</script>
<style>
    .el-table .highlight-row {
        background: #dcf1f1;
    }
</style>


