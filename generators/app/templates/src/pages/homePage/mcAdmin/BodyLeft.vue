<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark: 主体盒子left部份
-->
<template>
    <section class="body-left-wrap">
        <body-left-top class="top"/>
        <body-left-bottom class="bottom"/>
    </section>
</template>

<script>
    import BodyLeftTop from './BodyLeftTop';
    import BodyLeftBottom from './BodyLeftBottom';

    export default {
        components: {BodyLeftTop, BodyLeftBottom}
    };
</script>

<style scoped lang="scss">
    @import './../../../scss/_variables.scss';

    .body-left-wrap {
        .top {
            height: 280px;
        }
        .bottom {
            height: calc(100% - 280px);
            border-top: 8px solid $body-bg;
            box-sizing: border-box;
        }
    }
</style>
