/**
 *  Created by TIANJIE on 2018/6/11
 * */

/* userName: '',
    userType: '',
    name: '',
    phone: '',
    initialPassword: '',
    pertainOrgs: {
        id: '',
        name: '',
        code: ''
    },
pertainRoles: '',
pertainDataRoles: ''*/
import REG from 'js/utils/regex';
// import { getUserList } from 'js/api/authorityManage/user';

var checkUserName = (rule, value, callback) => {
    try {
        if (typeof value !== 'string') {
            return callback(new Error('请输入用户名'));
        }
        if (!value.length) {
            return callback(new Error('请输入用户名'));
        }
        let re = REG.textAlphaNumber;
        let checkResult = re.test(value);
        let checkResult2 = (value.length < 4 || value.length > 20);
        if (!checkResult) {
            return callback(new Error('您输入不正确(须英文、数字输入，2~20 位字符)'));
        }
        if (checkResult2) {
            return callback(new Error('您输入不正确(须英文、数字输入，2~20 位字符)'));
        }
        callback();
    } catch (e) {
        console.log(e.reason + e.name);
    }
};

var checkNickName = (rule, value, callback) => {
    try {
        if (typeof value !== 'string') {
            return callback();
        }
        if (value.length === 0) {
            callback();
            return;
        }
        let re = REG.textAlphaChinese;
        let checkResult = re.test(value);
        let checkResult2 = (value.length < 2 | value.length > 20);
        if (!checkResult) {
            return callback(new Error('您输入不正确（须中、英文，2~20位字符），重新输入'));
        }
        if (checkResult2) {
            return callback(new Error('您输入不正确（须中、英文，2~20位字符），重新输入'));
        }
        callback();
    } catch (e) {
        console.log(e.reason + e.name);
        callback();
        return;
    }
};


const checkRemark = (rule, value, callback) => {
    try {
        console.log("checkRemark" + typeof value);
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
    userName: [
        { required: true, trigger: 'blur', validator: checkUserName }
    ],
    name: [
        { trigger: 'blur', validator: checkNickName }
    ],
    phone: [
        { message: '请输入手机号吗', trigger: 'blur' },
        { pattern: REG.mobile, message: '手机格式不正确', trigger: 'blur' }
    ],
    pertainOrgs: [
        { required: 'true', message: '请选择所选组织' }
    ],
    remark: [
        { validator: checkRemark, trigger: 'blur' }
    ]
};

