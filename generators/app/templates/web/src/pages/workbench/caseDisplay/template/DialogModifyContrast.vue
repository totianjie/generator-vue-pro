<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/7
* @remark: 修改对照
-->
<template>
    <el-dialog
        :visible="modifyContrastShow"
        width="70%"
        @close="handlerClose"
        class="dialog-wrap"
    >
        <span class="dialog-title" slot="title">修改对照</span>
        <section class="dialog-body">
            <el-table
                :data="tableData"
                style="width: 100%"
                height="400px"
                row-key="id"
                border
                class="contrast-table"
                :expand-row-keys="expandArr"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div class="edit-wrap">
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
                                <el-button @click="handlerCancel" class="pull-right" :size="btnSize">取消</el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="code1"
                    label="当前名称"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="code2"
                    show-overflow-tooltip
                    label="对照名称"
                >
                </el-table-column>
                <el-table-column
                    prop="code3"
                    show-overflow-tooltip
                    label="对照编码"
                >
                </el-table-column>
                <el-table-column
                    label="对照版本信息"
                    min-width="95"
                    prop="code4"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="code5"
                    show-overflow-tooltip
                    label="最近修改名称"
                    min-width="95"
                >
                </el-table-column>
                <el-table-column
                    prop="code6"
                    show-overflow-tooltip
                    label="最近修改者"
                    min-width="95"
                >
                </el-table-column>
                <el-table-column
                    prop="code7"
                    show-overflow-tooltip
                    label="最近修改时间"
                    min-width="95"
                >
                </el-table-column>
                <el-table-column
                    prop="code8"
                    show-overflow-tooltip
                    label="状态"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="50">
                    <template slot-scope="scope">
                        <el-button @click="handlerEditClick(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <v-paging
                class="paging"
                :total="total"
                ref="paging"
                @pagingChange="handlePagingChange"
            ></v-paging>
            <div class="placeholder-temp">占位</div>
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
                textarea: '',
                total: 200,
                expandArr: [],
                tableData: [
                ]
            };
        },
        props: {
            modifyContrastShow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            // 关闭层
            handlerClose () {
                this.input = '';
                this.textarea = '';
                this.$emit('update:modifyContrastShow', false);
            },
            // 编辑
            handlerEditClick (row) {
                this.expandArr = [];
                this.expandArr.push(row.id);
            },
            // 取消
            handlerCancel () {
                this.expandArr.pop();
            },
            // 保存
            handlerSave () {
                // 保存成功后
                this.expandArr.pop();
            },
            // 分页
            handlePagingChange () {

            }
        },
        watch: {}
    };
</script>

<style scoped lang="scss">
    .dialog-body {
        position: relative;
        overflow: hidden;
        .placeholder-temp {
            width: 24px;
            height: 400px;
            position: absolute;
            left: 0;
            top: 0;
            background: #fff;
            text-indent: -9999px;
        }
    }

    .dialog-body .contrast-table {
        transform: translateX(-24px);
        & /deep/ .el-table__expand-column .cell {
            width: 0;
            padding: 0;
            overflow: hidden;
        }
        & /deep/ .el-table__expanded-cell {
            padding: 0;
        }
        .edit-wrap {
            /*background: #ccc;*/
            position: relative;
            &:after {
                height: 120%;
                width: 1px;
                background: #DAEFFF;
                content: '';
                position: absolute;
                left: 47px;
                top: -14px;
            }
        }
    }

    .dialog-body .paging {
        height: 48px;
    }

    /deep/ .el-dialog__body {
        padding: 0;
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
