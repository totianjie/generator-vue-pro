import REG, {validateMaxLen} from 'js/utils/regex';

export default {
    // 任务类型
    taskTypeCode: [
        {required: true, message: '请选择任务类型'}
    ],
    // 任务名称
    taskName: [
        {required: true, message: '请输入任务名称'},
        {pattern: REG.text, message: '只可输入数字 、字母 、汉字'},
        {validator: validateMaxLen(20, '限制20字')}
    ],
    // 任务备注
    remark: [{validator: validateMaxLen(50, '限制50字')}],
    // 任务参数设定
    taskParam: [
        {pattern: /^[a-zA-Z0-9\u4e00-\u9fa5？&=]+$/, message: '只可输入数字 、字母 、汉字？&='},
        {validator: validateMaxLen(50, '限制50字')}
    ],
    // 处理任务超时时间
    taskTimeout: [
        {pattern: /^\d+$/, message: '只可输入数字'}
    ],
    // 任务启动日期
    taskBeginTime: [{required: true, message: '请选择'}],
    // 任务周期类型
    taskCycleType: [{required: true, message: '请选择'}],
    // 单次定时任务  时间选择
    triggerDate: [{required: true, message: '请选择'}],
    // 任务时间设定
    taskTriggerType: [{required: true, message: '请选择'}],
    // 任务时间设定  每月
    triggerDay: [{required: true, message: '请选择'}],
    // 任务时间设定  每天 和 (每月,每2星期,每星期)中的时间
    triggerTime: [{required: true, message: '请选择'}],
    // 任务时间设定  每2星期  每星期
    triggerWeek: [{required: true, message: '请选择'}],
    // 任务时间设定  每隔小时
    triggerHour: [
        {required: true, message: '请输入'},
        {pattern: /^([1-9]||1[0-9]||2[0-4])$/, message: '可输入1的整数倍  最大 24'}
    ],
    // 任务时间设定  每隔分
    triggerMinute: [
        {required: true, message: '请输入'},
        {pattern: /^([1-9]||[1-9][0-9]||1[0-1][0-9]||120)$/, message: '每分 为整数 最大  120'}
    ],
    // 任务异常邮件提醒
    code22: [
        {validator: validateMaxLen(100, '限制100字')},
        {
            validator: (rule, val, callback) => {
                let str = (val + '').replace(/(^\s*)|(\s*$)/g, "");
                if (str.length === 0) {
                    callback();
                    return false;
                }
                let arr = str.split(";");
                for (let i = 0; i < arr.length; i++) {
                    if (!REG.email.test(arr[i])) {
                        callback(new Error("格式不正确"));
                        return false;
                    }
                }
                callback();
            }, trigger: 'blur'
        }
    ],
    // 任务异常短信提醒
    code23: [
        {validator: validateMaxLen(100, '限制100字')},
        {
            validator: (rule, val, callback) => {
                let str = (val + '').replace(/(^\s*)|(\s*$)/g, "");
                if (str.length === 0) {
                    callback();
                    return false;
                }
                let arr = str.split(";");
                for (let i = 0; i < arr.length; i++) {
                    if (!REG.phone.test(arr[i])) {
                        callback(new Error("格式不正确"));
                        return false;
                    }
                }
                callback();
            }, trigger: 'blur'
        }
    ],
    // 任务异常钉钉提醒
    code24: [
        {validator: validateMaxLen(100, '限制100字')},
        {
            validator: (rule, val, callback) => {
                let str = (val + '').replace(/(^\s*)|(\s*$)/g, "");
                if (str.length === 0) {
                    callback();
                    return false;
                }
                let arr = str.split(";");
                for (let i = 0; i < arr.length; i++) {
                    if (!arr[i].startsWith('http://')) {
                        callback(new Error("格式不正确"));
                        return false;
                    }
                }
                callback();
            }, trigger: 'blur'
        }
    ],
    // 任务优先级
    taskPriority: [{required: true, message: '请选择'}],
    // 任务状态
    enable: [{required: true, message: '请选择'}]
};
