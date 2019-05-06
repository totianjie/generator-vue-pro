/**
 *  Created by TIANJIE on 2018/6/6
 * */
import { ajax } from './ajax';
// import {parentId2Children} from 'js/utils/utils';

// 用户登录
export function login (data) {
    let url = '/login';
    return ajax(url, {
        data,
        method: 'post',
        transformRequest: [function (data) {
            let ret = '';
            for (let name in data) {
                ret += `${encodeURIComponent(name)}=${encodeURIComponent(data[name])}&`;
                // encodeURIComponent(name) + '=' + encodeURIComponent(data[name]) + '&';
            }
            return ret;
        }]
    });
}

export function logOut() {
    let url = '/logOut';
    return ajax(url).then(res => {
        return Promise.resolve(res);
    });
}

// 获取 菜单
export function getUserMenus () {
    let url = '/menu/userMenus';
    return ajax(url).then(res => {
        let temp = Array.isArray(res.data) ? (res.data[0] || []) : {};
        res.data = temp.children || [];
        // res.data.forEach((item) => {
        //     item.open = false;
        //     item.path = item.url;
        //     item.title = item.name;
        //     item.parentId = !item.parentId ? '-1' : item.parentId;
        // });
        fn(res.data);
        function fn (arr) {
            if (arr.length === 0) {
                return false;
            }
            arr.forEach((item) => {
                item.open = false;
                item.path = item.url;
                item.title = item.name;
                item.parentId = !item.parentId ? '-1' : item.parentId;

                if ('children' in item && Array.isArray(item.children)) {
                    fn(item.children);
                }
            });
        }
        // res.data = parentId2Children(res.data);
        return Promise.resolve(res);
    });
}
