<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark: 首页
-->
<template>
    <div class="home-page">
        <div class="page">
            <!-- 欢迎页面 -->
            <component :is="temp"></component>
        </div>
    </div>
</template>
<script>
    const WelcomePage = () => import('./WelcomePage'); // 欢迎页面
    const McAdmin = () => import('./mcAdmin'); // 双控项目 管理者首页
    export default {
        data () {
            return {
                temp: 'WelcomePage'
            };
        },
        components: {WelcomePage, McAdmin}
    };
</script>
<style scoped lang="scss">


    .home-page .page {
        height: 100%;
    }
</style>
