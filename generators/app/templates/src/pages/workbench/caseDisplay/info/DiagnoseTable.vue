<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 诊断信息归类
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
                width="55">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="jzcode"
                label="就诊号">
            </el-table-column>
            <el-table-column
                width="55"
                :formatter="formatSex"
                show-overflow-tooltip
                prop="sex"
                label="性别">
            </el-table-column>
            <el-table-column
                width="55"
                show-overflow-tooltip
                prop="age"
                label="年龄">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diagSource"
                label="诊断来源">
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
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdDiagName"
                label="标准诊断名称">
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
    import {getDiagnosisList} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: '110px',
                total: 0, // 分页总条数
                diagnosisParams: { // 表格参数
                    jzcode: '', // 就诊号
                    limit: CONFIG.limit, // 每页限数
                    offset: 1 // 当前页数
                },
                tableData: [] // 表格数据
            };
        },

        mounted () {},

        methods: {
            // 获取诊断信息归类表格数据
            _getDiagnosisList () {
                getDiagnosisList(this.diagnosisParams).then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    // 年龄的转换
                    res.data.list.forEach((item, index) => {
                        item.age = Math.ceil(item.age / 12);
                    });
                }).catch(err => {
                    console.log('操作失败', err);
                    this.tableData = [];
                    this.total = 0;
                });
            },
            // 判断性别 1=男 2=女 0=未知
            formatSex (row) {
                return row.sex === '1' ? '男' : row.sex === '2' ? '女' : '未知';
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.diagnosisParams = Object.assign({}, this.diagnosisParams, data);
                if (this.diagnosisParams.jzcode) {
                    this._getDiagnosisList(); // 调用列表
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
                    this.diagnosisParams.jzcode = data.jzcode;
                    this._getDiagnosisList(); // 调用表格
                    console.log('_getData DiagnoseTable==>>', Math.random(), data);
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
