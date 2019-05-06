/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-09-14
 * @remark: 任务管理
 * */
import {ajax} from './../ajax';

const URL = {
    add: '/data/task/add',
    execute: '/data/task/execute',
    list: '/data/task/list',
    plan: '/data/task/plan',
    result: '/data/task/result',
    template: '/data/task/templet',
    temdetail: '/data/task/temdetail',
    exelist: '/data/task/exelist'
};

export function addTask (data) { // 新增任务
    let url = URL.add;
    return ajax(url, {data, method: 'post'});
}

export function executeTask (data) { // 执行任务
    let url = URL.execute;
    return ajax(url, {data, method: 'post'});
}

export function getTaskList (data) { // 获取任务列表
    let url = URL.list;
    return ajax(url, {data, method: 'post'});
}

export function getTaskPlan (data) { // 查看执行过程
    let url = URL.plan;
    return ajax(url, {data, method: 'post'});
}

export function exelist (data) { // 查看执行列表
    let url = URL.exelist;
    return ajax(url, {data, method: 'post'});
}

export function getTaskResult (data) { // 查看执行结果
    let url = URL.result;
    return ajax(url, {data, method: 'post'}).then((result) => {
        // let {synList} = result.data;
        // let json = {
        //     index: '合计',
        //     targetTable: '/',
        //     sourceNum: 0,
        //     actualNum: 0
        // };
        // synList.forEach((item, index) => {
        //     item.index = index + 1;
        //     json.sourceNum = Number.isNaN(Number(item.sourceNum)) ? 0 : Number(item.sourceNum) + json.sourceNum;
        //     json.actualNum = Number.isNaN(Number(item.actualNum)) ? 0 : Number(item.actualNum) + json.actualNum;
        // });
        // synList.push(json);
        return Promise.resolve(result);
    });
}

export function getTaskTemplate (data) { // 获取模板
    let url = URL.template;
    return ajax(url, {data, method: 'post'});
}

export function getTemdetail (data) { // 获取模板详情
    let url = URL.temdetail;
    return ajax(url, {data, method: 'post', timeout: 1000 * 60}).then((result) => {
        // let {temList} = result.data;
        // let json = {
        //     index: '合计',
        //     sourceTable: '/',
        //     sourceNum: 0,
        //     targetTable: '/',
        //     targetNum: 0
        // };
        // temList.forEach((item, index) => {
        //     item.index = index + 1;
        //     json.sourceNum = Number.isNaN(Number(item.sourceNum)) ? 0 : Number(item.sourceNum) + json.sourceNum;
        //     json.targetNum = Number.isNaN(Number(item.targetNum)) ? 0 : Number(item.targetNum) + json.targetNum;
        // });
        // temList.push(json);
        return Promise.resolve(result);
    });
}

