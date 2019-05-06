<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-06-26 13:44:17 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-07-12 13:44:17 
* @remark: 详情页面公共头部
-->
<template>
    <div class="v-detail-title" :style="styles">
        <span v-text="sign ? '*' : ''" class="sign"></span>
        <span v-text="label" class="title" :class="{'left-tag': leftTag}"></span>
        <slot></slot>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            label: {
                type: String,
                default () {
                    return '';
                }
            },
            // 是否需要前面的小红点
            sign: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            leftTag: {
                type: Boolean,
                default: false
            },
            boxStyle: {
                type: Object,
                default: {}
            }
        },
        computed: {
            styles () {
                let styles = {};
                styles = this.sign ? {
                    'padding-top': '32px',
                    'padding-bottom': '14px'
                } : {
                    'padding-top': '55px',
                    'padding-bottom': '14px'
                };
                return Object.assign({}, styles, this.boxStyle);
            }
        }
    };
</script>

<style scoped lang="scss">
    .v-detail-title {
        position: relative;
        .sign {
            width: 10px;
            height: 22px;
            line-height: 22px;
            margin-left: 40px;
            font-size: 18px;
            color: rgba(255, 43, 43, 0.85);

        }
        .title {
            font-size: 18px;
            color: rgba(0, 0, 0, 0.85);
            line-height: 22px;
        }
        .left-tag {
            border-left: 4px solid rgba(0,150,255,1);
            text-indent: 10px;
            display: inline-block;
        }
    }
</style>
