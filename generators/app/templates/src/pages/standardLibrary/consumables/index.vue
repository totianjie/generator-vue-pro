<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <section>
        <head-search ref="headRef" @handlerSearch="handlerSearch" :options="consumablesList" :headObj="consumablesObj" :typeNumber="typeNumber"></head-search>
        <table-list class="list-table" :tableData ="tableData"></table-list>
        <v-paging
            :total="total"
            ref="Fpage"
            :currentPage="consumablesParameters.offset"
            :pageSize="consumablesParameters.limit"
            @pagingChange="handlePagingChange"
        ></v-paging>
    </section>
</template>

<script>
    const HeadSearch = () => import(/* webpackChunkName: "group-standardLibrary" */ './../head.vue');
    const TableList = () => import(/* webpackChunkName: "group-standardLibrary" */ './TableList.vue');
    import {getListConsumables} from "js/api/standardLibrary/standardLibrary";
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('standardLibrary');
    export default {
        data () {
            return {
                typeNumber: 5,
                tableData: [],
                total: 0
            };
        },
        created () {
            let {_init} = this.$route.query;
            // if (_init) {
            if (1) {
                console.log(this.$store);
                this.reset({type: 'consumables'});
                console.log("_init", _init);
                this.getListConsumablesProp();
            } else {
                if (this.consumablesTableObj) {
                    this.tableData = this.consumablesTableObj.list;
                    this.total = this.consumablesTableObj.total;
                }
            }
        },
        mounted () {
        },
        computed: {
            ...mapGetters(['consumablesList', 'consumablesParameters', 'consumablesObj', 'consumablesTableObj'])
        },
        methods: {
            dateTimeDowith (datetime) {
                if (datetime === null || datetime === undefined || datetime === '') {
                    return '';
                }
                if (typeof datetime === 'number') {
                    let date = new Date(datetime);
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    let d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    let h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    let minute = date.getMinutes();
                    let second = date.getSeconds();
                    minute = minute < 10 ? ('0' + minute) : minute;
                    second = second < 10 ? ('0' + second) : second;
                    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
                }
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            },
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                if (JSON.stringify(this.consumablesObj) === '{}') {
                    return;
                }
                let pageObj = Object.assign({}, this.consumablesParameters, data);
                this.setConsumablesParameters(pageObj);
                pageObj = Object.assign({}, pageObj, this.consumablesObj);
                this.getData(pageObj);
            },
            handlerSearch (val, request) {
                console.log('handlePagingChange', val, request);
                let obj = Object.assign({}, val, {selectMenu: val.name || ''});
                this.setConsumablesObj(obj);
                if (request) {
                    let parameters = Object.assign({}, this.consumablesParameters, this.consumablesObj);
                    console.log(parameters);
                    parameters.offset = 1;
                    this.getData(parameters);
                    this.$refs.Fpage._init();
                }
            },
            getData (parameters) {
                console.log("getData", parameters);
                getListConsumables(parameters).then(res => {
                    res.data.data.list = res.data.data.list.map((res2, index) => {
                        let obj = Object.assign({}, res2, {index});
                        obj.updateTime = this.dateTimeDowith(obj.updateTime);
                        return obj;
                    });
                    this.setConsumablesTableObj({list: res.data.data.list, total: res.data.data.total});
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                // eslint-disable-next-line handle-callback-err
                }).catch((err) => {
                    console.error(err);
                });
            },
            ...mapMutations({
                setConsumablesList: "setConsumablesList",
                setConsumablesParameters: 'setConsumablesParameters',
                setConsumablesObj: 'setConsumablesObj',
                setConsumablesTableObj: 'setConsumablesTableObj'
            }),
            ...mapActions(['getListConsumablesProp', 'reset'])
        },
        components: {HeadSearch, TableList}
    };
</script>

<style scoped>
    .list-table {
        height: calc(100% - 110px);
    }
</style>
