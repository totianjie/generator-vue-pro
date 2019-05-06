<!-- Created by Nelson on 2019/01/24 -->
<template>
    <section class="box">
        <div class="head">
            <div class="pull-right w-210">
                <el-button :size="btnSize" @click="handlerAdd" type="primary">新建规则分类</el-button>
                <el-button :size="btnSize" @click="handlerDel" type="primary">删除</el-button>
            </div>
            <div class="addFormPart">
                <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" :size="formSize">
                    <el-col :span="12" class="m-b-8">
                        <el-form-item 
                            label="保险名称："
                            prop="insuranceName"
                        >
                            <el-input v-model="addForm.insuranceName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="m-b-8">
                        <el-form-item 
                            label="保险编号："
                            prop="insuranceCode"
                        >
                            <el-input v-model="addForm.insuranceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="m-b-8">
                        <el-form-item 
                            label="详情描述："
                            prop="describe"
                        >
                            <el-input type="textarea" v-model="addForm.describe"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="m-b-8">
                        <el-form-item 
                            label="备注信息："
                            prop="remark"
                        >
                            <el-input type="textarea" v-model="addForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
        </div>

    
        <div class="content">
            <item-view v-for="(item, index) in itemArr" :clauseList="clauseList" :key="index" :item.sync="item" style="" @selectCheck="selectCheck"></item-view>
        </div>

        <footer class="footer text-center">
            <div>
                <el-button @click="handlerCancel" :size="btnSize" type="primary">取消</el-button>
                <el-button @click="handlerSubmit" :size="btnSize" type="primary">保存</el-button>
            </div>
        </footer>

    </section>
</template>

<script>
    import {getDetail, getRuleClass, updateData, addData} from "js/api/shangbao/businessManage.js";
    import CONFIG from 'src/config';
    import ItemView from './ItemView';
    import {deepCopy} from 'js/utils/utils';
    export default {
        data () {
            return {
                test: '',
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.homeFormSize,
                addForm: {
                },
                clauseList: [],
                title: '新建保险',
                title2: '编辑保险',
                itemArr: [],
                model: {
                    clauseName: '',
                    clauseId: '',
                    rules: [
                    ],
                    validityTerm: '',
                    clauseRemark: ''
                },
                // 表单验证
                rules: Object.assign({}, {
                    insuranceName: [
                        {trigger: 'blur', message: '请输入保险名称', required: true}
                    ],
                    insuranceCode: [
                        {trigger: 'blur', message: '请输入保险编号', required: true}
                    ]
                }, {
                })
            };
        },
        props: {
            currentEditObj: {
                type: Object,
                default () {
                    return {};
                }
            },
            isEdit: {
                type: Boolean,
                default () {
                    return false;
                }
            }
        },
        created () {
            this._init();
        },
        methods: {
            _init () {
                getRuleClass({}).then(res => {
                    this.clauseList = res.data;
                    if (this.isEdit) {
                        this.getDetailRequest(this.currentEditObj);
                    } else {
                        this.itemArr.push(deepCopy(this.model));
                    }
                });
            },
            handlerAdd () {
                this.itemArr.push(deepCopy(this.model));
            },
            handlerDel () {
                let notice = false;
                for (let i = this.itemArr.length - 1; i >= 0; i--) {
                    let res = this.itemArr[i];
                    if (res.checkSelect === true) {
                        this.itemArr.splice(i, 1);
                        notice = true;
                    }
                }
                if (!notice) {
                    this.$toast("请先勾选");
                }
            },
            getDetailRequest (val) {
                getDetail(val).then(res => {
                    this.itemArr = res.data.list.map(res2 => {
                        res2.hidden = false;
                        res2.checkSelect = false;
                        return res2;
                    });
                    this.addForm = Object.assign({}, res.data.coiInsurance);
                    // this.$refs.ruleListRef._init(this.itemArr);
                });
            },
            handlerSubmit () {
                this.$refs.addForm.validate(value => {
                    if (!value) {
                        return false;
                    }
                    let requestArr = [];
                    if (this.itemArr.length === 0) {
                        this.$toast("请新增规则分类并新增对应的规则");
                        return;
                    }
                    let noticeWarn = false;
                    let noticeWarnArr = [];
                    let noticeListWarn = false;
                    let noticeListWarnArr = [];
                    this.itemArr.forEach((res, index) => {
                        if (res.clauseName === '') {
                            noticeWarn = true;
                            noticeWarnArr.push(index + 1);
                        } else if (res.rules.length === 0) {
                            noticeListWarn = true;
                            noticeListWarnArr.push(index + 1);
                        } else {
                            res.rules.forEach(res2 => {
                                let temp = deepCopy(res);
                                delete temp.rules;
                                let id = res2.insuranceDzRuleId;
                                if (this.isEdit) {
                                    let insuranceId = res2.insuranceId;
                                    if (insuranceId === null || insuranceId === undefined) {
                                        res2.insuranceId = this.currentEditObj.id;
                                    }
                                }
                                let obj = Object.assign({}, res, res2, {id});
                                requestArr.push(obj);
                            });
                        }
                    });
                    if (noticeWarn) {
                        let showText = "第" + noticeWarnArr.join("、第") + "个分类" + "请规则分类";
                        this.$toast(showText);
                        return;
                    }
                    if (noticeListWarn) {
                        let showText = "第" + noticeListWarnArr.join("、第") + "个分类" + "请新增规则";
                        this.$toast(showText);
                        return;
                    }
                    if (this.itemArr.length > 0 && requestArr.length === 0) {
                        this.$toast("请规则分类中必须规则分类和选择规则");
                        return;
                    }
                    let obj = Object.assign({}, {"coiInsurance": this.addForm}, {"list": requestArr});
                    if (this.isEdit) {
                        updateData(obj).then(res => {
                            this.$emit("update", "edit");
                            this.$emit('back', false);
                        });
                    } else {
                        addData(obj).then(res => {
                            this.$emit("update", "add");
                            this.$emit('back', false);
                        });
                    }
                });
            },
            handlerCancel () {
                this.$emit('back', false);
            },
            handleCascaderChange (data) {
                this.addForm.cityCodes = data;
            },
            change (data) {
                if (!this.addForm.cityCodes) {
                    this.addForm.cityCodes = [];
                }
            }
        },
        watch: {

        },
        components: {ItemView}
    };
</script>

<style scoped lang="scss">
    .box {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .head {
            padding-top: 10px;
        }
        .content {
            flex: 1;
            overflow: auto;
        }
        .footer {
            padding: 10px 0;
            border-top: 1px solid #dcdfe6;
        }
    }
    
    /deep/ .el-form-item__label{
        line-height: 32px;
    }
    /deep/ .el-form-item, .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 8px;
    }
    /deep/ .el-input__inner{
        line-height: 32px;
    }
    /deep/ .el-textarea__inner{
        height: 32px;
    }
    /deep/ textarea{
        resize:none;
    }
    .sep-8{
        width: 100%;
        height: 8px;
        line-height: 8px;
        background-color: #F0F0F0;
        color: #F0F0F0;
    }
    .w-210 {
        width:210px;
    }
    .addFormPart{
        width: calc(100% - 260px);
        margin-left: 15px; 
        height:96px;
    }
    .m-t-8{
        margin-top: 8px;
    }
    .m-b-8{
        margin-bottom: 8px;
    }
    .p-b-75 {
        padding-bottom: 75px;
        overflow-y: scroll;
    }
    .border-top-base {
        border-top: 1px solid #dcdfe6;
    }
</style>
