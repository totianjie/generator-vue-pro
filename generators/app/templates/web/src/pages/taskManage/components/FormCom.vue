<template>
    <el-form ref="form" :model="addParams" :rules="rules" label-width="200px" :size="formSize">
        <!-- <el-form-item prop="taskTypeCode" label="任务类型：">
            <v-select
                :props="listProps"
                v-model="addParams.taskTypeCode"
                :list="taskTypeDict"
                placeholder="请选择任务类型"
                :filterable="true"
                class="select-box"
            />
        </el-form-item>
        <el-form-item prop="taskImpl" label="任务实体类：">
            <v-select
                :props="listProps"
                v-model="addParams.taskImpl"
                :list="taskImplDict"
                placeholder="请选择业务实体类"
                :filterable="true"
                class="select-box"
            />
        </el-form-item> -->
        <el-form-item prop="taskName" label="任务名称：">
            <el-input v-model="addParams.taskName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="任务备注：">
            <el-input v-model="addParams.remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="taskParam" label="任务参数设定：">
            <el-input v-model="addParams.taskParam" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="taskBeginTime" label="任务启动日期：">
            <el-date-picker
                style="width: 100%;"
                v-model.trim="addParams.taskBeginTime"
                type="date"
                value-format="timestamp"
                :picker-options="pickerOptions"
                placeholder="请选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="taskEndTime" label="任务终止日期：">
            <el-date-picker
                style="width: 100%;"
                v-model.trim="addParams.taskEndTime"
                type="date"
                value-format="timestamp"
                :picker-options="pickerOptions"
                placeholder="请选择日期">
            </el-date-picker>
        </el-form-item>
        <!-- <el-form-item prop="taskTimeout" label="任务处理超时时间：" style="position: relative;">
            <el-input v-model="addParams.taskTimeout" placeholder="请输入数字"></el-input>
            <span style="
                position: absolute;
                right: -20px;
                top: 0;
            ">秒</span>
        </el-form-item> -->
        <el-form-item prop="taskCycleType" label="任务周期类型：">
            <v-select
                :props="listProps"
                v-model="addParams.taskCycleType"
                :list="taskCycleTypeDict"
                placeholder="请选择任务周期类型"
                :filterable="true"
                class="select-box"
            />
        </el-form-item>
        <el-form-item prop="triggerDate" v-if="addParams.taskCycleType === '1'">
            <el-date-picker
                class="my-date-picker"
                style="width: 100%;"
                v-model="addParams.triggerDate"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间"
                :clearable="false"
                :picker-options="pickerOptions"
                @change="handleDateTimeChange"
            />
        </el-form-item>
        <el-form-item prop="taskTriggerType" label="任务时间设定：" v-if="addParams.taskCycleType === '2'">
            <el-radio-group v-model="addParams.taskTriggerType" @change="handleRadioChange" class="radio-group">
                <el-col :span="24" style="margin-top: 15px;">
                    <el-radio style="width: 33.33%;" :label="1">每月</el-radio>
                    <el-radio style="width: 33.33%;" :label="2" class="ml">每2星期</el-radio>
                    <el-radio style="width: 33.33%;" :label="3" class="ml">每星期</el-radio>
                </el-col>
                <el-col span="24" style="margin-top: 15px;">
                    <el-radio style="width: 33.33%;" :label="4" class="ml">每天</el-radio>
                    <el-radio style="width: 33.33%;" :label="5" class="ml">每隔小时</el-radio>
                    <el-radio style="width: 33.33%;" :label="6" class="ml">每隔分</el-radio>
                </el-col>
            </el-radio-group>
        </el-form-item>
        <!-- 每月 -->
        <el-form-item ref="list1" v-if="addParams.taskCycleType === '2' && addParams.taskTriggerType === 1">
            <el-col :span="11">
                <el-form-item prop="triggerDay">
                    <el-select v-model="addParams.triggerDay" placeholder="请选择每月日期">
                        <el-option
                            v-for="item in 28"
                            :key="item"
                            :label="`${item}日`"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="2" class="text-center">&nbsp;</el-col>
            <el-col :span="11">
                <el-form-item prop="triggerTime">
                    <!-- <el-time-select
                        style="width: 100%;"
                        v-model="addParams.triggerTime"
                        :clearable="false"
                        :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '23:00'
                        }"
                        placeholder="请选择时间"
                    />-->
                    <el-time-picker
                        style="width: 100%;"
                        v-model="addParams.triggerTime"
                        :clearable="false"
                        value-format='HH:mm'
                        format="HH:mm"
                        :picker-options="{
                            format: 'HH:mm'
                        }"
                        placeholder="请选择时间">
                    </el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <!-- 每2星期 --> <!-- 每星期 -->
        <el-form-item ref="list2" v-if="addParams.taskCycleType === '2' && (addParams.taskTriggerType === 2 || addParams.taskTriggerType === 3)">
            <el-col :span="11">
                <el-form-item prop="triggerWeek">
                    <el-select v-model="addParams.triggerWeek" placeholder="请选择每月日期">
                        <el-option
                            v-for="item in weeks"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="2" class="text-center">&nbsp;</el-col>
            <el-col :span="11">
                <el-form-item prop="triggerTime">
                    <!-- <el-time-select
                        style="width: 100%;"
                        v-model="addParams.triggerTime"
                        :clearable="false"
                        :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '23:00'
                        }"
                        placeholder="请选择时间"
                    />-->
                
                    <el-time-picker
                        style="width: 100%;"
                        v-model="addParams.triggerTime"
                        :clearable="false"
                        value-format='HH:mm'
                        format="HH:mm"
                        :picker-options="{
                            format: 'HH:mm'
                        }"
                        placeholder="请选择时间">
                    </el-time-picker>
                </el-form-item> 
            </el-col>
        </el-form-item>
        <!-- 每天 -->
        <el-form-item ref="list4" prop="triggerTime" v-if="addParams.taskCycleType === '2' && addParams.taskTriggerType === 4">
            <!-- <el-time-select
                style="width: 100%;"
                v-model="addParams.triggerTime"
                :clearable="false"
                :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '23:00'
                }"
                placeholder="请选择时间"
            /> -->
            <el-time-picker
                style="width: 100%;"
                v-model="addParams.triggerTime"
                :clearable="false"
                value-format='HH:mm'
                format="HH:mm"
                :picker-options="{
                    format: 'HH:mm'
                }"
                placeholder="请选择时间">
            </el-time-picker>
        </el-form-item>
        <!-- 每小时 -->
        <el-form-item ref="list5" prop="triggerHour" v-if="addParams.taskCycleType === '2' && addParams.taskTriggerType === 5">
            <el-input v-model="addParams.triggerHour" placeholder="请输入时间"></el-input>
        </el-form-item>
        <!-- 每分 -->
        <el-form-item ref="list6" prop="triggerMinute" v-if="addParams.taskCycleType === '2' && addParams.taskTriggerType === 6">
            <el-input v-model="addParams.triggerMinute" placeholder="请输入时间"></el-input>
        </el-form-item>
        <!-- <p class="bold">任务预警信息发送配置</p>
        <el-form-item prop="code22" label="任务异常邮件提醒">
            <el-checkbox v-model="addParams.checkbox1" style="position: absolute; left: -150px;" />
            <el-input v-model="addParams.code22" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="code23" label="任务异常短信提醒">
            <el-checkbox v-model="addParams.checkbox2" style="position: absolute; left: -150px;" />
            <el-input v-model="addParams.code23" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="code24" label="任务异常钉钉提醒">
            <el-checkbox v-model="addParams.checkbox3" style="position: absolute; left: -150px;" />
            <el-input v-model="addParams.code24" placeholder="请输入"></el-input>
        </el-form-item> -->
        <el-form-item prop="taskPriority" label="任务优先级：">
            <el-select v-model="addParams.taskPriority" placeholder="请选择" class="w-fill">
                <el-option
                    v-for="item in taskPriorityDict"
                    :key="item.keyValue"
                    :label="item.keyName"
                    :value="item.keyValue">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- 只在编辑时出现 -->
        <el-form-item prop="enable" label="任务状态：" v-if="taskStatusShow">
            <el-radio-group v-model="addParams.enable" class="w-fill">
                <el-col :span="8">
                    <el-radio :label="1" class="block">启用</el-radio>
                </el-col>
                <el-col :span="8">
                    <el-radio :label="0" class="block">禁用</el-radio>
                </el-col>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>
<script>
    import CONFIG from 'src/config';
    import rules from './rule_formCom';

    import {createNamespacedHelpers} from 'vuex';

    const {mapState} = createNamespacedHelpers('taskManage');

    export default {
        data () {
            return {
                weeks: [
                    {label: '星期日', value: 1},
                    {label: '星期一', value: 2},
                    {label: '星期二', value: 3},
                    {label: '星期三', value: 4},
                    {label: '星期四', value: 5},
                    {label: '星期五', value: 6},
                    {label: '星期六', value: 7}
                ],
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.homeFormSize,
                rules,
                // 下拉框key value值
                listProps: {name: 'keyName', value: 'keyValue'},
                pickerOptions: {
                    disabledDate (time) {
                        return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000));
                    }
                }
            };
        },
        props: {
            addParams: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            pageFlag: { // batchTasks(批次划分任务) runManage(跑批任务)
                type: String,
                default: function () {
                    return "";
                }
            }
        },
        computed: {
            ...mapState(['taskTypeDict', 'taskImplDict', 'taskCycleTypeDict', 'taskPriorityDict', "isEdit", "RMisEdit"]),
            taskStatusShow: function () {
                return this.pageFlag === "batchTasks" ? this.isEdit : this.RMisEdit;
            }
        },
        methods: {
            _test (val) {
                return new Promise((resolve, reject) => {
                    this.$refs.form.validate(val => {
                        val ? resolve(val) : reject(val);
                    });
                });
            },
            // 日期时间改变
            handleDateTimeChange (dateTime) {
                console.log('日期时间改变', dateTime);
            },
            handleRadioChange (checkd) {
                console.log("任务时间设定", checkd);
                console.log(this.addParams);
                let i = 1;
                while (i <= 6) {
                    console.log(this.$refs[`list${i}`]);
                    i++;
                }
            }
        }
    };
</script>

<style lang="scss">
    .el-picker-panel.el-date-picker .el-picker-panel__footer .el-button--text {
        display: none;
    }
</style>

