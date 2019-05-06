<!-- Created by Nelson on 2018/12/09 -->
<template>
    <div> 
        <el-table
            ref="tableRef"
            :size="tableSize"
            :data="tableData"
            :highlight-current-row = "true"
            :stripe="false"
            height="100%"
            width="100%"
            row-key="id"
            :border="true"
            @current-change="currentSelectRow"
            @sort-change="handleSortChange"
            :default-sort="sortObj"
        >
            <el-table-column
                label="序号"
                type="index"
                prop="id"
                width="50"
                :key="index"
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="versionName"
                :key="versionName"
                label="版本名称"
                :sortable="true"
                width=230
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="projectCode"
                label="目录编码"
                sortable="custom" 
                :key="projectCode"
            width=150>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="projectName"
                :key="4"
                sortable="custom" 
                label="目录名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="updateTime"
                label="修改时间"
                sortable="custom" 
                :key="updateTime"
                width=140>
                <template slot-scope="scope">
                    {{scope.row.updateTime | dateTimeDowith }}
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import CONFIG from 'src/config';
    // import Sortable from 'sortablejs';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth,
                dropCol: [],
                sortObj: {
                    // prop: "projectCode",
                    // order: "descending"
                },
                sortable: null
            };
        },
        watch: {
            tableData: {
                handler (newValue, oldValue) {
                    // this.rowDrop();
                    this.columnDrop();
                    console.log("handler", [this.$refs.tableRef]);
                    // this.$refs.tableRef.setCurrentRow(this.tableData[0]);
                    // this.$refs.tableRef.clearSort();
                },
                deep: true
            }
        },
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            },
            coloumns: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            tableRowClassName ({row, rowIndex}) {
                if (rowIndex % 2 === 0) {
                    return 'warning-row';
                } else if (rowIndex % 2 === 1) {
                    return 'success-row';
                }
                return '';
            },
            currentSelectRow (val) {
                console.log(val);
            },
            edit (data) {
                this.$emit("edit", data);
            },
            del (data) {
                this.$emit("del", data);
            },
            detail (data) {
                this.$emit("detail", data);
            },
            handleSortChange ({column, prop, order}) {
                console.log({column, prop, order});
            }
            // 行拖拽
            // rowDrop () {
            //     // TODO : sss
            //     const tbody = document.querySelector('.el-table__body-wrapper tbody');
            //     console.log('rowDrop', tbody);
            //     const _this = this;
            //     Sortable.create(tbody, {
            //         onStart: function (evt) { // 拖拽开始
            //             console.log(evt);
            //         },
            //         onEnd ({ newIndex, oldIndex }) {
            //             console.log('rowDrop--- onEnd', newIndex, oldIndex);
            //             const currRow = _this.tableData.splice(oldIndex, 1)[0];
            //             _this.tableData.splice(newIndex, 0, currRow);
            //         }
            //     });
            // },
            // 列拖拽
            // columnDrop () {
            //     const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
            //     console.log('columnDrop', wrapperTr);

            //     this.sortable = Sortable.create(wrapperTr, {
            //         delay: 3,
            //         onStart: function (evt) { // 拖拽开始
            //             console.log(evt);
            //         },
            //         onEnd: evt => {
            //             console.log('columnDrop--onEnd', evt.oldIndex, evt.newIndex, this.dropCol);
            //             const oldItem = this.dropCol[evt.oldIndex];
            //             this.dropCol.splice(evt.oldIndex, 1);
            //             this.dropCol.splice(evt.newIndex, 0, oldItem);
            //         }
            //     });
            //     console.log('columnDrop- type', this.sortable);
            // }
        },
        mounted () {
    
        },
        filters: {
            dateTimeDowith (datetime) {
                if (datetime === null || datetime === undefined || datetime === '') {
                    return '';
                }
                if (typeof datetime === 'number') {
                    let date = new Date(datetime);
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    let d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    let h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    let minute = date.getMinutes();
                    let second = date.getSeconds();
                    minute = minute < 10 ? ('0' + minute) : minute;
                    second = second < 10 ? ('0' + second) : second;
                    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
                }
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            }
        }
    };
</script>

<style scoped lang="scss">
  /deep/.el-table .warning-row {
    background: oldlace;
  }
 
  /deep/.el-table .success-row {
    background: #f0f9eb;
  }
</style>
