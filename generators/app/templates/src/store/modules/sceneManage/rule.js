/**
 * Med开头为规则管理
   Dev 开头为规则创建 getCodeList, insert, detail, update
 */
import {getList, getRuleTree} from 'src/js/api/sceneManage/rule.js';
export default {
    namespaced: true,
    state: {
        CurrentPage: '', // 当前是规则管理还是规则创建
        MedPageSatus: 'list', // list add edit detail
        MedRuleListData: [],
        MedDetailData: {},
        MedEditData: {},
        MedParameters: {},
        DevPageSatus: 'list', // list add edit detail
        DevRuleListData: [],
        DevDetailData: {},
        DevEditData: {},
        DevParameters: {}
    },
    mutations: {
        setCurrentPage (state, CurrentPage = '') {
            state.CurrentPage = CurrentPage;
        },
        setMedParameters (state, MedParameters = {}) {
            state.MedParameters = MedParameters;
        },
        setMedPageSatus (state, MedPageSatus = 'list') {
            state.MedPageSatus = MedPageSatus;
        },
        setMedEditData (state, MedEditData = {}) {
            state.MedEditData = MedEditData;
        },
        setMedRuleListData (state, MedRuleListData = []) {
            state.MedRuleListData = Object.assign([], MedRuleListData);
        },
        setMedDetailData (state, MedDetailData = {}) {
            state.MedDetailData = Object.assign({}, MedDetailData);
        },
        setDevEditData (state, DevEditData = {}) {
            state.DevEditData = DevEditData;
        },
        setDevRuleListData (state, DevRuleListData = []) {
            state.DevRuleListData = Object.assign([], DevRuleListData);
        },
        setDevDetailData (state, DevDetailData = {}) {
            state.DevDetailData = Object.assign({}, DevDetailData);
        },
        setDevPageSatus (state, DevPageSatus = 'list') {
            state.DevPageSatus = DevPageSatus;
        },
        setDevParameters (state, DevParameters = {}) {
            state.DevParameters = DevParameters;
        },
        setRuleTreeData (state, RuleTreeData = []) {
            state.RuleTreeData = RuleTreeData;
        }
    },
    actions: {
        async getRuleClassTree ({ commit, state }, data) {
            let res = await getRuleTree();
            console.log("规则树数据6666：", res);
            commit('setRuleTreeData', res.data);
        },
        setCurrent ({commit, state}, data) {
            if (data === 'dev') {
                commit('setCurrentPage', 'dev');
            } else if (data === 'med') {
                commit('setCurrentPage', 'med');
            }
        },
        resetMed ({commit, state}) {
            commit("setMedPageSatus");
            commit("setMedRuleListData");
            commit("setMedDetailData");
            commit("setMedEditData");
            commit("setMedParameters");
        },
        resetDev ({commit, state}) {
            commit("setDevPageSatus");
            commit("setDevRuleListData");
            commit("setDevDetailData");
            commit("setDevEditData");
            commit("setDevParameters");
        },
        async getList ({commit, state}, data_) {
            let {data} = await getList(data_);
            if (state.CurrentPage === 'med') {
                commit("setMedRuleListData", data);
            } else {
                commit("setDevRuleListData", data);
            }
        }
    },
    getters: {
        MedParameters: state => state.MedParameters,
        MedPageSatus: state => state.MedPageSatus,
        MedRuleListData: state => state.MedRuleListData,
        MedDetailData: state => state.MedDetailData,
        MedEditData: state => state.MedEditData,
        DevPageSatus: state => state.DevPageSatus,
        DevRuleListData: state => state.DevRuleListData,
        DevDetailData: state => state.DevDetailData,
        DevEditData: state => state.DevEditData,
        DevParameters: state => state.DevParameters,
        CurrentPage: state => state.CurrentPage,
        RuleTreeData: state => state.RuleTreeData
    }
};
