/**
    标准数据库管理
 */

import {getListConsumablesProp, getListDiseaseProp, getListOperationProp, getListDrugsProp, getListDiagnosisTreatmentProp} from "js/api/standardLibrary/standardLibrary";
const BaseEnumInfo = {
    disease: 'STANDARD_DISEASE',
    operation: 'STANDARD_OPERATION',
    drug: 'STANDARD_DRUG',
    diagnosisTreatment: 'STANDARD_TREATMENT',
    consumables: 'STANDARD_CONSUMABLES'
};
export default {
    state: {
        diseaseList: [],
        diseaseParameters: {
            limit: 20,
            offset: 1
        },
        operationList: [],
        operationParameters: {
            limit: 20,
            offset: 1
        },
        drugsList: [],
        drugsParameters: {
            limit: 20,
            offset: 1
        },
        diagnosisTreatmentList: [],
        diagnosisTreatmentParameters: {
            limit: 20,
            offset: 1
        },
        consumablesList: [],
        consumablesParameters: {
            limit: 20,
            offset: 1
        },
        diseaseObj: {

        },
        operationObj: {

        },
        drugsObj: {

        },
        diagnosisTreatmentObj: {

        },
        consumablesObj: {

        },
        consumablesTableObj: {

        },
        diseaseTableObj: {

        },
        operationTableObj: {

        },
        drugsTableObj: {

        },
        diagnosisTreatmentTableObj: {

        },
        consumablesSortObj: {

        },
        diseaseSortObj: {

        },
        operationSortObj: {

        },
        drugsSortObj: {

        },
        diagnosisTreatmentSortObj: {

        }
    },
    mutations: {
        setDiseaseList (state, diseaseList = []) {
            state.diseaseList = diseaseList;
        },
        setOperationList (state, operationList = []) {
            state.operationList = operationList;
        },
        setDrugsList (state, drugsList = []) {
            state.drugsList = drugsList;
        },
        setDiagnosisTreatmentList (state, diagnosisTreatmentList = []) {
            state.diagnosisTreatmentList = diagnosisTreatmentList;
        },
        setConsumablesList (state, consumablesList = []) {
            state.consumablesList = consumablesList;
        },
        setDiseaseParameters (state, diseaseParameters = {limit: 20, offset: 1}) {
            state.diseaseParameters = diseaseParameters;
        },
        setOperationParameters (state, operationParameters = {limit: 20, offset: 1}) {
            state.operationParameters = operationParameters;
        },
        setDrugsParameters (state, drugsParameters = {limit: 20, offset: 1}) {
            state.drugsParameters = drugsParameters;
        },
        setDiagnosisTreatmentParameters (state, diagnosisTreatmentParameters = {limit: 20, offset: 1}) {
            state.diagnosisTreatmentParameters = diagnosisTreatmentParameters;
        },
        setConsumablesParameters (state, consumablesParameters = {limit: 20, offset: 1}) {
            state.consumablesParameters = consumablesParameters;
        },
        setDiseaseObj (state, diseaseObj = {}) {
            state.diseaseObj = diseaseObj;
        },
        setOperationObj (state, operationObj = {}) {
            state.operationObj = operationObj;
        },
        setDrugsObj (state, drugsObj = {}) {
            state.drugsObj = drugsObj;
        },
        setDiagnosisTreatmentObj (state, diagnosisTreatmentObj = {}) {
            state.diagnosisTreatmentObj = diagnosisTreatmentObj;
        },
        setConsumablesObj (state, consumablesObj = {}) {
            state.consumablesObj = consumablesObj;
        },
        setConsumablesTableObj (state, consumablesTableObj = {}) {
            state.consumablesTableObj = consumablesTableObj;
        },
        setDiseaseTableObj (state, diseaseTableObj = {}) {
            state.diseaseTableObj = diseaseTableObj;
        },
        setOperationTableObj (state, operationTableObj = {}) {
            state.operationTableObj = operationTableObj;
        },
        setDrugsTableObj (state, drugsTableObj = {}) {
            state.drugsTableObj = drugsTableObj;
        },
        setDiagnosisTreatmentTableObj (state, diagnosisTreatmentTableObj = {}) {
            state.diagnosisTreatmentTableObj = diagnosisTreatmentTableObj;
        },
        setConsumablesSortObj (state, consumablesSortObj = {}) {
            state.consumablesSortObj = consumablesSortObj;
        },
        setDiseaseSortObj (state, diseaseSortObj = {}) {
            state.diseaseSortObj = diseaseSortObj;
        },
        setOperationSortObj (state, operationSortObj = {}) {
            state.operationSortObj = operationSortObj;
        },
        setDrugsSortObj (state, drugsSortObj = {}) {
            state.drugsSortObj = drugsSortObj;
        },
        setDiagnosisTreatmentSortObj (state, diagnosisTreatmentSortObj = {}) {
            state.diagnosisTreatmentSortObj = diagnosisTreatmentSortObj;
        }
    },
    actions: {
        reset ({commit, state}, {type}) {
            console.log("type", type);
            if (type === 'disease') {
                commit("setDiseaseList");
                commit("setDiseaseParameters", {limit: 20, offset: 1});
                commit("setDiseaseObj");
                commit("setDiseaseTableObj");
            }
            if (type === 'operation') {
                commit("setOperationList");
                commit("setOperationParameters", {limit: 20, offset: 1});
                commit("setOperationObj");
                commit("setOperationTableObj");
            }
            if (type === 'drugs') {
                commit("setDrugsList");
                commit("setDrugsParameters", {limit: 20, offset: 1});
                commit("setDrugsObj");
                commit("setDrugsTableObj");
            }
            if (type === 'diagnosisTreatment') {
                commit("setDiagnosisTreatmentList");
                commit("setDiagnosisTreatmentParameters", {limit: 20, offset: 1});
                commit("setDiagnosisTreatmentObj");
                commit("setDiagnosisTreatmentTableObj");
            }
            if (type === 'consumables') {
                commit("setConsumablesList");
                commit("setConsumablesParameters", {limit: 20, offset: 1});
                commit("setConsumablesObj");
                commit("setConsumablesTableObj");
            }
        },
        async getListConsumablesProp ({commit, state}) {
            let parameters_ = Object.assign({}, {type: BaseEnumInfo.consumables});
            let res = await getListConsumablesProp(parameters_);
            console.log(res.data);
            commit('setConsumablesList', res.data);
        },
        async getListDiseaseProp ({commit, state}) {
            let parameters_ = Object.assign({}, {type: BaseEnumInfo.disease});
            let res = await getListDiseaseProp(parameters_);
            console.log(res.data);
            commit('setDiseaseList', res.data);
        },
        async getListOperationProp ({commit, state}) {
            let parameters_ = Object.assign({}, {type: BaseEnumInfo.operation});
            let res = await getListOperationProp(parameters_);
            console.log(res.data);
            commit('setOperationList', res.data);
        },
        async getListDrugsProp ({commit, state}) {
            let parameters_ = Object.assign({}, {type: BaseEnumInfo.drug});
            let res = await getListDrugsProp(parameters_);
            console.log(res.data);
            commit('setDrugsList', res.data);
        },
        async getListDiagnosisTreatmentProp ({commit, state}) {
            let parameters_ = Object.assign({}, {type: BaseEnumInfo.diagnosisTreatment});
            let res = await getListDiagnosisTreatmentProp(parameters_);
            console.log(res.data);
            commit('setDiagnosisTreatmentList', res.data);
        }
    },
    getters: {
        diseaseList: state => state.diseaseList,
        diseaseParameters: state => state.diseaseParameters,
        operationList: state => state.operationList,
        operationParameters: state => state.operationParameters,
        drugsList: state => state.drugsList,
        drugsParameters: state => state.drugsParameters,
        diagnosisTreatmentList: state => state.diagnosisTreatmentList,
        diagnosisTreatmentParameters: state => state.diagnosisTreatmentParameters,
        consumablesList: state => state.consumablesList,
        consumablesParameters: state => state.consumablesParameters,
        diseaseObj: state => state.diseaseObj,
        operationObj: state => state.operationObj,
        drugsObj: state => state.drugsObj,
        diagnosisTreatmentObj: state => state.diagnosisTreatmentObj,
        consumablesTableObj: state => state.consumablesTableObj,
        consumablesObj: state => state.consumablesObj,
        diseaseTableObj: state => state.diseaseTableObj,
        operationTableObj: state => state.operationTableObj,
        diagnosisTreatmentTableObj: state => state.diagnosisTreatmentTableObj,
        drugsTableObj: state => state.drugsTableObj,
        consumablesSortObj: state => state.consumablesSortObj,
        diseaseSortObj: state => state.diseaseSortObj,
        operationSortObj: state => state.operationSortObj,
        drugsSortObj: state => state.drugsSortObj,
        diagnosisTreatmentSortObj: state => state.diagnosisTreatmentSortObj
    }
};

