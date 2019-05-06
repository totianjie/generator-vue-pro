<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-01 16:48:23
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-01 16:48:23
* @remark: 左边  原始数据模块  表格区  tab页面为: 未对照  已对照未审核   撤销审核  已审核
-->
<template>
    <div class="w-fill">
        <el-table
            class="sort-table"
            :size="tableSize"
            :data="tableData"
            style="width: 100%"
            border
            cell-class-name="pointer current-active"
            type="selection"
            ref="multipleTable"
            height="100%"
            :highlight-current-row="true"
            :stripe="true"
            @row-dblclick="handleRowDblclick"
            @row-click="handleRowClick"
            @select="handleSelect"
            @select-all="handleSelectAll"
            :default-sort="{prop: sortObj.orderByName, order: sortObj.orderBy === 1 ? 'ascending' : 'descending'}"
            @sort-change="handleSortChange"
        >
            <el-table-column
                type="selection"
                width="30"
            >
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="id"-->
            <!--label="序号"-->
            <!--width="50"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                type="index"
                label="序号"
                width="50"
            >
            </el-table-column>
            <el-table-column
                v-for='(item,index) in tableDataRaw'
                :key='index'
                :label='item.label'
                :width='item.width'
                :prop='item.prop'
                :show-overflow-tooltip="item.tooltip"
                :sortable="item.sortable"
               v-if="__show(item, index)"
                
            >
            </el-table-column>
            <el-table-column
                prop="dode7"
                width="50"
                label="操作"
            >
                <template slot-scope="scope">
                    <span class="on" @click="handleDetail(scope.row)">详情</span>
                </template>
            </el-table-column>
            <!-- <el-table-column
                prop="serialNum"
                label="编号"
                width="80"
                sortable="custom"
                show-overflow-tooltip
            >
            </el-table-column> -->
           
        </el-table>
        <!-- 查看详情 -->
        <dialog-detail v-model="detailDialog" :detailDialogData="detailDialogData" @deleteDetail="handleDelete" @closeDetail="handleCloseDetail"/>
    </div>
</template>

<script>
    import mixin from './../../components/RawDataTableMixins';
    import busEvent from 'src/busEvent';
    import DialogDetail from './DialogDetail';
    import * as tableDataRaw from '../../tableColDefault.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('comparisonForm');
    export default {
        mixins: [mixin],
        data () {
            return {
                tableDataRaw: []
            };
        },
        created () {
            let localRaw = window.localStorage.getItem("cost");
            localRaw = localRaw ? JSON.parse(localRaw).raw : [...tableDataRaw.COST.raw];
            this.tableDataRaw = [...localRaw];
            console.log(`localRaw >>>>`, localRaw);
        },
        computed: {
            ...mapGetters(['chargeComparisonLeft'])
        },
        watch: {
            chargeComparisonLeft: function (newVal, oldVal) {
                console.log(`数据变化了 >>>>>`, newVal);
                this.tableDataRaw = [...newVal];
            }
        },
        methods: {
            ...mapMutations(['setchargeComparisonLeft']),
            ...mapActions(['addData']),
            __show (item, index) {
                let that = this;
                switch (item.prop) {
                case `synFlag`:
                    if (that.tabsActive === 4 || that.tabsActive === 6 || that.tabsActive === 0) {
                        return true;
                    } else {
                        return false;
                    }
                case `statusName`:
                    if (that.tabsActive === 0) {
                        return true;
                    } else {
                        return false;
                    }
                default:
                    return true;
                }
            },
            handleDetailNameClick (row) { // 原始诊断名称
                busEvent.$emit('baseDataContrast/operation/common/RawDataTableMixins.rowClick', row);
            }
        },
        components: {DialogDetail}
    };
</script>
<style scoped lang="scss">
    @import './../../../../scss/_variables.scss';

    .on {
        color: $base-color;
    }
</style>
<style lang="scss">
    @import './../../../../scss/variables';

    .disease-control-wrap .table-current-row .current-active {
        background: $default-table-current-bg !important;
    }
</style>


