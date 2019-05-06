<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/7
* @remark: 修改知识库
-->
<template>
    <el-dialog
        :visible="sqlInputShow"
        width="410px"
        :modal-append-to-body="false"
        @close="handlerClose"
        class="dialog-wrap"
    >
        <span class="dialog-title title" slot="title">编写SQL</span>
        <section class="dialog-body">
            <div class="v-input clearfix h-180">
                <el-input v-model="sql" type="textarea" placeholder="请输入SQL" class="sql-input-view" :size="formSize"></el-input>
            </div>
            <div class="wrong-notice f-10_h-12" v-if="showWarning">请填写SQL语句</div>
            <div class="wrong-notice f-10_h-12" v-if="!showWarning">&nbsp;&nbsp;&nbsp;</div>
            <div class="v-input clearfix p-b-16_h-16">
                <span class="block left pull-left text-right w-80_l-32_p-r-10">
                      &nbsp;&nbsp;&nbsp;
                </span> 
                <div class="pull-left w-set">
                    <el-button @click="handlerSave(0)" type="primary" class="m-l-10 pull-right" :size="btnSize">确定</el-button>
                    <el-button @click="handlerClose" class="pull-right" :size="btnSize">取消</el-button>
                </div>
            </div>
        </section>
    </el-dialog>
</template>

<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                showWarning: false,
                sql: '', // SQL
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                lableWidth: 136
            };
        },
        props: {
            sqlInputShow: {
                type: Boolean,
                default: false
            },
            sql: {
                type: String,
                default: ''
            }
        },
        methods: {
            handlerSave () {
                if (this.sql.length === 0) {
                    this.showWarning = true;
                    return;
                }
                this.$emit('update:sql', this.sql);
                this.$emit('update:sqlInputShow', false);
                this.$emit('updateSql', this.sql);
            },
            handlerClose () {
                this.input = '';
                this.textarea = '';
                this.$emit('update:sqlInputShow', false);
            }
        },
        watch: {}
    };
</script>

<style scoped lang="scss">
    .title {
        margin-left: 20px;
        padding-left: 11px;
        font-size: 18px;
        color: #333333;
        border-left: 4px solid #4579C5;
        position: relative;
    }
    /deep/ .el-dialog__body {
        padding: 5px 0 5px 0;
    }

    .sql-input-view{
        margin-left:35px;
        margin-right:35px;
        width: 340px;
        // height: 105px;
        // line-height:105px;
    }

    /deep/ .el-textarea__inner{
        height: 105px;
        // padding-top:1px;
        // padding-bottom:1px;
        // padding-left:4px;
        // padding-right:4px;
    }

    .wrong-notice {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        position: relative;
        left: 28px;
        padding-top:4px;
        padding-bottom:4px;
    }
    .h-180{
        line-height: 108px;
    }
    .f-10_h-12 {
        font-size: 10px;
        line-height: 12px;
    }
    .p-b-16_h-16{
        padding-bottom:16px;
        line-height: 16px;
    }
    .w-set {
        width: calc(100% - 120px);
    }
    .w-80_l-32_p-r-10 {
        width: 80px; 
        padding-right:10px;
        line-height: 32px;
    }
</style>
