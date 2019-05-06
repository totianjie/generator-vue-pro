<!--
* @Author: Nelson
* @Date: 2019/4/9
* @remark: 场景规则/规则管理
-->
<template>
    <div>
        <!--查询区-->
        <!-- isDev:{{isDev}}
        isList:{{isList}}
        isAdd:{{isAdd}}
        isDetail:{{isDetail}}
        isEdit:{{isEdit}} -->
        <search class="search-class" @search="handlerSearch" v-if="isList"></search>
        <!--列表区-->
        <rule-table class="rule-table" v-if="isList"></rule-table>
        <!--分页区-->
        <v-paging @pagingChange="handlePagingChange" ref="bPages" v-if="isList"></v-paging>
        <!--编辑区-->
        <med-edit v-if="!isDev && isEdit"></med-edit>
        <dev-edit v-if="isDev && isEdit"></dev-edit>
        <dev-add v-if="isDev && isAdd"></dev-add>
        <detail v-if="isDetail"></detail>
    </div>
</template>
<script type="text/ecmascript-6">
    // import CONFIG from 'src/config';
    const Search = () => import(/* webpackChunkName: "group-sceneManage" */'./Search');
    const RuleTable = () => import(/* webpackChunkName: "group-sceneManage" */'./RuleTable');
    const MedEdit = () => import(/* webpackChunkName: "group-sceneManage" */'./MedEdit');
    const DevEdit = () => import(/* webpackChunkName: "group-sceneManage" */'./DevEdit');
    const DevAdd = () => import(/* webpackChunkName: "group-sceneManage" */'./DevAdd');
    const Detail = () => import(/* webpackChunkName: "group-sceneManage" */'./Detail');

    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('scene/rule');
    export default {
        data () {
            return {
                pageType: ''
            };
        },
        created () {
            let {_init} = this.$route.query;
            if (_init) {
            // if (1) {
                console.log(_init);
                console.log("_init");
                let path_ = this.$route.path;
                if (path_.indexOf('ruleDev') !== -1) {
                    this.setCurrent('dev');
                    this.resetDev();
                    // this.setDevPageSatus("edit");

                } else {
                    this.setCurrent('med');
                    this.resetMed();
                    // this.setMedPageSatus("edit");
                }
            }
            if (this.isList) {
                this.getList();
            }
            this.getRuleClassTree();

        },
        computed: {
            isDev () {
                return this.CurrentPage !== 'med';
            },
            isAdd () {
                return (this.MedPageSatus === 'add' && this.CurrentPage === 'med') || (this.DevPageSatus === 'add' && this.CurrentPage === 'dev');
            },
            isEdit () {
                return (this.MedPageSatus === 'edit' && this.CurrentPage === 'med') || (this.DevPageSatus === 'edit' && this.CurrentPage === 'dev');
            },
            isDetail () {
                return (this.MedPageSatus === 'detail' && this.CurrentPage === 'med') || (this.DevPageSatus === 'detail' && this.CurrentPage === 'dev');
            },
            isList () {
                return (this.MedPageSatus === 'list' && this.CurrentPage === 'med') || (this.DevPageSatus === 'list' && this.CurrentPage === 'dev');
            },
            ...mapGetters(['MedPageSatus', 'DevPageSatus', 'CurrentPage'])
        },
        watch: {
            '$route' (to, from) {
                let path_ = this.$route.path;
                if (path_.indexOf('ruleDev') !== -1) {
                    this.setCurrent('dev');
                    
                } else {
                    this.setCurrent('med');
                }
                if (this.isList) {
                    this.getList();
                }
                this.getRuleClassTree();
            }
        },
        mounted () {},

        methods: {
            // 查询
            handlerSearch (data) {
                console.log('data查询', data);
            },
            // 编辑
            handlerEdit (data) {
                console.log('row编辑', data);
                this.isEdit = true;
            },
            // 分页改变
            handlePagingChange (data) {
                this.tableParams = Object.assign({}, this.tableParams, data);
            },
            ...mapMutations(['setDevPageSatus', 'setMedPageSatus']),
            ...mapActions(['setCurrent', 'resetMed', 'resetDev', 'getList', 'getRuleClassTree'])
        },

        components: {Search, RuleTable, MedEdit, DevEdit, DevAdd, Detail}
    };
</script>
<style lang="scss" scoped>
    .search-class{
        height: 88px;
    }
    .rule-table{
        height: calc(100% - 88px - 52px);
    }
</style>
