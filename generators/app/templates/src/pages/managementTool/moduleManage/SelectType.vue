<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/7
* @remark: 修改知识库
-->
<template>
    <el-dialog
        :visible="selectTypeShow"
        width="400px"
        :modal-append-to-body="false"
        @close="handlerClose"
        class="dialog-wrap"
    >
        <span class="dialog-title title" slot="title">类型选择</span>
        <section class="dialog-body">
           <div class="v-input clearfix" style="line-height: 32px; ">
                <span class="block left pull-left text-right" 
                      style="width: 80px; padding-right:10px;line-height: 32px;">
                      类型1： 
                </span> 
                <div class="pull-left" 
                     style="width: calc(100% - 120px);">    
                    <el-button @click="handlerSave(1)" :disabled="templetType === 3"  :class="['m-l-10 w-110',{'select':tableType === 1},{'disable': templetType === 3}]" :size="btnSize">SQL语句</el-button>
                    <el-button @click="handlerSave(2)" :class="['m-l-10 w-110 pull-right',{'select':tableType === 2}]" :size="btnSize">源表</el-button>
                </div>
            </div>
            <div class="wrong-notice" v-if="tableType===-1" style="font-size:10px;line-height=12px;">请选择类型1的类型</div>
            <div class="wrong-notice" v-if="tableType!==-1" style="font-size:10px;line-height=12px;">&nbsp;&nbsp;&nbsp;</div>
            <div class="v-input clearfix" style="padding-bottom:16px;line-height: 32px; ">
                <span class="block left pull-left text-right" 
                      style="width: 80px; padding-right:10px;line-height: 32px;">
                      类型2：  
                </span> 
                <div class="pull-left" 
                     style="width: calc(100% - 120px);">
                    <el-button @click="handlerSave(5)" :disabled="tableType === 1" :class="['m-l-10 w-110',{'select':templetType === 3},{'disable': tableType === 1}]" :size="btnSize">临床路径选择</el-button>
                    <el-button @click="handlerSave(4)" :class="['m-l-10 w-110 pull-right',{'select':templetType === 2}]" :size="btnSize">增量</el-button>
                 </div>
            </div>
            <div class="v-input clearfix" style="line-height: 32px; ">
                <span class="block left pull-left text-right" 
                      style="width: 80px; padding-right:10px;line-height: 32px;">
                      &nbsp;&nbsp;&nbsp;
                </span> 
                <div class="pull-left" 
                     style="width: calc(100% - 120px);">
                    <el-button @click="handlerSave(3)" :class="['m-l-10 w-110',{'select':templetType === 1}]" :size="btnSize">全量-替换</el-button>
                    <el-button @click="handlerSave(6)" :class="['m-l-10 w-110 pull-right',{'select':templetType === 4}]" :size="btnSize">全量-新增</el-button>
                 </div>
            </div>
            <div class="wrong-notice" v-if="templetType===-1" style="font-size:10px;line-height=12px;">请选择类型2的类型</div>
            <div class="wrong-notice" v-if="templetType!==-1" style="font-size:10px;line-height=12px;">&nbsp;&nbsp;&nbsp;</div>
            <div class="v-input clearfix" style="padding-bottom:16px;line-height: 16px; ">
                <span class="block left pull-left text-right" 
                      style="width: 80px; padding-right:10px;line-height: 32px;">
                      &nbsp;&nbsp;&nbsp;
                </span> 
                <div class="pull-left" 
                     style="width: calc(100% - 120px);">
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
                auditPath: '', // 审核节点
                auditUser: '', // 审核人
                auditTime: '', // 审核时间
                auditInfo: '', // 审核信息
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                lableWidth: 136,
                tableType: 2,
                templetType: 3
            };
        },
        props: {
            selectTypeShow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handlerSave (num) {
                if (num === 0) {
                    if (this.tableType > 0 && this.templetType > 0) {
                        this.$emit('updateType', this.tableType, this.templetType);
                    } else {
                        if (this.tableType <= 0) {
                            this.tableType = -1;
                        }
                        if (this.templetType <= 0) {
                            this.templetType = -1;
                        }
                    }
                    return;
                }
                if (num === 1 || num === 2) {
                    this.tableType = num;
                }
                if (num === 3 || num === 4 || num === 5 || num === 6) {
                    this.templetType = num - 2;
                }
            },
            handlerClose () {
                this.input = '';
                this.textarea = '';
                this.$emit('update:selectTypeShow', false);
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
        padding: 5px 5px 5px 5px;
    }
    .btns {
        padding: 10px 60px 38px 0;
    }
    .select{
        color: #4579C5;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
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
    .w-110{
        width:110px;
    }


</style>
