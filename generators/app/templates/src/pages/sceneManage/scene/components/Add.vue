<!-- 新增 -->
<template>
    <section class="add-wrap">
        <el-form ref="form" :model="params" :rules="rules" label-width="100px" :size="formSize" class="head-form params m-l-8">
            <el-row>
                <el-col :span="7">
                    <el-form-item prop="appName" label="场景名称：" class="m0">
                        <el-input v-model.trim="params.appName" placeholder="请输入" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item prop="remark" label="场景备注：" class="m0">
                        <el-input v-model="params.remark" placeholder="请输入" maxlength="200"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top:16px;">
                <el-col :span="7">
                    <el-form-item prop="safeType" label="保险类型：" class="m0" style="">
                        <el-radio-group v-model="params.safeType">
                            <el-radio label="0" style="margin-right: 20px;" @change="visible=false">医疗保险</el-radio>
                            <el-radio label="1" style="margin-right: 20px;">商业保险</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item v-if="params.safeType === '1'" label="保险选择：" prop="safeIds" class="m0">
                        <el-popover
                            placement="bottom-start"
                            width="300"
                            trigger="manual"
                            v-model="visible"
                            title="请选择险种">
                            <div class="el-scrollbar" style="">
                                <div class="el-select-dropdown__wrap el-scrollbar__wrap suit-scroll">
                                    <ul class="el-scrollbar__view el-select-dropdown__list">
                                        <li class="el-select-dropdown__item inline-flex" v-for="item in safeList" :key="item.id + '_safe'" @click="item.select=!item.select" :class="item.select ? 'selected': ''">
                                            <label role="checkbox" :aria-checked="item.select" class="el-checkbox" :class="item.select?'is-checked':''" >
                                                <span aria-checked="mixed" class="el-checkbox__input" :class="item.select?'is-checked':''">
                                                <span class="el-checkbox__inner" @click="item.select=!item.select"></span>
                                                    <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="item.id">
                                                </span>
                                            </label>
                                            <el-tooltip class="item m-l-8" effect="dark" :content="item.insuranceName" placement="bottom" style="width: 250px;" v-if="item.insuranceName.length>18">
                                                <div class="text-ellipsis">{{item.insuranceName}}</div>
                                            </el-tooltip>
                                            <div class="text-ellipsis m-l-8" style="width: 250px;" v-else>{{item.insuranceName}}</div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="el-scrollbar__bar is-horizontal">
                                    <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                                </div>
                                <div class="el-scrollbar__bar is-vertical">
                                    <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                                </div>
                            </div>
                            <div class="el-select w-fill" slot="reference" @click="visible = !visible">
                                <div class="el-input el-input--suffix text-ellipsis el-input-small w-fill pointer inline-flex select-border-class">
                                    <el-tooltip class="item" effect="dark" :content="insuranceNames" placement="bottom" style="width: calc(100% - 50px);" v-if="insuranceNames.length>18">
                                        <span class="block text-ellipsis m-r-8 p-l-15 text-width-color" 
                                              :class="insuranceNames==='请选择保险'?'placeholderClass':'textColor'">
                                              {{insuranceNames}}
                                        </span>
                                    </el-tooltip>
                                    <span class="block text-ellipsis m-r-8 p-l-15 text-width-color" :class="insuranceNames==='请选择保险'?'placeholderClass':'textColor'" v-else>{{insuranceNames}}</span>
                                    <span class="el-input__suffix block" style="width:30px;">
                                        <span class="el-input__suffix-inner">
                                            <i class="el-select__caret el-input__icon el-icon-arrow-up" :class="visible?'is-reverse':''"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </el-popover>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="content">
            <div class="tree-wrap">
                <div class="search-wrap">
                    <p class="bold">规则配置</p>
                    <el-row class="m-t-5">
                        <el-col :span="18">
                            <VSearchInput v-model="filterText" />
                            <!-- <el-input placeholder="请输入" :size="formSize" v-model.trim="filterText"></el-input> -->
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-tree
                    class="tree"
                    ref="tree"
                    :data="ruleTreeData"
                    show-checkbox
                    node-key="ruleNo"
                    :default-checked-keys="checkedKeys"
                    :props="defaultProps"
                    empty-text="暂无数据"
                    default-expand-all
                    highlight-current
                    :check-on-click-node="true"
                    @check="handleNodeClick"
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                >
                    <span class="custom-tree-node text-ellipsis" slot-scope="{ node }" :title="node.label">
                        {{node.label}}
                        <span class="apply-case-type" v-text="formatText(node.data.applyCaseType)">aaa</span>
                    </span>
                </el-tree>
            </div>
            <div class="detail-wrap" v-if="bShow">
                <p class="bold"><span v-text="currentParameterInfoObj.ruleName"></span> 参数设定</p>
                <el-form ref="rule_parameter_form" :model="currentParameterInfoObj" label-width="100px" :size="formSize" class="head-form">
                    <el-form-item 
                        prop="ruleDesc" 
                        label="违规描述："
                    >
                        <el-input type="textarea" :rows="2" disabled v-model.trim="currentParameterInfoObj.ruleDesc" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="ruleSection" 
                        label="监管阶段："
                    >
                        <el-input disabled v-model.trim="currentParameterInfoObj.ruleSection" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="returnTemplate" 
                        label="违规模板："
                    >
                        <el-input type="textarea" :rows="2" v-model.trim="currentParameterInfoObj.returnTemplate" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="illegalLevel" 
                        label="等级："
                    >
                        <el-input v-model.trim="currentParameterInfoObj.illegalLevel" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item 
                        :prop="'preValue.' + index + '.defaultValue'"
                        :label="item.keyDesc"
                        v-for="(item, index) in currentParameterInfoObj.preValue"
                        :key="item.id"
                        :rules="ruleObj"
                    >
                        <el-input v-model.trim="item.defaultValue" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <footer class="footer">
            <el-button :size="btnSize" @click="handleCancel">取消</el-button>
            <el-button :size="btnSize" type="primary" @click="handleSave">保存</el-button>
        </footer>
    </section>
</template>
<script>
import CONFIG from 'src/config';
import {createNamespacedHelpers} from 'vuex';
const {mapMutations, mapGetters, mapActions} = createNamespacedHelpers('scene');
import {getRuleParameterInfo} from 'src/js/api/sceneManage/scene';
import {getList} from "js/api/shangbao/businessManage.js";
export default {
    data () {
        return {
            visible: false,
            filterText: '',
            bShow: false,
            btnSize: CONFIG.baseBtn,
            formSize: CONFIG.homeFormSize,
            copyAppId: '',
            params: {
                appName: '',
                remark: '',
                safeType: '',
                safeIds: []
            },
            safeList: [
            ],
            defaultProps: {
                children: 'children',
                label: 'ruleName'
            },
            rules: {
                appName: [
                    { required: true, message: '请输入场景名称', trigger: 'blur' }
                ],
                safeType: [
                    { required: true, message: '请选择保险类型', trigger: 'change' }
                ],
                checkList: [
                    { required: true, message: '请选择保险', trigger: 'change' }
                ]
            },
            ruleObj: {required: true, message: '不可为空,请输入', trigger: 'blur'},
            checkedKeys: [],
            // 缓存数据
            ruleParameterInfoObj: {},
            currentParameterInfoObj: {}
        };
    },
    computed: {
        insuranceNames () {
            let list = [];
            let safeIds_ = [];
            this.safeList.forEach(res => {
                if (res.select) {
                    list.push(res.insuranceName);
                    safeIds_.push(res.id);
                }
            });
            this.params.safeIds = safeIds_;
            if (list.length === 0) {
                return '请选择保险';
            }
            console.log('insuranceNames', list);
            return list.join('/');
        },
        ...mapGetters(['ruleTreeData', 'detailData', 'pageType'])
    },
    props: {},
    created () {
        getList({offset: 1, limit: 500}).then(res => {
            this.safeList = res.data.list.map((item) => {
                item.select = false;
                let {safeIds} = this.detailData;
                let safeIds_ = safeIds + ';' || ';';
                if (safeIds_.indexOf(item.id + ';') !== -1) {
                    item.select = true;
                }
                return item;
            });
        });
        let {name} = JSON.parse(sessionStorage.getItem('user_info'));
        if (this.pageType === 'edit') {
            let {appName, remark, dataRules, id, appId, sceneCode, safeType = '', safeIds} = this.detailData;
            safeIds = safeIds || '';
            let safeIds_ = safeIds + ';';
            this.safeList.forEach((item) => {
                if (safeIds_.indexOf(item.id + ';') !== -1) {
                    item.select = true;
                }
            });
            this.params = Object.assign({}, this.params, {appName, remark, id, appId, sceneCode, updateUser: name, safeType, safeIds: safeIds.split(';')});

            console.log("edit==>>", this.params);
            dataRules.forEach((item) => {
                this.checkedKeys.push(item.ruleNo);
                this.ruleParameterInfoObj[item.ruleNo] = JSON.parse(JSON.stringify(item));
            });
        } else if (this.pageType === 'addCopy') {
            let {appName, remark, dataRules, safeType = '', safeIds, appId} = this.detailData;
            safeIds = safeIds || '';
            let safeIds_ = safeIds + ';';
            this.safeList.forEach((item) => {
                if (safeIds_.indexOf(item.id + ';') !== -1) {
                    item.select = true;
                }
            });
            this.copyAppId = appId;
            this.params = Object.assign({}, this.params, {appName, remark, safeType, safeIds: safeIds.split(';'), createUser: name});
            console.log("addCopy==>>", this.params);
            dataRules.forEach((item) => {
                this.checkedKeys.push(item.ruleNo);
                this.ruleParameterInfoObj[item.ruleNo] = JSON.parse(JSON.stringify(item));
            });
        } else {
            this.params = {...this.params, createUser: name};
        }
        console.log(this.ruleParameterInfoObj);
    },
    mounted () {
    },
    methods: {
        formatText (applyCaseType) {
            let str = '';
            if (!applyCaseType) {
                return str;
            }
            let obj = {'0': '住院', '1': '门诊', '2': '药店'};

            let arr = applyCaseType.split(';');
            arr.forEach((item, index) => {
                let s = '/';
                if (index === arr.length - 1) {
                    s = '';
                }
                str += (obj[item] + s);
            });

            return str;
        },
        filterNode (value, data) {
            if (!value) return true;
            return data[this.defaultProps.label].indexOf(value) !== -1;
        },
        handleSearch () {
            this.$refs.tree.filter(this.filterText);
        },
        async handleNodeClick (rowObj, node, compoent) {
            let {ruleNo, ruleClass} = rowObj;
            if (ruleClass !== 0) {
                return false;
            }
            if (this.bShow) {
                await new Promise((resolve, reject) => {
                    this.$refs.rule_parameter_form.validate(async val => val ? resolve() : reject());
                });
            }
            if (ruleNo in this.ruleParameterInfoObj) {
                this.currentParameterInfoObj = this.ruleParameterInfoObj[ruleNo];
            } else {
                let {data} = await getRuleParameterInfo({ruleNo});
                this.ruleParameterInfoObj[ruleNo] = data;
                this.currentParameterInfoObj = data;
            }
            this.bShow = true;
        },
        handleCancel () {
            console.log("cancel");
            this.setPageType();
        },
        async handleSave () {
            console.log("save");
            let nodes = this.$refs.tree.getCheckedNodes();
            await new Promise((resolve, reject) => {
                this.$refs.form.validate(val => val ? resolve() : reject());
            });
            if (this.bShow) {
                await new Promise((resolve, reject) => {
                    this.$refs.rule_parameter_form.validate(val => val ? resolve() : reject());
                });
            }
            let dataRules = [];
            nodes.forEach(({ruleClass, ruleNo, id, illegalLevel, returnTemplate, ruleDesc}) => {
                if (ruleClass === 0) {
                    let obj = this.ruleParameterInfoObj[ruleNo] || {ruleNo, id, illegalLevel, returnTemplate, ruleDesc, preValue: []};
                    dataRules.push({...obj});
                }
            });
            console.log("nodes:", nodes);
            let params = { ...this.params, dataRules };

            let par = JSON.parse(JSON.stringify(params));
            par.safeIds = par.safeIds.join(';');
            if (par.safeType !== '1') {
                par.safeIds = '';
            }
            if (this.pageType === 'edit') {
                this.update({...par});
                return false;
            }
            this.add({...par});
            
        },
        getCheckedNodes () {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        ...mapMutations(['setPageType']),
        ...mapActions(['add', 'update'])
    }
};
</script>
<style lang="scss" scoped>


.add-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    .head-form {
        padding: 10px 0;
    }
    .head-form.params {
        overflow: auto;
    }
    .content{
        flex: 1;
        padding-left: 20px;
        display: flex;
        border-top: 8px solid rgba(243, 243, 243, 1);
        .tree-wrap {
            width: 40%;
            height: calc(100% - 8px);;
            border-right: 1px solid #dcdfe6;
            margin-top: 8px;
            .search-wrap {
                height: 60px;
            }
            .tree {
                height: calc(100% - 60px);
                overflow: auto;
                .custom-tree-node {
                    padding-right: 50px;
                    .apply-case-type {
                        position: absolute;
                        right: 5px;
                        top: 2px;
                    }
                }
            }
        }
        .detail-wrap {
            flex: 1;
            padding: 0 40px 20px 40px;
            overflow: auto;
            margin-top: 8px;
        }
    }
    .footer {
        height: 80px;
        padding-top: 20px;
        box-sizing: border-box;
        border-top: 1px solid #dcdfe6;
        text-align: center;
    }
    .m0 {
        margin: 0;
    }
    .suit-scroll{
        margin-bottom: -15px; 
        margin-right: -15px;
    }
    .inline-flex {
        display: inline-flex;
    }
    .m-l-8 {
        margin-left: 8px
    }
    .m-r-8 {
        margin-right: 8px
    }
    .p-l-15 {
        padding-left: 15px;
    }
    .text-width-color {
        width: 225px;
        color: #606266;
    }
    .select-border-class{
        border: solid #dcdfe6 1px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .textColor{
        color: #606266 !important;
    }
    .placeholderClass{
        /* placeholder颜色  */
        color: #aab2bd !important;
        /* placeholder字体大小  */
        font-size: 13px !important;
    }
    .selected{
        color: #409eff;
        background-color: #f0f7ff;
    }
}
</style>
<style>
.el-tree-node__content {
    position: relative;
}
</style>



