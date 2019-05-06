/**
 * @Author:  tianjie
 * @Date:  2019-01-26
 * @remark:  商保管理/规则管理
 * */
import { ajax } from './../ajax';
const URL = {
    add: "/main/rule/add", // 添加
    delete: "/main/rule/delete", // 删除
    getDetail: "/main/rule/get", // 详情
    ruleList: "/main/rule/page", // 规则列表
    update: "/main/rule/update", // 编辑
    getSubRuleList: "/sub/rule/subRuleList",
    getDect: "/ruleCategory/queryAll",
    audit: "/main/rule/audit" // 审核

};

import urlConfig from './config';
for (let key in URL) {
    URL[key] = `${urlConfig.baseURL}${URL[key]}`;
}

export function add (data) {
    let url = URL.add;
    return ajax(url, {data, method: 'post'});
}

export function deleteRule (data) {
    let url = URL.delete;
    return ajax(url, {method: 'post', timeout: 120, params: data});
}

export function getDetail (params) {
    let url = URL.getDetail;
    return ajax(url, {params}).then(res => {
        res.data.subList.forEach((item, index) => {
            item._index = index;
        });
        return Promise.resolve(res);
    });
}

export function getRuleList (params) {
    let url = URL.ruleList;
    return ajax(url, {params});
}

export function update (data) {
    let url = URL.update;
    return ajax(url, {data, method: 'post'});
}

export function getSubRuleList (params) {
    let url = URL.getSubRuleList;
    let data = {
        "limit": 0,
        "offset": 0
    };
    return ajax(url, {data, params, method: 'post'});
}

export function getDect () {
    let url = URL.getDect;
    return ajax(url);
}

export function auditRule (data) {
    let url = URL.audit;
    return ajax(url, {method: 'post', timeout: 120, params: data});
}
