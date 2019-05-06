<template>
    <div
        class="el-step"
        :style="style"
        :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center'
    ]">
        <!-- icon & line -->
        <div
            class="el-step__head"
            :class="`is-${currentStatus}`">
            <div
                class="el-step__line"
                :style="isLast ? '' : { marginRight: $parent.stepOffset + 'px' }"
            >
                <i class="el-step__line-inner" :style="lineStyle"></i>
            </div>
            <div>
                <div class="el-step__icon fl" :class="`is-${icon ? 'icon' : 'text'}`">
                    <slot
                        v-if="currentStatus !== 'success' && currentStatus !== 'error'"
                        name="icon">
                        <i v-if="icon" class="el-step__icon-inner" :class="[icon]"></i>
                        <div class="el-step__icon-inner" v-if="!icon && !isSimple">{{ index + 1 }}</div>
                    </slot>
                    <i
                        v-else
                        :class="['el-icon-' + (currentStatus === 'success' ? 'check' : 'close')]"
                        class="el-step__icon-inner is-status"
                    >
                    </i>
                </div>
                <!-- title & description -->
                <div class="el-step__main fl">
                    <div
                        class="el-step__title"
                        ref="title"
                        :class="['is-' + currentStatus]">
                        <slot name="title">{{ title }}</slot>
                    </div>
                    <div v-if="isSimple" class="el-step__arrow"></div>
                    <div
                        v-else
                        class="el-step__description"
                        :class="['is-' + currentStatus]">
                        <slot name="description">{{ description }}</slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VStep',

        props: {
            title: String,
            icon: String,
            description: String,
            status: String
        },

        data () {
            return {
                index: -1,
                lineStyle: {},
                internalStatus: ''
            };
        },

        beforeCreate () {
            this.$parent.steps.push(this);
        },

        beforeDestroy () {
            const steps = this.$parent.steps;
            const index = steps.indexOf(this);
            if (index >= 0) {
                steps.splice(index, 1);
            }
        },

        computed: {
            currentStatus () {
                return this.status || this.internalStatus;
            },
            prevStatus () {
                const prevStep = this.$parent.steps[this.index - 1];
                return prevStep ? prevStep.currentStatus : 'wait';
            },
            isCenter () {
                return this.$parent.alignCenter;
            },
            isVertical () {
                return this.$parent.direction === 'vertical';
            },
            isSimple () {
                return this.$parent.simple;
            },
            isLast () {
                const parent = this.$parent;
                return parent.steps[parent.steps.length - 1] === this;
            },
            stepsCount () {
                return this.$parent.steps.length;
            },
            space () {
                const {isSimple, $parent: {space}} = this;
                return isSimple ? '' : space;
            },
            style: function () {
                const style = {};
                const parent = this.$parent;
                const len = parent.steps.length;

                const space = (typeof this.space === 'number'
                    ? this.space + 'px'
                    : this.space
                        ? this.space
                        : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
                style.flexBasis = space;
                if (this.isVertical) return style;
                if (this.isLast) {
                    style.maxWidth = 100 / this.stepsCount + '%';
                } else {
                    style.marginRight = -this.$parent.stepOffset + 'px';
                }

                return style;
            }
        },

        methods: {
            updateStatus (val) {
                const prevChild = this.$parent.$children[this.index - 1];

                if (val > this.index) {
                    this.internalStatus = this.$parent.finishStatus;
                } else if (val === this.index && this.prevStatus !== 'error') {
                    this.internalStatus = this.$parent.processStatus;
                } else {
                    this.internalStatus = 'wait';
                }

                if (prevChild) prevChild.calcProgress(this.internalStatus);
            },

            calcProgress (status) {
                let step = 100;
                const style = {};

                style.transitionDelay = 150 * this.index + 'ms';
                if (status === this.$parent.processStatus) {
                    step = this.currentStatus !== 'error' ? 0 : 0;
                } else if (status === 'wait') {
                    step = 0;
                    style.transitionDelay = (-150 * this.index) + 'ms';
                }

                style.borderWidth = step ? '1px' : 0;
                this.$parent.direction === 'vertical'
                    ? style.height = step + '%'
                    : style.width = step + '%';

                this.lineStyle = style;
            }
        },

        mounted () {
            const unwatch = this.$watch('index', val => {
                this.$watch('$parent.active', this.updateStatus, {immediate: true});
                unwatch();
            });
        }
    };
</script>
<style scoped>
    .el-step {
        position: relative;
        -ms-flex-negative: 1;
        flex-shrink: 1
    }

    .el-step:last-of-type .el-step__line {
        display: none
    }

    .el-step:last-of-type.is-flex {
        -ms-flex-preferred-size: auto !important;
        flex-basis: auto !important;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-box-flex: 0;
        -ms-flex-positive: 0;
        flex-grow: 0
    }

    .el-step:last-of-type .el-step__description, .el-step:last-of-type .el-step__main {
        padding-right: 0
    }

    .el-step__head {
        position: relative;
        width: 100%
    }

    .el-step__head.is-process {
        color: #303133;
        border-color: #303133
    }

    .el-step__head.is-wait {
        color: #c0c4cc;
        border-color: #c0c4cc
    }

    .el-step__head.is-success {
        color: #4579C5;
        border-color: #4579C5
    }

    .el-step__head.is-error {
        color: #f56c6c;
        border-color: #f56c6c
    }

    .el-step__head.is-finish {
        color: #409EFF;
        border-color: #409EFF
    }

    .el-step__icon {
        position: relative;
        z-index: 1;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 24px;
        height: 24px;
        font-size: 14px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        -webkit-transition: .15s ease-out;
        transition: .15s ease-out
    }

    .el-step__icon.is-text {
        border-radius: 50%;
        border: 2px solid;
        border-color: inherit
    }

    .el-step__icon.is-icon {
        width: 40px
    }

    .el-step__icon-inner {
        display: inline-block;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        font-weight: 700;
        line-height: 1;
        color: inherit
    }

    .el-step__icon-inner[class*=el-icon]:not(.is-status) {
        font-size: 25px;
        font-weight: 400
    }

    .el-step__icon-inner.is-status {
        -webkit-transform: translateY(1px);
        transform: translateY(1px)
    }

    .el-step__line {
        position: absolute;
        border-color: inherit;
        background-color: #c0c4cc
    }

    .el-step__line-inner {
        display: block;
        border-width: 1px;
        border-style: solid;
        border-color: inherit;
        -webkit-transition: .15s ease-out;
        transition: .15s ease-out;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 0;
        height: 0
    }

    .el-step__main {
        white-space: normal;
        text-align: left;
        padding: 0 12px;
        position: relative;
        z-index: 5;
        background: #fff;
    }

    .el-step__title {
        font-size: 16px;
        line-height: 26px
    }

    .el-step__title.is-process {
        font-weight: 700;
        color: #303133
    }

    .el-step__title.is-wait {
        color: #c0c4cc
    }

    .el-step__title.is-success {
        color: #4579C5
    }

    .el-step__title.is-error {
        color: #f56c6c
    }

    .el-step__title.is-finish {
        color: #409EFF
    }

    .el-step__description {
        padding-right: 10%;
        margin-top: -5px;
        font-size: 12px;
        line-height: 20px;
        font-weight: 400
    }

    .el-step__description.is-process {
        color: #303133
    }

    .el-step__description.is-wait {
        color: #c0c4cc
    }

    .el-step__description.is-success {
        color: #67c23a
    }

    .el-step__description.is-error {
        color: #f56c6c
    }

    .el-step__description.is-finish {
        color: #409EFF
    }

    .el-step.is-horizontal {
        display: inline-block
    }

    .el-step.is-horizontal .el-step__line {
        height: 2px;
        top: 11px;
        left: 0;
        right: 12px;
    }

    .el-step.is-vertical {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }

    .el-step.is-vertical .el-step__head {
        -webkit-box-flex: 0;
        -ms-flex-positive: 0;
        flex-grow: 0;
        width: 24px
    }

    .el-step.is-vertical .el-step__main {
        padding-left: 10px;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1
    }

    .el-step.is-vertical .el-step__title {
        line-height: 24px;
        padding-bottom: 8px
    }

    .el-step.is-vertical .el-step__line {
        width: 2px;
        top: 0;
        bottom: 0;
        left: 11px
    }

    .el-step.is-vertical .el-step__icon.is-icon {
        width: 24px
    }

    .el-step.is-center .el-step__head, .el-step.is-center .el-step__main {
        text-align: center
    }

    .el-step.is-center .el-step__description {
        padding-left: 20%;
        padding-right: 20%
    }

    .el-step.is-center .el-step__line {
        left: 50%;
        right: -50%
    }

    .el-step.is-simple {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }

    .el-step.is-simple .el-step__head {
        width: auto;
        font-size: 0;
        padding-right: 10px
    }

    .el-step.is-simple .el-step__icon {
        background: 0 0;
        width: 16px;
        height: 16px;
        font-size: 12px
    }

    .el-step.is-simple .el-step__icon-inner[class*=el-icon]:not(.is-status) {
        font-size: 18px
    }

    .el-step.is-simple .el-step__icon-inner.is-status {
        -webkit-transform: scale(.8) translateY(1px);
        transform: scale(.8) translateY(1px)
    }

    .el-step.is-simple .el-step__main {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1
    }

    .el-step.is-simple .el-step__title {
        font-size: 16px;
        line-height: 20px
    }

    .el-step.is-simple:not(:last-of-type) .el-step__title {
        max-width: 50%;
        word-break: break-all
    }

    .el-step.is-simple .el-step__arrow {
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center
    }

    .el-step.is-simple .el-step__arrow::after, .el-step.is-simple .el-step__arrow::before {
        content: '';
        display: inline-block;
        position: absolute;
        height: 15px;
        width: 1px;
        background: #c0c4cc
    }

    .el-step.is-simple .el-step__arrow::before {
        -webkit-transform: rotate(-45deg) translateY(-4px);
        transform: rotate(-45deg) translateY(-4px);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0
    }

    .el-step.is-simple .el-step__arrow::after {
        -webkit-transform: rotate(45deg) translateY(4px);
        transform: rotate(45deg) translateY(4px);
        -webkit-transform-origin: 100% 100%;
        transform-origin: 100% 100%
    }

    .el-step.is-simple:last-of-type .el-step__arrow {
        display: none
    }

    .fl {
        float: left;
    }
</style>
