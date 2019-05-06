/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-10-30
 * @remark: 收费对照
 * */
import {ajax} from './../ajax';

export const URL = {
    indexdict: '/common/chargedict',
    diseaseRelationList: '/chargeRelation/list',
    audit: '/chargeRelation/audit',
    cancelAudit: '/chargeRelation/cancel/audit',
    getItemData: '/chargeRelation/get',
    match: '/chargeRelation/match',
    noMatch: '/chargeRelation/no/match',
    statistics: '/chargeRelation/statistics',
    standardList: '/chargeStandard/list',
    submit: '/chargeRelation/save',
    manytoone: '/chargeRelation/manytoone',
    onetomany: '/chargeRelation/onetomany',
    matchingCatalog: '/autoMatching/matchingCatalog',
    exportTpl: '/chargeRelation/templet/export',
    upload: '/chargeRelation/upload',
    synAuditDataByBatchNo: '/chargeRelation/synAuditData/batchNo', // {batchNo: ""}
    synAuditDataByIds: '/chargeRelation/synAuditData/ids' // {auditId: "1;2;3;4"}
};
export function getDict () { // 获取字典
    let url = URL.indexdict;

    return ajax(url, {method: 'post'});
}

export function getDiseaseRelationList (data) { // 获取原始数据列表
    let url = URL.diseaseRelationList;
    return ajax(url, {data, method: 'post'}).then((res) => {
        res.data.list.forEach((item, index) => {
            item.index = index;
        });
        return Promise.resolve(res);
    });
}

export function audit (data) { // 审核
    let url = URL.audit;
    return ajax(url, {data, method: 'post'});
}

export function cancelAudit (data) { // 撤销审核
    let url = URL.cancelAudit;
    return ajax(url, {data, method: 'post'});
}

export function getItemData (data) { // 根据id获取单个疾病对照数据
    let url = URL.getItemData;
    return ajax(url, {data, method: 'post'});
}

export function match (data) { // 对照操作
    let url = URL.match;
    return ajax(url, {data, method: 'post'});
}

export function noMatch (data) { // 不能对照操作
    let url = URL.noMatch;
    return ajax(url, {data, method: 'post'});
}

export function statistics (data) { // 对照统计数据
    let url = URL.statistics;
    return ajax(url, {data, method: 'post'});
}

export function getStandardList (data) { // 获取标准数据列表
    let url = URL.standardList;
    return ajax(url, {data, method: 'post'}).then((res) => {
        res.data.list.forEach((item, index) => {
            item.index = index;
        });
        return Promise.resolve(res);
    });
}

export function submit (data) { // 提交
    let url = URL.submit;
    return ajax(url, {data, method: 'post'});
}

export function manytoone (data) { // 多对一
    let url = URL.manytoone;
    return ajax(url, {data, method: 'post'});
}

export function onetomany (data) { // 一对多
    let url = URL.onetomany;
    return ajax(url, {data, method: 'post'});
}

export function matchingCatalog (data) { // 自动对照
    let url = URL.matchingCatalog;
    return ajax(url, {data, method: 'post'});
}

export function exportTpl (data) { // 模板下载
    let url = URL.exportTpl;
    return ajax(url, {method: 'get', responseType: 'blob'});
}

export function synAuditDataByBatchNo (data) { // 同步
    let url = URL.synAuditDataByBatchNo;
    return ajax(url, {data, method: 'post', timeout: 1000 * 60});
}
export function synAuditDataByIds (data) { // 同步
    let url = URL.synAuditDataByIds;
    return ajax(url, {data, method: 'post', timeout: 1000 * 60});
}
