<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 出院小结
-->
<template>
    <div class="wrap">
        <el-table
            class="table"
            :size="tableSize"
            :data="tableData"
            highlight-current-row
            border
            :stripe="true"
            height="calc(100% - 52px)"
            width="100%">
            <el-table-column
                label="序号"
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="inHpDiag"
                label="入院诊断">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="outHpDiag"
                label="出院诊断">
            </el-table-column>
            <el-table-column
                prop="inHpDate"
                show-overflow-tooltip
                label="入院日期">
                <template slot-scope="scope">
                    {{scope.row.inHpDate | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                prop="outHpDate"
                show-overflow-tooltip
                label="出院日期">
                <template slot-scope="scope">
                    {{scope.row.outHpDate  | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
        </el-table>
        <v-paging
            :total="total"
            @pagingChange="handlePagingChange">
        </v-paging>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {getLeaveHos} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: '120px',
                total: 0, // 分页总条数
                getLeaveHosParams: {
                    jzcode: '', // 就诊号
                    limit: CONFIG.limit, // 每页限数
                    offset: 1 // 当前页数
                },
                tableData: [] // 表格数据
            };
        },

        mounted () {},

        methods: {
            // 获取表格数据
            _getLeaveHos () {
                getLeaveHos(this.getLeaveHosParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.getLeaveHosParams = Object.assign({}, this.getLeaveHosParams, data);
            },
            // 重置表格数据
            _reset () {
                this.tableData = [];
                console.log('_reset==>>', Math.random());
            },
            // 获取点击上面表格每一行数据，在下面tabs切换页面展示
            _getData (data) {
                if (data.jzcode) {
                    this.getLeaveHosParams.jzcode = data.jzcode;
                    this._getLeaveHos();
                    console.log('_getData==>>', Math.random(), data);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .wrap{
        height: 100%;
        width: 100%;
    }
</style>
