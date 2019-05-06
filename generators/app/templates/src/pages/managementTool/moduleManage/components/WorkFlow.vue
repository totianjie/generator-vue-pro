<!-- Created by Nelson on 2018/9/18 -->
<!-- 
    <work-flow 
                    class="p-l-r-40" 
                    :textArray="isEdit?textArrayBak:textArray" 
                    :activeIndex="activeIndex"
                >
                </work-flow>
-->
<template>
    <div class="el-steps el-steps--horizontal">
        <div class="el-step is-horizontal is-flex" style="flex-basis: 100%; margin-right: 0px;" v-for = "(item, index) in textArray" v-bind:key="index">
            <div :class="['el-step__icon fl is-text icon__text__model',{active: index === activeIndex -1},{unselect: index > activeIndex-1}]">
                <div class="el-step__icon-inner" v-if="index >= activeIndex -1">{{index+1}}</div>
                <i v-else class="el-step__icon-inner is-status el-icon-check" style="transition-delay: 0ms; border-width: 0px; "></i>
            </div>
            <div :class="['el-step__title is-success title__text__model',{unselect: index > activeIndex-1}]">{{item}}</div>
            <div :class="['el-step__line currentLine',{active:index < activeIndex -1}]"></div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        activeIndex: {
            type: Number,
            default () {
                return -1;
            }
        },
        activeLineBool: {
            type: Boolean,
            default () {
                return false;
            }
        },
        activeTextClass: {
            type: String,
            default () {
                return null;
            }
        },
        defalutTextClass: {
            type: String,
            default () {
                return null;
            }
        },
        textArray: {
            type: Array,
            default () {
                return null;
            }
        }
    },

    data () {
        return {
           
        };
    },

    computed: {},

    watch: {
     
    },
    mounted () {
    },
    methods: {
      
    },
    components: {
    
    }
};
</script>

<style lang="scss" scoped>
@import "./../../../../scss/common";
@import "./../../../../scss/variables";
    .title__text__model {
        // float: left;
        position: absolute;
        display: inline-block;
        margin-left: 15px;
        height: 32px;
        line-height: 32px;
        color: $base-color;
    }

    .icon__text__model {
        width: 32px;
        height: 32px;
        color: $base-color !important;
        border-color: $base-color !important;
    }

    .icon__text__model.active {
        background: $base-color;
        border-width: 0px;
        color: white !important;
    }

    .title__text__model.unselect{
        color: #999999 !important;
    }

    .icon__text__model.unselect{
        border-width: 1px;
        color: #999999 !important;
        border-color: #999999 !important;
    }

    .currentLine.active {
        background-color: $base-color !important;
    }

    .currentLine {
        margin-left: 130px;
        margin-right: 15px;
        margin-top:6px;
    }
</style>
