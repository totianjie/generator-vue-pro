/**
 * 安全部署管理
 */
import {getList, getDetail, add} from 'src/js/api/safeManage/safeManage.js';
export default {
    namespaced: true,
    state: {
        pageType: 'list', // list add  detail
        ListData: [],
        Parameters: {total: 0, offset: 1, limit: 20},
        DetailData: {},
        AddData: {}
    },
    mutations: {
        setParameters (state, Parameters_ = {total: 0, offset: 1, limit: 20}) {
            state.Parameters = Object.assign({}, state.Parameters, Parameters_);
        },
        setPageType (state, pageType = 'list') {
            state.pageType = pageType;
        },
        setListData (state, ListData = []) {
            state.ListData = Object.assign([], ListData);
        },
        setAddData (state, AddData_ = {}) {
            state.AddData = Object.assign({}, AddData_);
        },
        setDetailData (state, DetailData = {}) {
            state.DetailData = Object.assign({}, DetailData);
        }
    },
    actions: {
        async getList ({ commit, state }, data = {}) {
            let data_ = Object.assign({}, data, JSON.parse(JSON.stringify(state.Parameters)));
            console.log(data_);
            delete data_.total;
            let res_ = await getList(data_);
            commit('setListData', res_.data.list);
            commit('setParameters', {total: res_.data.total});
            console.log('res', res_);
        },
        reset ({commit, state}) {
            commit("setPageType");
            commit("setListData");
            commit("setDetailData");
            commit("setAddData");
            commit("setParameters");
        },
        async getDetail ({ commit, state }, data) {
            let res = await getDetail(data);
            commit('setDetailData', res.data);
            console.log('res', res);
        },
        addData_ ({ commit, state }, data_) {
            let data = Object.assign({}, state.AddData, data_);
            console.log('addData', data);
            commit('setAddData', data);
            console.log(state.AddData);
        },
        async addSend ({ commit, state }, data_) {
            let {craeteUser} = JSON.parse(sessionStorage.getItem('user_info'));
            let obj = Object.assign({}, state.AddData, {craeteUser});
            obj.zipList = obj.zipList.map((item) => {
                item.status = null;
                return item;
            });
            let res = await add(obj);
            if (res.statusCode + '' === '200') {
                commit("setPageType");
                commit('setAddData');
            }
        }
    },
    getters: {
        Parameters: state => state.Parameters,
        pageType: state => state.pageType,
        ListData: state => state.ListData,
        DetailData: state => state.DetailData,
        AddData: state => state.AddData
    }
};
