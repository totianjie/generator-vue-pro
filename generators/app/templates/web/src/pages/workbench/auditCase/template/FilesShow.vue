<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/7
* @remark: 修改知识库
-->
<template>
    <el-dialog
        :visible="fileShow"
        width="70%"
        @close="handlerClose"
    >
        <span class="dialog-title title" slot="title">文件:&nbsp;&nbsp;{{fileObj.oldName || fileObj.fileName}}</span>
        <section class="dialog-body" ref="bodyContentRef">
            <div v-html="htmlGet" class="html" ref="bodyContentRef2">
                {{htmlGet}}
            </div>
        </section>
    </el-dialog>
</template>

<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                htmlGet: '',
                maxHeight: 0,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                lableWidth: 136
            };
        },
        props: {
            fileShow: {
                type: Boolean,
                default: false
            },
            fileObj: {
                type: Object,
                default: {}
            },
            htmlGet: {
                type: String,
                default: ''
            }
        },
        created () {
    
        },
        mounted () {
            
        },
        methods: {
            handlerClose () {
                this.input = '';
                this.textarea = '';
                this.$load.hide();
                this.$emit('update:fileShow', false);
            }

        },
        watch: {
            fileShow (show_) {
                if (show_) {
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .title {
        margin-left: 20px;
        position: relative;
        // &::after {
        //     content: '';
        //     width: 4px;
        //     height: 14px;
        //     background: #4579c5;
        //     position: absolute;
        //     left: -11px;
        //     top: 1px;
        // }
    }

    .dialog-body {
        width: 100%;
        height: calc(100% - 60px);
        /*padding-right: 15px;*/
    }
    .html{
        width: 100%;
        height: 100%;
    }

    /deep/ .el-dialog__body {
        padding-top: 0;
    }
    /deep/ .s-news-img{
        margin:  0 auto;
        display: block;
        max-width: 90%;
        max-height: 90%;
    }
</style>
