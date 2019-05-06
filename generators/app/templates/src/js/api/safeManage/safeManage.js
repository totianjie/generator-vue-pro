/* jshint esversion: 6 */
/**
 * @Author: Nelson Hsiao
 * @Date: 2019-01-24
 * @remark: 许可证管理
 * */
import { ajax } from "../ajax";
/** 许可证管理 start */
export const URL = {
    // 许可证管理列表
    list: '/licenses/list',
    // 许可证管理删除
    delete: '/licenses/delete',
    // 许可证管理查看
    detail: '/licenses/get',
    // 许可证管理新增
    add: '/licenses/insert',
    // 许可证管理新增
    upload: '/licenses/upload',
    // 许可证管理新增
    download: '/licenses/download'
};
for (let key in URL) {
    URL[key] = `/safe${URL[key]}`;
}
// 许可证管理下载
export function outDownload (params) {
    let url = URL.download;
    return ajax(url, { params, method: 'get', responseType: 'blob', timeout: 1000 * 60 });
}

// 许可证管理新增
export function add (data) {
    let url = URL.add;
    console.info('add', data, url);
    // let res = {status: true, statusCode: "200", errorMsg: null, data: null};
    // return Promise.resolve(res);
    return ajax(url, {data, method: 'post', timeout: 120 });
}

// 许可证管理查看
export function getDetail (params) {
    let url = URL.detail;
    console.log(url);
    // let res = {status: true, statusCode: "200", errorMsg: null, data: {id: 1, name: "1name", deployAddr: "1deployAddr", validTime: 0, mac: "1;32;332", remark: "1", createTime: 1556100046000, craeteUser: "1craeteUser", zipList: [{id: 33, licenseId: 1, sourcePath: "cloud-eureka-server.error.log", fileName: "cloud-eureka-server.app.log", targetPath: "cloud-eureka-server.error.log", status: 1}, {id: 44, licenseId: 1, sourcePath: "iebm-cpd-server.zip", fileName: "iebm-cpd-server.zip", targetPath: "iebm-cpd-server.zip", status: 0}]}};
    // return Promise.resolve(res);
    return ajax(url, {params});
}

// 许可证管理列表
export function getList (params) {
    let url = URL.list;
    console.log(url);
    // let res = {status: true, statusCode: "200", errorMsg: null, data: {pageNum: 1, pageSize: 20, size: 4, startRow: 1, endRow: 4, total: 4, pages: 1, list: [{id: 1, name: "1", deployAddr: "1", validTime: 0, mac: "1", remark: "1", createTime: 1556100046000, craeteUser: "1"}, {id: 2, name: "string", deployAddr: "string", validTime: 0, mac: "string", remark: "string", createTime: 1556072474000, craeteUser: "string"}, {id: 6, name: "许可证one", deployAddr: "深圳", validTime: 0, mac: "ccc333", remark: null, createTime: 1556133563000, craeteUser: "创建者"}, {id: 7, name: "许可证one", deployAddr: "深圳", validTime: 360, mac: "ccc333", remark: null, createTime: 1556133598000, craeteUser: "创建者"}], prePage: 0, nextPage: 0, isFirstPage: true, isLastPage: true, hasPreviousPage: false, hasNextPage: false, navigatePages: 8, navigatepageNums: [1], navigateFirstPage: 1, navigateLastPage: 1, firstPage: 1, lastPage: 1}};
    // return Promise.resolve(res);
    return ajax(url, {params, timeout: 120 });
}

// 许可证管理删除
export function dataDelete (data) {
    let url = URL.delete;
    return ajax(url, {method: 'post', timeout: 120, params: data});
}
/** 许可证管理 end */
