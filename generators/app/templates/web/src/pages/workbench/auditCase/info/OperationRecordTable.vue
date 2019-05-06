<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 手术记录信息
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
                prop="surgeryName"
                label="手术名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="surgeryCode"
                label="手术操作编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdSurgeryCode"
                label="标准手术操作编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdSurgeryName"
                label="标准手术名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="surgeryTime"
                label="手术时间">
                <template slot-scope="scope">
                    {{scope.row.surgeryTime | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdDamName"
                label="引流标准材料名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="beforeDiagCode"
                label="术前诊断编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdBeforeDiagCode"
                label="标准术前诊断编码">
            </el-table-column>
            <el-table-column
                width="160"
                show-overflow-tooltip
                prop="stdBeforeDiagViceCode"
                label="标准术前诊断副编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdBeforeDiag"
                label="标准术前诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="duringDiagCode"
                label="术中诊断编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="duringDiag"
                label="术中诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdDuringDiagCode"
                label="标准术中诊断编码">
            </el-table-column>
            <el-table-column
                width="160"
                show-overflow-tooltip
                prop="stdDuringDiagViceCode"
                label="标准术中诊断副编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdDuringDiag"
                label="标准术中诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="afterDiagCode"
                label="术后诊断编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="afterDiag"
                label="术后诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdAfterDiagCode"
                label="标准术后诊断编码">
            </el-table-column>
            <el-table-column
                width="160"
                show-overflow-tooltip
                prop="stdAfterDiagViceCode"
                label="标准术后诊断副编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdAfterDiag"
                label="标准术后诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="anaMethodName"
                label="麻醉方式">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="startTime"
                label="手术开始时间">
                <template slot-scope="scope">
                    {{scope.row.startTime | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="endTime"
                label="手术结束时间">
                <template slot-scope="scope">
                    {{scope.row.endTime | formatTime('yyyy-MM-dd hh:mm:ss') }}
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
    import {getOperationRecord} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: 120,
                total: 0, // 分页总条数
                operationRecordParams: { // 表格参数
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
            _getOperationRecord () {
                getOperationRecord(this.operationRecordParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 判断是否附加手术  true=是  false=否
            formatYesNo (val) {
                return val.additionSurgeryFlag === true ? '是' : val.additionSurgeryFlag === false ? '否' : '';
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.operationRecordParams = Object.assign({}, this.operationRecordParams, data);
                if (this.operationRecordParams.jzcode) {
                    this._getOperationRecord();
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
                    this.operationRecordParams.jzcode = data.jzcode;
                    this._getOperationRecord();
                    console.log('_getData==>>', Math.random(), data);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .wrap{
        height: 100%;
        overflow: hidden;
        .el-table th>.cell {
            white-space: nowrap;
        }
    }
</style>
