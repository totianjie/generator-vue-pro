<template>
    <section class="h-fill wrap">
        <el-row>
            <el-col span="12">
                <div class="title"></div>
                <div v-for="(item, index) in detailData" :key="index">
                    <v-item-detail :tooltip="true" :label="item.label" :pxUnit="true" :labelWidth="labelWidth" v-if="!item.flag">
                        <span class="block text-ellipsis">{{item.value}}</span>
                        <div slot="content" class="tooltip-item">{{item.value}}</div>
                    </v-item-detail>
                    <v-item-detail :label="item.label" :pxUnit="true" :labelWidth="labelWidth" :border="false" v-if="item.flag">
                        <div>
                            <span
                                class="block list"
                                :class="{mt: subIndex}"
                                v-for="(subItem, subIndex) in item.list"
                                :key="subIndex"
                            >
                                {{subItem.value}}
                            </span>
                        </div>
                    </v-item-detail>
                </div>
            </el-col>
            <el-col span="12">
                <div class="title">最近一次任务执行结果</div>
                <div v-for="(item, index) in runResult" :key="index">
                    <v-item-detail :label="item.label" :pxUnit="true" :labelWidth="labelWidth" v-if="!item.flag">
                        <span class="block text-ellipsis">{{item.value}}</span>
                    </v-item-detail>
                    <v-item-detail :label="item.label" :pxUnit="true" :labelWidth="labelWidth" v-if="item.flag">
                        <div>
                            <span
                                v-for="(subItem, subIndex) in item.list"
                                :key="subIndex"
                                class="inner-block text-ellipsis"
                                style="margin-right: 20px;"
                                :class="{active: item.flag}"
                                @click="handleViewLog(item, index+1, subItem, subIndex+1)"
                            >
                                {{subItem}}
                            </span>
                        </div>
                    </v-item-detail>
                </div>
                <v-item-detail label=" " :pxUnit="true" :labelWidth="labelWidth" :border="false">
                    <span class="inner-block text-ellipsis">
                        <el-button :size="btnSize" @click="handleViewAllLog(1)">查看更多执行记录</el-button>
                    </span>
                    <span class="inner-block text-ellipsis" v-if="pageFlag === 'runManage'">
                        <el-button :size="btnSize" @click="handleViewAllLog(2)">查看任务监控</el-button>
                    </span>
                </v-item-detail>

            </el-col>
        </el-row>
        <div style="text-align: center; padding-top: 65px; padding-bottom: 30px;">
            <el-button v-show="!preview && !RMpreview && !RMpreview2" :size="btnSize" @click="handleBack(1)" type="primary">返回</el-button>
            <el-button v-show="preview" :size="btnSize" @click="handleBack(2)" type="primary">返回</el-button>
            <el-button v-show="RMpreview || RMpreview2" :size="btnSize" @click="handleBack(3)" type="primary">返回</el-button>
        </div>
        <!-- 查看日志 -->
        <daily-record-dialog ref="dailyRecordDialog" v-model="dialogVisible" @closeDailyDialog="closeDailyDialog" />
        <!-- 查看更多执行记录 -->
        <more-record-dialog ref="moreRecordDialog" v-model="moreRecordDialogVisible" @moreReDialog="moreReDialog"/>
    </section>
</template>
<script>
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapMutations, mapGetters} = createNamespacedHelpers("taskManage");
    import {getShow as getBatchTasksDetail} from 'js/api/taskManage/batchTasks.js';
    import {getShow as getRunManageDetail} from 'js/api/taskManage/runManage.js';
    import {formatTime as __formatTime} from 'js/utils/dates';
    import {formatTime} from 'src/filters';
    import DailyRecordDialog from './DailyRecordDialog';
    import MoreRecordDialog from './moreRecordDialog';

    export default {
        data () {
            return {
                taskName: '',
                labelWidth: 200,
                btnSize: CONFIG.homeBtn,
                executeCode: '',
                detailData: [
                    // {label: '任务类型：', value: '回流任务'},
                    // {label: '任务实体类：', value: 'TCHL'},
                    // {label: '任务名称：', value: '铜川数据回流'},
                    // {label: '任务备注：', value: '备注...1122'},
                    // {label: '任务参数设定：', value: 'pldata=date:>1984'},
                    // {label: '任务启动日期：', value: '2018-01-01'},
                    // {label: '任务终止日期：', value: '2018-01-01'},
                    // {label: '任务周期类型：', value: '周期定时任务'},
                    // {label: '任务周期描述：', value: '每周二 17：30'},
                    // // flag是否是列表
                    // // {label: '任务预警提醒配置：', flag: true, list: [{value: '邮箱xxxxx@email.com'}, {value: '手机号12545214521'}, {value: '钉钉http://192.168.29.20:8998/www'}]},
                    // {label: '任务处理超时时间：', value: '160s'},
                    // {label: '任务优先级：', value: '5'},

                    // // 批次任务划分特有数据 start
                    // {label: '业务编码：', value: '沈阳01'},
                    // {label: '数据总条数：', value: '11000条'},
                    // {label: '批次拆分：', value: '共拆分3批次'},
                    // {label: '数据选择条件：', value: '入院时间大于等于2019-01-01'}
                    // 批次任务划分特有数据 end
                ],
                runResult: [
                    // {label: '执行开始时间：', value: '2018-01-01 09：00：00'},
                    // {label: '执行结束时间：', value: '2018-01-01 09：00：00'},
                    // {label: '执行结果：', value: '成功'},
                    // // 批次任务划分特有数据 start
                    // {label: '执行日志', flag: true, list: ['查看日志', '查看任务监控']},
                    // // 批次任务划分特有数据 start

                    // // 跑批任务有 start
                    // {label: '执行日志', flag: true, list: ['查看日志']},
                    // {label: '总条数：', value: '5000条'},
                    // {label: '已执行：', value: '1000条'},
                    // {label: '请选择关联批次划分任务：', value: '铜川批量数据导入1'},
                    // {label: 'appld：', value: '3521'},
                    // {label: '是否清除跑批结果：', value: '不清空条件'},
                    // {label: '跑批过程出现异常时处理：', value: '终止并清空所有数据'}
                    // // 跑批任务有 end

                ],
                dialogVisible: false, // 查看日志弹出框默认false
                moreRecordDialogVisible: false // 查看更多执行记录弹出框默认false
            };
        },
        computed: {
            ...mapGetters(["taskCode", "RMtaskCode", "preview", "RMpreview", "RMpreview2", "RMpreviewTaskCode", "taskCycleTypeDict", 'searchCodeDict', 'conditionTypeDict', 'relationDict']),
            pageType: function () { // type 为 1为批次 2 为跑批
                return this.pageFlag === "batchTasks" ? 1 : 2;
            },
            routerQuery: function () {
                // {taskCode: this.RMtaskCode}
                let obj = {
                    type: this.pageType,
                    taskName: this.taskName,
                    executeCode: this.executeCode
                };
                if (this.pageFlag === "batchTasks") {
                    //
                    obj = Object.assign({}, obj, {taskCode: this.RMpreview2 ? this.RMpreviewTaskCode : this.taskCode});
                } else if (this.pageFlag === "runManage") {
                    obj = Object.assign({}, obj, {taskCode: this.RMtaskCode});
                }
                return obj;
            }
        },
        props: {
            pageFlag: { // batchTasks(批次划分任务) runManage(跑批任务)
                type: String,
                default: function () {
                    return "";
                }
            }
        },
        created () {
            if (this.pageFlag === "batchTasks") {
                this._getBatchTasksDetail();
            } else if (this.pageFlag === "runManage") {
                this._getRunManageDetail();
            }
        },
        methods: {
            async _getBatchTasksDetail () {
                let result = await getBatchTasksDetail({taskCode: this.RMpreview2 ? this.RMpreviewTaskCode : this.taskCode});
                this.executeCode = result.data.executeCode;
                this.detailData = [
                    // {label: '任务类型：', value: result.data.taskTypeCode},
                    // {label: '任务实体类：', value: result.data.taskImpl},
                    {label: '任务名称：', value: result.data.taskName},
                    {label: '任务备注：', value: result.data.remark},
                    {label: '任务参数设定：', value: result.data.taskParam},
                    {label: '任务启动日期：', value: formatTime(result.data.taskBeginTime, "yyyy-MM-dd")},
                    {label: '任务终止日期：', value: formatTime(result.data.taskEndTime, "yyyy-MM-dd")},
                    {label: '任务周期类型：', value: this._formatTaskCycleType(result.data)},
                    {label: '任务周期描述：', value: this._formatTaskCycleDesc(result.data)},
                    // flag是否是列表
                    // {label: '任务预警提醒配置：', flag: true, list: [{value: '邮箱xxxxx@email.com'}, {value: '手机号12545214521'}, {value: '钉钉http://192.168.29.20:8998/www'}]},
                    // {label: '任务处理超时时间：', value: result.data.taskTimeout},
                    {label: '任务优先级：', value: result.data.taskPriority},
                    {label: '业务名称：', value: result.data.busiName || 'name' + result.data.busiCode},
                    {label: '数据总条数：', value: result.data.totalNum},
                    {label: '批次拆分：', value: `共拆分${this._formatSpiltType(result.data)}`},
                    {label: '数据选择条件：', value: this._formatCondition(result.data)}
                ];
                this.runResult = [
                    {label: '执行开始时间：', value: formatTime(result.data.lastBeginTime, "yyyy-MM-dd hh:mm:ss")},
                    {label: '执行结束时间：', value: formatTime(result.data.lastEndTime, "yyyy-MM-dd hh:mm:ss")},
                    {label: '执行结果：', value: result.data.executeResult},
                    {label: '执行日志', flag: true, list: ['查看日志']}
                ];
            },
            async _getRunManageDetail () {
                let result = await getRunManageDetail({taskCode: this.RMtaskCode});
                this.taskName = result.data.taskName;
                this.executeCode = result.data.executeCode;
                this.detailData = [
                    // {label: '任务类型：', value: result.data.taskTypeCode},
                    // {label: '任务实体类：', value: result.data.taskImpl},
                    {label: '任务名称：', value: result.data.taskName},
                    {label: '任务备注：', value: result.data.remark},
                    {label: '任务参数设定：', value: result.data.taskParam},
                    {label: '任务启动日期：', value: formatTime(result.data.taskBeginTime, "yyyy-MM-dd")},
                    {label: '任务终止日期：', value: formatTime(result.data.taskEndTime, "yyyy-MM-dd")},
                    {label: '任务周期类型：', value: this._formatTaskCycleType(result.data)},
                    {label: '任务周期描述：', value: this._formatTaskCycleDesc(result.data)},
                    // flag是否是列表
                    // {label: '任务预警提醒配置：', flag: true, list: [{value: '邮箱xxxxx@email.com'}, {value: '手机号12545214521'}, {value: '钉钉http://192.168.29.20:8998/www'}]},
                    // {label: '任务处理超时时间：', value: result.data.taskTimeout},
                    {label: '任务优先级：', value: result.data.taskPriority}
                ];
                this.runResult = [
                    {label: '执行开始时间：', value: formatTime(result.data.lastBeginTime, "yyyy-MM-dd hh:mm:ss")},
                    {label: '执行结束时间：', value: formatTime(result.data.lastEndTime, "yyyy-MM-dd hh:mm:ss")},
                    {label: '执行结果：', value: result.data.executeResult},
                    // 跑批任务有 start
                    {label: '执行日志', flag: true, list: ['查看日志']},
                    {label: '总条数：', value: result.data.totalNum},
                    {label: '已执行：', value: result.data.executeNum},
                    {label: '关联批次划分任务：', value: result.data.splitTaskName},
                    {label: '场景名称：', value: result.data.appName || 'name' + result.data.appId}
                    // {label: '是否清除跑批结果：', value: this._formatBeginHandle(result.data)},
                    // {label: '跑批过程出现异常时处理：', value: this._formatErrorHandle(result.data)}
                    // 跑批任务有 end
                ];
            },
            // 1查看日志
            handleViewLog (item, index, subItem, subIndex) {
                console.log(subItem, subIndex);
                switch (subIndex) {
                case 1: // 查看日志
                    this._goViewLog();
                    break;
                default:
                    return false;
                }
            },
            // 1查看更多日志  2查看任务监控
            handleViewAllLog (i) {
                console.log("查看更多日志");
                switch (i) {
                case 1: // 查看更多执行记录
                    this._goViewAllLog();
                    break;
                case 2: // 查看任务监控
                    this._goViewTaskWatch();
                    break;
                default:
                    return false;
                }
            },
            // 查看日志
            _goViewLog () {
                console.log("查看日志");
                this.$refs.dailyRecordDialog.handleDialogShow(this.routerQuery);
                this.dialogVisible = true; // 查看日志弹出框默显示
            },
            // 关闭日志
            closeDailyDialog () {
                this.dialogVisible = false;
            },
            // 查看更多执行记录
            _goViewAllLog () {
                console.log("查看更多执行记录");
                this.$refs.moreRecordDialog.handleDialogShow(this.routerQuery);
                this.moreRecordDialogVisible = true; // 查看更多执行记录弹出框显示
            },
            // 关闭更多执行记录
            moreReDialog () {
                console.log('1111111');
                this.moreRecordDialogVisible = false;
            },
            // 去到=>查看任务监控=>页面=>/watchManage/taskWatch?taskCode=XX&type=XX
            _goViewTaskWatch () {
                this.$router.push({
                    path: '/watchManage/taskWatch',
                    query: this.routerQuery
                });
            },
            handleBack (i) {
                console.log("返回");
                if (i === 1) {
                    if (this.pageFlag === "batchTasks") {
                        this.setPage("home");
                    } else if (this.pageFlag === "runManage") {
                        this.RMsetPage("home");
                    }
                } else if (i === 2) {
                    this.setPreview(false);
                } else if (i === 3) {
                    this.RMsetPreview(false);
                    this.RMsetPreview2(false);
                }
            },
            // 式化任务周期类型
            _formatTaskCycleType ({taskCycleType}) {
                let obj = this.taskCycleTypeDict.find(item => parseInt(item.keyValue) === parseInt(taskCycleType));
                return obj && obj.keyName;
            },
            _formatSearchCodeDict (keyValue) {
                let obj = this.searchCodeDict.find(item => parseInt(item.keyValue) === parseInt(keyValue));
                return obj && obj.keyName;
            },
            _formatConditionTypeDict (keyValue) {
                let obj = this.conditionTypeDict.find(item => parseInt(item.keyValue) === parseInt(keyValue));
                return obj && obj.keyName;
            },
            _formatRelationDict (keyValue) {
                let obj = this.relationDict.find(item => parseInt(item.keyValue) === parseInt(keyValue));
                return obj && obj.keyName;
            },
            // 格式化任务周期描述
            _formatTaskCycleDesc  (obj) {
                let {taskCycleType, triggerDate} = obj;
                // 任务周期名称
                if (parseInt(taskCycleType) === 3) { // 立即执行任务
                    return "";
                }
                if (parseInt(taskCycleType) === 1) { // 单次定时任务
                    return `${__formatTime(Number(triggerDate), "yyyy-MM-dd hh:mm:ss")}`;
                }
                return `${this._fn(obj)}`;

            },
            _fn ({taskTriggerType, triggerDay, triggerTime, triggerWeek, triggerHour, triggerMinute}) {
                switch (parseInt(taskTriggerType)) {
                case 1:
                    return `每月${triggerDay}日 ${triggerTime}`;
                case 2:
                    return `每2星期${triggerWeek} ${triggerTime}`;
                case 3:
                    return `每星期${triggerWeek} ${triggerTime}`;
                case 4:
                    return `每天${triggerTime}`;
                case 5:
                    return `每隔${triggerHour}小时`;
                case 6:
                    return `每隔${triggerMinute}分钟`;
                default:
                    return "";
                }
            },
            // 格式化数据选择条件
            _formatCondition ({conditionList}) {
                if (Array.isArray(conditionList)) {
                    let arr = [];
                    conditionList.forEach(({searchCode, conditionType, relation, searchVal1, searchVal2}) => {
                        let str = '';
                        let searchCode_ = this._formatSearchCodeDict(searchCode);
                        let conditionType_ = this._formatConditionTypeDict(conditionType);
                        let relation_ = this._formatRelationDict(relation);
                        str += `${searchCode_} ${conditionType_} ${searchVal1}`;
                        if (searchVal2) {
                            str += `-${searchVal2}`;
                        }
                        str += ` ${relation_}`;
                        arr.push(str);
                    });
                    return arr.join(";");
                }
            },
            _formatBeginHandle ({beginHandle}) {
                return ['', '全部清空', '部分清空', '不清除'][beginHandle];
            },
            _formatErrorHandle ({errorHandle}) {
                return ['', '终止并清空', '终止并保留', '不终止'][errorHandle];
            },
            _formatSpiltType ({spiltType, spiltNum, spiltStrip}) {
                if (Number(spiltType) === 1) {
                    return `${spiltNum}批次拆分`;
                }
                return `${spiltStrip}条病例/批次`;
            },
            ...mapMutations({
                setPage: 'setPage',
                RMsetPage: 'RMsetPage',
                setPreview: 'setPreview',
                RMsetPreview: 'RMsetPreview',
                RMsetPreview2: 'RMsetPreview2'
            })
        },
        components: { DailyRecordDialog, MoreRecordDialog}
    };
</script>
<style lang="scss" scoped>
    .wrap {
        min-width: 1150px;
        padding-right: 50px;
        box-sizing: border-box;
        .title {
            width: 144px;
            height: 32px;
            line-height: 45px;
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }
    }

    .list {
        padding-bottom: 13px;
        border-bottom: 1px solid #D8D8D8;
        &.mt {
            margin-top: 13px;
        }
    }

    .active {
        color: #4579C5;
        cursor: pointer;
    }
</style>


