<!--
* @Author: GOTINTIN
* @Date: 2019-1-22
* @remark: 跑批主机管理表格
-->
<template>
    <div>
        <el-table
            class="host-list-table"
            height="100%"
            width="100%"
            :size="tableSize"
            :data="tableData"
            border
            :highlight-current-row="true"
            :stripe="true">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="clientName"
                label="跑批主机名称"
                show-overflow-tooltip
                width="136">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="clientHost"
                show-overflow-tooltip
                label="跑批主机服务地址">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="threadNum"
                show-overflow-tooltip
                label="最大线程数">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="clientStatus"
                show-overflow-tooltip
                label="跑批主机状态">
                <template slot-scope="scope">
                    <i :class="scope.row.clientStatus | statusFilter"></i>
                    <span>{{scope.row.clientStatus | formatStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small" class="btn-color">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: "100px"
            };
        },
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            // 编辑
            handleEdit (data) {
                console.log('编辑', data);
                this.$emit('edit', data);
            }
        },
        filters: {
            // 主机状态 1:正常2:忙碌 3:不可用
            formatStatus (val) {
                return val === '1' ? '正常' : val === '2' ? '忙碌' : '不可用';
            },
            // 设置主机状态颜色 1:绿色 2:红色 3:黄色
            statusFilter (val) {
                return val === '1' ? 'statusStyle bg-green' : val === '2' ? 'statusStyle bg-red' : 'statusStyle bg-yellow';
            }
        }
    };
</script>
<style lang="scss" scoped>
    .host-list-table{
        .statusStyle{
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .bg-green{
            background-color: #00D00F;
        }
        .bg-red{
            background-color: #FF5E5E;
        }
        .bg-yellow{
            background-color: #FFC45E;
        }
        .btn-color{
            color: #4579C5;
        }
    }
</style>
