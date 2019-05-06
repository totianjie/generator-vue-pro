<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-01 16:48:23
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-01 16:48:23
* @remark: 右边  标准数据模块  表格区
-->
<template>
    <div class="w-fill" style="height:calc(100% - 44px - 33px - 128px); margin-top: 77px;">
        <el-table
            class="sort-table"
            :size="tableSize"
            :data="tableData"
            style="width: 100%"
            border
            cell-class-name="pointer"
            type="selection"
            ref="standardDataTable"
            height="100%"
            :highlight-current-row="true"
            :stripe="true"
            @row-dblclick="handleRowDblclick"
            @row-click="handleRowClick"
            @select="handleSelect"
            @select-all="handleSelectAll"
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
            <!--width="55"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                type="index"
                label="序号"
                width="50"
            >
            </el-table-column>
            <el-table-column
                v-for='(item,index) in tableDataStandard'
                :key='index'
                :label='item.label'
                :width='item.width'
                :prop='item.prop'
                :show-overflow-tooltip='item.tooltip'
                :sortable="item.sortable"
            >
             </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {addEvent} from 'js/utils/dom';
    import CONFIG from 'src/config';
    import * as tableDataStandard from '../../tableColDefault.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('comparisonForm');

    export default {
        data () {
            return {
                // 默认表格数据
                tableDataStandard: [],
                tableSize: CONFIG.tableSize,
                detailDialog: false, // 详情弹框
                listDialog: false, // 标准名称弹框
                shiftKey: false, // 是否按下了shift键
                lastTimeIndex: '' // 当前选中第几个，用于shiftKey 加点击做比较
            };
        },
        created () {
            let localRaw = window.localStorage.getItem("operations");
            console.log(`JSON.parse(localRaw) >>>>`, JSON.parse(localRaw));
            localRaw = localRaw ? JSON.parse(localRaw).standard : [...tableDataStandard.OPERATION.standard];
            this.tableDataStandard = [...localRaw];
            console.log(`tableDataStandard >>>>`, localRaw);
        },
        computed: {
            ...mapGetters(['surgicalControlRight'])
        },
        watch: {
            surgicalControlRight: function (newVal, oldVal) {
                console.log(`数据变化了 >>>>>`, newVal);
                this.tableDataStandard = [...newVal];
            }
        },
        props: {
            tableData: { // 表格数据
                type: Object,
                default () {
                    return [];
                }
            },
            standardDataList: { // 复选框选中的数据
                type: [Array],
                default () {
                    return [];
                }
            }
        },
        mounted () {
            // 某一行被双击
            addEvent(document, 'keydown', (ev) => {
                let oEvent = ev || event;
                if (oEvent.shiftKey) {
                    this.shiftKey = true;
                }
                return false;
            });
            addEvent(document, 'keyup', () => {
                this.shiftKey = false;
                return false;
            });
        },
        methods: {
            ...mapMutations(['setsurgicalControlRight']),
            ...mapActions(['addData']),
            // 某一行被双击
            handleRowDblclick (row, event) {
                // console.log(row, event);
                this.$emit('rowDbClick', row);
                console.log('123456', row);
            },
            // 当某一行被点击时
            handleRowClick (row = {}, {shiftKey} = {}, column = {}) {
                this.$emit('rowClick', row);
            },
            // 单个选择取消
            handleSelect (selection, row) {
                if (selection.length > this.standardDataList.length) { // 是取消
                    console.log(this.lastTimeIndex);
                    console.log(typeof this.lastTimeIndex);
                    console.log(this.shiftKey);
                    if (this.lastTimeIndex !== '' && this.shiftKey) { // 按下shift的时候

                        let start = '';
                        let end = '';
                        if (row.index > this.lastTimeIndex) { // 从上向下选
                            start = Math.min(this.lastTimeIndex, row.index + 1);
                            end = Math.max(this.lastTimeIndex, row.index + 1);
                        } else { // 下往上选
                            start = Math.min(this.lastTimeIndex + 1, row.index);
                            end = Math.max(this.lastTimeIndex + 1, row.index);
                        }
                        // 去除被选中的，把没有被选中的挑出来  在下一步设置为选中
                        let currentSelect = this.tableData.slice(start, end).filter(item => selection.findIndex(child => child.id === item.id) === -1);
                        console.log(currentSelect);
                        currentSelect.forEach(item => {
                            this.$refs.standardDataTable.toggleRowSelection(item);
                        });
                    }
                    this.lastTimeIndex = row.index;
                } else {
                    this.lastTimeIndex = '';
                }
                this.$emit('selection', JSON.parse(JSON.stringify(selection)));
            },
            // 选择全部   取消全部
            handleSelectAll (selection) {
                if (selection.length) {
                    this.$emit('selection', JSON.parse(JSON.stringify(selection)));
                } else {
                    this.$emit('selection', []);
                }
                this.lastTimeIndex = '';
            },
            _reset () { // 表格数据重新请求，把相关数据重置
                this.lastTimeIndex = '';
                this.$refs.standardDataTable.clearSelection(); // 取消当前所有复选
                this.$refs.standardDataTable.setCurrentRow(); // 取消当前单选高亮
            },
            // 排序
            handleSortChange ({column, prop, order}) {
                this.$emit('sort', {column, prop, order});
            }
        }
    };
</script>

