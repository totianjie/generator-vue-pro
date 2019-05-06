<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark:
-->
<template>
  <section class="body-left-top">
    <div class="echarts-line">
      <section class="w-h-fill"
               ref="line"></section>
    </div>
    <div class="echarts-pie pos-r">
      <section class="w-h-fill"
               ref="pie"></section>
      <span class="subtitle">单位：份</span>
    </div>
  </section>
</template>

<script>
import busEvent from 'src/busEvent';
import { on, off } from 'src/js/utils/dom';

export default {
    data () {
        return {
            timer: null,
            lineOption: {
                color: ['#F77293', '#A79FFF', '#7098FF'], // 柱状的颜色
                title: {
                    text: `当年支付费用增长趋势图`,
                    x: 'center',
                    textStyle: {// 标题样式
                        color: '#333',
                        fontSize: 14
                    },
                    top: 5
                },
                tooltip: {
                    trigger: 'axis',
                    padding: 10,
                    confine: true,
                    formatter: `
                        {b} <br/>
                        {a0} : {c0}万元 <br/>
                        {a1} : {c1}万元
                        `
                },
                legend: {
                    data: ['病例支付费用', '违规支付费用'],
                    textStyle: {// 右边图例样式
                        color: '#999', // 右边图例字体颜色
                        fontSize: 13// 右边图例字体大小
                    },
                    orient: 'vertical', // 图例列表的布局朝向,分别有水平'horizontal',垂直'vertical'
                    right: 10, // 图例组件离容器右侧的距离
                    top: 30 // 图例组件离容器上侧的距离
                    // bottom: 20 // 图例组件离容器下侧的距
                },
                grid: {
                    left: '30px',
                    right: '50px',
                    bottom: '20',
                    top: '80',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    // data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
                    axisLabel: {// 坐标轴刻度标签的相关设置
                        show: true, // 是否显示刻度标签
                        rotate: -45, // 旋转的角度从 -90 度到 90 度
                        color: '#666', // 标签的颜色
                        fontSize: 13, //  标签的字体大小
                        interval: 0 // 设置成 0 强制显示所有标签
                    },
                    axisTick: { // 坐标轴刻度标签的相关设置
                        inside: true,
                        lineStyle: {
                            width: 2
                        }
                    },
                    axisLine: { // 刻度线的样式
                        lineStyle: {
                            width: 2,
                            color: '#000',
                            fontSize: 13
                        }
                    }
                },
                yAxis: {
                    name: '元',
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}(万)'
                    },
                    axisTick: { // 坐标轴刻度标签的相关设置
                        inside: true,
                        lineStyle: {
                            width: 2
                        }
                    },
                    axisLine: { // 刻度线的样式
                        lineStyle: {
                            width: 2,
                            color: '#000',
                            fontSize: 13
                        }
                    }
                },
                series: [
                    {
                        name: '病例支付费用',
                        type: 'line',
                        // [{name: '', value: ''}] 最好可以使用name,value的方式  就可以和legend同用一个list
                        data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '违规支付费用',
                        type: 'line',
                        data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 356, 310]
                    }
                ]
            },
            pieOption: {
                color: ['#8378EA', '#E7BCF3', '#F77193', '#F89F7F', '#FBDB5C', '#9FE6B8', '#40C5E9'],
                title: {
                    text: '违规病例中各年龄层分布图',
                    x: 'center',
                    textStyle: {
                        color: '#333',
                        fontSize: 14

                    },
                    top: 5
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                legend: {
                    top: 20,
                    right: 10,
                    width: 100,
                    data: [
                        // {value: 335, name: '小于1岁'},
                        // {value: 310, name: '1岁~16岁'},
                        // {value: 274, name: '16岁~44岁'},
                        // {value: 235, name: '44岁~60岁'},
                        // {value: 400, name: '60岁~75岁'},
                        // {value: 400, name: '75岁以上'},
                        // {value: 400, name: '其它'}
                    ]
                },
                calculable: true,
                series: [
                    {
                        name: '违规病例中各年龄层分布图',
                        type: 'pie',
                        radius: [30, 110], // 中心圆的大小
                        center: ['40%', '52%'], // 图形的位置
                        roseType: 'area',
                        data: [
                            // {value: 335, name: '小于1岁'},
                            // {value: 310, name: '1岁~16岁'},
                            // {value: 274, name: '16岁~44岁'},
                            // {value: 235, name: '44岁~60岁'},
                            // {value: 400, name: '60岁~75岁'},
                            // {value: 400, name: '75岁以上'},
                            // {value: 400, name: '其它'}
                        ],
                        label: { // 设置文字
                            normal: { // 设置文字不显示
                                formatter: "{b}\n{c} ({d}%)",
                                show: false
                            },
                            emphasis: { // 移入时显示
                                show: true
                            }
                        },
                        lableLine: {
                            normal: { // 设置线不显示
                                show: false
                            },
                            emphasis: { // 移入时显示线
                                show: true
                            }
                        }
                    }
                ]
            }
        };
    },
    mounted () {
        this.$nextTick(() => {
            this.lineDom = this.$refs.line;
            this.pieDom = this.$refs.pie;
            // this._init();
        });
        busEvent.$on('component/aside_menu', () => {
            this._resize(300); // 有动画时长，所以时间不定
        });
        // 当年支付费用增长
        this._setLineData();
        // 年龄分段
        this._setPieData();

        on(window, 'resize', this._resize);
    },
    methods: {
        _resize (duration = 100) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.echartLine.resize();
                this.echartPie.resize();
                this.timer = null;
            }, duration);
        },
        _init () {
            this._initLine();
            this._initPie();
        },
        _setLineData () {
            // 当年支付费用增长
            busEvent.$on('homePage/mcAdmin.increasedCosts', ({ data } = { data: [] }) => {
                let xAxisArr = [];
                let pay = [];
                let violations = [];
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach((item) => {
                        xAxisArr.push(item.month);
                        pay.push(Number((item.pay / 10000).toFixed(2)));
                        violations.push(Number((item.violations / 10000).toFixed(2)));
                    });
                } else {
                    xAxisArr = [];
                }
                this.lineOption.xAxis.data = Object.assign([], xAxisArr);
                this.lineOption.series[0].data = Object.assign([], pay);
                this.lineOption.series[1].data = Object.assign([], violations);
                this._initLine();
            });
        },
        _setPieData () {
            // 年龄分段
            busEvent.$on('homePage/mcAdmin.agePiecewise', ({ data } = { data: [] }) => {
                let arr = [];
                if (Array.isArray(data) && data.length > 0) {
                    arr = data.map((item) => {
                        item.value = item.proportionCases;
                        item.name = item.piecewise;
                        return item;
                    });
                } else {
                    arr = [];
                }
                this.pieOption.legend.data = Object.assign([], arr);
                this.pieOption.series[0].data = Object.assign([], arr);
                this._initPie();

            });
        },
        // 拆线
        _initLine () {
            if (this.echartLine) {
                this.echartLine.clear();
            }
            this.echartLine = this.$echarts.init(this.lineDom);
            this.echartLine.setOption(this.lineOption, true);

            this.echartLine.on('click', (params) => {
                console.log(params);
            });
        },
        // 饼图
        _initPie () {
            if (this.echartPie) {
                this.echartPie.clear();
            }
            this.echartPie = this.$echarts.init(this.pieDom);
            this.echartPie.setOption(this.pieOption, true);

            this.echartPie.on('click', (params) => {
                console.log(params);
            });
        }
    },
    destroyed () {
        off(window, 'resize', this._resize);
        busEvent.$off('component/aside_menu');
        busEvent.$off('homePage/mcAdmin.increasedCosts');
        busEvent.$off('homePage/mcAdmin.agePiecewise');
    }
};
</script>

<style scoped lang="scss">
@import "./../../../scss/_variables.scss";

.body-left-top {
  overflow: hidden;
  .echarts-line {
    height: 100%;
    width: 45%;
    float: left;
    box-sizing: border-box;
    border-right: 8px solid $body-bg;
  }
  .echarts-pie {
    height: 100%;
    width: 55%;
    float: right;
    .subtitle {
      position: absolute;
      left: 16px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
