<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark: 主体盒子
-->
<template>
    <section class="mc-body-wrap">
        <body-left class="left-wrap"/>
        <body-right class="right-wrap"/>
    </section>
</template>

<script>
    import BodyLeft from './BodyLeft';
    import BodyRight from './BodyRight';

    export default {
        components: {BodyLeft, BodyRight}
    };
</script>

<style scoped lang="scss">
    @import './../../../scss/_variables.scss';

    .mc-body-wrap {
        border-top: 8px solid $body-bg;
        min-height: 630px;
        overflow: hidden;
        .left-wrap {
            border-right: 8px solid $body-bg;
            width: calc(100% - 422px);
            height: 100%;
            float: left;
            box-sizing: border-box;
        }
        .right-wrap {
            width: 422px;
            height: 100%;
            float: right;
        }
    }
</style>
