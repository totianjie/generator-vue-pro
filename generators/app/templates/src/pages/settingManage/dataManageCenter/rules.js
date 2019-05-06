/**
 *  Created by Nelson on 2018/7/11
 * */
import REG from 'js/utils/regex';
export default {
    cityNames: [
        { required: true, trigger: 'change', message: '请选择城市' }
    ],
    busiCode: [
        { required: true, message: '请输入业务编码', trigger: 'blur' },
        { max: 20, message: '最大长度为20', trigger: 'blur' },
        { pattern: REG.textAlphaNumber, message: '请输入业务编码(字母、 数字)', trigger: 'blur' }
    ],
    busiName: [
        { required: true, message: '请输入业务名称', trigger: 'blur' },
        { max: 20, message: '最大长度为20', trigger: 'blur' },
        { pattern: REG.text, message: '请输入业务名称(数字 、字母 、汉字)', trigger: 'blur' }
    ],
    remark: [
        { max: 50, message: '最大长度为50', trigger: 'blur' }
    ],
    sourceDbName: [
        { required: true, trigger: 'change', message: '请选择源库数据库地址' }
    ],
    middleDbName: [
        { required: true, trigger: 'change', message: '请选择中间库地址' }
    ],
    platDbName: [
        { required: true, trigger: 'change', message: '请选择平台数据库地址' }
    ],
    serviceDbName: [
        { required: true, trigger: 'change', message: '请选择业务库地址' }
    ]
};
