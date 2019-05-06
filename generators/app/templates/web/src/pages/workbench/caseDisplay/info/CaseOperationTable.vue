<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 病案首页手术信息
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
                prop="code"
                label="手术及操作编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="name"
                label="手术名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdSurgeryCode"
                label="标准手术编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdSurgeryName"
                label="标准手术名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="operDt"
                show-overflow-tooltip
                label="手术及操作日期">
                <template slot-scope="scope">
                    {{scope.row.operDt  | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="level"
                label="手术级别">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="cutGrade"
                label="切口级别">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdCutGrade"
                label="标准切口等级">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="healGrade"
                label="愈合等级">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="cutHealGrade"
                label="切口愈合等级">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="anaMethodName"
                label="麻醉方式">
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
    import {getCaseOperation} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth,
                total: 0, // 分页总条数
                caseOperationParams: { // 表格参数
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
            _getCaseOperation () {
                getCaseOperation(this.caseOperationParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                });
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.caseOperationParams = Object.assign({}, this.caseOperationParams, data);
                if (this.caseOperationParams.jzcode) {
                    this._getCaseOperation();
                }
            },
            // 重置表格数据
            _reset () {
                this.tableData = [];
                console.log('_reset==>>', Math.random());
            },
            // 获取点击表格第一行数据
            _getData (data) {
                if (data.jzcode) {
                    this.caseOperationParams.jzcode = data.jzcode;
                    console.log('this.caseOperationParams.jzcode', this.caseOperationParams.jzcode);
                    this._getCaseOperation();
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
        box-sizing: border-box;
    }
</style>

