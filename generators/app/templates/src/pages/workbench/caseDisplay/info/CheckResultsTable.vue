<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 检查结果报告
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
                width="160"
                show-overflow-tooltip
                prop="itemName"
                label="检查项目（设备类型）">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemResult"
                label="检查项目结果">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="ultraImgReport"
                label="影像与超声检查">
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
                prop="sampleName"
                label="标本名称">
            </el-table-column>
            <el-table-column
                :formatter="formatStatus"
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemResultCode"
                label="危急值状态">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="examPartCode"
                label="检查部位代码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="bodyPosition"
                label="检查部位">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="examMethod"
                label="检查方法">
            </el-table-column>
            <el-table-column
                width="160"
                show-overflow-tooltip
                prop="objReport"
                label="检查报告结果-客观所见">
            </el-table-column>
            <el-table-column
                width="160"
                show-overflow-tooltip
                prop="subReport"
                label="检查报告结果-主观提示">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="reportDate"
                show-overflow-tooltip
                label="报告日期">
                <template slot-scope="scope">
                    {{scope.row.reportDate | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="immunocytoChemistry"
                label="免疫组化">
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
    import {getCheckResults} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: 120,
                total: 0, // 总页数
                checkResultsParams: { // 表格参数
                    jzcode: '', // 就诊号
                    limit: CONFIG.limit, // 每页限数
                    offset: 1 // 当前页数
                },
                tableData: [] // 表格数据
            };
        },

        mounted () {},
        filters: {
            // 判断系统代码  1=放射类 2=超声类 3=内镜类 4=核医学类 5=病理类 6=放疗类 7=心电类
            formatType (val) {
                let obj = {
                    '1': '放射类',
                    '2': '超声类',
                    '3': '内镜类',
                    '4': '核医学类',
                    '5': '病理类',
                    '6': '放疗类',
                    '7': '心电类'
                };
                return obj[val];
            }
        },

        computed: {},

        methods: {
            // 获取表格数据
            _getCheckResults () {
                getCheckResults(this.checkResultsParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 危急值状态  0=无，1=有
            formatStatus (row, column) {
                return row.itemResultCode === '0' ? '无' : row.itemResultCode === '1' ? '有' : '';
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.checkResultsParams = Object.assign({}, this.checkResultsParams, data);
                if (this.checkResultsParams.jzcode) {
                    this._getCheckResults();
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
                    this.checkResultsParams.jzcode = data.jzcode;
                    this._getCheckResults();
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
