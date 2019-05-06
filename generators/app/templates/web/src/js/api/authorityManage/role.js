import { ajax } from "../ajax";
// 引入封装好的树形方法
// import { parentId2Children } from 'js/utils/utils';

/** 角色组管理 start*/
const URL = {
    // 获取角色组选中菜单
    getRoleGropMenus: '/roleGroup/getRoleGropMenus',
    // 角色组列表
    getRoleGroupList: '/roleGroup',
    // 获取角色组下属角色
    getRole: '/roleGroup/getRoleGropLowerRoles',
    // 获取角色组详细信息
    getRoleGroupDetail: '/roleGroup/getRoleGroups',
    // 获取角色组授权菜单列表
    getRoleMenuAll: '/menu/getMenuAll',
    // 角色组新增
    addRoleGroup: '/roleGroup',
    // 角色组编辑
    getEditRoleGroup: '/roleGroup',
    // 角色组删除
    getDeleteRoleGroup: '/roleGroup',
    // 获取角色选中菜单
    getRoleMenus: '/role/getRoleMenus',
    // 角色列表
    getRoleList: '/role',
    // 角色详情信息
    getRoleDetail: '/role/getrole',
    // 角色新增
    getAddRole: '/role',
    // 角色编辑
    getEditRole: '/role',
    // 角色删除
    getDeleteRole: '/role',
    // 角色组鉴重
    checkRoleGroupOnly: '/roleGroup/checkRoleName',
    // 角色鉴重
    checkRoleOnly: '/role/checkRoleName'
};

export function checkRoleOnly (params) {
    let url = URL.checkRoleOnly;
    return ajax(url, { params });
}

export function checkRoleGroupOnly (params) {
    let url = URL.checkRoleGroupOnly;
    return ajax(url, { params });
}
export function getRoleGropMenus (params) {
    let url = URL.getRoleGropMenus;
    return ajax(url, { params });
}
export function getRoleGroupList (params) {
    let url = URL.getRoleGroupList;
    return ajax(url, { params });
}
export function getRole (params) {
    let url = URL.getRole;
    return ajax(url, { params });
}
export function getRoleGroupDetail (params) {
    let url = URL.getRoleGroupDetail;
    return ajax(url, { params });
}
export function getRoleMenuAll (params) {
    let url = URL.getRoleMenuAll;
    return ajax(url, { params });
}
export function addRoleGroup (data) {
    let url = URL.addRoleGroup;
    return ajax(url, { data, method: 'post' });
}
export function getEditRoleGroup (data) {
    let url = URL.getEditRoleGroup;
    return ajax(url, { data, method: 'put' });
}
export function getDeleteRoleGroup (params) {
    let url = URL.getDeleteRoleGroup;
    return ajax(url, { params, method: 'delete' });
}
export function getRoleList (params) {
    let url = URL.getRoleList;
    return ajax(url, { params });
}
export function getRoleDetail (params) {
    let url = URL.getRoleDetail;
    return ajax(url, { params });
}
export function getAddRole (data) {
    let url = URL.getAddRole;
    return ajax(url, { data, method: 'post' });
}
export function getEditRole (data) {
    let url = URL.getEditRole;
    return ajax(url, { data, method: 'put' });
}
export function getDeleteRole (params) {
    let url = URL.getDeleteRole;
    return ajax(url, { params, method: 'delete' });
}
export function getRoleMenus (params) {
    let url = URL.getRoleMenus;
    return ajax(url, { params });
}
/** 角色组管理  end*/
