<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/17
* @remark: 首页面  列表展示
-->
<template>
    <section class="wrap">
        <div class="head">
            <el-button @click="handlerAdd" type="primary" :size="btnSize">新建</el-button>
        </div>
        <div class="table-wrap">
            <el-table
                height="100%"
                style="width:100%"
                :size="tableSize"
                :data="tableData"
                border
                :highlight-current-row="true"
                :stripe="true"
            >
                <el-table-column
                    type="index"
                    label="序号"
                    width="50"
                >
                </el-table-column>
                <el-table-column
                    prop="taskCode"
                    label="任务号"
                    show-overflow-tooltip
                    width="136"
                >
                </el-table-column>

                <el-table-column
                    prop="taskName"
                    show-overflow-tooltip
                    label="任务名称"
                >
                </el-table-column>
                <el-table-column
                    prop="fromType"
                    show-overflow-tooltip
                    label="任务类型"
                    width="136"
                >
                </el-table-column>
                <el-table-column
                    prop="templetCode"
                    show-overflow-tooltip
                    label="模板号"
                >
                </el-table-column>
                <el-table-column
                    prop="templetName"
                    show-overflow-tooltip
                    label="模板名称"
                >
                </el-table-column>
                <el-table-column
                    label="申请时间"
                    prop="creatTime"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.creatTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="executeBeginTime"
                    show-overflow-tooltip
                    label="执行开始时间"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.executeBeginTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="executeEndTime"
                    show-overflow-tooltip
                    label="执行结束时间"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.executeEndTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="statusName"
                    show-overflow-tooltip
                    label="状态"
                >
                </el-table-column>
                <el-table-column
                    prop="executeBy"
                    show-overflow-tooltip
                    label="操作者"
                >
                </el-table-column>
                <el-table-column
                    prop=""
                    width="80"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <span class="btn m-l-5" @click="lookDetail(scope.row)">查看</span>
                        <span class="btn" v-show="scope.row.type === 2 && scope.row.status === 0" @click="executes(scope.row)">执行</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <v-paging
            class="paging"
            :total="total"
            ref="paging"
            @pagingChange="handlePagingChange"
        ></v-paging>
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    import {getTaskList, executeTask} from 'js/api/managementTool/taskManage';

    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                btnSize: CONFIG.homeBtn,
                tableData: [],
                total: 0,
                pagingParams: {
                    limit: CONFIG.limit,
                    offset: 1
                }
            };
        },
        props: {
            value: {
                type: [String],
                default: ''
            },
            taskId: {
                type: Number,
                default: -1
            }
        },
        created () {
            this._getData();
        },
        methods: {
            _getData () {
                return getTaskList(this.pagingParams).then(({data = []}) => {
                    let {list, total, pageSize, pageNum} = data;
                    list.forEach((item) => {
                        switch (item.type) { // 定时任务类型（1 定时任务 2 非定时任务 ）
                        case 1:
                            item.fromType = '定时任务';
                            break;
                        case 2:
                            item.fromType = '非定时任务';
                            break;
                        default:
                            item.fromType = '';
                            return;
                        }
                    });
                    this.tableData = Object.assign([], list);
                    this.pagingParams = Object.assign({}, {
                        limit: pageSize,
                        offset: pageNum
                    });
                    this.total = total;
                    return Promise.resolve();
                });
            },
            handlePagingChange (data) { // 分页
                console.log('==>>', data);
                this.pagingParams = Object.assign({}, data);
                this._getData();
            },
            handlerAdd () { // 添加任务
                console.log('添加任务');
                this.$emit('input', 'AddTask');
            },
            executes ({taskId, status}) { // 执行
                console.log('执行', taskId);
                console.log('执行', status);
                if (status === 0) {
                    executeTask({taskId}).then(() => {
                        this.$toast('该任务已执行');
                        this._getData();
                    });
                }
            },
            lookDetail (row) { // 查看详情
                console.log('查看详情', row);
                this.$emit('update:taskId', row.taskId);
                this.$emit('input', 'Detail');
            }
        }
    };
</script>

<style scoped lang="scss">
    @import './../../../../scss/variables';

    .wrap {
        display: flex;
        flex-direction: column;
        .head {
            padding: 8px 0 8px 40px;
        }
        .table-wrap {
            flex: 1;
            display: flex;
            .btn {
                color: $base-color;
                cursor: pointer;
            }
        }
        .paging {
            padding: 10px;
        }
    }
</style>
