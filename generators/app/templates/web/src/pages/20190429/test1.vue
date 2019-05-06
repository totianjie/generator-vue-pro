<template>
    <div>
        <div ref="echarts" style="width: 500px; height: 500px;"></div>
        <el-table
            :data="tableData"
            border
            sortable="custom"
            max-height="800px"
            style="width: 1000px;"
        >
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
    </div>
</template>
<script>
export default {
    data () {
        return {
            option: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            },
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
    mounted () {
        let echar = this.$echarts.init(this.$refs.echarts);
        echar.setOption(this.option, true);
    }
};
</script>
