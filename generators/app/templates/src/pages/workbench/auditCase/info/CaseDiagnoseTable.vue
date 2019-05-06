<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 病案首页诊断信息
-->
<template>
    <div class="wrap">
        <el-table
            border
            class="table"
            :size="tableSize"
            :data="tableData"
            highlight-current-row
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
                prop="diagCode"
                label="诊断编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diagName"
                label="诊断名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdDiagCode"
                label="标准诊断编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdDiagViceCode"
                label="标准诊断副编码">
            </el-table-column>
            <el-table-column
                width="140"
                show-overflow-tooltip
                prop="stdDiagName"
                label="标准主要诊断名称">
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
    import {getCaseDiagnose} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: '110px',
                total: 0, // 分页总条数
                caseDiagnoseParams: { // 表格参数
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
            _getCaseDiagnose () {
                getCaseDiagnose(this.caseDiagnoseParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.caseDiagnoseParams = Object.assign({}, this.caseDiagnoseParams, data);
                if (this.caseDiagnoseParams.jzcode) {
                    this._getCaseDiagnose();
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
                    this.caseDiagnoseParams.jzcode = data.jzcode;
                    this._getCaseDiagnose();
                    console.log('_getData==>>', Math.random(), data);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
</style>
