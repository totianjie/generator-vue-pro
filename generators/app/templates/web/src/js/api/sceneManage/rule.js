/* jshint esversion: 6 */
/**
 * @Author: Nelson
 * @Date: 2019-04-16
 * @remark: 规则管理列表
 * */
import {ajax} from './../ajax';
import {parentId2Children} from 'js/utils/utils';

/** 规则管理 start */
const URL = {
    // 规则管理枚举获取
    codeList: '/business/code/list',
    // 规则管理枚举
    list: '/business/list',
    // 规则管理编辑
    update: '/business/update',
    // 规则管理删除
    delete: '/business/update',
    // 规则管理新增
    add: '/business/add',
    // 规则管理详情查看
    detail: '/business/get',
    queryDataRuleList: '/platformConfig/queryDataRuleList' // 获取规则列表

};

export function getRuleTree () {
    let url = URL.queryDataRuleList;
    return ajax(url).then(res => {
        res.data = parentId2Children(res.data);
        return Promise.resolve(res);
    });
}
// 规则管理列表
export function getList (data) {
    let url = URL.list;
    return ajax(url, { data, method: 'post' });
}

// 规则管理枚举
export function getCodeList (params) {
    let url = URL.codeList;
    console.log(params);
    return ajax(url, { params, method: 'post' }).then(res => {
        res.data = res.data.map((res2) => {
            console.log(typeof res2);
            if (typeof res2 === 'string') {
                res2 = {busiName: 'name' + res2, busiCode: res2};
            }
            return res2;
        });
        return Promise.resolve(res);
    });
}

// 规则管理编辑
export function update (data) {
    let url = URL.update;
    return ajax(url, { data, method: 'post' });
}

// 规则管理新增
export function insert (data) {
    let url = URL.add;
    return ajax(url, { data, method: 'post' });
}

// 规则管理查看
export function detail (params) {
    let url = URL.detail;
    return ajax(url, { params, method: 'post' });
}

/** 规则管理 end */
