/**
 * 场景管理/场景列表
 */
import { getRuleTree } from 'src/js/api/sceneManage/ruleClassify.js';
export default {
    namespaced: true,
    state: {
        RCIsHaveFather: false,
        RCPageSatus: 'detail', // list add edit
        RCRuleTreeData: [],
        RCFatherClassId: '',
        RCCurrentNodeKey: '',
        RCDetailData: {},
        RCEditData: {}
    },
    mutations: {
        setRCEditData (state, RCEditData = {}) {
            state.RCEditData = RCEditData;
        },
        setRCIsHaveFather (state, RCIsHaveFather = false) {
            state.RCIsHaveFather = RCIsHaveFather;
        },
        setRCCurrentNodeKey (state, RCCurrentNodeKey = '') {
            state.RCCurrentNodeKey = RCCurrentNodeKey;
        },
        setRCPageSatus (state, RCPageSatus = 'list') {
            state.RCPageSatus = RCPageSatus;
        },
        setRCRuleTreeData (state, RCRuleTreeData = []) {
            state.RCRuleTreeData = Object.assign([], RCRuleTreeData);
        },
        setRCFatherClassId (state, RCFatherClassId = '') {
            state.RCFatherClassId = RCFatherClassId;
        },
        setRCDetailData (state, RCDetailData = {}) {
            state.RCDetailData = Object.assign({}, RCDetailData);
        }
    },
    actions: {
        async getRuleClassTree ({ commit, state }, result_) {
            console.info('getRuleClassTree', result_);
            let res = await getRuleTree();
            console.log("规则树数据222：", res);
            let firstNode = res.data[0];
            let change = false;
            if (JSON.stringify(res.data) !== JSON.stringify(state.RCRuleTreeData)) {
                commit('setRCRuleTreeData', res.data);
                commit('setRCCurrentNodeKey', "-1");
                change = true;
            }
            commit('setRCRuleTreeData', res.data);
            if (result_ && change) {
                console.log(firstNode.ruleNo);
                commit('setRCCurrentNodeKey', firstNode.ruleNo);
                commit('setRCIsHaveFather', true);
                let obj = Object.assign({}, firstNode, { className: firstNode.ruleName, classNo: firstNode.ruleNo });
                commit('setRCDetailData', obj);
            }
        },
        async addRuleClass ({ commit, state }, data) {
            console.log('addRuleClass', data);

            let nodes = await getRuleTree();
            let firstNode = nodes.data[2].children[1]; // 接口返回的节点和信息
            let resBack = nodes.data[2].children[1];
            let nodekey_ = firstNode.ruleNo || firstNode.classNo;
            commit('setRCCurrentNodeKey', nodekey_);
            console.log("新增规则分类：", data);
            console.log("规则树数据333：", nodes);
            commit('setRCRuleTreeData', nodes.data);
            let obj = Object.assign({}, resBack, { className: resBack.ruleName, classNo: resBack.ruleNo });
            commit('setRCDetailData', obj);
            commit('setRCPageSatus', 'detail');

        },
        async editRuleClass ({ commit, state }, data) {
            let nodekey_ = data.ruleNo || data.classNo;


            commit('setRCCurrentNodeKey', nodekey_);
            console.log('editRuleClass', data);
            console.log("更新规则分类：", data);
            let nodes = await getRuleTree();
            console.log("规则树数据4444：", nodes);
            commit('setRCRuleTreeData', nodes.data);
            commit('setRCPageSatus', 'detail');
        },
        async detailRuleClass ({ commit, state }, data) {
            let obj = state.RCDetailData;


            console.log('detailRuleClass', obj);
            console.log("查看规则分类：", data);
        },
        async deleteRuleClass ({ commit, state }, data) {
            console.log('deleteRuleClass', data);
            console.log(" 删除规则分类：", data);
            let nodes = await getRuleTree();


            console.log("规则树数据66666：", nodes);
            commit('setRCRuleTreeData', nodes.data);
            let firstNode = nodes.data[0]; // 接口返回的节点和信息
            let resBack = nodes.data[0];
            let obj = Object.assign({}, resBack, { className: resBack.ruleName, classNo: resBack.ruleNo });
            commit('setRCDetailData', obj);
            let nodekey_ = firstNode.ruleNo || firstNode.classNo;
            commit('setRCCurrentNodeKey', nodekey_);
        },
        reset ({ commit, state }) {
            commit("setRCPageSatus");
            commit("setRCRuleTreeData");
            commit("setRCFatherClassId");
            commit("setRCDetailData");
            commit("setRCCurrentNodeKey");
            commit("setRCIsHaveFather");
            commit("setRCEditData");
        }
    },
    getters: {
        RCPageSatus: state => state.RCPageSatus,
        RCRuleTreeData: state => state.RCRuleTreeData,
        RCFatherClassId: state => state.RCFatherClassId,
        RCDetailData: state => state.RCDetailData,
        RCEditData: state => state.RCEditData,
        RCCurrentNodeKey: state => state.RCCurrentNodeKey,
        RCIsHaveFather: state => state.RCIsHaveFather
    }
};
