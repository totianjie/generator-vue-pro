<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 病例展示表格
-->
<template>
  <section class="wrap">
    <el-table
      v-if="showTable"
      class="table"
      :size="tableSize"
      :data="tableData"
      style="width: 100%"
      cell-class-name="pointer"
      type="selection"
      ref="multipleTable"
      height="100%"
      border
      :highlight-current-row="true"
      :stripe="true"
      @row-dblclick="handleRowDblclick"
      @row-click="handleRowClick"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
      <el-table-column prop="jzcode" label="就诊号" :min-width="70" show-overflow-tooltip></el-table-column>
      <el-table-column prop="caseType" show-overflow-tooltip :min-width="80" label="病例类型"></el-table-column>
      <el-table-column prop="caseStatus" show-overflow-tooltip :min-width="80" label="病例状态"></el-table-column>
      <el-table-column prop="paymentTotal" show-overflow-tooltip :min-width="100" label="医疗费总额"></el-table-column>
      <el-table-column prop="illegalFee" show-overflow-tooltip label="违规费用" :min-width="80"></el-table-column>
      <el-table-column prop="illegalCount" show-overflow-tooltip label="违规数量" :min-width="80"></el-table-column>
      <el-table-column prop="jgName" show-overflow-tooltip label="医疗服务机构名称" :min-width="120"></el-table-column>
      <el-table-column prop="admDept" show-overflow-tooltip label="入院科室" :min-width="80"></el-table-column>
      <el-table-column prop="disDept" show-overflow-tooltip label="出院科室" :min-width="80"></el-table-column>
      <el-table-column prop="outDiagCode" show-overflow-tooltip label="原始主要诊断编码" :min-width="120"></el-table-column>
      <el-table-column prop="medicalType" show-overflow-tooltip label="医疗类型" :min-width="80"></el-table-column>
      <el-table-column prop="name" show-overflow-tooltip label="姓名" :min-width="70"></el-table-column>
      <el-table-column prop="sex" show-overflow-tooltip label="性别" width="50">
          <template slot-scope="scope">
          <span>{{scope.row.sex | formatSex}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="age" show-overflow-tooltip label="年龄" width="50">
          <template slot-scope="scope">
          <span>{{scope.row.age | formatAge}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="outDate" show-overflow-tooltip label="出院日期">
          <template slot-scope="scope">
          <span>{{scope.row.outDate | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
          </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import CONFIG from "src/config";

export default {
    data () {
        return {
            showTable: true,
            tableSize: CONFIG.tableSize
        };
    },
    props: {
        tableData: {
            type: Array,
            default: []
        },
        currentItem: {
            type: Object,
            default: {
                current: "",
                nodeName: "",
                nodeCode: ""
            }
        }
    },
    model: {
        prop: "tableData"
    },
    methods: {
        reload () {
            this.showTable = false;
            this.$nextTick(res => {
                this.showTable = true;
            });
        },
        // 某一行被双击
        handleRowDblclick (row, event) {
            console.log("某一行被双击", row, event);
        },
        // 当某一行被点击时
        handleRowClick (row = {}, event, column = {}) {
            this.$emit("rowClick", { row, event, column });
        },
        // 单个选择取消
        handleSelect (selection, row) {
            console.log("单个选择取消", selection, row);
            this.$emit("selection", selection);
        },
        // 选择全部   取消全部
        handleSelectAll (selections) {
            this.$emit("selection", selections);
        },
        _reset () {
            this.reload();
        }
    },
    filters: {
        formatSex (val) {
            return val + "" === "2" ? "女" : "男";
        },
        formatAge (val) {
            if (val === null || val === undefined) {
                return "未知";
            }
            return Math.ceil(typeof val === "string" ? parseInt(val) : val / 12);
        }
    }
};
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .table {
    flex: 1;
  }
}
/deep/ .el-table th.gutter {
  display: table-cell !important;
}

/deep/ .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>
