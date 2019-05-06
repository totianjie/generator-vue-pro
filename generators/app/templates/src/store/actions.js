import * as types from './mutations-types';
import { findInArr } from "../js/utils/utils";
import CONFIG from 'src/config';
import busEvent from 'src/busEvent';

// 登录信息
export function signIn ({ commit }, { userInfo = {}, signinStatus = true }) {
    commit(types.SET_USER_INFO, userInfo);
    commit(types.SET_SIGNIN_STATUS, signinStatus);
}

export function menuListChange ({ commit, state }, { routeId = '', switchOpen }) { // switchOpen: 当前菜单切换打开  关闭
    let menuList = state.menuList.slice();

    if (menuList.length === 0 || routeId === '') {
        busEvent.$emit('alertMassage', '没有传入menuList, 或==>id');
        return false;
    }
    if (switchOpen) {
        _findCheck(menuList, routeId);
    } else {
        _reset(menuList);
        findInArr(menuList, routeId, 'id', 'open');
    }
    commit(types.SET_MENU_LIST, menuList);

    function _findCheck (arr, id) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i].id === id) {
                arr[i].open = !arr[i].open;
                return false;
            } else {
                if (arr[i].hasOwnProperty('children') && Array.isArray(arr[i].children) && arr[i].children.length > 0) {
                    _findCheck(arr[i].children, id);
                }
            }
        }
    }

    function _reset (arr) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            arr[i].open = false;
            if (arr[i].hasOwnProperty('children') && (arr[i].children.length > 0)) {
                _reset(arr[i].children);
            }
        }
    }
}


// 头部导航当前索引改变及导航数据改变 带标题
export function navListChangeWithTitle ({ commit, state }, { path, title }) {
    let location = state.navList.findIndex((item) => {
        return path === item.path;
    });
    if (location === -1) {
        let _data = { path: path, title: title, isSeparate: true };
        commit(types.SET_NAV_LIST, { data: _data, location });
        commit(types.SET_NAV_CURRENT_INDEX, state.navList.length - 1);
    } else {
        commit(types.SET_NAV_CURRENT_INDEX, location);
    }
}

// 头部导航当前索引改变及导航数据改变
export function navListChange ({ commit, state }, { path }) {
    let { bOk, data } = _findPath(state.menuList, path);
    // 只有在权限菜单中有才会改变navList
    if (bOk || path === CONFIG.defaultPage) {
        let location = state.navList.findIndex((item) => {
            return path === item.path;
        });

        if (location === -1) {
            let _data = path === CONFIG.defaultPage ? { path: path, title: '首页' } : data;
            commit(types.SET_NAV_LIST, { data: _data, location });
            commit(types.SET_NAV_CURRENT_INDEX, state.navList.length - 1);
        } else {
            commit(types.SET_NAV_CURRENT_INDEX, location);
        }
    }

}

// 查找当前路由是否在权限当中， 在权限当中的话就加入到头部导航
function _findPath (arr, key) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if (arr[i].path === key) {
            return { bOk: true, data: arr[i] };
        } else {
            if (arr[i].hasOwnProperty('children') && arr[i].children instanceof Array && (arr[i].children.length > 0)) {
                let res = _findPath(arr[i].children, key);
                if (res.bOk) {
                    return res;
                }
            }
        }
    }
    return { bOk: false, data: {} };
}
