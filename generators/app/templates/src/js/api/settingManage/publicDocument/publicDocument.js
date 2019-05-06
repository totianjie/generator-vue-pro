/**
 * @Author: GOTINTIN
 * @Date: 2019-2-27
 * @remark: 跑批公共模块相关请求
 * */
import { ajax } from './../../ajax';

/** 跑批公共模块 start */
const URL = {
    // 执行记录查看列表
    publicRecordList: '/bttasklog/execute/list',
    // 日志查看列表
    publicDailyList: '/bttasklog/list'
};

export function publicRecordList (data) {
    let url = URL.publicRecordList;
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
export function publicDailyList (data) {
    let url = URL.publicDailyList;
    return ajax(url, { data, method: 'post' });
}
/** 跑批公共模块 end */
