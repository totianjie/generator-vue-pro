/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-11-20
 * @remark: 双控首页 数据监控
 * */
import {ajax} from './../ajax';

const URL = {
    costMonthTop: '/monitoring/CostMonthTop', // 当月医院费用
    costCasesMonthTop: '/monitoring/costCasesMonthTop', // 当月违规病例数
    costDiseaseMonthTop: '/monitoring/costDiseaseMonthTop', // 当月违规病例数
    costViolationsMonthTop: '/monitoring/costViolationsMonthTop', // 当月违规项目费用

    increasedCosts: '/monitoring/IncreasedCosts', // 费用增长
    agePiecewise: '/monitoring/agePiecewise', // 年龄分段

    casesDataStatistics: '/monitoring/casesDataStatistics', // 病例分类统计

    newdate: '/monitoring/newdate', // 监管时间
    totalCases: '/monitoring/totalCases' // 总病例
};

export function getCostMonthTop (data) {
    let url = URL.costMonthTop;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getCostCasesMonthTop (data) {
    let url = URL.costCasesMonthTop;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getCostDiseaseMonthTop (data) {
    let url = URL.costDiseaseMonthTop;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getCostViolationsMonthTop (data) {
    let url = URL.costViolationsMonthTop;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getIncreasedCosts (data) {
    let url = URL.increasedCosts;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getAgePiecewise (data) {
    let url = URL.agePiecewise;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getCasesDataStatistics (data) {
    let url = URL.casesDataStatistics;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getNewdate (data) {
    let url = URL.newdate;
    return ajax(url, {data, method: 'post', loading: false});
}

export function getTotalCases (data) {
    let url = URL.totalCases;
    return ajax(url, {data, method: 'post', loading: false});
}
