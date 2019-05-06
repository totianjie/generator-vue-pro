/**
 *  Created by TIANJIE on 2018/6/19
 * */
import { ajax } from './../ajax';

const URL = {
    // 组织机构管理-根据id查询组织树
    queryOrganizationTree: '/organization/queryOrganizationTree',
    // 新增
    insert: '/organization/insert',
    // 修改
    update: '/organization/update',
    // 详情
    handleDetail: '/organization/queryById',
    
    // 验证唯一性 code
    checkCode: '/organization/checkCode',
    
    getqueryall: '/roleGroup/getqueryall',
    // 获取组织机构列表数据
    list: '/organization/list',
    // 删除
    delete: '/organization/delete'
};

export function queryOrganizationTree (params) {
    let url = URL.queryOrganizationTree;
    return ajax(url, { params });
}


export function checkOrgOnlyCode (params) {
    let url = URL.checkCode;
    return ajax(url, { params });
}

export function orgInsert (data) {
    let url = URL.insert;
    return ajax(url, { data, method: 'post' });
}

export function orgUpdate (data) {
    let url = URL.update;
    return ajax(url, { data, method: 'post' });
}

export function getOrgDetail (params) {
    let url = URL.handleDetail;
    return ajax(url, { params });
}

export function getRoleGroupAll (params) {
    let url = URL.getqueryall;
    return ajax(url, { params });
}

export function getOrgList (data) {
    let url = URL.list;
    return ajax(url, { data, method: 'post' });
}

export function deleteOrg (params) {
    let url = URL.delete;
    return ajax(url, { params });
}

