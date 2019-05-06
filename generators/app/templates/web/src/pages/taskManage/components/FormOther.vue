<!-- 添加第二步 -->
<template>
    <section>
        <el-form ref="form2" :model="addParams" :rules="rules" label-width="200px" :size="formSize">
            <el-form-item prop="busiCode" label="业务名称：">
                <v-select
                    :props="listProps"
                    v-model="addParams.busiCode"
                    :list="selectList"
                    placeholder="请选择业务名称"
                    :filterable="true"
                />
                <span class="look-over-btn" @click="handleLookOver">查看</span>
            </el-form-item>
            <el-form-item>
                <el-button :size="btnSize" @click="handleGetDataAll">获取数据总数</el-button>
                <span class="disab" v-text="num"></span>条
            </el-form-item>
            <el-form-item required>
                <el-form-item prop="spiltType">
                    <el-radio-group v-model="addParams.spiltType" @change="handleRadioChange">
                        <el-radio :label="1" class="block">
                            批次拆分
                            <div style="display: inline-block; width: 106px; height: 32px;"></div>
                            个批次均分
                        </el-radio>
                        <el-radio :label="2" class="block" style="margin-top: 20px;">
                            批次拆分
                            <div style="display: inline-block; width: 106px; height: 32px;"></div>
                            条病例/批次
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item ref="spiltNum" prop="spiltNum" style="position: absolute; left: 89px; top: 10px;">
                    <el-input v-model.trim="addParams.spiltNum" style="width: 106px;"></el-input>
                </el-form-item>
                <el-form-item ref="spiltStrip" prop="spiltStrip" style="position: absolute; left: 89px; top: 66px;">
                    <el-input v-model.trim="addParams.spiltStrip" style="width: 106px;"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item label="数据限制条件：" class="add-condition-btn">
                <span @click="handleAddCondition">新增限制条件</span>
            </el-form-item>
        </el-form>
        <el-dialog title="查看" :visible.sync="lookOverDialog" width="404px">
            <ul class="look-over-wrap">
                <li v-for="(item, index) in lookOverData" :key="index">
                    <span class="title text-ellipsis" v-text="item.label"></span>
                    <span class="text text-ellipsis" v-text="item.value" :title="item.value"></span>
                </li>
            </ul>
        </el-dialog>
        <!-- 数据任务批次限制条件 start -->
        <el-form
            :ref="`form_list${index}`"
            v-for="(item, index) in addParams.conditionList"
            :key="index"
            :model="item"
            :rules="listRules"
            label-width="200px"
            :size="formSize"
            style="position: relative; margin-bottom: 20px;"
        >
            <el-form-item style="margin: 0;">
                <el-col :span="8" style="padding-right: 10px;">
                    <el-form-item prop="searchCode">
                        <v-select
                            :props="listProps"
                            v-model="item.searchCode"
                            :list="searchCodeDict"
                            placeholder="请选择限制字段"
                            :filterable="true"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8" style="padding: 0 5px;">
                    <el-form-item prop="conditionType">
                        <v-select
                            :props="listProps"
                            v-model="item.conditionType"
                            :list="conditionTypeDict"
                            placeholder="请选择条件"
                            :filterable="true"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8" style="padding-left: 10px;">
                    <el-form-item prop="relation">
                        <v-select
                            :props="listProps"
                            v-model="item.relation"
                            :list="relationDict"
                            placeholder="请选择逻辑关系"
                            :filterable="true"
                        />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item style="margin: 0;">
                <el-form-item 
                    prop="searchVal1" 
                    style="margin: 0;"
                    :rules="[{validator: searchVal1Validator(item), trigger: 'blur'}]"
                >
                    <el-input v-if="item.conditionType !== '8'" :placeholder="searchValPlaceholder(item)" v-model.trim="item.searchVal1"></el-input>
                </el-form-item>
                <el-row v-if="item.conditionType === '8'">
                    <el-col :span="11">
                        <el-form-item 
                            prop="searchVal1" 
                            style="margin: 0;"
                            :rules="[{validator: searchVal1Validator(item), trigger: 'blur'}]"
                        >
                            <el-input :placeholder="searchValPlaceholder(item)" v-model="item.searchVal1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" class="text-center">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item 
                            prop="searchVal1" 
                            style="margin: 0;"
                            :rules="[{validator: searchVal1Validator(item), trigger: 'blur'}]"
                        >
                            <el-input :placeholder="searchValPlaceholder(item)" v-model="item.searchVal2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            <span class="delete-btn" @click="handleDelete(index)">删除</span>
        </el-form>
        <!-- 数据任务批次限制条件 end -->
    </section>
</template>
<script>
    import CONFIG from 'src/config';
    import FormCom from './FormCom';

    import {getInfoByBusiCode} from 'js/api/taskManage/batchTasks.js';
    import {getNumByBusiCode} from 'js/api/taskManage/common.js';

    import {createNamespacedHelpers} from 'vuex';

    const {mapState} = createNamespacedHelpers('taskManage');
    import {getBusiCode} from 'js/api/taskManage/common.js';

    export default {
        data () {
            return {
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.homeFormSize,
                lookOverDialog: false, // 查看dialog
                num: 0,
                rules: {
                    busiCode: [{required: true, message: '请选择业务名称'}],
                    spiltType: [{required: true, message: '请选择'}],
                    spiltNum: [
                        {
                            validator: (rule, val, callback) => {
                                if (this.addParams.spiltType === 1) {
                                    if (val === '') {
                                        callback(new Error("请输入"));
                                        return false;
                                    }
                                    if (!/^\d+$/.test(val)) {
                                        callback(new Error("只可输入数字123"));
                                        return false;
                                    }
                                    if (!/^([1-9]|1[0-5])$/.test(val)) {
                                        callback(new Error("只能划分1-15之间"));
                                        return false;
                                    }

                                }
                                callback();
                            }, trigger: 'blur'
                        }
                    ],
                    spiltStrip: [
                        {
                            validator: (rule, val, callback) => {
                                if (this.addParams.spiltType === 2) {
                                    if (val === '') {
                                        callback(new Error("请输入"));
                                        return false;
                                    }
                                    if (!/^\d+$/.test(val)) {
                                        callback(new Error("只可输入数字"));
                                        return false;
                                    }
                                }
                                callback();
                            }, trigger: 'blur'
                        }
                    ]
                },
                listRules: {
                    searchCode: [{required: true, message: '请选择'}],
                    conditionType: [{required: true, message: '请选择'}],
                    relation: [{required: true, message: '请选择'}],
                    searchVal1: [{required: true, message: '请输入'}],
                    searchVal2: [{required: true, message: '请输入'}]
                },
                lookOverData: [
                    {label: '源库：', value: ''},
                    {label: '中间库：', value: ''},
                    {label: '平台数据库：', value: ''},
                    {label: '业务库：', value: ''}
                ],
                // 下拉框key value值
                listProps: {name: 'keyName', value: 'keyValue'},
                tempObj: {searchCode: '', conditionType: '', relation: '', searchVal1: '', searchVal2: ''},
                list: [],
                busiCodeDict: []
            };
        },
        props: {
            addParams: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        computed: {
            ...mapState(['searchCodeDict', 'conditionTypeDict', 'relationDict']),
            selectList: function () { // 业务编码
                let arr = [];
                this.busiCodeDict.forEach((item) => { // 将{busiName: busiName, busiCode: busiCode} 字段转化为 {keyName: item, keyValue: item}
                    arr.push({keyName: item.busiName, keyValue: item.busiCode});
                });
                return arr;
            }
        },
        created () {
            getBusiCode({enable: 1}).then(res => {
                console.log("getBusiCode: ", res);
                this.busiCodeDict = Object.assign([], res.data);
            });
            // this.addParams.conditionList.push(JSON.parse(JSON.stringify(this.tempObj)));
        },
        mounted () {
            this.form2 = this.$refs.form2;
        },
        methods: {
            searchValPlaceholder ({searchCode}) {
                let obj = this.searchCodeDict.find((item) => item.keyValue === searchCode);
                if (!obj || obj.type === 'string') {
                    return '请输入';
                }
                if (obj.type === "number") {
                    return "请输入数字";
                } else if (obj.type === "date") {
                    return "请输入日期yyyy-MM-dd hh:mm:ss或yyyy-MM-dd";
                }
            },
            searchVal1Validator ({searchCode}) {
                let obj = this.searchCodeDict.find((item) => item.keyValue === searchCode);
                return (rule, val, callback) => {
                    if (obj === undefined) {
                        callback();
                        return false;
                    }
                    let {type} = obj;
                    if ((type === "date" && val === '') || (type === "number" && val === '')) {
                        callback(new Error("请输入"));
                        return false;
                    }
                    switch (type) {
                    case 'date':
                        if (!/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})|(\d{4}-\d{2}-\d{2})$/.test(val)) {
                            callback(new Error("格式为:yyyy-MM-dd hh:mm:ss或yyyy-MM-dd"));
                            return false;
                        }
                        break;
                    case 'number':
                        if (!/^\d+$/.test(val)) {
                            callback(new Error("只可输入数字"));
                            return false;
                        }
                        break;
                    default:
                        break;
                    }
                    callback();
                };
            },
            async _test () {
                console.log(this.addParams.conditionList);
                let result = await new Promise((resolve, reject) => this.form2.validate(val => val ? resolve(val) : reject(val)));
                let r = await new Promise((resolve, reject) => {
                    let bSing = true;
                    for (let i = 0; i < this.addParams.conditionList.length; i++) {
                        this.$refs[`form_list${i}`][0].validate(val => {
                            if (!val) {
                                bSing = false;
                            }
                        });
                    }
                    if (bSing) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
                return Promise.all([result, r]);

            },
            handleDelete (index) {
                this.addParams.conditionList.splice(index, 1);
            },
            handleRadioChange (val) {
                let {spiltType} = this.addParams;
                switch (spiltType) {
                case 1:
                    this.$refs.spiltNum.resetField();
                    break;
                case 2:
                    this.$refs.spiltStrip.resetField();
                    break;
                default:
                    break;
                }
            },
            // 获取数据总数
            async handleGetDataAll () {
                console.log("获取数据总数");
                let {busiCode} = this.addParams;
                if (busiCode) {
                    let {data} = await getNumByBusiCode({busiCode});
                    this.num = data;
                }
                
            },
            // 查看
            handleLookOver () {
                console.log("查看");
                let busiCode = this.addParams.busiCode;
                if (!this.addParams.busiCode) return false;
                getInfoByBusiCode({busiCode}).then(({data}) => {
                    if (data) {
                        let {sourceDbCode, middleDbCode, platDbCode, serviceDbCode} = data;
                        this.lookOverData = Object.assign([], [
                            {label: '源库：', value: sourceDbCode},
                            {label: '中间库：', value: middleDbCode},
                            {label: '平台数据库：', value: platDbCode},
                            {label: '业务库：', value: serviceDbCode}
                        ]);
                        this.lookOverDialog = true;
                    }
                });
            },
            // 新增限制条件
            handleAddCondition () {
                console.log('新增限制条件');
                if (this.addParams.conditionList.length <= 8) {
                    this.addParams.conditionList.push(JSON.parse(JSON.stringify(this.tempObj)));
                }
            }
        },
        components: {FormCom}
    };
</script>

<style lang="scss" scoped>
    .look-over-btn, .delete-btn {
        position: absolute;
        right: -30px;
        color: #4579C5;
        cursor: pointer;
    }

    .look-over-btn {
        top: 0px;
    }

    .delete-btn {
        top: 6px;
    }

    .add-condition-btn {
        color: #4579C5;
        cursor: pointer;
    }

    .condition-wrap {
        width: 100%;
        display: flex;
        .select-box {
            flex: 1
        }
        :nth-child(1) {
            padding-right: 10px;
        }
        :nth-child(2) {
            padding-left: 5px;
            padding-right: 5px;
        }
        :nth-child(3) {
            padding-left: 10px;
        }
    }

    .disab {
        display: inline-block;
        width: 151px;
        height: 32px;
        margin-left: 13px;
        margin-right: 4px;
        text-align: center;
        background: rgba(250, 250, 250, 1);
        border: 1px solid rgba(233, 238, 250, 1);
        opacity: 0.5;
        border-radius: 4px;
    }

    .look-over-wrap {
        .title, .text {
            display: inline-block;
        }
        .title {
            width: 30%;
            text-align: right;
        }
        .text {
            width: 60%;
            text-align: left;
        }
    }

</style>

