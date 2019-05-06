<template>
    <el-dialog
        title="添加"
        :visible.sync="value"
        width="50%"
        :before-close="handleCloseDialog"
        class="add-rule-dialog"
    >
        <section>
            <!-- search start -->
            <el-row class="m-t-15">
                <el-col :span="18">
                    <v-input label="名称搜索：" :pxUnit="true" :labelWidth="lableWidth">
                        <div class="search-box">
                            <el-input
                                @keyup.enter.native="handleSearch"
                                v-model.trim="inputVal"
                                placeholder="请输入"
                                size="mini"
                                style="border:none"
                            >
                                <i slot="prefix" @click="handleSearch" class="el-input__icon el-icon-search pointer"></i>
                            </el-input>
                        </div>
                    </v-input>
                </el-col>
                <el-col :span="6">
                    <el-button class="m-l-10" type="primary" :size="btnSize" @click="handleSearch">搜索</el-button>
                </el-col>
            </el-row>
            <!--search end -->

            <!-- table start -->
            <el-table
                class="m-t-20"
                :size="tableSize"
                :data="tableData"
                border
                highlight-current-row
                :stripe="true"
                height="250"
                width="100%"
                @row-dblclick="handleRowDblclick"
                @row-click="handleRowClick"
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
                    prop="subRuleName"
                    label="规则名称"
                />
                <el-table-column
                    :min-width="colWidth"
                    show-overflow-tooltip
                    prop="remark"
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
import {getSubRuleList} from 'src/js/api/shangbao/ruleM';
export default {
    data () {
        return {
            formSize: CONFIG.homeFormSize,
            tableSize: CONFIG.tableSize,
            lableWidth: 100,
            inputVal: '',
            btnSize: CONFIG.baseBtn,
            tableData: [
                // {
                //     "categoryId": 0,
                //     "categoryName": "string",
                //     "creatTime": "2019-01-25T10:23:49.690Z",
                //     "createBy": "string",
                //     "deleteFlag": 0,
                //     "enable": 0,
                //     "mainIllegalLevel": 0,
                //     "mainRuleId": 0,
                //     "mainRuleName": "mainRuleName ",
                //     "mainRuleStatus": 0,
                //     "remark": "string",
                //     "ruleLevel": 0,
                //     "updateBy": "string",
                //     "updateTime": "2019-01-25T10:23:49.690Z",
                //     "violationDesc": "violationDesc "
                // }
            ],
            // 已选择的表格项
            selectList: []
        };
    },
    props: {
        value: {
            type: Boolean,
            default () {
                return false;
            }
        }
    },
    methods: {
        _getData () {
            // 每次请求前先清除
            console.log("加载 数据");
            this.selectList.length = 0;
            console.log(this.selectList);
            let params = {
                name: this.inputVal
            };
            getSubRuleList(params).then(res => {
                this.tableData.length = 0;
                if (res && Array.isArray(res.data.list)) {
                    this.tableData = Object.assign([], res.data.list);
                }
            });
            // // TODO 临时 数据
            // this.tableData = Object.assign([], [
            //     {
            //         "categoryId": 0,
            //         "categoryName": "string",
            //         "creatTime": "2019-01-25T10:23:49.690Z",
            //         "createBy": "string",
            //         "deleteFlag": 0,
            //         "enable": 0,
            //         "mainIllegalLevel": 0,
            //         "mainRuleId": 0,
            //         "mainRuleName": "mainRuleName ",
            //         "mainRuleStatus": 0,
            //         "remark": "string",
            //         "ruleLevel": 0,
            //         "updateBy": "string",
            //         "updateTime": "2019-01-25T10:23:49.690Z",
            //         "violationDesc": "violationDesc "
            //     }
            // ]);
        },
        handleSearch () {
            console.log("查询==>", this.inputVal);
            if (this.inputVal === '') {
                console.log('请先选择');
                return false;
            }
            this._getData();
        },
        handleCloseDialog () {
            this._close();
        },
        handleAddOk () {
            if (this.selectList.length === 0) {
                this.$toast("请先输入,不可为空");
                return false;
            }
            this.$emit('addStandard', JSON.parse(JSON.stringify(this.selectList)));
            this._close();
        },
        _close () {
            this.$emit('input', false);
            this.inputVal = '';
        },
        /* 表格相关操作 start */
        handleRowDblclick (obj) {
            console.log("dbClick", obj);
            this.$emit('addStandard', [JSON.parse(JSON.stringify(obj))]);
            this._close();
        },
        handleRowClick (obj) {
            console.log('rowClick', obj);
        },
        handleSelect (arr) {
            console.log('select', arr);
            this.selectList = Object.assign([], arr);
        },
        handleSelectAll (arr) {
            console.log("selectAll", arr);
            this.selectList = Object.assign([], arr);
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


