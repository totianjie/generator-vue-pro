<template>
    <div>
        {{test}}
        <div class="function-wrap" v-if="!YJIsAdd && !YJIsEdit">
            <el-button type="primary" @click="handlerAdd" :size="btnSize">新增</el-button>
        </div>
        <module-table class="task-manage-list-table" v-if="!YJIsAdd && !YJIsEdit"></module-table>
        <v-paging
            :total="YJtotal"
            ref="Fpage"
            :currentPage="YJParameters.offset"
            :pageSize="YJParameters.limit"
            v-if="!YJIsAdd && !YJIsEdit"
            @pagingChange="handlePagingChange"
        ></v-paging>
        <add-or-edit-view v-if="YJIsAdd || YJIsEdit"></add-or-edit-view>
    </div>
</template>
<script type="text/ecmascript-6">
    const ModuleTable = () => import(/* webpackChunkName: "group-settingManage" */"./ListTable");
    const AddOrEditView = () => import(/* webpackChunkName: "group-settingManage" */ "./Add");
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('settingManage');
    // import {getWarningList} from 'js/api/settingManage/warningList/warningList.js';
    export default {
        data () {
            return {
                test: '',
                currentEditObj: {},
                headTitle: '业务名称',
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
            ...mapGetters(['YJParameters', 'YJIsDetail', 'YJIsEdit', 'YJIsAdd', 'YJTableList', 'YJtotal'])
        },
        created () {
            let {_init} = this.$route.query;
            if (1) {
            // if (_init) {
                this.YJreset();
                console.log(this.$store);
                console.log("_init", _init);
                if (!this.YJIsEdit && !this.YJIsAdd) {
                    this.getWarningList();
                }
            }

        },
        methods: {
            handlerAdd () {
                this.setYJIsEdit(false);
                this.setYJIsAdd(true);
            },
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                this.setYJParameters(Object.assign({}, this.YJParameters, data));
                this.getWarningList();
            },
            handlerSearch (val) {
                console.log(val);
                this.setYJParameters(Object.assign({}, this.YJParameters, val));
                this.parameters.offset = 1;
                this.getWarningList();
                this.$refs.Fpage._init();
            },
            ...mapMutations({
                setYJParameters: "setYJParameters",
                setYJIsDetail: 'setYJIsDetail',
                setYJIsEdit: 'setYJIsEdit',
                setYJIsAdd: 'setYJIsAdd',
                setYJTableList: 'setYJTableList',
                setYJtotal: 'setYJtotal'
            }),
            ...mapActions(['YJreset', 'getWarningList'])
        },
        filters: {
            
        },
        components: {ModuleTable, AddOrEditView}
    };
</script>

<style scoped lang="scss">
    .task-manage-list-table {
        height: calc(100% - 108px);
    }
</style>
