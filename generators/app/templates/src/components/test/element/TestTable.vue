<template>
    <div>
        <el-table
            :data="tableData"
            border
            height="200"
            style="width: 500px;"
            highlight-current-row
            @current-change="handleCurrentChange">
            <el-table-column
                type="index"
            >
            </el-table-column>
            <el-table-column
                fixed
                prop="date"
                label="日期"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="province"
                label="省份"
                width="120">
            </el-table-column>
            <el-table-column
                prop="city"
                label="市区"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址"
                width="300">
            </el-table-column>
            <el-table-column
                prop="zip"
                label="邮编"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--
        el-table:
            data        表格数据
            border      边框
            height      固定表头
            max-height  固定表头  响应式
        el-table-column:
            prop        取的字段名
            width       宽度
            table       表头名
            fixed       左右固定

        单选功能
            加多一个el-table-column 设置type="index"
            highlight-current-row
            @current-change="handleCurrentChange"
                handleCurrentChange (currentRow, oldCurrentRow) {
                    // 上一次和本次点击行的数据
                    console.log(currentRow);
                    console.log(oldCurrentRow);
                }
        -->

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {},

        data () {
            return {
                tableData: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }
                ]
            };
        },

        computed: {},

        watch: {},

        created () {
        },

        mounted () {
        },

        methods: {
            // 表格点击 拿到的是当前一行的数据
            handleClick (data) {
                console.log(`表格点击: ${data}`, data);
            },
            // 表格单选
            handleCurrentChange (currentRow, oldCurrentRow) {
                console.log(currentRow);
                console.log(oldCurrentRow);
            }
        },

        components: {}
    };
</script>

