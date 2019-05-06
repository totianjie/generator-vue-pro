<!--
周期任务:
    未执行:
        立即执行
    暂停
        继续
    执行中
        暂停
        终止
    终止

    执行完成
        立即执行

立即执行任务:
单次任务:
    未执行:
        立即执行
    暂停
        继续
    执行中
        暂停
        终止
    终止

    执行完成

执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
周期类型：（1单次定时任务 2周期定时任务  3立即执行任务） ==> taskCycleType   String
-->
<template>
    <el-table
        :size="tableSize"
        :data="tableData"
        highlight-current-row
        :stripe="true"
        height="100%"
        width="100%"
        border
    >
        <el-table-column
            label="序号"
            type="index"
            width="50"
        >
        </el-table-column>
        <el-table-column
            :min-width="colWidth"
            show-overflow-tooltip
            prop="taskName"
            label="任务名称">
        </el-table-column>
        <el-table-column
            :min-width="colWidth"
            show-overflow-tooltip
            prop="taskBeginTime"
            label="执行时间描述">
            <template slot-scope="scope">
                <span>{{scope.row | beginTime}}</span>
            </template>    
        </el-table-column>
        <el-table-column
            min-width="150px"
            show-overflow-tooltip
            prop="lastBeginTime"
            label="最近一次执行开始时间">
            <template slot-scope="scope">
                <span>{{scope.row.lastBeginTime | formatTime("yyyy-MM-dd hh:mm:ss")}}</span>
            </template>  
        </el-table-column>
        <el-table-column
            min-width="150px"
            show-overflow-tooltip
            prop="lastEndTime"
            label="最近一次执行结束时间"
        >
        <template slot-scope="scope">
                <span>{{scope.row.lastEndTime | formatTime("yyyy-MM-dd hh:mm:ss")}}</span>
            </template>  
        </el-table-column>
        <el-table-column
            min-width="150px"
            show-overflow-tooltip
            prop="lastTaskStatus"
            label="最近一次执行状态"
        >
            <template slot-scope="scope">
                {{_formatLastTaskStatus(scope.row)}}
            </template>
        </el-table-column>
        <el-table-column
            :min-width="colWidth"
            label="任务优先级" width=100>
            <template slot-scope="scope">
                <el-dropdown trigger="click" class="pointer">
                    <span class="el-dropdown-link">
                        {{scope.row.taskPriority}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            @click.native="handlePriority(scope.row, item)"
                            v-for="(item) in priorityList"
                            :key="item.value">{{item.label}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </el-table-column>

        <el-table-column
            :min-width="colWidth"
            label="任务状态" width=100>
            <template slot-scope="scope">
                <el-dropdown trigger="click" class="pointer">
                    <span class="el-dropdown-link">
                        {{scope.row.enable | formatEnable }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            @click.native="handleCommand(scope.row, item)"
                            v-for="(item) in options"
                            :key="item.value">{{item.label}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            :width="operationWidth"
        >
            <template slot-scope="scope">
                <el-button
                    class="edit-btn-class"
                    @click="handleLook(scope.row)"
                    type="text"
                    size="small">查看
                </el-button>
                <el-button
                    v-if="viewLogShow"
                    class="edit-btn-class"
                    @click="handleViewLog(scope.row)"
                    type="text"
                    size="small">查看日志
                </el-button>
                <el-button
                    v-if="viewTaskShow"
                    class="edit-btn-class"
                    @click="handleViewTask(scope.row)"
                    type="text"
                    size="small">查看任务监控
                </el-button>
                <el-button
                    v-if="_editBtnShow(scope.row.taskCycleType, scope.row.lastTaskStatus, scope.row)"
                    class="edit-btn-class"
                    @click="handleEdit(scope.row)"
                    type="text"
                    size="small">编辑
                </el-button>
                <el-button
                    v-if="_runBtnShow(scope.row.taskCycleType, scope.row.lastTaskStatus, scope.row.enable)"
                    class="edit-btn-class"
                    @click="handleRun(scope.row)"
                    type="text"
                    size="small">立即执行
                </el-button>
                <el-button
                    v-if="goOnShow && _goOnBtnShow(scope.row.taskCycleType, scope.row.lastTaskStatus, scope.row.enable)"
                    class="edit-btn-class"
                    @click="handleGoOn(scope.row)"
                    type="text"
                    size="small">继续
                </el-button>
                <el-button
                    v-if="suspendShow && _suspendBtnShow(scope.row.taskCycleType, scope.row.lastTaskStatus, scope.row.enable)"
                    class="edit-btn-class"
                    @click="handleSuspend(scope.row)"
                    type="text"
                    size="small">暂停
                </el-button>
                <el-button
                    v-if="exitShow && _exitBtnShow(scope.row.taskCycleType, scope.row.lastTaskStatus, scope.row.enable)"
                    class="edit-btn-class"
                    @click="handleExit(scope.row)"
                    type="text"
                    size="small">终止
                </el-button>
                <el-button
                    v-if="resultPreShow && _resultPreShow(scope.row.enable)"
                    class="edit-btn-class"
                    @click="handleResultPre(scope.row)"
                    type="text"
                    size="small">重跑前次任务
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {formatTime as ___formatTime} from 'js/utils/dates';
    export default {
        props: {
            operationWidth: { // batchTasks(批次划分任务) runManage(跑批任务)
                type: Number,
                default: function () {
                    return 480;
                }
            },
            pageFlag: { // batchTasks(批次划分任务) runManage(跑批任务)
                type: String,
                default: function () {
                    return "";
                }
            },
            tableData: {
                type: Array,
                default () {
                    return [
                        /* {
                            "id": "6",
                            "taskName": "string",
                            "taskBeginTime": 1550737562000,
                            "lastBeginTime": null,
                            "lastEndTime": null,
                            "lastTaskStatus": null,
                            "enable": "1",
                            "taskPriority": "1"
                        },
                        {
                            "id": "1",
                            "taskName": "测试名称",
                            "taskBeginTime": 1550736365000,
                            "lastBeginTime": 1550647917000,
                            "lastEndTime": 1551943922000,
                            "lastTaskStatus": "1",
                            "enable": "1",
                            "taskPriority": "2"
                        } */
                        /*
                        enable (string, optional): 是否启用状态(1:启用 0禁用) ,
                        id (string, optional),
                        lastBeginTime (string, optional): 最后一次开始时间 ,
                        lastEndTime (string, optional): 最后一次结束时间 ,
                        lastTaskStatus (string, optional): 最后一次任务状态 ,
                        taskBeginTime (string, optional): 开始时间 ,
                        taskName (string, optional): 任务名称
                        taskPriority: 任务优先级
                        */
                    ];
                }
            },
            goOnShow: { // 继续按钮是否需要
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            exitShow: {
                type: Boolean,
                function () { // 终止按钮是否需要
                    return false;
                }
            },
            suspendShow: { // 暂停按钮是否需要
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            viewLogShow: { // 查看日志按钮是否需要
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            viewTaskShow: { // 查看日志监控按钮是否需要
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            resultPreShow: { // 重跑前次任务按钮是否需要
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            priorityList: { // 优先级
                type: Array,
                default: function () {
                    return [];
                }
            }
        },

        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: "100px",
                options: [
                    {
                        value: '0',
                        label: '禁用'
                    },
                    {
                        value: '1',
                        label: '启用'
                    }
                ]
            };
        },
        methods: {
            // 编辑
            handleEdit (data) {
                console.log("编辑");
                this.$emit("edit", data);
            },
            // 查看
            handleLook (data) {
                console.log("查看");
                this.$emit("look", data);
            },
            // 禁用  启用
            handleCommand (row, item) {
                if (row.enable === item.value) {
                    return false;
                }
                if (item.value === "1") {
                    // 如果是启用直接调用接口
                    this.$emit("command", {row, item});
                } else {
                    let text = '是否确定禁用该任务';
                    let title = '提示';
                    let enable = row.enable;
                    row.enable = item.value;
                    this._$confirm({content: text, title}).then(() => {
                        // 逻辑代码...
                        this.$emit("command", {row, item});
                    }).catch(() => {
                        row.enable = enable;
                        return false;
                    });
                }

            },
            // 任务优先级
            handlePriority (row, item) {
                if (parseInt(row.taskPriority) === parseInt(item.value)) {
                    return false;
                }
                let text = '是否修改任务优先级';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    // 逻辑代码...
                    this.$emit("priority", {row, item});
                }).catch(() => false);
            },
            handleRun (data) {
                let text = '是否立即执行任务';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    // 逻辑代码...
                    this.$emit("run", data);
                }).catch(() => false);
            },
            // 继续
            handleGoOn (data) {
                let text = '是否继续此任务';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    // 逻辑代码...
                    this.$emit("goOn", data);
                }).catch(() => false);
            },
            // 暂停
            handleSuspend (data) {
                let text = '是否暂停此任务';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    // 逻辑代码...
                    this.$emit("suspend", data);
                }).catch(() => false);
            },
            // 终止
            handleExit (data) {
                let text = '是否终止此任务';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    // 逻辑代码...
                    this.$emit("exit", data);
                }).catch(() => false);
            },
            handleResultPre (data) {
                if (data.enable + '' === '0') {
                    return false;
                }
                let text = '是否立即重跑前一次任务，之前跑批结果将被清空';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    // 逻辑代码...
                    this.$emit("resultPre", data);
                }).catch(() => false);
            },
            // 查看日志
            handleViewLog (data) {
                this.$emit("viewLog", data);
            },
            // 查看任务监控
            handleViewTask (data) {
                this.$emit("viewTask", data);
            },
            // 编辑按钮
            _editBtnShow (taskCycleType, lastTaskStatus) {
                /**
                 执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
                周期类型：（1单次定时任务 2周期定时任务  3立即执行任务） ==> taskCycleType   String
                */
                let bSing = true;
                if (this.pageFlag === "batchTasks") { // // batchTasks(批次划分任务) runManage(跑批任务)
                    if (
                        (taskCycleType === "1" && lastTaskStatus === "2") || // 单次定时任务 执行中
                        (taskCycleType === "1" && lastTaskStatus === "5") || // 单次定时任务 执行完成
                        (taskCycleType === "3" && lastTaskStatus === "2") || // 立即执行任务 执行中
                        (taskCycleType === "3" && lastTaskStatus === "5") // 已经执行任务 执行完成
                    ) {
                        return false;
                    }
                }
                
                return bSing;
            },
            _resultPreShow (enable) {
                if (enable + '' === '0') {
                    return false;
                }
                return true;
            },
            // 立即执行按钮
            _runBtnShow (taskCycleType, lastTaskStatus, enable) {
                // console.log('_runBtnShow', enable);
                if (enable + '' === '0') {
                    return false;
                }
                /**
                 执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
                 周期类型：（1单次定时任务 2周期定时任务  3立即执行任务） ==> taskCycleType   String
                 */
                let bSing = true;
                if (this.pageFlag === "runManage") { // // batchTasks(批次划分任务) runManage(跑批任务)
                    if (
                        (taskCycleType === "2" && lastTaskStatus === "2") || // 周期任务  执行中
                        (taskCycleType === "1" && lastTaskStatus === "2") || // 单次定时任务 执行中
                        (taskCycleType === "1" && lastTaskStatus === "5") || // 单次定时任务 执行完成
                        (taskCycleType === "3" && lastTaskStatus === "2") || // 立即执行任务 执行中
                        (lastTaskStatus === "4") || // 暂停时
                        (lastTaskStatus === "3") || // 终止时
                        (taskCycleType === "3" && lastTaskStatus === "5") // 立即执行任务 执行完成
                    ) {
                        return false;
                    }
                } else {
                    if (
                        (taskCycleType === "1" && lastTaskStatus === "2") || // 单次定时任务 执行中
                        (taskCycleType === "1" && lastTaskStatus === "5") || // 单次定时任务 执行完成
                        (taskCycleType === "3" && lastTaskStatus === "2") || // 立即执行任务 执行中
                        (taskCycleType === "3" && lastTaskStatus === "5") // 已经执行任务 执行完成
                    ) {
                        return false;
                    }
                }
                
                return bSing;
            },
            // 继续按钮
            _goOnBtnShow (taskCycleType, lastTaskStatus, enable) {
                if (enable + '' === '0') {
                    return false;
                }
                /**
                 执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
                 周期类型：（1单次定时任务 2周期定时任务  3立即执行任务） ==> taskCycleType   String
                 */
                let bSing = false;
                if (
                    (taskCycleType === "2" && lastTaskStatus === "3") || // 周期任务  暂停
                    (taskCycleType === "1" && lastTaskStatus === "3") || // 单次定时任务 暂停
                    (taskCycleType === "3" && lastTaskStatus === "3") // 立即执行任务 暂停
                ) {
                    return true;
                }
                return bSing;
            },
            // 暂停按钮
            _suspendBtnShow (taskCycleType, lastTaskStatus, enable) {
                if (enable + '' === '0') {
                    return false;
                }
                /**
                 执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
                 周期类型：（1单次定时任务 2周期定时任务  3立即执行任务） ==> taskCycleType   String
                 */
                let bSing = false;
                if (
                    (taskCycleType === "2" && lastTaskStatus === "2") || // 周期任务  2执行中
                    (taskCycleType === "1" && lastTaskStatus === "2") || // 单次定时任务 2执行中
                    (taskCycleType === "3" && lastTaskStatus === "2") // 立即执行任务 2执行中
                ) {
                    return true;
                }
                return bSing;

            },
            // 终止按钮
            _exitBtnShow (taskCycleType, lastTaskStatus, enable) {
                if (enable + '' === '0') {
                    return false;
                }
                /**
                 执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
                 周期类型：（1单次定时任务 2周期定时任务  3立即执行任务） ==> taskCycleType   String
                 */
                let bSing = false;
                if (
                    (taskCycleType === "2" && lastTaskStatus === "2") || // 周期任务  2执行中
                    (taskCycleType === "1" && lastTaskStatus === "2") || // 单次定时任务 2执行中
                    (taskCycleType === "3" && lastTaskStatus === "2") // 立即执行任务 2执行中
                ) {
                    return true;
                }
                return bSing;
            },
            _formatLastTaskStatus ({lastTaskStatus, enable}) {
                // 执行状态(1创建  2执行中  3暂停  4终止  5完成 ) ==> lastTaskStatus   String
                let json = {"1": "未执行", "2": "执行中", "3": "执行暂停", "4": "执行终止", "5": "执行完成"};
                return json[lastTaskStatus];
            }
        },

        filters: {
            formatEnable (input) {
                return input === '0' ? '禁用' : '启用';
            },
            beginTime (val) {
                if (val.taskCycleType) {
                    if (parseInt(val.taskCycleType) === 3) { // 立即执行任务
                        return `${___formatTime(Number(val.lastBeginTime), "yyyy-MM-dd hh:mm:ss")}`;
                    } else if (parseInt(val.taskCycleType) === 1) { // 单次定时任务
                        if (val.triggerDate) {
                            return `${___formatTime(Number(val.triggerDate), "yyyy-MM-dd hh:mm:ss")}`;
                        }
                        return `${___formatTime(Number(val.taskBeginTime), "yyyy-MM-dd hh:mm:ss")}`;
                    } else if (parseInt(val.taskCycleType) === 2) {
                        let weekObj = {
                            '1': '日',
                            '2': '一',
                            '3': '二',
                            '4': '三',
                            '5': '四',
                            '6': '五',
                            '7': '六'
                        };
                        let str = weekObj[(val.triggerWeek) + ''];
                        if (val.taskTriggerType === 1) {
                            return `每月${val.triggerDay} ${val.triggerTime}`;
                        } else if (val.taskTriggerType === 2) {
                            return `每2星期${str} ${val.triggerTime}`;
                        } else if (val.taskTriggerType === 3) {
                            return `每星期${str} ${val.triggerTime}`;
                        } else if (val.taskTriggerType === 4) {
                            return `每天${val.triggerTime}`;
                        } else if (val.taskTriggerType === 5) {
                            return `每隔${val.triggerHour}小时`;
                        } else if (val.taskTriggerType === 6) {
                            return `每隔${val.triggerMinute}分钟`;
                        } else {
                            return `${___formatTime(Number(val.taskBeginTime), "yyyy-MM-dd hh:mm:ss")}`;
                        }
                    }
                }
            }
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
    @import "./../../../scss/common";
    @import "./../../../scss/variables";

    .edit-btn-class {
        color: $base-color !important;
        // font-size: 12px;
        // font-weight: 400;
    }
</style>
