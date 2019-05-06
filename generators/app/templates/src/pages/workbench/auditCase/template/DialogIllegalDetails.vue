<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/7
* @remark: 违规详情
-->
<template>
    <el-dialog
        :visible="illegalDetailsShow"
        width="394px"
        @close="handlerClose"
    >
        <span class="dialog-title" slot="title">违规详情</span>
        <el-table
            class="dialog-body"
            :data="detail.detailVoList"
            stripe
            :header-cell-style="headerCellStyle"
            style="width: 100%">
            <el-table-column
                prop="projectName"
                :label="detail.ruleName"
            >
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                headerCellStyle: {
                    color: '#4579C5',
                    padding: '3px 0',
                    backgroundColor: '#F9FDFF'
                }
            };
        },
        props: {
            illegalDetailsShow: {
                type: Boolean,
                default: false
            },
            detail: {
                type: Object,
                default: {

                }
            }
        },
        methods: {
            handlerClose () {
                this.$emit('update:illegalDetailsShow', false);
            }
        }
    };
</script>

<style scoped lang="scss">
    .dialog-body {
        max-height: 250px;
        overflow: auto;
    }

    /deep/ .el-dialog__body {
        padding-top: 0;
    }
</style>
