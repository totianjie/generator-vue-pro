/**
 *  Created by TIANJIE on 2018/6/19
 * */

import { ajax } from './../ajax';
// import { parentId2Children } from 'js/utils/utils';

const URL = {
    menu: '/menu',
    // 获取启用菜单
    getMenuAll: '/menu/getMenuAll',
    // 单个菜单获取
    getSysMenu: '/menu/getSysMenu',
    // 验证权限编码唯一
    checkMenuCode: '/menu/checkPer'
};

export function getMenuList (params) {
    let url = URL.menu;
    return ajax(url, { params });
}

export function deleteMenu (params) {
    let url = URL.menu;
    return ajax(url, { params, method: 'delete' });
}

export function addMenu (data) {
    let url = URL.menu;
    return ajax(url, { data, method: 'post' });
}

export function checkMenuCode (params) {
    let url = URL.checkMenuCode;
    return ajax(url, { params });
}

export function getMenuAll (params) {
    let url = URL.getMenuAll;
    return ajax(url, { params });
}

export function getSysMenu (params) {
    let url = URL.getSysMenu;
    return ajax(url, { params });
}

export function updateMenu (data) {
    let url = URL.menu;
    return ajax(url, { data, method: 'put' });
}
