/**
 *  Created by TIANJIE on 2018/6/19
 * */
import {ajax} from './../ajax';

const URL = {
    // 查询
    list: '/user/list',
    // 组织架构管理-根据id查询组织树
    queryOrganizationTree: '/organization/queryOrganizationTree',
    // 数据角色管理-数据角色列表
    dataRoleList: '/dataRole/dataRoleList',
    // 获取用户详细信息
    queryById: '/user/queryById',
    // 修改 新增
    insert: '/user/insert',
    // 用户编辑
    update: '/user/update',
    getRoleGropLowerRoles: '/roleGroup/getRoleGropLowerRoles',
    // 删除
    delete: '/user/delete',
    // 初始化密码
    initialPassWord: '/user/initialPassWord',
    // 用户管理-修改状态
    updateStatus: '/user/updateStatus',
    // 验证唯一性
    checkUserName: '/user/checkName'
};

export function getUserList (data) {
    let url = URL.list;
    return ajax(url, {data, method: 'post'});
}

export function checkUserNameOnly (params) {
    let url = URL.checkUserName;
    return ajax(url, {params});
}

export function queryOrganizationTree (params) {
    let url = URL.queryOrganizationTree;
    return ajax(url, {params});
}

// 获取关联数据角色
export function getDataRoleList (params) {
    let url = URL.dataRoleList;
    return ajax(url, {params});
}

export function getRoleGropLowerRoles (params) {
    let url = URL.getRoleGropLowerRoles;
    return ajax(url, {params});
}

export function getUserDetail (params) {
    let url = URL.queryById;
    return ajax(url, {params});
}

export function userInsert (data) {
    let url = URL.insert;
    return ajax(url, {data, method: 'post'});
}

export function userUpdate (data) {
    let url = URL.update;
    return ajax(url, {data, method: 'post'});
}

export function deleteUser (params) {
    let url = URL.delete;
    return ajax(url, {params});
}

export function initialPassWord (params) {
    let url = URL.initialPassWord;
    return ajax(url, {params});
}

export function updateStatus (data) {
    let url = URL.updateStatus;
    return ajax(url, {data, method: 'post'});
}

