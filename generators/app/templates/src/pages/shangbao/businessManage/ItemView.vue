<!-- Created by Nelson on 2019/01/24 -->
<template>
    <section class="wrap w-fill">
        <div class="sep-8"></div>
        <div class="" style="float:right;width:180px;margin-top:8px;">
            <el-button :size="btnSize" @click="handlerRuleAdd" type="primary">新增规则</el-button>
            <el-button :size="btnSize" @click="handlerRuleDel" type="primary">删除</el-button>
            <div class="show-hidden-div">
                <div class="show-hidden-button select-list-table-view-head" @click="showOrHidden()">
                    <i :class="['show-icon-hidden',{'el-icon-arrow-down':!hidden},{'el-icon-arrow-up':hidden}]"></i>
                </div>
            </div>
        </div>
        <div class="formClass" style="width: calc(100% - 260px);margin-left: 15px; height:88px;margin-top: 8px;">
            <div style="width: 500px;height: 32px; display: inline-block;">
                <el-checkbox v-model="checked" style="margin-left: 17px;" @change="checkSelect"></el-checkbox>
                <div class="el-form-item is-required el-form-item--small" style="width: 600px;display: inline-block;margin-left: -5px;margin-bottom: 0;width: calc(100% - 50px)">
                    <label for="clauseClass" class="el-form-item__label" style="width: 100px;">规则分类：</label>
                    <div class="el-form-item__content" style="margin-left: -5px;display: inline-block;width:350px;">
                        <v-select style="max-width:200px;display:inline-block;" 
                                sytleClass="search-tool-text2" 
                                v-model="clauseClass" 
                                @change="changeRuleClause" 
                                :list="clauseList" 
                                :size="formSize" 
                                class="" 
                                :props="selectProps" 
                                placeholder="请选择" />
                        <el-input v-model="day" size="small" style="width:80px;margin-left: 25px;" v-show="showDaySet"></el-input>
                        <label for="day" class="" style="margin-left: 10px;width: 30px;" v-show="showDaySet">天</label>
                    </div>
                </div>
            </div>
            <div class="" style="width: 500px;height:14px;margin-left: 123px;color: #f56c6c;font-size: 12px;line-height: 1;padding-top: 4px;">
                {{wrongclauseClass?noticeInfo:""}}
            </div>
            <div style="width: 700px;height: 40px;margin-left: 30px;">
                <div class="el-form-item el-form-item--small">
                    <label for="remark" class="el-form-item__label" style="width: 100px;">备注信息：</label>
                    <label for="remark" class="el-form-item__label" style="width: 150px;margin-left: -5px;text-align: left;">{{clauseRemark}}</label>
                </div>
            </div>
        </div>
        <rule-class-view :tableData="tableData" v-show="!hidden && tableData.length" :selectArr.sync="selectArr" @updateData="updateData"></rule-class-view>
        <rule-list-view :showRuleList.sync="showRuleList" @addRule="addRule"/>
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    import ruleClassView from './ruleClassView';
    import RuleListView from './SelectList';
    export default {
        data () {
            return {
                selectArr: [],
                day: '',
                test: '',
                showRuleList: false,
                hidden: false,
                btnSize: CONFIG.baseBtn,
                colWidth: CONFIG.colWidth,
                tableSize: CONFIG.tableSize,
                formSize: CONFIG.homeFormSize,
                wrongclauseClass: false,
                showDaySet: false,
                noticeInfo: '请选择分类信息',
                clauseRemark: '',
                clauseClass: '',
                selectProps: {
                    value: 'clauseName',
                    label: 'clauseId'
                },
                tableData: []
            };
        },
        created () {
            this._init(this.item);
        },
        props: {
            item: {
                type: Object,
                default: {}
            },
            clauseList: {
                type: Array,
                default: []
            }
        },
        watch: {
            day (val) {
                this.item.validityTerm = val;
                this.$emit("update:item", this.item);
            },
            tableData (val) {
               
            }
        },
        model: {
            prop: 'item'
        },
        methods: {
            updateData (val) {
                this.tableData.forEach(res => {
                    if (res.mainRuleId === val.mainRuleId) {
                        res.claimClauseName = val.claimClauseName;
                        res.claimClause = val.claimClause;
                    }
                });
                this.item.rules = this.tableData;
                this.$emit("update:item", this.item);
            },
            checkSelect (val) {
                this.item.checkSelect = val;
                this.$emit("update:item", this.item);
            },
            addRule (data_) {
                data_.forEach(res => {
                    res.claimClause = 2;
                    res.claimClauseName = "不赔付";
                    this.tableData.push(res);
                });
                this.item.rules = this.tableData;
                this.$emit("update:item", this.item);
            },
            _init (val) {
                this.clauseClass = val.clauseName;
                this.clauseRemark = val.clauseRemark;
                val.rules = val.rules.map(res => {
                    if (res.claimClause + '' === "1") {
                        res.claimClauseName = "赔付";
                    } else if (res.claimClause + '' === "2") {
                        res.claimClauseName = "不赔付";
                    } else {
                        res.claimClauseName = "不赔付.";
                    }
                    return res;
                });
                this.tableData = val.rules;
                let tempC = this.clauseList.filter(resTemp => {
                    return resTemp.clauseId === val.clauseId;
                })[0];
                if (tempC) {
                    if (tempC.clauseType + '' === '1') {
                        this.showDaySet = true;
                        this.day = val.validityTerm;
                    }
                }
            },
            changeRuleClause (val) {
                if (val !== undefined && val !== null) {
                    let clauseModel = this.clauseList.filter(res => {
                        return res.clauseName === val;
                    })[0];
                    this.clauseRemark = clauseModel.remark;
                    this.showDaySet = clauseModel.clauseType + '' === "1";
                    this.item.showDaySet = this.showDaySet;
                    this.item.clauseRemark = clauseModel.remark;
                    this.item.clauseName = this.clauseClass;
                    this.item.clauseId = clauseModel.clauseId;
                    this.$emit("update:item", this.item);
                } else {
                    this.clauseRemark = "";
                    this.clauseClass = "";
                    this.item.clauseRemark = this.clauseRemark;
                    this.item.clauseName = this.clauseClass;
                    this.item.clauseId = '';
                    this.$emit("update:item", this.item);

                }
            },
            handlerRuleAdd () {
                this.showRuleList = true;
            },
            handlerRuleDel () {
                let notice = false;
                this.selectArr.forEach(res2 => {
                    for (let i = this.tableData.length - 1; i >= 0; i--) {
                        let res = this.tableData[i];
                        if (res.mainRuleId === res2.mainRuleId) {
                            this.tableData.splice(i, 1);
                            notice = true;
                        }
                    }
                });
                if (!notice) {
                    this.$toast("请先勾选");
                }
                this.item.rules = this.tableData;
                this.$emit("update:item", this.item);
            },
            showOrHidden () {
                this.hidden = !this.hidden;
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
                this.$emit("select", this.multipleSelection);
            },
            edit (data) {
                this.$emit("edit", data);
            },
            // 某一行被双击
            handleRowDblclick (row, event) {
            },
            // 当某一行被点击时
            handleRowClick (row = {}, event, column = {}) {
                this.$emit('rowClick', {row, event, column});
            },
            // 单个选择取消
            handleSelect (selection, row) {
                this.$emit('selection', selection);
            },
            // 选择全部   取消全部
            handleSelectAll (selections) {
                this.$emit('selection', selections);
            }
        },
        filters: {
            formatStatus (input) {
                let resultGT = typeof input === 'number' ? input : parseInt(input);
                return resultGT ? '已审核' : '审核中';
            }
        },
        components: {ruleClassView, RuleListView}
    };
</script>

<style scoped lang="scss">
    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }
    .sep-8{
        width: 100%;
        height: 8px;
        line-height: 8px;
        background-color: #F0F0F0;
        color: #F0F0F0;
    }
    .show-hidden-div{
        display: inline-block;
        margin-left: 8px;   
    }
    .search-tool-text2{
        line-height: 16px;
        display: inline;
        max-width: 210px;
    }
</style>
