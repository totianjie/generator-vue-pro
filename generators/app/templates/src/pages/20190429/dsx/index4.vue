<template>
  <!-- 持续发展评估 -->
  <div class="index4">
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
                           label="医师（工号）"
                           align="center">
          </el-table-column>
          <el-table-column prop="score"
                           label="分值"
                           align="center">
          </el-table-column>
          <el-table-column prop="remarks"
                           label="备注"
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
    "indicatorName": "index4",
    data () {
        return {
            span: 8,
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            tableData: [{
                serialNumber: '1',
                indicatorName: ' 张**（003）',
                score: '33.26',
                remarks: '出入院诊断符合缺失扣分最多'
            }, {
                serialNumber: '2',
                indicatorName: ' 刘**（005）',
                score: '35.99',
                remarks: '出入院诊断符合缺失扣分最多'
            }, {
                serialNumber: '3',
                indicatorName: '李**（006）',
                score: '37.19',
                remarks: '出入院诊断符合缺失扣分最多'
            }, {
                serialNumber: '4',
                indicatorName: '王**（007）',
                score: '37.5',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '5',
                indicatorName: ' 孙**（008）',
                score: '38.1',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '6',
                indicatorName: '吴**（009）',
                score: '40.34',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '7',
                indicatorName: '李**（019）',
                score: '42.15',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '8',
                indicatorName: '王**（025）',
                score: '54.34',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '9',
                indicatorName: '孙**（016）',
                score: '56.43',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '10',
                indicatorName: '张**（052）',
                score: '56.59',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '11',
                indicatorName: '刘**（035）',
                score: '58.39',
                remarks: '出入院诊断符合缺失扣分最多'
            },
            {
                serialNumber: '12',
                indicatorName: '李**（065）',
                score: '73.88',
                remarks: '临床病理诊断符合缺失扣分最多'
            },
            {
                serialNumber: '13',
                indicatorName: '吴**（085）',
                score: '80.08',
                remarks: '临床病理诊断符合缺失扣分最多'
            }
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
.index4 {
  width: 100%;
  .tableData {
    margin-top: 50px;
  }
}
</style>
