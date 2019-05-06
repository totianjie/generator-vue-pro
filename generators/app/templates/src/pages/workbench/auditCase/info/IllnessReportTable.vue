<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 病理报告
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
                :min-width="colWidth"
                show-overflow-tooltip
                prop="examNo"
                label="病理号">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="sendDiagDate"
                label="送检日期">
                <template slot-scope="scope">
                    {{scope.row.sendDiagDate | formatTime('yyyy-MM-dd') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="reportDate"
                label="报告日期">
                <template slot-scope="scope">
                    {{scope.row.reportDate | formatTime('yyyy-MM-dd') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="sendDiagData"
                label="送检材料">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="clinicDiag"
                label="临床诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="immuneGroup"
                label="免疫组化">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="pathlgDiag"
                label="病理诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="checkDesc"
                label="检查所见">
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
    import {getIllessReport} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: 125,
                total: 0, // 分页总条数
                illessReportParams: { // 表格参数
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
            _getIllessReport () {
                getIllessReport(this.illessReportParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.illessReportParams = Object.assign({}, this.illessReportParams, data);
                if (this.illessReportParams.jzcode) {
                    this._getIllessReport();
                }
            },
            // 重置表格数据
            _reset () {
                this.tableData = [];
                console.log('_reset==>>', Math.random());
            },
            // 获取点击上面表格每一行数据，在下面tabs切换页面展示
            _getData (data) {
                if (data.jzcode) {
                    this.illessReportParams.jzcode = data.jzcode;
                    this._getIllessReport();
                    console.log('_getData==>>', Math.random(), data);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .wrap{
        height: 100%;
        /*display: flex;*/
        /*flex-direction: column;*/
        overflow: hidden;
        /*.table{*/
            /*flex: 1;*/
        /*}*/
        .el-table th>.cell {
            white-space: nowrap;
        }
    }
</style>
