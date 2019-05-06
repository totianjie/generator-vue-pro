/**
 *  Created by Nelson on 2018/7/11
 * */
import REG from 'js/utils/regex';
// import { getUserList } from 'js/api/authorityManage/user';

const checkGroupName = (rule, value, callback) => {
    try {
        if (typeof value !== 'string') {
            return callback(new Error('请输入角色组名称'));
        }
        if (!value.length) {
            return callback(new Error('请输入角色组名称'));
        }
        let re = REG.text;
        let checkResult = re.test(value);
        let checkResult2 = (value.length < 2 || value.length > 20);
        if (!checkResult) {
            return callback(new Error('您输入不正确(须中文输入， 2~20 位字符)'));
        }
        if (checkResult2) {
            return callback(new Error('您输入不正确(须中文输入， 2~20 位字符)'));
        }
        callback();
    } catch (e) {
        console.log(e.reason + e.name);
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
    name: [
        { required: true, trigger: 'blur', validator: checkGroupName }
    ],
    remark: [
        { validator: checkRemark, trigger: 'blur' }
    ]
};
