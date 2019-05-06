import { ajax } from "../ajax";

/** 数据角色管理 start */
const URL = {
    // 数据角色管理-数据角色列表
    dataRoleList: '/dataRole/dataRoleList',
    // 列表
    listData: '/dataRole/list',
    // 用户修改状态 禁用 启用
    updateStatusUser: '/user/updateStatus',
    // 修改
    updateData: '/dataRole/update',
    // 查看
    queryData: '/dataRole/queryById',
    // 获取新增角色授权和所属组织所有菜单(组织机构管理--根据id查询组织树接口)
    orgTreeData: '/organization/queryOrganizationTree',
    // 新增
    insertData: '/dataRole/insert',
    // 删除
    deteleData: '/dataRole/delete'

};

// 获取关联数据角色
export function getDataRoleList (params) {
    let url = URL.dataRoleList;
    return ajax(url, { params });
}
export function listData (data) {
    let url = URL.listData;
    return ajax(url, { data, method: 'post' });
}
export function updateStatusUser (data) {
    let url = URL.updateStatusUser;
    return ajax(url, { data, method: 'post' });
}
export function updateData (data) {
    let url = URL.updateData;
    return ajax(url, { data, method: 'post' });
}
export function queryData (params) {
    let url = URL.queryData;
    return ajax(url, { params });
}
export function orgTreeData (params) {
    let url = URL.orgTreeData;
    return ajax(url, { params });
}
export function insertData (data) {
    let url = URL.insertData;
    return ajax(url, { data, method: 'post' });
}
export function deteleData (params) {
    let url = URL.deteleData;
    return ajax(url, { params });
}
/** 数据角色管理 end */
