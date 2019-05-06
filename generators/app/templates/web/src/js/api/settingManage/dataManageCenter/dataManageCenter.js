/* jshint esversion: 6 */
/**
 * @Author: Nelson
 * @Date: 2019-01-21
 * @remark: 业务数据配置中心列表
 * */
import { ajax } from './../../ajax';

/** 业务数据配置中心 start */
const URL = {
    // 业务数据配置中心业务编码列表
    codeList: '/business/code/list',
    // 业务数据配置中心枚举
    list: '/business/list',
    // 业务数据配置编辑
    update: '/business/update',
    // 业务数据配置删除
    delete: '/business/update',
    // 业务数据配置新增
    add: '/business/add',
    // 业务数据配置状态修改
    updateStatus: '/business/update',
    // 业务数据配置详情查看
    detail: '/business/get',
    // 获取数据配置
    getDataBaseList: '/business/db/list',
    // 业务数据配置城市选择
    getArea: '/configarea/selectList'
};

// 获取数据配置
export function getDataBaseList (data) {
    let url = URL.getDataBaseList;
    return ajax(url, { data, method: 'post' }).catch(error => {
        console.log(error);
    }).then((res) => {
        let obj = JSON.parse(JSON.stringify(formatArr(res.data)));
        delete res.data;
        res.data = obj;
        return Promise.resolve(res);
    });

    function formatArr (arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let arr4 = [];
            arr.forEach((temp) => {
                if (temp.enable === 1) {
                    if (temp.dbType === 1) {
                        arr1.push(temp);
                    } else if (temp.dbType === 2) {
                        arr2.push(temp);
                    } else if (temp.dbType === 3) {
                        arr3.push(temp);
                    } else if (temp.dbType === 5) {
                        arr4.push(temp);
                    }
                }
            });
            let obj = {};
            obj["ori"] = arr1;
            obj["mid"] = arr2;
            obj["plat"] = arr4;
            obj["work"] = arr3;
            return obj;
        } else {
            return { "ori": [], "mid": [], "plat": [], "work": [] };
        }
    }
}

// 业务数据配置中心列表
export function getListSettingDataCenterTable (data) {
    let url = URL.list;
    return ajax(url, { data, method: 'post' });
}

export function getArea (data) { // 区域
    let url = URL.getArea;
    return ajax(url, { data, method: 'post' }).then((result) => {
        let { data = [] } = result;
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

// 业务数据配置中心枚举
export function getBussnissCode (params) {
    let url = URL.codeList;
    console.log(params);
    return ajax(url, { params, method: 'post' }).then(res => {
        res.data = res.data.map((res2) => {
            console.log(typeof res2);
            if (typeof res2 === 'string') {
                res2 = {busiName: 'name' + res2, busiCode: res2};
            }
            return res2;
        });
        console.log("getBussnissCode*******->", res);
        return Promise.resolve(res);
    });
}

// 业务数据配置编辑
export function updateSetting (data) {
    let url = URL.update;
    return ajax(url, { data, method: 'post' });
}

// 业务数据配置新增
export function insertSetting (data) {
    let url = URL.add;
    return ajax(url, { data, method: 'post' });
}

// 业务数据配置查看
export function detail (params) {
    let url = URL.detail;
    return ajax(url, { params, method: 'post' });
}

// 业务数据配置删除
export function deteleSetting (data) {
    let url = URL.delete;
    return ajax(url, { data, method: 'post' });
}

// 业务数据配置状态修改
export function updateStatus (data) {
    let url = URL.updateStatus;
    return ajax(url, { data, method: 'post' });
}
/** 业务数据配置中心 end */
