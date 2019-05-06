<!-- Created by Nelson on 2018/9/18 -->
<template>
    <div>
        <div class="search-tool">
            {{test}}
            <el-form ref="dataselect" :model="searchForm" :rules="rules" :inline="true" label-width="120px" :size="formSize" class="searchForm pull-left">
                <el-form-item label="数据库名称：" prop="selectMenu">
                    <v-select 
                        class="search-status-class" 
                        v-model="searchForm.dataBaseName" 
                        @change="changeDataBase" 
                        :list="sourceList" 
                        :size="formSize" 
                        :props="selectProps" 
                        placeholder="请选择" /> 
                </el-form-item>
                <el-form-item label="数据库表名称：" prop="baseCode">
                    <v-select 
                        class="search-status-class" 
                        v-model="searchForm.tableName" 
                        :list="tableList" 
                        :size="formSize" 
                        @change="changeTable" 
                        :props="selectProps2" 
                        placeholder="请选择" /> 
                </el-form-item>
            </el-form>
            <div class="w-200 pull-right">
                <el-button @click="queryColumnBy" type="primary" class="" :size="btnSize">查询</el-button>
                <el-button @click="outputClick" type="primary" class="" :size="btnSize">导出</el-button>
            </div>
        </div>
        <div class="pageTable pageTable-search-table">
            <div class="">
                <el-table 
                    ref="selectListTableView" 
                    class="select-list-table-view" 
                    :border="true" 


                    :header-cell-style="{backgroundColor:'#F6FAFF'}"  
                    :size="tableSize" 
                    :data="coloumnList"
                    :highlight-current-row="true" 
                    @row-click="handleRowClick" 
                    width="100%"
                    :height="tableHeightPage"
                    @cell-mouse-enter="cellMouseEnter"
                    @cell-mouse-leave="cellMouseLeave"
                >
                    <el-table-column label="是否导出" prop="select" class-name="input-table" width="72">
                        <template slot-scope="scope">
                            <el-checkbox class="block check-info" v-model="scope.row.select" @change="setSelect(scope.row, scope.row.select)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="表字段名称" show-overflow-tooltip prop="columnName" :resizable="false">
                    </el-table-column>
                    <el-table-column label="设置字段表头" prop="setTitle" class-name="input-table"  :min-width="160" :resizable="false" >
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.setTitle" style="padding:0;" @blur="setTitle(scope.row, scope.row.setTitle)" @on-mouseenter="mouseenter(scope.row, scope.row.targetValue)" @on-mouseleave="mouseleave(scope.row, scope.row.targetValue)" placeholder="请输入表头名称"></el-input>
                        </template>
                    </el-table-column>
                   <el-table-column label="导出字段序号" prop="setOrder" class-name="input-table" :min-width="130" :resizable="false" >
                        <template slot-scope="scope">
                            <el-input size="mini" oninput = "value=value.replace(/[^\d]/g,'')" v-model="scope.row.setOrder" style="padding:0;" @blur="setOrder(scope.row, scope.row.setOrder)" placeholder="请输入序号,必填"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import CONFIG from 'src/config';
import {dataBaseList, dbTableList, dbColumnList, outPutExcel} from "js/api/managementTool/outPutTool";
// import {dbTableList, dbColumnList} from "js/api/managementTool/moduleManage";
export default {
    data () {
        return {
            test: '',
            searchForm: {

            },
            sourceList: [],
            tableList: [],
            coloumnList: [],
            selectProps: {
                value: 'name',
                label: 'dbId'
            },
            selectProps2: {
                value: 'tableName',
                label: 'tableName'
            },
            tableSize: CONFIG.tableSize,
            colWidth: CONFIG.colWidth,
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize
        };
    },
    props: {
       
    },
    created () {
        this.getDataBase();
    },
    computed: {
    
    },
    mounted () {
        
    },
    methods: {
        outputClick () {
            let isSetOrder = true;
            let selectList = JSON.parse(JSON.stringify(this.coloumnList)).filter((res, index) => {
                return res.select === true;
            }).map(res => {
                res.excelHead = res.setTitle;
                if (res.setOrder + '' === '') {
                    isSetOrder = false;
                }
                res.sortNum = res.setOrder;
                delete res.setTitle;
                delete res.setOrder;
                delete res.tableName;
                delete res.columnComment;
                delete res.dataType;
                delete res.select;
                delete res.matchingColumnName;
                return res;
            }) || [];
            let result_ = {};
            try {
                result_ = this.sourceList.filter(item => {
                    return item.name === this.searchForm.dataBaseName;
                })[0];
            } catch (error) {
                result_ == null;
                console.error('error-changeDataBase', this.searchForm.dataBaseName, error.name + error.message);
            }
            if (result_ === null || result_ === undefined) {
                this.$toast("请先选择数据库");
                return;
            }
            console.log('tag', result_);

            if (selectList.length === 0) {
                this.$toast("请先选择要导出的字段");
                return;
            }
            if (!isSetOrder) {
                this.$toast("请填写导出字段序号,必填");
                return;
            }
            let obj = {dbId: result_.dbId, dbName: this.searchForm.dataBaseName, tableName: this.searchForm.tableName, columnList: selectList};
            outPutExcel(obj).then(res => {
                this._$download(res);
            });
        },
        queryColumnBy () {
            let result_ = {};
            try {
                result_ = this.sourceList.filter(item => {
                    return item.name === this.searchForm.dataBaseName;
                })[0];
            } catch (error) {
                result_ = null;
                console.error('error-changeDataBase', this.searchForm.dataBaseName, error.name + error.message);
            }
            if (result_ === null || result_ === undefined) {
                this.$toast("请先选择数据库");
                return;
            }
            dbColumnList({dbId: result_.dbId, dbName: this.searchForm.dataBaseName, tableName: this.searchForm.tableName}).then(res => {
                this.coloumnList = res.data.map(res2 => {
                    res2.select = false;
                    res2.setTitle = '';
                    res2.setOrder = '';
                    return res2;
                });
            });
        },
        getDataBase () {
            dataBaseList({}).then(res => {
                this.sourceList = res.data.sourceList;
            });
        },
        queryTablesByDBId (dbId_, tableName_, ori_) {
            return dbTableList({dbId: dbId_, tableName: tableName_, ori: ori_}).then(res => {
                return res.data;
            });
        },
        setSelect (val) {

        },
        setTitle (val) {

        },
        setOrder (val) {

        },
        changeDataBase (data_) {
            if (!data_) {
                this.searchForm.dataBaseName = '';
                this.searchForm.tableName = '';
                return;
            }
            this.searchForm.tableName = '';
            try {
                let result_ = this.sourceList.filter(item => {
                    return item.name === data_;
                })[0];
                let results2 = this.queryTablesByDBId(result_.dbId, result_.name, true);
                results2.then(res => {
                    this.tableList = res || [];
                });
            } catch (error) {
                console.error('error-changeDataBase', data_, error.name + error.message);
            }
        }
    },
    filters: {
       
    },
    filter: {

    },
    components: {}
};
</script>

<style lang="scss" scoped>
    .w-200{
        width: 200px;
    }
    /deep/ .el-input--mini .el-input__inner{
        height: 17px;
        line-height: 17px;
    }
    /deep/ .el-select>.el-input{
        max-width: 180px;
        min-width: 60px;
    }
    .check-info{
        width: 14px;
        height: 14px;
        margin: 2px auto 2px auto;
    }
    .show-hidden-div{
        float: left;
        display: block;
        height: 34px;
    }
    .pageTable {
        width: 100%;
        margin-top: 8px;
    }

    .select-list-table-view-head {
        background-color: #F6FAFF !important;
        th{
            background-color: #F6FAFF !important;
        }
    }

    .pageTable-search {
        height: 45px;
        display: flex;
    }

    .pageTable::after {
        clear: both;
    }
    /deep/.el-table th>.cell{
        line-height: 19px;
    }

    /deep/ .el-select .el-input .el-select__caret{
        line-height: 14px;
        font-size: 12px;
        max-height: 16px;
    }
    .search-tool {
        margin-top: 8px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        width: 100%;
        display: inline-block;

        button {
            margin-left: 15px;
            width: 60px;
        }
    }

    .pageTable-search-table{
        margin-top: 5px;
    }


    .select-list-table-view {
        width: 100%;
        overflow-x:none;
    }

    .table-select-style {
       /deep/ .el-input__inner{
            line-height: 15px;
            height: 15px;
            padding: 0 8px;
            font-size: 12px;
        }
    }

    /deep/ .input-table {
        // padding: 3px 0 !important;
        /deep/ .cell{
            padding: 0 4px 0 4px;
        }
    }
    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }

    /deep/ .pop-select.el-select-dropdown__item{
        line-height: 20px !important;
        height: 20px !important;
    }

</style>
 