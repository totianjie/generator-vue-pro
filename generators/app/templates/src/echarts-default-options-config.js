/*
* @Author: mikey.TIANJIE
* @Date: 2018/11/16
* @remark: echarts 默认配置
* */

/*
// 拆线图
export const LINE = {
    color: ['#F77293', '#A79FFF', '#7098FF'], // 柱状的颜色
    title: {
        text: '2018年支付费用增长趋势图',
        x: 'center',
        textStyle: {// 标题样式
            color: '#333',
            fontSize: 14
        }
    },
    tooltip: {
        trigger: 'axis',
        padding: 10,
        confine: true
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
        right: '50',
        bottom: '20',
        top: '80',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
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
};
// 饼图
export const PIE = {
    color: ['#8378EA', '#E7BCF3', '#F77193', '#F89F7F', '#FBDB5C', '#9FE6B8', '#40C5E9'],
    title: {
        text: '违规病例中各年龄层分布图',
        x: 'center',
        textStyle: {
            color: '#333',
            fontSize: 14

        },
        subtext: '单位：份'
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
            {value: 335, name: '小于1岁'},
            {value: 310, name: '1岁~16岁'},
            {value: 274, name: '16岁~44岁'},
            {value: 235, name: '44岁~60岁'},
            {value: 400, name: '60岁~75岁'},
            {value: 400, name: '75岁以上'},
            {value: 400, name: '其它'}
        ]
    },
    calculable: true,
    series: [
        {
            name: '违规病例中各年龄层分布图',
            type: 'pie',
            radius: [30, 110], // 中心圆的大小
            center: ['40%', '60%'], // 图形的位置
            roseType: 'area',
            data: [
                {value: 335, name: '小于1岁'},
                {value: 310, name: '1岁~16岁'},
                {value: 274, name: '16岁~44岁'},
                {value: 235, name: '44岁~60岁'},
                {value: 400, name: '60岁~75岁'},
                {value: 400, name: '75岁以上'},
                {value: 400, name: '其它'}
            ],
            label: { // 设置文字
                normal: { // 设置文字不显示
                    formatter: "{b} \n {c} ({d}%)", // 格式化文字样式
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
};
* */
