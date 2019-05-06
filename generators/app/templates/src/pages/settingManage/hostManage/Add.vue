<!--
* @Author: GOTINTIN
* @Date: 2019-1-22
* @remark: 跑批主机新增
-->
<template>
    <div class="host-add">
        <div class="page p-d-31">
            <el-col :span="12" :offset="6">
                <el-form ref="addForm" :model="addForm" :rules="rules" :size="formSize" label-width="160px">
                    <el-form-item label="跑批主机名称：" prop="clientName" >
                        <el-input v-model="addForm.clientName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="跑批主机服务地址：" prop="clientHost" >
                        <el-input v-model="addForm.clientHost" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="最大线程数：" prop="threadNum" >
                        <el-input v-model="addForm.threadNum" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :size="btnSize" @click="handleCancel">取消</el-button>
                        <el-button :size="btnSize" @click="handleSubmit" type="primary">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import rules from './rules';
    import {hostAdd, hostEdit, hostEditView} from 'js/api/settingManage/hostManage/hostManage';
    export default {
        data () {
            return {
                rules: rules, // 表单验证
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseFormSize,
                addForm: { // 表单请求参数
                    clientName: '', // 主机名称
                    clientHost: '', // 主机服务地址
                    threadNum: '', // 最大线程数
                    rbsClientId: '' // 只用于编辑，新增时不用传给后台
                }
            };
        },
        props: {
            value: {
                type: String,
                default () {
                    return 'add';
                }
            },
            isAdd: {
                type: Boolean,
                default () {
                    return true;
                }
            },
            rbsClientId: {
                type: String,
                default () {
                    return '';
                }
            }
        },
        mounted () {
            console.log('isAdd', this.isAdd);
            console.log('rbsClientId', this.rbsClientId);
            if (!this.isAdd) {
                hostEditView({'rbsClientId': this.rbsClientId}).then(res => {
                    this.addForm = {
                        clientName: res.data.clientName,
                        clientHost: res.data.clientHost,
                        threadNum: res.data.threadNum,
                        rbsClientId: res.data.rbsClientId
                    };
                });
            }
        },
        methods: {
            // 取消
            handleCancel () {
                console.log('取消');
                this._back();
            },
            // 新增和编辑确定按钮
            handleSubmit () {
                console.log('确认');
                this.$refs.addForm.validate(value => {
                    console.log(value);
                    if (!value) {
                        this.$toast('填写信息不正确，请修正后再点确定');
                        return false;
                    }
                    // 新增
                    if (this.isAdd) {
                        hostAdd(this.addForm).then(res => {
                            this.$emit('input', 'list'); // 手动触发事件input，将value的值改为新增页面add
                            this.$emit('update:isAdd', true); // isAdd为true，是新增
                        });
                    } else {
                        this.addForm.rbsClientId = this.rbsClientId;
                        hostEdit(this.addForm).then(res => {
                            this.$emit('input', 'list'); // 手动触发事件input，将value的值改为新增页面add
                            this.$emit('update:isAdd', false); // isAdd为true，是新增
                        });
                    }
                });
            },
            // 返回
            _back () {
                this.$emit('input', 'list');
            }
        }
    };
</script>
<style lang="scss" scoped>
    .host-add{
        .p-d-31{
            padding-top: 31px;
        }
    }
</style>
