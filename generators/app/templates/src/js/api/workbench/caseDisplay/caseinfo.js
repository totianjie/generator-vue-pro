/**
 * @Author: GOTINTIN
 * @Date: 2018-9-18
 * @remark: 病例展示相关请求
 * */
import {ajax} from './../../ajax';

/** 病例展示start */
const URL = {
    // 就诊信息
    getVisitInfo: '/biz/medicalInfo/detail',
    // 诊断信息归类
    getDiagnosisList: '/biz/diagnosisDetail/list',
    // 就诊诊断信息
    getVisitDiagnoseList: '/biz/diagnosisDetail/jzDiagList',
    // 病案首页信息
    getCaseInfoList: '/biz/medicalCase/detail',
    // 病案首页诊断信息
    getCaseDiagnose: '/biz/diagnosisDetail/mediaCaseDiagList',
    // 医嘱信息/收费明细（去重后项目）
    getMedicalChargeRemove: '/biz/feesDetail/listDistinct',
    // 费用明细/医嘱信息（详细明细）
    getMedicalChargeDetail: '/biz/feesDetail/list',
    // 出院小结
    getLeaveHos: '/biz/dischargeAbstract/list',
    // 病案首页手术信息
    getCaseOperation: '/biz/surgeryInfo/listCaseSurgery',
    // 手术记录信息
    getOperationRecord: '/biz/surgeryRecords/list',
    // 检验报告
    getCheckReport: '/biz/testReport/list',
    // 检验结果报告
    getCheckResults: '/biz/testInfo/list',
    // 病理报告
    getIllessReport: '/biz/pathologicalReports/list'
};

export function getVisitInfo (data) {
    let url = URL.getVisitInfo;
    return ajax(url, {data, method: 'post'});
}
export function getDiagnosisList (data) {
    let url = URL.getDiagnosisList;
    return ajax(url, {data, method: 'post'});
}
export function getVisitDiagnoseList (data) {
    let url = URL.getVisitDiagnoseList;
    return ajax(url, {data, method: 'post'});
}
export function getCaseInfoList (data) {
    let url = URL.getCaseInfoList;
    return ajax(url, {data, method: 'post'});
}
export function getCaseDiagnose (data) {
    let url = URL.getCaseDiagnose;
    return ajax(url, {data, method: 'post'});
}
export function getMedicalChargeRemove (data) {
    let url = URL.getMedicalChargeRemove;
    return ajax(url, {data, method: 'post'});
}
export function getMedicalChargeDetail (data) {
    let url = URL.getMedicalChargeDetail;
    return ajax(url, {data, method: 'post'});
}
export function getLeaveHos (data) {
    let url = URL.getLeaveHos;
    return ajax(url, {data, method: 'post'});
}
export function getCaseOperation (data) {
    let url = URL.getCaseOperation;
    return ajax(url, {data, method: 'post'});
}
export function getOperationRecord (data) {
    let url = URL.getOperationRecord;
    return ajax(url, {data, method: 'post'});
}
export function getCheckReport (data) {
    let url = URL.getCheckReport;
    return ajax(url, {data, method: 'post'});
}
export function getCheckResults (data) {
    let url = URL.getCheckResults;
    return ajax(url, {data, method: 'post'});
}
export function getIllessReport (data) {
    let url = URL.getIllessReport;
    return ajax(url, {data, method: 'post'});
}
/** 病例展示 end */

