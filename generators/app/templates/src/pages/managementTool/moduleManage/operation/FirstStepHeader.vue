<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第一步 头部 
-->
<template>
    <div class="step1-header">

        <el-form :inline="true" 
                 class="search-tool" 
                 :model="modelEx" 
                 label-width="100px" 
                 size="small" 
                 :rules="rules"
                 ref="stepHeader" 
        >
            <el-form-item label="模板名称：" 
                          style="height: 32px;line-height: 32px;" 
                          prop="templetName">
                <el-input class="search-tool-text" 
                          maxlength="30" 
                          v-model="modelEx.templetName" 
                          placeholder="请输入" 
                          :size="formSize"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="备注：" 
                          style="height: 32px;line-height: 32px;" 
                          prop="remark">
                <el-input class="search-tool-text" 
                          maxlength="100" 
                          v-model="modelEx.remark" 
                          placeholder="请输入" 
                          :size="formSize"
                ></el-input>
            </el-form-item>
            <el-form-item label="加解密功能：" 
                          style="height: 32px;line-height: 32px;" 
                          prop="remark">
                <el-radio-group v-model="encAndDec">
                    <el-radio :label="0">&nbsp;启用&nbsp;&nbsp;</el-radio>
                    <el-radio :label="1">&nbsp;禁用&nbsp;</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button clalss="add-text" 
                           size="small" 
                           @click="addItem"
                >新增</el-button>
            </el-form-item>
        </el-form>
        <div class="button--right--group">
            <!-- <el-button clalss="addBtn" size="small" @click="addItem" style="margin-right:15px;">新增</el-button> -->
            <el-button class="blueColor" size="small" type="primary" @click="backToListView">取消</el-button>
            <el-button class="blueColor"  size="small" type="primary" @click="nextStep">下一步</el-button>
        </div>
    </div>
</template>

<script>
import CONFIG from 'src/config';

export default {
    data () {
        return {
            encAndDec: -1,
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize,
            rules: Object.assign({}, {}, {
                templetName: [
                    {trigger: 'blur', message: '请输入模板名称', required: true},
                    {max: 30, message: '最大长度为30', trigger: 'blur'},
                    {pattern: /^[0-9a-zA-Z\u4e00-\u9fa5\-_\－\＿\—]+$/, message: '限制输入30个字符，允许输入的符号有-，——，_，-'}
                ],
                remark: [
                    {required: false, trigger: 'blur', max: 100, message: '最大长度为100'},
                    {pattern: /^[0-9a-zA-Z\u4e00-\u9fa5\-_\－\＿\—]+$/, message: '限制输入100个字符，允许输入的符号有-，——，_，-'}
                ]
            })
        };
    },
    computed: {
        // encAndDec () {
        //     return typeof this.modelEx.encAndDec === 'string' ? parseInt(this.modelEx.encAndDec) : this.modelEx.encAndDec;
        // }
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
        modelEx: {
            type: Object,
            default () {
                return {
                    encAndDec: 1
                };
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
        this.init();
    },
    methods: {
        init () {
            // this.encAndDec = typeof this.modelEx.encAndDec === 'string' ? parseInt(this.modelEx.encAndDec) : this.modelEx.encAndDec;
            // console.log('init', this.encAndDec);
        },
        addItem () {
            try {
                this.$emit("addItem", {templetName: this.templetName, remark: this.remark});
            } catch (error) {
                console.error('error', error.name + error.message);
            }
        },
        backToListView () {
            this.$emit("backHome", 0);
        },
        nextStep () {
            this.$refs.stepHeader.validate(value => {
                if (value) {
                    let result = true;
                    let reuslt2 = true;
                    let reuslt3 = false;
                    let goOn = true;
                    let isAddSec = false;
                    let isRemoveSec = false;
                    this.modelEx.encAndDec = this.encAndDec;
                    if (this.modelEx.encAndDec === 0 && this.modelEx.encryptKey && this.modelEx.encryptKey.length > 0 && this.modelEx.decryptKey && this.modelEx.decryptKey.length > 0) {
                        goOn = true;
                    } else if (this.modelEx.encAndDec === 1) {
                        goOn = true;
                    } else if (this.modelEx.encAndDec === 0) {
                        if ((this.modelEx.encryptKey && this.modelEx.encryptKey.length > 0) || (this.modelEx.decryptKey && this.modelEx.decryptKey.length > 0)) {
                            goOn = true;
                        } else {
                            goOn = false;
                        }
                    } else {
                        goOn = false;
                    }
                    if (this.modelEx.encryptKey && this.modelEx.encryptKey.length > 0 && this.modelEx.encryptKey.length !== 16) {
                        this.$toast('加密密钥只支持16位');
                        return;
                    }
                    if (this.modelEx.decryptKey && this.modelEx.decryptKey.length > 0 && this.modelEx.decryptKey.length !== 16) {
                        this.$toast('解密密钥只支持16位');
                        return;
                    }
                    if (!goOn) {
                    }
                    this.modelEx.dbList.forEach(temp => {
                        if (!temp.resultDataBak) {
                            temp.resultDataBak = [];
                        }
                        if (!temp.resultData) {
                            temp.resultData = [];
                        }
                        if ((temp.resultData.length + temp.resultDataBak.length) > 0) {
                            result = false;
                        }
                        if (!result && temp.timestampColumn && temp.timestampColumn.length > 0) {
                        
                        } else {
                            reuslt2 = false;
                        }
                        let infoTemp = [...temp.resultData, ...temp.resultDataBak];
                        infoTemp.forEach(temp2 => {
                            if (temp2.columnNameS && temp2.columnNameS.length) {
                                reuslt3 = true;
                            }
                            if (temp2.targetEnc === true) {
                                isAddSec = true;
                            }
                            if (temp2.sourceDec === true) {
                                isRemoveSec = true;
                            }
                        });
                    });
                    if (result) {
                        if (this.tableType === 1) {
                            this.$toast('请进行新增操作，并选择合适的目标库，源库，目标表和SQL');
                        } else {
                            this.$toast('请进行新增操作，并选择合适的目标库，源库，目标表和源表');
                        }
                        return;
                    }
                    if (isAddSec) {
                        if (this.modelEx.encryptKey && this.modelEx.encryptKey.length > 0) {
                        } else {
                            this.$toast('请输入加密密钥');
                            return;
                        }
                    }
                    if (isRemoveSec) {
                        if (this.modelEx.decryptKey && this.modelEx.decryptKey.length > 0) {
                        } else {
                            this.$toast('请输入解密密钥');
                            return;
                        }
                    }
                    if (!reuslt3) {
                        // this.$toast('请选择至少一个对应字段');
                        // return;
                    }
                    if (this.templetType === 2) {
                        if (!reuslt2) {
                            this.$toast('请选择增量字段');
                            return;
                        }
                    }
                    this.$emit("nextStep", 2, {templetName: this.modelEx.templetName, remark: this.modelEx.remark, encAndDec: this.modelEx.encAndDec});
                } else {
                    return false;
                }
            });
        },
        checkName (text_) {
            if (text_.target.value) {
                if (text_.target.value.length > 30) {
                    this.$toast('限制输入30个字符，允许输入的符号有-，——，_，-');
                }
                if (text_.target.value.length === 0) {
                    this.$toast('限制输入30个字符，允许输入的符号有-，——，_，-');
                }
                let re = /^[0-9a-zA-Z\u4e00-\u9fa5\-_\－\＿\—]+$/;
                let checkResult = re.test(text_.target.value);
                if (!checkResult) {
                    this.$toast('限制输入30个字符，允许输入的符号有-，——，_，-');
                }
            } else {
                this.$toast('限制输入30个字符，允许输入的符号有-，——，_，-');
            }
        },
        checkRemark (text_) {
            if (text_.target.value) {
                if (text_.target.value.length > 30) {
                    this.$toast('限制输入100个字符，允许输入的符号有-，——，_，-');
                }
                let re = /^[0-9a-zA-Z\u4e00-\u9fa5\-_\－\＿\—]+$/;
                let checkResult = re.test(text_.target.value);
                if (!checkResult) {
                    this.$toast('限制输入100个字符，允许输入的符号有-，——，_，-');
                }
            }
        }
    },
    watch: {
        encAndDec (val) {
            this.$emit("updateSec", val);
        },
        modelEx (val) {
            console.log('watch', this.modelEx);
            this.encAndDec = typeof this.modelEx.encAndDec === 'string' ? parseInt(this.modelEx.encAndDec) : this.modelEx.encAndDec;
        }
    },
    components: { }

};
</script>

<style lang="scss" scoped>
@import "./../../../../scss/common";
@import "./../../../../scss/variables";
    .search-tool{
        float:left;
        margin-top: 19px;
        margin-left: 25px;
        position: relative;
        height: 32px;
        line-height: 32px;
        width: calc(100% - 300px);
        font-size: 14px;
        font-weight:400;
        min-width: 700px;
        color:#333333;
        .search-tool-text {
            display: block;
            float:left;
            max-width: calc(50% - 150px) !important;
            // height: 32px;
            // line-height: 32px;
            min-width: 200px;
        }
        .search-tool-line{
            float:left;
            display: block;
            margin-left:15px;
            height: 32px;
            line-height: 32px;
        }
        button{
            
            // width: 60px;
            // height: 32px;
            // line-height: 32px;            
        }
        
    }
    .button--right--group{
        margin-top: 19px;
        display: block;
        margin-right: 28px;
        float: right;
        position: relative;
        .blueColor{
            background: $base-color !important;
        }
        .addBtn{
            background: white !important;
        }
    }
    .step1-header{
        height: 70px;
        width: 100%;
        min-width: 1180px;
    }
    .el-warning-notice{
        padding-left: 90px;
        top: 0;
        margin-top: 0;
        position: relative;
        padding-top: 5px;
    }

    .search-tool-text2{
        padding-left: 90px;
        height: 16px;
        line-height: 16px;
        max-width: calc(50% - 250px) !important;
        display: inline;
        min-width: 290px;
    }


</style>
