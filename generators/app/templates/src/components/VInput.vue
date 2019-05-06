<!--
* @Author: mikey.TIANJIE
* @Date: 2018-07-12 13:42:07
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-07-12 13:42:07
* @remark: 查询条件input框盒子，用于input查询公共样式
* @params: label ==> 名称
* @params: span  ==> 占比
* @params: pxUnit ==> 名称位置使用px布局   此时span不需要传  lableWidth需要传
* @lableWidth: name区域的宽度
    <v-input :pxUnit="true" :labelWidth="500" label="testName" :span="5">
        <el-input></el-input>
    </v-input>
-->
<template>
    <div class="v-input clearfix" ref="v_input">
        <el-col v-if="!pxUnit" :span="span" class="label" :style="{lineHeight: lineHeight}">
            {{label}}
        </el-col>
        <el-col v-if="!pxUnit" :span="24 - span" class="input">
            <slot></slot>
        </el-col>

        <span v-if="pxUnit" :style="{width: `${labelWidth}px`, lineHeight: lineHeight}" class="block left pull-left text-right" v-text="label">

        </span>
        <div v-if="pxUnit" :style="{width: `calc(100% - ${labelWidth}px)`}" class="pull-left">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VInput",
        data () {
            return {
                lineHeight: 0
            };
        },
        props: {
            label: {
                type: String,
                default: ''
            },
            span: {
                type: Number,
                default: 0
            },
            pxUnit: {
                type: Boolean,
                default: false
            },
            labelWidth: {
                type: Number,
                default: 100
            }
        },
        mounted () {
            this.lineHeight = this.$refs.v_input.getBoundingClientRect().height + 'px';
        }
    };
</script>

<style scoped lang="scss">
    .v-input {
        overflow: hidden;
        .label {
            text-align: right;
            padding-right: 10px;
            box-sizing: border-box;
            color: #333333;
            font-size: 14px;
        }
        .input {
            padding-right: 15px;
            box-sizing: border-box;
        }
        .left {
            padding-right: 10px;
            box-sizing: border-box;
        }
    }
</style>
