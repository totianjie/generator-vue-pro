/**
 * @Author:  tianjie
 * @Date:  2019-01-25
 * @remark:  商保管理/子规则管理
 * */
import { ajax } from './../ajax';
const URL = {
    subRuleList: '/sub/rule/subRuleList', // 子规则列表
    delete: '/sub/rule/del', // 根据子规则id删除数据
    audit: '/sub/rule/audit', // 跟据id审核子规则

    ruleTypes: '/sub/rule/ruleTypes', // 规则类型列表
    getDetail: '/sub/rule/get', // 根据子规则id查询数据

    save: '/sub/rule/save', // 子规则保存
    update: '/sub/rule/update', // 子规则修改

    getStandard: '/sub/rule/standard' // 标准数据获取
};

import urlConfig from './config';
for (let key in URL) {
    URL[key] = `${urlConfig.baseURL}${URL[key]}`;
}

export function getSubRuleList (data) {
    let url = URL.subRuleList;
    return ajax(url, {data, method: 'post'});
}

export function deleteSubRule (data) {
    let url = URL.delete;
    return ajax(url, {data, method: 'post'});
}

export function getRuleTypes () {
    let url = URL.ruleTypes;
    return ajax(url, {method: 'post'});
}

export function getDetail (data) {
    let url = URL.getDetail;
    return ajax(url, {data, method: 'post'}).then(res => {
        res.data.ruleKbList.forEach((ele, index) => {
            ele._index = index;
        });
        return Promise.resolve(res);
    });
}

export function save (data) {
    let url = URL.save;
    return ajax(url, {data, method: 'post'});
}

export function update (data) {
    let url = URL.update;
    return ajax(url, {data, method: 'post'});
}

export function getStandard (data) {
    let url = URL.getStandard;
    return ajax(url, {data, method: 'post'});
}

export function audit (data) {
    let url = URL.audit;
    return ajax(url, {data, method: 'post'});
}
