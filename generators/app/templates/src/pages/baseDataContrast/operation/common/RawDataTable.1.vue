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
            @sort-change="handleSortChange"
            :default-sort="{prop: sortObj.orderByName, order: sortObj.orderBy === 1 ? 'ascending' : 'descending'}"
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
            <!-- <el-table-column
                prop="serialNum"
                label="编号"
                width="80"
                sortable="custom"
                show-overflow-tooltip
            >
            </el-table-column> -->
            <el-table-column
                prop="instOperationCode"
                label="原始手术编码"
                sortable="custom"
                width="120"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="instOperationName"
                label="原始手术名称"
                sortable="custom"
                show-overflow-tooltip
                min-width="136"
            >
                <template slot-scope="scope">
                    <span @click="handleDetailNameClick(scope.row)">{{scope.row.instOperationName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="operationCode"
                sortable="custom"
                show-overflow-tooltip
                label="标准编码"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop="operationName"
                sortable="custom"
                show-overflow-tooltip
                label="标准名称"
                min-width="136"
            >
            </el-table-column>
            <el-table-column
                v-if="tabsActive === 0"
                prop="statusName"
                show-overflow-tooltip
                label="数据状态"
                width="94"
            >
            </el-table-column>
            <el-table-column
                prop="synFlag"
                show-overflow-tooltip
                label="是否同步"
                sortable="custom"
                width="94"
                 v-if="tabsActive === 4 || tabsActive === 6 || tabsActive === 0"
            >
            </el-table-column>
            <el-table-column
                prop="compareOptUser"
                show-overflow-tooltip
                label="对照人"
                sortable="custom"
                width="94"
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
        computed: {
            ...mapGetters(['surgicalControlLeft'])
        },
        watch: {
            surgicalControlLeft: function (newVal, oldVal) {
                console.log(`数据变化了 >>>>>`, newVal);
                this.tableDataRaw = [...newVal];
            }
        },
        created () {
            let localRaw = window.localStorage.getItem("operation");
            localRaw = localRaw ? JSON.parse(localRaw).raw : [...tableDataRaw.OPERATION.raw];
            this.tableDataRaw = [...localRaw];
            console.log(`localRaw >>>>`, localRaw);
            setTimeout(() => { console.log("====>>", this.tableData); }, 5000);
        },
        methods: {
            ...mapMutations(['setsurgicalControlLeft']),
            ...mapActions(['addData']),
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


