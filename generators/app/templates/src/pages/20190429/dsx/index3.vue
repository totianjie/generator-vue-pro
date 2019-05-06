<template>
  <div class="satisfaction">
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
        <el-col :span="4"
                :offset="1">
          科室
          <el-select v-model="value"
                     clearable
                     placeholder="请选择"
                     size="small">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"
                :offset="1">
          医师
          <el-select v-model="value1"
                     clearable
                     placeholder="请选择"
                     size="small">
            <el-option v-for="item in options1"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </div>
      <div slot="btn">
        <el-button @click="handlerSearch"
                   :size="btnSize">查询</el-button>
      </div>
    </v-search-box>
    <el-row :gutter="24"
            style="margin-top:50px;">
      <el-col :span="8"
              :offset="3">
        <div class="outpatient"
             ref="outpatient">门诊</div>
      </el-col>
      <el-col :span="8"
              :offset="1">
        <div class="hospitalization"
             ref="hospitalization">住院</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"
              :offset="3">
        <div class="medicalService"
             ref="medicalService">医务</div>
      </el-col>
      <el-col :span="8"
              :offset="1">
        <!-- <div class="hospitalization"
             ref="hospitalization"></div> -->
      </el-col>
    </el-row>

  </div>
</template>
<script>
import CONFIG from 'src/config';
export default {
    "name": "satisfaction",
    data () {
        return {
            options: [{
                value: '选项1',
                label: '科室一'
            }, {
                value: '选项2',
                label: '科室二'
            }, {
                value: '选项3',
                label: '科室三'
            }],
            value: '不限',
            options1: [{
                value: '选项1',
                label: '医师一'
            }, {
                value: '选项2',
                label: '医师二'
            }, {
                value: '选项3',
                label: '医师二'
            }],
            value1: '不限',
            span: 8,
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            outpatientOption: {
                title: {// 图表标题
                    text: '门诊患者满意度', // 标题的内容
                    x: 'center', // 标题显示位置,分别有'left', 'center', 'right'
                    textStyle: {// 标题样式
                        color: '#666',
                        fontSize: 14
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
                    // 设置字体倾斜
                    axisLabel: {
                        interval: 0,
                        rotate: -45,
                        // 倾斜度 -90 至 90 默认为0
                        margin: 2,
                        textStyle: {
                            fontWeight: "bolder",
                            color: "#666"
                        }
                    }
                },
                yAxis: {
                    name: `比例`,
                    type: 'value',
                    // min: 0,
                    // max: 500,
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: `{value}%`
                    }
                },

                series: [{
                    data: [3, 9, 22, 32, 66, 69, 70, 75, 72, 80, 81, 90],
                    type: 'line'
                }]
            },
            hospitalizationOption: {
                title: {// 图表标题
                    text: '住院患者满意度', // 标题的内容
                    x: 'center', // 标题显示位置,分别有'left', 'center', 'right'
                    textStyle: {// 标题样式
                        color: '#666',
                        fontSize: 14
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
                    // 设置字体倾斜
                    axisLabel: {
                        interval: 0,
                        rotate: -45,
                        // 倾斜度 -90 至 90 默认为0
                        margin: 2,
                        textStyle: {
                            fontWeight: "bolder",
                            color: "#666"
                        }
                    }
                },
                yAxis: {
                    name: `比例`,
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} %'
                    }
                },
                series: [{
                    data: [10, 15, 17, 32, 35, 39, 50, 55, 57, 70, 75, 80],
                    type: 'line'
                }]
            },
            medicalServiceOption: {
                title: {// 图表标题
                    text: '医务人员满意度', // 标题的内容
                    x: 'center', // 标题显示位置,分别有'left', 'center', 'right'
                    textStyle: {// 标题样式
                        color: '#666',
                        fontSize: 14
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
                    // 设置字体倾斜
                    axisLabel: {
                        interval: 0,
                        rotate: -45,
                        // 倾斜度 -90 至 90 默认为0
                        margin: 2,
                        textStyle: {
                            fontWeight: "bolder",
                            color: "#666"
                        }
                    }
                },
                yAxis: {
                    name: `比例`,
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} %'
                    }
                },
                series: [{
                    data: [20, 40, 45, 60, 65, 70, 63, 72, 75, 77, 75, 80],
                    type: 'line'
                }]
            }
        };
    },
    mounted () {
        let outpatient = this.$echarts.init(this.$refs.outpatient);
        outpatient.setOption(this.outpatientOption, true);

        let hospitalization = this.$echarts.init(this.$refs.hospitalization);
        hospitalization.setOption(this.hospitalizationOption, true);

        let medicalService = this.$echarts.init(this.$refs.medicalService);
        medicalService.setOption(this.medicalServiceOption, true);

    },
    methods: {

    }
};
</script>
<style lang="scss" scoped>
.satisfaction {
  width: 100%;
  .outpatient {
    width: 100%;
    height: 500px;
  }
  .hospitalization {
    width: 100%;
    height: 500px;
  }
  .medicalService {
    width: 100%;
    height: 500px;
  }
}
</style>
