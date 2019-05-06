import CONFIG from './../../config';

/**
 * 工具类
 *
 * 对象的方式:各方法作为对象属性，问题在打包（build）后，会把整个对象打进去。
 * 改用es6的模块方式，前端引用方法：
 *      import * as utils from '../utils.js';
 *      utils.formatTime();
 * 打包时webpack的tree-shaking会只处理被引用的方法；
 */

/** ==================== 浏览器相关 ==================== */
export function getQueryStringByName (name) {
    let mode = CONFIG.ROUTER_MODE === 'history' ? document.location.search : document.location.hash;
    let result = mode.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
    if (result === null || result.length < 1) {
        return '';
    }
    return result[1];
}

export function getCurrentPath (opts) {
    let rtn = document.location.hash;
    if (opts && opts.pathOnly) {
        rtn = rtn.split('?')[0].replace(/#!\//g, '');
    }
    return rtn;
    // return document.location.pathname;
}

// 是否是某一个东西
export function type (obj) {
    let toString = Object.prototype.toString;
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}

// 深度拷贝
export function deepCopy (data) {
    let t = type(data),
        o, i, ni;
    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }
    if (t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
            o.push(deepCopy(data[i]));
        }
        return o;
    } else if (t === 'object') {
        for (i in data) {
            o[i] = deepCopy(data[i]);
        }
        return o;
    }

}

// 判断浏览器
export function myBrowser () {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    let isIE = IETester(); // 不传参数返回当前IE版本，如果不是IE内核浏览器，返回false
    let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    let isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    let isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Chrome浏览器

    if (isIE) {
        return 'IE' + isIE;
    }
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isChrome) {
        return 'Chrome';
    }
    if (isSafari) {
        return 'Safari';
    }
    function IETester (userAgent) {
        let UA = userAgent || navigator.userAgent;
        if (/msie/i.test(UA)) {
            return UA.match(/msie (\d+\.\d+)/i)[1];
        } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
            return UA.match(/rv:(\d+\.\d+)/)[1];
        }
        return false;
    }

}

export function d2a (n) {
    return n * Math.PI / 180;
}

function rand (n, m) {
    return Math.round(Math.random() * (m - n) + n);
}

export function scaleFn (count, current) {
    return Math.round(current / count * 100);
}

// 添加id函数
export function addId (obj, num = new Date().getTime() + Math.random()) {
    let newObj = deepCopy(obj);
    let str = '_aa_da_arddas';
    if (type(newObj) === 'object') {
        _objectFn(newObj);
    } else if (type(newObj) === 'array') {
        if (!newObj || !(newObj instanceof Array) || newObj.length === 0) {
            return false;
        }
        _arrayfn(newObj);
    }
    return newObj;

    function _objectFn (_obj) {
        if (!_obj.hasOwnProperty('_id_') || _obj.id === null || _obj.id === undefined) {
            _obj.id = str + num;
            num++;
            if (_obj.hasOwnProperty('children') && _obj.children instanceof Array && _obj.children.length > 0) {
                _arrayfn(_obj.children, num);
            }
        }
    }

    function _arrayfn (_arr) {
        _arr.forEach((item, index) => {
            if (!item.hasOwnProperty('_id_') || item.id === null || item.id === undefined) {
                item.id = str + num;
                num++;
            }

            if (item.hasOwnProperty('children') && item.children instanceof Array && item.children.length > 0) {
                _arrayfn(item.children, num);
            }
        });
    }

}

// 查找某个东西 找到返回true, 和当前找到的对象
// changeKey  可选 ==> 如果传的话会把整条条上的这个key变为true
export function findInArr (arr, id, findKey, changeKey) {
    if (!Array.isArray(arr) || (Array.isArray(arr) && arr.length === 0)) {
        return false;
    }
    return _fn(arr);

    function _fn (a) {
        let len = a.length;
        for (let i = 0; i < len; i++) {
            if (a[i][findKey] === id) {
                if (changeKey !== undefined) {
                    a[i][changeKey] = true;
                }
                return {bOk: true, data: a[i]};
            } else {
                if (a[i].hasOwnProperty('children') && (a[i].children.length > 0)) {
                    let result = _fn(a[i].children);
                    if (result.bOk) {
                        if (changeKey !== undefined) {
                            a[i][changeKey] = true;
                        }
                        return result;
                    }
                }
            }
        }
        return {bOk: false, data: {}};
    }
}

export function parentId2Children (data, {id = 'id', pid = 'parentId', childrenName = 'children'} = {}) {
    if (data.length === 0) {
        return false;
    }
    let newData = deepCopy(data);
    let parents = newData.filter((parentItem) => !(newData.find((item) => parentItem[pid] === item[id])));
    return _fn(parents, newData);

    function _fn (parentArr, oldArr) {
        parentArr.forEach((item, index) => {
            let children = oldArr.filter((item2, i) => {
                return item[id] === item2[pid];
            });

            if (children.length > 0) {
                item[childrenName] = _fn(children, oldArr);
            } else {
                item[childrenName] = [];
            }
        });
        return parentArr;
    }
}
