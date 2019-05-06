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
        <p class="dialog-title title" slot="title">源库名称:&nbsp;&nbsp;{{tableLookData.dbName}}</p>
        <p></p>
        <p class="dialog-title title" v-if="tableType===2" slot="title">源库名称:&nbsp;&nbsp;{{tableLookData.table}}</p>
        <p class="dialog-title title" v-if="tableType===1" slot="title">sql语句:&nbsp;&nbsp;{{tableLookData.sql}}</p>
        <section class="dialog-body">
            <el-table 
                    ref="selectListTableView" 
                    class="select-list-table-view" 
                    :border="true" 
                    :header-cell-style="{backgroundColor:'#F6FAFF'}"  
                    :size="tableSize" 
                    :data="tableLookData.data"
                    :highlight-current-row="true" 
                    @row-click="handleRowClick" 
                    width="100%"
                    :height="tableHeightPage"
                    @cell-mouse-enter="cellMouseEnter"
                    @cell-mouse-leave="cellMouseLeave"
                >
                    <el-table-column v-for="(item, index) in tableLookData.column" :key="index" :label="item" show-overflow-tooltip :prop="item" :min-width="60">
                    </el-table-column>
            </el-table>
        </section>
    </el-dialog>
</template>

<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                htmlGet: '',
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                lableWidth: 136
            };
        },
        props: {
            tableType: {
                type: Number,
                default () {
                    return 0;
                }
            },
            fileShow: {
                type: Boolean,
                default: false
            },
            tableLookData: {
                type: Object,
                default: {}
            }
        },
        created () {
         
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
