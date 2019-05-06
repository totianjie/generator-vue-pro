<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-08-01 16:04:14 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-08-01 16:04:14 
* @remark: 公用外框布局盒子
-->
<template>
    <el-row class="h-fill">
        <el-col :span="16" class="h-fill left-wrap">
            <slot name="left"></slot>
            <span class="split"></span>
        </el-col>
        <el-col :span="8" class="h-fill">
            <slot name="right"></slot>
        </el-col>
    </el-row>
</template>
<style lang="scss" scoped>
.left-wrap {
    padding-right: 8px;
    box-sizing: border-box;
    position: relative;
    .split {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 100%;
        background-color: #EFF2F6;
    }
}
</style>

