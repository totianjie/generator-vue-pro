<template>
    <div class="wrapper">
        <div class="page">
            <img class="img" v-lazy="imgUrl" alt="not-chrome-img">
            <p class="text">请下载安装谷歌浏览器</p>
            <el-button @click="open" type="primary">下载安装</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                imgUrl: './../../../static/img/not-chrome.png'
            };
        },
        methods: {
            open () {
                // TODO 此链接上线时要换成服务器下载地址
                window.location.href = '//pc.qq.com/detail/1/detail_2661.html';
            }
        }
    };
</script>
<style scoped lang="scss">
    @import './../../scss/variables';

    .wrapper {
        overflow: auto;
        height: 100%;
        .page {
            min-width: 1170px;
            text-align: center;
        }
        .img {
            margin-top: 15%;
            display: inline-block;
            width: 669px;
            height: 243px;
        }
        .text {
            margin-top: 44px;
            margin-bottom: 41px;
            font-size: 18px;
            color: $base-color;
        }
    }
</style>


