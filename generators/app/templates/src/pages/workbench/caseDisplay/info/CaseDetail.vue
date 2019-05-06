<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 病案首页信息
-->
<template>
    <div class="visit-wrap" ref="box">
        <el-row>
            <el-col :span="6" class="p-d-5" :style="{height: `${pageHeight}px`}">
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="就诊号：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.jzcode">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.jzcode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="姓名：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.name">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.name}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="性别：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.sex | formatSex">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.sex | formatSex}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="年龄：" :span="span" :border="false" class="m-t-34" :itemText="getAge(getCaseInfoList.age)">
                    <div slot="content" class="tooltip-item">{{getAge(getCaseInfoList.age)}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="民族：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.ethnicity">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.ethnicity}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="国籍：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.nation">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.nation}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="婚姻状况：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.maritalStatus">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.maritalStatus}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出生日期：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.birthday | formatTime('yyyy-MM-dd')">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.birthday | formatTime('yyyy-MM-dd')}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出生地：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.birthPlace">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.birthPlace}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="身份证号：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.idCardNo">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.idCardNo}}</div>
                </v-item-visit-list>
            </el-col>
            <el-col :span="6" class="p-d-5" :style="{height: `${pageHeight}px`}">
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医疗服务机构编号：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.jgCode">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.jgCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医疗服务机构名称：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.jgName">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.jgName}}</div>
                </v-item-visit-list>
                <!--医疗等级后台没确定好start-->
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医疗等级：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.hpGrade | formathpGrade">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.hpGrade | formathpGrade}}</div>
                </v-item-visit-list>
                <!--医疗等级后台没确定好end-->
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="入院日期：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.inHpDate | formatTime('yyyy-MM-dd')">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.inHpDate | formatTime('yyyy-MM-dd')}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="入院科别：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.inHpKsClass">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.inHpKsClass}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出院日期：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.outHpDate | formatTime('yyyy-MM-dd')">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.outHpDate | formatTime('yyyy-MM-dd')}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出院科室：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.outHpKsClass">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.outHpKsClass}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="住院天数：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.realInHpDays">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.realInHpDays}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出院方式：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.outHpWay">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.outHpWay}}</div>
                </v-item-visit-list>
            </el-col>
            <el-col :span="6" class="p-d-5" :style="{height: `${pageHeight}px`}">
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="门(急)诊诊断编码：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.jzDiagName">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.jzDiagCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="门(急)诊诊断名称：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.jzDiagName">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.jzDiagName}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="原始病理诊断编码：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.pathlgDiagCode">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.pathlgDiagCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="原始病理诊断名称：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.pathlgDiagName">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.pathlgDiagName}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="标准病理诊断编码：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.pathlgDiagName">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.stdPathlgDiagCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="标准病理诊断副编码：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.pathlgDiagName">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.stdPathlgDiagViceCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="标准病理诊断：" :span="span" :border="false" class="m-t-34" :itemText="getCaseInfoList.pathlgDiagName">
                    <div slot="content" class="tooltip-item">{{getCaseInfoList.stdPathlgDiagName}}</div>
                </v-item-visit-list>
            </el-col>
            <el-col :span="6" class="p-d-5" :style="{height: `${pageHeight}px`}">
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getCaseInfoList} from 'js/api/workbench/auditCase/caseinfo';
    import VItemVisitList from './VItemVisitList';
    export default {
        data () {
            return {
                pageHeight: 0,
                labelWidth: 130,
                span: 5,
                getCaseInfoList: {}, // 列表数据
                jzcode: ''// 就诊号
            };
        },

        mounted () {
            // 列表的背景颜色
            this.$nextTick(() => {
                this.pageHeight = this.$refs.box.scrollHeight;
                console.info('this.pageHeight', this.pageHeight);
            });
        },

        filters: {
            // 判断性别 1=男 2=女 0=未知
            formatSex (val) {
                let toSex = {'0': '未知', '1': '男', '2': '女'};
                return toSex[val];
            },
            // 医疗等级
            formathpGrade (val) {
                let toHpGrade = {'01': '一级甲等', '02': '二级甲等', '03': '三级甲等'};
                return toHpGrade[val];
            },
            // 判断实施临床路径和实施临床路径的是与否  false=否 true=是
            formatYesNo (val) {
                let yesNo = {false: '否', true: '是'};
                return yesNo[val];
            }
        },

        methods: {
            // 年龄的转换
            getAge (value) {
                if (value) {
                    value = Math.ceil(value / 12);
                    return value;
                }
            },
            // 重置表格数据
            _reset () {
                this.getCaseInfoList = {};
                this.jzcode = '';
                console.log('_reset==>>', Math.random());
            },
            // 获取点击上面表格每一行数据，在下面tabs切换页面展示
            _getData ({jzcode}) {
                if (jzcode) {
                    this.jzcode = jzcode;
                    // 获取病案首页列表数据
                    getCaseInfoList({jzcode}).then(({data}) => {
                        this.getCaseInfoList = Object.assign({}, data);
                        console.log('病案首页信息===>', data);
                    });
                }
                console.log('_getData getCaseInfoList==>>', Math.random(), jzcode);
            }
        },
        components: {VItemVisitList}
    };
</script>
<style lang="scss" scoped>
    .visit-wrap{
        height: 100%;
        width: 100%;
        overflow: auto;
        box-sizing: border-box;
        .p-d-5{
            padding: 0 24px;
        }
        .el-row{
            height: 100%;
            width: 100%;
            min-width:1150px;
            box-sizing: border-box;
            .v-item-detail {
                /deep/ .name{
                    word-wrap:break-word;
                    word-break:break-all;
                    line-height: 1;
                    padding-top: 12px;
                }
                /deep/ .text-ellipsis{
                    margin-top: 0;
                }
                /deep/ .text{
                    padding-top: 11px;
                }
            }
        }
        .el-row .el-col{
            height: 100%;
            box-sizing: border-box;
        }
        .el-row .el-col:nth-child(2n),.el-row .el-col:nth-child(2n) label{
            background: #EFF6FF;
        }
    }
</style>


