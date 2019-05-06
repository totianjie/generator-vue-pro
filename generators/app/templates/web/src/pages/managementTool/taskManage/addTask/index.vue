<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/17
* @remark: 新建任务
-->
<template>
    <section class="add-task-wrap">
        <v-steps :active="active" class="step-wrap">
            <v-step title="新建任务"></v-step>
            <v-step title="执行中"></v-step>
        </v-steps>
        <div class="content">
            <component
                :is="temp"
                @cancel="handleCancel"
                @save="handleSave"
                @execute="handleExecute"
                @finish="handleFinish"
                :taskId="taskId"
            />
        </div>
    </section>
</template>

<script>

    const FirstStep = () => import(/* webpackChunkName: "group-managementTool" */ './FirstStep');
    const SuccessStep = () => import(/* webpackChunkName: "group-managementTool" */ './SuccessStep');
    export default {
        data () {
            return {
                temp: 'FirstStep',
                active: 1,
                taskId: -1 // 任务保存成功  后台返回的id
            };
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            taskId: {
                type: [Number],
                default: -1
            }
        },
        methods: {
            handleCancel () { // 点击取消后
                this.$emit('input', 'List');
            },
            handleSave () { // 保存点击后
                this.$emit('input', 'List');
            },
            handleExecute ({id}) { // 执行点击后
                console.log('==>.', id);
                this.taskId = id;
                this.temp = 'SuccessStep';

                this.active = 2;
            },
            handleFinish () { // 执行中页面里的完成按钮点击
                this.$emit('input', 'List');
            }
        },
        components: {FirstStep, SuccessStep}
    };
</script>

<style scoped lang="scss">
    .add-task-wrap {
        display: flex;
        flex-direction: column;
        .step-wrap {
            padding: 20px 15%;
        }
        .content {
            flex: 1;
            overflow: auto;
        }
    }
</style>
