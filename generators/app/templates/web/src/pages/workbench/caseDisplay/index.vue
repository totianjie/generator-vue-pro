<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 病例展示
-->
<template>
    <section class="case-display-wrap">
        <section class="page h-fill wrapper">
            <Aside class="aside-wrap"/>
            <Main class="content-wrap"/>
        </section>
    </section>
</template>

<script>
    import Main from './Main';
    import Aside from './Aside';

    export default {
        components: {Main, Aside}
    };
</script>

<style scoped lang="scss">
    .case-display-wrap {
        background: none;
        .wrapper {
            display: flex;
            .aside-wrap {
                flex: 0 0 174px;
                overflow: auto;
                background-color: #fff;
            }
            .content-wrap {
                flex: 1;
                margin-left: 8px;
                overflow: auto;
            }
        }
        & /deep/ .dialog-title {
            padding-left: 11px;
            font-size: 18px;
            color: #333333;
            border-left: 4px solid #4579C5;
        }
    }
</style>
