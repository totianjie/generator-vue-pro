/**
 * 以RM开头的命名空为：跑批任务
 * 没有命名空间的：批次划分任务
 */
const batchTasks = {
    state: {
        page: "home", // 列表：home  详情：detail  添加：add
        addStep: 1, // 添加到第几步  默认是 1
        taskCode: '', // 查看详情
        isEdit: false,
        preview: false, // 预览

        // 公共数据 start
        taskTypeDict: [], // 任务类型    1:任务类型下拉框
        taskImplDict: [], // 任务实体类 目前没有字典
        taskCycleTypeDict: [], // 任务周期类型   2:任务周期类型下拉框
        taskPriorityDict: [], // 任务优先级   3:任务优先级下拉框
        // 限制条件相关
        searchCodeDict: [], // 4:限制字段下拉框
        conditionTypeDict: [], // 限制条件   5:限制条件下拉框
        relationDict: [], // 逻辑关系  6:限制逻辑关系下拉框
        isInit: false, // 是否是第一次加载, 如是第一次则获取 字典
        // 公共数据 end
        RMpage: "home", // 列表：home  详情：detail  添加：add
        RMaddStep: 1, // 添加到第几步  默认是 1
        RMtaskCode: '', // 查看详情
        RMisEdit: false,
        RMpreview: false, // 预览
        RMpreview2: false, // 预览
        RMpreviewTaskCode: ''
    },
    mutations: {
        setPage (state, page = 'home') {
            state.page = page;
        },
        setAddStep (state, step = 1) {
            state.addStep = step;
        },
        setTaskCode (state, taskCode = "") {
            state.taskCode = taskCode;
        },
        setIsEdit (state, b) {
            state.isEdit = b;
        },
        setPreview (state, b) {
            state.preview = b;
        },

        // 公共数据 start
        setDicts (state, {key, dict}) {
            console.log("dicts: ", {key, dict});
            state[key] = Object.assign([], dict);
        },
        setIsInit (state, b) {
            state.isInit = b;
        },
        // 公共数据 end

        RMsetPage (state, page = 'home') {
            state.RMpage = page;
        },
        RMsetAddStep (state, step = 1) {
            state.RMaddStep = step;
        },
        RMsetTaskCode (state, taskCode = "") {
            state.RMtaskCode = taskCode;
        },
        RMsetIsEdit (state, b) {
            state.RMisEdit = b;
        },
        RMsetPreview (state, b) {
            state.RMpreview = b;
        },
        RMsetPreview2 (state, b) {
            state.RMpreview2 = b;
        },
        RMsetPreviewTaskCode (state, code = "") {
            state.RMpreviewTaskCode = code;
        }
    },
    actions: {
        test () {
            console.log(456);
        }
    },
    getters: {
        page: state => state.page,
        addStep: state => state.addStep,
        taskCode: state => state.taskCode,
        isEdit: state => state.isEdit,
        preview: state => state.preview,
        // 公共数据 start
        isInit: state => state.isInit,
        taskTypeDict: state => state.taskTypeDict,
        taskImplDict: state => state.taskImplDict,
        taskCycleTypeDict: state => state.taskCycleTypeDict,
        taskPriorityDict: state => state.taskPriorityDict,
        searchCodeDict: state => state.searchCodeDict,
        conditionTypeDict: state => state.conditionTypeDict,
        relationDict: state => state.relationDict,
        // 公共数据 end
        RMpage: state => state.RMpage,
        RMaddStep: state => state.RMaddStep,
        RMtaskCode: state => state.RMtaskCode,
        RMisEdit: state => state.RMisEdit,
        RMpreview: state => state.RMpreview,
        RMpreview2: state => state.RMpreview2,
        RMpreviewTaskCode: state => state.RMpreviewTaskCode
    }
};
export default batchTasks;
