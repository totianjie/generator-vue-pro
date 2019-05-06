<template>
    <section class="add-subrule">
        <div class="head">
            <el-row>
                <el-col :span="9">
                    <el-form ref="form1" :model="params" :rules="rules" :label-width="formLabelWidth" :size="formSize">
                        <el-form-item prop="mainRuleName" label="规则名称：">
                            <el-col :span="colSpan">
                                <el-input v-model="params.mainRuleName" placeholder="请输入规则名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="9">
                    <el-form ref="form2" :model="params" :rules="rules" :label-width="formLabelWidth" :size="formSize">
                        <el-form-item prop="categoryId" label="规则属性：">
                            <el-col :span="colSpan">
                                <v-select
                                    :props="listProps"
                                    v-model="params.categoryId"
                                    :list="optionsList"
                                    placeholder="请选择规则属性"
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
                        <el-form-item prop="mainIllegalLevel" label="规则等级：">
                            <el-col :span="colSpan">
                                <v-select
                                    :props="listProps"
                                    v-model="params.mainIllegalLevel"
                                    :list="ruleLevel"
                                    placeholder="请选择规则等级"
                                    :filterable="true"
                                    class="select-box"
                                />
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="9">
                    <el-form ref="form4" :model="params" :rules="rules" :label-width="formLabelWidth" :size="formSize">
                        <el-form-item prop="violationDesc" label="规则描述：">
                            <el-col :span="colSpan">
                                <el-input type="textarea" :rows="1" v-model="params.violationDesc" placeholder="请输入规则描述"></el-input>
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
                        <span class="table-col-name">子规则名称：</span>
                        <span class="table-col-value text-ellipsis" v-text="scope.row.subRuleName" :title="scope.row.subRuleName"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="detailCode"
                >
                    <template slot-scope="scope">
                        <span class="table-col-name" style="position: relative; top: -8px;">逻辑编号：</span>
                        <span class="table-col-value text-ellipsis">
                            <!-- <el-input type="number" min="1" max="99" pattern="\d{2}"  v-model="scope.row.groupNumber" :size="formSize"></el-input> -->
                            <el-input maxlength="2" pattern="\d{2}" onkeyup="value=value.replace(/[^\d]/g,'','')" onafterpaste="value=value.replace(/[^\d]/g,'','')" v-model="scope.row.groupNumber" :size="formSize"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                >
                    <template slot-scope="scope">
                        <span class="table-col-name">备注信息：</span>
                        <span class="table-col-value text-ellipsis" v-text="scope.row.remark" :title="scope.row.remark"></span>
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
import {getDetail, getDect} from 'src/js/api/shangbao/ruleM';
import {add, update} from 'src/js/api/shangbao/ruleM';
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
                mainRuleName: '',
                violationDesc: '',
                categoryId: '',
                mainIllegalLevel: '',
                mainRuleId: '' // 只用于编辑，  新增时不需要传给后台
            },
            rules: {
                mainRuleName: [
                    {required: true, message: '请输入规则名称'}
                ],
                categoryId: [
                    {required: true, message: '请选择规则属性'}
                ],
                mainIllegalLevel: [
                    {required: true, message: '请选择规则等级'}
                ]
            },

            // 下拉框数据
            optionsList: [
                // {categoryName: "aa", categoryId: '1'},
                // {categoryName: "bb", categoryId: '2'},
                // {categoryName: "cc", categoryId: '3'},
                // {categoryName: "dd", categoryId: '4'}
            ],
            ruleLevel: [
                {categoryName: "一级", categoryId: 1},
                {categoryName: "二级", categoryId: 2},
                {categoryName: "三级", categoryId: 3}
            ],
            // 下拉框key value值
            listProps: {name: 'categoryName', value: 'categoryId'},
            tableData: [],
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
        mainRuleId: {
            type: String,
            default () {
                return "";
            }
        }
    },
    created () {
        getDect().then(res => {
            this.optionsList = Object.assign([], res.data);
        }).catch(() => {
            // 请求失败，返回列表页面
            this._back();
        });
    },
    mounted () {
        console.log("isAdd", this.isAdd);
        console.log("mainRuleId", this.mainRuleId);
        if (!this.isAdd) { // 编辑
            this.params.mainRuleId = this.mainRuleId;
            this._getDetail();
        }
    },
    methods: {
        async _getDetail () {
            let res = await getDetail({id: this.mainRuleId});
            let {subList, violationDesc, categoryId, mainRuleId, mainRuleName, mainIllegalLevel} = res.data;
            this.tableData = Object.assign([], subList);
            this.params = Object.assign({}, {
                mainRuleName,
                violationDesc,
                categoryId,
                mainIllegalLevel,
                mainRuleId
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
                    "categoryId": 0,
                    "creatTime": "2019-01-25T10:23:49.656Z",
                    "createBy": "string",
                    "deleteFlag": 0,
                    "enable": 0,
                    "mainIllegalLevel": 0,
                    "mainRuleId": 0,
                    "mainRuleName": "string",
                    "mainRuleStatus": 0,
                    "remark": "string",
                    "ruleLevel": 0,
                    "subList": [
                        {
                        "creatTime": "2019-01-25T10:23:49.656Z",
                        "createBy": "string",
                        "deleteFlag": 0,
                        "enable": 0,
                        "groupNumber": 0,
                        "id": 0,
                        "mainRuleId": "string",
                        "remark": "string",
                        "subRuleId": "string",
                        "updateBy": "string",
                        "updateTime": "2019-01-25T10:23:49.656Z"
                        }
                    ],
                    "updateBy": "string",
                    "updateTime": "2019-01-25T10:23:49.656Z",
                    "violationDesc": "string"
                }
            */
            let subList = JSON.parse(JSON.stringify(this.tableData));
            let showWarn = false;
            subList.forEach((item) => {
                if (item.groupNumber && isNaN(parseInt(item.groupNumber))) {
                    showWarn = true;
                }
                delete item._index;
            });
            if (showWarn) {
                this.$toast("逻辑编号必须是数字");
                return;
            }
            let params = Object.assign({}, this.params, {subList});
            if (this.isAdd) {
                delete params.mainRuleId;
            }
            console.warn(subList);
            if (!subList.length) {
                this.$toast('子规则不能为空');
                return;
            }
            let ajax = this.isAdd ? add : update;
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
            width: 80px;
            text-align: right;
        }
        .table-col-value {
            display: inline-block;
            width: calc(100% - 100px);
            position: relative;
            top: 3px;
        }
    }
    .footer {
        padding: 20px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
}
</style>
