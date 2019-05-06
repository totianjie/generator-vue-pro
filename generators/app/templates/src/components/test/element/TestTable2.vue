<template>
    <div>
        <el-table
            :data="tableData"
            border
            sortable="custom"
            @sort-change="handlerSortChange"
            max-height="800px"
            style="width: 1000px;"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
            ></el-table-column>
            <el-table-column
                fixed
                prop="date"
                label="日期"
                sortable
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column label="嵌套1">
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
            </el-table-column>
            <el-table-column label="嵌套二">
                <el-table-column
                    prop="address"
                    :show-overflow-tooltip="true"
                    label="地址"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="zip"
                    label="邮编"
                    width="120">
                </el-table-column>
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

        多级表头只需要el-table-column 嵌套就可以了

        多选功能
            加多一个el-table-column   设置type="selection"
        关于文字过多换行还是不换行问题
            默认超出后换行
            如果不换行就在el-table-column中设置  :show-overflow-tooltip="true"
        关于排序
            在列中设置 sortable   值为true | false
            在el-table  设置   sortable="custom"
            监听@sort-change="handlerSortChange" 排序触发时的事件 返回当前例信息
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
                        address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
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
            // 按钮点击 返回当前行数据
            handleClick (rowData) {
                console.log(rowData);
            },
            // 多选功能
            handleSelectionChange (selectionData) {
                console.log(selectionData);
            },
            // 排序事件
            handlerSortChange (data) {
                console.log('排序', data);
            }
        },

        components: {}
    };
</script>

