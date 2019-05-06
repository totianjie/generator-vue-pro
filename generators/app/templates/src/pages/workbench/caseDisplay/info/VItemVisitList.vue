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
            <el-tooltip ref="tooltips" placement="top" :disabled="disabled" :manual="true">
                <span class="block text-ellipsis" @mouseenter="handlerMoseenter($event)" @mouseleave="handlerMouseleave($event)">{{itemText}}</span>
                <div slot="content">{{itemText}}</div>
            </el-tooltip>
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
            <el-tooltip ref="tooltips" placement="top" :disabled="disabled" :manual="true">
                <span  class="block text-ellipsis" @mouseenter="handlerMoseenter($event)" @mouseleave="handlerMouseleave($event)">{{itemText}}</span>
                <div slot="content">{{itemText}}</div>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VInput",
        data () {
            return {
                height: 0,
                lineHeight: 0,
                tipsShow: false,
                disabled: false // 默认提示语框隐藏
            };
        },
        props: {
            itemText: {
                type: String,
                default: ''
            },
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
            },
            tooltipShow: {
                type: Boolean,
                default: false
            }
        },
        mounted () {
            this.lineHeight = this.$refs.v_input.getBoundingClientRect().height + 'px';
        },

        methods: {
            // 鼠标移入：文字溢出显示提示语框
            handlerMoseenter (event) {
                // console.log('event.target', event.target);
                // console.log('event.target.scrollWidth11', event.target.scrollWidth);
                // console.log('event.target.offsetWidth11', event.target.offsetWidth);
                let oText = event.target; // 获取触发事件的元素
                if (oText.scrollWidth > oText.offsetWidth) { // scrollWidth内容宽度  offsetWidth容器宽度
                    this.$refs.tooltips.manual = false; // manual = false设置鼠标移入为false
                    this.disabled = false; // Tooltip=true 默认提示语框显示，false为隐藏
                }
            },
            // 鼠标移出：隐藏提示语框
            handlerMouseleave (event) {
                let oText = event.target;
                if (oText.scrollWidth < oText.offsetWidth) {
                    this.$refs.tooltips.manual = false;
                    this.disabled = true;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .v-item-detail {
        font-size: 12px;
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
            /*padding-left: 8px;*/
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
            min-width: 78px;
            width: auto;
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
