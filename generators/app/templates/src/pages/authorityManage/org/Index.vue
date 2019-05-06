<!-- Created by TIANJIE on 2018/6/15 -->
<template>
    <div>
        <v-search
            v-if="!addShow && !isDetailShow"
            @search="handleSearch"
        ></v-search>
        <div class="function-wrap" v-if="!addShow && !isDetailShow">
            <el-button @click="handleAdd" :size="btnSize">新增</el-button>
        </div>
        <v-org-table
            v-if="!addShow && !isDetailShow"
            class="org-table"
            :tableData="orgList"
            @update="_getOrgList"
            @edit="handleEdit"
            @detail="handleDetail"
        ></v-org-table>
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
            :orgId="orgId"
            @update="_getOrgList"
        ></add>
        <detail
            v-if="isDetailShow"
            v-model="isDetailShow"
            :id="detailId"
        ></detail>
    </div>
</template>

<script>
    import VSearch from './Search';
    import VOrgTable from './OrgTable';
    import {getOrgList} from 'js/api/authorityManage/org';
    import Add from './Add';
    import Detail from './Detail';
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                total: 0,
                addShow: false,
                isEdit: false,
                isDetailShow: false,
                orgId: '',
                detailId: '',
                btnSize: CONFIG.homeBtn,
                getOrgListParams: {
                    name: '',
                    beginDate: '',
                    endDate: '',
                    offset: 1,
                    limit: CONFIG.limit

                },
                orgList: []
            };
        },
        created () {
            this._getOrgList();
        },
        methods: {
            // 获取表格数据
            _getOrgList () {
                getOrgList(this.getOrgListParams).then(res => {
                    this.total = res.data.total;
                    this.orgList = res.data.list;
                });
            },
            // 添加
            handleAdd () {
                this.addShow = true;
                this.isEdit = false;
            },
            // 编辑
            handleEdit (data) {
                this.addShow = true;
                this.isEdit = true;
                this.orgId = data.id;
            },
            // 查看详情
            handleDetail ({id}) {
                this.isDetailShow = true;
                this.detailId = id;
            },
            // 查询
            handleSearch (data) {
                this.getOrgListParams = Object.assign({}, this.getOrgListParams, data);
                this.getOrgListParams.offset = 1;
                this._getOrgList();
                this.$refs.Fpage._init();
            },
            // 分页改变
            handlePagingChange (data) {
                this.getOrgListParams = Object.assign({}, this.getOrgListParams, data);
                this._getOrgList();
            }
        },
        components: {VSearch, VOrgTable, Add, Detail}
    };
</script>

<style scoped lang="scss">
    .org-table {
        height: calc(100% - 48px - 56px - 52px);
    }
</style>
