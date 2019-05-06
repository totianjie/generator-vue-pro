<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/17
* @remark: 任务管理 详情页面
-->
<template>
    <section>
        <el-row>
            <el-col :span="8">
                <v-item-detail placement="bottom" :border="false" :tooltip="true" label="任务名称：" :pxUnit="true" :labelWidth="labelWidth">
                    <span class="block text-ellipsis" v-text="taskName"></span>
                    <div slot="content" class="tooltip-item" v-text="taskName"></div>
                </v-item-detail>
            </el-col>
            <el-col :span="8">
                <v-item-detail placement="bottom" :border="false" :tooltip="true" label="模板名称：" :pxUnit="true" :labelWidth="labelWidth">
                    <span class="block text-ellipsis" v-text="templetName"></span>
                    <div slot="content" class="tooltip-item" v-text="templetName"></div>
                </v-item-detail>
            </el-col>
            <el-col :span="8" class="btn-wrap">
                <el-button @click="handleBack" type="primary" :size="btnSize">返回</el-button>
            </el-col>
            <el-col :span="24">
                <v-item-detail placement="bottom" :border="false" :tooltip="true" label="任务号：" :pxUnit="true" :labelWidth="labelWidth">
                    <span class="block text-ellipsis">{{taskCode}}</span>
                    <div slot="content" class="tooltip-item">{{taskCode}}</div>
                </v-item-detail>
            </el-col>
            <el-col :span="24">
                <v-item-detail :border="false" label="执行列表：" :pxUnit="true" :labelWidth="labelWidth" style="padding-right: 10px;">
                    <el-table
                        height="350px"
                        style="width:100%; max-height: 350px;"
                        :size="tableSize"
                        :data="exeList"
                        border
                        :highlight-current-row="true"
                        :stripe="true"
                        @row-click="handleRowClick"
                    >
                        <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="executeBeginTime"
                            label="执行开始时间"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.executeBeginTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="executeEndTime"
                            label="执行结束时间"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.executeEndTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="执行状态"
                            prop="statusName"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                    </el-table>
                </v-item-detail>
            </el-col>
            <el-col :span="24">
                <v-item-detail :border="false" label="执行日志：" :pxUnit="true" :labelWidth="labelWidth">
                    <ul class="logs-wrap">
                        <li v-for="(item, index) in logs" :key="index">
                            <span>{{item.creatTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                            <p v-text="item.description"></p>
                        </li>
                    </ul>
                </v-item-detail>
            </el-col>
        </el-row>
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
                prop="index"
                label="序号"
                width="50"
            >
            </el-table-column>
            <el-table-column
                prop="sourceTable"
                label="源库表名称"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="sourceNum"
                label="源数据库需要导入量"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="targetTable"
                label="目标库表名称"
                show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
                prop="dataNum"
                show-overflow-tooltip
                label="目标库导入前数据量"
            >
            </el-table-column>
            <el-table-column
                prop="targetTable"
                show-overflow-tooltip
                label="实际导入表名称"
            >
            </el-table-column>
            <el-table-column
                label="目标库导入后数据量"
                prop="actualNum"
                show-overflow-tooltip
            >
            </el-table-column>
        </el-table>
        <v-item-detail :border="false" label="错误原因：" :pxUnit="true" :labelWidth="labelWidth">
            <p v-text="errorMsg"></p>
        </v-item-detail>
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    import {getTaskResult, exelist} from 'js/api/managementTool/taskManage';

    export default {
        data () {
            return {
                labelWidth: 100,
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.homeFormSize,
                templetName: '',
                taskName: '',
                taskCode: '',
                logs: [],
                errorMsg: '',
                tableData: [ // 表格数据
                ],
                exeList: [] // 执行列表
            };
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            taskId: {
                type: Number,
                default: -1
            }
        },
        created () {
            if (this.taskId === -1) {
                this.$toast('请传入taskId：', this.taskId);
                return false;
            }
            console.log('taskId==>', this.taskId);
            exelist({taskId: this.taskId}).then(({data}) => {
                let {taskName, templetName, taskCode, exeList} = data;
                this.exeList = exeList;
                this.taskName = taskName;
                this.taskCode = taskCode;
                this.templetName = templetName;
            });
        },
        methods: {
            handleBack () {
                this.$emit('input', 'List');
                this.$emit('update:taskId', -1);
            },
            handleRowClick ({taskExecuteId}, event, column) {
                getTaskResult({taskId: this.taskId, taskExecuteId}).then(({data}) => {
                    let {logs, errorMsg, synList} = data;
                    this.logs = Object.assign({}, logs);
                    this.errorMsg = errorMsg;
                    let arr = synList.map((item, index) => {
                        return {...item, index: ++index};
                    });
                    this.tableData = Object.assign([], arr);
                });
            }
        }
    };
</script>

<style scoped>
    .logs-wrap {
        max-height: 350px;
        overflow: auto;
    }

    .btn-wrap {
        text-align: right;
        padding-right: 50px;
        padding-top: 8px;
    }
</style>
