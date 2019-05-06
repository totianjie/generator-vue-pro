/**
 * @Author: mikey.TIANJIE
 * @Date: 2019-03-10
 * @remark: 场景列表
 * */
import {ajax} from './../ajax';
import {parentId2Children} from 'js/utils/utils';
export const URL = {
    queryLimintDataApp: '/platformConfig/queryLimintDataApp/', // 获取列表
    addDataAppCascade: '/platformConfig/addDataAppCascade', // 添加
    queryDataAppById: '/platformConfig/queryDataAppById', // 获取详情

    queryDataRuleList: '/platformConfig/queryDataRuleList', // 获取规则列表
    updateDataAppCascade: '/platformConfig/updateDataAppCascade', // 修改
    queryPreValueListBySrm: '/platformConfig/queryPreValueListByRuleNo'
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

export function getInfoByAppid (params) {
    console.log("编辑时获取数据的入参：", params);
    let url = URL.queryDataAppById;
    return ajax(url, {params});
}

export function getRuleParameterInfo (params) {
    /* let data = {
        "ruleName": "住院天数限制" + Math.random(),
        "id": Math.random(),
        "illegalLevel": 0,
        "returnTemplate": "返回模板" + Math.random(),
        "ruleDesc": "规则描述" + Math.random(),
        "preValue": [
            {
                "defaultValue": "10" + Math.random(),
                "id": "1",
                "key": "days",
                "keyDesc": "天数",
                "ruleNo": "ACP_10003"
            },
            {
                "defaultValue": "200" + Math.random(),
                "id": "1",
                "key": "num",
                "keyDesc": "次数",
                "ruleNo": "ACP_10003"
            }
        ],
        "ruleNo": "ACP_10003"
    };
    return Promise.resolve({data}); */
    let url = URL.queryPreValueListBySrm;
    return ajax(url, {params});
}

