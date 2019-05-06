<template>
    <section class="add-subrule">
        <div class="head">
            <el-row>
                <el-col :span="9">
                    <el-form ref="form1" :model="params" :rules="rules" :label-width="formLabelWidth" :size="formSize">
                        <el-form-item prop="subRuleName" label="子规则名称：">
                            <el-col :span="colSpan">
                                <el-input v-model="params.subRuleName" placeholder="请输入规则名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="9">
                    <el-form ref="form2" :model="params" :rules="rules" :label-width="formLabelWidth" :size="formSize">
                        <el-form-item prop="ruleTypeId" label="类型：">
                            <el-col :span="colSpan">
                                <v-select 
                                    :props="listProps" 
                                    v-model="params.ruleTypeId" 
                                    :list="optionsList" 
                                    placeholder="请选择类型" 
                                    :filterable="true" 
                                    class="select-box"
                                />
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="5" class="text-right">
                    <el-button @click="handleAdd" :size="btnSize" type="primary">新增</el-button>
                    <el-button @click="handleDelete" :size="btnSize" type="primary">删除</el-button>
                </el-col>
                <el-col :span="9">
                    <el-form ref="form3" :model="params" :rules="rules" :label-width="formLabelWidth" :size="formSize">
                        <el-form-item prop="remark" label="备注信息：">
                            <el-col :span="colSpan">
                                <el-input type="textarea" :rows="1" v-model="params.remark" placeholder="请输入备注信息"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="split"></div>
        </div>
        <div class="content">
            <el-table
                :size="tableSize"
                :data="tableData"
                height="100%"
                width="100%"
                row-class-name="row-class-name"
                :show-header="false"
                @select="handleSelect"
            >
                <el-table-column
                    type="selection"
                    width="30"
                />

                <el-table-column
                    prop="detailName"
                >
                    <template slot-scope="scope">
                        <span class="table-col-name">名称：</span>
                        <span class="table-col-value text-ellipsis" v-text="scope.row.detailName" :title="scope.row.detailName"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="detailCode"
                >
                    <template slot-scope="scope">
                        <span class="table-col-name">属性值：</span>
                        <span class="table-col-value text-ellipsis" v-text="scope.row.detailCode" :title="scope.row.detailCode"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                >
                    <template slot-scope="scope">
                        <span class="table-col-name">类型：</span>
                        <span class="table-col-value text-ellipsis" v-text="scope.row.type" :title="scope.row.type"></span>
                    </template>
                </el-table-column>
                
            </el-table>
        </div>
        <footer class="footer text-center">
            <el-button @click="handleCancel" :size="btnSize" type="primary">取消</el-button>
            <el-button @click="handleSave" :size="btnSize" type="primary">保存</el-button>
        </footer>
        <Dialog v-model="dialogVisible" @addStandard="handleAddStandard" />
    </section>
</template>
<script>
import CONFIG from 'src/config';
import Dialog from './Dialog';
import {getRuleTypes, save, update, getDetail} from 'src/js/api/shangbao/subRuleManage';
export default {
    data () {
        return {
            colSpan: 24,
            formLabelWidth: '120px',
            btnSize: CONFIG.baseBtn,
            dialogVisible: false,
            formSize: CONFIG.homeFormSize,
            tableSize: CONFIG.tableSize,
            params: {
                subRuleName: '',
                remark: '',
                ruleTypeId: '',
                subRuleId: '' // 只用于编辑，  新增时不需要传给后台
            },
            rules: {
                subRuleName: [
                    {required: true, message: '请输入规则名称'}
                ],
                ruleTypeId: [
                    {required: true, message: '请选择类型'}
                ]
            },
            
            // 下拉框数据
            optionsList: [
                // {ruleTypeName: "aa", ruleTypeId: '1'},
                // {ruleTypeName: "bb", ruleTypeId: '2'},
                // {ruleTypeName: "cc", ruleTypeId: '3'},
                // {ruleTypeName: "dd", ruleTypeId: '4'}
            ],
            // 下拉框key value值
            listProps: {name: 'ruleTypeName', value: 'ruleTypeId'},
            tableData: [
                // {"detailCode": "detailCode", "detailName": "detailName", "detailType": "detailType", "type": "string", "_index": 0}
            ],
            // 已选择的表格项
            selectList: []
        };
    },
    props: {
        value: {
            type: String,
            default () {
                return 'add';
            }
        },
        isAdd: {
            type: Boolean,
            default () {
                return true;
            }
        },
        subRuleId: {
            type: String,
            default () {
                return "";
            }
        }
    },
    created () {
        getRuleTypes().then(res => {
            this.optionsList = Object.assign([], res.data);
        }).catch(() => {
            // 请求失败，返回列表页面
            this._back();
        });
    },
    mounted () {
        console.log("isAdd", this.isAdd);
        console.log("subRuleId", this.subRuleId);
        if (!this.isAdd) { // 编辑
            this.params.subRuleId = this.subRuleId;
            this._getDetail().catch(_err => {
                // 请求失败，返回列表页面
                this._back();
            });
        }
    },
    methods: {
        async _getDetail () {
            let res = await getDetail({subRuleId: this.subRuleId});
            let {ruleKbList, remark, ruleTypeId, subRuleId, subRuleName} = res.data;
            this.tableData = Object.assign([], ruleKbList);
            this.params = Object.assign({}, {
                subRuleName,
                remark,
                ruleTypeId,
                subRuleId
            });
        },
        // 添加标准数据
        handleAddStandard (list = []) {
            let index = this.tableData.length;
            list.forEach((element, i) => {
                element._index = index + i;
                this.tableData.push(element);
            });
        },
        handleSelect (arr) {
            console.log(arr);
            this.selectList = Object.assign([], arr);
        },
        handleAdd () {
            console.log("添加");
            this.dialogVisible = true;
        },
        handleDelete () {
            console.log("删除");
            if (this.selectList.length === 0) {
                this.$toast("请先选择");
                return false;
            }
            this.selectList.forEach(item => {
                let result = this.tableData.findIndex(ele => ele._index === item._index);
                if (result !== -1) {
                    this.tableData.splice(result, 1);
                }
            });
            this.selectList.length = 0;
        },
        handleCancel () {
            console.log("取消");
            this._back();
        },
        async handleSave () {
            console.log("保存");
            await new Promise((resolve, reject) => this.$refs.form1.validate(val => val ? resolve(val) : reject(val)));
            await new Promise((resolve, reject) => this.$refs.form2.validate(val => val ? resolve(val) : reject(val)));
            await new Promise((resolve, reject) => this.$refs.form3.validate(val => val ? resolve(val) : reject(val)));
            /*
                {
                    "remark": "string",
                    "ruleKbList": [
                        {
                        "detailCode": "string",
                        "detailName": "string",
                        "detailType": "string",
                        "type": "string"
                        }
                    ],
                    "ruleTypeId": 0,
                    "subRuleId": "string",
                    "subRuleName": "string"
                }
            */
            let ruleKbList = JSON.parse(JSON.stringify(this.tableData));
            ruleKbList.forEach((item) => {
                delete item._index;
            });
            let params = Object.assign({}, this.params, {ruleKbList});
            if (this.isAdd) {
                delete params.subRuleId;
            }
            let ajax = this.isAdd ? save : update;
            await ajax(params);
            this._back();
        },
        _back () {
            this.$emit("input", "list");
        }
    },
    components: {
        Dialog
    }
};
</script>

<style lang="scss" scoped>
.add-subrule {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 10px;
    box-sizing: border-box;
    .head {
        .split {
            height: 8px;
            background: #EFF2F6;
        }
    }
    .content {
        padding-top: 8px;
        flex: 1;
        overflow: auto;
        
        /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
            background: #fff;
        }
        /deep/ .el-table,  /deep/ .el-table td{
            border: none;
        }
        .table-col-name {
            display: inline-block;
            width: 50px;
            text-align: right;
        }
        .table-col-value {
            display: inline-block;
            width: calc(100% - 70px);
            position: relative;
            top: 3px;
        }
    }
    .footer {
        padding: 20px;
    }
}
</style>
