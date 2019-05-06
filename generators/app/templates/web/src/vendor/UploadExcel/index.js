/**
<template>
    <section>
        <upload-excel
            :beforeUpload="handlerBeforeUpload"
            :onSuccess="handlerOnSuccess"
        />
    </section>
</template>
<script>
import UploadExcel from './../../vendor/UploadExcel/UploadExcel.vue';
export default {
    methods: {
        handlerBeforeUpload (rawFile) { // 导入前
            console.log(rawFile);
            return true;

        },
        handlerOnSuccess (excelData) { // 导入完成
            console.log(excelData);
        }
    },
    components: {UploadExcel}
};
</script>
 */

import UploadExcelComponent from './UploadExcel';

const UploadExcel = {
    install: function (Vue) {
        Vue.component('UploadExcel', UploadExcelComponent);
    }
};
export default UploadExcel;
