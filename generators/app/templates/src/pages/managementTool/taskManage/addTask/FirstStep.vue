<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/17
* @remark: 新增任务第一步
-->
<template>
    <section class="first-step-wrap">
        <el-row>
            <el-col span="16">
                <el-form ref="myForm1" :rules="rules" :model="params" :labelWidth="labelWidth" :size="formSize" :inline="true">
                    <el-form-item prop="taskName" style="margin: 0;" label="任务名称：">
                        <el-input class="w-220" v-model.trim="params.taskName" :size="formSize" placeholder="请输入任务名称"></el-input>
                    </el-form-item>
                    <el-form-item style="margin: 0;" label="任务类型：">
                        <el-radio-group v-model="params.type" :size="formSize">
                            <el-radio :label="2">非定时任务</el-radio>
                            <el-radio style="margin-left: 10px;" :label="1">定时任务</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col span="8" class="btns">
                <el-button @click="handleCancel" type="primary" :size="btnSize">取消</el-button>
                <el-button @click="handleSave" type="primary" :size="btnSize">保存</el-button>
                <el-button @click="handleExecute" type="primary" :size="btnSize" v-show="params.type === 2">执行</el-button>
            </el-col>
        </el-row>
        <el-form ref="myForm3" :rules="rules" :model="params" :labelWidth="labelWidth" :size="formSize" :inline="true">
            <el-form-item class="p-t-10" v-if="params.type === 1" style="margin: 0;" prop="beginTime" label="开始时间：">
                <el-date-picker
                    popper-class="date-picker-begin-time"
                    v-model="params.beginTime"
                    type="datetime"
                    :size="formSize"
                    value-format="timestamp"
                    placeholder="选择开始日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="p-t-10" v-if="params.type === 1" style="margin: 0;" label="结束时间：">
                <el-date-picker
                    popper-class="date-picker-begin-time"
                    v-model="params.endTime"
                    type="datetime"
                    :size="formSize"
                    value-format="timestamp"
                    placeholder="选择结束日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="p-t-10" v-if="params.type === 1" prop="interval" style="margin: 0;" label="间隔时间：">
                <el-input class="w-220" v-model.trim="params.interval" :size="formSize" type="number" placeholder="请输入间隔时间"></el-input>
                <span class="hour-text">小时</span>
            </el-form-item>
        </el-form>
        <el-form ref="myForm4" :rules="rules" :model="params" :labelWidth="labelWidth" :size="formSize" :inline="true">
            <el-form-item prop="noticeName" class="p-t-10" style="margin: 0;" label="接收者姓名：">
                <el-input class="w-220" v-model.trim="params.noticeName" :size="formSize" placeholder="请输入接收者姓名"></el-input>
            </el-form-item>
            <el-form-item prop="email" class="p-t-10" style="margin: 0;" label="邮箱地址：">
                <el-input class="w-220" v-model.trim="params.email" :size="formSize" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item prop="webhook" class="p-t-10" style="margin: 0;" label="钉钉：">
                <el-input class="w-220" v-model.trim="params.webhook" :size="formSize" placeholder="请输入机器人地址"></el-input>
            </el-form-item>
        </el-form>
        <div class="clearfix function-wrap p-l-0 m-t-20">
            <el-col span="8">
                <el-form ref="myForm2" :model="params" :rules="rules" :labelWidth="labelWidth" :size="formSize" :inline="true">
                    <el-form-item prop="templetId" style="margin: 0;" label="模板选择：">
                        <v-select
                            class="w-220"
                            v-model="params.templetId"
                            :list="selectData"
                            :props="selectProps"
                            :size="formSize"
                            @change="handleChange">
                        </v-select>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
        <el-table
            height="350px"
            style="width:100%; max-height: 350px;"
            :size="tableSize"
            :data="tableData"
            border
            :highlight-current-row="true"
            :stripe="true"
        >
            <el-table-column
                type="index"
                label="序号"
                width="50"
            >
            </el-table-column>
            <el-table-column
                prop="sourceTable"
                label="原始库表名称"
                show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
                prop="sourceNum"
                show-overflow-tooltip
                label="源数据库需要导入量"
            >
            </el-table-column>
            <el-table-column
                prop="targetTable"
                show-overflow-tooltip
                label="目标库表名称"
            >
            </el-table-column>
            <el-table-column
                label="目标库导入前数据量"
                prop="targetNum"
                show-overflow-tooltip
            >
            </el-table-column>
        </el-table>
        <!--<div class="count-number">导入路径总数：<span v-text="num"></span>条</div>-->
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    import {getTaskTemplate, getTemdetail, addTask} from 'js/api/managementTool/taskManage';
    import rules from './rules';

    export default {
        data () {
            return {
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.baseBtn,
                labelWidth: '120px',
                selectData: [], // 下拉框数据
                num: 0, // 导入路径总数
                selectProps: {name: 'templetName', value: 'id'}, // 下拉框key value  字段
                tableData: [ // 表格数据
                ],
                params: {
                    taskName: '', // 任务名称
                    templetId: '', // 模板选择的结果
                    beginTime: '', // 开始时间
                    endTime: '', // 结束时间
                    interval: '', // 间隔时间
                    noticeName: '', // 接收者姓名
                    email: '', // 邮件地址
                    webhook: '', // 钉钉群机器人地址
                    type: 2 // 1 定时任务 2 非定时任务
                },
                countNumber: 101,
                taskName: '', // 任务名称
                taskNameReg: false, // 任务名称是否通过验证
                templetId: '', // 模板选择的结果
                taskType: -1, // 1 保存 2 执行
                rules: rules,
                radio: 2
            };
        },
        created () {
            getTaskTemplate().then(({data}) => {
                this.selectData = Object.assign([], data);
            });
        },
        methods: {
            handleChange (val) { // 下拉框改变
                console.log('下拉框改变', val);
                if (!val) {
                    this.num = 0;
                    this.tableData = [];
                    return false;
                }
                getTemdetail({templetId: val}).then(({data}) => {
                    let {num, temList} = data;
                    this.num = num;
                    this.tableData = Object.assign([], temList);
                });

            },
            handleCancel () { // 取消
                console.log('取消');
                this.$emit('cancel');
            },
            async _addTask () { // 保存执行
                await this.$refs.myForm1.validate();
                await this.$refs.myForm2.validate();
                return addTask(Object.assign({}, {taskType: this.taskType, ...this.params})).then((result) => {
                    return Promise.resolve(result);
                });
            },
            async handleSave () { // 保存
                await this.$refs.myForm3.validate();
                await this.$refs.myForm4.validate();
                let {endTime, beginTime} = this.params;
                console.log(beginTime, endTime);
                if (this.params.type === 1 && (typeof endTime === 'number') && (beginTime > endTime)) {
                    this.$toast('结束时间必须大于开始时间');
                    return false;
                }
                this.taskType = 1;
                this._addTask().then((result) => {
                    console.log('保存', result);
                    this.$emit('save', {id: result.data});
                }, (res) => {
                    !res && this.$toast('您填写的信息无效，请重新填写');
                });
            },
            handleExecute () { // 执行
                this.taskType = 2;
                this._addTask().then((result) => {
                    this.$emit('execute', {id: result.data});
                }, (res) => {
                    !res && this.$toast('您填写的信息无效，请重新填写');
                });
            }
        },
        watch: {
            taskName: function (newName, oldName) {
                console.log(newName, oldName);
                let reg = /^[a-zA-Z0-9\u4e00-\u9fa5_\-—]+$/;
                this.taskNameReg = reg.test(newName) && newName.length <= 30;
            },
            'params.type': function (newRadio, oldRadio) {
                console.log(newRadio, oldRadio);
                if (newRadio === 2) {
                    this.params.beginTime = '';
                    this.params.endTime = '';
                    this.params.interval = '';
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .function-wrap {
        padding-bottom: 16px;
    }

    .btns {
        padding-right: 39px;
        text-align: right;
    }

    .p-l-0 {
        padding-left: 0;
    }

    .count-number {
        padding: 8px 0 8px 20px;
    }

    .m-t-8 {
        margin-top: 8px;
    }

    .w-220 {
        width: 220px;
    }

    .p-t-10 {
        padding-top: 15px;
    }

    .hour-text {
        font-size: 12px;
        color: #999;
    }

    // 32  56  35
</style>
<style>
    .date-picker-begin-time .el-picker-panel__footer .el-button--text {
        display: none;
    }
</style>
