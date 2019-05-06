//设置  cookie
export function setCookie (name, value, iDay) {
    if (iDay) {
        let oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);

        document.cookie = name + '=' + value + ';path=/;expires=' + oDate.toUTCString();
    } else {
        document.cookie = name + '=' + value + ';path=/';
    }
}

// alert(document.cookie);
// name=strive; age=18; b=123; a=123
// 获取cookie
export function getCookie (name) {
    let arr = document.cookie.split('; ');

    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=');
        //arr2[0] -> name   age
        //arr2[1] -> strive  18
        if (arr2[0] === name) {
            return arr2[1];
        }
    }
    return false;
}

// 删除cookie
export function removeCookie (name) {
    setCookie(name, 'asdffdsa', -100);
}

export function fnTest () {
    window.onunload = function () {
        alert(1);
    };
    window.onbeforeunload = function () {
        alert(2);

    };
}
