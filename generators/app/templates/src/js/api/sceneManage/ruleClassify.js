/**
 * @Author: Nelson
 * @Date: 2019-04-10
 * @remark: 规则分类维护
 * */
import {ajax} from './../ajax';
import {parentId2Children} from 'js/utils/utils';
export const URL = {
    addDataAppCascade: '/platformConfig/addDataAppCascade', // 添加
    detail: '/platformConfig/queryDataAppById', // 获取详情
    queryDataRuleList: '/platformConfig/queryDataRuleList', // 获取规则列表
    updateDataAppCascade: '/platformConfig/updateDataAppCascade' // 修改
};
import {formatTime} from 'src/js/utils/dates';
export function getList (params) { // 获取表格数据  入参： {pageNum, pageSize}
    console.log("获取表格数据：入参：", params);
    let url = URL.queryLimintDataApp;
    return ajax(url, {params}).then(res => {
        console.log(res);
        let list = res.data.list;
        if (Array.isArray(list)) {
            list.forEach(item => {
                item.myCreateTime = formatTime(item.createTime, 'yyyy-MM-dd hh:mm:ss');
                item.myUpdateTime = formatTime(item.updateTime, 'yyyy-MM-dd hh:mm:ss');
            });
        }
        return Promise.resolve(res);
    });
}

export function add (data) { // 新增
    console.log("新增入参：", data);
    let url = URL.addDataAppCascade;
    return ajax(url, {method: 'post', data});
}

export function update (data) { // 编辑  入参数： {appId}
    console.log("编辑入参：", data);
    let url = URL.updateDataAppCascade;
    return ajax(url, {method: 'post', data});
}

export function getRuleTree () {
    let url = URL.queryDataRuleList;
    return ajax(url).then(res => {
        res.data = parentId2Children(res.data);
        return Promise.resolve(res);
    });
}

export function detail (params) {
    console.log("编辑时获取数据的入参：", params);
    let url = URL.detail;
    return ajax(url, {params});
}
