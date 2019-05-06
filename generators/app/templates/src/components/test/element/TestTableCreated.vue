<template>
    <div>
        <el-select v-model="tableAction">
            <el-option :label="0" :value="0" />
            <el-option :label="1" :value="1" />
            <el-option :label="2" :value="2" />
            <el-option :label="3" :value="3" />
        </el-select>
        <el-table
            :data="tableData"
            border
            height="200"
            highlight-current-row
            @current-change="handleCurrentChange">
            <el-table-column
                type="index"
            >
            </el-table-column>

            <el-table-column
                v-for="(item, index) in tableColumn"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
            >
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
                tableAction: 3,
                tableColumnTpl: [
                    {prop: 'date', label: '日期', width: ''},
                    {prop: 'name', label: '改名', width: ''},
                    {prop: 'province', label: '省份', width: ''},
                    {prop: 'city', label: '市区', width: ''},
                    {prop: 'address', label: '地址', width: ''},
                    {prop: 'zip', label: '邮编', width: ''}
                ],
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

        computed: {
            tableColumn () {
                return {
                    0: [
                        {
                            prop: 'date',
                            label: '日期',
                            width: ''
                        },
                        {prop: 'name', label: '改名', width: ''},
                        {prop: 'province', label: '省份', width: ''},
                        {prop: 'city', label: '市区', width: ''},
                        {prop: 'address', label: '地址', width: ''},
                        {prop: 'zip', label: '邮编', width: ''}
                    ],
                    1: [
                        {prop: 'date', label: '日期', width: ''},
                        {prop: 'name', label: '改名', width: ''},
                        {prop: 'province', label: '省份', width: ''},
                        {prop: 'city', label: '市区', width: ''},
                        {prop: 'address', label: '地址', width: ''}
                    ],
                    2: [
                        {prop: 'date', label: '日期', width: ''},
                        {prop: 'name', label: '改名', width: ''},
                        {prop: 'province', label: '省份', width: ''},
                        {prop: 'city', label: '市区', width: ''}
                    ],
                    3: [
                        {prop: 'date', label: '日期', width: ''},
                        {prop: 'name', label: '改名', width: ''},
                        {prop: 'province', label: '省份', width: ''}
                    ]
                }[this.tableAction];
            }
        },

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

