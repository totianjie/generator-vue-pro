/**
    任务监控
 */
import {statusEnumShow, getListTaskTable} from 'js/api/watchManage/taskWatch/taskWatch.js';

export default {
    state: {
        parameters: {
            limit: 20,
            offset: 1
        },
        isShowAll: false,
        list: [],
        total: 0,
        taskName: '',
        taskType: '',
        taskCode: '',
        excStatus: '',
        selectMenu: '',
        statusEnum: []
    },
    mutations: {
        setTaskCode (state, taskCode = '') {
            state.taskCode = taskCode;
        },
        setTaskName (state, taskName = '') {
            state.taskName = taskName;
        },
        setTaskType (state, taskType = '') {
            state.taskType = taskType;
        },
        setExcStatus (state, excStatus = '') {
            state.excStatus = excStatus;
        },
        setList (state, list = []) {
            state.list = list;
        },
        setParameters (state, parameters = {limit: 20, offset: 1}) {
            state.parameters = parameters;
        },
        setIsShowAll (state, isShowAll = false) {
            state.isShowAll = isShowAll;
        },
        setStatusEnum (state, statusEnum = []) {
            state.statusEnum = statusEnum;
        },
        setTotal (state, total = 0) {
            state.total = total;
        },
        setSelectMenu (state, selectMenu = '') {
            state.selectMenu = selectMenu;
        }
    },
    actions: {
        async statusEnumShow ({commit, state}) {
            let res = await statusEnumShow();
            commit('setStatusEnum', res.data);
        },
        async requestData ({commit, state}) {
            let parameters = Object.assign({}, state.parameters, {excStatus: state.excStatus});
            if (!state.isShowAll) {
                parameters = Object.assign({}, parameters, {taskName: state.taskName, taskCode: state.taskCode});
            }
            console.log(parameters);
            let res = await getListTaskTable(parameters);
            console.log([res]);
            commit('setTotal', res.data.total);
            commit('setList', res.data.list);
        },
        reset ({commit, state}) {
            commit("setTaskType");
            commit("setExcStatus");
            commit("setList");
            commit("setStatusEnum", [{ "name": '未执行', "excStatus": 1 }, { "name": '执行中', "excStatus": 2 }, { "name": '执行暂停', "excStatus": 3 }, { "name": '执行终止', "excStatus": 4 }, { "name": '执行完成', "excStatus": 5 }]);
            commit("setParameters");
            commit("setTaskCode");
            commit("setTaskName");
            commit("setIsShowAll");
            commit("setTotal");
            commit("setSelectMenu");
        },
        resetOffset ({commit, state}) {
            let limit = state.parameters.limit;
            commit("setParameters", {offset: 1, limit});
        }
    },
    getters: {
        taskName: state => state.taskName,
        taskCode: state => state.taskCode,
        taskType: state => state.taskType,
        excStatus: state => state.excStatus,
        parameters: state => state.parameters,
        list: state => state.list,
        isShowAll: state => state.isShowAll,
        total: state => state.total,
        selectMenu: state => state.selectMenu,
        statusEnum: state => state.statusEnum
    }
};
