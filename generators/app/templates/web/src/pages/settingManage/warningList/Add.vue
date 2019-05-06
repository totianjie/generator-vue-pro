<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <div>
        {{test}}
        <div class="page p-t-40" @click="treeShow = false">
            <el-col :span="10" :offset="4">
                <el-form ref="addForm" :model="addForm" :rules="rules" label-width="175px" :size="formSize">
                    <el-form-item 
                        label="任务类型：" 
                        prop="taskTypeName"
                    >
                        <el-select v-model="addForm.taskTypeName" placeholder="请选择任务类型" class="w-fill" @change="change">
                            <el-option
                                v-for="item in taskList"
                                :key="item.keyValue"
                                :value="item.keyName"
                                :label="item.keyName"
                            ></el-option>
                        </el-select> 
                    </el-form-item>
                    <el-form-item 
                        label="配置名称：" 
                        prop="noticeName"
                    >
                        <el-input placeholder="请输入业务名称" maxlength="20" v-model="addForm.noticeName" @blur="inputInfo"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="备注：" 
                        prop="remark"
                    >
                        <el-input placeholder="请输入业务备注" maxlength="50" v-model="addForm.remark" @blur="inputInfo"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="邮件提醒：" 
                        prop="noticeEmails"
                    >
                        <el-input placeholder="可输入多个信箱以;隔开" maxlength="300" v-model="addForm.noticeEmails" @blur="inputInfo"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="短信提醒：" 
                        prop="noticePhone"
                    >
                        <el-input placeholder="可输入多个手机号码以;隔开" maxlength="300" v-model="addForm.noticePhone" @blur="inputInfo"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="钉钉提醒：" 
                        prop="noticeDingtalk"
                    >
                        <el-input placeholder="可输入多个地址以;隔开" maxlength="300" v-model="addForm.noticeDingtalk" @blur="inputInfo"></el-input>
                    </el-form-item>
                    <el-form-item>
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
    *
    * */
    import CONFIG from 'src/config';
    import REG, {validateMaxLen} from 'js/utils/regex';
    import {getTaskTypeList, insertTaskInfo, updateTaskInfo, detailInfo} from 'js/api/settingManage/warningList/warningList.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('settingManage');
    export default {
        data () {
            return {
                test: '',
                taskList: [],
                radio: '1',
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseFormSize,
                options: [], // 区域数组
                cityCodes: [],
                areaParams: {
                    parenId: ''
                },
                model: [],
                addForm: {
                    noticeEmails: '',
                    noticeName: '',
                    remark: '',
                    noticeDingtalk: '',
                    taskTypeName: '',
                    taskTypeCode: '',
                    noticePhone: ''
                },
                // 表单验证
                rules: Object.assign({}, { // 任务异常邮件提醒
                    taskTypeName: [
                        { required: true, trigger: 'change', message: '请选择任务类型' }
                    ],
                    noticeName: [
                        { required: true, message: '请输入配置名称', trigger: 'blur' },
                        { max: 20, message: '最大长度为20', trigger: 'blur' },
                        { pattern: REG.text, message: '请输入业务名称(数字 、字母 、汉字)', trigger: 'blur' }
                    ],
                    remark: [
                        { max: 50, message: '最大长度为50', trigger: 'blur' }
                    ],
                    noticeEmails: [
                        {validator: validateMaxLen(300, '限制300字')},
                        {validator: (rule, val, callback) => {
                            let str = (val + '').replace(/(^\s*)|(\s*$)/g, "");
                            if (str.length === 0) {
                                callback();
                                return false;
                            }
                            let arr = str.split(";");
                            for (let i = 0; i < arr.length; i++) {
                                if (!REG.email.test(arr[i])) {
                                    callback(new Error("信箱格式不正确"));
                                    return false;
                                }
                            }
                            callback();
                        }, trigger: 'blur'}
                    ],
                    // 任务异常短信提醒
                    noticePhone: [
                        {validator: validateMaxLen(300, '限制300字')},
                        {validator: (rule, val, callback) => {
                            let str = (val + '').replace(/(^\s*)|(\s*$)/g, "");
                            if (str.length === 0) {
                                callback();
                                return false;
                            }
                            let arr = str.split(";");
                            for (let i = 0; i < arr.length; i++) {
                                if (!REG.phone.test(arr[i])) {
                                    callback(new Error("手机号码格式不正确"));
                                    return false;
                                }
                            }
                            callback();
                        }, trigger: 'blur'}
                    ],
                    // 任务异常钉钉提醒
                    noticeDingtalk: [
                        {validator: validateMaxLen(300, '限制300字')},
                        {validator: (rule, val, callback) => {
                            let str = (val + '').replace(/(^\s*)|(\s*$)/g, "");
                            if (str.length === 0) {
                                callback();
                                return false;
                            }
                            let arr = str.split(";");
                            for (let i = 0; i < arr.length; i++) {
                                if (!arr[i].startsWith('http://') && !arr[i].startsWith('https://')) {
                                    callback(new Error("地址格式不正确"));
                                    return false;
                                }
                            }
                            callback();
                        }, trigger: 'blur'}
                    ]}, {})
            };
        },
        props: {

        },
        created () {
            this._init();
        },
        computed: {
            ...mapGetters(['YJEditObj', 'YJParameters', 'YJIsDetail', 'YJIsEdit', 'YJIsAdd', 'YJTableList', 'YJtotal', 'YJTaskTypeList'])
        },
        methods: {
            change () {
                this.setYJEditObj(this.addForm);
            },
            inputInfo () {
                this.setYJEditObj(this.addForm);
            },
            _init () {
                if (this.YJTaskTypeList.length === 0) {
                    getTaskTypeList({type: 1}).then(res => {
                        console.log("getTaskTypeList", res);
                        this.taskList = res["data"]["dicts"]["1"];
                        this.setYJTaskTypeList(this.taskList);
                        if (this.YJIsEdit) {
                            this.getDetail(this.YJEditObj);
                        }
                    });
                } else {
                    this.taskList = this.YJTaskTypeList;
                    if (this.YJIsEdit) {
                        this.getDetail(this.YJEditObj);
                    }
                }
            },
            getDetail (val) {
                if (!this.YJEditObj.request) {
                    detailInfo(val).then(res => {
                        let obj = res.data;
                        this.taskList.forEach(res2 => {
                            if (res2.keyValue + '' === obj.taskTypeCode + '') {
                                obj = Object.assign({}, obj, {taskTypeName: res2.keyName});
                            }
                        });
                        this.addForm = Object.assign({}, this.addForm, obj);
                        this.addForm = Object.assign({}, this.addForm, {request: true});
                        this.setYJEditObj(this.addForm);
                    });
                } else {
                    this.addForm = this.YJEditObj;
                }
            },
            
            handlerSubmit () {
                this.$refs.addForm.validate(value => {
                    console.log(this.addForm);
                    if (!value) {
                        return false;
                    }
                    this.taskList.forEach(res => {
                        if (res.keyName + '' === this.addForm.taskTypeName + '') {
                            this.addForm.taskTypeCode = res.keyValue;
                        }
                    });
                    if (this.YJIsEdit) {
                        updateTaskInfo(this.addForm).then((res) => {
                            this.handlerCancel();
                            this.getWarningList();
                        });
                    } else {
                        insertTaskInfo(this.addForm).then((res) => {
                            console.log('success');
                            this.handlerCancel();
                            this.getWarningList();
                        });
                    }
                });
            },
            handlerCancel () {
                this.setYJIsEdit(false);
                this.setYJIsAdd(false);
            },
            ...mapMutations({
                setYJIsDetail: 'setYJIsDetail',
                setYJIsEdit: 'setYJIsEdit',
                setYJIsAdd: 'setYJIsAdd',
                setYJTableList: 'setYJTableList',
                setYJEditObj: 'setYJEditObj',
                setYJTaskTypeList: 'setYJTaskTypeList',
                setYJtotal: 'setYJtotal'
            }),
            ...mapActions(['YJreset', 'getWarningList'])
        },
        watch: {

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
</style>
