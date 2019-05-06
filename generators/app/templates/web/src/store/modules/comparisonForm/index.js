/**
 * 对照表格顺序切换
 */

export default {
    namespaced: true,
    state: {
        // 收费对照的数据（左侧）
        chargeComparisonLeft: [],
        // 收费对照的数据（右侧）
        chargeComparisonRight: [],
        // 疾病对照的数据（左侧）
        diseaseControlLeft: [],
        // 疾病对照的数据（右侧）
        diseaseControlRight: [],
        // 手术对照的数据（左侧）
        surgicalControlLeft: [],
        // 手术对照的数据（右侧）
        surgicalControlRight: []
    },
    getters: {
        chargeComparisonLeft: state => state.chargeComparisonLeft,
        chargeComparisonRight: state => state.chargeComparisonRight,
        diseaseControlLeft: state => state.diseaseControlLeft,
        diseaseControlRight: state => state.diseaseControlRight,
        surgicalControlLeft: state => state.surgicalControlLeft,
        surgicalControlRight: state => state.surgicalControlRight
    },
    mutations: {
        // 设置收费对照的表格顺序(左侧)
        setchargeComparisonLeft (state, data) {
            console.log(`设置收费对照左侧表格列顺序切换 >>>>>>>`, data);
            state.chargeComparisonLeft = [...data];
        },
        // 设置收费对照的表格顺序(右侧侧)
        setchargeComparisonRight (state, data) {
            console.log(`设置收费对照右侧表格列顺序切换 >>>>>>>`, data);
            state.chargeComparisonRight = [...data];
        },
        // 设置疾病对照的表格顺序(左侧)
        setdiseaseControlLeft (state, data) {
            console.log(`设置疾病对照左侧表格列顺序切换 >>>>>>>`, data);
            state.diseaseControlLeft = [...data];
        },
        // 设置疾病对照的表格顺序(右侧侧)
        setdiseaseControlRight (state, data) {
            console.log(`设置疾病对照右侧表格列顺序切换 >>>>>>>`, data);
            state.diseaseControlRight = [...data];
        },
        // 设置疾病对照的表格顺序(左侧)
        setsurgicalControlLeft (state, data) {
            console.log(`设置手术对照左侧表格列顺序切换 >>>>>>>`, data);
            state.surgicalControlLeft = [...data];
        },
        // 设置疾病对照的表格顺序(右侧侧)
        setsurgicalControlRight (state, data) {
            console.log(`设置手术对照右侧表格列顺序切换 >>>>>>>`, data);
            state.surgicalControlRight = [...data];
        }
    },
    actions: {
        addData ({ commit, state }, data) {
            console.log(`设置表格顺序切换 >>>>>>>`, data);
        }
    }
};
