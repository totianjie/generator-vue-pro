<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/7
* @remark: 修改知识库
-->
<template>
    <el-dialog
        :visible="modifyRepositoryShow"
        width="510px"
        @close="handlerClose"
    >
        <span class="dialog-title" slot="title">修改知识库</span>
        <section class="dialog-body">
            <v-input label="当前知识库名称： " :pxUnit="true" :labelWidth="lableWidth">某某知识库名称</v-input>
            <v-input class="m-t-10" label="修改为： " :pxUnit="true" :labelWidth="lableWidth">
                <div class="input-box">
                    <el-input v-model="input" placeholder="请输入内容" :maxlength="30" :size="formSize"></el-input>
                    <span class="input-number">{{input.length}}/30</span>
                </div>
            </v-input>
            <v-input class="m-t-10" label="修改原因： " :pxUnit="true" :labelWidth="lableWidth">
                <div class="input-box">
                    <el-input v-model="textarea" type="textarea" :maxlength="100" placeholder="请输入内容" :size="formSize"></el-input>
                    <span class="input-number">{{textarea.length}}/100</span>
                </div>
            </v-input>
            <div class="btns">
                <el-button @click="handlerSave" type="primary" class="m-l-10 pull-right" :size="btnSize">保存</el-button>
                <el-button @click="handlerClose" class="pull-right" :size="btnSize">取消</el-button>
            </div>
        </section>
    </el-dialog>
</template>

<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                lableWidth: 136,
                input: '',
                textarea: ''
            };
        },
        props: {
            modifyRepositoryShow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handlerClose () {
                this.input = '';
                this.textarea = '';
                this.$emit('update:modifyRepositoryShow', false);
            },
            handlerSave () {
                console.log('保存');
            }
        },
        watch: {}
    };
</script>

<style scoped lang="scss">
    .dialog-body {
        /*padding-right: 15px;*/
    }

    /deep/ .el-dialog__body {
        padding-top: 0;
    }

    .input-box {
        padding-right: 60px;
        position: relative;
        .input-number {
            width: 60px;;
            position: absolute;
            right: 0;
            top: 5px;
            text-indent: 10px;
            color: #999;
            text-align: left;
        }
    }

    .btns {
        padding: 10px 60px 38px 0;
    }
</style>
