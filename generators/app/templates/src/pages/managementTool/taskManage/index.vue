<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/14
* @remark: 任务管理
-->
<template>
    <section>
        <component
            :is="temp"
            class="page main"
            v-model="temp"
            :taskId.sync="taskId"
        />
        <!--<dev-test v-model="temp" style="position: absolute; right: 0; top: 0;"/>-->
    </section>
</template>

<script>
    const List = () => import(/* webpackChunkName: "group-managementTool" */ './list');
    const Detail = () => import(/* webpackChunkName: "group-managementTool" */ './detail');
    const AddTask = () => import(/* webpackChunkName: "group-managementTool" */ './addTask');
    import DevTest from './DevTest';

    export default {
        data () {
            return {
                temp: 'List',
                taskId: -1
            };
        },
        components: {List, Detail, AddTask, DevTest}
    };
</script>

<style scoped>
    .main {
        height: 100%;
    }
</style>
