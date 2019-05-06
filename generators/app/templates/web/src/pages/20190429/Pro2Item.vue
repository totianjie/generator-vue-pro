<!--
深圳市妇幼保健院医疗质量综合管理系统/住院患者死亡例数
-->
<template>
    <section class="pro-wrap">
        <div class="page h-fill">
            <v-search-box>
                <div>
                    <el-col :span="span" class="search-keyword-class">
                        <v-input label="出院日期：" :labelWidth="110" :pxUnit="true">
                            <el-date-picker
                                v-model="value1"
                                type="daterange"
                                :size="formSize"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </v-input>
                    </el-col>
                </div>
                <div slot="btn">
                    <el-button @click="handlerSearch" :size="btnSize">查询</el-button>
                </div>
            </v-search-box>
            <ul class="list">
                <li ref="item1" class="item on">123</li>
                <li ref="item2" class="item"></li>
                <li ref="item3" class="item on"></li>
                <li ref="item4" class="item on"></li>
            </ul>
        </div>
    </section>
</template>
<script>
import CONFIG from 'src/config';
export default {
    data () {
        return {
            span: 8,
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            obj1: {
                x: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
                y: [10, 330, 220, 10, 52, 200, 52, 200, 334, 390, 334, 390],
                // title: '住院患者死亡例数',
                title: '死亡病例数',
                ytitle: '例数'
            },
            obj2: {
                x: ['科室1', '科室2', '科室3', '科室4', '科室5', '科室6', '科室7', '科室8', '科室9', '科室10', '科室11', '科室12'],
                y: [330, 220, 10, 52, 200, 334, 390, 10, 52, 200, 334, 390],
                title: '科室患者死亡例数',
                ytitle: '例数'
            },
            obj3: {
                x: ['产后出血', '妊娠合并糖尿病', '盆腔炎性疾病', '异位妊娠', '女性生殖器脱垂', '直肠阴道隔子宫内膜异位症', '妊娠滋养细胞疾病', '重度卵巢过度刺激综合征', '重度子痫前期', '早产', '多胎妊娠', '胎膜早破'],
                y: [200, 334, 390, 330, 10, 52, 220, 10, 52, 200, 334, 390],
                // title: '住院患者疾病死亡例数',
                title: '病种死亡例数',
                ytitle: '例数'
            },
            obj4: {
                x: ['医师1', '医师2', '医师3', '医师4', '医师5', '医师6', '医师7', '医师8', '医师9', '医师10', '医师11', '医师22'],
                y: [200, 334, 390, 10, 52, 200, 334, 390, 330, 220, 10, 52],
                title: '医师患者死亡例数',
                ytitle: '例数'
            },
            option1: {
                title: {// 图表标题
                    text: '', // 标题的内容
                    x: 'center', // 标题显示位置,分别有'left', 'center', 'right'
                    textStyle: {// 标题样式
                        color: '#666',
                        fontSize: 14
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '100',
                    right: '4%',
                    bottom: '100',
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {// 坐标轴刻度标签的相关设置
                        show: true, // 是否显示刻度标签
                        rotate: -30, // 旋转的角度从 -90 度到 90 度
                        color: '#666', // 标签的颜色
                        fontSize: 12, // 标签的字体大小
                        interval: 0 // 设置成 0 强制显示所有标签
                    }
                },
                yAxis: {
                    type: 'value',
                    name: ''
                },
                series: {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            },
            option2: {
                title: {// 图表标题
                    text: '', // 标题的内容
                    x: 'center', // 标题显示位置,分别有'left', 'center', 'right'
                    textStyle: {// 标题样式
                        color: '#666',
                        fontSize: 14
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '100',
                    right: '4%',
                    bottom: '100',
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {// 坐标轴刻度标签的相关设置
                        show: true, // 是否显示刻度标签
                        rotate: -30, // 旋转的角度从 -90 度到 90 度
                        color: '#666', // 标签的颜色
                        fontSize: 12, // 标签的字体大小
                        interval: 0 // 设置成 0 强制显示所有标签
                    }
                },
                yAxis: {
                    type: 'value',
                    name: ''
                },
                series: {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            },
            option3: {
                title: {// 图表标题
                    text: '', // 标题的内容
                    x: 'center', // 标题显示位置,分别有'left', 'center', 'right'
                    textStyle: {// 标题样式
                        color: '#666',
                        fontSize: 14
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '100',
                    right: '4%',
                    bottom: '100',
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    // axisTick: {
                    //     alignWithLabel: true
                    // },
                    axisLabel: {// 坐标轴刻度标签的相关设置
                        show: true, // 是否显示刻度标签
                        rotate: -30, // 旋转的角度从 -90 度到 90 度
                        color: '#666', // 标签的颜色
                        fontSize: 12, // 标签的字体大小
                        interval: 0 // 设置成 0 强制显示所有标签
                    }
                },
                yAxis: {
                    type: 'value',
                    name: ''
                },
                series: {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            },
            option4: {
                title: {// 图表标题
                    text: '', // 标题的内容
                    x: 'center', // 标题显示位置,分别有'left', 'center', 'right'
                    textStyle: {// 标题样式
                        color: '#666',
                        fontSize: 14
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '100',
                    right: '4%',
                    bottom: '100',
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    // axisTick: {
                    //     alignWithLabel: true
                    // },
                    axisLabel: {// 坐标轴刻度标签的相关设置
                        show: true, // 是否显示刻度标签
                        rotate: -30, // 旋转的角度从 -90 度到 90 度
                        color: '#666', // 标签的颜色
                        fontSize: 12, // 标签的字体大小
                        interval: 0 // 设置成 0 强制显示所有标签
                    }
                },
                yAxis: {
                    type: 'value',
                    name: ''
                },
                series: {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: []
                }
            }
        };
    },
    mounted () {
        this._init(this.option1, this.obj1, this.$refs.item1);
        this._init(this.option2, this.obj2, this.$refs.item2);
        this._init(this.option3, this.obj3, this.$refs.item3);
        this._init(this.option4, this.obj4, this.$refs.item4);
    },
    methods: {
        _init (option, data, target) {
            option.xAxis.data = data.x;
            option.series.data = data.y;
            option.title.text = data.title;
            option.yAxis.name = data.ytitle;
            let echar = this.$echarts.init(target);
            echar.setOption(option, true);
        }
    }
};
</script>
<style lang="scss" scoped>
.pro-wrap {
    .list {
        overflow: hidden;
        border-top: 1px solid #ccc;
    }
    .list .item {
        width: 50%;
        height: 300px;
        float: left;
        // border-bottom: 1px solid #000;
        &.on {
            // background: #ccc;
        }
    }
    
}
</style>






