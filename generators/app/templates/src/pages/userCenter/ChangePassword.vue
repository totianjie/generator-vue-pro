<!-- Created by Nelson on 2018/8/7 -->
<template>
    <div class="el-dialog__wrapper change__password" style="z-index: 2013;">
        <div class="el-dialog set-center-view-300w" style="margin-top: 0;">
            <div class="el-dialog__header">
                <span class="el-dialog__title">
                    <v-detail-title label="个人密码修改" :leftTag="true" class="m-t-105 p-d-b-0" :boxStyle="boxTop"></v-detail-title>
                </span>
                <el-button class="el-dialog__headerbtn no__border" @click="close">     
                    <i class="el-dialog__close el-icon el-icon-close"></i>
                </el-button>
            </div>
            <div class="el-dialog__body set-center-view-150w">
                <el-form ref="changePasswordRef" :model="passwordForm" label-width="100px" :label-position="labelPosition" :rules="rules" class="change-password-form" :size="formSize">
                    <el-form-item label="原密码：" prop="oldPassword">
                        <el-input type="password" placeholder="请输入原始密码" v-model="passwordForm.oldPassword" class="el-input password__input"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="newPassword">
                        <el-input type="password"  placeholder="请输入6位数字+字母组合新密码" v-model="passwordForm.newPassword" class="el-input password__input"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码：" prop="repeatePassword">
                        <el-input type="password"  placeholder="请输入6位数字+字母组合新密码" v-model="passwordForm.repeatePassword" class="el-input password__input"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="el-dialog__footer">
                <div class="dialog-footer">
                    <el-button type="primary m-r-40" :size="btnSize"  @click="_changePassword">确&nbsp;定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6" >
import { changPassword, checkPassword } from "js/api/userCenter/user";
import md5 from 'static/plugins/md5.min.js';
import { getCookie } from 'js/utils/cookies';
import CONFIG from 'src/config';

export default {
    data () {
        let checkPassword1 = (rule, value, callback) => {
            if (value.length < 6 || value.length > 20) {
                callback(new Error('请输入密码 (6~20个大小写英文字母、符号或数字组合)'));
            } else {
                if (this.passwordForm.repeatePassword) {
                    if (this.passwordForm.repeatePassword.length) {
                        if (value !== this.passwordForm.repeatePassword) {
                            callback(new Error('请重新输入 (两次输入新密码不一致合)'));
                            return;
                        }
                    }
                }
                if (this.passwordForm.oldPassword) {
                    if (this.passwordForm.oldPassword === value) {
                        callback(new Error('请重新输入 (新旧密码不能相同)'));
                        return;
                    }
                }
                callback();
            }
        };
        let checkPassword2 = (rule, value, callback) => {
            if (value.length < 6 || value.length > 20) {
                callback(new Error('请输入密码 (6~20个大小写英文字母、符号或数字组合)'));
            } else {
                if (this.passwordForm.newPassword) {
                    if (this.passwordForm.newPassword.length) {
                        if (this.passwordForm.newPassword !== value) {
                            callback(new Error('请重新输入 (两次输入新密码不一致合)'));
                            return;
                        }
                    }
                }
                if (this.passwordForm.oldPassword) {
                    if (this.passwordForm.oldPassword === value) {
                        callback(new Error('请重新输入 (新旧密码不能相同)'));
                        return;
                    }
                }
                callback();
            }
        };
        let checkOldPassword = (rule, value, callback) => {
            if (value.length < 6 || value.length > 20) {
                callback(new Error('请输入密码 (6~20个大小写英文字母、符号或数字组合)'));
            } else {
                if (this.passwordForm.repeatePassword) {
                    if (this.passwordForm.repeatePassword === value) {
                        callback(new Error('请重新输入 (新旧密码不能相同)'));
                        return;
                    }
                }
                if (this.passwordForm.newPassword) {
                    if (this.passwordForm.newPassword === value) {
                        callback(new Error('请重新输入 (新旧密码不能相同)'));
                        return;
                    }
                }
                let oldPasswordSec = md5(this.passwordForm.oldPassword);
                let userInfo = JSON.parse(getCookie('user_info'));
                var currentId = userInfo.id.toString();
                checkPassword({
                    password: oldPasswordSec,
                    username: userInfo.name || userInfo.username,
                    id: currentId || ''
                }).then(res => {
                    try {
                        if (res.data) {
                            if (res.data.errorMsg !== '请求成功') {
                                callback(new Error(res.data.errorMsg));
                                return;
                            }
                        } else {
                            if (res.errorMsg !== '请求成功') {
                                callback(new Error(res.errorMsg));
                                return;
                            }
                        }
                    } catch (error) {

                    }
                    callback();
                }).catch(err => {
                    console.log('修改失败', [err.response.status]);
                    if (err.response && err.response.status) {
                        callback(new Error('原密码验证异常,请联系管理员'));
                    } else if (err.data) {
                        callback(new Error(err.data.errorMsg));
                    } else {
                        callback(new Error(err.errorMsg));
                    }
                });
            }
        };
        return {
            btnSize: CONFIG.baseBtn,
            labelPosition: 'right',
            boxTop: {
                paddingTop: '40px',
                paddingBottom: '40px'
            },
            passwordForm: {
                oldPassword: '',
                newPassword: '',
                repeatePassword: ''
            },
            formSize: 'small',
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            rules: Object.assign({}, {}, {
                oldPassword: [
                    {trigger: 'blur', validator: checkOldPassword, required: true }
                ],
                newPassword: [
                    { trigger: 'blur', validator: checkPassword1, required: true }
                ],
                repeatePassword: [
                    { trigger: 'blur', validator: checkPassword2, required: true }
                ]
            })
        };
    },
    methods: {
        close () {
            this.passwordForm.oldPassword = '';
            this.passwordForm.newPassword = '';
            this.passwordForm.repeatePassword = '';
            this.$refs.changePasswordRef.resetFields(value => {
            });
            this.$emit("closeChange", 1);
        },
        _changePassword () {
            this.$refs.changePasswordRef.validate(value => {
                if (value) {
                    if (this.passwordForm.newPassword !== this.passwordForm.repeatePassword) {
                        this.$toast('两次输入新密码不一致');
                        return;
                    }
                    if (this.passwordForm.oldPassword === this.passwordForm.repeatePassword) {
                        this.$toast('新旧密码不能相同');
                        return;
                    }
                    let oldPasswordSec = md5(this.passwordForm.oldPassword);
                    let repeatePasswordSec = md5(this.passwordForm.repeatePassword);
                    oldPasswordSec = repeatePasswordSec;
                    changPassword({
                        password: oldPasswordSec,
                        passwordTwo: repeatePasswordSec
                    }).then(res => {
                        this.$toast('密码修改成功,请牢记新密码');
                        this.close();
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.change__password {
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
    padding: 20px 20px !important;
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
    height: 120px !important;
    width: 480px;
}

.set-center-view-300w {
    left: calc(50% - 210px) !important;
    right: calc(50% - 210px) !important;
    margin: 0 !important;
    top: calc(50% - 150px) !important;
    height: 300px !important;
    width: 420px;
}
</style>
