/**
 *  Created by Nelson on 2018/7/11
 * */

var checkPassword = (rule, value, callback) => {
    if (value.length < 6 || value.length > 20) {
        callback(new Error('请输入密码 (6~20个大小写英文字母、符号或数字组合)'));
    } else {
        callback();
    }
};

export default {
    oldPassword: [
        { trigger: 'blur', validator: checkPassword, required: true }
    ],
    newPassword: [
        { trigger: 'blur', validator: checkPassword, required: true}
    ],
    repeatePassword: [
        { trigger: 'blur', validator: checkPassword, required: true }
    ]
};

