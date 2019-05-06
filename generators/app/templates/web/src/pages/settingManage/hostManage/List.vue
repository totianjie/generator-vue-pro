<!--
* @Author: GOTINTIN
* @Date: 2019-1-22
* @remark: 跑批主机管理列表
-->
<template>
    <section class="list-wrap page">
        <div class="head">
            <el-button type="primary" @click="handleAdd" :size="btnSize">新增</el-button>
        </div>
        <list-table class="list-table" style="width: 100%;" :tableData="tableList" @edit="handleEdit"/>
        <v-paging :total="total" ref="bPages" @pagingChange="handlePagingChange"/>
    </section>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import ListTable from './ListTable';
    import {hostList} from 'js/api/settingManage/hostManage/hostManage';
    export default {
        data () {
            return {
                btnSize: CONFIG.homeBtn,
                total: 0, // 分页总条数
                listParams: { // 表格请求参数
                    limit: CONFIG.limit, // 每页数量
                    offset: 1 // 当前页数
                },
                tableList: [] // 列表

            };
        },
        props: {
            value: {
                type: String,
                default () {
                    return 'list';
                }
            },
            isAdd: {
                type: Boolean,
                default () {
                    return true;
                }
            },
            rbsClientId: {
                type: String,
                default () {
                    return '';
                }
            }
        },

        mounted () {
            this._hostList();
        },

        methods: {
            // 获取表格数据
            _hostList () {
                hostList(this.listParams).then(res => {
                    console.log(this.listParams);
                    this.total = res.data.total;
                    this.tableList = res.data.list;
                });
            },
            // 新增
            handleAdd () {
                console.log('添加');
                this.$emit('input', 'add'); // 手动触发事件input，将value的值改为新增页面add
                this.$emit('update:isAdd', true); // isAdd为true，是新增
            },
            // 编辑
            handleEdit (row) {
                console.log('row编辑', row);
                this.$emit('update:rbsClientId', row.rbsClientId);
                this.$emit('input', 'add');
                this.$emit('update:isAdd', false);
            },
            // 分页改变
            handlePagingChange (data) {
                this.listParams = Object.assign({}, this.listParams, data);
                this._hostList();
            }
        },
        components: {ListTable}
    };
</script>
<style lang="scss" scoped>
    .list-wrap{
        height: 100%;
        box-sizing: border-box;
        .head{
            padding: 8px 0 8px 40px;
        }
        .list-table{
            height: calc(100% - 48px - 52px);
        }
    }
</style>
