<!--
* @Author: GOTINTIN
* @Date: 2019/1/5
* @remark: 收费历史对照列表
-->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="tableData"
            highlight-current-row
            :stripe="true"
            border
            height="100%"
            width="100%">
            <el-table-column
                label="序号"
                type="index"
                width="55">
            </el-table-column>
            <el-table-column
                width="110"
                :min-width="colWidth"
                show-overflow-tooltip
                prop="areaName"
                label="区域">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="dataFrom"
                label="数据批次名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="instCatalogCode"
                label="原始项目编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="instCatalogName"
                label="原始项目名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="instDrugForm"
                label="原始剂型">
            </el-table-column>
            <el-table-column
                prop="catalogCode"
                :min-width="colWidth"
                show-overflow-tooltip
                label="标准编码">
            </el-table-column>
            <el-table-column
                prop="catalogName"
                :min-width="colWidth"
                show-overflow-tooltip
                label="标准名称">
            </el-table-column>
            <el-table-column
                prop="drugForm"
                :min-width="colWidth"
                show-overflow-tooltip
                label="标准剂型">
            </el-table-column>
            <el-table-column
                prop="updateBy"
                :min-width="colWidth"
                show-overflow-tooltip
                label="更新者">
            </el-table-column>
            <el-table-column
                prop="uppdateTime"
                :min-width="colWidth"
                show-overflow-tooltip
                label="更新时间">
                <template slot-scope="scope">
                    {{scope.row.uppdateTime  | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth
            };
        },
        methods: {}
    };
</script>
<style lang="scss" scoped>
</style>
