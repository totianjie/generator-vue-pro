<template>
    <div>
        <section ref="test_echar" style="width: 500px; height: 500px; border: 1px solid #ccc;"></section>
    </div>
</template>
<script>
export default {
    data () {
        return {
            option: {
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        };
    },
    mounted () {
        this.$nextTick(() => {
            this.myChart = this.$echarts.init(this.$refs.test_echar);
            this.myChart.setOption(this.option);

            this.myChart.on('click', (params) => {
                console.log(params);
            });
        });
    }
};
</script>

