<template>
    <el-table
        :size="tableSize"
        :data="tableData"
        highlight-current-row
        :stripe="true"
        border
        height="100%"
        width="100%"
        @row-dblclick="handleRowDblclick"
        @row-click="handleRowClick"
        @select="handleSelect"
        @select-all="handleSelectAll">
        <el-table-column
            type="selection"
            width="30">
        </el-table-column>
        <el-table-column
            label="序号"
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            :min-width="colWidth"
            show-overflow-tooltip
            prop="mainRuleName"
            label="规则名称">
        </el-table-column>
        <el-table-column
            width="100"
            :min-width="colWidth"
            :formatter="formatStatus"
            show-overflow-tooltip
            prop="mainRuleStatus"
            label="状态">
        </el-table-column>
        <el-table-column
            width="160"
            :min-width="colWidth"
            show-overflow-tooltip
            prop="updateTime"
            label="操作时间">
            <template slot-scope="scope">
                <span>{{scope.row.updateTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
        </el-table-column>
        <el-table-column
            :min-width="colWidth"
            show-overflow-tooltip
            prop="violationDesc"
            label="规则描述">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="50">
            <template slot-scope="scope">
                <el-button
                    class="edit-btn-class"
                    @click="handleEdit(scope.row)"
                    type="text"
                    size="small">编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {getRuleList} from 'src/js/api/shangbao/ruleM';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: "100px",
                tableData: []
            };
        },
        props: {
            value: {
                type: Array,
                default () {
                    return [];
                }
            },
            listParams: {
                type: Object,
                default () {
                    return {
                        offset: 1,
                        limit: CONFIG.limit
                    };
                }
            },
            total: {
                type: Number,
                default () {
                    return 0;
                }
            }
        },
        created () {
            this._getData();
        },
        methods: {
            async _getData () {
                let res = await getRuleList(this.listParams);
                let {list, total, pageNum, pageSize} = res.data;
                console.log('规则列表', res.data);
                pageSize = pageSize < 20 ? 20 : pageSize; // TODO 这条代码是没有用的， 目前后台 返回的参数有误  上线时把这条代码删除
                this.$emit('update:total', total);
                this.$emit('update:listParams', {offset: pageNum, limit: pageSize});
                this.tableData = Object.assign([], list);
            },
            // 编辑
            handleEdit (data) {
                console.log("编辑");
                this.$emit('edit', data);
            },
            handleRowDblclick () {},
            handleRowClick () {},
            handleSelect (arr) {
                console.log('已选', arr);
                this.$emit('input', Object.assign([], arr));
            },
            handleSelectAll (arr) {
                this.$emit('input', Object.assign([], arr));
            },
            formatStatus (row) {
                console.log(row);
                return row.mainRuleStatus === 1 ? '未审核' : row.mainRuleStatus === 2 ? '已审核' : '';
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "./../../../scss/common";
@import "./../../../scss/variables";
.edit-btn-class{
    color: $base-color !important;
    // font-size: 12px;
    // font-weight: 400;
}
</style>
