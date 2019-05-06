/**
 * @Author: mikey.TIANJIE
 * @Date: 2018/9/28 11:29:37
 * @remark: 管理工具/任务管理/新增第一步输入框验证
 * */
import REG, {validateMaxLen} from 'js/utils/regex';

export default {
    taskName: [
        {required: true, message: '请输入任务名称', trigger: 'blur'}, // 输入框只能填写符号（- ）+字母+数字
        {pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_\-—]+$/, message: '允许输入的符号有-，——，_,-。', trigger: 'blur'},
        {validator: validateMaxLen(30, '限制输入30个字符'), trigger: 'blur'}
    ],
    templetId: [
        {required: true, message: '请选择模板', trigger: 'change'}
    ],
    interval: [
        {required: true, message: '请输入间隔时间', trigger: 'blur'},
        {pattern: /^[1-9][0-9]{0,100}$/, message: '只可输入整数', trigger: 'blur'}
    ],
    beginTime: [
        {required: true, message: '请选择开始时间', trigger: 'blur'},
        {validator: validateBeginTime, trigger: 'blur'}
    ],
    noticeName: [
        {validator: validateMaxLen(30, '限制输入30个字符'), trigger: 'blur'},
        {pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_\-——\-]+$/, message: '允许输入中文汉字，英文字母（区分大小写）数字、中/英文符号包含（-，——，_,-）', trigger: 'blur'}
    ],
    email: [
        {pattern: REG.email, message: '英文字母（区分大小写）数字、中/英文符号（@，-，.）', trigger: 'blur'},
        {validator: validateMaxLen(100, '可输入100个字符'), trigger: 'blur'}
    ],
    webhook: [
        {validator: validateMaxLen(300, '限制输入300个字符'), trigger: 'blur'},
        {pattern: /^[a-z0-9:/\.\?_=]+$/, message: '允许输入英文字母（小写） 数字、英文符号（:/.?_=）', trigger: 'blur'}

    ]


};

function validateBeginTime (rule, value, callback) {
    let oDate = new Date();
    if (value < oDate.getTime()) {
        callback(new Error('开始时间必需大于当前时间'));
    } else {
        callback();
    }
}
