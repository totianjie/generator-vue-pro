<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark: 主体盒子right 部份
-->
<template>
    <section class="body-right-wrap">
        <div class="dates-wrap clearfix bold">
            <span class="pull-left">当年已监管{{superviseDays}}</span>
            <span class="pull-right">{{currentTimer | formatTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </div>
        <p class="title-wrap bold">当年全部病例中部分数据统计</p>
        <div class="types-wrap clearfix">
            <div class="current pull-left">
                <span class="block" :style="{backgroundColor: defaultObj.currentRatioBg}">色块</span>
                <span class="text">违规产生总费用</span>
            </div>
            <div class="count pull-right">
                <div class="block" :style="{backgroundColor: defaultObj.countBg}">色块</div>
                <span class="text">该种类总费用</span>
            </div>
        </div>
        <div class="items-wrap">
            <transition-group :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
                <item
                    class="m-t-10 animated"
                    v-for="(item) in casesDataStatistic"
                    :key="item.id"
                    v-bind="item"
                    :currentTextColor="defaultObj.currentTextColor"
                    :currentRatioBg="defaultObj.currentRatioBg"
                    :countBg="defaultObj.countBg"
                />
            </transition-group>

        </div>
    </section>
</template>

<script>
    import Item from './Item';
    import busEvent from 'src/busEvent';
    import mixin from './mixin';

    export default {
        data () {
            return {
                currentTimer: Date.now(), // 默认是当前时间
                startTimer: new Date((new Date()).getFullYear(), 0, 1, 0, 0, 0).getTime(), // 监控的开始时间, 默认是当前年第一天
                defaultObj: {
                    currentTextColor: '#fff',
                    currentRatioBg: '#4CABCE',
                    countBg: '#0D3366'
                },
                casesDataStatistic: [
                    // {
                    //     name: '药品支付费用',
                    //     count: '¥2,000,000.00',
                    //     currentText: '¥2000.00/20.00%',
                    //     currentRatio: 20
                    // },
                    // {
                    //     name: '抗生素支付费用',
                    //     count: '¥2,000,000.00',
                    //     currentText: '¥2000.00/20.00%',
                    //     currentRatio: 30
                    // },
                    // {
                    //     name: '输血及凝血制品',
                    //     count: '¥2,000,000.00',
                    //     currentText: '¥2000.00/20.00%',
                    //     currentRatio: 40
                    // },
                    // {
                    //     name: '检验检查费用',
                    //     count: '¥2,000,000.00',
                    //     currentText: '¥2000.00/20.00%',
                    //     currentRatio: 20
                    // },
                    // {
                    //     name: '手术治疗费用',
                    //     count: '¥2,000,000.00',
                    //     currentText: '¥2000.00/20.00%',
                    //     currentRatio: 60
                    // },
                    // {
                    //     name: '耗材费用',
                    //     count: '¥2,000,000.00',
                    //     currentText: '¥2000.00/20.00%',
                    //     currentRatio: 65
                    // },
                    // {
                    //     name: '高值耗材费用',
                    //     count: '¥2,000,000.00',
                    //     currentText: '¥2000.00/20.00%',
                    //     currentRatio: 15
                    // }
                ]
            };
        },
        computed: {
            // 监管天数
            superviseDays: function () {
                let s = (this.currentTimer - this.startTimer) / 1000;
                let d = Math.floor(s / 86400);
                s %= 86400;
                let h = Math.floor(s / 3600);
                return `${d}天${h}小时`;
            }
        },
        mixins: [mixin],
        components: {Item},
        created () {
            this.interval = null;
            this._initClock();
        },
        mounted () {
            busEvent.$on('homePage/mcAdmin.casesDataStatistic', ({data} = {data: []}) => {
                // this.casesDataStatistic = Object.assign([], );
                let newArr = this._formatter(data);
                this._moveItem('casesDataStatistic', newArr);
            });
            busEvent.$on('homePage/mcAdmin.newdate', ({data}) => {
                let {currentTime, monitoringTime} = data;
                this.currentTimer = currentTime;
                this.startTimer = monitoringTime;
                this._initClock();
            });
        },
        methods: {
            _initClock () {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.currentTimer += 1000;
                }, 1000);
            },
            _formatter (arr, textKey = 'cases') {
                if (!Array.isArray(arr) || arr.length === 0) {
                    return [];
                }
                return arr.map((item, index) => {
                    let obj = {};
                    obj.name = item.casesName;
                    obj.currentText = `¥${item.cost}/${item.proportionPay}%`;
                    obj.count = `¥${parseFloat(item.totalCost)}`;
                    obj.currentRatio = parseFloat(item.proportionPay);
                    return obj;
                });
            }
        },
        destroyed () {
            clearInterval(this.interval);
            busEvent.$off('homePage/mcAdmin.casesDataStatistic');
            busEvent.$off('homePage/mcAdmin.newdate');
        }
    };
</script>

<style scoped lang="scss">
    .body-right-wrap {
        padding: 7px 32px 32px 32px;
        box-sizing: border-box;
        color: #333;
        .dates-wrap {
        }
        .title-wrap {
            text-align: center;
            margin-top: 22px;
        }
        .types-wrap {
            margin-top: 34px;
            font-size: 12px;
            .block {
                display: inline-block;
                width: 36px;
                height: 18px;
                margin-right: 16px;
                background-color: #4CABCE;
                text-indent: -9999px;
            }
            .count .block {
                background-color: #0D3366;
            }
            .text {
            }
        }
        .items-wrap {
            max-height: calc(100% - 19px - 41px - 52px - 35px);
            overflow-y: auto;
            overflow-x: hidden;
            margin-top: 35px;
        }
    }
</style>
