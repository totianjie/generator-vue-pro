/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-09-05
 * @remark: 手术对照
 * */
import {ajax} from './../ajax';

export const URL = {
    indexdict: '/common/operdict',
    diseaseRelationList: '/originalOperation/list',
    audit: '/originalOperation/audit',
    cancelAudit: '/originalOperation/cancel/audit',
    getItemData: '/originalOperation/get',
    match: '/originalOperation/match',
    noMatch: '/originalOperation/no/match',
    statistics: '/originalOperation/statistics',
    standardList: '/operationStandard/list',
    submit: '/originalOperation/save',
    manytoone: '/originalOperation/manytoone',
    onetomany: '/originalOperation/onetomany',
    exportTpl: '/originalOperation/templet/export',
    upload: '/originalOperation/upload',
    synAuditDataByBatchNo: '/originalOperation/synAuditData/batchNo', // {batchNo: ""}
    synAuditDataByIds: '/originalOperation/synAuditData/ids', // {auditId: "1;2;3;4"}
    matchingCatalog: ''
};

export function matchingCatalog (data) { // 自动对照
    // let url = URL.matchingCatalog;
    // return ajax(url, {data, method: 'post'});
    return Promise.resolve();
}

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
        console.log('fsdafsadfsafas', res);
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
