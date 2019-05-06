<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div>
        <ruleClass-table ref="tableView" class="ruleClass-table"></ruleClass-table>
        <add-ruleClass class="add-ruleClass" v-if="isAdd || isEdit"></add-ruleClass>
        <detail-ruleClass class="detail-ruleClass" v-show="isDetail">
        </detail-ruleClass>
    </div>
</template>
<script type="text/ecmascript-6">
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('scene/ruleClassify');
    import CONFIG from 'src/config';
    const RuleClassTable = () => import(/* webpackChunkName: "group-sceneManage" */'./RuleClassTable');
    const AddRuleClass = () => import(/* webpackChunkName: "group-sceneManage" */'./components/AddRuleClass');
    const DetailRuleClass = () => import(/* webpackChunkName: "group-sceneManage" */'./components/DetailRuleClass');
    export default {
        props: {

        },
        data () {
            return {
                btnSize: CONFIG.homeBtn
            };
        },
        computed: {
            isAdd () {
                return this.RCPageSatus === 'add';
            },
            isEdit () {
                return this.RCPageSatus === 'edit';
            },
            isDetail () {
                return this.RCPageSatus === 'detail';
            },
            ...mapGetters(['RCPageSatus'])
        },
        watch: {

        },
        created () {
            console.log(this.$store);
            let {_init} = this.$route.query;
            // if (_init) {
            if (1) {
                console.log(_init);
                console.log("_init");
                this.getRuleClassTree(true);
            }
        },
        mounted () {
            this.setRCPageSatus("detail");
        },
        methods: {
            ...mapMutations(['setRCPageSatus']),
            ...mapActions(['getRuleClassTree'])
        },
        components: {
            RuleClassTable, AddRuleClass, DetailRuleClass
        }
    };
</script>
<style lang="scss" scoped>
    .ruleClass-table {
        float: left;
        background-color: #fff;
        border-radius: 6px;
        height: calc(100% - 74px);
    }
    .add-ruleClass-group,.add-ruleClass,.detail-ruleClass-group, .detail-ruleClass{
        float: right;
        display: inline-block;
        width: calc(100% - 480px);
        height: calc(100% - 10px);
        overflow-y: auto;
        overflow: auto;
        box-sizing: border-box;
    }
</style>
