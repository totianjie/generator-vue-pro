/**
 *  Created by Nelson on 2018/7/11
 * */

import REG from 'js/utils/regex';

const checkName = (rule, value, callback) => {
    try {
        if (typeof value !== 'string') {
            return callback(new Error('请输入数据角色名称'));
        }
        if (!value.length) {
            return callback(new Error('请输入数据角色名称'));
        }
        let re = REG.textAlphaChinese;
        let checkResult = re.test(value);
        let checkResult2 = (value.length < 2 || value.length > 20);
        if (!checkResult) {
            return callback(new Error('您输入不正确(须中、英文输入，2~20 位字符)重新输入'));
        }
        if (checkResult2) {
            return callback(new Error('您输入不正确(须中、英文输入，2~20 位字符)重新输入'));
        }
        callback();
    } catch (e) {
        console.log(e.reason + e.name);
        callback(new Error('输入异常,请联系管理员'));
    }
};

export default {
    dataRoleName: [
        { required: true, trigger: 'blur', validator: checkName }
    ],
    orgName: [
        { required: true, message: '请选择所属组织', trigger: 'change' }
    ]
};
