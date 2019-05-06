<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 医嘱信息和收费明细检查、材料、治疗、其他表格
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
                    {{scope.row.adviceStartTime | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                width="180"
                prop="adviceStartTime"
                show-overflow-tooltip
                label="医嘱结束执行时间">
                <template slot-scope="scope">
                    {{scope.row.adviceStartTime | formatTime('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemCode"
                label="医院项目编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemName"
                label="医院项目名称">
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
                v-if="!(btnAction === '4' || btnAction === '5')"
                :min-width="colWidth"
                show-overflow-tooltip
                prop="realItemAmount"
                label="次数">
            </el-table-column>
            <el-table-column
                v-if="!(btnAction === '3' || btnAction === '4' || btnAction === '5')"
                :min-width="colWidth"
                show-overflow-tooltip
                prop="itemAmountUnit"
                label="项目数量单位">
            </el-table-column>
            <el-table-column
                v-if="!(btnAction === '2' || btnAction === '3')"
                :min-width="colWidth"
                show-overflow-tooltip
                prop="realItemAmount"
                label="项目实际数量">
            </el-table-column>
            <el-table-column
                v-if="(caseType === 1 && (btnAction==='3'||btnAction === '4')) || (caseType === 2 && btnAction === '3' )"
                :min-width="colWidth"
                show-overflow-tooltip
                prop="priceUnit"
                label="计价单位">
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
