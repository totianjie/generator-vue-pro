/**
 *  Created by TIANJIE on 2018/6/11
 * */
import REG from 'js/utils/regex';

const checkName = (rule, value, callback) => {
    try {
        if (typeof value !== 'string') {
            return callback(new Error('请输入组织名称'));
        }
        if (!value.length) {
            return callback(new Error('请输入组织名称'));
        }
        let checkResult = (value.length < 2 || value.length > 20);
        if (checkResult) {
            return callback(new Error('您输入不正确(须中、英文输入，2~20 位字符) 重新输入'));
        }
        let re = REG.textAlphaChinese;
        checkResult = re.test(value);
        if (!checkResult) {
            return callback(new Error('您输入不正确(须中、英文输入，2~20 位字符) 重新输入'));
        }
        callback();
    } catch (e) {
        console.log(e.reason + e.name);
    }
};


const checkCode = (rule, value, callback) => {
    try {
        if (typeof value !== 'string') {
            return callback();
        }
        if (!value.length) {
            return callback();
        }
        let re = /^[a-z|A-Z|0-9|\_|\#|\-]+$/;
        let checkResult = re.test(value);
        let checkResult2 = (value.length < 2 || value.length > 20);
        if (!checkResult) {
            return callback(new Error('您输入不正确(须英文、 数字、符号(--、_、#)输入，2~20 位字符)'));
        }
        if (checkResult2) {
            return callback(new Error('您输入不正确(须英文、 数字、符号(--、_、#)输入，2~20 位字符)'));
        }
        callback();
    } catch (e) {
        console.log(e.reason + e.name);
    }
};

const checkRemark = (rule, value, callback) => {
    try {
        if (typeof value !== 'string') {
            return callback();
        }
        if (!value.length) {
            return callback();
        }
        let checkResult = (value.length > 200);
        if (checkResult) {
            return callback(new Error('您输入不正确(限制 200 字符)'));
        }
        return callback();
    } catch (e) {
        console.log(e.reason + e.name);
        return callback();
    }
};

export default {
    name: [
        { required: true, trigger: 'blur', validator: checkName }
    ],
    code: [
        { required: true, trigger: 'blur', validator: checkCode }
    ],
    roleGroupCode: [
        { required: true, message: '请选择所属角色组', trigger: 'change' }
    ],
    parentId: [
        { required: true, message: '请选择所属组织', trigger: 'change' }
    ],
    remark: [
        { validator: checkRemark, trigger: 'blur' }
    ]
};

