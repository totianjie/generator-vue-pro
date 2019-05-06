<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/17
* @remark:
-->
<template>
    <el-select v-model="value" placeholder="请选择" @change="handleChange">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        data () {
            return {
                options: [
                    {
                        value: 'List',
                        label: '首页'
                    },
                    {
                        value: 'Detail',
                        label: '详情'
                    },
                    {
                        value: 'AddTask',
                        label: '添加任务'
                    }
                ]
            };
        },
        props: {
            value: {
                type: [String],
                default: ''
            }
        },
        methods: {
            handleChange (val) {
                this.$emit('input', val);
            }
        }
    };
</script>

<style scoped>

</style>
