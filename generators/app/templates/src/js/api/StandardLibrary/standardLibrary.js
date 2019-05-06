/* jshint esversion: 6 */
/**
 * @Author: Nelson Hsiao
 * @Date: 2019-01-04
 * @remark: 标准库模块
 * */
import { ajax } from "../ajax";

/** 标准库 start */
const URL = {
    // 标准耗材目录
    listConsumables: '/basic/catalogue/consumables',
    // 标准诊疗目录
    listDiagnosisTreatment: '/basic/catalogue/treatment',
    // 标准药品目录
    listDrugs: '/basic/catalogue/drug',
    // 标准手术目录
    listOperation: '/basic/catalogue/operation',
    // 标准疾病目录
    listDisease: '/basic/catalogue/disease',
    // 标准耗材目录
    listConsumablesOpation: '/basic/catalogue/dict',
    // 标准诊疗目录
    listDiagnosisTreatmentOpation: '/basic/catalogue/dict',
    // 标准药品目录
    listDrugsOpation: '/basic/catalogue/dict',
    // 标准手术目录
    listOperationOpation: '/basic/catalogue/dict',
    // 标准疾病目录
    listDiseaseOpation: '/basic/catalogue/dict'
};

// 标准耗材目录
export function getListDisease (data) {
    let url = URL.listDisease;
    return ajax(url, { data, method: 'post' });
}

// 标准耗材目录选择
export function getListDiseaseProp (data) {
    let url = URL.listDiseaseOpation;
    return ajax(url, { data, method: 'post' });
}

// 标准耗材目录
export function getListConsumables (data) {
    let url = URL.listConsumables;
    return ajax(url, { data, method: 'post'});
}

// 标准耗材目录选择
export function getListConsumablesProp (data) {
    let url = URL.listConsumablesOpation;
    return ajax(url, { data, method: 'post'});
}

// 标准耗材目录
export function getListDiagnosisTreatment (data) {
    let url = URL.listDiagnosisTreatment;
    return ajax(url, { data, method: 'post'});
}

// 标准耗材目录选择
export function getListDiagnosisTreatmentProp (data) {
    let url = URL.listDiagnosisTreatmentOpation;
    return ajax(url, { data, method: 'post'});
}

// 标准耗材目录
export function getListDrugs (data) {
    let url = URL.listDrugs;
    return ajax(url, { data, method: 'post'});
}

// 标准耗材目录选择
export function getListDrugsProp (data) {
    let url = URL.listDrugsOpation;
    return ajax(url, { data, method: 'post'});
}

// 标准耗材目录
export function getListOperation (data) {
    let url = URL.listOperation;
    return ajax(url, { data, method: 'post' });
}

// 标准耗材目录选择
export function getListOperationProp (data) {
    let url = URL.listOperationOpation;
    return ajax(url, { data, method: 'post' });
}
/** 标准库 end */
