const REG = {
    phone: /^0?1[3|4|5|6|7|8|9]\d{9}$/,
    int: /^[0-9]*$/,
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    tel: /^0\d{2,3}-?\d{7,8}$/,
    mobile: /^1\d{10}$/,
    text: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
    textAlphaChinese: /^[a-zA-Z\u4e00-\u9fa5]+$/,
    textAlphaNumber: /^[a-zA-Z0-9]+$/,
    card: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    PositiveNum: /^[0-9]+\.{0,1}[0-9]{0,2}$/,
    filePostfix: /\.(bmp|jpg|png|docx|doc|xls|xlsx|csv|ppt|pdf|rar|zip)$/,
    // 数字  中文  符号
    numberChineseSymbol: /^[0-9\u4e00-\u9fa5，。、·\！@#￥%……&*（）——+=\-；‘’：“”\/\{\}【】\|？《》~`\!@#$%^&*\(\)_+,\.\/\?\>\<;’:”\[\]\{\}=\-~+\-.ωαβ]+$/,
    // 数字  字母  中文  符号
    numberAlphaChineseSymbol: /^[0-9a-zA-Z\u4e00-\u9fa5，。、·\！@#￥%……&*（）——+=\-；‘’：“”\/\{\}【】\|？《》~`\!@#$%^&*\(\)_+,\.\/\?\>\<;’:”\[\]\{\}=\-~+\-.ωαβ]+$/,
    // 数字  字母  符号
    numberAlphaSymbol: /^[0-9a-zA-Z，。、·\！@#￥%……&*（）——+=\-；‘’：“”\/\{\}【】\|？《》~`\!@#$%^&*\(\)_+,\.\/\?\>\<;’:”\[\]\{\}=\-~+\-.ωαβ]+$/,
    symbol: '，。、·！@#￥%……&*（）——+=-；‘’：“”/{}【】|？《》~`!@#$%^&*()_+,./?><;’:”[]{}=-~+-.ωαβ~'
};

/**
 * validator校验
 */
export function validateEmail (val) {
    let re = REG.email; // (字母、数字、下划线、-、. )@(字母、数字、-)
    return re.test(val);
}

export function validateChineseText (val) {
    let re = REG.textAlphaChinese; // (字母、数字、下划线、-、. )@(字母、数字、-)
    return re.test(val);
}

export function validateTel (val) {
    let re = REG.tel; // 0开头2~3位区号，可以加-（也可不加），加上7~8位数字
    return re.test(val);
}

export function validateMobile (val) {
    let re = REG.mobile; // 1开头的11位数字
    return re.test(val);
}

/**
 * 不允许输入特殊字符
 * */
export function validateText (val) {
    let re = REG.text;
    return re.test(val);
}

export function validateTextAlphaNumber (val) {
    let re = REG.textAlphaNumber;
    return re.test(val);
}

/**
 * 输入手机号的校验
 * */
export function validatePhone (val) {
    let re = REG.phone;
    return re.test(val);
}

/**
 * 输入身份证号的校验
 * */
export function validateCard (val) {
    let re = REG.card;
    return re.test(val);
}

/**
 * 输入整数的校验
 * */
export function validateInt (val) {
    let re = REG.int;
    return re.test(val);
}

/**
 * 输入正数（包括小数）的校验
 * */
export function validatePositiveNum (val) {
    let re = REG.PositiveNum;
    return re.test(val);
}

/**
 * 文件后缀名验证
 * */
export function validateFilePostfix (val) {
    let re = REG.filePostfix;
    return re.test(val);
}

// 验证长度
export function validateMaxLen (n, message) {
    return (rule, val, callback) => {
        let str = val + '';
        if (str.length > n) {
            callback(new Error(message));
            return false;
        }
        callback();
    };
};

export function addSymbolVarify (rule, key = '(place)') {
    console.log(rule.replace(key, REG.symbol));
    return rule.replace(key, REG.symbol);
}

export default {
    ...REG
};
