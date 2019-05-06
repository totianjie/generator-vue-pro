import * as types from './mutations-types.js';

const mutations = {
    // 全局loading 状态
    [types.SET_LOADING_SHOW] (state, bSing) {
        state.loadingShow = bSing;
    },
    // 用户信息
    [types.SET_USER_INFO] (state, user = null) {
        state.userInfo = user || {};
    },
    // 权限菜单管理
    [types.SET_MENU_LIST] (state, menuList = []) {
        state.menuList = menuList;
    },
    // 登录状态
    [types.SET_SIGNIN_STATUS] (state, status = NaN) {
        // 这里对status传值做了审查，如没有传，则对要改变的布尔值进行取反操作
        state.signinStatus = isNaN(status) ? !state.signinStatus : status;
    },

    [types.SET_POSITION] (state, {key = '-1', val = {id: ''}} = {}) {
        state.position[key] = val;
    },
    [types.GET_POSITION] (state, key = '') {
        if (!key || !state.position.hasOwnProperty(key)) return null;
        return state.position[key];
    },
    [types.DEL_POSITION] (state, key = '') {
        if (!key || !state.position.hasOwnProperty(key)) return null;
        delete state.position[key];
    },
    // 头部导航菜单 添加
    [types.SET_NAV_LIST] (state, {data, location}) {
        state.navList.push(data);
    },
    // 头部导航菜单 删除
    [types.DEL_NAV_LIST] (state, index) {
        //
        if (state.navList.length > 0) {
            state.navList.splice(index, 1);
        } else {
            state.navCurrentIndex = -1;
        }
    },
    // 头部导航菜单 清空
    [types.CLEAR_NAV_LIST] (state, {navList = []} = {}) {
        state.navList = navList;
    },
    // 当前nav导航索引
    [types.SET_NAV_CURRENT_INDEX] (state, index) {
        state.navCurrentIndex = index;
    }
};

export default mutations;
