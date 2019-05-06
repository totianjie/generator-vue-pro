<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-07-12 13:39:08 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-07-12 13:39:08 
* @remark: 查看详情时，每一个项目的公共样式
* @params: label  ==>  项目名称
* @params: span  ==>   项目名称占的宽度
* @params: tooltip ==> 是否需要移入有tip层   层的内容<div slot="content" class="tooltip-item">内容</div>
* @params: pxUnit ==> 名称位置使用px布局   此时span不需要传  lableWidth需要传
* @lableWidth: name区域的宽度
    <v-item-detail :tooltip="true" label="name" :pxUnit="true" :labelWidth="100" :span="5">
        <span class="block text-ellipsis">内容</span>
        <div slot="content" class="tooltip-item">内容</div>
    </v-item-detail>
-->
<template>
    <div class="v-item-detail clearfix" ref="v_input">
        <el-col v-if="!pxUnit" :span="span" class="name">
            {{label}}
        </el-col>
        <el-col v-if="!pxUnit" :span="24 - span" class="text" :class="{'border-none': !border}">
            <slot v-if="!tooltip"></slot>
            <el-tooltip class="item" effect="dark" placement="top-start" v-if="tooltip">
                <slot></slot>
                <slot name="content" slot="content"></slot>
            </el-tooltip>
        </el-col>
        <div 
            v-if="pxUnit" 
            class="name pull-left" 
            v-text="label"
            :style="{width: `${labelWidth}px`}"
        ></div>
        <div 
            v-if="pxUnit" 
            class="pull-left text"
            :class="{'border-none': !border}"
            :style="{width: `calc(100% - ${labelWidth}px)`}"
        >
            <slot v-if="!tooltip"></slot>
            <el-tooltip class="item" effect="dark" placement="top-start" v-if="tooltip">
                <slot></slot>
                <slot name="content" slot="content"></slot>
            </el-tooltip>

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
            border: {
                type: Boolean,
                default () {
                    return true;
                }
            },
            tooltip: {
                type: Boolean,
                default () {
                    return false;
                }
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
    .v-item-detail {
        overflow: hidden;
        font-size: 14px;
        .name {
            height: 42px;
            line-height: 42px;
            padding-right: 10px;
            text-align: right;
            box-sizing: border-box;
            color: #000000;

        }
        .text {
            min-height: 42px;
            padding-left: 8px;
            padding-top: 13px;
            padding-bottom: 10px;
            box-sizing: border-box;
            color: #666666;
            border-bottom: 1px solid #D8D8D8;
            &.border-none {
                border-bottom: none;
            }
        }

    }
</style>
