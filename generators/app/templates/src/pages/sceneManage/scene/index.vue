<!-- 场景管理/场景列表 -->
<template>
    <section>
        <section class="page h-fill">
            <!-- <test /> -->
            <List-wrap v-if="listShow"/>
            <add v-if="addShow"/>
            <Detail v-if="detailShow"/>
            <FirstStep v-if="firstStepShow"/>
        </section>
    </section>
</template>
<script>
    const ListWrap = () => import(/* webpackChunkName: "group-sceneManage" */"./List.vue");
    const Add = () => import(/* webpackChunkName: "group-sceneManage" */"./components/Add.vue");
    const Detail = () => import(/* webpackChunkName: "group-sceneManage" */"./components/Detail.vue");
    const FirstStep = () => import(/* webpackChunkName: "group-sceneManage" */"./components/firstStep.vue");

    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapState} = createNamespacedHelpers('scene');
    import Test from './test';
    export default {
        data () {
            return {
            };
        },
        computed: {
            firstStepShow () {
                return (this.pageType === 'firstStep');
            },
            addShow () {
                return (this.pageType === 'add' || this.pageType === 'edit' || this.pageType === 'addCopy');
            },
            listShow () {
                return this.pageType === 'list';
            },
            detailShow () {
                return this.pageType === 'detail';
            },
            ...mapGetters(['pageType', 'paging']),
            ...mapState(['route'])
        },
        created () {
            // let {_init} = this.$route.query;
            // if (_init) {
            //     this.reset();
            //     this.getSceneList();
            // }
            this.reset();
            this.getSceneList();
        },
        mounted () {
        },
        methods: {
            ...mapActions(['setPaging', 'getSceneList', 'reset'])
        },
        components: {
            ListWrap,
            Add,
            Test,
            Detail,
            FirstStep
        }
    };
</script>

