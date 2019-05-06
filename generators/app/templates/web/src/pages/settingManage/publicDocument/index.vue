<!--
* @Author: GOTINTIN
* @Date: 2019-1-22
* @remark: 公用模块
-->
<template>
    <section>
        <task-list v-model="page" v-if="bSing" :isDaily.sync="isDaily"/>
        <daily-list v-model="page" v-else :isDaily="isDaily"/>
    </section>
</template>
<script type="text/ecmascript-6">
    import DailyList from './DailyList';
    import TaskList from './TaskList';
    export default {
        data () {
            return {
                isDaily: true,
                page: 'task'// 任务页面task   日志查看页面daily
            };
        },
        computed: {
            bSing () {
                return this.page === 'task';
            }
        },
        methods: {

        },
        components: {DailyList, TaskList}
    };
</script>
<style lang="scss" scoped>
</style>
