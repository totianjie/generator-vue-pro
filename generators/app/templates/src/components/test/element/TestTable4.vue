<template>
    <div>
        <el-table :data="tableData" :span-method="arraySpanMethod" border>
            <el-table-column
                type="index"
            ></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="时间" prop="date"></el-table-column>
            <el-table-column label="其它" prop="test"></el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {},

        data () {
            return {
                tableData: [
                    {
                        name: '小王',
                        date: '2018-01-22',
                        test: 123,
                        list: [
                            {text: 123},
                            {text: 456},
                            {text: 789},
                            {text: 987}
                        ]
                    },
                    {
                        name: '小王',
                        date: '2018-01-22',
                        test: 345,
                        list: [
                            {text: 123},
                            {text: 456},
                            {text: 789},
                            {text: 987}
                        ]
                    },
                    {
                        name: '小王',
                        date: '2018-01-22',
                        test: 567,
                        list: [
                            {text: 123},
                            {text: 456},
                            {text: 789},
                            {text: 987}
                        ]
                    },
                    {
                        name: '小王',
                        date: '2018-01-22',
                        test: 789,
                        list: [
                            {text: 123},
                            {text: 456},
                            {text: 789},
                            {text: 987}
                        ]
                    },
                    {
                        name: '小张',
                        date: '2018-01-22',
                        test: 789,
                        list: [
                            {text: 'aaa'},
                            {text: 'bbb'}
                        ]
                    },
                    {
                        name: '小张',
                        date: '2018-01-22',
                        test: 789,
                        list: [
                            {text: 'aaa'},
                            {text: 'bbb'}
                        ]
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
            arraySpanMethod ({row, column, rowIndex, columnIndex}) {
                // console.log(row);
                // return [row.row.list.length, 0];
                // console.log(rowIndex);

                if (columnIndex === 1 || columnIndex === 0) {
                    if (rowIndex === 0) {
                        return {
                            rowspan: 4,
                            colspan: 1
                        };
                    } else if (rowIndex === 4) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        },

        components: {}
    };
</script>
