<!--
* @Author: GOTINTIN
* @Date: 2019/1/5
* @remark: 疾病历史对照数据
-->
<template>
    <div class="main">
        <!--查询区-->
        <search-box @search="handleSearch" v-model="searchParams" class="search-box"/>
        <!--表格区-->
        <query-table class="history-table" :tableData="diseaseList"/>
        <!--分页区-->
        <v-paging :total="total" @pagingChange="handlePagingChange" ref="bPages"/>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import QueryTable from './QueryTable';
    import SearchBox from '../SearchBox';
    import {getHistoryDisease} from 'js/api/historyLibrary/historyLibrary';
    export default {
        data () {
            return {
                total: 0,
                // 表格参数
                historyDiseaseParams: {
                    offset: 1, // 当前页数
                    limit: CONFIG.limit,
                    areaCode: '', // 区域
                    dataFrom: '' // 数据批次名称
                },
                diseaseList: [], // 列表
                searchParams: { // 省市参数
                    areaName: '', // 省
                    areaCode: '' //  市
                }
            };
        },
        mounted () {
            this._getHistoryDisease();
        },
        methods: {
            // 获取表格数据
            _getHistoryDisease () {
                this.historyDiseaseParams.areaCode = this.searchParams.areaCode; // 将市的值赋值给区域
                if (this.historyDiseaseParams.areaCode) { // 筛选区域有值时，调列表的接口
                    getHistoryDisease(this.historyDiseaseParams).then(res => {
                        this.total = res.data.data.total;
                        this.diseaseList = res.data.data.list;
                    });
                }
            },
            // 查询
            handleSearch (data) {
                console.log('查询', data);
                this.historyDiseaseParams = Object.assign({}, this.historyDiseaseParams, data);
                this.historyDiseaseParams.offset = 1; // 初始化当前页面为1
                this._getHistoryDisease(); // 调用列表
                this.$refs.bPages._init(); // 调用VPaging组件_init()方法，点查询跳到第一页
            },
            // 分页改变
            handlePagingChange (data) {
                this.historyDiseaseParams = Object.assign({}, this.historyDiseaseParams, data);
                this._getHistoryDisease();
            }
        },
        components: {QueryTable, SearchBox}
    };
</script>
<style lang="scss" scoped>
    .history-table{
        height: calc(100% - 100px /*- 80px */); // 48px -40px - 52px 顺序分别是搜索框，52px是分页
    }
</style>
