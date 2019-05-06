<template>
    <section class="list-wrap">
        <section class="h-fill">
            <el-button @click="handlerAdd" type="primary" :size="btnSize" class="add-btn">新增</el-button>

            <list-table style="width: 100%"
                        @edit="handlerEdit"
                        @look="handleLook"
                        @command="handleCommand"
                        @priority="handlePriority"
                        @run="handlerRun"
                        @goOn="handlerGoOn"
                        @exit="handlerExit"
                        @suspend="handleSuspend"
                        @viewLog="handleViewLog"
                        @viewTask="handleViewTask"
                        :tableData="tableData"
                        :priorityList="priorityList"
                        :pageFlag="pageFlag"
                        :viewLogShow="true"
                        :operationWidth="250"
            />

            <v-paging
                class="footer-paging"
                :total="total"
                ref="Fpage"
                @pagingChange="handlePagingChange"
            ></v-paging>
        </section>
        <!-- 查看日志 -->
        <daily-record-dialog ref="dailyRecordDialog" v-model="dialogVisible" @closeDailyDialog="closeDailyDialog"/>
    </section>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex';
    const {mapMutations, mapState} = createNamespacedHelpers('taskManage');
    import CONFIG from 'src/config';
    import ListTable from './../components/ListTable';
    import {list, execute, update} from 'js/api/taskManage/batchTasks.js';
    import DailyRecordDialog from './../components/DailyRecordDialog';
    export default {
        data () {
            return {
                total: 0, // 分页总条数
                btnSize: CONFIG.homeBtn,
                listParams: { // 请求参数
                    offset: 1,
                    limit: CONFIG.limit
                },
                tableData: [],
                dialogVisible: false// 弹出框默认false
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
            ...mapState({
                taskPriorityDict: state => state.taskPriorityDict
            }),
            priorityList: function () { // 任务优先级下拉框数据
                let arr = [];
                this.taskPriorityDict.forEach((item) => {
                    arr.push({label: item.keyName, value: item.keyValue});
                });
                return arr;
            }
        },
        created () {
            this._getData();
        },
        methods: {
            async _getData () {
                let result = await list(this.listParams);
                let {data} = result;
                // taskCycleType, lastTaskStatus  以下为测试按钮显示代码
                // data.list.forEach((item) => {
                //     item.taskCycleType = "2";
                //     item.lastTaskStatus = "3";
                // });
                console.log(data.list);
                this.tableData = Object.assign([], data.list);
                this.total = data.total;

            },
            handlerAdd () {
                this.setIsEdit(false);
                this.setPage("add");
            },
            // 编辑
            handlerEdit (row) {
                console.log(row);
                this.setTaskCode(row.taskCode);
                this.setIsEdit(true);

                this.setPage("add");
                this.setAddStep(2);
            },
            // 查看
            handleLook (row) {
                this.setTaskCode(row.taskCode);
                this.setPage("detail");
                console.log(row);
            },
            // 任务状态  禁用  启用
            async handleCommand (row) {
                await update({taskCode: row.row.taskCode, enable: parseInt(row.item.value)});
                this._getData();
                console.log(row);
            },
            // 任务优先级
            async handlePriority (row) {
                await update({taskCode: row.row.taskCode, taskPriority: parseInt(row.item.value)});
                this._getData();
                console.log(row);
            },
            // 立即运行
            async handlerRun (row) {
                await execute({taskCode: row.taskCode});
                this._getData();
                console.log(row);

            },
            // 继续
            handlerGoOn (row) {
                console.log(row);
            },
            // 终止
            handlerExit (row) {
                console.log(row);
            },
            // 暂停
            handleSuspend (row) {
                console.log(row);
            },
            // 查看日志
            handleViewLog (row) {
                console.log("查看日志");
                this.dialogVisible = true; // 弹出框显示
                this.$refs.dailyRecordDialog.handleDialogShow({
                    type: this.pageFlag === "batchTasks" ? 1 : 2,
                    taskCode: row.taskCode,
                    executeCode: row.executeCode
                });
            },
            // 查看日志监控
            handleViewTask (row) {
                console.log("查看日志监控");
                this.$router.push({
                    path: '/watchManage/taskWatch',
                    query: {
                        type: 1, // type 为 1为批次 2 为跑批
                        taskCode: row.taskCode
                    }
                });
            },
            // 分页变化
            handlePagingChange (data) {
                this.listParams = Object.assign({}, this.listParams, data);
                this._getData();
            },
            // 关闭日志
            closeDailyDialog () {
                this.dialogVisible = false;
            },
            ...mapMutations({
                setPage: 'setPage',
                setAddStep: 'setAddStep',
                setTaskCode: 'setTaskCode',
                setIsEdit: 'setIsEdit'
            })
        },
        components: {
            ListTable,
            DailyRecordDialog
        }
    };
</script>
<style lang="scss" scoped>
    @import "./../../../scss/common";
    @import "./../../../scss/variables";

    .list-wrap {
        height: 100%;
        padding: 48px 0 52px;
        box-sizing: border-box;
        position: relative;
        .add-btn {
            position: absolute;
            left: 23px;
            top: 9px;
        }
        .footer-paging {
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
</style>


