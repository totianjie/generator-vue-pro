<!--
* @Author: mikey.TIANJIE
* @Date: 2018/11/16
* @remark:
-->
<template>
    <section>
        <div class="name">
            <span class="text text-ellipsis" :title="name" v-html="name"></span>
            <span class="count" :title="count" v-html="count"></span>
        </div>
        <div class="progress-bar" :style="{backgroundColor: countBg}">
            <span
                class="num text-ellipsis"
                :title="currentText"
                v-text="currentText"
                :style="{color: currentTextColor}"
            ></span>
            <span class="progress" :style="styles"></span>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            name: {
                type: [String],
                default: '' // NO.1深圳某某医院某医院某医院
            },
            count: { // 总数  可不传
                type: [String],
                default: '' // ¥8,892,043
            },
            countBg: {
                type: String,
                default: '#EBF4F9'
            },
            currentText: {
                type: String,
                default: '¥0.00' // ¥0.00/20%
            },
            currentRatio: { // 当前色块占比
                type: [Number],
                default: 0
            },
            currentRatioBg: { // 当前占比背景色
                type: [String],
                default: '#6BDFF4'
            },
            currentTextColor: {
                type: String,
                default: '#333'
            }
        },
        computed: {
            setStyle () {
                return {
                    width: `${this.currentRatio}%`,
                    backgroundColor: this.currentRatioBg
                };
            }
        },
        data () {
            return {
                styles: {}
            };
        },
        mounted () {
            this._move();
        },
        methods: {
            _move () {
                this.timer = setTimeout(() => {
                    this.styles = Object.assign({}, this.setStyle);
                    clearTimeout(this.timer);
                }, 200);
            }
        },
        watch: {
            currentRatio: function (newCurrent, oldCurrent) {
                this._move();
            }
        }

    };
</script>

<style scoped lang="scss">
    .name {
        overflow: hidden;
        .text {
            max-width: 100%;
            float: left;
        }
        .count {
            float: right;
        }
    }

    .progress-bar {
        position: relative;
        height: 18px;
        margin-top: 8px;
        text-align: center;
        background-color: #EBF4F9;
        color: #333;
        .num {
            display: block;
            position: relative;
            z-index: 2;
        }
        .progress {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0;
            transition: width 1s ease-in;
            background-color: #6BDFF4;
        }
    }
</style>
