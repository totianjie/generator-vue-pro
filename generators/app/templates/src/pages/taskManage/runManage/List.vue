<template>
    <section class="list-wrap">
        <section class="h-fill">
            <el-button @click="handlerAdd" type="primary" :size="btnSize" class="add-btn">新增</el-button>
            <div class="search-wrapper">
                <v-search-box>
                    <v-input :pxUnit="true" :labelWidth="130" label="业务名称：">
                        <v-select
                            style="width: 300px;"
                            :size="formSize"
                            :props="listProps"
                            v-model="val"
                            :list="selectList"
                            placeholder="请选择业务名称"
                            :filterable="true"
                            class="select-box"
                        />
                    </v-input>
                    <div slot="btn">
                        <el-button @click="handlerSearch" type="primary" :size="btnSize">查询</el-button>
                    </div>
                </v-search-box>
            </div>
            <list-table style="width: 100%"
                        @edit="handlerEdit"
                        @look="handleLook"
                        @command="handleCommand"
                        @priority="handlePriority"
                        @run="handlerRun"
                        @goOn="handlerGoOn"
                        @exit="handlerExit"
                        @suspend="handleSuspend"
                        @resultPre="handleResultPre"
                        @viewLog="handleViewLog"
                        @viewTask="handleViewTask"
                        :goOnShow="true"
                        :exitShow="true"
                        :suspendShow="true"
                        :resultPreShow="true"
                        :viewLogShow="true"
                        :viewTaskShow="true"
                        :tableData="tableData"
                        :priorityList="priorityList"
                        :pageFlag="pageFlag"
                        :operationWidth="480"

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
    import {list, execute, update} from 'js/api/taskManage/runManage.js';
    import {getBusiCode} from 'js/api/taskManage/common.js';
    import DailyRecordDialog from './../components/DailyRecordDialog';
    export default {
        data () {
            return {
                total: 0, // 分页总条数
                btnSize: CONFIG.homeBtn,
                formSize: CONFIG.homeFormSize,
                listParams: { // 请求参数
                    offset: 1,
                    limit: CONFIG.limit
                },
                val: "",
                listProps: {name: 'keyName', value: 'keyValue'},
                tableData: [],
                busiCodeDict: [],
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
            selectList: function () { // 业务编码
                let arr = [];
                this.busiCodeDict.forEach((item) => {
                    console.log('item', item);
                    arr.push({keyName: item.busiName, keyValue: item.busiCode});
                });
                return arr;
            },
            priorityList: function () { // 任务优先级下拉框数据
                let arr = [];
                this.taskPriorityDict.forEach((item) => {
                    arr.push({label: item.keyName, value: item.keyValue});
                });
                return arr;
            }
        },
        created () {
            getBusiCode({enable: 0}).then(res => {
                console.log("getBusiCode: ", res);
                this.busiCodeDict = Object.assign([], res.data);
            });
            this._getData();
        },
        methods: {
            async _getData () {
                let result = await list({...this.listParams, busiCode: this.val ? this.val : ""});
                let {data} = result;
                // taskCycleType, lastTaskStatus
                // data.list.forEach((item) => {
                //     item.taskCycleType = "2";
                //     item.lastTaskStatus = "2";
                // });
                this.tableData = Object.assign([], data.list);
                this.total = data.total;
            },
            handlerAdd () {
                this.RMsetIsEdit(false);
                this.RMsetPage("add");
            },
            // 查询
            handlerSearch () {
                console.log("查询");
                this._pagingInit();
                this._getData();
            },
            // 编辑
            handlerEdit (row) {
                console.log(row);
                this.RMsetIsEdit(true);
                this.RMsetTaskCode(row.taskCode);
                this.RMsetPage("add");
                this.RMsetAddStep(2);
            },
            // 查看
            handleLook (row) {
                this.RMsetTaskCode(row.taskCode);
                this.RMsetPage("detail");
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
                await execute({taskCode: row.taskCode, operType: "1"}); // operType(执行（1 执行 2 停止 3 终止 4 继续 5 再次重跑）)
                this._getData();
                console.log(row);
            },
            // 继续
            async handlerGoOn (row) {
                await execute({taskCode: row.taskCode, operType: "4"}); // operType(执行（1 执行 2 停止 3 终止 4 继续 5 再次重跑）)
                this._getData();
                console.log(row);
            },
            // 终止
            async handlerExit (row) {
                await execute({taskCode: row.taskCode, operType: "3"}); // operType(执行（1 执行 2 停止 3 终止 4 继续 5 再次重跑）)
                this._getData();
                console.log(row);
            },
            // 暂停
            async handleSuspend (row) {
                await execute({taskCode: row.taskCode, operType: "2"}); // operType(执行（1 执行 2 停止 3 终止 4 继续 5 再次重跑）)
                this._getData();
                console.log(row);
            },
            // 重跑前次任务
            async handleResultPre (row) {
                await execute({taskCode: row.taskCode, operType: "5"}); // operType(执行（1 执行 2 停止 3 终止 4 继续 5 再次重跑）)
                this._getData();
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
                console.log("查看日志监控", row);
                this.$router.push({
                    path: '/watchManage/taskWatch',
                    query: {
                        type: 2, // type 为 1为批次 2 为跑批
                        taskName: row.taskName,
                        taskCode: row.taskCode
                    }
                });
            },
            // 分页变化
            handlePagingChange (data) {
                this.listParams = Object.assign({}, this.listParams, data);
                this._getData();
            },
            _pagingInit () {
                this.$refs.Fpage._init();
                this.listParams = { // 请求参数
                    offset: 1,
                    limit: CONFIG.limit
                };
            },
            // 关闭日志
            closeDailyDialog () {
                this.dialogVisible = false;
            },
            ...mapMutations({
                RMsetPage: 'RMsetPage',
                RMsetAddStep: 'RMsetAddStep',
                RMsetTaskCode: 'RMsetTaskCode',
                RMsetIsEdit: 'RMsetIsEdit'
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
        padding: 104px 0 52px;
        box-sizing: border-box;
        position: relative;
        .add-btn {
            position: absolute;
            left: 23px;
            top: 63px;
        }
        .search-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border-bottom: 10px solid #EFF2F6;
        }
        .footer-paging {
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
</style>


