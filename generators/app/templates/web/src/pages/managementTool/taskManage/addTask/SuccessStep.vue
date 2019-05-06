<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/17
* @remark: 执行状态
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
                <el-button @click="handleFinish" type="primary" :size="btnSize">完成</el-button>
            </el-col>
            <el-col :span="24">
                <v-item-detail :border="false" label="执行日志：" :pxUnit="true" :labelWidth="labelWidth">
                    <!--<span class="block text-ellipsis">V20180812</span>-->
                    <ul class="logs-wrap">
                        <li v-for="(item, index) in logs" :key="index">
                            <span>{{item.creatTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                            <p v-text="item.description"></p>
                        </li>
                    </ul>
                </v-item-detail>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    import {getTaskPlan} from 'js/api/managementTool/taskManage';

    export default {
        data () {
            return {
                btnSize: CONFIG.baseBtn,
                templetName: '',
                taskName: '',
                logs: []
            };
        },
        props: {
            taskId: {
                type: Number,
                default: -1
            }
        },
        created () {
            if (this.taskId === -1) {
                this.$toast(`taskId不对正：${this.taskId}`);
                return false;
            }
            getTaskPlan({taskId: this.taskId}).then(({data}) => {
                let {taskName, templetName, logs} = data;
                this.taskName = taskName;
                this.templetName = templetName;
                this.logs = Object.assign([], logs);
            });
        },
        methods: {
            handleFinish () {
                this.$emit('finish');
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
