/**
 *  Created by TIANJIE on 2018/6/5
 * */

import CONFIG from 'src/config';
import axios from 'axios';
import store from 'store';
import busEvent from 'src/busEvent';
import { getCookie } from "../utils/cookies";
import { type } from "../utils/utils";

export const ajax = function (url, options = {}) {
    if (!url) {
        busEvent.$emit('alertMassage', '没有传入url。。。');
        return false;
    }

    // TODO 登录及权限验证
    let userInfo = JSON.parse(getCookie('user_info'));
    if (store.state.route.path !== '/login' && type(userInfo) !== 'object') {
        busEvent.$emit('goLogin');
        return false;
    }
    url = CONFIG.URL + url;
    let obj = {
        url: url,
        method: 'get', // 请求方式
        data: {}, // post数据
        params: {}, // get数据
        transformRequest: [], // 请求前对参数可做一些改动
        headers: {
        }, // 设置请求头
        withCredentials: true,
        timeout: 1000 * 8, // 超时时间
        loading: true
    };
    let json = Object.assign({}, obj, options);
    let isAddLoading = json.loading;
    delete json.loading;
    if (isAddLoading) {
        store.commit('SET_LOADING_SHOW', true); // 显示 loading ...
    }
    return axios(json).then(res => {
        if (isAddLoading) {
            store.commit('SET_LOADING_SHOW', false); // 隐藏 loading ...
        }
        let result = res.data;
        
        let code = typeof result.statusCode === 'string' ? Number(result.statusCode) : result.statusCode;
        if (code === 200) {
            return Promise.resolve(result);
        } else if (code === 403) { // 未登录  登录过期
            busEvent.$emit('goLogin');
        } else {
            if (res.status === 200 && res.request.responseType === 'blob') { // file download
                return Promise.resolve(res);
            }
            busEvent.$emit('alertMassage', result.errorMsg);
            return Promise.reject(res);
        }
    }, error => {
        console.log(error);
        if (isAddLoading) {
            store.commit('SET_LOADING_SHOW', false); // 隐藏 loading ...
        }
        busEvent.$emit('alertMassage', '网络开小差了。。。');
        return Promise.reject(error);
    }).catch(error => {
        console.log(error);
        if (error.status === 500) {
            busEvent.$emit('goPage', {path: '/error500'});
        }
        if (isAddLoading) {
            store.commit('SET_LOADING_SHOW', false); // 隐藏 loading ...
        }
        return Promise.reject(error);
    });
};
