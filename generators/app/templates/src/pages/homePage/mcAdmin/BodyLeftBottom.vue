<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/15
* @remark:
-->
<template>
    <section class="wrap">
        <div class="items">
            <div class="title">
                <p>当月医院费用</p>
                <p class="bold">TOP10</p>
            </div>

            <transition-group :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
                <item
                    class="m-t-10 animated"
                    v-for="(item) in costMonthTop"
                    :key="item.id"
                    v-bind="item"
                    :currentRatioBg="defaultObj1.currentRatioBg"
                    :countBg="defaultObj1.countBg"
                />
            </transition-group>
        </div>
        <div class="items">
            <div class="title">
                <p>当月违规项目费用</p>
                <p class="bold">TOP10</p>
            </div>

            <transition-group :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
                <item
                    class="m-t-10 animated"
                    v-for="(item) in costCasesMonthTop"
                    :key="item.id"
                    v-bind="item"
                    :currentRatioBg="defaultObj2.currentRatioBg"
                    :countBg="defaultObj2.countBg"
                />
            </transition-group>
        </div>
        <div class="items">
            <div class="title">
                <p>当月违规病例数量</p>
                <p class="bold">TOP10</p>
            </div>

            <transition-group :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
                <item
                    class="m-t-10 animated"
                    v-for="(item) in costDiseaseMonthTop"
                    :key="item.id"
                    v-bind="item"
                    :currentRatioBg="defaultObj3.currentRatioBg"
                    :countBg="defaultObj3.countBg"
                />
            </transition-group>
        </div>
        <div class="items">
            <div class="title">
                <p>当月违规疾病</p>
                <p class="bold">TOP10</p>
            </div>

            <transition-group :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
                <item
                    class="m-t-10 animated"
                    v-for="(item) in costViolationsMonthTop"
                    :key="item.id"
                    v-bind="item"
                    :currentRatioBg="defaultObj4.currentRatioBg"
                    :countBg="defaultObj4.countBg"
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
                defaultObj1: {
                    currentRatioBg: '#6BDFF4',
                    countBg: '#EBF4F9'
                },
                defaultObj2: {
                    currentRatioBg: '#67C23A',
                    countBg: '#F0F9EB'
                },
                defaultObj3: {
                    currentRatioBg: '#E6A23C',
                    countBg: '#FDF6EC'
                },
                defaultObj4: {
                    currentRatioBg: '#F46B6C',
                    countBg: '#FEF0F0'
                },
                costMonthTop: [
                    // {
                    //     name: 'NO.1深圳某某医院1',
                    //     currentText: '¥8,892,000.00',
                    //     currentRatio: 60
                    // },
                    // {
                    //     name: 'NO.2深圳某某医院2',
                    //     currentText: '¥6,895,000.00',
                    //     currentRatio: 55
                    // },
                    // {
                    //     name: 'NO.3深圳某某医院3',
                    //     currentText: '¥5,892,000.00',
                    //     currentRatio: 40
                    // },
                    // {
                    //     name: 'NO.4深圳某某医院4',
                    //     currentText: '¥3,892,000.00',
                    //     currentRatio: 35
                    // },
                    // {
                    //     name: 'NO.5深圳某某医院5',
                    //     currentText: '¥2,892,000.00',
                    //     currentRatio: 20
                    // }
                ],
                costCasesMonthTop: [
                    // {
                    //     name: 'NO.1深圳某某医院1',
                    //     currentText: '¥8,892,000.00',
                    //     currentRatio: 60
                    // },
                    // {
                    //     name: 'NO.2深圳某某医院2',
                    //     currentText: '¥6,895,000.00',
                    //     currentRatio: 55
                    // },
                    // {
                    //     name: 'NO.3深圳某某医院3',
                    //     currentText: '¥5,892,000.00',
                    //     currentRatio: 40
                    // },
                    // {
                    //     name: 'NO.4深圳某某医院4',
                    //     currentText: '¥3,892,000.00',
                    //     currentRatio: 35
                    // },
                    // {
                    //     name: 'NO.5深圳某某医院5',
                    //     currentText: '¥2,892,000.00',
                    //     currentRatio: 20
                    // }
                ],
                costDiseaseMonthTop: [
                    // {
                    //     name: 'NO.1深圳某某医院1',
                    //     currentText: '¥8,892,000.00',
                    //     currentRatio: 60
                    // },
                    // {
                    //     name: 'NO.2深圳某某医院2',
                    //     currentText: '¥6,895,000.00',
                    //     currentRatio: 55
                    // },
                    // {
                    //     name: 'NO.3深圳某某医院3',
                    //     currentText: '¥5,892,000.00',
                    //     currentRatio: 40
                    // },
                    // {
                    //     name: 'NO.4深圳某某医院4',
                    //     currentText: '¥3,892,000.00',
                    //     currentRatio: 35
                    // },
                    // {
                    //     name: 'NO.5深圳某某医院5',
                    //     currentText: '¥2,892,000.00',
                    //     currentRatio: 20
                    // }
                ],
                costViolationsMonthTop: [
                    // {
                    //     name: 'NO.1深圳某某医院1',
                    //     currentText: '¥8,892,000.00',
                    //     currentRatio: 60
                    // },
                    // {
                    //     name: 'NO.2深圳某某医院2',
                    //     currentText: '¥6,895,000.00',
                    //     currentRatio: 55
                    // },
                    // {
                    //     name: 'NO.3深圳某某医院3',
                    //     currentText: '¥5,892,000.00',
                    //     currentRatio: 40
                    // },
                    // {
                    //     name: 'NO.4深圳某某医院4',
                    //     currentText: '¥3,892,000.00',
                    //     currentRatio: 35
                    // },
                    // {
                    //     name: 'NO.5深圳某某医院5',
                    //     currentText: '¥2,892,000.00',
                    //     currentRatio: 20
                    // }
                ]
            };
        },
        mixins: [mixin],
        components: {Item},
        mounted () {
            // 当月医院费用
            busEvent.$on('homePage/mcAdmin.costMonthTop', ({data} = {data: []}) => {
                let newArr = this._formatter(data, 'cost');
                this._moveItem('costMonthTop', newArr);

            });
            // 当月违规病例数
            busEvent.$on('homePage/mcAdmin.costCasesMonthTop', ({data} = {data: []}) => {
                let newArr = this._formatter(data);
                this._moveItem('costCasesMonthTop', newArr);
            });
            // 当月违规病例数
            busEvent.$on('homePage/mcAdmin.costDiseaseMonthTop', ({data} = {data: []}) => {
                let newArr = this._formatter(data);
                this._moveItem('costDiseaseMonthTop', newArr);
            });
            // 当月违规项目费用
            busEvent.$on('homePage/mcAdmin.costViolationsMonthTop', ({data} = {data: []}) => {
                let newArr = this._formatter(data, 'cost');
                this._moveItem('costViolationsMonthTop', newArr);
            });
        },
        methods: {},
        destroyed () {
            busEvent.$off('homePage/mcAdmin.costMonthTop');
            busEvent.$off('homePage/mcAdmin.costCasesMonthTop');
            busEvent.$off('homePage/mcAdmin.costDiseaseMonthTop');
            busEvent.$off('homePage/mcAdmin.costViolationsMonthTop');
        }

    };
</script>

<style scoped lang="scss">
    .wrap {
        display: flex;
        .items {
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
            flex: 1;
            padding: 9px 22px 30px 22px;
            box-sizing: border-box;
            .title {
                text-align: center;
                /*margin-bottom: 14px;*/
            }
        }
    }
</style>
