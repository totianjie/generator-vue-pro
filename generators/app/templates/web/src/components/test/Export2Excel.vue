<template>
    <section>
        <h1>export excel</h1>
        <button @click="handleExport">点击导出</button>
    </section>
</template>
<script>
export default {
    
    mounted () {
        
    },
    methods: {
        handleExport () {
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
                const data = [
                    [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date'],
                    [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date'],
                    [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date']
                ];
                excel.export_json_to_excel({
                    header: tHeader, // 表头 必填
                    data, // 具体数据 必填
                    filename: 'excel-list', // 非必填
                    autoWidth: true, // 非必填
                    bookType: 'xlsx' // 非必填
                });
            });
        }
    }
};
</script>
<style>

</style>

