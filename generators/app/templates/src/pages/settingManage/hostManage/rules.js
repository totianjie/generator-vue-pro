/**
 * @Author: GOTINTIN
 * @Date: 2019-1-23
 * @remark: 跑批主机新增选填验证
 */
import REG, {validateMaxLen} from 'js/utils/regex';
export default {
    clientName: [ // 任务名称
        {required: true, message: '请输入主机名称', trigger: 'blur' },
        {pattern: REG.text, message: '请输入主机名称(只可输入数字 、字母 、汉字)', trigger: 'blur' },
        {validator: validateMaxLen(20, '限制20字'), trigger: 'blur' }
    ],
    clientHost: [ // 主机服务地址 ^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$     192.168.29.27:8080?name=lli&age=18
        { required: true, message: '请输入主机服务地址', trigger: 'blur' },
        { max: 50, message: '最大长度为50', trigger: 'blur' },
        {
            pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
            message: '请输入主机名称(主机地址 + 端口,只可输入数字 、符号)',
            trigger: 'blur'
        } // 必填项时的提示语
    ],
    threadNum: [ // 最大线程数
        { required: true, message: '请输入最大线程数', trigger: 'blur' },
        { max: 99, message: '最大长度为99', trigger: 'blur' },
        { pattern: /^[1-9][0-9]{0,1}$/, message: '请输入最大线程数(数字1-99范围)', trigger: 'blur'} // 必填项时的提示语
    ]
};

