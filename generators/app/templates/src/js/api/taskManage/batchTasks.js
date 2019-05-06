/**
 * @Author: tianjie
 * @Date: 2019-02-27
 * @remark: 任务管理/批次划分任务
 * */
import {ajax} from './../ajax';

const URL = {
    add: "/task/split/add", // 新增
    execute: "/task/split/execute", // 执行
    get: "/task/split/get", // 根据taskCode查询分批次任务
    getShow: "/task/split/get/show", // 根据taskCode查询分批次任务
    list: "/task/split/list", // 分页查询分批次任务
    taskAll: "/task/split/task/all", // 查询分批次任务
    update: "/task/split/update", // 分批次任务编辑
    getInfoByBusiCode: "/business/get" // 跟据业务编码 查看看数据库信息

};

export function add (data) {
    let url = URL.add;
    return ajax(url, {data, method: 'post'});
}

export function execute (params) { // taskCode
    let url = URL.execute;
    return ajax(url, {params, method: 'post'});
}

export function get (params) { // taskCode
    let url = URL.get;
    return ajax(url, {params, method: 'post'});
}

export function getShow (params) { // taskCode
    let url = URL.getShow;
    return ajax(url, {params, method: 'post'});
}

export function list (data) { // {limit: 0, offset: 0}
    let url = URL.list;
    return ajax(url, {data, method: 'post'});
}

export function taskAll (params) { // enable  查询数据类型 1 启用 0 所有
    let url = URL.taskAll;
    return ajax(url, {params, method: 'post'});
}

export function update (data) {
    let url = URL.update;
    return ajax(url, {data, method: 'post'});
}

export function getDict (params) {
    let url = URL.getDict;
    return ajax(url, {params, method: 'post'});
}

export function getInfoByBusiCode (params) {
    let url = URL.getInfoByBusiCode;
    return ajax(url, {params, method: 'post'});
}

