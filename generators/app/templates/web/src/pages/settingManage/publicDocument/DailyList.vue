<!--
* @Author: GOTINTIN
* @Date: 2019-1-21
* @remark: 日志查看
-->
<template>
    <section>
        <div class="daily-list-wrap">
            <!--查询区-->
            <daily-search @search="handleSearch" @handlerBack="handlerBack"/>
            <!--列表区-->
            <daily-table class="public-table" :tableData="dailyList" @handleContent="handleContent"/>
            <!--分页区-->
            <v-paging :total="total" @pagingChange="handlePagingChange" ref="bPages"/>
            <!--弹出框-->
            <daily-dialog v-model="dialogVisible" :dialogContent="dialogContent" :dialogTitle="dialogTitle"/>
        </div>
    </section>

</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import DailyTable from './DailyTable';
    import DailySearch from './DailySearch';
    import DailyDialog from './DailyDialog';
    import {publicDailyList} from 'js/api/settingManage/publicDocument/publicDocument';
    export default {
        data () {
            return {
                total: 0, // 总页数
                // 表格参数
                dailyListParams: {
                    offset: 1, // 当前页数
                    limit: CONFIG.limit, // 每页数量
                    executeCode: '', // 任务执行编码
                    taskCode: '' // 任务编码
                },
                dailyList: [], // 列表
                dialogVisible: false, // 弹出框默认为false
                dialogContent: '', // 弹出框的操作内容
                dialogTitle: '' // 弹出框的标题：操作结果、操作内容
            };
        },
        props: {
            value: {
                type: String,
                default () {
                    return 'daily';
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
            this.dailyListParams = Object.assign({}, this.dailyListParams, query);
            console.log('path=', path, 'query=', query);
            this._publicDailyList();
        },
        mounted () {
            this._publicDailyList();
        },
        methods: {
            // 获取表格数据
            _publicDailyList () {
                publicDailyList(this.dailyListParams).then(res => {
                    console.log('日志列表', res);
                    this.total = res.data.total;
                    this.dailyList = res.data.list;
                });
            },
            // 查询
            handleSearch (data) {
                console.log('日志查询', data);
                this.dailyListParams = Object.assign({}, this.dailyListParams, data);
                this.dailyListParams.offset = 1;
                this._publicDailyList();
                this.$refs.bPages._init();
            },
            // 返回
            handlerBack () {
                console.log(this.dailyListParams.type);
                this.$router.go(-1);
                // taskCode=任务   type: 1=批次划分任务 2=跑批跑批任务
                // if (this.dailyListParams.type === 1) {
                //     this.$router.push({
                //         path: '/taskManage/batchTasks'
                //     });
                // } else {
                //     this.$router.push({
                //         path: '/taskManage/runManage'
                //     });
                // }
            },
            // 弹出框内容显示
            handleContent (row, column) {
                console.log('dailyList操作内容', row, column);
                this.dialogTitle = column;
                if (this.dialogTitle === '操作结果') {
                    this.dialogContent = row.optResult;
                } else if (this.dialogTitle === '操作内容') {
                    this.dialogContent = row.optContent;
                }
                this.dialogVisible = true;
            },
            // 分页改变
            handlePagingChange (data) {
                this.dailyListParams = Object.assign({}, this.dailyListParams, data);
                this._publicDailyList();
            }
        },
        components: {DailyTable, DailySearch, DailyDialog}
    };
</script>
<style lang="scss" scoped>
    .daily-list-wrap{
        height: 100%;
        box-sizing: border-box;
        .public-table{
            height: calc(100% - 40px - 48px - 52px); // 40px - 48px - 52px 顺序分别是二个搜素框, 52px是分页
        }
    }
</style>
