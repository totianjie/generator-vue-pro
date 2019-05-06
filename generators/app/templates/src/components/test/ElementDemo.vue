<template>
    <div class="box">
        <div class="page element-demo">
            <h1>table</h1>
            <TestTableCreated />
            <h1>export 2 zip</h1>
            <Export2Zip />
            <h1>export 2 excel</h1>
            <Export2Excel />
            <h1>upload excel</h1>
            <upload-excel />
            <h1>表单相关</h1>
            <form-input></form-input>
            <h1>文件上传</h1>
            <file-upload></file-upload>
            <h1>表单验证</h1>
            <test-form></test-form>
            <h1>基础表格加单选</h1>
            <test-table></test-table>
            <h1>多级表头加多选</h1>
            <test-table2></test-table2>
            <h1>关于自定义表格内容</h1>
            <test-table3></test-table3>
            <h1>合并行列</h1>
            <test-table4></test-table4>
            <h1>组织树</h1>
            <test-tree></test-tree>
            <h1>改版的步骤条</h1>
            <test-step></test-step>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import TestForm from './element/TestFome.vue';
    import FileUpload from './element/FileUpload.vue';
    import FormInput from './element/FormInput.vue';
    import TestTable from './element/TestTable.vue';
    import TestTable2 from './element/TestTable2.vue';
    import TestTable3 from './element/TestTable3.vue';
    import TestTable4 from './element/TestTable4.vue';
    import TestTree from './element/TestTree.vue';
    import testStep from './testStep';
    import UploadExcel from './UploadExcel.vue';
    import Export2Excel from './Export2Excel';
    import Export2Zip from './Export2Zip';

    import TestTableCreated from './element/TestTableCreated.vue';

    export default {
        props: {},

        data () {
            return {};
        },

        computed: {},

        watch: {},

        created () {
        },
        mounted () {
        },

        methods: {},

        components: {TestTableCreated, Export2Zip, Export2Excel, UploadExcel, TestForm, FileUpload, FormInput, TestTable, TestTable2, TestTable3, TestTable4, TestTree, testStep}
    }
    ;
</script>
<style scopd lang="scss">
    .box {
        width: 100%;
        height: 100%;
    }

    .element-demo {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;
    }


</style>
