<!-- Created by TIANJIE on 2018/6/7 -->
<template>
    <div class="mainView">
        <menu-search v-if="!addShow && !isDetailShow" @search="handlerSearch"></menu-search>
        <div class="function-wrap" v-if="!addShow && !isDetailShow">
            <el-button @click="handleAdd" :size="btnSize">新增</el-button>
        </div>
        <menu-table
            v-if="!addShow && !isDetailShow"
            class="menu-table"
            :tableData="menuList"
            @update="_getData"
            @edit="handleEdit"
            @detail="handleDetail"
            @del ="handleDel"
        ></menu-table>
        <v-paging
            :total="total"
            ref="Fpage"
            v-if="!addShow && !isDetailShow"
            @pagingChange="handlePagingChange"
        ></v-paging>
        <add
            v-if="addShow"
            v-model="addShow"
            :isEdit="isEdit"
            :menuId="menuId"
            @update="_getData"
        ></add>
        <detail
            v-if="isDetailShow"
            v-model="isDetailShow"
            :id="detailId"
        ></detail>
    </div>
</template>
<script type="text/ecmascript-6">
    import MenuSearch from './Search';
    import CONFIG from 'src/config';
    import {getMenuList, deleteMenu} from "js/api/authorityManage/menu";
    import MenuTable from './MenuTable';
    import Add from './Add';
    import Detail from './Detail';

    export default {
        props: {},

        data () {
            return {
                btnSize: CONFIG.homeBtn,
                menuList: [],
                menuId: -1,
                detailId: -1,
                // 用于做删除入修改
                addShow: false,
                isDetailShow: false,
                total: 0,
                isEdit: false,
                listParams: {
                    limit: CONFIG.limit,
                    offset: 1
                }
            };
        },

        computed: {},

        watch: {
            addShow (newB, oldB) {
                if (!newB) {
                }
            }
        },
        mounted () {
            this._getData();
        },
        methods: {
            _getData () {
                getMenuList(this.listParams).then(res => {
                    let {list, total} = res.data;
                    this.total = total;
                    list.forEach((item, index) => {
                        item.enableText = item.enable ? '启用' : '禁用';
                        item.typeText = item.type === '1' ? '菜单' : item.type === '2' ? '按钮' : '';
                    });
                    this.menuList = res.data.list;
                });
            },
            handleAdd () {
                this.addShow = true;
                this.isEdit = false;
            },
            // 编辑
            handleEdit (data) {
                this.menuId = data.id;
                this.addShow = true;
                this.isEdit = true;

            },
            handlerSearch (data) {
                this.listParams = Object.assign({}, this.listParams, data);
                this.listParams.offset = 1;
                this._getData();
                this.$refs.Fpage._init();
            },
            // 删除
            handleDel (data) {
                this._$confirm({ content: "确定删除该条菜单信息吗?" }).then(res => {
                    // 调删除接口
                    deleteMenu({id: data.id}).then(res => {
                        this._getData();
                    });
                }).catch(() => {
                });
            },
            handleDetail (data) {
                
                this.addShow = false;
                this.isDetailShow = true;
                this.detailId = data.id;
            },
            // 分页
            handlePagingChange (data) {
                this.listParams = Object.assign({}, this.listParams, data);
                this._getData();
            }
        },
        components: {MenuTable, Add, Detail, MenuSearch}
    };
</script>
<style lang="scss" scoped>
    .menu-table {
        height: calc(100% - 48px - 52px  - 57px);
    }
</style>
