/**
 *  Created by TIANJIE on 2018/6/6
 * */
import { ajax } from '../ajax';
// import {parentId2Children} from 'js/utils/utils';

// 修改密码
export function changPassword (params) {
    let url = '/user/updatePassWord';
    return ajax(url, { params });
}

// 获取 个人信息
export function getUserInfo () {
    let url = '/user/info';
    return ajax(url, {});
}

// 获取 个人信息
export function checkPassword (params) {
    let url = '/user/checkPassword';
    return ajax(url, { params, method: 'post' });
}
