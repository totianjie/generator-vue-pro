<template>
    <div
        class="el-steps"
        :class="[
       !simple && 'el-steps--' + direction,
       simple && 'el-steps--simple'
     ]">
        <slot></slot>
    </div>
</template>

<script>
    import Migrating from './migrating';

    export default {
        name: 'VSteps',

        mixins: [Migrating],

        props: {
            space: [Number, String],
            active: Number,
            direction: {
                type: String,
                default: 'horizontal'
            },
            alignCenter: Boolean,
            simple: Boolean,
            finishStatus: {
                type: String,
                default: 'success'
            },
            processStatus: {
                type: String,
                default: 'process'
            }
        },

        data () {
            return {
                steps: [],
                stepOffset: 0
            };
        },

        methods: {
            getMigratingConfig () {
                return {
                    props: {
                        'center': 'center is removed.'
                    }
                };
            }
        },

        watch: {
            active (newVal, oldVal) {
                this.$emit('change', newVal, oldVal);
            },

            steps (steps) {
                steps.forEach((child, index) => {
                    child.index = index;
                });
            }
        }
    };
</script>
<style scoped>
    .el-steps {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }

    .el-steps--simple {
        padding: 13px 8%;
        border-radius: 4px;
        background: #f5f7fa
    }

    .el-steps--horizontal {
        white-space: nowrap
    }

    .el-steps--vertical {
        height: 100%;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column;
        flex-flow: column
    }

</style>
