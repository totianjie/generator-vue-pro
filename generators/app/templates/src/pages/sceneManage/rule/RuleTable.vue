<!--
* @Author: Nelson
* @Date: 2019/4/9
* @remark: 场景规则/规则管理列表
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
                v-for="item in currentColumn" 
                :key="item.prop"
                :label="item.name"
                :prop="item.prop"
                :show-overflow-tooltip="item.showToolTip"
                :min-width="item.minWidth"
                :fixed="item.fixed"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120"
                v-if="!isDev"
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
            <el-table-column
                fixed="right"
                label="操作"
                width="80"
                v-if="isDev"
            >
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
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import configInfo from './config.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations} = createNamespacedHelpers('scene/rule');
    
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize
            };
        },
        created () {
            console.log(configInfo);
        },
        computed: {
            currentColumn () {
                if (this.CurrentPage === 'med') {
                    return configInfo.columnMed;
                } else {
                    return configInfo.columnDev;
                }
            },
            isDev () {
                return this.CurrentPage !== 'med';
            },
            tableData () {
                return this.isDev ? this.DevRuleListData : this.MedRuleListData;
            },
            ...mapGetters(['RuleTreeData', 'MedPageSatus', 'DevPageSatus', 'CurrentPage', 'MedRuleListData', 'DevRuleListData', 'MedDetailData', 'DevDetailData'])
        },
        watch: {
            
        },
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            handleEdit (val) {
                if (this.isDev) {
                    this.setDevDetailData(val);
                    this.setDevPageSatus('edit');
                } else {
                    this.setMedDetailData(val);
                    this.setMedPageSatus('edit');
                }
            },
            handleDetail (val) {
                if (this.isDev) {
                    this.setDevDetailData(val);
                    this.setDevPageSatus('detail');
                } else {
                    this.setMedDetailData(val);
                    this.setMedPageSatus('detail');
                }
            },
            ...mapMutations(['setDevPageSatus', 'setMedPageSatus', 'setMedDetailData', 'setDevDetailData'])

        }

    };
</script>
<style lang="scss" scoped>
    @import "./../../../scss/common";
    @import "./../../../scss/variables";
    .edit-btn-class{
        color: $base-color;
    }
    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }
</style>
