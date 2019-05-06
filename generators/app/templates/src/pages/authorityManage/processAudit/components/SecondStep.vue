<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第一步
-->
<template>
    <div class="second-boby" v-if="show">
        <el-table 
            :data="tableData"
            :show-header="false"
            row-key="id"
            class="list-table"
        >
            <el-table-column
                prop="id"
                label="序号"
                width="80"
            >
                <template slot-scope="scope">
                    {{scope.row.index | formatIndex }}
                </template>
            </el-table-column>
            <el-table-column
                prop="nodeName"
                label="节点名称"
                width="150"
            >
                <template slot-scope="scope">
                    {{scope.row.nodeName | formatNodeName }}
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注信息"
                :min-width="colWidth"
            >
               <template slot-scope="scope">
                    {{scope.row.remark | formatRemark }}
                </template>
            </el-table-column>
            <el-table-column 
                :min-width="colWidth"
                label="驳回节点" 
                width="280">
                <template slot-scope="scope">
                    <div class="h-30 w-270-block" >
                        <div class="cell-text-w-70" >驳回节点:</div>
                        <div class="h-30 w-190 cell-border-set f-right" 
                             :class="options[scope.row.index].length===0?'disabled-style':''">
                            <el-dropdown 
                                :trigger="options[scope.row.index].length===0?'':'click'" 
                                class="pointer dropdown-select-style" 
                                :disabled="options[scope.row.index].length===0">
                                <span class="el-dropdown-link text-ellipsis el-tooltip h-12-block-r-20-box" :class="options[scope.row.index].length===0?'disabled-allow-style':''">
                                    {{scope.row.rejectedName | formatrejectedName}}
                                    <i class="el-icon-arrow-down pos-ab-r-5"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="handlerChange(scope.row, '')" class="drop-select">无</el-dropdown-item>
                                    <el-dropdown-item @click.native="handlerChange(scope.row, item)" v-for="item in options[scope.row.index]" :key="item.nodeName" class="drop-select">{{item.nodeName}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column 
                :min-width="colWidth"
                label="转向节点" 
                width="280">
                <template slot-scope="scope">
                    <div class="h-30 w-270-block">
                        <div class="cell-text-w-70">转向节点:</div>
                        <div 
                            class="h-30 w-190 cell-border-set f-right" 
                            :class="options2[scope.row.index].length===0?'disabled-style':''">
                            <el-dropdown 
                                :trigger="options2[scope.row.index].length===0?'':'click'" 
                                class="pointer dropdown-select-style" 
                                :disabled="options2[scope.row.index].length===0">
                                <span class="el-dropdown-link text-ellipsis el-tooltip h-12-block-r-20-box">
                                    {{scope.row.turnToName | formatturnToName}}
                                    <i class="el-icon-arrow-down pos-ab-r-5"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown" >
                                    <el-dropdown-item @click.native="handlerChange1(scope.row, '')" class="drop-select">无</el-dropdown-item>
                                    <el-dropdown-item @click.native="handlerChange1(scope.row, item)" v-for="item in options2[scope.row.index]" :key="item.nodeName" class="drop-select">{{item.nodeName}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column 
                :min-width="colWidth"
                label="" 
                width="10">
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
            show: true,
            test: '',
            colWidth: CONFIG.colWidth,
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize,
            options2: [],
            options: [],
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
        delData: {
            type: Array,
            default () {
                return [];
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
    computed: {
        total () {
            return this.tableData.length;
        }
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
            let backArr = [];
            let goArr = [];
            let allListArr = [];
            for (let i = 0; i < this.tableData.length; i++) {
                let {nodeCode, nodeName} = this.tableData[i];
                allListArr.push({nodeCode, nodeName});
            }
            for (let i = 0; i < allListArr.length; i++) {
                backArr.push(allListArr.slice(0, i));
                goArr.push(allListArr.slice(i + 2, allListArr.length));
            }
            this.options = backArr;
            this.options2 = goArr;
        },
        handlerChange (item, part) {
            console.log('handlerChange-->', item, part);
            this.tableData = this.tableData.map(tempObj => {
                if (tempObj.id === item.id) {
                    tempObj.rejectedName = part.nodeName;
                    tempObj.rejectedCode = part.nodeCode;
                }
                return tempObj;
            });
            this.$emit('changeData', this.tableData, 2);
        },
        handlerChange1 (item, part) {
            console.log('handlerChange1-->', item, part);
            this.tableData = this.tableData.map(tempObj => {
                if (tempObj.id === item.id) {
                    tempObj.turnToName = part.nodeName;
                    tempObj.turnToCode = part.nodeCode;
                }
                return tempObj;
            });
            this.$emit('changeData', this.tableData);
        }
    },
    filters: {
        formatIndex (index_) {
            return '序号:' + (index_ + 1);
        },
        formatNodeName (name_) {
            return '节点名称:' + name_;
        },
        formatRemark (remark_) {
            return '备注信息:' + remark_;
        },
        formatturnToName (turnToName_) {
            return turnToName_ && turnToName_.length > 0 ? turnToName_ : '无';
        },
        formatrejectedName (rejectedName_) {
            return rejectedName_ && rejectedName_.length > 0 ? rejectedName_ : '无';
        }
    },
    components: {

    }
};
</script>
<style lang="scss" scoped>
    .second-boby{
        margin-top: 15px;
        height: 100%;
    }
    // /deep/ .el-input--mini .el-input__inner{
    //     height: 17px;
    //     line-height: 17px;
    // }
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
    .disabled-style{
        background-color: #f5f7fa;
        cursor: not-allowed;
    }
    .disabled-allow-style{
        cursor: not-allowed;
    }
    .list-table{
        height: 100%;
    }

    .h-30{
        border-radius: 5px;
        height:30px;
        line-height:30px;
    }
    .w-270-blcok{
        width:270px;
        display:inline-block;
    }
    .cell-text-w-70{
        width:65px;
        float:left;
        padding-left: 5px;
    }
    .w-190{
        width:190px;
    }
    .cell-border-set {
        border:1px solid #dcdfe6;
    }
    .f-right{
        float: right;
    }
    .dropdown-select-style{
        width:calc(100% - 5px);
        font-size:12px;
        padding-left:5px;
        text-align:right;
    }
    .h-12-block-r-20-box{
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        display: block;
        width: 100%;
        padding-right:20px;
        box-sizing:border-box;
        outline: none;
    }
    .pos-ab-r-5{
        position: absolute;
        right: 5px;
    }
    /deep/ .el-dropdown-menu{
        overflow-y: scroll;
        max-height: 65%;
    }
</style>
