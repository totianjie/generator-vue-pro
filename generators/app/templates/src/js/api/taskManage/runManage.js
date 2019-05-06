/**
 * @Author: tianjie
 * @Date: 2019-02-27
 * @remark: 任务管理/跑批任务
 * */
import {ajax} from './../ajax';

const URL = {
    add: "/task/schedule/add", // 新增跑批任务
    appids: "/task/schedule/appids", // 获取appid
    execute: "/task/schedule/execute", // 执行跑批任务

    get: "/task/schedule/get", // 根据taskCode查询跑批任务   taskCode(任务编码)
    getShow: "/task/schedule/get/show", // 查看跑批任务   taskCode(任务编码)
    list: "/task/schedule/list", // 查看跑批任务 {"busiCode": "业务编码","limit": 0,"offset": 0}

    taskAll: "/task/schedule/task/all", // 查看跑批任务   enable(查询数据类型 1 启用 0 所有)
    update: "/task/schedule/update" // 修改跑批任务
};

export function add (data) {
    let url = URL.add;
    return ajax(url, {data, method: 'post'});
};

export function appids (data) {
    let url = URL.appids;
    return ajax(url, { data, method: 'post' }).then(res => {
        res.data.forEach((res2) => {
            if (!res2.appName) {
                res2.appName = 'name' + res2.appId;
            }
        });
        return Promise.resolve(res);
    });
};

export function execute (params) { // taskCode(任务编码) operType(执行（1 执行 2 停止 3 终止 4 继续 5 再次重跑）)
    let url = URL.execute;
    return ajax(url, {params, method: 'post'});
};

export function get (params) { // taskCode(任务编码)
    let url = URL.get;
    return ajax(url, {params, method: 'post'});
};

export function getShow (params) { // taskCode(任务编码)
    let url = URL.getShow;
    return ajax(url, {params, method: 'post'});
};

export function list (data) { // {"busiCode": "业务编码","limit": 0,"offset": 0}
    let url = URL.list;
    return ajax(url, {data, method: 'post'});
};

export function taskAll (params) { // enable(查询数据类型 1 启用 0 所有)
    let url = URL.taskAll;
    return ajax(url, {params, method: 'post'});
};

export function update (data) {
    let url = URL.update;
    return ajax(url, {data, method: 'post'});
};
