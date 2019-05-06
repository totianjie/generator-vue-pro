<template>
    <div class="page" style="width:calc(100% - 20px); overflow-x: hidden;">
        <v-search-box class="wrapper">
            <div>
                <el-col :span="span">
                    <v-input label="出院日期：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <el-date-picker
                            :size="formSize"
                            class="w-fill"
                            v-model="dates"
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="timestamp"
                            range-separator="至"
                            :editable="false"
                            @change="handlerChange"
                            :picker-options="pickerOptions"
                            :clearable="true"
                            start-placeholder="开始日期"
                            @blur="blur"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="科室" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <v-select v-model="selectMenu1" :list="deps" :size="formSize" :props="selectProps" placeholder="请选择" />
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="医师" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                        <v-select v-model="selectMenu2" :list="doctors" :size="formSize" :props="selectProps" placeholder="请选择" />
                    </v-input>
                </el-col>
            </div>
            <div slot="btn">
                <el-button @click="handlerSearch" class="m-l-20" :size="btnSize">查询</el-button>
            </div>
        </v-search-box>
        <div style="padding-left: 100px;padding-right: 100px; width: calc(100% - 200px);  border-top: 1px solid #ccc;height: calc(100% - 70px);overflow-y: auto;"> 
            <el-table
                :data="tableData"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px">
                <el-table-column
                    prop="id"
                    label="序号"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="disease"
                    width="250"
                    label="疾病名称">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="指标名称">
                </el-table-column>
                <el-table-column
                    prop="score"
                    label="得分" 
                    width="160">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    // import echarts from 'echarts';
    import CONFIG from "src/config";
    export default {
        data () {
            return {
                span: 7,
                lableWidth: 136,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                selectProps: {
                    name: 'name',
                    value: 'name'
                },
                deps: [
                    {name: '妇科'},
                    {name: '产科'}
                ],
                doctors: [
                    {name: '李***(工号: 0984)'},
                    {name: '王***(工号: 0982)'}
                ],
                tableData: [{
                    id: '1',
                    disease: '剖宫产ICD-9-CM-3:74.1',
                    name: '预防性抗菌药物选择与应用时机',
                    score: '术后第2天'
                }, {
                    id: '1',
                    disease: '剖宫产ICD-9-CM-3:74.1',
                    name: '新生儿Apgar评分',
                    score: '8'
                }, {
                    id: '1',
                    disease: '剖宫产ICD-9-CM-3:74.1',
                    name: '再次手术率',
                    score: '3.00%'
                }, {
                    id: '1',
                    disease: '剖宫产ICD-9-CM-3:74.1',
                    name: '切口愈合：Ⅱ/甲',
                    score: '9'
                }, {
                    id: '1',
                    disease: '剖宫产ICD-9-CM-3:74.1',
                    name: '术后7天内出院',
                    score: '12'
                }, {
                    id: '1',
                    disease: '剖宫产ICD-9-CM-3:74.1',
                    name: '住院费用',
                    score: '15000'
                }, {
                    id: '1',
                    disease: '剖宫产ICD-9-CM-3:74.1',
                    name: '患者对服务满意程度评价',
                    score: '85'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '患者首次血常规检查完成的时间',
                    score: '38'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '患者首次尿hCG和/或血βhCG检查完成的时间',
                    score: '45'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '患者首次超声检查完成的时间',
                    score: '42'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '药物保守治疗规范（有适应证、无禁忌证者）',
                    score: '13'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '切口愈合：Ⅱ/甲',
                    score: '16'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '平均住院日',
                    score: '7'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '平均住院费用',
                    score: '13000'
                }, {
                    id: '2',
                    disease: '异位妊娠ICD10：O00',
                    name: '患者对服务满意程度评价结果',
                    score: '80'
                }, {
                    id: '3',
                    disease: '宫颈癌ICD-10：C53.902',
                    name: '预防性抗生素选择与使用时机',
                    score: '术后第2天'
                }, {
                    id: '3',
                    disease: '宫颈癌ICD-10：C53.902',
                    name: '依据术后病理分期，制订术后规范化宫颈癌综合治疗方案',
                    score: ''
                }, {
                    id: '3',
                    disease: '宫颈癌ICD-10：C53.902',
                    name: '输血量≤400ml',
                    score: '5.00%'
                }, {
                    id: '3',
                    disease: '宫颈癌ICD-10：C53.902',
                    name: '切口甲级愈合',
                    score: '13'
                }, {
                    id: '3',
                    disease: '宫颈癌ICD-10：C53.902',
                    name: '患者住院天数',
                    score: '15'
                }, {
                    id: '3',
                    disease: '宫颈癌ICD-10：C53.902',
                    name: '患者住院费用',
                    score: '28000'
                }, {
                    id: '3',
                    disease: '宫颈癌ICD-10：C53.902',
                    name: '患者对服务满意程度评价结果',
                    score: '76'
                }, {
                    id: '4',
                    disease: '子宫肌瘤ICD10：D25',
                    name: '术前住院时间',
                    score: '3'
                }, {
                    id: '4',
                    disease: '子宫肌瘤ICD10：D25',
                    name: '预防性抗菌药物选择与应用时机',
                    score: '术后第2天'
                }, {
                    id: '4',
                    disease: '子宫肌瘤ICD10：D25',
                    name: '患者住院天数',
                    score: '9'
                }, {
                    id: '4',
                    disease: '子宫肌瘤ICD10：D25',
                    name: '患者住院费用',
                    score: '17000'
                }, {
                    id: '4',
                    disease: '子宫肌瘤ICD10：D25',
                    name: '患者对服务满意程度评价结果',
                    score: '80'
                }]
            };
        },
        mounted () {
        },
        methods: {
            objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0 || columnIndex === 1) {
                    if (rowIndex === 0) {
                        return {
                            rowspan: 7,
                            colspan: 1
                        };
                    } else if (rowIndex === 7) {
                        return {
                            rowspan: 8,
                            colspan: 1
                        };
                    } else if (rowIndex === 15) {
                        return {
                            rowspan: 7,
                            colspan: 1
                        };
                    } else if (rowIndex === 22) {
                        return {
                            rowspan: 5,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        }
    };

</script>
<style scoped lang="scss">

</style>


