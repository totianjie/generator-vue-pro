<template>
    <div>
        <el-table
            :data="tableData"
        >
            <el-table-column
                prop="date"
                label="时间"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
            ></el-table-column>
            <el-table-column
                label="选项"
            >
                <template slot-scope="scope">
                    <el-select v-model="scope.row.select" @change="handlerChange(scope.row)">
                        <el-option
                            v-for="(item, index) in scope.row.selectData"
                            :key="item.id"
                            :label="item.text"
                            :value="item.value"
                        >

                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
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
                        date: '2018-01-22',
                        name: '小王',
                        select: '',
                        selectData: [
                            {label: '选项1', value: 123, id: 123},
                            {label: '选项2', value: 456, id: 1232},
                            {label: '选项3', value: 789, id: 1233}
                        ]
                    },
                    {
                        date: '2018-01-22',
                        name: '小王',
                        select: '',
                        selectData: [
                            {label: '选项1', value: 123, id: 123},
                            {label: '选项2', value: 456, id: 1232},
                            {label: '选项3', value: 789, id: 1233}
                        ]
                    },
                    {
                        date: '2018-01-22',
                        name: '小王',
                        select: '',
                        selectData: [
                            {label: '选项1', value: 123, id: 123},
                            {label: '选项2', value: 456, id: 1232},
                            {label: '选项3', value: 789, id: 1233}
                        ]
                    },
                    {
                        date: '2018-01-22',
                        name: '小王',
                        select: '',
                        selectData: [
                            {label: '选项1', value: 123, id: 123},
                            {label: '选项2', value: 456, id: 1232},
                            {label: '选项3', value: 789, id: 1233}
                        ]
                    },
                    {
                        date: '2018-01-22',
                        name: '小王',
                        select: '',
                        selectData: [
                            {label: '选项1', value: 123, id: 123},
                            {label: '选项2', value: 456, id: 1232},
                            {label: '选项3', value: 789, id: 1233}
                        ]
                    },
                    {
                        date: '2018-01-22',
                        name: '小王',
                        select: '',
                        selectData: [
                            {label: '选项1', value: 123, id: 123},
                            {label: '选项2', value: 456, id: 1232},
                            {label: '选项3', value: 789, id: 1233}
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
            handlerChange (rowData) {
                console.log(rowData);
            }
        },

        components: {}
    };
</script>
