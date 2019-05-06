<!-- Created by TIANJIE on 2018/6/7 -->
<template>
    <div>
        <UserSearch v-if="!addShow && !detailShow" @search="handlerSearch"></UserSearch>
        <div class="function-wrap" v-if="!addShow && !detailShow">
            <el-button @click="handlerAdd" :size="btnSize">新增</el-button>
        </div>
        <data-role-table
            v-if="!addShow && !detailShow"
            :tableData="dataRoleList"
            :total="total"
            :stripe="true"
            @update="_getData(true)"
            @detail="viewDetail"
            @edit="edit"
            class="user-table"
        ></data-role-table>
        <v-paging
            v-if="!addShow && !detailShow"
            :total="total"
            ref="Fpage"
            @pagingChange="handlePagingChange"
        ></v-paging>
        <add v-if="addShow" @update="_getData(true)" v-model="addShow" :isEdit="isEdit" :id="dataRoleId"></add>
        <detail v-if="detailShow" v-model="detailShow" :id="dataRoleId"></detail>
    </div>
</template>
<script type="text/ecmascript-6">
    import UserSearch from './Search';
    import DataRoleTable from './DataRoleTable';
    import { listData } from "js/api/authorityManage/dataRole";
    import CONFIG from 'src/config';
    import Add from './Add';
    import Detail from './Detail';

    export default {
        props: {},

        data () {
            return {
                btnSize: CONFIG.homeBtn,
                tableData: [], // 表格数据
                total: 0, // 分页总条数
                addShow: false, // 新增，编辑 页面显示
                isEdit: false, // 是否是编辑
                detailShow: false, // 编辑页面显示
                dataRoleId: '', // 用户id ==>> 编辑和查看是用到
                queryParams: { // 查询
                    name: '',
                    keyword: '',
                    beginDate: '',
                    endDate: '',
                    offset: 1, // 当前页变动时
                    limit: 20 // 每页只限20条
                },
                dataRoleList: []
            };
        },

        computed: {},

        watch: {},
        created () {
            this._getData(true);
        },
        methods: {
            // 获取表格数据
            _getData () {
                try {
                    listData(this.queryParams).then(res => {
                        this.dataRoleList = [];
                        this.total = res.data.total;
                        this.currentPage = res.data.pageNum;
                        this.pageSize = res.data.pageSize;
                        this.dataRoleList = res.data.list || [];
                    }).catch(err => {
                        console.log(err);
                    });
                } catch (err) {
                    console.error(err.name + err.reason);
                }
            },
            handlerAdd () { // 新增
                this.addShow = true;
                this.isEdit = false;
            },
            handlerSearch (form) { // 查询
                this.queryParams = Object.assign({}, this.queryParams, form);
                this.queryParams.offset = 1;
                this._getData();
                this.$refs.Fpage._init();
            },
            // 分页变化
            handlePagingChange (data) {
                this.queryParams = Object.assign({}, this.queryParams, data);
                this._getData();
            },
            // 编辑
            edit (data) {
                this.isEdit = true;
                this.addShow = true;
                this.dataRoleId = data.id;
            },
            // 查看详情
            viewDetail ({id}) {
                this.dataRoleId = id;
                this.detailShow = true;
            }
        },
        components: {UserSearch, DataRoleTable, Add, Detail}
    };
</script>
<style lang="scss" scoped>
    .user-table {
        height: calc(100% - 48px - 52px - 56px);
    }
</style>
