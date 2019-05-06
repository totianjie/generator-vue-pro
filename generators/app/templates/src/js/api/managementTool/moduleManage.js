/* jshint esversion: 6 */
/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-09-14
 * @remark: 模块管理
 * */
import { ajax } from "../ajax";

/** 模板管理 start */
const URL = {
    // 模板列表
    listData: '/data/templet/querytemplet',
    //  模板详情
    detail: '/data/templet/detail',
    //  模板修改
    update: '/data/templet/update',
    //  模板新增
    add: '/data/templet/addtemplet',
    // 数据库表列表
    dbTableList: '/data/templet/tables',
    // 数据库列表
    dataBaseList: '/data/templet/querydb',
    //  对比数据表 和获取相关字段
    dbTableColumnList: '/data/templet/columns',
    // 删除模板
    deteleData: '/data/templet/delete',
    // 获取临床路径列表
    getMedRouter: '/data/templet/querypathway',
    // 根据sql获取数据库表字段列表
    getColumnsBySql: '/data/templet/sql/columns',
    
    getData: '/data/templet/preview'
};


// 模板临床路径下载
export function getDataFromTable (data) {
    let url = URL.getData;
    return ajax(url, { data, method: 'post' });
}

// 模板临床路径下载
export function medRouter (data) {
    let url = URL.getMedRouter;
    return ajax(url, { data, method: 'post' });
}

// 根据sql获取数据库表字段列表
export function getColumnsBySql (data) {
    let url = URL.getColumnsBySql;
    return ajax(url, { data, method: 'post' });
}

// 模板修改
export function templeUpdate (data) {
    let url = URL.update;
    return ajax(url, { data, method: 'post' });
}

// 模板新增
export function templeAdd (data) {
    let url = URL.add;
    return ajax(url, { data, method: 'post' });
}

// 模板列表
export function templetList (data) {
    let url = URL.listData;
    return ajax(url, { data, method: 'post' });
}

//  模板详情
export function templetDetail (data) {
    let url = URL.detail;
    return ajax(url, { data, method: 'post' });
}

// 删除模板
export function deleteTemplte (params) {
    let url = URL.deteleData;
    return ajax(url, { params });
}
// 数据库列表
export function dataBaseList (data) {
    let url = URL.dataBaseList;
    return ajax(url, {data, method: 'post'});
}
// 数据库表列表
export function dbTableList (data) {
    let url = URL.dbTableList;
    return ajax(url, {data, method: 'post'});
}
// 数据库表字段列表
export function dbColumnList (data) {
    let url = URL.dbTableColumnList;
    return ajax(url, {data, method: 'post'});
}
// export function insertData (data) {
//     let url = URL.insertData;
//     return ajax(url, { data, method: 'post' });
// }
/** 模板管理 end */

