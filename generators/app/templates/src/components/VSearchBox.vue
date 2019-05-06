<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-06-19 13:36:38 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-07-12 13:36:38 
* @remark: 用于首页面  查询条件盒子
-->
<template>
    <div class="v-search-box">
        <div class="input-wrap">
            <slot></slot>
        </div>
        <div class="btn-wrap">
            <slot name="btn"></slot>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    .v-search-box {
        padding: 8px 0;
        overflow: hidden;
        > .input-wrap, > .btn-wrap {
            float: left;
        }
        > .input-wrap {
            width: calc(100% - 146px);
        }
        > .btn-wrap {
            width: 146px;
        }
    }
</style>
