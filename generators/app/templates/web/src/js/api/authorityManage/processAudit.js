/**
 *  Created by TIANJIE on 2018/6/19
 * */
import { ajax } from './../ajax';

const URL = {
    // 节点信息
    stepsList: '/process/stepss',
    // 修改
    update: '/process/stepss/changeNode'
};

export function getStepsList () {
    let url = URL.stepsList;
    return ajax(url, {method: 'get' });
}

export function stepUpdate (data) {
    let url = URL.stepsList;
    return ajax(url, { data, method: 'put' });
}

export function stepNext (data) {
    let url = URL.update;
    console.log(data);
    return ajax(url, { data, method: 'post' });
}
