/**
 *  Created by Nelson on 2019/02/22
 * */
import { ajax } from '../../ajax';

/** 预警信息 start */
const URL = {
    // 预警信息列表
    update: '/btnotice/edit',
    // 预警信息枚举
    insert: '/btnotice/add',
    getTaskTypeList: '/common/commonSelect',
    detail: '/btnotice/view',
    delete: '/btnotice/del',
    list: '/btnotice/list'
};

// 修改
export function deleteTaskInfo (data) {
    let url = URL.delete;
    return ajax(url, { data, method: 'post' });
}
// 修改
export function updateTaskInfo (data) {
    let url = URL.update;
    return ajax(url, { data, method: 'post' });
}

// 详情
export function detailInfo (data) {
    let url = URL.detail;
    return ajax(url, { data, method: 'post' });
}

// 新增
export function insertTaskInfo (data) {
    let url = URL.insert;
    return ajax(url, { data, method: 'post' });
}

// 获取列表
export function getWarningList (data) {
    let url = URL.list;
    return ajax(url, { data, method: 'post' });
}

// 获取任务类型
export function getTaskTypeList (params) {
    let url = URL.getTaskTypeList;
    return ajax(url, { params, method: 'post' });
}
