<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark: 双控项目 管理者首页  mc双控项目前缀
-->
<template>
    <section class="mc-admin-wrap">
        <mc-head class="mc-head"/>
        <mc-body class="mc-body"/>
    </section>
</template>

<script>
    import McHead from './McHead';
    import McBody from './McBody';
    import * as API from 'src/js/api/homePage/mcAdmin';
    import busEvent from 'src/busEvent';

    export default {
        data () {
            return {
                duration: 1000 * 60 * 3, // 轮询间隔
                isInit: false, // 是否被初始化过
                costMonthTop: {}, // 当月医院费用
                costCasesMonthTop: {}, // 当月违规病例数
                costDiseaseMonthTop: {}, // 当月违规病例数
                costViolationsMonthTop: {}, // 当月违规项目费用

                increasedCosts: {}, // 费用增长
                agePiecewise: {}, // 年龄分段

                casesDataStatistics: {}, // 病例分类统计

                newdate: {}, // 监管时间
                totalCases: {} // 总病例
            };
        },
        created () {
            this.interval = null;
            this.getDataAll();
        },
        mounted () {
            this.interval = setInterval(() => {
                this.getDataAll();
            }, this.duration);
        },
        methods: {
            getDataAll () {
                // 当月医院费用
                API.getCostMonthTop().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.costMonthTop', {data});
                });
                // 当月违规病例数
                API.getCostCasesMonthTop().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.costCasesMonthTop', {data});
                });
                // 当月违规病例数
                API.getCostDiseaseMonthTop().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.costDiseaseMonthTop', {data});
                });
                // 当月违规项目费用
                API.getCostViolationsMonthTop().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.costViolationsMonthTop', {data});
                });
                // 费用增长
                API.getIncreasedCosts().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.increasedCosts', {data});
                });
                // 年龄分段
                API.getAgePiecewise().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.agePiecewise', {data});
                });
                // 病例分类统计
                API.getCasesDataStatistics().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.casesDataStatistic', {data});
                });
                if (!this.isInit) {
                    // 监管时间
                    API.getNewdate().then(({data}) => {
                        busEvent.$emit('homePage/mcAdmin.newdate', {data});
                        this.isInit = true;
                    });
                }

                // 总病例
                API.getTotalCases().then(({data}) => {
                    busEvent.$emit('homePage/mcAdmin.totalCases', {data});
                });
            }
        },
        components: {McHead, McBody},
        destroyed () {
            clearInterval(this.interval);
        }
    };
</script>

<style scoped lang="scss">
    .mc-admin-wrap {
        height: 100%;
        .mc-head {
            height: 80px;
        }
        .mc-body {
            height: calc(100% - 80px);
            box-sizing: border-box;
        }

    }
</style>
