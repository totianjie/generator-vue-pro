<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <section>
        <head-search ref="headRef" @handlerSearch="handlerSearch" :options="diseaseList" :headObj="diseaseObj" :typeNumber="typeNumber"></head-search>
        <table-list class="list-table" :tableData ="tableData"></table-list>
        <v-paging
            :total="total"
            ref="Fpage"
            :currentPage="diseaseParameters.offset"
            :pageSize="diseaseParameters.limit"
            @pagingChange="handlePagingChange"
        ></v-paging>
    </section>
</template>

<script>
    const HeadSearch = () => import(/* webpackChunkName: "group-standardLibrary" */ './../head.vue');
    const TableList = () => import(/* webpackChunkName: "group-standardLibrary" */ './TableList.vue');
    import {getListDisease} from "js/api/standardLibrary/standardLibrary";
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('standardLibrary');
    export default {
        data () {
            return {
                typeNumber: 1,
                tableData: [],
                total: 0
            };
        },
        created () {
            let {_init} = this.$route.query;
            // if (_init) {
            if (1) {
                console.log(this.$store);
                this.reset({type: 'Disease'});
                console.log("_init", _init);
                this.getListDiseaseProp();
            } else {
                if (this.diseaseTableObj) {
                    this.tableData = this.diseaseTableObj.list;
                    this.total = this.diseaseTableObj.total;
                }
            }
        },
        computed: {
            ...mapGetters(['diseaseList', 'diseaseParameters', 'diseaseObj', 'diseaseTableObj'])
        },
        methods: {
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                if (JSON.stringify(this.diseaseObj) === '{}') {
                    return;
                }
                let pageObj = Object.assign({}, this.diseaseParameters, data);
                this.setDiseaseParameters(pageObj);
                pageObj = Object.assign({}, pageObj, this.diseaseObj);
                this.getData(pageObj);
            },
            handlerSearch (val, request) {
                console.log('handlePagingChange', val, request);
                let obj = Object.assign({}, val, {selectMenu: val.name || ''});
                this.setDiseaseObj(obj);
                if (request) {
                    let parameters = Object.assign({}, this.diseaseParameters, this.diseaseObj);
                    console.log(parameters);
                    parameters.offset = 1;
                    this.getData(parameters);
                    this.$refs.Fpage._init();
                }
            },
            getData (parameters) {
                console.log("getData", parameters);
                getListDisease(parameters).then(res => {
                    this.setDiseaseTableObj({list: res.data.data.list, total: res.data.data.total});
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                // eslint-disable-next-line handle-callback-err
                }).catch((err) => {
        
                });
            },
            ...mapMutations({
                setDiseaseList: "setDiseaseList",
                setDiseaseParameters: 'setDiseaseParameters',
                setDiseaseObj: 'setDiseaseObj',
                setDiseaseTableObj: 'setDiseaseTableObj'
            }),
            ...mapActions(['getListDiseaseProp', 'reset'])
        },
        components: {HeadSearch, TableList}
    };
</script>

<style scoped>
    .list-table {
        /* height: calc(100% - 150px);  新版本功能*/
        height: calc(100% - 110px);
    }
</style>
