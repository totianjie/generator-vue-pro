<!-- Created by Nelson on 2019/01/19 -->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="list"
            :highlight-current-row="true"
            :stripe="true"
            :border="true" 
            @row-click="handleRowClick"
            height="100%"
            width="100%"
        >
            <el-table-column
                label="序号"
                type="index"
                width="50"
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[0]"
                label="任务名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[1]"
                label="主机名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[2]"
                label="执行开始时间" width=135>
                <template slot-scope="scope">
                    {{scope.row[columnTableList[2]] | dateTimeDowith }}
                </template>
            </el-table-column>
             <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[3]"
                label="执行结束时间" width=135>
                <template slot-scope="scope">
                    {{scope.row[columnTableList[3]] | dateTimeDowith }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[4]"
                label="执行状态" width=85>
                <template slot-scope="scope">
                    {{formatStatus(scope.row[columnTableList[4]])}}
                </template>
            </el-table-column>

            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[5]"
                label="已执行时间(分钟)" width=120>
            </el-table-column>
             <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[6]"
                label="已执行条数" width=85>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[7]"
                label="执行效率（条/每分钟）" width=150>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[8]"
                label="预计剩余时间(分钟)" width=150>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[9]"
                label="未执行条数" width=85>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[10]"
                label="总条数"  width=85>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import CONFIG from 'src/config';
    import columnList from './config.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations} = createNamespacedHelpers('watchManage');
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                columnTableList: [],
                colWidth: CONFIG.colWidth
            };
        },
        created () {
            this.columnTableList = columnList;
        },
        computed: {
            ...mapGetters(['taskName', 'taskType', 'excStatus', 'parameters', 'list', 'statusEnum', 'taskCode', 'isShowAll', 'total'])
        },
        props: {
            options: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            edit (data) {
                this.$emit("edit", data);
            },
            del (data) {
                this.$emit("del", data);
            },
            detail (data) {
                this.$emit("detail", data);
            },
            handlerChange (id, data) {
            },
            formatStatus (val) {
                try {
                    if (val === null) {
                        return '';
                    }
                    let result = this.statusEnum.filter((res) => {
                        return res.excStatus + '' === val + '';
                    })[0];
                    return result.name || '';
                } catch (error) {
                    console.error('error', error);
                    return '';
                }
            },
            ...mapMutations({
                setTaskName: "setTaskName",
                setTaskType: "setTaskType",
                setExcStatus: 'setExcStatus',
                setParameters: 'setParameters',
                setTaskCode: 'setTaskCode',
                setIsShowAll: 'setIsShowAll',
                setList: 'setList',
                setTotal: 'setTotal',
                setStatusEnum: 'setStatusEnum'
            })
        },
        filters: {
            dateTimeDowith (datetime) {
                if (datetime === null || datetime === undefined) {
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

    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }
</style>
