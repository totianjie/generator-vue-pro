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
            <div v-if="tooltip" ref="itemBox" @mouseenter="handlerMoseenter" @mouseleave="tipsShow = false;">
                <slot></slot>
                <div v-show="tipsShow" class="tooltip-content" :class="{'pos-bottom': placement === 'bottom'}">
                    <slot name="content"></slot>
                    <span class="arrow"></span>
                </div>
            </div>
        </el-col>

        <!-- 以下是px布局 -->
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
            <div v-if="tooltip" ref="itemBox" @mouseenter="handlerMoseenter" @mouseleave="tipsShow = false;">
                <slot></slot>
                <div v-show="tipsShow" class="tooltip-content" :class="{'pos-bottom': placement === 'bottom'}">
                    <slot name="content"></slot>
                    <span class="arrow"></span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "VInput",
        data () {
            return {
                lineHeight: 0,
                tipsShow: false
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
            },
            placement: {
                type: String, // top bottom
                default: 'top'
            }
        },
        mounted () {
            this.lineHeight = this.$refs.v_input.getBoundingClientRect().height + 'px';
        },
        methods: {
            handlerMoseenter () {
                let oText = this.$refs.itemBox.children[0].innerHTML;

                if (oText.length > 25) {
                    this.tipsShow = true;
                } else {
                    this.tipsShow = false;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .v-item-detail {
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
            position: relative;
            min-height: 42px;
            padding-left: 8px;
            padding-top: 13px;
            padding-bottom: 10px;
            box-sizing: border-box;
            color: #666666;
            border-bottom: 1px solid #D8D8D8;
            &.border-none {
                border-bottom-color: transparent;
                transform: translateY(-1px);
            }
        }
        .tooltip-content {
            transition: 0.5s all linear;
            max-width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3005;
            padding: 10px;
            transform: translateY(-100%);
            background: #303133;
            color: #fff;
            word-break: break-all;
            border-radius: 4px;
            .arrow {
                display: block;
                position: absolute;
                bottom: -12px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-width: 6px;
                border-color: transparent;
                border-style: solid;
                // background: #303133;
                border-top-color: #303133;
            }
            &.pos-bottom {
                top: 42px;
                transform: translateY(0);
                .arrow {
                    top: -12px;
                    border-color: transparent;
                    border-bottom-color: #303133;
                }
            }
        }

    }
</style>
