<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/19
* @remark:  
-->
<template>
    <div>
        <head-view :headTitle="headTitle" ref="headRef" @resetPage="resetPage" ></head-view>
        <module-table class="task-list-status-table"></module-table>
        <v-paging
            :total="total"
            :currentPage="parameters.offset"
            :pageSize="parameters.limit"
            ref="Fpage"
            v-if="!addShow && !isDetailShow"
            @pagingChange="handlePagingChange"
        ></v-paging>
    </div>
</template>
<script>
    const ModuleTable = () => import(/* webpackChunkName: "group-watchManage" */"./ModuleTable.vue");
    const HeadView = () => import(/* webpackChunkName: "group-watchManage" */"./head.vue");
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapState, mapMutations} = createNamespacedHelpers('watchManage');
    export default {
        data () {
            return {
                timer: Object,
                test: '',
                headTitle: '执行状态:',
                btnSize: CONFIG.baseBtn
            };
        },
        props: {
    
        },
        route: {
            // waitForData: true, //  数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
            canActivate: function (transition) {
                // canActivate阶段，可以做一些用户验证的事情(是否可以被激活)
                // 在验证阶段，当一个组件将要被切入的时候被调用。
            },
            activate: function (transition) {
                // 在激活阶段被调用，在 activate 被断定（ resolved ，指该函数返回的 promise 被 resolve ）。用于加载和设置当前组件的数据。(激活)
                // this.$root.$set('header',this.title);
                transition.next();
                // 此方法结束后，api会调用afterActivate 方法
                // 在aftefActivate中 会给组件添加 $loadingRouteData 属性 并设置为true
            },
            data: function (transition) {
               
            },
            canDeactivate: function (transition) {
                // 在验证阶段，当一个组件将要被切出的时候被调用。(是否可以被禁用)
            },
            deactivate: function (transition) {
                // 在激活阶段，当一个组件将要被禁用和移除之时被调用。(禁用)
            }
        },
        created () {
            let {_init} = this.$route.query;
            // if (_init) {
            console.log(_init);
            if (1) {

                console.log(this.$store);
                this.reset();
                console.log("_init");
            }
            let query = this.$route.query;
            if (query.taskCode) {
                this.setTaskCode(query.taskCode);
                this.setTaskName(query.taskName);
                this.setTaskType(query.type);
                this.setExcStatus("");
            }
            if (query.taskCode) {
                this.setIsShowAll(false);
            } else {
                if (this.taskName.length === 0) {
                    this.setIsShowAll(true);
                }
            }
            console.log(this.taskCode);
            console.log(this.excStatus);
            console.log(this.taskName);
            console.log(this.isShowAll);
            this.requestData();
        },
        mounted () {
            try {
                if (this.excStatus !== '') {
                    let objArr = this.statusEnum.filter(res => {
                        return res.excStatus + '' === this.excStatus + '';
                    }) || [];
                    let obj = objArr[0] || {};
                    console.log([obj]);
                    if (obj.name) {
                        this.$refs.headRef.selectStatus(obj.name);
                    }
                }
            } catch (error) {
                console.error("error", error);
            }
            this.reRunTimer();
        },
        computed: {
            ...mapGetters(['taskName', 'taskType', 'excStatus', 'parameters', 'list', 'statusEnum', 'taskCode', 'isShowAll', 'total']),
            ...mapState(['route'])
        },
        destroyed () {
            clearInterval(this.timer);
        },
        methods: {
            reRunTimer () {
                if (this.timer) {
                    try {
                        clearInterval(this.timer);
                    } catch (error) {
                        console.error("error", error);
                    }
                }
                try {
                    this.timer = setInterval(() => {
                        console.log(new Date().getTime());
                        try {
                            this.requestData();
                        } catch (error) {
                            console.log(new Date().getTime());
                            console.error("error", error);
                            clearInterval(this.timer);
                        }
                    }, 15000);
                } catch (error) {
                    console.error("error", error);
                }
            },
            resetPage () {
                this.$refs.Fpage._init();
                this.reRunTimer();
            },
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.setParameters(data);
                // this.parameters = Object.assign({}, this.parameters, data);
                this.requestData();
            },
            ...mapMutations({
                setTaskName: "setTaskName",
                setTaskType: "setTaskType",
                setExcStatus: 'setExcStatus',
                setParameters: 'setParameters',
                setTaskCode: 'setTaskCode',
                setIsShowAll: 'setIsShowAll',
                setList: 'setList',
                setTotal: 'setTotal',
                setStatusEnum: 'setStatusEnum'
            }),
            ...mapActions(['reset', 'requestData'])
        },
        filters: {
            
        },
        watch: {
            '$route' (to, from) {
                try {
                    let path = this.$route.path;
                    let query = this.$route.query;
                    console.log('watch-route', path, query);
                } catch (error) {
                    console.error(error.name, error.message);
                }
            }
        },
        components: {HeadView, ModuleTable}
    };
</script>

<style scoped lang="scss">
    .task-list-status-table {
        height: calc(100% - 100px);
    }
</style>
