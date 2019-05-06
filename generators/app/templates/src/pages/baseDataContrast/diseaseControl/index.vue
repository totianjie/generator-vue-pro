<!--
* @Author: mikey.TIANJIE
* @Date: 2018-08-01 13:13:26
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-08-01 13:13:26
* @remark: 疾病对照页面
-->
<template>
    <section class="disease-control-wrap">
        <section class="page h-fill">
            <box-wrap v-if="tabsActive !== 4 && tabsActive !== 6">
                <raw-data
                    ref="rawData"
                    :searchParams.sync="searchParams"
                    :tableData.sync="tableData"
                    :batchNOList="batchNOList"
                    slot="left"
                    :tabsActive.sync="tabsActive"
                    :tabsStatus.sync="tabsStatus"
                    :pagingParams.sync="pagingParams"
                    :total.sync="total"
                    @clear="handlerClear"
                    :tabsData.sync="tabsData"
                    :sortObj.sync="sortObj"
                    :oldSearchParams.sync="oldSearchParams"
                />
                <standard-data :oldStandardSearchParams.sync="oldStandardSearchParams" :limit.sync="standardDataLimit" :searchParams.sync="standardSearchParams" :diseaseVersionsList="diseaseVersionsList" slot="right"/>
            </box-wrap>
            <raw-data
                ref="rawData"
                :searchParams.sync="searchParams"
                :tableData.sync="tableData"
                :batchNOList="batchNOList"
                slot="left"
                v-if="tabsActive === 4 || tabsActive === 6"
                :tabsActive.sync="tabsActive"
                :tabsStatus.sync="tabsStatus"
                :pagingParams.sync="pagingParams"
                :total.sync="total"
                @clear="handlerClear"
                :tabsData.sync="tabsData"
                :sortObj.sync="sortObj"
                :oldSearchParams.sync="oldSearchParams"
            />
        </section>
    </section>
</template>
<script>
    import BoxWrap from './../components/Box';
    import StandardData from './common/StandardData';
    import RawData from './common/RawData';
    import {getDict} from "../../../js/api/baseDataContrast/diseaseControl";
    import busEvent from 'src/busEvent';
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                tabsActive: 0,
                tabsStatus: null, // tabs当前状态
                tableData: [ // 原始数据
                    /*
                    * auditId (integer, optional): 对照疾病id ,
                    * diseaseCode (string, optional): 标准疾病编码 ,
                    * diseaseCodeAdd (string, optional): 附加码(标准) ,
                    * diseaseHeadVersion (string, optional): 疾病版本id ,
                    * diseaseHeadVersionName (string, optional): 标准疾病版本名称 ,
                    * diseaseName (string, optional): 标准疾病名称 ,
                    * id (integer, optional): 原始疾病id ,
                    * instDiseaseCode (string, optional): 原始疾病编码 ,
                    * instDiseaseName (string, optional): 原始疾病名称 ,
                    * status (string, optional): 状态 ,
                    * statusName (string, optional): 状态名称
                    * */
                    // {
                    //     "id": 1,
                    //     "auditId": null,
                    //     "diseaseCode": null,
                    //     "diseaseName": null,
                    //     "diseaseCodeAdd": null,
                    //     "instDiseaseCode": "A01.000",
                    //     "instDiseaseName": "伤寒",
                    //     "diseaseHeadVersion": null,
                    //     "diseaseHeadVersionName": null,
                    //     "status": "0",
                    //     "statusName": "未对照"
                    // }
                ],
                pagingParams: {
                    limit: CONFIG.limit,
                    offset: 1
                },
                total: 0, // 分页总条数
                batchNOList: [], // 批次号 下拉框数据
                searchParams: { // 查询的参数  原始数据
                    compareOptUser: '', // 对照人
                    batchNo: '', //  批次号
                    instDiseaseCode: '', // 原始疾病编码
                    diseaseName: '', // 标准疾病名称
                    instDiseaseName: '', // 原始疾病名称
                    startTime: '', // 筛选条件-起始时间
                    endTime: '' // 筛选条件-结束时间
                },
                oldSearchParams: {
                    compareOptUser: '', // 对照人
                    batchNo: '', //  批次号
                    instDiseaseCode: '', // 原始疾病编码
                    diseaseName: '', // 标准疾病名称
                    instDiseaseName: '', // 原始疾病名称
                    startTime: '', // 筛选条件-起始时间
                    endTime: '' // 筛选条件-结束时间
                },
                diseaseVersionsList: [], // 版本列表 下拉框数据
                standardSearchParams: {
                    versionId: '',
                    diseaseCode: '',
                    diseaseName: ''
                },
                oldStandardSearchParams: {
                    versionId: '',
                    diseaseCode: '',
                    diseaseName: ''
                },
                standardDataLimit: CONFIG.limit,
                tabsData: [ // tabs 数据 筛选状态-0：未对照 1已对照未审核 2已审核 3已撤销 4不能对照
                    {rate: '', name: '全部', count: '', status: null, index: 0},
                    {rate: '', name: '未对照', count: '', status: 0, index: 1},
                    {rate: '', name: '已对照未审核', count: '', status: 1, index: 2},
                    {rate: '', name: '不能对照未审核', count: '', status: 5, index: 5},
                    {rate: '', name: '撤销审核', count: '', status: 3, index: 3},
                    {rate: '', name: '已对照已审核', count: '', status: 2, index: 4},
                    {rate: '', name: '不能对照已审核', count: '', status: 6, index: 6}
                ],
                sortObj: {
                    orderByName: 'serialNum',
                    orderBy: 1 // orderBy 排序（1 升序，2 降序）
                }
            };
        },
        computed: {
            unaudited () {
            },
            audited () {
            }
        },
        created () {
            getDict().then(({data}) => {
                let {batchNOs, diseaseVersions} = data;
                this.batchNOList = batchNOs;
                this.diseaseVersionsList = diseaseVersions;
            });
        },
        mounted () {
            // 标准数据  单击  主要用于批量学习做判断和接口提交
            busEvent.$on('baseDataContrast/diseaseControl/common/StandardData.standardData', (json = null) => {
                let diseaseName = '';
                if (json) {
                    diseaseName = json.diseaseName;
                }
                this.searchParams = Object.assign({}, this.searchParams, {diseaseName});
            });
            // 原始数据点击
            busEvent.$on('baseDataContrast/diseaseControl/common/RawDataTableMixins.rowClick', ({instDiseaseName} = {}) => {
                this.searchParams = Object.assign({}, this.searchParams, {instDiseaseName});
            });
        },
        methods: {
            handlerClear () {
                this.searchParams = Object.assign({}, this.searchParams, {
                    // batchNo: '', //  批次号
                    instDiseaseCode: '', // 原始疾病编码
                    diseaseName: '', // 标准疾病名称
                    instDiseaseName: '' // 原始疾病名称
                    // startTime: '', // 筛选条件-起始时间
                    // endTime: '' // 筛选条件-结束时间
                });
                this.oldSearchParams = Object.assign({}, this.searchParams);
            }
        },
        components: {BoxWrap, RawData, StandardData}
    };
</script>
<style lang="scss" scoped>
</style>


