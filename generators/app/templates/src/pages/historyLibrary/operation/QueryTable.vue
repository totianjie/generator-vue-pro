<!--
* @Author: GOTINTIN
* @Date: 2019/1/5
* @remark: 手术历史对照列表
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
                prop="instIcd9Code"
                label="原始手术编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="instIcd9Name"
                label="原始手术名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="icd9Code"
                label="标准编码">
            </el-table-column>
            <el-table-column
                prop="icd9Name"
                :min-width="colWidth"
                show-overflow-tooltip
                label="标准名称">
            </el-table-column>
            <el-table-column
                prop="updateBy"
                :min-width="colWidth"
                show-overflow-tooltip
                label="更新者">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                :min-width="colWidth"
                show-overflow-tooltip
                label="更新时间">
                <template slot-scope="scope">
                    {{scope.row.updateTime  | formatTime('yyyy-MM-dd hh:mm:ss') }}
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
