<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 医嘱信息和收费明细药品表格
-->
<template>
    <div class="wrap">
        <el-table
            class="table"
            :size="tableSize"
            :data="detailTableDate"
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
                width="180"
                prop="adviceStartTime"
                show-overflow-tooltip
                label="医嘱开始执行时间">
                <template slot-scope="scope">
                    {{scope.row.adviceStartTime  | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="!(btnAction === '1' && caseType === 1)"
                width="180"
                prop="adviceEndTime"
                show-overflow-tooltip
                label="医嘱结束执行时间">
                <template slot-scope="scope">
                    {{scope.row.adviceStartTime  | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemCode"
                label="医院药品编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemName"
                label="医院药品名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdCatalogCode"
                label="标准目录编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="stdCatalogName"
                label="标准目录名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="price"
                label="单价">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="realItemAmount"
                label="项目实际数量">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="usage"
                label="用法">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="oneTimeDosage"
                label="单次剂量">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="dosageUnit"
                label="剂量单位">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="drugUseFreqName"
                label="用药频次">
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: '110px'
            };
        },
        props: {
            btnAction: {
                type: String,
                default: '1'
            },
            caseType: {
                type: Number,
                default: 1
            },
            detailTableDate: {
                type: Array,
                default () {
                    return [];
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .wrap{
        height: calc(100% - 52px - 48px);
        display: flex;
        flex-direction: column;
    }
</style>
