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
        <detail v-if="preview" class="my-detail" :pageFlag="pageFlag"/>
    </section>
</template>
<script>
    const AddFirst = () => import(/* webpackChunkName: "group-taskManage" */"./../components/AddFirst.vue");
    const AddSecond = () => import(/* webpackChunkName: "group-taskManage" */"./../components/AddSecond.vue");
    const Detail = () => import(/* webpackChunkName: "group-taskManage" */"./../components/Detail.vue");
    import {createNamespacedHelpers} from 'vuex';

    const {mapGetters, mapMutations} = createNamespacedHelpers('taskManage');

    import {add, get, update} from 'js/api/taskManage/batchTasks.js';

    export default {
        data () {
            return {
                addParams: {}, // 提交给后台的数据
                addParamsTemp: { // 数据模版
                    "taskImpl": "", // 任务实体类
                    "busiCode": "", // 业务编码 String
                    "conditionList": [ // 限制条件 Array
                        // {
                        //     "searchCode": "", // 限制编码 String
                        //     "conditionType": "", // 限制条件 String
                        //     "relation": "", // 逻辑关系 Integer
                        //     "searchVal1": "", // 筛选值1 String
                        //     "searchVal2": "" // 筛选值2 String
                        // }
                    ],
                    "enable": "", // 是否启用状态(1:启用 0禁用) Integer
                    "remark": "", // 任务备注 备注
                    "spiltNum": "", // 拆分数量 Integer
                    "spiltStrip": "", // 拆分条数 Integer
                    "spiltType": "", // 拆分类型（1指定数量 2 指定批次数） Integer
                    "taskBeginTime": "", // 开始时间 String
                    "taskCode": "", // 任务code String
                    "taskCycleType": "", // 任务周期类型 Integer
                    "taskEndTime": "", // 结束时间 String
                    "taskName": "", // 任务名称 String
                    "taskParam": "", // 任务参数 String
                    "taskPriority": "1", // 优先级 Integer
                    "taskTimeout": "", // 超时时间(单位：秒) Integer
                    "taskTriggerType": "", // 周期类型（1 每月 2 每两周 3每星期 4 每天 5 每小时 6 每分钟 ）Integer
                    "taskTypeCode": "", // 任务类型编码 String
                    "triggerDay": "", //  每月的日期  Integer
                    "triggerHour": "", // 小时 Integer
                    "triggerMinute": "", // 分钟 Integer
                    "triggerDate": "", // 触发时间 （格式2018-02-21） String
                    "triggerTime": "", // 触发时间（格式 10:80）String
                    "triggerWeek": "" // 星期几（ 1 星期日 、2 星期1 ......）Integer
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
                addStep: 'addStep',
                isEdit: 'isEdit',
                taskCode: 'taskCode',
                preview: 'preview'
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
                        this.setPage('home');
                    });
                    break;
                case "second":
                    this._secondCancel().then(() => {
                        this.setPage('home');
                        this.setAddStep(1);
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
                        this.setAddStep(2);
                    });
                    break;
                case "second":
                    this._secondOk().then(() => {
                        this.setPage('home');
                        this.setAddStep(1);
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
                    let text = '此修改在下一次任务执行时生效，修改配置可能会造成与本任务关联的跑批任务场景变化, 如场景有变动请及时修改!';
                    let title = '提示';
                    return new Promise((resolve, reject) => {
                        this._$confirm({content: text, title}).then(() => {
                        // 逻辑代码...
                            update(this.addParams).then(() => {
                                resolve();
                            });
                        }).catch(() => {
                            reject();
                        });
                    });
                }
                await add(this.addParams).then(() => {});
            },
            ...mapMutations(['setAddStep', 'setPage'])
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

