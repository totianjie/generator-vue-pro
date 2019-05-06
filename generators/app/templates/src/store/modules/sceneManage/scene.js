/**
 * 场景管理/场景列表
 */
import {getRuleTree, getList, add, update, getInfoByAppid} from 'src/js/api/sceneManage/scene';
import CONFIG from 'src/config';
import ruleClassify from './ruleClassify'; // 规则分类模块
import rule from './rule'; // 规则管理,规则创建模块

export default {
    modules: { // 导入模块
        ruleClassify, // 规则分类模块
        rule // 规则管理,规则创建模块
    },
    state: {
        pageType: 'list', // list add edit detail addCopy
        ruleTreeData: [],
        sceneList: [],
        paging: {
            offset: 1,
            limit: CONFIG.limit,
            total: 0
        },
        // 主要用于编辑，用于回填数据
        detailData: {}
    },
    mutations: {
        setPageType (state, pageType = 'list') {
            state.pageType = pageType;
        },
        setRuleTreeData (state, data = []) {
            state.ruleTreeData = Object.assign([], data);
        },
        setSceneList (state, sceneList = []) {
            state.sceneList = Object.assign([], sceneList);
        },
        setPaging (state, paging = {}) {
            state.paging = Object.assign(state.paging, paging);
        },
        setDetailData (state, detailData = {}) {
            state.detailData = Object.assign({}, detailData);
        }
    },
    actions: {
        async getRuleTree ({ commit, state }, data) {
            let res = await getRuleTree();
            console.log("规则树数据：", res);
            commit('setRuleTreeData', res.data);
        },
        async getSceneList ({commit, state}) {
            let params = {
                pageNum: state.paging.offset,
                pageSize: state.paging.limit
            };
            let {data} = await getList(params);
            console.log("表格数据：", data);
            let {list, pageNum, pageSize, total} = data;
            commit('setPaging', {
                offset: pageNum,
                limit: pageSize,
                total
            });
            commit('setSceneList', list);
        },
        // 添加场景
        async add ({commit, state}, par) {
            await add(par);
           
            let params = {
                pageNum: 1,
                pageSize: CONFIG.limit
            };

            let {data} = await getList(params);
            console.log("表格数据：", data);
            let {list, pageNum, pageSize, total} = data;
            commit('setPaging', {
                offset: pageNum,
                limit: pageSize,
                total
            });
            commit('setSceneList', list);
            commit('setPageType');
        },
        // 编辑场景
        async update ({commit, state}, par) {
            await update(par);
            commit('setPaging', {
                offset: 1,
                limit: CONFIG.limit,
                total: 0
            });
            

            let params = {
                pageNum: 1,
                pageSize: CONFIG.limit
            };

            let {data} = await getList(params);
            console.log("表格数据：", data);
            let {list, pageNum, pageSize, total} = data;
            commit('setPaging', {
                offset: pageNum,
                limit: pageSize,
                total
            });
            commit('setSceneList', list);
            commit('setPageType');
        },
        async getInfoByAppid ({commit, state}, para = {}) { // {appId: xx}
            let res = await getInfoByAppid(para);
            commit('setDetailData', res.data);
        },
        reset ({commit, state}) {
            commit("setPageType");
            commit("setRuleTreeData");
            commit("setSceneList");
            commit("setPaging", {offset: 1, limit: CONFIG.limit, total: 0});
            commit("setDetailData");
        }
    },
    getters: {
        pageType: state => state.pageType,
        ruleTreeData: state => state.ruleTreeData,
        sceneList: state => state.sceneList,
        paging: state => state.paging,
        detailData: state => state.detailData
    }
};
