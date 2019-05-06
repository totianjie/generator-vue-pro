<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-06-09 13:41:30 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-07-12 13:41:30 
* @remark: 盒子  外层一个边框
-->
<template>
    <div class="v-input-box">
        <slot></slot>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    .v-input-box {
        width: 100%;
        max-height: 300px;
        overflow: auto;
        padding-top: 12px;
        padding-left: 12px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.15);
    }
</style>
