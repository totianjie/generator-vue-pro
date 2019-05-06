/**
 *  Created by TIANJIE on 2018/6/11
 * */

import REG from 'js/utils/regex';
// import Add from './Add';

const checkMenuName = (rule, value, callback) => {
    if (typeof value !== 'string') {
        return callback(new Error('请输入菜单名称'));
    }
    let re = REG.text;
    let checkResult = re.test(value);
    if (!value.length) {
        return callback(new Error('请输入菜单名称'));
    }
    if (!checkResult) {
        return callback(new Error('您输入不正确(须中文、英文、数字 输入，2~20 位字符)，请重新输入'));
    }
    if (value.length < 2 || value.length > 20) {
        return callback(new Error('您输入不正确(须中文、英文、数字 输入，2~20 位字符)，请重新输入'));
    }
    callback();
};

const checkURL = (rule, value, callback) => {
    if (typeof value !== 'string') {
        return callback();
    }
    if (!value.length) {
        callback();
        return;
    }
    let re = /^\/[a-zA-Z0-9\&=?._\-/]+$/;
    let checkResult = re.test(value);
    if (!checkResult) {
        return callback(new Error('您输入不正确，以/开头，须英文、符号( =&?/)、数字组成，最长限制300位字符,请重新输入'));
    }
    if (value.length > 300) {
        return callback(new Error('您输入不正确，最大长度为300，请重新输入'));
    }
    callback();
};

const checkOrderBy = (rule, value, callback) => {
    if (typeof value === "undefined") {
        return callback();
    } else if (typeof value === "string") {
        if (!value.length) {
            return callback();
        }
        let order = REG.int.test(value);
        if (order) {
            let re = /^[0-9]*$/;
            let checkResult = re.test(value);
            if (!checkResult) {
                return callback(new Error('您输入不正确(须数字输入，1-999之间的数字)， 请重新输入'));
            }
            let orderInt = parseInt(value);
            if (orderInt > 0 && orderInt < 1000) {
                return callback();
            } else {
                return callback(new Error('您输入不正确(须数字输入，1-999之间的数字)， 请重新输入'));
            }
        } else {
            return callback(new Error('您输入不正确(须数字输入，1-999之间的数字)， 请重新输入'));
        }
    } else if (typeof value === "number") {
        if (value > 0 && value < 1000) {
            return callback();
        } else {
            return callback(new Error('您输入不正确(须数字输入，1-999之间的数字)， 请重新输入'));
        }
    } else if (typeof value === "object") {
        return callback();
    } else if (value === null) {
        return callback();
    } else {
        return callback(new Error('您输入不正确(须数字输入，1-999之间的数字)， 请重新输入'));
    }
};

export default {
    type: [
        { required: true, message: '请选择类型', trigger: 'change' }
    ],
    name: [
        { required: true, trigger: 'blur', validator: checkMenuName }
    ],
    url: [
        { required: false, trigger: 'blur', validator: checkURL }
    ],
    orderby: [
        { trigger: 'blur', validator: checkOrderBy, required: false}
    ],
    enable: [
        { required: true, trigger: 'blur', message: '请选择状态' }
    ]
};

