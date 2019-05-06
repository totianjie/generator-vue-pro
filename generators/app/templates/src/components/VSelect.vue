<!--
* @Author: mikey.TIANJIE
* @Date: 2018-07-10 13:30:24
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-07-12 13:30:24
* @remark: 下拉框选择组件
            <v-select
                v-model="selectResult"
                :list="selectData"
                :props="selectProps"
                :filterable="true"
                :remote="true"
                :remote-method="remoteMethod"
            >
            </v-select>
-->
<template>
    <div class="w-fill">
        <el-select
            ref="elSelectRef"
            v-model="value"
            :placeholder="placeholder"
            class="w-fill"
            :class="[sytleClass ? `${ sytleClass }` : '']"
            :filterable="filterable"
            :remote="remote"
            :remote-method="remoteMethod"
            :clearable="clearable"
            :disabled="disabled"
            :multiple="multiple"
            @change="handleChange"
            @visible-change="appearEvent"
            :size="size"
            :popper-class="popperClass"
        >
            <el-option>{{titleText}}</el-option>
            <el-option
                v-for="(item, index) in list"
                :key="item[props.value] + index"
                :label="item[props.name]"
                :value="item[props.value]"
            >
            </el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
        props: {
            titleText: {
                type: String,
                default: '-- 请选择 --'
            },
            sytleClass: {
                type: String,
                default () {
                    return '';
                }
            },
            popperClass: {
                type: String,
                default () {
                    return '';
                }
            },
            size: {// key value值
                type: String,
                default () {
                    return '';
                }
            },
            value: [String, Number, Array],
            list: { // 下拉框数据
                type: Array,
                default: []
            },
            props: { // key value值
                type: Object,
                default () {
                    return {name: 'newLabel', value: 'newValue'};
                }
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            filterable: { // 是否开启搜索功能  开启远程搜索时要设置为true
                type: Boolean,
                default: false
            },
            remote: { // 开启远程搜索 true
                type: Boolean,
                default: false
            },
            remoteMethod: { // 远程搜索方法
                type: Function,
                default: () => {
                }
                /*
                remoteMethod (queryString) {
                    if (!queryString) {
                        this.selectData = [];
                        return false;
                    }
                    // ajax请求
                    setTimeout(() => {
                        this.selectData.length = 0;
                        this.selectData.push({dictName: 'ajaxname', dictValue: 'ajaxValue'});
                    }, 1000);
                }
                */
            },
            clearable: { // 是否要清除按钮
                type: Boolean,
                default: false
            },
            disabled: { // 是否禁用
                type: Boolean,
                default: false
            },
            multiple: { // 是否需要多选
                type: Boolean,
                default: false
            },
            collapseTags: { // 多选时显示的格式
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleChange () {
                this.$emit('input', this.value);
                this.$emit('change', this.value);
            },
            appearEvent (val) { // 选择框出现为 true ,否则 false
                this.$emit('appearEvent', val);
            },
            blurEvent () { // 取消选择框
                this.$refs.elSelectRef.blur(true);
            }
        }
    };
</script>

<style scoped>

</style>

