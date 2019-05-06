import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store';
import routes from './routes';
import CONFIG from './../config';
// import logger from '../js/utils/logger';
import {getCookie, removeCookie} from 'js/utils/cookies';
import {getUserMenus} from 'js/api/user';
import {myBrowser} from 'js/utils/utils';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: CONFIG.ROUTER_MODE, // 访问路径不带井号 需要使用 history模式，才能使用 scrollBehavior
    base: '/', // 根目录路径，配合./config/index.js中的设置，目的在build后，能顺利部署到服务端，与后台文件不冲突。。
    routes, // 挂载路由集合
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // return {x: 0, y: 0}
    }
});

router.beforeEach((to, from, next) => {
    // logger.log(`===>>> router.beforeEach ===>>> from: ${from.name} ==> to: ${to.name}`);
    try {
        if (store.state) {
            /** 保存位置信息，用于判断路由的前进后退 */
            let key = from.query.timestamp;
            let obj = Object.create(null);

            store.commit('SET_POSITION', {key: key, val: obj});
        }
    } catch (e) {
        console.error('router.beforeEach: ', e);
    }
    if (myBrowser() !== 'Chrome') {
        if (to.path.startsWith('/chrome')) {
            next();
            return false;
        }
        next({path: '/chrome'});
    }
    if (to.path.startsWith('/login')) {
        removeCookie('user_info');
        sessionStorage.removeItem('menu_list');
        store._mutations['SET_MENU_LIST'][0]([]);
        store._actions.signIn[0]({userInfo: {}, signinStatus: false});
        store._mutations['CLEAR_NAV_LIST'][0]();
        next();
        return false;
    }
    let userInfo = JSON.parse(getCookie('user_info'));
    if (!userInfo) {
        next({path: '/login'});
    } else {
        let menu = JSON.parse(sessionStorage.getItem('menu_list'));
        if (store.state.menuList.length === 0) {
            if (menu) {
                store._mutations['SET_MENU_LIST'][0](menu);
                store._actions.signIn[0]({userInfo});
                next();
                return false;
            }
            getUserMenus().then(res => {
                store._mutations['SET_MENU_LIST'][0](res.data);
                store._actions.signIn[0]({userInfo});
                sessionStorage.setItem('menu_list', JSON.stringify(res.data));
                return Promise.resolve();
            }).then(() => {
                next();
            }).catch(() => {
                next({path: '/login'});
            });
        } else {
            // store._mutations['SET_MENU_LIST'][0](menu);
            store._actions.signIn[0]({userInfo});
            next();
        }
    }

});

router.setTitle = function (title) {
    // document.title = title;
};

router.afterEach(route => {
    if (route.meta && route.meta.title) {
        router.setTitle(route.meta.title);
    } else {
        router.setTitle(CONFIG.TITLE);
    }
});

/**
 * 根据时间戳判断当前路由是进入还是回退~
 */
router.direct = () => {
    if (store.getters.position.hasOwnProperty(router.currentRoute.query.timestamp)) {
        return 0; // 回退
    }
    return 1; // 进入
};
let p = router.push;
let r = router.replace;

router.push = function (params) {
    if (params.query) {
        params.query.timestamp = Date.now();
    } else {
        params.query = {timestamp: Date.now()};
    }
    params.query._init = findInNavList(store, params);
    p.call(router, params);
};
router.replace = function (params) {
    if (params.query) {
        params.query.timestamp = Date.now();
    } else {
        params.query = {timestamp: Date.now()};
    }
    params.query._init = findInNavList(store, params);
    r.call(router, params);
};

function findInNavList (store, params) {
    if (store.state && (store.state.hasOwnProperty('navList') && store.state.navList.length > 0)) {
        return !store.state.navList.some((item) => {
            return item.path === params.path;
        });
    } else {
        return true;
    }
}

export default router;
