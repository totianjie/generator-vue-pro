<!--
* @Author: Nelson
* @Date: 2019/4/9
* @remark: 场景规则/规则管理查询
-->
<template>
    <div class="search-wrap w-fill">
        <v-search-box @click="treeShow = false">
            <div>
                <el-col :span="span">
                    <v-input label="规则分类：" :span="5" :pxUnit="true" :labelWidth="lableWidth" style="position:relative;">
                        <el-input placeholder="请选择规则分类" v-model="searchParams.ruleClass" :size="formSize">
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
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="规则名称：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <el-input v-model.trim="searchParams.ruleName" placeholder="请输入规则名称" :size="formSize"></el-input>
                    </v-input>
                </el-col>
                <el-col :span="span" v-if="isMed">
                    <v-input label="地区：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <el-input v-model.trim="searchParams.area" placeholder="请输入地区" :size="formSize"></el-input>
                    </v-input>
                </el-col>
                <el-col :span="span" class="m-t-8" v-if="isMed">
                    <v-input label="医疗类型：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <v-select
                            v-model.trim="searchParams.medicalType"
                            :list="medicalTypes"
                            :props="selectProps"
                            :size="formSize"
                            placeholder="请选择医疗类型"

                        >
                        </v-select>
                    </v-input>
                </el-col>
                <el-col :span="span" class="m-t-8" v-if="isMed">
                    <v-input label="监管阶段：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <v-select
                            v-model.trim="searchParams.manageSection"
                            :list="manageSections"
                            :props="selectProps"
                            :size="formSize"
                            placeholder="请选择监管阶段"
                        >
                        </v-select>
                    </v-input>
                </el-col>
            </div>
            <div slot="btn">
                <el-button @click="isMed?setMedParameters(JSON.parse(JSON.stringify(searchParams))):setDevParameters(JSON.parse(JSON.stringify(searchParams)))" type="primary" class="m-l-20" :size="btnSize">查询</el-button>
                <el-button @click="handleOutPut" type="primary" style="margin-left: 20px; margin-top: 8px;" class="m-l-20 block" :size="btnSize" v-if="isMed">导出</el-button>
            </div>
        </v-search-box>
        <div v-if="!isMed" class="addBtn" style="">
            <el-button type="primary" @click="setDevPageSatus('add')" :size="btnSize">新增</el-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations} = createNamespacedHelpers('scene/rule');
    export default {
        data () {
            return {
                treeShow: false,
                lableWidth: 136,
                currentNode: {},
                defaultProps: {
                    children: 'children',
                    label: 'ruleName'
                },
                classDatas: [],
                span: 8,
                labelWidth: 150,
                formSize: CONFIG.homeFormSize, // 外页form尺寸
                btnSize: CONFIG.homeBtn, // 外页按钮尺寸
                ruleType: '', // 规则分类
                name: '', // 规则名称
                region: '', // 地区选择
                medicalType: '', // 医疗类别
                superviseLevel: '', // 监管阶段
                ruleGroup: [], // 规则分类数组
                regionOptions: [], // 地区选择数组
                medicalTypeOptions: [], // 医疗类别数组
                superviseLevelOptions: [], // 监管阶段数组
                defaultDateProps: { // 规则分类选项的配置参数
                    label: 'label',
                    children: 'children'
                }
            };
        },
        props: {},

        created () {},

        mounted () {},
        computed: {
            searchParams () {
                return this.isMed ? this.MedParameters || {} : this.DevParameters || {};
            },
            isMed () {
                return this.CurrentPage === 'med';
            },
            handleOutPut () {
                console.log('导出功能');
            },
            ...mapGetters(['RuleTreeData', 'MedPageSatus', 'DevPageSatus', 'CurrentPage', 'MedParameters', 'DevParameters'])
        },
        methods: {
            handleSelectRuleClass () {
                console.log("handleSelectRuleClass");
                this.treeShow = !this.treeShow;
            },
            handleNodeClick (val) {
                console.log("handleNodeClick", JSON.stringify(val));
                this.currentNode = val;
                this.searchParams.ruleClass = this.currentNode.ruleName;
                this.treeShow = false;
            },
            filterNode (value, data) {
                if (!value) return true;
                return data[this.defaultProps.label].indexOf(value) !== -1;
            },
            // 查询
            handlerSearch () {
                let form = {
                    ruleType: this.ruleType,
                    name: this.name,
                    region: this.region,
                    medicalType: this.medicalType,
                    superviseLevel: this.superviseLevel
                };
                console.log('查询');
                this.$emit('search', form);
            },
            // 导出
            handlerExport () {
                console.log('导出');
            },
            ...mapMutations(['setDevPageSatus', 'setMedPageSatus', 'setDevParameters', 'setMedParameters'])
        }
    };
</script>
<style lang="scss" scoped>
    .search-wrap{
        .m-t-5{
            margin-top: 5px;
            margin-left: 0px !important;
        }
        .m-b-5{
            margin-bottom: 5px;
        }
        .el-range-editor--small.el-input__inner{
            width: 100%;
        }
        .w-fill {
            width: 100%;
        }
        /deep/ .v-search-box > .input-wrap{
            width: calc(100% - 100px); 
        }
        /deep/ .v-search-box > .btn-wrap{
            float: left;
            width: 100px;
        }
        .m-l-15 {
            margin-left: 15px;
        }
        .searchForm {
            margin-top: 8px;
            width: calc(100% - 90px);
        }
        .m-r-20{
            margin-right: 20px;
        } 
        .m-t-8{
            margin-top: 8px;
        }
        .addBtn{
            padding-left: 40px;
        }
        .ruleClass-tree {
            width: calc(100% - 136px);
            position: absolute;
            top: 0;
            height: 100%;
            left: 136px;
            cursor: pointer;

        }

        .tree {
            width: 650px;
            position: fixed;
            left: 120px;
            top: 105px;
            padding-bottom: 12px;
            z-index: 998;
            background-color: #fff;
            height: 200px;
            overflow: auto;
        }
    }
</style>
