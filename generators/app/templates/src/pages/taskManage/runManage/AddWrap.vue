<template>
    <section class="page h-fill">
        <add-first
            class="h-fill"
            v-if="addStep === 1"
            @cancel="cancelHandler"
            @ok="okHandler"
            :pageFlag="pageFlag"
        />
        <add-second
            class="h-fill"
            v-else
            @cancel="cancelHandler"
            @ok="okHandler"
            :pageFlag="pageFlag"
            :addParams="addParams"
        />
        <detail v-if="RMpreview" class="my-detail" pageFlag="runManage"/>
        <detail v-if="RMpreview2" class="my-detail" pageFlag="batchTasks"/>
    </section>
</template>
<script>
    const AddFirst = () => import(/* webpackChunkName: "group-taskManage" */"./../components/AddFirst.vue");
    const AddSecond = () => import(/* webpackChunkName: "group-taskManage" */"./../components/AddSecond.vue");
    const Detail = () => import(/* webpackChunkName: "group-taskManage" */"./../components/Detail.vue");
    import {createNamespacedHelpers} from 'vuex';

    const {mapGetters, mapMutations} = createNamespacedHelpers('taskManage');

    import {add, get, update} from 'js/api/taskManage/runManage.js';
    export default {
        data () {
            return {
                addParams: {}, // 提交给后台的数据
                addParamsTemp: { // 数据模版
                    "taskImpl": "", // 任务实体类
                    "appId": "", // appId String
                    "beginHandle": "", // 开始之前是否操作前一次跑批结果（1全部清除 2不清除） Integer
                    "enable": "", // 是否启用状态(1:启用 0禁用) Integer
                    "errorHandle": "", // 异常处理（1 不终止任务2 终止并清空数据 3 终止并保留已跑数据） Integer
                    "remark": "", // 任务备注 String
                    "splitTaskCode": "", // 批次划分任务编码 String
                    "taskBeginTime": "", // 开始时间 String
                    "taskCode": "", // 任务code String
                    "taskCycleType": "", //  任务周期类型 Integer
                    "taskEndTime": "", // 结束时间 String
                    "taskName": "", // 任务名称 String
                    "taskParam": "", // 任务参数 String
                    "taskPriority": "1", // 优先级 Integer
                    "taskTimeout": "", // 超时时间(单位：秒) Integer
                    "taskTriggerType": "", // 周期类型（1 每月 2 每两周 3每星期 4 每天 5 每小时 6 每分钟 ） Integer
                    "taskTypeCode": "", // 任务类型编码 String
                    "triggerDate": "", // 触发时间 （格式2018-02-21） String
                    "triggerDay": "", // 每月的日期 Integer
                    "triggerHour": "", // 小时 Integer
                    "triggerMinute": "", // 分钟 Integer
                    "triggerTime": "", // 触发时间（格式 10:80） String
                    "triggerWeek": "" //  星期几（ 1 星期日 、2 星期1 ......）Integer
                }
            };
        },
        props: {
            pageFlag: { // batchTasks(批次划分任务) runManage(跑批任务)
                type: String,
                default: function () {
                    return "";
                }
            }
        },
        computed: {
            ...mapGetters({
                addStep: 'RMaddStep',
                isEdit: 'RMisEdit',
                taskCode: 'RMtaskCode',
                RMpreview: 'RMpreview',
                RMpreview2: 'RMpreview2'
            })
        },
        created () {
            console.log(`是否编辑: ${this.isEdit}`);
            if (this.isEdit) {
                get({taskCode: this.taskCode}).then(({data}) => {
                    if (data) {
                        this.addParams = Object.assign({}, data);
                    } else {
                        this.addParams = JSON.parse(JSON.stringify(this.addParamsTemp));
                    }
                });
            }
        },
        methods: {
            // 取消
            cancelHandler ({step}) { // first second
                console.log(`${step}: cancel`);
                switch (step) {
                case "first":
                    this._firstCancel().then(() => {
                        this.RMsetPage('home');
                    });

                    break;
                case "second":
                    this._secondCancel().then(() => {
                        this.RMsetPage('home');
                        this.RMsetAddStep(1);
                    });
                    break;
                default:
                    return false;
                }
            },
            // 确定
            okHandler ({step, isAddTaskTemp, result}) { // first second
                console.log(`${step}: ok`);
                switch (step) {
                case "first":
                    this._firstOk(isAddTaskTemp, result).then(() => {
                        this.RMsetAddStep(2);
                    });
                    break;
                case "second":
                    this._secondOk().then(() => {
                        this.RMsetPage('home');
                        this.RMsetAddStep(1);
                    });
                    break;
                default:
                    return false;
                }
            },
            async _firstCancel () {

            },
            async _firstOk (isAddTaskTemp, result) {
                console.log(isAddTaskTemp, result);
                if (isAddTaskTemp) {
                    this.addParams = Object.assign({}, result);
                } else {
                    this.addParams = JSON.parse(JSON.stringify(this.addParamsTemp));
                }
                console.log(this.addParams);
            },
            async _secondCancel () {

            },
            async _secondOk () {
                if (this.isEdit) {
                    return new Promise((resolve, reject) => {
                        // 逻辑代码...
                        update(this.addParams).then(() => {
                            resolve();
                        });
                    });
                }
                await add(this.addParams).then(() => {});
            },
            ...mapMutations(['RMsetAddStep', 'RMsetPage', 'setTaskCode', 'RMsetPreview'])
        },
        components: {AddFirst, AddSecond, Detail}
    };
</script>
<style lang="scss" scoped>
    .my-detail {
        position: absolute;
        top: 0;
        background: #fff;
        left: 0;
        right: 0;
    }
</style>

