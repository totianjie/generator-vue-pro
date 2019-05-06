<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <div>
        {{test}}
        <div class="page p-t-40 over-auto" @click="treeShow = false">
            <el-col :span="10" :offset="4">
                <el-form ref="addForm" :model="addForm" :rules="rules" label-width="175px" :size="formSize" @blur="addData_(addForm)">
                    <el-form-item 
                        label="许可证名称：" 
                        prop="name"
                    >
                        <el-input placeholder="请输入许可证名称" maxlength="50" v-model.trim="addForm.name" :size="btnSize" @blur="addData_(addForm)"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="许可证备注：" 
                        prop="remark"
                    >
                        <el-input placeholder="请输入许可证备注" maxlength="200" v-model.trim="addForm.remark" :size="btnSize" @blur="addData_(addForm)"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="部署地点：" 
                        prop="deployAddr"
                    >
                        <el-input placeholder="请输入部署地点" maxlength="50" v-model.trim="addForm.deployAddr" :size="btnSize" @blur="addData_(addForm)"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="有效时长(天)：" 
                        prop="validTime"
                    >
                        <el-input placeholder="请输入有效时长(天)" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="4" v-model="addForm.validTime" :size="btnSize" @blur="addData_(addForm)"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="mac地址：" 
                        prop="macList"
                    >
                        <el-button :size="btnSize" @click="addMac" type="primary">新增地址</el-button>
                        <div class="w-fill" v-for="(item, index) in addForm.macList" style="margin-top: 7px;">
                            <div class="" style="line-height: 32px;"> 
                                <el-input placeholder="请输入mac地址" v-model.trim="item.text" :class="item.showError?'el-input__inner__error_self':''" maxlength="20" @blur="inputInfo(item)" :size="btnSize" style="width: calc(100% - 58px)" oninput="this.value=this.value.replace(/[^\w-:]/g,'');"></el-input>
                                <span class="pull-right delete-btn pointer block" @click="delMac(index)" style="line-height: 32px; padding-right: 6px;">删除</span>
                            </div>
                            <div class="el-form-item__error" style="line-height: 13px;position: initial;" v-if="item.showError && item.errorType===1">
                                请输入mac地址
                            </div>
                            <div class="el-form-item__error" style="line-height: 13px;position: initial;" v-if="item.showError && item.errorType===2">
                                请输入正确格式的mac地址(以-或:分隔或无分隔)
                            </div>
                        </div>

                    </el-form-item>
                    <el-form-item 
                        label="软件包上传：" 
                        prop="zipList"
                    >
                        <v-upload
                            ref="uploadRef"
                            :url="url"
                            :reg="reg"
                            :uploadSameFileName="false"
                            :doDefaultOperation="false"
                            :maxFilesSizeMap="maxFilesSizeMap"
                            filePath="file"
                            holderPlace="上传文件"
                            :btnSize="btnSize"
                            :multiple="true"
                            @changeResult="changeResult"
                            @uploadreuslt="uploadreuslt">
                        </v-upload> 
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button :size="btnSize" @click="handlerCancel">取&nbsp;消</el-button>
                        <el-button :size="btnSize" @click="handlerSubmit" type="primary">确&nbsp;定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
    </div>
</template>

<script>
    /*
    * */
    import CONFIG from 'src/config';
    // import {URL} from "js/api/safeManage/safeManage";
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('safeManage');
    export default {
        data () {
            return {
                url: '/apc/licenses/upload',
                maxFilesSizeMap: [ // 上传图片大小限制：上传图片在4MB以内
                    {reg: /\.(zip)$/, size: 200}
                ],
                test: '',
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseBtn,
                addForm: {
                    validTime: '',
                    name: '',
                    remark: '',
                    deployAddr: '',
                    macList: [{text: '', showError: false, errorType: null}],
                    mac: '',
                    zipList: []
                },
                macRule: [
                    { max: 50, message: '最大长度为50', trigger: 'blur' },
                    {required: true, message: '请输入mac地址', trigger: 'blur'}
                ],
                // 表单验证
                rules: Object.assign({}, { // 任务异常邮件提醒
                    name: [
                        { max: 50, message: '最大长度为50', trigger: 'blur' },
                        {required: true, message: '请输入许可证名称', trigger: 'blur'}
                    ],
                    remark: [
                        { max: 200, message: '最大长度为200', trigger: 'blur' }
                    ],
                    deployAddr: [
                        {required: true, message: '请输入部署地点', trigger: 'blur'}
                    ],
                    validTime: [
                        {required: true, message: '请输入有效时长(天)', trigger: 'blur'}
                    ],
                    macList: [
                        {required: true, message: 'mac地址至少需要一个', trigger: 'change'}
                    ],
                    zipList: [
                        {required: true, message: '至少上传一个zip包', trigger: 'change'}
                    ]
                })
            };
        },
        props: {

        },
        watch: {
  
        },
        mounted () {
            this._init();
        },
        computed: {
            ...mapGetters(['AddData'])
        },
        methods: {
            stringFormat (text_) {
                text_ = text_.replace(/-/g, ':');
                if (text_.indexOf(':') === -1 && text_.indexOf('-') === -1) {
                    let textNew_ = '';
                    console.log(textNew_);
                    textNew_ = textNew_ + (text_.substr(0, 1) || '') + (text_.substr(1, 1) || '') + ':';
                    textNew_ = textNew_ + (text_.substr(2, 1) || '') + (text_.substr(3, 1) || '') + ':';
                    textNew_ = textNew_ + (text_.substr(4, 1) || '') + (text_.substr(5, 1) || '') + ':';
                    textNew_ = textNew_ + (text_.substr(6, 1) || '') + (text_.substr(7, 1) || '') + ':';
                    textNew_ = textNew_ + (text_.substr(8, 1) || '') + (text_.substr(9, 1) || '') + ':';
                    textNew_ = textNew_ + (text_.substr(10, 1) || '') + (text_.substr(11, 1) || '');
                    if (text_.substr(12, 1) !== '') {
                        textNew_ = textNew_ + ":";
                        textNew_ = textNew_ + (text_.substr(12, 100) || '');
                    }
                    return textNew_;
                }
                return text_;
            },
            inputInfo (val) {
                console.log("inputInfo", val);
                if (val.text.length === 0) {
                    val.showError = true;
                    val.errorType = 1;
                } else {
                    let {text} = val;
                    let textNew_ = this.stringFormat(text);
                    let textArr_ = textNew_.split(':');
                    let error = false;
                    textArr_.forEach(res => {
                        if (res.length !== 2) {
                            error = true;
                        }
                    });
                    if (!error) {
                        val.showError = false;
                        val.errorType = null;
                        val.text = textNew_;
                        this.getMac();
                    } else {
                        val.showError = true;
                        val.errorType = 2;
                    }
                }
            },
            changeResult (fileList) {
                this.addForm.zipList = fileList;
                this.addData_(this.addForm);

            },
            uploadreuslt (uploadinfo, resultupload, fileList) {
                this.addForm.zipList = fileList;
                this.addData_(this.addForm);
            },
            _init () {
                console.log([this.AddData]);
                if (JSON.stringify(this.AddData) !== '{}') {
                    this.addForm = JSON.parse(JSON.stringify(this.AddData));
                }
            },
            getMac () {
                let macList_ = this.addForm.macList.map((item) => {
                    return item.text;
                });
                this.addForm.mac = macList_.join(";");
                this.addData_(this.addForm);
                console.log('====================================');
                console.log(this.addForm.mac);
                console.log('====================================');
            },
            addMac () {
                this.addForm.macList.push({text: '', showError: false, errorType: null});
            },
            delMac (index_) {
                console.log(index_);
                this.addForm.macList.splice(index_, 1);
                this.getMac();
            },
            handlerSubmit () {
                this.addData_(this.addForm);
                this.$refs.addForm.validate(value => {
                    console.log(this.addForm);
                    console.log("handlerSubmit......");
                    if (!value) {
                        return false;
                    }
                    this.addSend();
                });
            },
            handlerCancel () {
                console.log("handlerCancel......");
                this.setAddData();
                this.setPageType("list");
                console.log("handlerCancel222......");
            },
            reg (file) {
                let re = /\.(zip)$/;
                return re.test(file);
            },
            ...mapMutations(['setPageType', 'setParameters', 'setAddData']),
            ...mapActions(['reset', 'getList', 'addData_', 'addSend'])
        }
    };
</script>

<style scoped lang="scss">
    .p-t-40 {
        padding-top: 40px;
    }

    .el-checkbox + .el-checkbox.radio, .el-checkbox + .el-checkbox.checkbox, .el-checkbox.checkbox, .el-checkbox.radio {
        width: 90px;
        margin-right: 10px;
        margin-bottom: 8px;
        box-sizing: border-box;
    }

    .orgs-tree {
        width: 100%;
        position: absolute;
        top: 8px;
        bottom: 0;
        left: 0;
        cursor: pointer;
        padding:10px;
        box-sizing:border-box;
        z-index: 100;

    }

    .dataTree{
        padding: 8px 0;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #fff;
    }

    .tree {
        width: 100%;
        position: absolute;
        left: 0;
        top: 35px;
        padding-bottom: 12px;
        z-index: 2000;
        background-color: #fff;
    }

    .statusBtn{
        line-height: 40px;
    }
    .radio-group {
        margin-top: 12px;
    }
    .radio {
        margin-right: 32px;
    }
    .delete-btn{
        color: #3B99FC;
    }
    /deep/ .v-file-list{
        margin-top: 8px !important;
    }
    /deep/ .v-file-list .item{
        margin-bottom: 0 !important;
    }
    .el-input__inner__error_self{
        /deep/ input{
            border-color: #f56c6c !important;
        }
    }
</style>
