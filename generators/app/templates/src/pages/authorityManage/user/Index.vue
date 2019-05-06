<!-- Created by TIANJIE on 2018/6/7 -->
<template>
    <div>
        <UserSearch v-if="!addShow && !detailShow" @search="handlerSearch"></UserSearch>
        <div class="function-wrap" v-if="!addShow && !detailShow">
            <el-button @click="handlerAdd" :size="btnSize">新增</el-button>
        </div>
        <user-table
            v-if="!addShow && !detailShow"
            :tableData="tableData"
            :total="total"
            @update="_getData(true)"
            @viewDetail="viewDetail"
            @edit="edit"
            class="user-table"
        ></user-table>
        <v-paging
            v-if="!addShow && !detailShow"
            :total="total"
            ref="Fpage"
            @pagingChange="handlePagingChange"
        ></v-paging>
        <add v-if="addShow" @update="_getData(true)" v-model="addShow" :isEdit="isEdit" :id="userId"></add>
        <detail v-if="detailShow" v-model="detailShow" :detailData="detailData" :id="userId"></detail>
    </div>
</template>
<script type="text/ecmascript-6">
    import UserSearch from './Search';
    import UserTable from './UserTable';
    import {getUserList} from 'js/api/authorityManage/user';
    import CONFIG from 'src/config';
    import Add from './Add';
    import Detail from './Detail';
    export default {
        props: {

        },
        data () {
            return {
                btnSize: CONFIG.homeBtn,
                tableData: [], // 表格数据
                total: 0, // 分页总条数
                addShow: false, // 新增，编辑 页面显示
                isEdit: false, // 是否是编辑
                detailShow: false, // 编辑页面显示
                userId: '', // 用户id ==>> 编辑和查看是用到
                listParams: {
                    userName: '',
                    userType: '',
                    status: '',
                    beginDate: '',
                    endDate: '',
                    offset: 1,
                    limit: CONFIG.limit
                },
                limitUser: []
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
                getUserList(this.listParams).then(res => {
                    let {list} = res.data;
                    this.tableData = list.map((item, index) => {

                        item.pertainRolesText = [];
                        item.pertainDataRolesText = [];
                        item.pertainRoles.forEach((role) => {
                            item.pertainRolesText.push(role.name);
                        });
                        item.pertainDataRoles.forEach((dataRole) => {
                            item.pertainDataRolesText.push(dataRole.name);
                        });
                        item.pertainRolesText = item.pertainRolesText.join('/');
                        item.pertainDataRolesText = item.pertainDataRolesText.join('/');
                        return item;
                    });
                    this.total = res.data.total;
                });
            },
            handlerAdd () { // 新增
                this.addShow = true;
                this.isEdit = false;
            },
            handlerSearch (form) { // 查询
                this.listParams = Object.assign({}, this.listParams, form);
                this.listParams.offset = 1;
                this._getData();
                this.$refs.Fpage._init();
            },
            // 分页变化
            handlePagingChange (data) {
                this.listParams = Object.assign({}, this.listParams, data);
                this._getData();
            },
            // 编辑
            edit ({id}) {
                this.userId = id;
                this.isEdit = true;
                this.addShow = true;
            },
            // 查看详情
            viewDetail ({id}) {
                this.userId = id;
                this.detailShow = true;
            }
        },
        components: {UserSearch, UserTable, Add, Detail}
    };
</script>
<style lang="scss" scoped>
    .user-table {
        height: calc(100% - 48px - 52px - 56px);
    }
</style>
