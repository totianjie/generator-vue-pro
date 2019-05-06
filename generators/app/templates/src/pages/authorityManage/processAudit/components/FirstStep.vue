<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第一步
-->
<template>
    <div class="first-boby" v-if="show">
        <div class="add-btn" v-if="tableData.length===0">
            <el-button @click="add(0)" :size="btnSize">新增</el-button>
        </div>
        <el-table 
            class="list-table"
            :class="tableData.length===0?'add-style':'normal-style'"
            :data="tableData"
            border
            row-key="id"
            :highlight-current-row="true"
            :stripe="true"
        >
            <el-table-column
                type="index"
                label="序号"
                width="50"
            >
            </el-table-column>
            <el-table-column
                prop="nodeName"
                label="节点名称"
                width="150"
            >
                <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.nodeName" style="padding:0;" @blur="nameSet(scope.row, scope.row.nodeName)" @on-mouseenter="mouseenter(scope.row, scope.row.nodeName)" @on-mouseleave="mouseleave(scope.row, scope.row.nodeName)" maxlength="30"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注信息"
            >
                <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.remark" style="padding:0;" @blur="remarkSet(scope.row, scope.row.remark)" @on-mouseenter="mouseenter(scope.row, scope.row.remark)" @on-mouseleave="mouseleave(scope.row, scope.row.targetValue)" maxlength="100"></el-input>
                </template>
            </el-table-column>
            <el-table-column 
                :min-width="colWidth"
                fixed="right" 
                label="操作" 
                :show-overflow-tooltip="false" 
                width="150">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="add(scope.row)" type="text" v-show="scope.row.add" size="small">添加节点</el-button>
                    <el-button @click="del(scope.row)" type="text" v-show="scope.row.delete" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import CONFIG from 'src/config';
// import Sortable from 'sortablejs'; // 如果要支持拖拽 npm install sortablejs --save;
import {deepCopy} from 'js/utils/utils';
export default {
    data () {
        return {
            show: true,
            test: '',
            colWidth: CONFIG.colWidth,
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize,
            tempId: 201819001,
            selectCount: 0
        };
    },
    props: {
        tableData: {
            type: Array,
            default () {
                return [
                ];
            }
        }
    },
    mounted () {
        this.rowDrop();
    },
    created () {
        this.init();
    },
    watch: {

    },
    methods: {
        rowDrop () {
            // 如果要支持拖拽;
            // const tbody = document.querySelector('.el-table__body-wrapper tbody');
            // const _this = this;
            // Sortable.create(tbody, {
            //     onEnd ({ newIndex, oldIndex }) {
            //         const currRow = _this.tableData.splice(oldIndex, 1)[0];
            //         console.log('tag', 'ssssss');
            //         _this.tableData.splice(newIndex, 0, currRow);
            //     }
            // });
        },
        init () {

        },
        add (item) {
            let result = this.tableData.map((item2, index) => {
                return item2 === item ? index : null;
            }).filter((item2, index) => {
                return item2 != null;
            })[0];
            this.tempId++;
            let temp_ = {
                id: '',
                nodeName: '',
                remark: '',
                delete: true,
                add: true,
                rejectedName: '',
                turnToName: '',
                lowerNodeName: '',
                tempId: this.tempId
            };
            this.tableData.splice(result + 1, 0, temp_);
            this.$emit('changeData', this.tableData, 1);
        },
        del (item) {
            let result = this.tableData.map((item2, index) => {
                return item2 === item ? index : null;
            }).filter((item2, index) => {
                return item2 != null;
            })[0];
            this.tableData.map((item2, index) => {
                if (item2.turnToCode === item.id) {
                    item2.turnToCode = '';
                    item2.turnToName = '';
                }
                if (item2.rejectedCode === item.id) {
                    item2.rejectedCode = '';
                    item2.rejectedName = '';
                }
                return item2;
            });
            let delItem = deepCopy(this.tableData[result]);
            this.$emit('delData', delItem);
            this.tableData.splice(result, 1);
            this.$emit('changeData', this.tableData);
        },
        remarkSet (item, part) {
            this.$emit('changeData', this.tableData);
        },
        nameSet (item, part) {
            this.$emit('changeData', this.tableData);
        }
    },
    computed: {
        total () {
            return this.tableData.length;
        }
    },
    components: {

    }
};
</script>
<style lang="scss" scoped>
    .first-boby{
        margin-top: 15px;
        height: 100%;
    }
    /deep/ .el-input--mini .el-input__inner{
        height: 17px;
        line-height: 17px;
    }
    /deep/ .el-select>.el-input{
        max-width: 180px;
        min-width: 60px;
    }
    .list-table{
        height: 100%;
    }
    .add-style{
        height:calc(100% - 48px);
    }
    .normal-style{
        height: 100%;
    }
    .add-btn{
        height: 47px;
        margin-left: 30px;
    }
</style>
