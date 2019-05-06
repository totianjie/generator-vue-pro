<template>
    <div>
        <div class="function-wrap" v-if="isList">
            <el-button type="primary" @click="setPageType('add')" :size="btnSize">新增</el-button>
        </div>
        <module-table class="safe-manage-list-table" v-if="isList"></module-table>
        <v-paging
            :total="Parameters.total"
            ref="Fpage"
            :currentPage="Parameters.offset"
            :pageSize="Parameters.limit"
            v-if="isList"
            @pagingChange="handlePagingChange"
        ></v-paging>
        <add-view v-if="isAdd"></add-view>
        <detail-view v-if="isDetail"></detail-view>
    </div>
</template>
<script type="text/ecmascript-6">
    const ModuleTable = () => import(/* webpackChunkName: "group-safeManage" */"./ListTable");
    const AddView = () => import(/* webpackChunkName: "group-safeManage" */ "./Add");
    const DetailView = () => import(/* webpackChunkName: "group-safeManage" */ "./Detail");

    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('safeManage');
    export default {
        data () {
            return {
                test: '',
                btnSize: CONFIG.baseBtn
            };
        },
        props: {
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            }
        },
        computed: {
            isAdd () {
                return (this.pageType === 'add');
            },
            isDetail () {
                return (this.pageType === 'detail');
            },
            isList () {
                return (this.pageType === 'list');
            },
            ...mapGetters(['pageType', 'Parameters'])
        },
        created () {
            let {_init} = this.$route.query;
            // if (1) {
            if (_init) {
                this.reset();
                console.log(this.$store);
                console.log("_init", _init);
                this.getList();
                this.setPageType('list');
            }
        },
        methods: {
            handlePagingChange (data) {
                this.setParameters(data);
                console.log('handlePagingChange', data);
            },
            handlerSearch (val) {
                console.log(val);
                this.parameters.offset = 1;
                this.$refs.Fpage._init();
            },
            ...mapMutations(['setPageType', 'setParameters']),
            ...mapActions(['reset', 'getList'])
        },
        filters: {
            
        },
        components: {ModuleTable, AddView, DetailView}
    };
</script>

<style scoped lang="scss">
    .safe-manage-list-table {
        height: calc(100% - 108px);
    }
</style>
