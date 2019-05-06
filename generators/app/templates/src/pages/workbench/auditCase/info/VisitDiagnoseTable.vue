<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 就诊诊断信息
-->
<template>
    <div class="wrap">
        <el-table
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
                width="55">
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
                prop="icdCode"
                label="标准诊断编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdDiagViceCode"
                label="标准诊断副编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdIcdName"
                label="标准诊断名称">
            </el-table-column>
            <el-table-column
                width="85"
                :formatter="formatYesNo"
                show-overflow-tooltip
                prop="principalFlag"
                label="是否主诊断">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diagTypeName"
                label="诊断类别名称">
            </el-table-column>
            <el-table-column
                width="80"
                show-overflow-tooltip
                prop="order"
                label="排序">
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
    import {getVisitDiagnoseList} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: '110px',
                total: 0, // 分页总条数
                visitDiagnoseParams: { // 表格参数
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
            _getVisitDiagnoseList () {
                getVisitDiagnoseList(this.visitDiagnoseParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 判断是否主非诊断 true=是  false=否
            formatYesNo (val) {
                return val.principalFlag === true ? '是' : val.principalFlag === false ? '否' : '';
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.visitDiagnoseParams = Object.assign({}, this.visitDiagnoseParams, data);
                if (this.visitDiagnoseParams.jzcode) {
                    this._getVisitDiagnoseList();
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
                    this.visitDiagnoseParams.jzcode = data.jzcode;
                    this._getVisitDiagnoseList();
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
