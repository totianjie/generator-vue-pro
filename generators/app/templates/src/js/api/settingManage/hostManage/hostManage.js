/**
 * @Author: GOTINTIN
 * @Date: 2019-2-27
 * @remark: 跑批主机管理相关请求
 * */
import {ajax} from './../../ajax';

/** 跑批主机管理 start */
const URL = {
    // 主机列表
    hostList: '/rbsclient/list',
    // 新增
    hostAdd: '/rbsclient/add',
    // 编辑
    hostEdit: '/rbsclient/edit',
    // 编辑查看(显示)
    hostEditView: '/rbsclient/view'
};

export function hostList (data) {
    let url = URL.hostList;
    return ajax(url, {data, method: 'post'});
}
export function hostAdd (data) {
    let url = URL.hostAdd;
    return ajax(url, {data, method: 'post'});
}
export function hostEdit (data) {
    let url = URL.hostEdit;
    return ajax(url, {data, method: 'post'});
}
export function hostEditView (data) {
    let url = URL.hostEditView;
    return ajax(url, {data, method: 'post'});
}
/** 跑批主机管理 end */

