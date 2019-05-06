<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-01 15:41:07
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-01 15:41:07
* @remark: 疾病对照  tab页
-->
<template>
    <ul class="tabs-wrap clearfix">
        <li class="item-wrap" v-for="(item, index) in tabsData" :key="index" @click="handleClick(item, index)" :class="{active: item.index === tabsActive}">
            <!-- <el-tooltip slot="label" effect="dark" :content="item.name" placement="top-start">
                <span>{{item.name}}</span>
                <div slot="content">{{item.name}}:&nbsp;{{item.count}}</div>
            </el-tooltip> -->
            <span :title="`${item.name}：${item.count}${item.rate}`" v-text="item.name"></span>
        </li>
    </ul>
</template>
<script>
    export default {
        data () {
            return {};
        },
        props: {
            tabsData: {
                type: Array,
                default: []
            },
            tabsActive: {
                type: [Number],
                default: 0
            }
        },
        methods: {
            handleClick (item, index) {
                console.log("item: ", item);
                this.$emit('tabsClick', item.status, item.index);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import './../../../scss/_variables.scss';

    .tabs-wrap {
        border-left: 1px solid #E4E7EE;
        border-bottom: 1px solid #E4E7EE;
    }

    .tabs-wrap > .item-wrap {
        float: left;
        padding: 6px 10px;
        cursor: pointer;
        border-right: 1px solid #E4E7EE;
        border-top: 1px solid #E4E7EE;
        box-sizing: border-box;
        &.active {
            background: $base-color;
            color: #fff;
        }
    }
</style>
