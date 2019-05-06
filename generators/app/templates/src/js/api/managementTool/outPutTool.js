/**
 * @Author: Nelson
 * @Date: 2019-03-20
 * @remark: 数据导出
 * */
import { ajax } from "../ajax";

/** 模板管理 start */
const URL = {
    // 数据库表列表
    dbTableList: '/data/templet/tables',
    // 数据库列表
    dataBaseList: '/data/templet/querydb',
    // 数据库列表
    dbTableColumnList: '/data/templet/db/column',
    
    dbOutPut: '/data/templet/excel'
};
// 数据库列表
export function outPutExcel (data) {
    let url = URL.dbOutPut;
    return ajax(url, { data, method: 'post', responseType: 'blob', timeout: 1000 * 60 });
}
// 数据库列表
export function dataBaseList (data) {
    let url = URL.dataBaseList;
    return ajax(url, { data, method: 'post' });
}
// 数据库表列表
export function dbTableList (data) {
    let url = URL.dbTableList;
    return ajax(url, { data, method: 'post' });
}
// 数据库表字段列表
export function dbColumnList (data) {
    let url = URL.dbTableColumnList;
    return ajax(url, { data, method: 'post' });
}
/** 模板管理 end */
