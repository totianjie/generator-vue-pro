/**
 *  Created by Nelson on 2018/7/11
 * */

import REG from 'js/utils/regex';

var checkUserName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入用户名'));
    }
    let re = REG.textAlphaNumber;
    let checkResult = re.test(value);
    let checkResult2 = (value.length < 2 || value.length > 20);
    if (!checkResult) {
        return callback(new Error('您输入不正确(须英文、数字输入，2~20 位字符)'));
    }
    if (checkResult2) {
        return callback(new Error('您输入不正确(须英文、数字输入，2~20 位字符)'));
    }
    callback();

};
var checkPassword = (rule, value, callback) => {
    if (value.length < 6 || value.length > 20) {
        callback(new Error('请输入密码 (6~20个大小写英文字母、符号或数字组合)'));
    } else {
        callback();
    }
};
var checkValidateValue = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入验证码'));
    } else {
        callback();
    }
};

export default {
    username: [
        { trigger: 'blur', validator: checkUserName, required: true }
    ],
    password: [
        { trigger: 'blur', validator: checkPassword, required: true}
    ],
    validate: [
        { trigger: 'blur', validator: checkValidateValue, required: true }
    ]
};

