<template>
    <section>
        <h1>export 2 zip</h1>
        <button @click="handleExport2Zip">export 2 zip</button>
    </section>
</template>
<script>
export default {
    methods: {
        handleExport2Zip () {
            import('@/vendor/Export2Zip').then(zip => {
                const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
                const data = [
                    [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date'],
                    [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date'],
                    [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date']
                ];
                zip.export_txt_to_zip(tHeader, data, 'filename', 'filename');
            });
        }
    }
};
</script>

