<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 检验报告
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
                prop="specNo"
                label="检验标本号">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="labSno"
                label="检验流水号">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="labResultSno"
                label="检验结果流水号">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="specDt"
                label="接受标本日期时间">
                <template slot-scope="scope">
                    {{scope.row.specDt | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="specKind"
                label="标本类别">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="specStatus"
                label="标本状态">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="testDt"
                label="检验日期">
                <template slot-scope="scope">
                    {{scope.row.testDt | formatTime('yyyy-MM-dd') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="name"
                label="检验项目中文名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemResultDesCode"
                label="检验提示">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="microDataResult"
                label="细菌培养结果描述">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="microDataNum"
                label="细菌量">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="drugDataChName"
                label="抗生素中文名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="durgDataResultDes"
                label="抗生素定性结果">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="durgDataResultNum"
                label="抗生素定量结果">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemresultDesName"
                label="检验定性结果">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemResultNum"
                label="检验定量结果">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="refVal"
                label="参考值">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="sign"
                label="指标异常">
            </el-table-column>
            <el-table-column
                :formatter="formatCode"
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemResultCode"
                label="危险值状态">
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
    import {getCheckReport} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: 120,
                total: 0, // 总页数
                checkRecordParams: { // 表格参数
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
            _getCheckReport () {
                getCheckReport(this.checkRecordParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 判断是否危险值状态  0=无  1=有
            formatCode (row) {
                console.log('判断是否危险值状态', row);
                return row.itemResultCode === '0' ? '无' : row.itemResultCode === '1' ? '有' : '';
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.checkRecordParams = Object.assign({}, this.checkRecordParams, data);
                if (this.checkRecordParams.jzcode) {
                    this._getCheckReport();
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
                    this.checkRecordParams.jzcode = data.jzcode;
                    this._getCheckReport();
                    console.log('_getData==>>', Math.random(), data);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .wrap{
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .table{
            flex: 1;
        }
        .el-table th>.cell {
            white-space: nowrap;
        }
    }
</style>
