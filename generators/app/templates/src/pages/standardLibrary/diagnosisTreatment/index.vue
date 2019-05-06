<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <section>
        <head-search ref="headRef" @handlerSearch="handlerSearch" :options="diagnosisTreatmentList" :headObj="diagnosisTreatmentObj" :typeNumber="typeNumber"></head-search>
        <table-list class="list-table" :tableData ="tableData"></table-list>
        <v-paging
            :total="total"
            ref="Fpage"
            :currentPage="diagnosisTreatmentParameters.offset"
            :pageSize="diagnosisTreatmentParameters.limit"
            @pagingChange="handlePagingChange"
        ></v-paging>
    </section>
</template>

<script>
    const HeadSearch = () => import(/* webpackChunkName: "group-standardLibrary" */ './../head.vue');
    const TableList = () => import(/* webpackChunkName: "group-standardLibrary" */ './TableList.vue');
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('standardLibrary');
    import {getListDiagnosisTreatment} from "js/api/standardLibrary/standardLibrary";
    export default {
        data () {
            return {
                typeNumber: 4,
                tableData: [],
                total: 0
            };
        },
        created () {
            let {_init} = this.$route.query;
            // if (_init) {
            if (1) {
                console.log(this.$store);
                this.reset({type: 'diagnosisTreatment'});
                console.log("_init", _init);
                this.getListDiagnosisTreatmentProp();
            } else {
                if (this.diagnosisTreatmentTableObj) {
                    this.tableData = this.diagnosisTreatmentTableObj.list;
                    this.total = this.diagnosisTreatmentTableObj.total;
                }
            }
        },
        computed: {
            ...mapGetters(['diagnosisTreatmentList', 'diagnosisTreatmentParameters', 'diagnosisTreatmentObj', 'diagnosisTreatmentTableObj'])
        },
        methods: {
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                if (JSON.stringify(this.diagnosisTreatmentObj) === '{}') {
                    return;
                }
                let pageObj = Object.assign({}, this.diagnosisTreatmentParameters, data);
                this.setDiagnosisTreatmentParameters(pageObj);
                pageObj = Object.assign({}, pageObj, this.diagnosisTreatmentObj);
                this.getData(pageObj);
            },
            handlerSearch (val, request) {
                console.log('handlePagingChange', val, request);
                let obj = Object.assign({}, val, {selectMenu: val.name || ''});
                this.setDiagnosisTreatmentObj(obj);
                if (request) {
                    let parameters = Object.assign({}, this.diagnosisTreatmentParameters, this.diagnosisTreatmentObj);
                    console.log(parameters);
                    parameters.offset = 1;
                    this.getData(parameters);
                    this.$refs.Fpage._init();
                }
            },
            getData (parameters) {
                console.log("getData", parameters);
                getListDiagnosisTreatment(parameters).then(res => {
                    this.setDiagnosisTreatmentTableObj({list: res.data.data.list, total: res.data.data.total});
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                // eslint-disable-next-line handle-callback-err
                }).catch((err) => {
                });
            },
            ...mapMutations({
                setDiagnosisTreatmentList: "setDiagnosisTreatmentList",
                setDiagnosisTreatmentParameters: 'setDiagnosisTreatmentParameters',
                setDiagnosisTreatmentObj: 'setDiagnosisTreatmentObj',
                setDiagnosisTreatmentTableObj: 'setDiagnosisTreatmentTableObj'
            }),
            ...mapActions(['getListDiagnosisTreatmentProp', 'reset'])
        },
        components: {HeadSearch, TableList}
    };
</script>

<style scoped>
    .list-table {
        height: calc(100% - 110px);
    }
</style>
