import Vue from 'vue';
import {myBrowser} from "./utils";

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

// // 添加 style
// export function setStyle (element, styleName, value) {
//     if (!element || !styleName) return;
//
//     if (typeof styleName === 'object') {
//         for (let prop in styleName) {
//             if (styleName.hasOwnProperty(prop)) {
//                 setStyle(element, prop, styleName[prop]);
//             }
//         }
//     } else {
//         if (styleName === 'opacity' && (myBrowser() === 'IE8.0')) {
//             element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
//         } else {
//             element.style[styleName] = value;
//         }
//     }
// };

export const trim = function (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
const camelCase = function (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
export const on = (function () {
    if (!isServer && document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const off = (function () {
    if (!isServer && document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const once = function (el, event, fn) {
    let listener = function () {
        if (fn) {
            fn.apply(this, arguments);
        }
        off(el, event, listener);
    };
    on(el, event, listener);
};

/* istanbul ignore next */
export function hasClass (el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

/* istanbul ignore next */
export function addClass (el, cls) {
    if (!el) return;
    let curClass = el.className;
    let classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
};

/* istanbul ignore next */
export function removeClass (el, cls) {
    if (!el || !cls) return;
    let classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
};

/* istanbul ignore next */
export const _getStyle = ieVersion < 9 ? function (element, styleName) {
    if (isServer) return;
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'styleFloat';
    }
    try {
        switch (styleName) {
            case 'opacity':
                try {
                    return element.filters.item('alpha').opacity / 100;
                } catch (e) {
                    return 1.0;
                }
            default:
                return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
        }
    } catch (e) {
        return element.style[styleName];
    }
} : function (element, styleName) {
    if (isServer) return;
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        let computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
};

/* istanbul ignore next */
export function _setStyle (element, styleName, value) {
    if (!element || !styleName) return;

    if (typeof styleName === 'object') {
        for (let prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                _setStyle(element, prop, styleName[prop]);
            }
        }
    } else {
        styleName = camelCase(styleName);
        if (styleName === 'opacity' && ieVersion < 9) {
            element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
        } else {
            element.style[styleName] = value;
        }
    }
};

//获取非行问样式
export function getStyle (obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}

// 获取绝对距离
export function getPos (obj) {
    let l = 0;
    let t = 0;
    while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {left: l, top: t};
}

// 事件绑定
export function addEvent (obj, sEv, fn) {
    if (obj.addEventListener) {
        //IE9+ chrome  FF
        obj.addEventListener(sEv, fn, false);
    } else {
        //IE10 9 8 7..
        obj.attachEvent('on' + sEv, fn);
    }
}

// 解绑定
export function removeEvent (obj, sEv, fn) {
    if (obj.removeEventListener) {
        //IE9+ chrome FF
        obj.removeEventListener(sEv, fn, false);
    } else {
        obj.detachEvent('on' + sEv, fn);
    }
}

let vendor = (function () {
    let elementStyle = document.createElement('div').style;
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})();

export function _getComputedStyle (el) {
    // return Vue.prototype.$isServer ? {} : document.defaultView.getComputedStyle(el);
    return document.defaultView.getComputedStyle(el);
}

/**
 * eg:
 *      const transform = prefixStyle('transform');
 *      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
 * */
// 根据浏览器自动添加浏览器前缀
export function prefixStyle (style) {
    if (vendor === false) {
        return false;
    }

    if (vendor === 'standard') {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export function fnInput (obj, fn) {
    console.log(obj);
    if (window.navigator.userAgent.indexOf('MSIE 9.0') > 0) {
        var timer = null;
        //IE9中删除有问题的  解决方案
        obj.onfocus = function () {
            timer = setInterval(function () {
                fn && fn();
            }, 30);
        };
        obj.onblur = function () {
            clearInterval(timer);
        };
    } else {
        //oninput IE9+ chrome FF        onpropertychange IE10 9 8 7
        obj.oninput = obj.onpropertychange = function () {
            fn && fn();
        };
    }
}

