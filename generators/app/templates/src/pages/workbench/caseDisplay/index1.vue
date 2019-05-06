<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 病例展示
-->
<template>
    <section class="case-display-wrap">
        <section class="page h-fill wrapper">
            <aside class="aside-wrap"></aside>
            <section class="content-wrap">
                <div style="height: 320px; background: #fff;">

                </div>
                <test style="flex: 1; background: #fff; margin-top: 8px;"></test>
            </section>
        </section>
    </section>
</template>

<script>
    import test from './info/test';

    export default {
        components: {test}
    };
</script>

<style scoped lang="scss">
    .case-display-wrap {
        background: none;
        .wrapper {
            display: flex;
            .aside-wrap {
                flex: 0 0 174px;
            }
            .content-wrap {
                flex: 1;
                flex-direction: column;
                margin-left: 8px;
                overflow: auto;
                display: flex;
            }
        }

    }
</style>
