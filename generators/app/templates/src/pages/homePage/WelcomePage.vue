<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark: 首页欢迎页面
-->
<template>
    <section class="welcome--page-wrap">
        <p class="text">{{text}}</p>
        <img class="img" v-lazy="`./../../../static/img/welcome.png`" alt="首页">
    </section>
</template>

<script>
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                text: CONFIG.welcomeText
            };
        }
    };
</script>

<style scoped lang="scss">
    @import '../../scss/variables';

    .welcome--page-wrap {
        text-align: center;
        .text {
            margin-top: 15%;
            font-size: 22px;
            color: $base-color;
        }
        .img {
            display: inline-block;
            width: 672px;
            height: 320px;
            margin-top: 60px;
        }
    }

</style>
