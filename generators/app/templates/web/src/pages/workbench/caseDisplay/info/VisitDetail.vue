<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 就诊信息
-->
<template>
    <div class="visit-wrap" ref="box" >
        <el-row>
            <el-col :span="6" class="p-d-24" :style="{height: `${pageHeight}px`}">
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="姓名：" :span="span" :border="false" class="m-t-34" :itemText="visitList.name">
                    <div slot="content" class="tooltip-item">{{visitList.name}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="性别：" :span="span" :border="false" class="m-t-34" :itemText="visitList.sex | formatSex">
                    <div slot="content" class="tooltip-item">{{visitList.sex | formatSex}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="年龄：" :span="span" :border="false" class="m-t-34" :itemText="getAge(visitList.age)">
                    <div slot="content" class="tooltip-item">{{getAge(visitList.age)}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出生日期：" :span="span" :border="false" class="m-t-34" :itemText="visitList.birthday | formatTime('yyyy-MM-dd')">
                    <div slot="content" class="tooltip-item">{{visitList.birthday | formatTime('yyyy-MM-dd')}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="险种类型：" :span="span" :border="false" class="m-t-34" :itemText="visitList.insureTypeName">
                    <div slot="content" class="tooltip-item">{{visitList.insureType}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="经办机构名称：" :span="span" :border="false" class="m-t-34" :itemText="visitList.runAreaName">
                    <div slot="content" class="tooltip-item">{{visitList.runAreaName}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="身份证号：" :span="span" :border="false" class="m-t-34" :itemText="visitList.idCardNo">
                    <div slot="content" class="tooltip-item">{{visitList.idCardNo}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="人员编号：" :span="span" :border="false" class="m-t-34" :itemText="visitList.personCode">
                    <div slot="content" class="tooltip-item">{{visitList.personCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="社会保障卡卡号：" :span="span" :border="false" class="m-t-34" :itemText="visitList.insureCode">
                    <div slot="content" class="tooltip-item">{{visitList.insuranceCardNo}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="参保单位编号：" :span="span" :border="false" class="m-t-34" :itemText="visitList.insureDeptCode">
                    <div slot="content" class="tooltip-item">{{visitList.insureDeptCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="参保单位名称：" :span="span" :border="false" class="m-t-34" :itemText="visitList.insureDeptName">
                    <div slot="content" class="tooltip-item">{{visitList.insureDeptName}}</div>
                </v-item-visit-list>
            </el-col>
            <el-col :span="6" class="p-d-24" :style="{height: `${pageHeight}px`}">
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医疗服务机构编号：" :span="span" :border="false" class="m-t-34" :itemText="visitList.jgCode">
                    <div slot="content" class="tooltip-item">{{visitList.jgCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医疗服务机构名称：" :span="span" :border="false" class="m-t-34" :itemText="visitList.jgName">
                    <div slot="content" class="tooltip-item">{{visitList.jgName}}</div>
                </v-item-visit-list>
                <!--医院等级类别后台没确定start-->
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医院等级：" :span="span" :border="false" class="m-t-34" :itemText="visitList.hpGrade | formathpGrade">
                    <div slot="content" class="tooltip-item">{{visitList.hpGrade| formathpGrade}}</div>
                </v-item-visit-list>
                <!--医院等级类别后台没确定end-->
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="入院科室：" :span="span" :border="false" class="m-t-34" :itemText="visitList.inKsName">
                    <div slot="content" class="tooltip-item">{{visitList.admDept}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出院科室：" :span="span" :border="false" class="m-t-34" :itemText="visitList.inKsName">
                    <div slot="content" class="tooltip-item">{{visitList.disDept}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="住院医生：" :span="span" :border="false" class="m-t-34" :itemText="visitList.doctorName">
                    <div slot="content" class="tooltip-item">{{visitList.inHpDoctor}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="原始主要诊断编码：" :span="span" :border="false" class="m-t-34" :itemText="visitList.stdOutDiagCode">
                    <div slot="content" class="tooltip-item">{{visitList.outDiagCode}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="原始主要诊断名称：" :span="span" :border="false" class="m-t-34" :itemText="visitList.deseaseType">
                    <div slot="content" class="tooltip-item">{{visitList.outDiagName}}</div>
                </v-item-visit-list>
            </el-col>
            <el-col :span="6" class="p-d-24" :style="{height: `${pageHeight}px`}">
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医疗类别：" :span="span" :border="false" class="m-t-34" :itemText="visitList.medicalClass">
                    <div slot="content" class="tooltip-item">{{visitList.medicalClass}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="就诊日期：" :span="span" :border="false" class="m-t-34" :itemText="visitList.jzTime | formatTime('yyyy-MM-dd')">
                    <div slot="content" class="tooltip-item">{{visitList.jzDate | formatTime('yyyy-MM-dd')}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="入院日期：" :span="span" :border="false" class="m-t-34" :itemText="visitList.inDate | formatTime('yyyy-MM-dd')">
                    <div slot="content" class="tooltip-item">{{visitList.inDate | formatTime('yyyy-MM-dd')}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="出院日期：" :span="span" :border="false" class="m-t-34" :itemText="visitList.outDate | formatTime('yyyy-MM-dd')">
                    <div slot="content" class="tooltip-item">{{visitList.outDate | formatTime('yyyy-MM-dd')}}</div>
                </v-item-visit-list>
            </el-col>
            <el-col :span="6" class="p-d-24" :style="{height: `${pageHeight}px`}">
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="检查总费用：" :span="span" :border="false" class="m-t-34" :itemText="_getChange(visitList.checkMoneyAmout)">
                    <div slot="content" class="tooltip-item">{{_getChange(visitList.checkMoneyAmout)}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="药品总费用：" :span="span" :border="false" class="m-t-34" :itemText="_getChange(visitList.drugMoneyAmout)">
                    <div slot="content" class="tooltip-item">{{_getChange(visitList.drugMoneyAmout)}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="治疗总费用：" :span="span" :border="false" class="m-t-34" :itemText="_getChange(visitList.treatMoneyAmout)">
                    <div slot="content" class="tooltip-item">{{_getChange(visitList.treatMoneyAmout)}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="其他费用：" :span="span" :border="false" class="m-t-34" :itemText="_getChange(visitList.otherMoneyAmout)">
                    <div slot="content" class="tooltip-item">{{_getChange(visitList.otherMoneyAmout)}}</div>
                </v-item-visit-list>
                <v-item-visit-list :pxUnit="true" :labelWidth="labelWidth" :tooltip="true" label="医疗费总额：" :span="span" :border="false" class="m-t-34" :itemText="_getChange(visitList.paymentTotal)">
                    <div slot="content" class="tooltip-item">{{_getChange(visitList.paymentTotal)}}</div>
                </v-item-visit-list>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
    import {getVisitInfo} from 'js/api/workbench/auditCase/caseinfo';
    import VItemVisitList from './VItemVisitList';
    export default {
        data () {
            return {
                pageHeight: 0,
                labelWidth: 130,
                span: 5,
                visitList: {}, // 列表数据
                jzcode: '' // 就诊号
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
            // 医院等级
            formathpGrade (val) {
                let toHpGrade = {'01': '一级甲等', '02': '二级甲等', '03': '三级甲等'};
                return toHpGrade[val];
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
                this.visitList = {};
                this.jzcode = '';
                console.log('_reset==>>', Math.random());
            },
            // 获取点击上面表格每一行数据，在下面tabs切换页面展示
            _getData ({jzcode}) {
                if (jzcode) {
                    this.jzcode = jzcode;
                    // 获取就诊信息列表数据
                    getVisitInfo({jzcode}).then(({data}) => {
                        this.visitList = Object.assign({}, data);
                        console.log('就诊信息===>', data);
                    });
                    console.log('_getData VisitDetail==>>', Math.random(), jzcode);
                }
            },
            // 保留两位小数点，四舍五入
            _getChange (value) {
                if (value) {
                    value = Math.round(parseFloat(value) * 100) / 100;
                    let xsd = value.toString().split(".");
                    if (xsd.length === 1) {
                        value = value.toString() + ".00";
                        return value;
                    }
                    if (xsd.length > 1) {
                        if (xsd[1].length < 2) {
                            value = value.toString() + "0";
                        }
                        return value;
                    }
                }
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
        .p-d-24{
            padding: 0 24px;
        }
        .el-row{
            height: 100%;
            width: 100%;
            min-width:1150px;
            box-sizing: border-box;
        }
        .el-row .el-col{
            height: 100%;
        }
        .el-row .el-col:nth-child(2n){
            background: #EFF6FF;
        }
        .v-item-visit-list /deep/.text{
            padding-top: 12px;
        }
    }
</style>
