<!--
* @Author: Nelson
* @Date: 2019-01-24
* @remark: 保险管理
-->
<template>
    <section>
        <section class="page h-fill">
            <div class="function-wrap2" v-if="!addShow">
                <el-button type="primary" @click="handlerAdd" :size="btnSize">新增</el-button>
                <el-button type="primary" @click="handlerAudit" :size="btnSize">审核</el-button>
                <el-button type="primary" @click="handlerDel" :size="btnSize">删除</el-button>
            </div>
            <list-table class="business-list-table" v-if="!addShow" :multipleSelection="multipleSelection" :tableData ="tableData" @edit="edit" @update="update" @select="select"></list-table>
            <v-paging
                :total="total"
                ref="Fpage"
                v-if="!addShow"
                @pagingChange="handlePagingChange"
            ></v-paging>
            <add-or-edit-view v-if="addShow" :isEdit="isEdit" @back="back" :currentEditObj="currentEditObj" :columnTableList="columnTableList" @update="update"></add-or-edit-view>
        </section>
    </section>
</template>
<script>
    import CONFIG from 'src/config';
    import listTable from './listTable';
    import {dataAudit, getList, dataDelete} from "js/api/shangbao/businessManage.js";
    import AddOrEditView from './Add';
    export default {
        data () {
            return {
                test: '',
                multipleSelection: [],
                btnSize: CONFIG.baseBtn,
                addShow: false,
                isEdit: false,
                parameters: {
                    limit: 20,
                    offset: 1
                },
                tableData: []
            };
        },
        created () {
            this.requestData();
        },
        mounted () {
          
        },
        methods: {
            update (info_) {
                this.isEdit = false;
                this.addShow = false;
                this.requestData();
            },
            select (val) {
                this.multipleSelection = val;
            },
            edit (data) {
                this.isEdit = true;
                this.addShow = true;
                this.currentEditObj = data;
            },
            back (result_) {
                this.addShow = false;
            },
            handlerAdd () {
                this.isEdit = false;
                this.addShow = true;
            },
            handlerAudit () { // 审核
                if (this.multipleSelection.length === 0) {
                    this.$toast("请先勾选");
                    return;
                }
                let ids = this.multipleSelection.map(res => {
                    return res.id;
                });
                let requestData = {ids: ids.join(',')};
                dataAudit(requestData).then(res => {
                    this.multipleSelection = [];
                    this.requestData();
                // eslint-disable-next-line handle-callback-err
                }).catch((err) => {
        
                });
            },
            handlerDel () { // 删除
                if (this.multipleSelection.length === 0) {
                    this.$toast("请先勾选");
                    return;
                }
                let ids = this.multipleSelection.map(res => {
                    return res.id;
                });
                let requestData = {ids: ids.join(',')};
                dataDelete(requestData).then(res => {
                    this.multipleSelection = [];
                    this.requestData();
                // eslint-disable-next-line handle-callback-err
                }).catch((err) => {
        
                });
            },
            handlePagingChange (data) {
                this.parameters = Object.assign({}, this.parameters, data);
                this.requestData();
            },
            requestData () {
                getList(this.parameters).then(res => {
                    this.total = res.data.total;
                    this.tableData = res.data.list;
                // eslint-disable-next-line handle-callback-err
                }).catch((err) => {
        
                });
            }
        },
        components: {listTable, AddOrEditView}
    };
</script>
<style lang="scss" scoped>
    .business-list-table {
        height: calc(100% - 108px);
    }
    .function-wrap2{
        padding: 8px 0 8px 40px;
    }
</style>


