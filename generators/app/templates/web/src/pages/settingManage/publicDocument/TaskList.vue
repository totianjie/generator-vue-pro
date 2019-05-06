<!--
* @Author: GOTINTIN
* @Date: 2019-1-21
* @remark: 任务历史记录
-->
<template>
    <section class="task-list-wrap">
        <!--返回-->
        <div class="head clearfix">
           <el-button type="primary" class="pull-right" @click="handleBack" :size="btnSize">返回</el-button>
        </div>
        <!--列表-->
        <task-table class="task-table" :tableData="taskTableList" @handleDetail="handleDetail"/>
        <!--分页-->
        <v-paging :total="total" ref="bPages" @pagingChange="handlePagingChange"/>
    </section>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import TaskTable from './TaskTable';
    import {publicRecordList} from 'js/api/settingManage/publicDocument/publicDocument';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                btnSize: CONFIG.homeBtn,
                total: 0, // 分页总条数
                pagingParams: { // 表格参数
                    limit: CONFIG.limit, // 每页数量
                    offset: 1, // 当前页数
                    executeCode: '' // 任务执行编码
                },
                taskTableList: [] // 列表
            };
        },
        props: {
            value: {
                type: String,
                default () {
                    return 'task';
                }
            },
            isDaily: {
                type: Boolean,
                default () {
                    return true;
                }
            }
        },
        created () {
            let path = this.$route.path;
            let query = this.$route.query; // taskCode=任务任务编码  executeCode=任务执行编码   type: 1=批次划分任务 2=跑批跑批任务
            console.log('path query', path, query);
            this.pagingParams = Object.assign({}, this.pagingParams, query);
            this._publicRecordList();
        },
        mounted () {
            this._publicRecordList();
        },
        methods: {
            // 获取表格数据
            _publicRecordList () {
                publicRecordList(this.pagingParams).then(res => {
                    console.log('记录查看列表', res);
                    this.total = res.data.total;
                    this.taskTableList = res.data.list;
                });
            },
            // 返回
            handleBack () {
                this.$router.go(-1);
            },
            // 查看
            handleDetail (row) {
                console.log('row查看', row);
                this.$emit('input', 'daily');
                this.$emit('update:isDaily', false);
                this.$router.push({
                    path: '/settingManage/publicDocument/DailyList',
                    query: {
                        executeCode: row.executeCode,
                        taskType: row.taskType
                    }
                });
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('分页改变', data);
                this.pagingParams = Object.assign({}, this.pagingParams, data);
                this._publicRecordList();
            }
        },
        components: {TaskTable}
    };
</script>
<style lang="scss" scoped>
    .task-list-wrap{
        height: 100%;
        box-sizing: border-box;
        .head{
            padding: 8px 90px 8px 0;
        }
        .task-table{
            height: calc(100% - 48px - 52px);
        }
    }
</style>
