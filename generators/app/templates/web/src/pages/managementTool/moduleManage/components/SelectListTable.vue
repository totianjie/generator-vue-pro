<!-- Created by Nelson on 2018/9/18 -->
<template>
    <div class="pageTable" :style="{height:heightPage}" :data-s222="params.height">
        <div class="pageTable pageTable-search">
            <div class="search-tool" :class="isSql?'search-tool1':'search-tool2'">
                <div class="target-class" style="display:inline-block;margin-right:5px;" :class="isSql||!isAdd?'w-23-p':'w-18-p'">
                    <span class="search-tool-line">目标库名称：</span>
                    <v-select style="width:calc(100% - 90px);display:inline-block;" 
                              sytleClass="search-tool-text v-select-w-160" 
                              v-model="targetDataBaseName" 
                              @change="changeTargetDataBase" 
                              :list="toArr" 
                              :size="formSize" 
                              class="" 
                              :props="selectProps" 
                              placeholder="请选择" />
                </div>
                <div class="target-class" style="display:inline-block;margin-right:5px;" :class="isSql||!isAdd?'w-23-p':'w-18-p'">
                    <span class="search-tool-line">目标表名称：</span>
                    <v-select style="width:calc(100% - 90px);display:inline-block;" 
                              sytleClass="search-tool-text v-select-w-160" 
                              v-model="targeTableName" 
                              @change="changeTargetTable" 
                              :list="toColsArr" 
                              filterable
                              :size="formSize" 
                              class="" 
                              :props="selectProps2" 
                              placeholder="请选择" />
                </div>
                <div style="display:inline-block;margin-right:5px;" :class="isSql||!isAdd?'w-23-p':'w-18-p'">
                    <span class="search-tool-line">源库名称：</span>
                    <v-select style="width:calc(100% - 80px);display:inline-block;" 
                              sytleClass="search-tool-text v-select-w-160" 
                              v-model="sourceDataBaseName" 
                              @change="changeComingDataBase" 
                              :list="fromArr" 
                              :size="formSize"
                              filterable
                              class="" 
                              :props="selectProps" 
                              placeholder="请选择" />
                </div>
                <div style="display:inline-block;margin-right:5px;" v-if="!isSql" :class="isSql||!isAdd?'w-23-p':'w-18-p'">
                    <span class="search-tool-line">源表名称：</span>
                    <v-select style="width:calc(100% - 80px);display:inline-block;" 
                              sytleClass="search-tool-text v-select-w-160" 
                              v-model="sourceTableName" 
                              @change="changeComingTable" 
                              :list="fromColsArr" 
                              :size="formSize" 
                              filterable
                              class="" 
                              :props="selectProps2" 
                              placeholder="请选择" />
                </div>
                <div class="" style="display:inline-block;margin-right:5px;" v-if="isAdd" :class="isSql||!isAdd?'w-23-p':'w-18-p'">
                    <span class="search-tool-line">增量字段选择：</span>
                    <v-select style="width:calc(100% - 110px);display:inline-block;" 
                              sytleClass="search-tool-text v-select-w-160" 
                              v-model="timestampColumn" 
                              @change="changeAddColomn" 
                              :list="options2" 
                              :size="formSize"
                              filterable
                              class="" 
                              :props="selectProps3" 
                              placeholder="请选择" />
                </div>
            </div>
            <div :class="isSql?'w-1-btns':'w-2-btns'" class="other-button">
                <div style="margin: 0 auto 0 auto;width:100%;">
                    <el-button style="margin-right:5px;margin-left:5px !important;" size="small" class="other-button-set" @click="look">预览 </el-button>
                    <el-button style="margin-right:5px;margin-left:5px !important; width:80px;" size="small" class="other-button-set" @click="editSql" v-if="isSql">编写SQL</el-button>
                    <el-button style="margin-right:5px;margin-left:5px !important;" size="small" class="other-button-set" @click="searchLook">查询</el-button>
                    <el-button style="margin-left:5px !important;margin-left:5px !important;" size="small" class="other-button-set2" @click="delTable">删除</el-button>
                </div>
            </div>
        </div>
        <div class="pageTable pageTable-search-table">
            <div class="" :class="isSql?'search-tool1':'search-tool2'">
                <el-table 
                    ref="selectListTableView" 
                    class="select-list-table-view" 
                    :border="true" 
                    :header-cell-style="{backgroundColor:'#F6FAFF'}"  
                    :size="tableSize" 
                    :data="data"
                    :highlight-current-row="true" 
                    @row-click="handleRowClick" 
                    width="100%"
                    :height="tableHeightPage"
                    @cell-mouse-enter="cellMouseEnter"
                    @cell-mouse-leave="cellMouseLeave"
                >
                    <el-table-column label="目标表名称" show-overflow-tooltip prop="tableName" :resizable="false" width="85">
                    </el-table-column>
                    <el-table-column label="目标栏位" show-overflow-tooltip prop="columnName" :resizable="false" width="95">
                    </el-table-column>
                    <el-table-column label="是否加密" prop="columnComment" class-name="input-table" width="72">
                        <template slot-scope="scope">
                            <el-checkbox class="block check-info" v-model="scope.row.targetEnc" @change="targetSerect(scope.row, scope.row.targetEnc)"  :disabled="check"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注说明" show-overflow-tooltip prop="columnComment" class-name="input-table" :min-width="70" :max-width="170">
                    </el-table-column>
                    <el-table-column label="赋值" prop="targetValue" class-name="input-table"  :min-width="80" :resizable="false" >
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.targetValue" style="padding:0;" @blur="targetValueSet(scope.row, scope.row.targetValue)" @on-mouseenter="mouseenter(scope.row, scope.row.targetValue)" @on-mouseleave="mouseleave(scope.row, scope.row.targetValue)"></el-input>
                        </template>
                    </el-table-column>
                   <el-table-column label="限制条件" prop="delConditi" class-name="input-table" :min-width="130" :resizable="false" >
                        <template slot-scope="scope">
                            <el-input size="mini" v-model="scope.row.delConditi" style="padding:0;" @blur="delConditiSet(scope.row, scope.row.delConditi)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="源表名称" show-overflow-tooltip prop="tableNameS" :min-width="70" :max-width="90" :resizable="false">
                    </el-table-column>
                    <el-table-column label="源栏位" prop="columnNameS" width="145" :resizable="false" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="h-30 table-select-style" style="height:17px;line-height:17px;width:125px;">
                                <v-select style="width:100%;display:inline-block;" 
                                          sytleClass="search-tool-text v-select-w-160" 
                                          v-model="scope.row.columnNameS" 
                                          @change="handlerChange(scope.row, scope.row.columnNameS)" 
                                          :list="options" 
                                          size="mini"
                                          filterable
                                          class=""
                                          popperClass="pop-select"
                                          titleText="无"
                                          :props="selectProps3" 
                                          placeholder="" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否解密" prop="columnComment" class-name="input-table" width="72">
                        <template slot-scope="scope">
                            <el-checkbox class="block check-info" v-model="scope.row.sourceDec" @change="comeSerect(scope.row, scope.row.sourceDec)" :disabled="check"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注说明" show-overflow-tooltip prop="columnCommentS" :max-width="170" :min-width="70" >
                    </el-table-column>
                    <el-table-column label="限制条件" prop="conditi" :min-width="130" :resizable="false" v-if="!isSql">
                        <template slot-scope="scope">
                            <el-input size="mini" style="padding:0;" v-model="scope.row.conditi" @blur="conditiSet(scope.row, scope.row.conditi)"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div  :class="isSql?'w-1-btns':'w-2-btns'" class="show-hidden-div" :style="{height:heightPage2}">
                <div class="show-hidden-button select-list-table-view-head" @click="showOrHidden()">
                    <i :class="['show-icon-hidden',{'el-icon-arrow-down':showTable},{'el-icon-arrow-up':!showTable}]"></i>
                </div>
            </div>
        </div>
        <sql-input v-if="sqlInputShow" :sqlInputShow.sync="sqlInputShow" :sql.sync="sql" @updateSql="updateSql"> </sql-input>
        <files-show :fileShow.sync="fileShow" :tableLookData="tableLookData" :tableType="tableType"/>
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>是否自动对照响应字段</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="autoInputResult(false)">不对照</el-button>
                <el-button type="primary" @click="autoInputResult(true)">对照</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import CONFIG from 'src/config';
import {deepCopy} from 'js/utils/utils';
import {dbTableList, dbColumnList, getColumnsBySql} from "js/api/managementTool/moduleManage";
import {getDataFromTable} from "js/api/managementTool/moduleManage";
import SqlInput from './SqlInput';
import FilesShow from './FilesShow';

export default {
    data () {
        return {
            centerDialogVisible: false,
            lookMap: {},
            options: [],
            options2: [],
            tempSql: '',
            sqlInputShow: false,
            targetDataBaseName: '',
            targeTableName: '',
            sourceDataBaseName: '',
            sourceTableName: '',
            test: '',
            timestampColumn: '',
            sql: '',
            selectProps: {
                value: 'name',
                label: 'dbId'
            },
            fileShow: false,
            // targetDataBaseName: '',
            // cDBValue: '',
            selectProps2: {
                value: 'tableName',
                label: 'tableName'
            },
            selectProps3: {
                value: 'columnName',
                label: 'columnName'
            },
            tableLookData: {
                dbName: '',
                table: '',
                sql: '',
                column: [],
                data: []
            },
            addColomn: '',
            toColsArr: [], // 目标表数组
            fromColsArr: [], // 源表数组
            data: [],
            tableSize: CONFIG.tableSize,
            colWidth: CONFIG.colWidth,
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize,
            showTable: true,
            wholeHeight: 0
        };
    },
    props: {
        check: {
            type: Boolean,
            default () {
                return false;
            }
        },
        isAdd: {
            type: Boolean,
            default () {
                return false;
            }
        },
        isSql: {
            type: Boolean,
            default () {
                return false;
            }
        },
        options: {
            type: Array,
            default () {
                return [];
            }
        },
        isEdit: {
            type: Boolean,
            default () {
                return false;
            }
        },
        params: {
            type: Object,
            default () {
                return {};
            }
        },
        // 目标对象
        toArr: {
            type: Array,
            default () {
                return [];
            }
        },
        // toColsArr: {
        //     type: Array,
        //     default () {
        //         return [];
        //     }
        // },
        // 源数据库数组
        fromArr: {
            type: Array,
            default () {
                return [];
            }
        },
        // fromColsArr: {
        //     type: Array,
        //     default () {
        //         return [];
        //     }
        // },
        // 当前表的序号
        tableType: {
            type: Number,
            default () {
                return 0;
            }
        },
        templetType: {
            type: Number,
            default () {
                return 0;
            }
        },
        index: {
            type: Number,
            default () {
                return 0;
            }
        }
    },
    created () {
        this.options = this.params.options;
        this.options2 = this.params.options;
        this.tDB = {dbId: this.params.targeDbId || -1, name: this.params.targetDataBaseName || ''};
        this.cDB = {dbId: this.params.sourceDbId || -1, name: this.params.sourceDataBaseName || ''};
        this.params.resultDataBak = this.params.resultDataBak || [];
        this.data = this.params.resultData || [];
        this.params.targetDataBaseName = this.params.targetDataBaseName || '';
        this.params.targeTableName = this.params.targeTableName || '';
        this.params.sourceDataBaseName = this.params.sourceDataBaseName || '';
        this.params.sourceTableName = this.params.sourceTableName || '';
        this.sql = this.params.sourceSql || '';
        this.tempSql = this.sql;
        this.targetDataBaseName = this.params.targetDataBaseName;
        this.targeTableName = this.params.targeTableName;
        this.sourceDataBaseName = this.params.sourceDataBaseName;
        this.sourceTableName = this.params.sourceTableName;
        this.showTable = !this.params.unOpen;
        this.timestampColumn = this.params.timestampColumn || '';
        if (this.params.targeDbId === undefined || this.params.targeTableName.length === 0) {
            return;
        }
        let results2 = this.queryTablesByDBId(this.params.targeDbId, this.params.targeTableName, true);
        results2.then(res => {
            this.toColsArr = res || [];
        });
        if (this.params.sourceDbId === undefined || this.params.sourceTableName.length === 0) {
            return;
        }
        let results3 = this.queryTablesByDBId(this.params.sourceDbId, this.params.sourceTableName, false);
        results3.then(res => {
            this.fromColsArr = res || [];
        });
        // let result__ = this.requestDetail(this.tDB.dbId || -1, this.targeTableName || '', this.cDB.dbId || -1, this.sourceTableName || '', this.sql || '');
        // result__.then(res => {
        //     let {sourceColumns} = res;
        //     this.data.forEach(res2 => {
        //         let sourceColumns_ = sourceColumns.filter(res3 => {
        //             return res2.columnName = res2.columnNameS;
        //         }) || [];
        //         let sourceColumnsTemp = sourceColumns_[0] || {columnComment: ''};
        //         res2.columnCommentS = sourceColumnsTemp.columnComment || '';
        //     });
        // });
    },
    computed: {
        heightPage () {
            return this.params.height + 'px';
        },
        tableHeightPage () {
            let heightTemp = this.params.height - 50;
            return heightTemp + 'px';
        },
        heightPage2 () {
            return this.params.height === 86 ? 36 : 34 + 'px';
        }
    },
    mounted () {
        // let tooltip = document.getElementsByClassName("tooltip-self-class");
        
    },
    methods: {
        //  获取模板类型文字
        formatType () {
            let tableType = [];
            switch (parseInt(this.tableType)) {
            case 1:
                tableType.push('sql语句');
                break;
            case 2:
                tableType.push('源表');
                break;
            default:
                tableType.push('其他');
                break;
            }
            switch (parseInt(this.templetType)) {
            case 1:
                tableType.push('全量替换');
                break;
            case 2:
                tableType.push('增量');
                break;
            case 3:
                tableType.push('临床路径');
                break;
            case 4:
                tableType.push('全量新增');
                break;
            default:
                tableType.push('其他');
                break;
            }
            return tableType.join('+');
        },
        comeSerect (result_, value) {
            // console.error('comeSerect', result_.columnNameS);
            if (result_.columnNameS === '' || result_.columnNameS === null || result_.columnNameS === undefined) {
                result_.columnNameS = '';
                result_.sourceDec = false;
                this.$toast('选择字段后才能进行字段加解密');
                return;
            }
            this.data = this.data.map(tempObj => {
                if (tempObj.columnName === result_.columnName) {
                    tempObj.sourceDec = value;
                }
                return tempObj;
            });
            this.params.resultData = this.data;
            this.$emit('changeData', this.data, this.index);
            // console.log('comeSerect', result_, value);
        },
        targetSerect (result_, value) {
            this.data = this.data.map(tempObj => {
                if (tempObj.columnName === result_.columnName) {
                    tempObj.targetEnc = value;
                }
                return tempObj;
            });
            this.params.resultData = this.data;
            this.$emit('changeData', this.data, this.index);
            // console.log('targetSerect', result_, value);
        },
        look () {
            // this.fileShow = true;
            if (this.cDB.dbId === -1 || this.cDB.dbId === undefined || (this.sourceTableName + this.sql === '')) {
                if (this.tableType + '' === '1') {
                    this.$toast("请选择源库,编写sql!");
                } else {
                    this.$toast("请选择源库,源表!");
                }
                return;
            }
            let fieldList = [];
            if (this.lookMap.sourceDbId === this.cDB.dbId && this.lookMap.sourceTableName === this.sourceTableName) {
                this.data.map(res2 => {
                    if (res2.columnNameS) {
                        fieldList.push(res2.columnNameS);
                    }
                });
            }
            getDataFromTable({dbId: this.cDB.dbId || -1, tableName: this.sourceTableName || '', sql: this.sql || '', offset: 1, limit: 20, fieldList}).then(res => {
                this.tableLookData.data = Object.assign([], res.data.list);
                this.tableLookData.column = Object.assign([], res.data.fieldList);
                this.tableLookData.dbName = this.sourceDataBaseName;
                this.tableLookData.table = this.sourceTableName;
                this.tableLookData.sql = this.sql;
                this.fileShow = true;
                
            });
        },
        updateSql (tempSql) {
            if (this.tempSql !== tempSql) {
                this.timestampColumn = '';
                this.options2 = [];
                this.$emit('changeAddColomn', '', this.index);
                return;
            }
            this.tempSql = tempSql;
        },
        changeColumnNameS () {

        },
        targetValueSet (result_, value) {
            this.data = this.data.map(tempObj => {
                if (tempObj.columnName === result_.columnName) {
                    tempObj.targetValue = value;
                }
                return tempObj;
            });
            this.params.resultData = this.data;
            this.$emit('changeData', this.data, this.index);

        },
        delConditiSet (result_, value) {
            this.data = this.data.map(tempObj => {
                if (tempObj.columnName === result_.columnName) {
                    tempObj.delConditi = value;
                }
                return tempObj;
            });
            this.params.resultData = this.data;
            this.$emit('changeData', this.data, this.index);
        },
        conditiSet (result_, value) {
            this.data = this.data.map(tempObj => {
                if (tempObj.columnName === result_.columnName) {
                    tempObj.conditi = value;
                }
                return tempObj;
            });
            this.params.resultData = this.data;
            this.$emit('changeData', this.data, this.index);
        },
        editSql () {
            this.sql = this.sql || this.params.sourceSql || '';
            this.sqlInputShow = true;
        },
        handleRowClick (row, event, column) {
        },
        cellMouseEnter (row, column, cell, event) {
            // console.log("cellMouseEnter", row, column, cell, event);
            // // 此方式是操作 node 节点去显示 tooltip 如产品强烈要求需要显示才启用
            // let text = row[column.property];
            // console.log(column.property, text, cell.style);
            // let left = event.clientX - 50;
            // let top = event.clientY - 38;
            // if (text && text.length > 12 && (column.property === 'columnNameS' || column.property === 'targetValue')) {
            //     let tooltip = document.getElementsByClassName("tooltip-self-class")[0];
            //     if (!tooltip) {
            //         let para = document.createElement("div");
            //         para.innerHTML = `<div role="tooltip" aria-hidden="true" class="el-tooltip__popper is-dark tooltip-self-class" style="transform-origin: center bottom 0px;z-index: 2015; top:50px; display: block;position: absolute;left:${left}px;top:${top}px;height:13px;">${text}<div x-arrow="" class="" style="border-style:solid;border-color:transparent;height: 0;width: 0;position: absolute;left: 76px;border-top-color:black;top:33px;"></div></div>`;
            //         document.body.appendChild(para);
            //     }
            // }
        },
        cellMouseLeave (row, column, cell, event) {
            // console.log("cellMouseLeave", row, column, cell, event);
            // // 此方式是操作 node 节点去显示 tooltip 如产品强烈要求需要显示才启用
            // let text = row.columnNameS;
            // if (text && text.length > 12 && column.property === 'columnNameS') {
            //     let tooltip = document.getElementsByClassName("tooltip-self-class")[0];
            //     document.body.removeChild(tooltip.parentNode);
            // }
        },
        queryTablesByDBId (dbId_, tableName_, ori_) {
            return dbTableList({dbId: dbId_, tableName: tableName_, ori: ori_}).then(res => {
                return res.data;
            });
        },
        queryColumnBy (source__, target__, sql__) {
            if (sql__ && sql__.sql.length !== 0) {
                let sourceDbId = source__.dbId;
                let tableName = target__.tableName;
                let targetDbId = target__.dbId;
                let sql = sql__.sql;
                return getColumnsBySql({sourceDbId, tableName, targetDbId, sql}).then(res => {
                    return res.data;
                });
            }
            return dbColumnList({source: source__ || {}, target: target__ || {}}).then(res => {
                return res.data;
            });
        },
        showOrHidden () {
            this.showTable = !this.showTable;
            if (this.showTable) {
                this.params.resultData = deepCopy(this.params.resultDataBak || []) || [];
                this.params.resultDataBak = [];
            } else {
                this.params.resultDataBak = deepCopy(this.params.resultData);
                this.params.resultData = [];
            }
            this.data = this.params.resultData;
            this.$emit("showAll", this.showTable, this.index, this.params.resultData, this.params.resultDataBak);
        },
        changeTargetDataBase (data_) {
            if (!data_) {
                this.targeTableName = '';
                return;
            }
            this.targeTableName = '';
            try {
                let result_ = this.toArr.filter(item => {
                    return item.name === data_;
                })[0];
                this.tDB = result_;
                let results2 = this.queryTablesByDBId(result_.dbId, result_.name, true);
                results2.then(res => {
                    this.toColsArr = res || [];
                });
            } catch (error) {
                console.error('error-changeTargetDataBase', data_, error.name + error.message);
            }
        },
        changeTargetTable (data_) {
            this.targeTableName = data_ || '';
        },
        changeComingDataBase (data_) {
            if (!data_) {
                this.sourceTableName = '';
                this.timestampColumn = '';
                return;
            }
            this.sourceTableName = '';
            this.timestampColumn = '';
            this.sql__ = '';
            this.sql = '';
            if (this.isAdd) {
                this.options2 = [];
            }
            this.$emit('changeAddColomn', '', this.index);

            try {
                let result_ = this.fromArr.filter(item => {
                    return item.name === data_;
                })[0];
                this.cDB = result_;
                let results2 = this.queryTablesByDBId(result_.dbId, result_.name, false);
                results2.then(res => {
                    this.fromColsArr = res || [];
                });
            } catch (error) {
                console.error('error', error.name + error.message);
            }
        },
        changeAddColomn (data_) {
            this.timestampColumn = data_ || '';
            this.data.timestampColumn = this.timestampColumn;
            this.params.timestampColumn = this.timestampColumn;
            this.$emit('changeAddColomn', this.timestampColumn, this.index);
        },
        changeComingTable (data_) {
            this.sourceTableName = data_ || '';
            this.timestampColumn = '';
            this.$emit('changeAddColomn', '', this.index);
            if (this.isAdd) {
                this.options2 = [];
            }
        },
        delTable () {
            this.$emit("delTable", this.index);
            this.data = [];
        },
        searchLook () {
            this.searchResult(false);
            // this.centerDialogVisible = true;
        },
        autoInputResult (temp__) {
            this.centerDialogVisible = false;
            this.searchResult(temp__);
        },
        searchResult (autoInput = false) {
            let result__ = this.requestDetail(this.tDB.dbId || -1, this.targeTableName || '', this.cDB.dbId || -1, this.sourceTableName || '', this.sql || '');
            if (!result__) {
                return;
            }
            this.showTable = true;
            this.params.sourceSql = this.sql;
            this.params.targetDataBaseName = this.targetDataBaseName;
            this.params.targeTableName = this.targeTableName;
            this.params.sourceDataBaseName = this.sourceDataBaseName;
            this.params.sourceTableName = this.sourceTableName;
            this.params.targeDbId = this.tDB.dbId;
            this.params.sourceDbId = this.cDB.dbId;
            let that = this;
            result__.then(res => {
                let {targeColumns, sourceColumns} = res;
                let aColumn = 'matchingColumnName';
                let bColumn = 'columnName';
                let resultData = targeColumns;
                resultData.forEach(function (tempObj1_) {
                    tempObj1_.tableNameS = that.params.sourceTableName;
                    tempObj1_.columnNameS = '';
                    tempObj1_.columnCommentS = '';
                    tempObj1_.targetValue = '';
                    tempObj1_.delConditi = '';
                    tempObj1_.conditi = '';
                    sourceColumns.forEach(function (tempObj2_) {
                        // if (autoInput) {
                        //     if (tempObj1_.columnName === tempObj2_.columnName) {
                        //         console.log('autoInput', tempObj1_.columnName, tempObj2_.columnName);
                        //         tempObj1_.columnNameS = tempObj2_.columnName;
                        //         tempObj1_.columnCommentS = tempObj2_.columnComment;
                        //         tempObj1_.dataTypeS = tempObj2_.dataType;
                        //     }
                        // } else {
                        //     if (tempObj1_.columnName === tempObj2_.columnName) {
                        //         tempObj1_.columnNameS = '';
                        //         tempObj1_.columnCommentS = '';
                        //         tempObj1_.dataTypeS = '';
                        //     }
                        // }
                        if (tempObj1_[aColumn] === tempObj2_[bColumn]) {
                            tempObj1_.columnNameS = tempObj2_.columnName;
                            tempObj1_.columnCommentS = tempObj2_.columnComment;
                            tempObj1_.dataTypeS = tempObj2_.dataType;
                        }
                    });
                });
                that.data = resultData;
                that.params.resultData = resultData;

                let selectArr = sourceColumns.map(function (tempObj3_) {
                    return {columnName: tempObj3_.columnName, columnComment: tempObj3_.columnComment};
                });
                that.params.options = selectArr;
                that.options = that.params.options;
                // that.params.options.splice(0, 0, {"columnName": " "});
                that.options2 = that.params.options;
                that.$emit('changeData', resultData, that.index);
                that.lookMap = {targetDataBaseName: that.targetDataBaseName, targeTableName: that.targeTableName, sourceDataBaseName: that.sourceDataBaseName, sourceTableName: that.sourceTableName, targeDbId: that.tDB.dbId, sourceDbId: that.cDB.dbId, options: that.options};
            }).catch(err => {
                console.error(err);
                this.data = [];
                that.$emit('removeData', that.index);
                that.options = [];
                that.options2 = [];

            });
        },
        requestDetail (tDB_, tTB_, cDB_, cTB_, sql) {
            if (!(tDB_ !== -1 && tTB_.length && cDB_ !== -1 && (cTB_.length || sql.length))) {
                this.$toast("请选择目标库，源库，目标表，源表或SQL");
                return;
            }
            return this.queryColumnBy({dbId: cDB_, tableName: cTB_}, {dbId: tDB_, tableName: tTB_}, {sql: sql});
        },
        handlerChange (data, result_ = '') {
            if (result_ === '') {
                data.columnNameS = '';
                data.columnCommentS = '';
                data.sourceDec = false;
            } else {
                data.columnNameS = result_;
                data.sourceDec = false;
                this.options.map(res => {
                    if (res.columnName === result_) {
                        data.columnCommentS = res.columnComment;
                    }
                });
            }
            this.data = this.data.map(tempObj => {
                if (tempObj.columnName === data.columnName) {
                    tempObj.columnNameS = data.columnNameS;
                    tempObj.columnCommentS = data.columnCommentS;
                }
                return tempObj;
            });
            this.params.resultData = this.data;
            this.$emit('changeData', this.data, this.index);
        }
    },
    filters: {
        textShow (val) {
            if (val == null || (val && val.length)) {
                return 'ok';
            }
        },
        dataFilter (data) {
            if (data && data.length > 0) {
                return data.filter((item, index) => index > 0);
            } else {
                return [];
            }
        },
        formatSec (val) {
            return true;
        }
    },
    filter: {

    },
    components: {SqlInput, FilesShow}
};
</script>

<style lang="scss" scoped>
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
    .show-hidden-button{
        height: 33px;
        border-top:1px solid #DAEFFF;
        border-bottom:1px solid #ebeef5;
        border-right:1px solid #ebeef5;
        // border-left:1px solid #ebeef5;
    }

    .w-18-p{
        width:18%;
    }
    .w-23-p{
        width:23%;
    }
    .search-tool1{
        width: calc(100% - 325px);
        display: inline-block;
        float: left;
    }
    .search-tool2{
        width: calc(100% - 220px);
        display: inline-block;
        float: left;
    }
    /deep/ .el-select .el-input .el-select__caret{
        line-height: 14px;
        font-size: 12px;
        max-height: 16px;
    }
    .search-tool {
        float: left;
        margin-top: 8px;
        margin-left: 5px;
        position: relative;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;

        .search-tool-text {
            display: block;
            float: left;
        }

        .search-tool-line {
            float: left;
            display: block;
            margin-left: 5px;
        }

        button {
            margin-left: 15px;
            width: 60px;
        }
    }

    .pageTable-search-table{
        margin-top: 5px;
    }

    .show-icon-hidden{
        text-align: center;
        display: block;
        padding-top:10px;
    }
    .w-1-btns{
        width: 325px; 
    }
    .w-2-btns{
        width: 220px; 
    }
    .w-1-btns2{
        width: 345px; 
    }
    .w-2-btns2{
        width: 255px; 
    }

    .other-button {
        height: 45px;

        button {
            width: 60px;
            margin-top: 8px;
            height: 32px;
            margin-left: 10px;

        }
    }

    .drop-select{
        font-size: 14px;
        font-weight: 400;
    }

    .other-button-set {
        margin-left: 25px !important;
    }

    .other-button-set2 {
        margin-left: 0px !important;
    }

    .select-list-table-view {
        width: 100%;
        overflow-x:none;
    }
  
    .target-class{
        // min-width:calc(25% + 83px);
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
    // /deep/ .el-checkbox{
    //     font-size: 12px;
    // }
    // /deep/ .el-checkbox__input{
    //     height: 13px;
    // }
    // /deep/ .el-checkbox__inner{
    //     height: 13px;
    // }
</style>
 