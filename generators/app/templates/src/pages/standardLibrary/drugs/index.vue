<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <section>
        <head-search ref="headRef" @handlerSearch="handlerSearch" :options="drugsList" :headObj="drugsObj" :typeNumber="typeNumber"></head-search>
        <table-list class="list-table" :tableData ="tableData"></table-list>
        <v-paging
            :total="total"
            ref="Fpage"
            :currentPage="drugsParameters.offset"
            :pageSize="drugsParameters.limit"
            @pagingChange="handlePagingChange"
        ></v-paging>
    </section>
</template>

<script>
    const HeadSearch = () => import(/* webpackChunkName: "group-standardLibrary" */ './../head.vue');
    const TableList = () => import(/* webpackChunkName: "group-standardLibrary" */ './TableList.vue');
    import {getListDrugs} from "js/api/standardLibrary/standardLibrary";
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('standardLibrary');
    export default {
        data () {
            return {
                typeNumber: 3,
                tableData: [],
                total: 0
            };
        },
        created () {
            let {_init} = this.$route.query;
            // if (_init) {
            if (1) {
                console.log(this.$store);
                this.reset({type: 'Drugs'});
                console.log("_init", _init);
                this.getListDrugsProp();
            } else {
                if (this.drugsTableObj) {
                    this.tableData = this.drugsTableObj.list;
                    this.total = this.drugsTableObj.total;
                }
            }
        },
        computed: {
            ...mapGetters(['drugsList', 'drugsParameters', 'drugsObj', 'drugsTableObj'])
        },
        methods: {
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                if (JSON.stringify(this.drugsObj) === '{}') {
                    return;
                }
                let pageObj = Object.assign({}, this.drugsParameters, data);
                this.setDrugsParameters(pageObj);
                pageObj = Object.assign({}, pageObj, this.drugsObj);
                this.getData(pageObj);
            },
            handlerSearch (val, request) {
                console.log('handlePagingChange', val, request);
                let obj = Object.assign({}, val, {selectMenu: val.name || ''});
                this.setDrugsObj(obj);
                if (request) {
                    let parameters = Object.assign({}, this.drugsParameters, this.drugsObj);
                    console.log(parameters);
                    parameters.offset = 1;
                    this.getData(parameters);
                    this.$refs.Fpage._init();
                }
            },
            getData (parameters) {
                console.log("getData", parameters);
                getListDrugs(parameters).then(res => {
                    this.setDrugsTableObj({list: res.data.data.list, total: res.data.data.total});
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                // eslint-disable-next-line handle-callback-err
                }).catch((err) => {
        
                });
            },
            ...mapMutations({
                setDrugsList: "setDrugsList",
                setDrugsParameters: 'setDrugsParameters',
                setDrugsObj: 'setDrugsObj',
                setDrugsTableObj: 'setDrugsTableObj'
            }),
            ...mapActions(['getListDrugsProp', 'reset'])
        },
        components: {HeadSearch, TableList}
    };
</script>

<style scoped>
    .list-table {
        height: calc(100% - 110px);
    }
</style>
