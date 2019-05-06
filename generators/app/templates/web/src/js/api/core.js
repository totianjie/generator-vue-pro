/**
 * @原生ajax请求
 MAjax({
    url: "./TestXHR.php",              //请求地址
    type: "POST",                       //请求方式
    data: { name: "super", age: 20 },        //请求参数
    dataType: "json",
    success: function (response, xml) {
        // 此处放成功后执行的代码
    },
    fail: function (status) {
        // 此处放失败后执行的代码
    }
});
 */
export const MAjax = (options) => {
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = (options.dataType || 'text').toUpperCase();
    options.cache = options.cache || 'true ';
    options.timeout = parseInt(options.timeout) || 10000;

    // //添加ajax请求框
    // var _dom = document.getElementById('majax-loading');
    // if (!_dom) {
    //     this.creatAjaxLoading();
    // }

    // var params = formatParamsA(options.data);
    var params = options.data; // 需求问题对于参数暂不做处理
    var protocol = /^([\w-]+:)\/\//.test(options.url) ? RegExp.$1 : window.location.protocol;
    // var responseFields = {
    //     'XML': 'responseXML',
    //     'TEXT': 'responseText',
    //     'JSON': 'responseJSON'
    // };

    var headers = {};
    var setHeader = function (name, value) {
        headers[name.toLowerCase()] = [name, value];
    };

    var getHeader = function () {
        xhr.setRequestHeader = setHeader;
        for (let name in headers) {
            nativeSetHeader.apply(xhr, headers[name]);
        }
    };

    // 创建 - 非IE6 - 第一步
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else { // IE6及其以下版本浏览器
        xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    if (options.dataType !== 'TEXT') {
        try {
            xhr.responseType = options.dataType; // 'text'：返回类型为字符串，这是默认值。'arraybuffer'：返回类型为ArrayBuffer。'blob'：返回类型为Blob。'document'：返回类型为Document。'json'：返回类型为JSON object。
        } catch (e) {
            console.log('ajax不支持responseType');
        }
    }
    if (!options.cache) { // 禁用缓存
        xhr.setRequestHeader('If-Modified-Since', '0');
    }
    // 接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 请求完成，响应就绪
            options.complete && options.complete.call(this, xhr); // 响应就发送
            // var result = xhr.responseType == "text" ? xhr.responseText : xhr.responseXML; //返回值类型
            // var result = xhr[responseFields[options.dataType]]; // 返回值类型
            var result = xhr.responseText;
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && protocol === 'file:') && typeof options.success === 'function') { // 成功
                var dataType = options.dataType || xhr.getResponseHeader('content-type');
                try {
                    if (dataType === 'SCRIPT') {
                        // (1, eval)(result);
                        // window.eval(result);
                        console.error('eval can be harmful! ', result);
                    } else if (dataType === 'XML') {
                        result = xhr.responseXML;
                    } else if (dataType === 'JSON') {
                        result = JSON.parse(result);
                    }
                } catch (e) {
                    console.log('error');
                }
                options.success && options.success(result, xhr.status);
            } else if (xhr.status >= 400 && xhr.status < 500) { // 客户端出错，404啊神马的
                options.error && options.error(xhr, xhr.status);
            } else if (xhr.status >= 500) { // 服务器端出错
                options.error && options.error(xhr, xhr.status);
            } else {
                options.error && options.error(xhr, xhr.status);
            }
        }
    };
    var nativeSetHeader = xhr.setRequestHeader;

    setHeader('Accept', '*/*');
    // 连接 和 发送 - 第二步
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + formatParamsA(params), true);
        options.beforeSend && options.beforeSend.call(this, options, setHeader);
        getHeader();
        xhr.send(null);
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true);
        // 设置表单提交时的内容类型
        setHeader('Content-Type', 'application/x-www-element-urlencoded;charset=utf-8');
        options.beforeSend && options.beforeSend.call(this, options, setHeader);
        getHeader();
        xhr.send(formatParamsA(params));
    }

    // 格式化参数
    function formatParamsA (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        arr.push(('v=' + Math.random()).replace('.'));
        return arr.join('&');
    }

    // function formatParamsB(obj) {
    //     var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    //     for (name in obj) {
    //         value = obj[name];
    //         if (value instanceof Array) {
    //             for (i = 0; i < value.length; ++i) {
    //                 subValue = value[i];
    //                 fullSubName = name + '[' + i + ']';
    //                 innerObj = {};
    //                 innerObj[fullSubName] = subValue;
    //                 query += param(innerObj) + '&';
    //             }
    //         }
    //         else if (value instanceof Object) {
    //             for (subName in value) {
    //                 subValue = value[subName];
    //                 fullSubName = name + '[' + subName + ']';
    //                 innerObj = {};
    //                 innerObj[fullSubName] = subValue;
    //                 query += param(innerObj) + '&';
    //             }
    //         }
    //         else if (value !== undefined && value !== null) {
    //             query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    //         }
    //
    //     }
    //     return query.length ? query.substr(0, query.length - 1) : query;
    // }
};


