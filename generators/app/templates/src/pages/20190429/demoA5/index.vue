<template>
    <div class="page" style="width:calc(100% - 20px); overflow-x: hidden;">
        <v-search-box class="wrapper">
            <div>
                <el-col :span="span">
                    <v-input label="出院日期：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <el-date-picker
                            :size="formSize"
                            class="w-fill"
                            v-model="dates"
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="timestamp"
                            range-separator="至"
                            :editable="false"
                            @change="handlerChange"
                            :picker-options="pickerOptions"
                            :clearable="true"
                            start-placeholder="起始日期"
                            @blur="blur"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="科室" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <v-select v-model="selectMenu1" :list="deps" :size="formSize" :props="selectProps" placeholder="请选择" />
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="医师" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <v-select v-model="selectMenu2" :list="doctors" :size="formSize" :props="selectProps" placeholder="请选择" />
                    </v-input>
                </el-col>
            </div>
            <div slot="btn">
                <el-button @click="handlerSearch" class="m-l-20" :size="btnSize">查询</el-button>
            </div>
        </v-search-box>
        <div style="height: calc(100% - 50px); width: 100%; border-top: 1px solid #ccc;">
            <div class="line1" style="height: 33.3%; width: 100%">
                <div class="echarts-line pull-left">
                    <section class="w-h-fill" ref="bar2"></section>
                </div>
                <div class="echarts-line pull-right">
                    <section class="w-h-fill" ref="bar3"></section>
                </div>
            </div>
            <div class="line2" style="height: 33.3%; width: 100%">
                <div class="echarts-line pull-left">
                    <section class="w-h-fill" ref="bar4"></section>
                </div>
                <div class="echarts-line pull-right">
                    <section class="w-h-fill" ref="bar5"></section>
                </div>
            </div>
            <div class="line3" style="height: 33.3%; width: 100%">

                <div class="echarts-line pull-left">
                    <section class="w-h-fill" ref="bar6"></section>
                </div>
            </div>
        </div>
       
    </div>
</template>
<script>
    // import echarts from 'echarts';
    import CONFIG from "src/config";
    export default {
        data () {
            return {
                span: 7,
                lableWidth: 136,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                selectProps: {
                    name: 'name',
                    value: 'name'
                },
                deps: [
                    {name: '妇科'},
                    {name: '产科'}
                ],
                doctors: [
                    {name: '李***(工号: 0984)'},
                    {name: '王***(工号: 0982)'}
                ]
            };
        },
        mounted () {
            this.drawLine();
        },
        methods: {
            drawLine () {
                // this.myChart = this.$echarts.init(this.$refs.bar1);
                // this.myChart.setOption({
                //     tooltip: {
                //         trigger: 'axis'
                //     },
                //     color: ['#3398DB'],
                //     title: {
                //         text: '重点手术名称',
                //         x: 'center',
                //         textStyle: {// 标题样式
                //             color: '#666',
                //             fontSize: 14
                //         },
                //         top: 5
                //     },
                //     xAxis: {
                //         axisLabel: {
                //             interval: 0,
                //             formatter: function (value) {
                //                 var str = "";
                //                 var num = 3;
                //                 var valLength = value.length;
                //                 var rowNum = Math.ceil(valLength / num);
                //                 if (rowNum > 1) {
                //                     for (var i = 0; i < rowNum; i++) {
                //                         var temp = "";
                //                         var start = i * num;
                //                         var end = start + num;
                                        
                //                         temp = value.substring(start, end);
                //                         str += temp;
                //                     }
                //                     return str;
                //                 } else {
                //                     return value;
                //                 }
                //             },
                //             rotate: -15
                //         },
                //         data: ["子宫切除术", "宫腔镜下宫腔粘连切除术", "盆底重建术", "剖宫产", "产钳助产术", "子宫颈根治性切除术", "腹腔镜下子宫次全切除术", "腹腔镜下子宫全切除术", "腹腔镜下子宫肌瘤切除术", "宫腔镜电切术", "阴式子宫肌瘤切除术", "乳腺癌根治"]
                //     },
                //     yAxis: {
                //         name: '例数'
                //     },
                //     series: [{
                //         name: '例数',
                //         type: 'bar',
                //         data: [10, 15, 5, 20, 35, 15, 10, 20, 13, 45, 35, 15]
                //     }]
                // });
                this.myChart = this.$echarts.init(this.$refs.bar2);
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#3398DB'],
                    title: {
                        text: '总例数',
                        x: 'center',
                        textStyle: {// 标题样式
                            color: '#666',
                            fontSize: 14
                        },
                        top: 5
                    },
                    xAxis: {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                var str = "";
                                var num = 3;
                                var valLength = value.length;
                                var rowNum = Math.ceil(valLength / num);
                                if (rowNum > 1) {
                                    for (var i = 0; i < rowNum; i++) {
                                        var temp = "";
                                        var start = i * num;
                                        var end = start + num;
                                        
                                        temp = value.substring(start, end);
                                        str += temp;
                                    }
                                    return str;
                                } else {
                                    return value;
                                }
                            },
                            rotate: -15
                        },
                        data: ["子宫切除术", "宫腔镜下宫腔粘连切除术", "盆底重建术", "剖宫产", "产钳助产术", "子宫颈根治性切除术", "腹腔镜下子宫次全切除术", "腹腔镜下子宫全切除术", "腹腔镜下子宫肌瘤切除术", "宫腔镜电切术", "阴式子宫肌瘤切除术", "乳腺癌根治"]
                    },
                    yAxis: {
                        name: '例数'
                    },
                    series: [{
                        name: '例数',
                        type: 'bar',
                        data: [10, 15, 20, 15, 30, 35, 15, 20, 10, 40, 5, 10]
                    }]
                });
                this.myChart = this.$echarts.init(this.$refs.bar3);
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#3398DB'],
                    title: {
                        text: '死亡例数',
                        x: 'center',
                        textStyle: {// 标题样式
                            color: '#666',
                            fontSize: 14
                        },
                        top: 5
                    },
                    xAxis: {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                var str = "";
                                var num = 3;
                                var valLength = value.length;
                                var rowNum = Math.ceil(valLength / num);
                                if (rowNum > 1) {
                                    for (var i = 0; i < rowNum; i++) {
                                        var temp = "";
                                        var start = i * num;
                                        var end = start + num;
                                        
                                        temp = value.substring(start, end);
                                        str += temp;
                                    }
                                    return str;
                                } else {
                                    return value;
                                }
                            },
                            rotate: -15
                        },
                        data: ["子宫切除术", "宫腔镜下宫腔粘连切除术", "盆底重建术", "剖宫产", "产钳助产术", "子宫颈根治性切除术", "腹腔镜下子宫次全切除术", "腹腔镜下子宫全切除术", "腹腔镜下子宫肌瘤切除术", "宫腔镜电切术", "阴式子宫肌瘤切除术", "乳腺癌根治"]
                    },
                    yAxis: {
                        name: '例数'
                    },
                    series: [{
                        name: '例数',
                        type: 'bar',
                        data: [4, 2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
                    }]
                });
                this.myChart = this.$echarts.init(this.$refs.bar4);
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#3398DB'],
                    title: {
                        text: '术后非预期再手术例数',
                        x: 'center',
                        textStyle: {// 标题样式
                            color: '#666',
                            fontSize: 14
                        },
                        top: 5
                    },
                    xAxis: {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                var str = "";
                                var num = 3;
                                var valLength = value.length;
                                var rowNum = Math.ceil(valLength / num);
                                if (rowNum > 1) {
                                    for (var i = 0; i < rowNum; i++) {
                                        var temp = "";
                                        var start = i * num;
                                        var end = start + num;
                                        
                                        temp = value.substring(start, end);
                                        str += temp;
                                    }
                                    return str;
                                } else {
                                    return value;
                                }
                            },
                            rotate: -15
                        },
                        data: ["子宫切除术", "宫腔镜下宫腔粘连切除术", "盆底重建术", "剖宫产", "产钳助产术", "子宫颈根治性切除术", "腹腔镜下子宫次全切除术", "腹腔镜下子宫全切除术", "腹腔镜下子宫肌瘤切除术", "宫腔镜电切术", "阴式子宫肌瘤切除术", "乳腺癌根治"]
                    },
                    yAxis: {
                        name: '例数'
                    },
                    series: [{
                        name: '例数',
                        type: 'bar',
                        data: [4, 2, 3, 1, 1, 2, 1, 1, 1, 2, 1, 1]
                    }]
                });
                this.myChart = this.$echarts.init(this.$refs.bar5);
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#3398DB'],
                    title: {
                        text: '平均住院日',
                        x: 'center',
                        textStyle: {// 标题样式
                            color: '#666',
                            fontSize: 14
                        },
                        top: 5
                    },
                    xAxis: {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                var str = "";
                                var num = 3;
                                var valLength = value.length;
                                var rowNum = Math.ceil(valLength / num);
                                if (rowNum > 1) {
                                    for (var i = 0; i < rowNum; i++) {
                                        var temp = "";
                                        var start = i * num;
                                        var end = start + num;
                                        
                                        temp = value.substring(start, end);
                                        str += temp;
                                    }
                                    return str;
                                } else {
                                    return value;
                                }
                            },
                            rotate: -15
                        },
                        data: ["子宫切除术", "宫腔镜下宫腔粘连切除术", "盆底重建术", "剖宫产", "产钳助产术", "子宫颈根治性切除术", "腹腔镜下子宫次全切除术", "腹腔镜下子宫全切除术", "腹腔镜下子宫肌瘤切除术", "宫腔镜电切术", "阴式子宫肌瘤切除术", "乳腺癌根治"]
                    },
                    yAxis: {
                        name: '天数'
                    },
                    series: [{
                        name: '天数',
                        type: 'bar',
                        data: [10, 10, 11, 10, 15, 10, 4, 11, 18, 7, 8, 10]
                    }]
                });
                this.myChart = this.$echarts.init(this.$refs.bar6);
                this.myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#3398DB'],
                    title: {
                        text: '平均住院费用',
                        x: 'center',
                        textStyle: {// 标题样式
                            color: '#666',
                            fontSize: 14
                        },
                        top: 5
                    },
                    xAxis: {
                        axisLabel: {
                            interval: 0,
                            formatter: function (value) {
                                var str = "";
                                var num = 3;
                                var valLength = value.length;
                                var rowNum = Math.ceil(valLength / num);
                                if (rowNum > 1) {
                                    for (var i = 0; i < rowNum; i++) {
                                        var temp = "";
                                        var start = i * num;
                                        var end = start + num;
                                        
                                        temp = value.substring(start, end);
                                        str += temp;
                                    }
                                    return str;
                                } else {
                                    return value;
                                }
                            },
                            rotate: -15
                        },
                        data: ["子宫切除术", "宫腔镜下宫腔粘连切除术", "盆底重建术", "剖宫产", "产钳助产术", "子宫颈根治性切除术", "腹腔镜下子宫次全切除术", "腹腔镜下子宫全切除术", "腹腔镜下子宫肌瘤切除术", "宫腔镜电切术", "阴式子宫肌瘤切除术", "乳腺癌根治"]
                    },
                    yAxis: {
                        name: '费用'
                    },
                    series: [{
                        name: '费用',
                        type: 'bar',
                        data: [17100, 16000, 25000, 8000, 16000, 13000, 10000, 9000, 11665, 11150, 35000, 17000]
                    }]
                });
            }
        }
    };

</script>
<style scoped lang="scss">
    .echarts-line{
        height: 100%;
        width: 49%;
    }
</style>


