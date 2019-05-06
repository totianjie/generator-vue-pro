<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/7
* @remark: 修改知识库
-->
<template>
    <el-dialog
        :visible="suggestInfoShow"
        width="510px"
        @close="handlerClose"
        class="dialog-wrap"
    >
        <span class="dialog-title title" slot="title">审核意见</span>
        <section class="dialog-body">
           <div class="v-input clearfix" style="padding-bottom:16px;line-height: 16px; ">
                <span class="block left pull-left text-right" 
                      style="width: 110px; padding-right:10px;">
                      审核节点： 
                </span> 
                <div class="pull-left" 
                style="width: calc(100% - 120px);">                
                {{detail.nodeName}}
                </div>
            </div>
            <div class="v-input clearfix" style="padding-bottom:16px;line-height: 16px; ">
                <span class="block left pull-left text-right" 
                      style="width: 110px; padding-right:10px;">
                      &nbsp;提交人：  
                </span> 
                <div class="pull-left" 
                style="width: calc(100% - 120px);">                
                {{(detail.createby || '').length? detail.createby:'暂无相关信息'}}
                </div>
            </div>
            <div class="v-input clearfix" style="padding-bottom:16px;line-height: 16px; ">
                <span class="block left pull-left text-right" 
                      style="width: 110px; padding-right:10px;">
                      &nbsp;提交时间：  
                </span> 
                <div class="pull-left" 
                style="width: calc(100% - 120px);">                
                {{detail.createTime | formatTime}}
                </div>
            </div>
            <div class="v-input clearfix" style="padding-bottom:16px;line-height: 16px; ">
                <span class="block left pull-left text-right" 
                      style="width: 110px;padding-right:10px;"
                >
                审核意见： 
                </span> 
                <div class="pull-left" 
                     style="width: calc(100% - 150px);word-break: break-all;padding-right:10px;"
                >
                {{detail.mark}}
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
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                lableWidth: 136
            };
        },
        props: {
            suggestInfoShow: {
                type: Boolean,
                default: false
            },
            detail: {
                type: Object,
                default: {}
            }
        },
        methods: {
            handlerClose () {
                this.input = '';
                this.textarea = '';
                this.$emit('update:suggestInfoShow', false);
            }
        },
        watch: {},
        filters: {
            formatTime (time_) {
                let date = new Date(time_);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                let second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
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
    /deep/ .el-dialog__body {
        padding: 5px 0 5px 0;
    }
</style>
