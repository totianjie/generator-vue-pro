<!--
* @Author: Nelson
* @Date: 2019/4/9
* @remark: 场景规则/规则管理编辑
-->
<template>
    <div class="add-page h-fill">
        <div class="content p-t-40 over-auto main-view">
            <el-col :span="10" :offset="1" class="over-auto h-fill">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" :size="formSize">
                    <el-form-item label="规则分类：" prop="ruleType">
                        <el-input placeholder="请选择规则分类" v-model="ruleForm.ruleType" :size="formSize" :disabled="isEdit && isDev">
                        </el-input>
                        <div class="ruleClass-tree" @click.stop="handleSelectRuleClass">
                            <v-input-box class="tree box-shadow" v-if="treeShow">
                                <el-tree
                                    :data="RuleTreeData"
                                    :props="defaultProps"
                                    @node-click="handleNodeClick"
                                    accordion
                                    highlight-current
                                    :expand-on-click-node="false"
                                ></el-tree>
                            </v-input-box>
                        </div>
                    </el-form-item>
                    <el-form-item label="规则名称：" prop="ruleName">
                        <el-input placeholder="请输入规则名称" v-model="ruleForm.ruleName" :disabled="isEdit && isDev" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item label="违规描述：" prop="desc" v-if="!isDev">
                        <el-input v-model="ruleForm.desc" :rows="2" type="textarea" autosize placeholder="请输入规则违规描述" maxlength="250"></el-input>
                    </el-form-item>
                    <el-form-item label="违规模板：" prop="template" >
                        <el-input v-model="ruleForm.template" :rows="2" :disabled="isEdit && isDev" type="textarea" autosize placeholder="请按照规则违规模板填写" maxlength="250"></el-input>
                    </el-form-item>
                    <el-form-item label="违规等级：" prop="violationLevel" v-if="!isDev">
                        <el-select v-model="ruleForm.violationLevel" placeholder="请选择违规等级" class="w-fill">
                            <el-option
                                v-for="item in violationLevelData"
                                :key="item.id"
                                :value="item.code"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="医疗类别：" prop="medicalType" v-if="!isDev">
                        <el-select v-model="ruleForm.medicalType" placeholder="请选择" class="w-fill">
                            <el-option
                                v-for="item in medicalTypeData"
                                :key="item.id"
                                :value="item.code"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="监管阶段：" prop="superviseLevel" v-if="!isDev">
                        <el-select v-model="ruleForm.superviseLevel" placeholder="请选择" class="w-fill">
                            <el-option
                                v-for="item in superviseLevelData"
                                :key="item.id"
                                :value="item.code"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地区：" prop="area" v-if="!isDev">
                        <el-input v-model="ruleForm.area" :rows="2" type="textarea" autosize placeholder="请输入地区" maxlength="250"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark" v-if="!isDev">
                        <el-input v-model="ruleForm.remark" type="textarea" autosize placeholder="请输入规则备注" maxlength='200'></el-input>
                    </el-form-item>
                     <el-form-item label="服务映射：" prop="service" v-if="isDev">
                        <el-select v-model="ruleForm.service" placeholder="请选择服务映射" class="w-fill">
                            <el-option
                                v-for="item in serviceList"
                                :key="item.id"
                                :value="item.code"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则实体类：" prop="ruleBeenId" v-if="isDev">
                        <el-input v-model="ruleForm.ruleBeenId" placeholder="请输入规则实体类" maxlength='100'></el-input>
                    </el-form-item>
                    <el-form-item label="规则编码：" prop="ruleNo" v-if="isDev">
                        <el-input v-model="ruleForm.ruleNo" placeholder="请输入规则编码" maxlength='100'></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12" :offset="1" class="over-auto h-fill">
                <div class="detail-wrap">
                    <div class="m-b-10">
                        <span class="bold">规则细则设定 </span>
                        <span class="pointer btn-color p-l-10" :size="btnSize" v-if="isDev" @click="addRuleDetail">新增细则参数</span>
                    </div>
                    <el-form
                        v-for="(item, index) in detailList"
                        :key="index"
                        :model="item"
                        :rules="listRules"
                        :size="formSize"
                        class="pos-r m-b-20"
                    >
                        <el-form-item class="flex l-h-32 m-l-20" v-if="isDev">
                            <div class="inline-flex l-h-32 m-l-8">
                                <div class="w-60">参数名称:</div>
                                <el-input class="m-l-8 w-80" :disabled="item.disabled" :size="btnSize" :rule="ruleParmaName" maxlength="50"></el-input>
                            </div>
                            <div class="inline-flex l-h-32 m-l-8">
                                <div class="w-60">参数中文:</div>
                                <el-input class="m-l-8 w-80" :disabled="item.disabled" :size="btnSize" :rule="ruleParmaNameCh" maxlength="50"></el-input>
                            </div>
                            <div class="inline-flex l-h-32 m-l-8">
                                <div class="w-50">默认值:</div>
                                <el-input class="m-l-8 w-80" :disabled="item.disabled" :size="btnSize" :rule="ruleDefaultValue" maxlength="50"></el-input>
                            </div>
                            <div class="delete-btn inline-flex pointer l-h-32 w-50 btn-color" @click="handleDelete(index)">删除</div>
                        </el-form-item>
                        <el-form-item :label="item.name" prop="value" label-width="150px" v-if="!isDev">
                            <el-input v-model="item.value" style="width: calc(100% - 160px);"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </div>
        <div class="text-center l-h-32 m-b-10 m-t-8">
            <el-button :size="btnSize" @click="isDev?setDevPageSatus('list'):setMedPageSatus('list')">取&nbsp;消</el-button>
            <el-button :size="btnSize" @click="handlerSubmit" type="primary">确&nbsp;定</el-button>
        </div>
    </div>
</template>
<script>
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations} = createNamespacedHelpers('scene/rule');
    export default {
        data () {
            return {
                treeShow: false,
                currentNode: {},
                defaultProps: {
                    children: 'children',
                    label: 'ruleName'
                },
                detailList: [
                    {disabled: true, name: '天数', value: 100}
                ],
                rules: {
                    ruleName: [
                        {required: true, message: '请输入规则名称', trigger: 'blur'}
                    ],
                    ruleType: [
                        {required: true, message: '请选择规则分类', trigger: 'change'}
                    ],
                    service: [
                        {required: true, message: '请选择服务映射', trigger: 'change'}
                    ],
                    ruleNo: [
                        {required: true, message: '请选择规则编码', trigger: 'blur'}
                    ]
                },
                ruleParmaName: {
                    required: true,
                    message: '请输入规则参数名称',
                    trigger: 'blur'
                },
                ruleDefaultValue: {
                    required: true,
                    message: '请输入规则参数中文',
                    trigger: 'blur'
                },
                ruleParmaNameCh: {
                    required: true,
                    message: '请输入规则参数默认值',
                    trigger: 'blur'
                },
                serviceList: [],
                violationLevelData: [],
                medicalTypeData: [],
                superviseLevelData: [],
                ruleForm: {},
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseFormSize
            };
        },
        computed: {
            isDev () {
                return this.CurrentPage !== 'med';
            },
            isAdd () {
                return (this.MedPageSatus === 'add' && this.CurrentPage === 'med') || (this.DevPageSatus === 'add' && this.CurrentPage === 'dev');
            },
            isEdit () {
                return (this.MedPageSatus === 'edit' && this.CurrentPage === 'med') || (this.DevPageSatus === 'edit' && this.CurrentPage === 'dev');
            },
            ...mapGetters(['RuleTreeData', 'MedPageSatus', 'DevPageSatus', 'CurrentPage'])
        },
        props: {

        },
        methods: {
            addRuleDetail () {
                console.log("addRuleDetail");
                this.detailList.push({name: ''});
            },
            handleSelectRuleClass () {
                console.log("handleSelectRuleClass");
                this.treeShow = !this.treeShow;
            },
            handleNodeClick (val) {
                console.log("handleNodeClick", JSON.stringify(val));
                this.currentNode = val;
                this.ruleForm.ruleType = this.currentNode.ruleName;
                this.treeShow = false;
            },
            handleDelete (index) {
                this.detailList.splice(index, 1);
            },
            ...mapMutations(['setDevPageSatus', 'setMedPageSatus'])
        }
    };
</script>

<style scoped lang="scss">
    .add-page{
        .p-t-40 {
            padding-top: 40px;
        }
        .ruleClass-tree {
            width: 100%;
            position: absolute;
            top: 8px;
            bottom: 0;
            left: 0;
            cursor: pointer;
        }
        .tree {
            width: 100%;
            position: absolute;
            left: 0;
            top: 35px;
            padding-bottom: 12px;
            z-index: 998;
            background-color: #fff;
        }
        .statusBtn{
            line-height: 40px;
        }
        .inline-flex{
            display: inline-flex;
        }
        .flex{
            display:flex;
        }
        .l-h-32 {
            line-height: 32px;
            height: 32px;
        }
        .main-view{
            height: calc(100% - 100px);
        }
        .m-l-8 {
            margin-left: 8px;
        }
        .w-60 {
            width: 60px;
        }
        .w-80 {
            width: 80px;
        }
        .w-50 {
            width: 50px;
        }
        .btn-color {
            color: #4579C5;
            font-weight: normal;
        }
        .m-b-10 {
            margin-bottom: 10px;
        }
        .m-b-20 {
            margin-bottom: 20px;
        }
        .m-l-20 {
            margin-left: 20px;
        }
        .p-l-10 {
            margin-left: 10px;
        }
        .m-t-8 {
            margin-top:8px;
        }
    }
</style>
