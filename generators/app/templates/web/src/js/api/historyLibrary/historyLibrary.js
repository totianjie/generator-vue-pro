/**
 * @Author: GOTINTIN
 * @Date: 2019-1-7
 * @remark: 历史数据库相关请求
 * */
import {ajax} from './../ajax';

/** 历史数据库 start */
const URL = {
    // 诊断(疾病)
    getHistoryDisease: '/plat/history/disease',
    // 收费
    getHistoryCharge: '/plat/history/charge',
    // 手术
    getHistoryOperation: '/plat/history/operation',
    // 查询城市（区域）
    getHistoryArea: '/plat/history/area'
};

export function getHistoryDisease (data) {
    let url = URL.getHistoryDisease;
    return ajax(url, {data, method: 'post'});
}
export function getHistoryCharge (data) {
    let url = URL.getHistoryCharge;
    return ajax(url, {data, method: 'post'});
}
export function getHistoryOperation (data) {
    let url = URL.getHistoryOperation;
    return ajax(url, {data, method: 'post'});
}
export function getHistoryArea (data) { // 区域
    let url = URL.getHistoryArea;
    console.log('data:', data);
    return ajax(url, {data, method: 'post'}).then((result) => {
        let {data = []} = result;
        formatArr(data);
        return result;
    });

    function formatArr (arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            arr.forEach((item) => {
                item.value = item.areaCode;
                item.label = item.areaName;
                item.children = item.children;
                formatArr(item.children);
            });
        } else {
            return arr;
        }
    }
}
/** 历史数据库 end */

