<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/10
* @remark: 查询框
-->
<template>
    <section class="wrap">
        <i class="el-icon-search icon"></i>
        <input
            class="input"
            type="text"
            v-model.trim="value"
            placeholder="请输入关键字"
            @input="handleInput"
            @keyup.enter="handlerSearch()">
    </section>
</template>

<script>
    export default {
        data () {
            return {
                input: ''
            };
        },
        props: {
            value: {
                type: [String, Number],
                default: ''
            }
        },
        methods: {
            handleInput () {
                this.$emit('input', this.value);
            },
            handlerSearch () {
                this.$emit('input', this.value);
                this.$emit('search', {value: this.value});
            }
        }
    };
</script>

<style scoped lang="scss">
    .wrap {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        position: relative;
        height: 24px;
        /*background: rgba(246, 250, 255, 1);*/
        border: 1px solid #E4E7EE;
        border-radius: 12px;
        overflow: hidden;
        color: #4579C5;
        .icon {
            position: absolute;
            left: 6px;
            top: 2px;
            padding-top: 2px;
        }
        .input {
            /*border: none;*/
            width: 100%;
            height: 23px;
            padding: 0;
            border: none;
            outline: none;
            font-size: 12px;
            text-indent: 5px;
            &::-webkit-input-placeholder {
                /* placeholder颜色  */
                color: #aab2bd;
                /* placeholder字体大小  */
                font-size: 12px;
                /* placeholder位置  */
                /*text-align: right;*/
            }
        }
    }
</style>
