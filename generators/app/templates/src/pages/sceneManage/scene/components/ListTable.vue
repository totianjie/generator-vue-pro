<template>
    <el-table
        :size="tableSize"
        :data="tableData"
        highlight-current-row
        :stripe="true"
        height="100%"
        width="100%"
        border
    >
        <el-table-column
            label="序号"
            type="index"
            width="50"
        />
        <el-table-column
            v-for="item in tableRows"
            :key="item.appId"
            :min-width="item.colWidth"
            :show-overflow-tooltip="item.tooltip"
            :prop="item.prop"
            :label="item.label"
            
        />
        <el-table-column
            fixed="right"
            label="操作"
            width="120"
        >
            <template slot-scope="scope">
                <el-button
                    class="edit-btn-class"
                    @click="handleEdit(scope.row)"
                    type="text"
                    size="small">编辑
                </el-button>
                <el-button
                    class="edit-btn-class"
                    @click="handleDetail(scope.row)"
                    type="text"
                    size="small">查看
                </el-button>
            </template>
        </el-table-column>
    </el-table>
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
                colWidth: "100px",
                tableRows: [
                    // {tooltip: true, minWidth: this.colWidth, prop: 'appId', label: 'appId'},
                    {tooltip: true, minWidth: this.colWidth, prop: 'appName', label: '场景名称'},
                    {tooltip: true, minWidth: this.colWidth, prop: 'ruleNum', label: '规则数量'},

                    {tooltip: true, minWidth: this.colWidth, prop: 'createUser', label: '创建人'},
                    {tooltip: true, minWidth: this.colWidth, prop: 'myCreateTime', label: '创建时间'},
                    {tooltip: true, minWidth: this.colWidth, prop: 'updateUser', label: '更新人'},

                    {tooltip: true, minWidth: this.colWidth, prop: 'myUpdateTime', label: '更新时间'}
                ]
            };
        },
        methods: {
            // 编辑
            handleEdit (data) {
                this.$emit("edit", data);
            },
            handleDetail (data) {
                this.$emit("detail", data);
            }
        },
        filters: {
            
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import "./../../../../scss/common";
    @import "./../../../../scss/variables";

    .edit-btn-class {
        color: $base-color !important;
    }
</style>
