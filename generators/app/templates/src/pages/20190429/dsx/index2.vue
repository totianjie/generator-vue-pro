<template>
  <!-- 持续发展评估 -->
  <div class="index2">
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
    "indicatorName": "index2",
    data () {
        return {
            span: 8,
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            tableData: [{
                serialNumber: '1',
                indicatorName: '卫生技术人员职称结构',
                score: '85.00%'
            }, {
                serialNumber: '2',
                indicatorName: '麻醉、儿科、重症、病理、中医医师占比',
                score: '21.00%'
            }, {
                serialNumber: '3',
                indicatorName: '医护比',
                score: '45.00%'
            }, {
                serialNumber: '4',
                indicatorName: '医院接受其他医院（尤其是对口支援医院、医联体内医院）进修并返回原医院独立工作人数占比',
                score: '11.00%'
            },
            {
                serialNumber: '5',
                indicatorName: '医院住院医师首次参加医师资格考试通过率',
                score: '96.00%'
            },
            {
                serialNumber: '6',
                indicatorName: '医院承担培养医学人才的工作成效',
                score: '89.00%'
            },
            {
                serialNumber: '7',
                indicatorName: '每百名卫生技术人员科研项目经费',
                score: ''
            },
            {
                serialNumber: '8',
                indicatorName: '每百名卫生技术人员科研成果转化金额',
                score: ''
            },
            {
                serialNumber: '9',
                indicatorName: '公共信用综合评价等级',
                score: ''
            }
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
.index2 {
  width: 100%;
  .tableData {
    margin-top: 50px;
  }
}
</style>
