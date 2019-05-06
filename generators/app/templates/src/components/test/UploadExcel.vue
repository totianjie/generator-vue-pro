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
        handlerBeforeUpload (rawFile) {
            console.log(rawFile);
            return true;

        },
        handlerOnSuccess (excelData) {
            console.log(excelData);
        }
    },
    components: {UploadExcel}
};
</script>
<style lang="scss" scoped>

</style>

