/**
    配置管理
    YJ 预警信息管理开头
    DM 业务信息配置
    PP 跑批主机配置
 */
import {getDataBaseList, getBussnissCode, getListSettingDataCenterTable} from 'js/api/settingManage/dataManageCenter/dataManageCenter.js';
import {getWarningList} from 'js/api/settingManage/warningList/warningList.js';

export default {
    state: {
        YJTaskTypeList: [], // 任务列表
        YJEditObj: {}, // 编辑对象
        YJParameters: {
            limit: 20,
            offset: 1
        }, // 页面控制
        YJIsDetail: false, // 是否是详情
        YJIsEdit: false, // 是否是编辑状态
        YJIsAdd: false, // 是否是新增状态
        YJTableList: [], // 表格数据
        YJtotal: 0, // 页面总数
        DMParameters: {
            limit: 20,
            offset: 1
        }, // 页面控制
        DMIsDetail: false, // 是否是详情
        DMIsEdit: false, // 是否是编辑状态
        DMIsAdd: false, // 是否是新增状态
        DMTableList: [], // 表格数据
        DMdbList: {}, // 所有数据库数据
        DMtotal: 0, // 页面总数
        DMbussinessCodeList: [], // 业务编码列表
        DMSelectMenu: {}, // 头部业务编码已选名称 已查询
        DMSelectMenuIsTemp: {}, // 头部业务编码已选名称 未查询
        DMEditObj: {}, // 编辑对象
        DBCity: [] // 缓存城市
    },
    mutations: {
        setDBCity (state, DBCity = "") {
            state.DBCity = DBCity;
        },
        setDMEditObj (state, DMEditObj = "") {
            state.DMEditObj = DMEditObj;
        },
        setDMSelectMenuIsTemp (state, DMSelectMenuIsTemp = {}) {
            state.DMSelectMenuIsTemp = DMSelectMenuIsTemp;
        },
        setDMSelectMenu (state, DMSelectMenu = {}) {
            state.DMSelectMenu = DMSelectMenu;
        },
        setDMParameters (state, DMParameters = {limit: 20, offset: 1}) {
            state.DMParameters = DMParameters;
        },
        setDMIsDetail (state, DMIsDetail = false) {
            state.DMIsDetail = DMIsDetail;
        },
        setDMIsEdit (state, DMIsEdit = false) {
            state.DMIsEdit = DMIsEdit;
        },
        setDMIsAdd (state, DMIsAdd = false) {
            state.DMIsAdd = DMIsAdd;
        },
        setDMTableList (state, DMTableList = []) {
            state.DMTableList = DMTableList;
        },
        setDMdbList (state, DMdbList = {}) {
            state.DMdbList = DMdbList;
        },
        setDMbussinessCodeList (state, DMbussinessCodeList = []) {
            state.DMbussinessCodeList = DMbussinessCodeList;
        },
        setDMtotal (state, DMtotal = 0) {
            state.DMtotal = DMtotal;
        },
        setYJParameters (state, YJParameters = {limit: 20, offset: 1}) {
            state.YJParameters = YJParameters;
        },
        setYJIsDetail (state, YJIsDetail = false) {
            state.YJIsDetail = YJIsDetail;
        },
        setYJIsEdit (state, YJIsEdit = false) {
            state.YJIsEdit = YJIsEdit;
        },
        setYJIsAdd (state, YJIsAdd = false) {
            state.YJIsAdd = YJIsAdd;
        },
        setYJTableList (state, YJTableList = []) {
            state.YJTableList = YJTableList;
        },
        setYJtotal (state, YJtotal = 0) {
            state.YJtotal = YJtotal;
        },
        setYJEditObj (state, YJEditObj = {}) {
            state.YJEditObj = YJEditObj;
        },
        setYJTaskTypeList (state, YJTaskTypeList = []) {
            state.YJTaskTypeList = YJTaskTypeList;
        }
    },
    actions: {
        YJreset ({commit, state}) {
            commit("setYJParameters", {
                limit: 20,
                offset: 1
            });
            commit("setYJIsDetail");
            commit("setYJIsEdit");
            commit("setYJIsAdd");
            commit("setYJTableList");
            commit("setYJtotal");
            commit("setYJEditObj");
            commit("setYJTaskTypeList");
        },

        DMreset ({commit, state}) {
            commit("setDMParameters", {
                limit: 20,
                offset: 1
            });
            commit("setDMIsDetail");
            commit("setDMbussinessCodeList");
            commit("setDMdbList");
            commit("setDMTableList");
            commit("setDMIsAdd");
            commit("setDMIsEdit");
            commit("setDMtotal");
            commit("setDMSelectMenu");
            commit("setDMSelectMenuIsTemp");
            // commit("setDBCity");
            commit("setDMEditObj");

        },
        async getDataBaseList ({commit, state}) {
            let res = await getDataBaseList();
            console.log("getDataBaseList", res);
            commit('setDMdbList', res.data);
        },
        async getWarningList ({commit, state}) {
            console.log(state.YJParameters);
            let res = await getWarningList(state.YJParameters);
            console.log("getWarningList", res);
            commit('setYJtotal', res.data.total);
            commit('setYJTableList', res.data.list);

        },
        async getBussnissCode ({commit, state}) {
            let res = await getBussnissCode({"enable": 0});
            commit('setDMbussinessCodeList', res.data);
        },
        async requestDataDM ({commit, state}) {
            let DMParameters_ = Object.assign({}, state.DMParameters, state.DMSelectMenu);
            console.log(DMParameters_);
            let res = await getListSettingDataCenterTable(DMParameters_);
            console.log([res]);
            commit('setDMtotal', res.data.total);
            commit('setDMTableList', res.data.list);
        },
        resetOffsetDM ({commit, state}) {
            let limit = state.DMParameters.limit;
            commit("setDMParameters", {offset: 1, limit});
        }
    },
    getters: {
        DBCity: state => state.DBCity,
        DMParameters: state => state.DMParameters,
        DMIsDetail: state => state.DMIsDetail,
        DMIsEdit: state => state.DMIsEdit,
        DMIsAdd: state => state.DMIsAdd,
        DMTableList: state => state.DMTableList,
        DMdbList: state => state.DMdbList,
        DMtotal: state => state.DMtotal,
        DMSelectMenu: state => state.DMSelectMenu,
        DMEditObj: state => state.DMEditObj,
        DMSelectMenuIsTemp: state => state.DMSelectMenuIsTemp,
        DMbussinessCodeList: state => state.DMbussinessCodeList,
        YJParameters: state => state.YJParameters,
        YJIsDetail: state => state.YJIsDetail,
        YJIsEdit: state => state.YJIsEdit,
        YJIsAdd: state => state.YJIsAdd,
        YJTableList: state => state.YJTableList,
        YJEditObj: state => state.YJEditObj,
        YJTaskTypeList: state => state.YJTaskTypeList,
        YJtotal: state => state.YJtotal
    }
};
