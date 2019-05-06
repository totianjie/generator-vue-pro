<template>
  <div class="index">
    <v-search-box>
      <div>
        <el-col :span="span"
                class="search-keyword-class">
          <v-input label="出院日期："
                   :labelWidth="100"
                   :pxUnit="true">
            <el-date-picker v-model="value1"
                            type="daterange"
                            :size="formSize"
                            range-separator="至"
                            start-placeholder="起始时间"
                            end-placeholder="结束时间">
            </el-date-picker>
          </v-input>
        </el-col>
      </div>
      <div slot="btn">
        <el-button @click="handlerSearch"
                   :size="btnSize">查询</el-button>
      </div>
    </v-search-box>
    <el-row :gutter="20">
      <el-col :span="12"
              :offset="4">
        <div class="outpatient"
             ref="outpatient">门诊</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18"
              :offset="3">
        <el-table :data="tableData"
                  border
                  class="tableData">
          <el-table-column prop="serialNumber"
                           label="序号"
                           width="180"
                           align="center">
          </el-table-column>
          <el-table-column prop="indicatorName"
                           label="指标名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="score"
                           label="得分"
                           align="center">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CONFIG from 'src/config';

export default {
    "name": "index",
    data () {
        return {
            span: 8,
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            option: {
                title: {
                    text: '2018年支付费用增长趋势图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['门诊患者均次费用', '住院患者均次费用']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    // feature: {
                    //     saveAsImage: {}
                    // }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
                    // 设置字体倾斜
                    axisLabel: {
                        interval: 0,
                        rotate: -45,
                        // 倾斜度 -90 至 90 默认为0
                        margin: 5,
                        textStyle: {
                            fontWeight: "bolder",
                            color: "#666"
                        }
                    }
                },
                yAxis: {
                    name: `元`,
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: `{value}.00`
                    }
                },
                series: [
                    {
                        name: '门诊患者均次费用',
                        type: 'line',
                        stack: '总量',
                        data: [10000, 12000, 13500, 21000, 25000, 28000, 32000]
                    },
                    {
                        name: '住院患者均次费用',
                        type: 'line',
                        stack: '总量',
                        data: [8000, 15000, 19000, 17000, 9000, 36000, 25000]
                    }
                ]
            },
            tableData: [{
                serialNumber: '1',
                indicatorName: '每名执业医师日均住院工作负担',
                score: '65.00%'
            }, {
                serialNumber: '2',
                indicatorName: '每百张病床药师人数',
                score: '58.00%'
            }, {
                serialNumber: '3',
                indicatorName: '门诊收入占医疗收入比例',
                score: '32.00%'
            }, {
                serialNumber: '4',
                indicatorName: '门诊收入中来自医保基金的比例',
                score: '23.00%'
            },
            {
                serialNumber: '5',
                indicatorName: '住院收入占医疗收入比例',
                score: '75.00%'
            },
            {
                serialNumber: '6',
                indicatorName: '住院收入中来自医保基金的比例',
                score: '60.00%'
            },
            {
                serialNumber: '7',
                indicatorName: '医疗服务收入（不含药品、耗材、检查检验收入）占医疗收入比例',
                score: '30.00%'
            },
            {
                serialNumber: '8',
                indicatorName: '辅助用药收入占比',
                score: '42.00%'
            },
            {
                serialNumber: '9',
                indicatorName: '人员支出占业务支出比重',
                score: '40.00%'
            },

            {
                serialNumber: '10',
                indicatorName: '万元收入能耗支出',
                score: '/'
            },

            {
                serialNumber: '11',
                indicatorName: '收支结余',
                score: '1.2亿'
            },
            {
                serialNumber: '12',
                indicatorName: '资产负债率',
                score: '0.3%'
            },
            {
                serialNumber: '13',
                indicatorName: '医院收入增幅',
                score: '5.00%'
            },
            {
                serialNumber: '14',
                indicatorName: '门诊次均费用增幅',
                score: '9.00%'
            },
            {
                serialNumber: '15',
                indicatorName: '门诊次均药品费用增幅',
                score: '12.00%'
            },
            {
                serialNumber: '16',
                indicatorName: '住院次均费用增幅',
                score: '9.00%'
            },
            {
                serialNumber: '17',
                indicatorName: '门诊次均费用增幅',
                score: '6.00%'
            },
            {
                serialNumber: '18',
                indicatorName: '住院次均药品费用增幅',
                score: '13.00%'
            },
            {
                serialNumber: '19',
                indicatorName: '全面预算管理',
                score: ''
            },
            {
                serialNumber: '20',
                indicatorName: '规范设立总会计',
                score: ''
            }
            ]
        };
    },
    mounted () {
        let outpatient = this.$echarts.init(this.$refs.outpatient);
        outpatient.setOption(this.option, true);

    }
};
</script>
<style lang="scss" scoped>
.index {
  .outpatient {
    margin-top: 30px;
    width: 100%;
    height: 500px;
  }
  .tableData {
    margin-top: 30px;
  }
}
</style>
