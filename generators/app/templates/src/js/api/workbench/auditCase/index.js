/**
 * @Author:Nelsonx
 * @Date: 2018-09-18
 * @remark: 病例展示
 * */
import { ajax } from './../../ajax';
export const URL = {
    'listAuth': '/process/roles/getRoleNodes',
    'listDisease': '/biz/treeData/listDisease',
    'listRule': '/biz/treeData/listRule',
    'listOrg': '/biz/treeData/listOrganization',
    'list': '/biz/medicalInfo/list',
    'illegalInformation': '/biz/auditResultDetail/getRule',
    'records': '/process/records',
    'look': '/process/filess/previewWrod',
    'submit': '/biz/medicalInfo/submit',
    'exportURL': '/biz/export/resultExportExcelHead'

};

export function outPutExcel (params) {
    let url = URL.exportURL;
    return ajax(url, { params, responseType: 'blob', timeout: 1000 * 60 });
}

export function getListAuth (params) { // 获取当前用户的权限
    console.log(params);
    console.log('获取当前用户的权限');
    let url = URL.listAuth;
    return ajax(url, { params });
}
/*
 * {
 *     "status" : true,
 *     "data" : [
 *         {
 *             "jzcode" : "string",
 *             "result" : "string",
 *            "nodeName" : "string",
 *            "id" : 0,
 *            "createby" : "string",
 *            "mark" : "string",
 *           "filesVos" : [
 *                {
 *                    "fileType" : "string",
 *                   "alias" : "string",
 *                    "filename" : "string",
 *                   "id" : 0,
 *                    "filePath" : "string"
 *               }
 *            ],
 *            "createTime" : "2018-11-01T06:39:51.789Z"
 *       }
 *    ],
 *    "errorMsg" : "string",
 *   "statusCode" : "string"
 * }
 *  createTime (string, optional): 操作时间 ,
 *  createby (string, optional): 操作人 ,
 *  filesVos (Array[ProcessExtreFilesVo], optional): 上传文件 ,
 *  id (integer, optional): 审核主键 ,
 *  jzcode (string, optional): 就诊号 ,
 *  mark (string, optional): 审核意见 ,
 *  nodeName (string, optional): 节点名称 ,
 *  result (string, optional): 审核判断（正常 Y，违规 N，申述 A）
 *  }ProcessExtreFilesVo {
 *  alias (string, optional): 显示名称 ,
 *  filePath (string, optional): 路径 ,
 *  fileType (string, optional): 文件类型 ,
 *  filename (string, optional): 生成名称 ,
 *  id (integer, optional): 唯一标识
 */
export function getListRecords (params) { // 获取各审核结果
    console.log(params);
    console.log('获取各审核结果');
    let url = URL.records;
    return ajax(url, { params, timeout: 1000 * 60 });
}

function formatData (arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    arr.forEach((item) => {
        item.title = `${item.name}：${item.allCount}`;
        item.disabled = false; // 是否不可被点击
        item.display = false; // 用于查询
        if (item.allCount === 0) {
            item.disabled = false;
        }
        if (item.hasOwnProperty('childRuleList') && Array.isArray(item.childRuleList) && item.childRuleList.length > 0) {
            formatData(item.childRuleList);
        }
    });
}

export function getListDisease (data) { // 疾病
    let url = URL.listDisease;
    console.log('疾病');
    return ajax(url, { data, method: 'post', timeout: 1000 * 60 }).then((result) => {
        let { data = [] } = result;
        formatData(data);
        return Promise.resolve(result);
    });
}

export function getLook (text) { // 规则
    let url = URL.look + '/' + text;
    console.log('查看文档', url);
    return ajax(url, {timeout: 1000 * 60}).then((result) => {
        if (result.data) {
            let urlString = result.data.substr(result.data.indexOf('file'), 200);
            return Promise.resolve(urlString);
        }
    });
}

export function getListRule (data) { // 规则
    let url = URL.listRule;
    console.log('规则');
    return ajax(url, { data, method: 'post', timeout: 1000 * 60 }).then((result) => {
        let { data = [] } = result;
        formatData(data);
        return Promise.resolve(result);
    });
}

export function getListOrg (data) { // 医院
    let url = URL.listOrg;
    console.log('医院');
    return ajax(url, { data, method: 'post', timeout: 1000 * 60 }).then((result) => {
        let { data = [] } = result;
        formatData(data);
        //        data = data.map(res => {
        //            let dic = res;
        //            dic.childRuleList = [];
        //            return dic;
        //        });
        return Promise.resolve(result);
    });
}


export function getList (data) { // 就诊信息
    let url = URL.list;
    console.log(data);
    return ajax(url, { data, method: 'post' });
}

/*
* detailVoList (Array[IllegalVo], optional): 违规明细 ,
* jzcode (string, optional): 就诊号 ,
* ruleName (string, optional): 规则名称 ,
* ruleNo (string, optional): 违规规则编号 ,
* updateFlag (boolean, optional): 修改标识/是否已修改
* }IllegalVo {
* illegalDesc (string, optional): 违规规则描述 ,
* projectName (string, optional): 违规项目名称（标准名称）
* {
*   "detailVoList": [
*       {
*            "illegalDesc": "string",
*           "projectName": "string"
*        }
*    ],
*    "jzcode": "string",
*    "ruleName": "string",
*    "ruleNo": "string",
*   "updateFlag": false
}
*/
export function getIllegalInformation (data) { // 获取违规信息
    let url = URL.illegalInformation + '/' + data.jzcode;
    return ajax(url, {method: 'post' });
}

export function submit (data) { // 提交
    let url = URL.submit;
    return ajax(url, { data, method: 'post' });
}
