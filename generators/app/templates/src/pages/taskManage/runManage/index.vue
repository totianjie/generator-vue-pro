<!--  -->
<template>
    <section>
        <List-wrap v-if="page === 'home'" :pageFlag="pageFlag"/>
        <detail v-if="page === 'detail'" :pageFlag="pageFlag"/>
        <add-wrap v-if="page === 'add'" :pageFlag="pageFlag"/>
    </section>
</template>
<script>
    const ListWrap = () => import(/* webpackChunkName: "group-taskManage" */"./List.vue");
    const Detail = () => import(/* webpackChunkName: "group-taskManage" */"./../components/Detail.vue");
    const AddWrap = () => import(/* webpackChunkName: "group-taskManage" */"./AddWrap.vue");

    import {createNamespacedHelpers} from 'vuex';
    const {mapState, mapMutations} = createNamespacedHelpers('taskManage');

    import {getCommonDict, getBusiCode} from 'js/api/taskManage/common.js';

    export default {
        data () {
            return {
                // batchTasks(批次划分任务) runManage(跑批任务)
                pageFlag: 'runManage'
            };
        },
        computed: {
            ...mapState({
                page: state => state.RMpage,
                isInit: state => state.isInit
            })
        },
        created () {
            if (!this.isInit) {
                getCommonDict({type: '1;2;3;4;5;6'}).then(res => {
                    console.log("commonDict: ", res);
                    let dicts = res.data.dicts;
                    this.setDicts({key: "taskTypeDict", dict: dicts['1']});// 任务类型    1:任务类型下拉框
                    this.setDicts({key: "taskCycleTypeDict", dict: dicts['2']});// 任务周期类型   2:任务周期类型下拉框
                    this.setDicts({key: "taskPriorityDict", dict: dicts['3']}); // 任务优先级   3:任务优先级下拉框
                    this.setDicts({key: "searchCodeDict", dict: dicts['4']}); // 4:限制字段下拉框
                    this.setDicts({key: "conditionTypeDict", dict: dicts['5']}); // 限制条件   5:限制条件下拉框
                    this.setDicts({key: "relationDict", dict: dicts['6']});// 逻辑关系  6:限制逻辑关系下拉框
                });
                getBusiCode({enable: 0}).then(res => {
                    console.log("getBusiCode: ", res);
                    this.setDicts({key: "busiCodeDict", dict: res.data});
                });
                this.setIsInit(true);
            }
            this.RMsetPage();
            this.RMsetAddStep();
            this.RMsetPreview(false);
            this.RMsetPreview2(false);
        },
        mounted () {
        },
        methods: {
            ...mapMutations({
                RMsetPage: "RMsetPage",
                RMsetAddStep: "RMsetAddStep",
                setIsInit: 'setIsInit',
                setDicts: 'setDicts',
                RMsetPreview: 'RMsetPreview',
                RMsetPreview2: 'RMsetPreview2'
            })
        },
        components: {
            ListWrap,
            Detail,
            AddWrap
        }
    };
</script>

