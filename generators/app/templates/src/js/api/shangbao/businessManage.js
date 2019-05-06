/* jshint esversion: 6 */
/**
 * @Author: Nelson Hsiao
 * @Date: 2019-01-24
 * @remark: 保险管理
 * */
import { ajax } from "../ajax";
import {deepCopy} from 'js/utils/utils';

/** 保险管理 start */
const URL = {
    // 保险管理列表
    list: '/insurance/pageList',
    // 保险管理编辑
    update: '/insurance/update',
    // 保险管理删除
    delete: '/insurance/delete',
    // 保险管理查看
    detail: '/insurance/queryById',
    // 保险管理新增
    add: '/insurance/add',
    // 保险管理规则分类review
    getList: '/clause/queryAll',
    // 保险管理规则分类
    audit: '/insurance/review',
    // 保险管理规则
    getRuleList: '/main/rule/queryByName/'
};

import urlConfig from './config';
for (let key in URL) {
    URL[key] = `${urlConfig.baseURL}${URL[key]}`;
}

export function dataAudit (data) {
    let url = URL.audit;
    return ajax(url, {method: 'post', timeout: 120, params: data});
}


export function addData (data) {
    let url = URL.add;
    return ajax(url, {data, method: 'post', timeout: 120 });
}


export function updateData (data) {
    let url = URL.update;
    return ajax(url, {data, method: 'post', timeout: 120 });
}


// 保险管理查看
export function getRuleListTable (data) {
    let url = URL.getRuleList;
    return ajax(url, {method: 'post', timeout: 120, params: data});
}


// 保险管理查看
export function getRuleClass (data) {
    let url = URL.getList;
    return ajax(url, {data, timeout: 120 });
}


// 保险管理查看
export function getDetail (data) {
    let url = URL.detail + "/" + data.id;
    return ajax(url, {data, timeout: 120 }).then((result) => {
        let list = result.data.list;
        result.data.list = formatArr(list);
        return result;
    });
    function formatArr (arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            let list = [];
            let back = false;
            arr.forEach((item) => {
                let {clauseId, clauseName, validityTerm, clauseRemark} = deepCopy(item);
                let {id, mainRuleId, mainRuleName, categoryName} = deepCopy(item);
                let itemS = {id, mainRuleId, mainRuleName, categoryName};
                if (itemS.id !== undefined) {
                    list.push({clauseId, clauseName, validityTerm, clauseRemark, children: [itemS]});
                } else {
                    list.push(item);
                    back = true;
                }
            });
            if (back) {
                return arr;
            }
            let resultList = [];
            let resultIds = [];
            list.forEach((item) => {
                if (resultIds.join(",").indexOf("--" + item.clauseId + "--") !== -1) {
                    let temp = resultList.filter(res => {
                        return res.clauseId = item.clauseId;
                    })[0];
                    temp.rules = [].concat(temp.rules, item.rules);
                } else {
                    resultList.push(deepCopy(item));
                    resultIds.push("--" + item.clauseId + "--");
                }
            });
            arr = resultList;
            return arr;
        } else {
            return arr || [];
        }
    }
}


// 保险管理列表
export function getList (data) {
    let pageNo = data.offset;
    let pageCount = data.limit;
    console.log(data);
    let url = URL.list + '/' + pageNo + '/' + pageCount;
    return ajax(url, {data, timeout: 120 });
}

// 保险管理删除
export function dataDelete (data) {
    let url = URL.delete;
    return ajax(url, {method: 'post', timeout: 120, params: data});
}
/** 保险管理 end */
