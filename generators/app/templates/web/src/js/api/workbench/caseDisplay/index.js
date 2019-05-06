/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-09-18
 * @remark: 病例展示
 * */
import {ajax} from './../../ajax';

const URL = {
    'listOpa': '/biz/common/listOpa',
    'listDisease': '/biz/treeData/listDisease',
    'listRule': '/biz/treeData/listRule',
    'list': '/biz/medicalInfo/list',
    'illegalInformation': '/biz/auditResultDetail/list',
    'submit': '/biz/medicalInfo/submit'
};

export function getListOpa (data) { // 区域
    let url = URL.listOpa;
    return ajax(url, {data, method: 'post'}).then((result) => {
        let {data = []} = result;
        formatArr(data);
        return result;
    });

    function formatArr (arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            arr.forEach((item) => {
                item.value = item.code;
                item.label = item.name;
                item.children = item.childList;
                formatArr(item.childList);
            });
        } else {
            return arr;
        }
    }
}

function formatData (arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    arr.forEach((item) => {
        item.title = `${item.name}：${item.commitCount}/${item.allCount}`;
        item.disabled = false; // 是否不可被点击
        item.display = false; // 用于查询
        if (item.allCount === 0) {
            item.disabled = false;
        }
        if (item.hasOwnProperty('childRuleList') && Array.isArray(item.childRuleList) && item.childRuleList.length > 0) {
            formatData(item.childRuleList);
        }
    });
}

export function getListDisease (data) { // 规则
    let url = URL.listDisease;
    return ajax(url, {data, method: 'post'}).then((result) => {
        let {data = []} = result;
        formatData(data);
        return Promise.resolve(result);
    });
}

export function getListRule (data) { // 疾病
    let url = URL.listRule;
    return ajax(url, {data, method: 'post'}).then((result) => {
        let {data = []} = result;
        formatData(data);
        return Promise.resolve(result);
    });
}

export function getList (data) { // 就诊信息
    let url = URL.list;
    return ajax(url, {data, method: 'post'});
}

export function getIllegalInformation (data) { // 获取违规信息
    let url = URL.illegalInformation;
    return ajax(url, {data, method: 'post'}).then((result) => {
        let {data} = result;
        data.forEach((item) => {
            item.checked = false;
        });
        return Promise.resolve(result);
    });
}

export function submit (data) { // 提交
    let url = URL.submit;
    return ajax(url, {data, method: 'post'});
}
