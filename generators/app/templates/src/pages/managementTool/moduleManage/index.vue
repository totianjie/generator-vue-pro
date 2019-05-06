<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/14
* @remark: 模块管理
-->
<template>
    <div>
        <div class="function-wrap no-top-border" v-if="!addShow && !isDetailShow">
            <el-button type="primary" @click="handleAdd" :size="btnSize">新建</el-button>
        </div>
        <module-table
            v-if="!addShow && !isDetailShow"
            class="module-table"
            :tableData="modelList"
            @update="_getData"
            @edit="handleEdit"
            @detail="handleDetail"
            @del ="handleDel"
        ></module-table>
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
            :modelId="modelId"
            @update="_getData"
            :modelEx="modelEx"
            :tableType="tableType"
            :templetType="templetType"
        ></add>
        <detail
            v-if="isDetailShow"
            v-model="isDetailShow"
            :modelEx="modelEx"
            :id="detailId"
        ></detail>
        <select-type v-if="selectTypeShow" :selectTypeShow.sync="selectTypeShow" @updateType="updateType"></select-type>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import { templetList, deleteTemplte } from "js/api/managementTool/moduleManage";
    import ModuleTable from './ModuleTable';
    import SelectType from './SelectType';
    import Add from './Add';
    import Detail from './Detail';
    export default {
        props: {},

        data () {
            return {
                tableType: 0,
                templetType: 0,
                btnSize: CONFIG.homeBtn,
                modelList: [],
                modelId: -1,
                detailId: -1,
                // 用于做删除入修改
                addShow: false,
                selectTypeShow: false,
                isDetailShow: false,
                total: 0,
                isEdit: false,
                modelEx: {},
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
                this.addShow = false;
                this.isEdit = false;
                this.isDetailShow = false;
                templetList(this.listParams).then(res => {
                    this.total = res.data.total;

                    this.modelList = res.data.list;
                });
            },
            handleAdd () {
                this.addShow = false;
                this.isEdit = false;
                this.modelEx = {};
                this.selectTypeShow = true;
            },
            updateType (tableType, templetType) {
                this.selectTypeShow = false;
                this.tableType = tableType;
                this.templetType = templetType;
                this.addShow = true;
            },
            // 编辑
            handleEdit (data) {
                this.tableType = data.tableType;
                this.templetType = typeof data.templetType === 'string' ? parseInt(data.templetType) : data.templetType;
                this.modelId = data.id;
                this.addShow = true;
                this.isEdit = true;
                this.modelEx = data;
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
                    deleteTemplte({id: data.id}).then(res => {
                        this._getData();
                    });
                }).catch(() => {
                });
            },
            handleDetail (data) {
                this.modelEx = data;
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
        components: {ModuleTable, Add, Detail, SelectType}
    };
</script>
<style lang="scss" scoped>
    .module-table {
        height: calc(100% - 52px  - 57px);
    }
    .no-top-border{
        border-top-width: 0px !important;
    }
</style>
