/* jshint esversion:  6 */
/**
 * @Author:  Nelson
 * @Date:  2019-01-21
 * @remark:  任务状态列表
 * */
import { ajax } from './../../ajax';

/** 任务状态 start */
const URL = {
    // 任务状态列表
    statusList: '/rbstasksharemonitorlog/list',
    // 任务状态枚举
    statusEnum: '/rbstasksharemonitorlog/listEnum'
};

// 任务状态列表
export function statusEnumShow (data) {
    let res = { "status": true, "statusCode": "200", "errorMsg": null, "data": [{ "name": '未执行', "excStatus": 1 }, { "name": '执行中', "excStatus": 2 }, { "name": '执行暂停', "excStatus": 3 }, { "name": '执行终止', "excStatus": 4 }, { "name": '执行完成', "excStatus": 5 }] };
    return Promise.resolve(res);
}

// 任务状态枚举
export function getListTaskTable (data) {
    let url = URL.statusList;
    return ajax(url, { data, method: 'post' });
}
/** 任务状态 end */
