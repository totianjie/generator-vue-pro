<!-- Created by TIANJIE on 2018/5/31 -->
<template>
    <div>
        <div class="page">
            <span>403-权限不足</span>
            <p>在当前登录用户不具有执行当前操作的权限时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为403时跳转到该页面</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'Error403'
    };
</script>
<style lang="scss" scoped>
    @import './../../scss/common';
    @import './../../scss/mixins';
    @import './../../scss/variables';
</style>
