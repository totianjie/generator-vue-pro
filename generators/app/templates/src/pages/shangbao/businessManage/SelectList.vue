<template>
    <el-dialog
        title="添加规则"
        :visible="showRuleList"
        width="50%"
        :before-close="handleCloseDialog"
        class="add-rule-dialog"
    >
        <section>
            <el-row class="m-t-15">
                <el-col :span="18">
                    <v-input label="名称搜索：" :pxUnit="true" :labelWidth="lableWidth">
                        <div class="search-box">
                            <el-input 
                                v-model.trim="inputVal" 
                                placeholder="请输入关键字" 
                                size="mini" 
                                style="border:none"
                            >
                                <i slot="prefix" @click="handleSearch" class="el-input__icon el-icon-search pointer"></i>
                            </el-input>
                        </div>
                    </v-input>
                </el-col>
                <el-button type="primary" @click="handleSearch" :size="btnSize" class="m-l-10">搜索</el-button>
            </el-row>
          
            <el-table
                max-height="300px"
                class="m-t-20"
                :size="tableSize"
                :data="tableData"
                border
                highlight-current-row
                :stripe="true"
                height="100%"
                width="100%"
                @row-dblclick="handleRowDblclick"
                @row-click="handleRowClick"
                @selection-change="handleSelectionChange"
                @select="handleSelect"
                @select-all="handleSelectAll"
            >
                <el-table-column
                    type="selection"
                    width="30"
                />
                <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                />
                <el-table-column
                    :min-width="colWidth"
                    show-overflow-tooltip
                    prop="mainRuleName"
                    label="规则名称" 
                />
                <el-table-column
                    :min-width="colWidth"
                    show-overflow-tooltip
                    prop="violationDesc"
                    label="规则描述" 
                />
            </el-table>
            <!-- table end -->
        </section>
        <!-- footer start -->
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" :size="btnSize" @click="handleAddOk">确 定</el-button>
        </span>
        <!-- footer end -->
    </el-dialog>
</template>
<script>
import CONFIG from 'src/config';
import {getRuleListTable} from 'src/js/api/shangbao/businessManage.js';
export default {
    data () {
        return {
            formSize: CONFIG.homeFormSize,
            tableSize: CONFIG.tableSize,
            lableWidth: 100,
            inputVal: '',
            btnSize: CONFIG.baseBtn,
            tabsActive: 1,
            tableData: [
            ],
            multipleSelection: [],
            selectList: []
        };
    },
    props: {
        showRuleList: {
            type: Boolean,
            default () {
                return false;
            }
        }
    },
    create () {

    },
    methods: {
        _getData () {
            // 每次请求前先清除
            this.selectList.length = 0;
            getRuleListTable({mainRuleName: this.inputVal}).then(res => {
                this.tableData.length = 0;
                if (res && Array.isArray(res.data)) {
                    this.tableData = Object.assign([], res.data);
                }
            });
            // TODO 临时 数据
            // this.tableData = Object.assign([], [{"detailCode": "detailCode", "detailName": "detailName", "detailType": "detailType", "type": "string"}]);
        },
        handleSearch () {
            if (this.inputVal === '') {
                return false;
            }
            this._getData();
        },
        handleTabsClick (targetVue, ev) {
        },
        handleCloseDialog () {
            this._close();
        },
        handleAddOk () {
            if (this.selectList.length === 0) {
                this.$toast("请先输入,不可为空");
                return false;
            }
            this.$emit('addRule', JSON.parse(JSON.stringify(this.multipleSelection)));
            this._close();
        },
        _close () {
            this.$emit('update:showRuleList', false);
            this.inputVal = '';
        },
        /* 表格相关操作 start */
        handleRowDblclick (obj) {
            this.$emit('addRule', [JSON.parse(JSON.stringify(obj))]);
            this._close();
        },
        handleRowClick (obj) {
        },
        handleSelect (arr) {
            this.selectList = Object.assign([], arr);
        },
        handleSelectAll (arr) {
            this.selectList = Object.assign([], arr);
        },
        handleSelectionChange (val) {
            this.multipleSelection = Object.assign([], val);
        }
        /* 表格相关操作 end */
    }
};
</script>
<style lang="scss" scoped>
.add-rule-dialog {
    /deep/ .el-dialog__body {
        padding-top: 0;
        padding-bottom: 0;
    }
    .search-box {
        height: 28px;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid #E4E7EE;
        /deep/ .el-input.el-input--mini.el-input--prefix>input {
            border: none;
            outline:none;
        }
    }
    /deep/ .el-table .el-table__row:hover {
        cursor: pointer;
    }
}

</style>


