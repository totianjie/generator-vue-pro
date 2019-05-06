import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import state from './state';
import mutations from './mutations';
import taskManage from './modules/taskManage.js';
import scene from './modules/sceneManage/scene';

import watchManage from './modules/watchManage/watchManage.js';
import settingManage from './modules/settingManage/settingManage.js';
import standardLibrary from './modules/standardLibrary/standardLibrary.js';
import safeManage from './modules/safeManage/safeManage.js';
import comparisonForm from './modules/comparisonForm/index.js';

Vue.use(Vuex);

// env里去获取当前的环境是否需要开启严格模式
// 在发布环境开启严格模式会造成性能上不必要的损失
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: { // 导入模块
        // 任务管理
        taskManage: Object.assign({}, {
            namespaced: true
        }, taskManage),
        scene: Object.assign({}, { // 场景管理/场景列表
            namespaced: true
        }, scene),
        watchManage: Object.assign({}, { // 监控管理
            namespaced: true
        }, watchManage),
        settingManage: Object.assign({}, { // 配置管理
            namespaced: true
        }, settingManage),
        standardLibrary: Object.assign({}, { // 配置管理
            namespaced: true
        }, standardLibrary),
        safeManage: Object.assign({}, { // 配置管理
            namespaced: true
        }, safeManage),
        comparisonForm: Object.assign({}, {
            namespaced: true
        }, comparisonForm)
    },
    state,
    getters,
    actions,
    mutations,
    // 是否开启严格模式
    strict: debug
});
