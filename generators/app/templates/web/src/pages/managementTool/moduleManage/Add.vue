<!-- Created by Nelson on 2018/9/18 -->
<template>
    <div class="page">
        <div class="p-t-40">
            <div :class="['h-93',{'h-33':activeIndex===3,'static-1080':activeIndex===1}]">
                <v-steps :active="activeIndex" class="step-wrap p-l-r-40">
                    <v-step title="新建模板" v-if="!isEdit"></v-step>
                    <v-step title="编辑模板" v-if="isEdit"></v-step>
                    <v-step title="业务配置"></v-step>
                    <v-step title="完成"></v-step>
                </v-steps>
                <first-step-header
                    :isEdit="isEdit" 
                    :modelEx="modelEx" 
                    v-if="activeIndex===1" 
                    @addItem="addItem" 
                    @backHome="backHome"
                    @nextStep="nextStep"
                    :templetType="templetType"
                    :tableType="tableType"
                    @updateSec = "updateSec"
                >
                </first-step-header>
                <div 
                    v-if="activeIndex===1"  
                    class="empty-div"
                >
                </div>
                    <second-step-header 
                    v-show="activeIndex===2"
                    @keep="keep"
                    @backLast="backLast"
                    @noticeInfo="noticeInfo"
                    @upResult="upResult"
                    :templetType="templetType"
                >
                </second-step-header>
                <div 
                    v-if="activeIndex===2"  
                    class="empty-div"
                ></div>
            </div>
            
            <first-step
                :isEdit="isEdit" 
                :modelEx="modelEx" 
                v-if="activeIndex===1" 
                :dataList="dbList"
                :heightPage = "heightPage"
                @updateHight="updateHight"
                @changeData="changeData"
                :targetList="targetList"
                :sourceList="sourceList"
                :tableType="tableType"
                :templetType="templetType"
            >
            </first-step>
            <second-step 
                class="step2-view"
                ref="Step2Ref"
                v-show="activeIndex===2"  
                :isEdit="isEdit" 
                :modelEx="modelEx"
                :indexValue="activeIndex"
                :templetType="templetType"
            >
            </second-step>
            <div v-show="activeIndex===2"></div>
            <finish-step class=""
                v-if="activeIndex===3"
                @backHome="backHome"
            >
            </finish-step>
            <div class="notice-info-wrong" v-if="showWrongInfo">
                <div class="el-dialog__wrapper notice-info-wrong-dislog" style="z-index: 2013;">
                    <div class="el-dialog set-center-view-300w" style="margin-top: 0;">
                        <div class="el-dialog__header">
                            <span class="el-dialog__title">
                                <v-detail-title label="报错信息" :leftTag="true" class="m-t-105 p-d-b-0" :boxStyle="boxTop"></v-detail-title>
                            </span>
                            <el-button class="el-dialog__headerbtn no__border" @click="close">     
                                <i class="el-dialog__close el-icon el-icon-close"></i>
                            </el-button>
                        </div>
                        <div class="el-dialog__body set-center-view-150w">
                            {{wrongInfo}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CONFIG from 'src/config';
import DiseaseTable from './components/DiseaseTable';
import WorkFlow from './components/WorkFlow';
import SelectListTable from './components/SelectListTable';
import FirstStep from './operation/FirstStep';
import SecondStep from './operation/SecondStep';
import FinishStep from './operation/FinishStep';
import FirstStepHeader from './operation/FirstStepHeader';
import SecondStepHeader from './operation/SecondStepHeader';
import { templetDetail, dataBaseList, templeUpdate, templeAdd} from "js/api/managementTool/moduleManage";

export default {
    data () {
        return {
            showWrongInfo: false,
            url: `${CONFIG.URL}/zhyb/zhyb`,
            activeIndex: 1,
            textArray: ['新建模板', '业务配置', '完成'],
            textArrayBak: ['编辑模板', '业务配置', '完成'],
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize,
            preMenuName: '',
            dataObj: {},
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            wrongInfo: '',
            test: '',
            dbList: [],
            selectCount: 0,
            total: 0,
            dataBaseArr: [],
            targetList: [],
            sourceList: [],
            heightPage: 0,
            isShowDiseaseList: true
        };
    },
    computed: {

    },
    props: {
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
        params: {
            type: Object,
            default () {
                return {};
            }
        },
        value: {
            type: Boolean,
            default () {
                return false;
            }
        },
        moudleId: {
            type: Number,
            default () {
                return '';
            }
        },
        isEdit: {
            type: Boolean,
            default () {
                return false;
            }
        },
        modelEx: {
            type: Object,
            default () {
                return {
                    templetName: '',
                    remark: '',
                    encAndDec: 1,
                    dbList: []
                };
            }
        }
    },
    created () {
        this._init();
    },
    methods: {
        updateSec (temp_) {
            this.modelEx = Object.assign({}, this.modelEx, {encAndDec: temp_});
        },
        close () {
            this.showWrongInfo = false;
            this.wrongInfo = '';
        },
        _init () {
            if (!this.isEdit) {
                this.modelEx = Object.assign({}, this.modelEx, {encAndDec: 1});
            }
            this.getDataBase();
        },
        changeData (data_) {
            this.modelEx.dbList = data_;
            this.dbList = data_;
        },
        getDataBase () {
            dataBaseList({}).then(res => {
                this.modelEx = Object.assign({}, this.modelEx, res.data);
                this.modelEx.dbList = this.modelEx.dbList || [];
                this.targetList = res.data.targetList;
                this.sourceList = res.data.sourceList;
                if (this.isEdit) {
                    this.getDetailByTemplateId();
                } else {
                    this.modelEx = Object.assign({}, this.modelEx, {encAndDec: 1});
                }
            });
        },
        noticeInfo (text_) {
            this.showWrongInfo = true;
            this.wrongInfo = text_;
        },
        dataInit () {
            this.selectListArr = [];
            this.dataObj = {};
        },
        addItem (data) {
            try {
                this.dataObj = data;
                this.dbList.push({height: 85});
            } catch (error) {
                console.error('error', error.name + error.message);
            }
        },
        backHome (index) {
            if (index === 0) {
                this.$emit("update");
                this.dataInit();
            }
        },
        nextStep (index, obj) {
            this.activeIndex = index;
            this.dataObj = obj;
            this.modelEx = Object.assign({}, this.modelEx, this.dataObj);
            this.$refs.Step2Ref._init(this.dbList);
        },
        keep (data_) {
            try {
                let {templetId, templetName, templetCode, remark, templetDrugId, dbList, decryptKey = '', encAndDec = 1, encryptKey = ''} = this.modelEx;
                let dbList_ = dbList.map(function (tempObj, index_) {
                    try {
                        if (tempObj.resultData && !tempObj.unOpen) {
                            let columns = tempObj.resultData.map((tempObj2, index2_) => {
                                return {sourceColumns: tempObj2.columnNameS === ' ' ? '' : tempObj2.columnNameS || '', targetColumns: tempObj2.columnName, conditi: tempObj2.conditi || '', delConditi: tempObj2.delConditi || '', targetValue: tempObj2.targetValue || '', sourceDec: tempObj2.sourceDec ? 1 : 0, targetEnc: tempObj2.targetEnc ? 1 : 0};
                            });
                            let {sourceDbId, targeDbId, sourceTableName, targeTableName, sourceSql, timestampColumn} = tempObj;
                            return {sourceDbId, targeDbId, sourceTableName, targeTableName, columns, sourceSql, timestampColumn};
                        } else if (tempObj.resultDataBak && tempObj.unOpen) {
                            let columns = tempObj.resultDataBak.map((tempObj2, index2_) => {
                                return {sourceColumns: tempObj2.columnNameS === ' ' ? '' : tempObj2.columnNameS || '', targetColumns: tempObj2.columnName, conditi: tempObj2.conditi || '', delConditi: tempObj2.delConditi || '', targetValue: tempObj2.targetValue || '', sourceDec: tempObj2.sourceDec ? 1 : 0, targetEnc: tempObj2.targetEnc ? 1 : 0};
                            });
                            let {sourceDbId, targeDbId, sourceTableName, targeTableName, sourceSql, timestampColumn} = tempObj;
                            return {sourceDbId, targeDbId, sourceTableName, targeTableName, columns, sourceSql, timestampColumn};
                        } else {
                            return {};
                        }
                    } catch (error) {
                        console.error('error-dbList.map', error.name + error.message);
                    }
                }).filter(item => {
                    return item.columns && item.columns.count !== 0;
                });
                let request_ = {templetId, templetName, remark, templetDrugId, templetCode, dbList: dbList_, tableType: this.tableType, templetType: this.templetType, decryptKey, encAndDec: encAndDec + '', encryptKey};
                if (this.isEdit) {
                    templeUpdate(Object.assign({}, request_, {})).then(res => {
                        this.activeIndex = 3;
                    });
                } else {
                    templeAdd(Object.assign({}, request_, {})).then(res => {
                        this.activeIndex = 3;
                    });
                }
            } catch (error) {
                console.error('error', error.name + error.message);
            }
        },
        getDetailByTemplateId (templateId) {
            templetDetail({templetId: this.modelEx.templetId}).then(res => {
                this.modelEx = Object.assign({}, this.modelEx, res.data);
                let that = this;
                let list = this.modelEx.dbList.map(function (tempObj, index_) {
                    let {sourceDbId, targeDbId, sourceTableName, targeTableName, sourceTables, targeTables, columnsVo, columns, timestampColumn, sourceSql} = tempObj;
                    let {targeColumns, sourceColumns} = columnsVo;
                    let resultData = targeColumns;
                    resultData.forEach(function (tempObj1_) {
                        tempObj1_.tableNameS = sourceTableName;
                        tempObj1_.columnNameS = '';
                        tempObj1_.columnCommentS = '';
                        columns.forEach(function (tempObj3_) {
                            if (tempObj1_.columnName === tempObj3_.targetColumns) {
                                tempObj1_.columnNameS = tempObj3_.sourceColumns;
                                tempObj1_.targetValue = tempObj3_.targetValue;
                                tempObj1_.delConditi = tempObj3_.delConditi;
                                tempObj1_.conditi = tempObj3_.conditi;
                                tempObj1_.sourceDec = tempObj3_.sourceDec + '' === '1' ? true : false;
                                tempObj1_.targetEnc = tempObj3_.targetEnc + '' === '1' ? true : false;
                            }
                        });
                        sourceColumns.forEach(function (tempObj2_) {
                            // console.info(tempObj1_, tempObj2_, tempObj1_.columnNameS, tempObj2_.columnName, tempObj1_.columnNameS === tempObj2_.columnName);
                            if (tempObj1_.columnNameS === tempObj2_.columnName) {
                                tempObj1_.columnCommentS = tempObj2_.columnComment || '';
                                tempObj1_.dataTypeS = tempObj2_.dataType || '';
                            }
                        });
                    });
                    let options = sourceColumns.map(function (tempObj2_) {
                        return {columnName: tempObj2_.columnName, columnComment: tempObj2_.columnComment};
                    });
                    // options.splice(0, 0, {"columnName": " "});
                    let height = resultData.length * 30 + 85;
                    let tempId = index_;

                    let targetDataBaseName = that.targetList.map((tempObj2, i) => {
                        if (tempObj2.dbId === tempObj.targeDbId) {
                            return tempObj2.name;
                        }
                    }).filter(item => {
                        return item !== undefined;
                    })[0];
                    let sourceDataBaseName = that.sourceList.map((tempObj3, i) => {
                        if (tempObj3.dbId === tempObj.sourceDbId) {
                            return tempObj3.name;
                        }
                    }).filter(item => {
                        return item !== undefined;
                    })[0];
                    return {targetDataBaseName, sourceDataBaseName, tempId, sourceDbId, targeDbId, sourceTableName, targeTableName, sourceTables, targeTables, height, options, resultData, timestampColumn, sourceSql};
                });
                this.dbList = list;
                this.modelEx.dbList = list;
                if (this.modelEx.encAndDec + '' !== '0') {
                    this.modelEx.encAndDec = 1;
                } else {
                    this.modelEx.encAndDec = 0;
                }
            });
        },
        backLast () {
            this.activeIndex = 1;
            console.log('backLast', this.modelEx.encAndDec);
        },
        upResult (tempId_) {
            this.modelEx.templetDrugId = tempId_;
            this.$refs.Step2Ref._init();
        }
    },
    watch: {
 
    },
    components: {DiseaseTable, WorkFlow, SelectListTable, FirstStep, SecondStep, FinishStep, FirstStepHeader, SecondStepHeader }

};
</script>

<style lang="scss" scoped>
    .page {
        height: 100%;
        width: 100%;
        min-width: 1360px;
    }
    .h-93{
        height: 93px;
        width: 100%;
    }
    .static-1080{
        min-width:1080px;
    }
    .h-33{
        height: 33px !important;
        width: 100%;
    }
    .p-t-40 {
        margin-top: 17px;
        height: calc(100% - 20px);
        width: 100%;
        min-width: 1200px;
    }
    .p-l-r-40 {
        padding-left: 220px;
        padding-right: 220px;
        min-width: 600px;
    }
    .empty-div{
        height: 8px;
        background-color: #eff2f6;
    }
    .step2-view{
        // background-color: #ff91080;
    }
    .notice-info-wrong{
        .notice-info-wrong-dislog {
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 2045;
            width: 100%;
            height: 100%;
        }

        .no__border {
            border-width: 0px;
            // margin-right: 20px;
            width: 16px;
            height: 16px;
            // margin-left: 20px;
            // margin-top: 5px;
            padding-left: 3px;
            padding-top: 3px;
        }
        .no__border:focus, .no__border:hover{
            background-color: white !important;
        }

        .el-dialog__body{
            padding: 20px 50px !important;
        }

        .password__input{
            width: 70%;
        }

        .password__input2{
            width: 90%;
        }
        .m-r-40{
            margin-right:16px;
        }
        .p-d-b-0{
            padding-bottom: 0px !important;
            padding-top: 15px !important;
        }

        .el-dialog__header{
            padding-left: 10px !important;
        }

        .set-center-view-150w {
            left: 10px !important;
            right: 10px !important;
            margin: 0 !important;
            top: 10px !important;
            word-break: break-word;
        }

        .set-center-view-300w {
            left: calc(50% - 210px) !important;
            right: calc(50% - 210px) !important;
            margin: 0 !important;
            top: calc(50% - 150px) !important;
            width: 420px;
        }
    }
</style>
