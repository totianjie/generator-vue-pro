<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第一步
-->
<template>
    <div class="rule-list">
        <el-table 
            :data="tableData"
            :show-header="false"
            row-key="id"
            class="list-table"
            @selection-change="handleSelectionChange"
            @select="handleSelect"
            @select-all="handleSelectAll"
        >
            <el-table-column
                type="selection"
                width="30"
            >
            </el-table-column>
            <el-table-column
                prop="mainRuleName"
                label="规则名称"
                :min-width="colWidth"
            >
                <template slot-scope="scope">
                    {{scope.row.mainRuleName | formatRuleName }}
                </template>
            </el-table-column>
            <el-table-column 
                :min-width="colWidth > 216 ? colWidth : 216"
                label="是否赔付" 
                prop="pf"
            >
                <template slot-scope="scope">
                    <div style="display: inline-block"> 
                        是否赔付：
                        <v-select style="max-width:120px;display:inline-block;" 
                                sytleClass="search-tool-text3" 
                                v-model="scope.row.claimClauseName" 
                                @change="changeRuleClass(scope.row)" 
                                :list="selectList" 
                                :size="formSize" 
                                :props="selectProps" 
                                placeholder="请选择" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="categoryName"
                label="规则属性"
                :min-width="colWidth"
            >
                <template slot-scope="scope">
                    {{scope.row.categoryName | formatCategoryName }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import CONFIG from 'src/config';
// import Sortable from 'sortablejs'; // 如果要支持拖拽 npm install sortablejs --save;
// import {deepCopy} from 'js/utils/utils';
export default {
    data () {
        return {
            test: '',
            selectProps: {
                value: 'name',
                label: 'dbId'
            },
            selectList: [
                {
                    "name": "赔付",
                    "label": '1'
                }, {
                    "name": "不赔付",
                    "label": '2'
                }
            ],
            show: true,
            colWidth: CONFIG.colWidth,
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize,
            options2: [],
            options: [],
            mutableArr: [],
            selectCount: 0
        };
    },
    props: {
        tableData: {
            type: Array,
            default () {
                return [];
            }
        },
        selectArr: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    mounted () {

    },
    created () {
        this.init();
    },
    watch: {

    },
    computed: {
        show () {
            return this.tableData.length > 0 ? true : false;
        }
    },
    methods: {
        init () {
           
        },
        changeRuleClass (val) {
            if (val.claimClauseName === '赔付') {
                val.claimClause = '1';
            } else {
                val.claimClause = '2';
            }
            this.$emit("updateData", JSON.parse(JSON.stringify(val)));
        },
        handleSelectionChange (val) {
            this.mutableArr = Object.assign([], val);
            this.$emit("update:selectArr", this.mutableArr);
        },
        handleSelect (obj) {

        },
        handleSelectAll (all_) {

        }
    },
    filters: {
        formatRuleName (name_) {
            return '规则名称：' + name_;
        },
        formatCategoryName (remark_) {
            return '   规则属性：' + remark_;
        }
    },
    components: {

    }
};
</script>
<style lang="scss" scoped>
    /deep/ .el-select>.el-input{
        max-width: 200px;
        min-width: 60px;
    }
    /deep/ .el-table{
        border:0;
    }
    /deep/ .el-table td{
        border:0;
    }
    /deep/ .el-table__fixed-right::before, .el-table__fixed::before{
        height: 0;
    }
    /deep/ .el-table::before{
        height: 0;
    }
    .list-table{
        height: 100%;
    }
    .rule-list{
        border: 1px solid #dcdfe6;
        border-radius:4px;
        margin-top: 0px;
        margin-left: 18px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
    .search-tool-text3{
        line-height: 16px;
        display: inline;
        max-width: 120px;
    }
    /deep/ .el-table{
        font-size: 14px;
    }
</style>
