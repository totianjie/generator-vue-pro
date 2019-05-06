<template>
    <div class="home-page">
        <div class="page">
            <p class="text">{{text}}</p>
            <img class="img" v-lazy="`./../../static/img/welcome.png`" alt="首页">
        </div>
    </div>
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
    @import './../scss/variables';

    .home-page {
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


