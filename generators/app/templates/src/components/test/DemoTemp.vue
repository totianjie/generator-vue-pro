<template>
    <div>
        <div class="split"></div>
        test border
        <test-border></test-border>
        <div class="split"></div>
        test async
        <test-async></test-async>
        <div class="split"></div>
        test-table
        <test-table></test-table>
        <test-table2></test-table2>
        <div class="split"></div>
        echarts
        <test-echarts></test-echarts>

        <div class="split"></div>
        <v-input-demo></v-input-demo>
        <div class="split"></div>
        <v-select-demo></v-select-demo>
        <div class="split"></div>
        <v-item-detail-demo></v-item-detail-demo>
        <div class="split"></div>
        dialog:
        <v-dialog-demo></v-dialog-demo>
        <div class="split"></div>
        .sync:
        <test-vue-sync></test-vue-sync>
        <div class="split"></div>
        props:
        <test-props type="color" placeholder="wq vb " name="12" v-bind='{a: 12, b: 5}' class="aa test"></test-props>
        <div class="split"></div>
        slot:
        <test-slot>
            <h1 slot="head">
                <span>头部</span>
                <span>123</span>
            </h1>
            <main>主体</main>
            <h1 slot="foot">页尾</h1>
        </test-slot>
        <div class="split"></div>
        components is
        <test-components-is></test-components-is>
        <v-scroller :data="data"> </v-scroller>
    </div>
</template>
<script>
    import VInputDemo from './demoTemp/VInputDemo.vue';
    import VSelectDemo from './demoTemp/VSelectDemo.vue';
    import VItemDetailDemo from './demoTemp/VItemDetailDemo.vue';
    import VDialogDemo from './demoTemp/VDialogDemo.vue';
    import TestVueSync from './demoTemp/TestVueSync';
    import TestProps from './demoTemp/TestProps.vue';
    import TestSlot from './demoTemp/TestSlot.vue';
    import TestComponentsIs from './demoTemp/TestComponentsIs.vue';
    import TestEcharts from './demoTemp/TestEcharts';
    import TestTable from './demoTemp/TestTable';
    import TestTable2 from './demoTemp/TestTable2';
    import TestAsync from './demoTemp/TestAsync';
    import TestBorder from './demoTemp/Test-border';
    // import VScroller from './demoTemp/VScroller';
    export default {
        data () {
            return {
                data: ["1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2"]
            };
        },
        components: {
            VInputDemo,
            VSelectDemo,
            VItemDetailDemo,
            VDialogDemo,
            TestVueSync,
            TestProps,
            TestSlot,
            TestComponentsIs,
            TestEcharts,
            TestTable,
            TestAsync,
            TestTable2,
            TestBorder
            // VScroller
        }
    };
</script>
<style scoped lang="scss">
    .split {
        height: 30px;
        background: #C0C4CC;
    }
    .s{
        height: 50px;
    }
</style>


