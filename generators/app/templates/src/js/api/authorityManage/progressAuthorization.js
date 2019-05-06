/**
 *  Created by TIANJIE on 2018/6/19
 * */
import { ajax } from './../ajax';

const URL = {
    // 节点信息
    getProces: '/process/roles/getProces',
    // 修改
    proceSet: '/process/roles/insert'
};

export function getProces (params) {
    let url = URL.getProces;
    return ajax(url, { params, method: 'post' });
}

export function proceSet (data) {
    let url = URL.proceSet;
    console.log(data);
    return ajax(url, { data, method: 'post' });
}
