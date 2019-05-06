<!--
* @Author: mikey.TIANJIE
* @Date: {{year}}/11/15
* @remark: 头部
-->
<template>
    <ul class="mc-header-wrap">
        <li class="item title right-line one">医保{{year}}年大数据监控</li>
        <li class="item right-line two">
            <p>当年已审核病例</p>
            <span class="num">
                <count-to :startVal='startVal' :endVal='obj.redCases' :duration='duration' :decimals="decimals"></count-to>
            </span>份
        </li>
        <li class="item right-line two">
            <p>当年病例支付总费用</p>
            <span class="num"><count-to :startVal='startVal' :endVal='obj.totalCost' :duration='duration' :decimals="decimals"></count-to></span>元
        </li>
        <li class="item right-line three">
            <p>当年已发现违规病例</p>
            <span class="num"><count-to :startVal='startVal' :endVal='obj.violationsCases' :duration='duration' :decimals="decimals"></count-to></span>份;<span class="num">{{obj.proportionCases}}%</span>
        </li>
        <li class="item three">
            <p>当年违规项目支付总费用</p>
            <span class="num"><count-to :startVal='startVal' :endVal='obj.violationsCost' :duration='duration' :decimals="decimals"></count-to></span>元;占比 <span class="num">{{obj.proportionCost}}%</span>
        </li>
    </ul>
</template>

<script>
    import busEvent from 'src/busEvent';

    export default {
        data () {
            return {
                obj: {
                    redCases: 0, // 审核病例
                    totalCost: 0, // 病例支付费用

                    violationsCases: 0, // 违规病例
                    proportionCases: 0, // 违规病例占比

                    violationsCost: 0, // 违规项目支付费用
                    proportionCost: 0 // 违规项目支付费用占比
                },
                year: '',
                decimals: 0,
                startVal: 0,
                duration: 2000
            };
        },
        mounted () {
            busEvent.$on('homePage/mcAdmin.totalCases', ({data} = {data: {}}) => {
                this.obj = Object.assign({}, data);
            });
            busEvent.$on('homePage/mcAdmin.newdate', ({data} = {data: {currentTime: Date.now()}}) => {
                let oDate = new Date(data.currentTime);
                this.year = oDate.getFullYear();
            });
            // setTimeout(() => { // 数据改变自动计算
            //     this.endVal = 15236;
            // }, 5000);
        },
        destroyed () {
            busEvent.$off('homePage/mcAdmin.totalCases');
            busEvent.$off('homePage/mcAdmin.newdate');
        }
    };
</script>

<style scoped lang="scss">
    .mc-header-wrap {
        display: flex;
        .item {
            text-align: center;
            padding-top: 20px;
            position: relative;
            &.title {
                color: #333;
                font-size: 18px;
                font-weight: bold;
                padding-top: 28px;
                padding-left: 18px;
                text-align: left;
            }
            &.right-line:after {
                content: '';
                position: absolute;
                right: 0;
                top: 28px;
                width: 2px;
                height: 20px;
                background: rgba(69, 121, 197, 1);
            }
            &.one {
                flex: 1 0 200px;
            }
            &.two {
                flex: 1 0 170px;
            }
            &.three {
                flex: 1 0 290px;
            }

            .num {
                color: #FF6432;
                font-size: 18px;
            }
        }
    }
</style>
