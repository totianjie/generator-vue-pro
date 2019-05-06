<template>
    <div>
        {{test}}
        <head-view ref="headRef" :headTitle="headTitle" v-if="!DMIsAdd && !DMIsEdit" @resetPage="resetPage"></head-view>
        <div class="function-wrap" v-if="!DMIsAdd && !DMIsEdit">
            <el-button type="primary" @click="handlerAdd" :size="btnSize">新增</el-button>
        </div>
        <module-table class="data-manage-center-table" v-if="!DMIsAdd && !DMIsEdit" :columnTableList="columnTableList"></module-table>
        <v-paging
            :total="DMtotal"
            ref="Fpage"
            :currentPage="DMParameters.offset"
            :pageSize="DMParameters.limit"
            v-if="!DMIsAdd && !DMIsEdit"
            @pagingChange="handlePagingChange"
        ></v-paging>
        <add-or-edit-view v-if="DMIsAdd || DMIsEdit" :isEdit="DMIsEdit"></add-or-edit-view>
    </div>
</template>
<script type="text/ecmascript-6">
    const ModuleTable = () => import(/* webpackChunkName: "group-settingManage" */"./ModuleTable");
    const HeadView = () => import(/* webpackChunkName: "group-settingManage" */ "./head");
    const AddOrEditView = () => import(/* webpackChunkName: "group-settingManage" */ "./Add");
    import CONFIG from 'src/config';
    import columnList from './config.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('settingManage');
    export default {
        data () {
            return {
                columnTableList: [],
                total: 0,
                test: '',
                currentEditObj: {},
                headTitle: '业务名称',
                btnSize: CONFIG.baseBtn
            };
        },
        computed: {
            ...mapGetters(['DMSelectMenuIsTemp', 'DMdbList', 'DMParameters', 'DMIsDetail', 'DMIsEdit', 'DMIsAdd', 'DMtotal', 'DMSelectMenu'])
        },
        props: {
        },
        mounted () {
            try {
                console.log('mounted');
                // if (this.$refs.headRef) {
                //     console.log('mounted', this.DMSelectMenuIsTemp, this.DMSelectMenu);
                //     this.$refs.headRef.selectStatus(this.DMSelectMenuIsTemp || this.DMSelectMenu);
                // }
            } catch (error) {
                console.error(error);
            }
        },
        created () {
            let {_init} = this.$route.query;
            // if (_init) {
            if (1) {
                console.log(this.$store);
                this.DMreset();
                console.log("_init", _init);
                if (!this.DMIsEdit && !this.DMIsEdit) {
                    this.getDataBaseList();
                    this.getBussnissCode();
                    this.requestDataDM();
                }
            }
            this.columnTableList = columnList;
        },
        methods: {
            resetPage () {
                this.$refs.Fpage._init();
            },
            handlerAdd () {
                this.setDMIsEdit(false);
                this.setDMIsAdd(true);
            },
            handlePagingChange (data) {
                console.log(data);
                this.parameters = Object.assign({}, this.parameters, data);
                this.setDMParameters(data);
                this.requestDataDM();
            },
            ...mapMutations({
                setDMParameters: "setDMParameters",
                setDMIsDetail: "setDMIsDetail",
                setDMbussinessCodeList: 'setDMbussinessCodeList',
                setDMdbList: 'setDMdbList',
                setDMTableList: 'setDMTableList',
                setDMIsAdd: 'setDMIsAdd',
                setDMIsEdit: 'setDMIsEdit',
                setDMtotal: 'setDMtotal'
            }),
            ...mapActions(['DMreset', 'getBussnissCode', 'requestDataDM', 'getDataBaseList'])
        },
        filters: {
            
        },
        components: {HeadView, ModuleTable, AddOrEditView}
    };
</script>

<style scoped lang="scss">
    .data-manage-center-table {
        height: calc(100% - 156px);
    }
</style>
