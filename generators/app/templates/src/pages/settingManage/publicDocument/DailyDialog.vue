<!--
* @Author: GOTINTIN
* @Date: 2019-1-22
* @remark: 日志弹出框
-->
<template>
    <el-dialog
        :visible.sync="value"
        @close="handleClose"
        width="404px"
        class="daily-dialog">
        <span class="dialog-title" slot="title">{{dialogTitle}}</span>
        <span class="dialog-content" >{{dialogContent}}</span>
    </el-dialog>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
            };
        },
        props: {
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            dialogContent: {
                type: String,
                default: ''
            },
            dialogTitle: {
                type: String,
                default: ''
            }
        },
        methods: {
            // 关闭
            handleClose () {
                this.$emit('input', false);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .daily-dialog{
        /deep/ .el-dialog__body {
            padding-top: 10px;
        }
        .dialog-content{
            display: block;
            height: 79px;
            max-height: 79px;
            overflow: auto;
        }
        .dialog-title {
            padding-left: 11px;
            font-size: 18px;
            color: #333333;
            border-left: 4px solid #4579C5;
        }
    }
</style>
