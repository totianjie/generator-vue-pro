<template>
    <div class="gauge-wrap" ref="gauge_wrap">
        <div
            :style="{width: `${radius * 2}px`, position: 'relative'}"
            @mouseenter.prevent="enterFn"
            @mouseleave.prevent="leaveFn"
            @mousemove.prevent="moveFn"
        >
            <!--  -->
            <canvas ref="echar_canvas" :width="radius * 2" :height="radius + (borderW/2)">
            </canvas>
            <!-- 刻度,指针,盖帽 start -->
            <div
                class="gauge-main"
                ref="gauge_main"
                :style="{height: `${radius}px`}"
            >
                <!-- 刻度 -->
                <span
                    v-for="(scale, index) in scaleCount"
                    :key="index"
                    class="gauge-scale"
                    :class="{'gauge-active': index % scaleNum === 0}"
                    :style="{transformOrigin: `center ${radius}px`, transform: `rotate(${(index * rotateEdg) - 90}deg)`}"
                ></span>
                <!-- 盖帽 -->
                <span class="gauge-cap"></span>
                <!-- 指针 -->
                <span
                    class="gauge-pointer"
                    :style="{transform: `rotate(${rotatePointer}deg)`,width: `${radius - pointerOffset}px`, left: `${pointerOffset}px`}"
                ></span>
            </div>
            <!-- 刻度,指针,盖帽 end -->

            <div class="clearfix">
                <span class="gauge-start pull-left">0%</span>
                <span class="gauge-end pull-right">100%</span>
                <p class="gauge-current text-center">{{(current/count * 100).toFixed(2)}}%</p>
                <p class="gauge-name text-center">{{name}}</p>
            </div>
        </div>
        <!-- 浮层 start -->
        <div
            class="gauge-tooltip"
            :class="{'gauge-show': tipShow}"
            :style="{left: `${left}px`, top: `${top}px`}"
            v-html="topsFn"
        >
            {{}}
        </div>
        <!-- 浮层 end -->
    </div>
</template>
<script type="text/ecmascript-6">
    import {d2a} from 'js/utils/utils';
    import {getPos} from 'js/utils/dom';

    export default {
        name: 'gauge',
        props: {
            isRound: { // 是否需要圆角
                type: Boolean,
                default () {
                    return true;
                }
            },
            isLg: { // 是否需要渐变
                type: Boolean,
                default () {
                    return false;
                }
            },
            borderW: { // 弧的厚度
                type: Number,
                default () {
                    return 10;
                }
            },
            colors: { // 渐变配制 如果isLg是true 时传
                type: Array,
                default () {
                    return [{n: 0, color: '#ffb055'}, {n: 1, color: '#fb4376'}];
                }
            },
            color: { // 如果isLg是false 时传
                type: String,
                default () {
                    return '#399';
                }
            },
            start: { // 开始弧度
                type: Number,
                default () {
                    return 0;
                }
            },
            end: { // 结束弧度
                type: Number,
                default () {
                    return 180;
                }
            },
            radius: { // 半径
                type: Number,
                default () {
                    return 100;
                }
            },
            name: {
                type: String,
                default () {
                    return '默认名称';
                }
            },
            current: { // 当前值
                type: Number,
                default () {
                    return 0;
                }
            },
            count: { // 总值
                type: Number,
                default () {
                    return 100;
                }
            },
            splitNum: { // 大刻度 分多少个块
                type: Number,
                default () {
                    return 5;
                }
            },
            scaleNum: { // 每一块分多少个小刻度
                type: Number,
                default () {
                    return 5;
                }
            },
            pointerOffset: { // 指针离开圆外边的距离
                type: Number,
                default () {
                    return 20;
                }
            },
            formatter: { // 格式化浮层样式   return 返回字符串	'<div></div>'
                type: Function,
                default () {
                    return `<p>当前值:${this.current}</p>
                                    <p>总数:${this.count}</p>
                            `;
                }
            }
        },

        data () {
            return {
                // 鼠标移入浮层样式
                tipShow: false,
                left: 0,
                top: 0
            };
        },

        computed: {
            scaleCount () {
                return this.splitNum * this.scaleNum + 1;
            },
            rotateEdg () {
                return this.end / (this.splitNum * this.scaleNum);
            },
            rotatePointer () {
                return (this.end / this.count) * this.current;
            },
            topsFn () {
                if (typeof this.formatter === 'function') {
                    return this.formatter(this.$props);
                } else {
                    return `${this.name}:&nbsp${this.current}/${this.count}`;
                }
            }
        },
        mounted () {
            this.canvas = this.$refs.echar_canvas;
            this.gaugeWrap = this.$refs.gauge_wrap;
            this._init();
        },
        methods: {
            // 初始化canvas
            _canvasInit () {
                let gd = this.canvas.getContext('2d');
                let obj = {
                    lg: '',
                    radius: '',
                    round: '',
                    bw: '',
                    start: '',
                    end: '',
                    cx: '',
                    cy: ''
                };

                if (this.isLg) {
                    obj.lg = gd.createLinearGradient(0, 0, this.radius * 2, 0);// 渐变  开始x y   结束x y

                    this.colors.forEach(function (item) {
                        obj.lg.addColorStop(item.n, item.color);
                    });
                } else {
                    obj.lg = this.color;
                }

                obj.radius = this.radius;
                obj.round = this.isRound ? 'round' : '';
                obj.bw = this.borderW;
                obj.start = this.start + 180;
                obj.end = this.end + 180;
                obj.cx = this.radius;
                obj.cy = this.radius;

                gd.beginPath();// 重新开户路径
                gd.arc(obj.cx, obj.cy, obj.radius - obj.bw / 2, d2a(obj.start), d2a(obj.end), false); // 圆心x 圆心y 半径  开始弧度 结束弧度 是否逆时钟
                gd.lineWidth = obj.bw;// 描边大小  就是边框大小
                gd.strokeStyle = obj.lg;// 描边颜色
                gd.lineCap = obj.round;// 改变线条端点样式
                gd.stroke();// 描边
            },

            _init () {
                this._canvasInit();
            },
            enterFn () {
                this.tipShow = true;
            },
            leaveFn () {
                this.tipShow = false;
            },
            moveFn (ev) {
                let left = ev.clientX - getPos(this.gaugeWrap).left;
                let top = ev.clientY - getPos(this.gaugeWrap).top;

                this.left = left + 20;
                this.top = top + 10;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import './../../scss/common';
    @import './../../scss/mixins';
    @import './../../scss/variables';

    .gauge-wrap {
        position: relative;
        color: #666;
        font-size: 14px;

        .gauge-main {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 12px;
            color: #666;
            cursor: pointer;
        }

        // 刻度
        .gauge-scale {
            width: 1px;
            height: 4px;
            position: absolute;
            left: 50%;
            margin-left: 0.5px;
            background-color: rgba(255, 255, 255, 0.5);
        }

        .gauge-active {
            width: 2px;
            height: 4px;
            margin-left: -1px;
            background-color: #fff;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        // 指针
        .gauge-pointer {
            width: 40%;
            height: 4px;
            background: #7C7C7C;
            position: absolute;
            bottom: -1px;
            left: 0;
            transform: rotate(0deg);
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            transform-origin: right;
        }

        // 盖帽
        .gauge-cap {
            width: 8px;
            height: 8px;
            position: absolute;
            bottom: -3px;
            margin-left: -4px;
            left: 50%;
            margin-top: -4px;
            border-radius: 50%;
            /*background: radial-gradient(#fff, #000); !*中心小圆点   渐变*!*/
            z-index: 1;
            background-color: #808080;
            border: 1px solid #E1E1E1;
            box-sizing: border-box;
        }

        .gauge-name {
            padding-top: 5px;
        }

        /* 浮层 */
        .gauge-tooltip {
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px;
            display: none;
            white-space: nowrap;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 5px;
            color: #fff;
            z-index: 1001;
        }

        .gauge-show {
            display: block;
        }
    }


</style>
