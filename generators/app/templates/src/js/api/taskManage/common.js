/**
 * @Author: tianjie
 * @Date: 2019-02-28
 * @remark: 任务管理 公共接口
 * */
import {ajax} from './../ajax';

const URL = {
    /**
     * 获取公共下拉框选项(type为类型字段，包括
     *      1:任务类型下拉框 2:任务周期类型下拉框 3:任务优先级下拉框 4:限制字段下拉框
     *      5:限制条件下拉框 6:限制逻辑关系下拉框 7:原始数据库地址 8:中间库地址
     *      9:平台数据库地址 10:业务库地址)
     * */
    getCommonDict: '/common/commonSelect',
    getBusiCode: "/business/code/list", // 获取业务编码  enable(启用状态(1:启用 0 所有))
    getNumByBusiCode: "/business/detail/num", // 根据业务编码 获取数据总数  busiCode

    getMoreRecordList: '/bttasklog/execute/list', // 执行记录查看列表
    getDailyList: '/bttasklog/list'// 日志查看列表

};

export function test () {
    let url = URL;
    return ajax(url);
}

export function getCommonDict (params) {
    let url = URL.getCommonDict;
    return ajax(url, {params, method: 'post'});
}

export function getBusiCode (params) {
    let url = URL.getBusiCode;
    return ajax(url, { params, method: 'post' }).then(res => {
        res.data = res.data.map((res2) => {
            if (typeof res2 === 'string') {
                res2 = {busiName: 'name' + res2, busiCode: res2};
            }
            return res2;
        });
        return Promise.resolve(res);
    });
}

export function getNumByBusiCode (params) {
    let url = URL.getNumByBusiCode;
    return ajax(url, {params, method: 'post', timeout: 1000 * 200, loading: false});
}

export function getMoreRecordList (data) {
    let url = URL.getMoreRecordList;
    return ajax(url, {
        data,
        method: 'post',
        transformRequest: [function (data) {
            let ret = '';
            for (let name in data) {
                ret += `${encodeURIComponent(name)}=${encodeURIComponent(data[name])}&`;
            }
            return ret;
        }]
    });
}
export function getDailyList (data) {
    let url = URL.getDailyList;
    return ajax(url, { data, method: 'post'});
}

