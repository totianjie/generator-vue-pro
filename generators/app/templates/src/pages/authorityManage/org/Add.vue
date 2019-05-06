<!-- Created by TIANJIE on 2018/6/15 -->
<template>
    <div>
        <div class="page p-t-40" @click="treeShow = false">
            <el-col :span="10" :offset="5">
                <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" :size="formSize">
                    <el-form-item label="组织名称：" prop="name">
                        <el-input placeholder="请输入组织名称" v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="组织编码：" prop="code">
                        <el-input placeholder="请输入组织编码" v-model="addForm.code" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="所属角色组：" prop="roleGroupCode">
                        <el-select v-model="addForm.roleGroupCode" placeholder="请选择角色组" class="w-fill">
                            <el-option
                                v-for="item in roleGroupData"
                                :key="item.id"
                                :value="item.code"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属组织：" prop="parentId" v-show="orgData.length">
                        <el-input placeholder="请选择组织" v-model="orgName">
                        </el-input>
                        <div class="orgs-tree" @click.stop="handleSelectOrg">
                            <v-input-box class="tree box-shadow" v-if="treeShow">
                                <el-tree
                                    :data="orgData"
                                    :props="defaultProps"
                                    @node-click="handleNodeClick"
                                    accordion
                                    highlight-current
                                    :expand-on-click-node="false"
                                ></el-tree>
                            </v-input-box>
                        </div>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input v-model="addForm.remark" type="textarea" autosize placeholder="在此添加备注" maxlength='200'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :size="btnSize" @click="handlerCancel">取&nbsp;消</el-button>
                        <el-button :size="btnSize" @click="handlerSubmit" type="primary">确&nbsp;定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
    </div>
</template>
<script>
    /*
orgName;//组织名称
code //组织编码
pertainRoleName;//所属角色组
pertainOrgName;//所属组织
createUser;//创建人
createDate;//创建时间
parentId;//所属组织id
remark
*/
    import CONFIG from 'src/config';
    import rules from './rules';
    import {checkOrgOnlyCode, queryOrganizationTree, orgInsert, orgUpdate, getOrgDetail, getRoleGroupAll} from 'js/api/authorityManage/org';

    export default {
        data () {
            let checkOnlyCode = (rule, value, callback) => {
                try {
                    if (typeof value !== 'string') {
                        return callback(new Error('请输入组织编码'));
                    }
                    if (value.length === 0) {
                        return callback(new Error('请输入组织编码'));
                    }
                    let re = /^[a-zA-Z0-9_#-]+$/;
                    let checkResult = re.test(value);
                    let checkResult2 = (value.length < 2 || value.length > 20);
                    if (!checkResult) {
                        return callback(new Error('您输入不正确(须英文、 数字、符号(--、_、#)输入，2~20 位字符)'));
                    }
                    if (checkResult2) {
                        return callback(new Error('您输入不正确(须英文、 数字、符号(--、_、#)输入，2~20 位字符)'));
                    }
                } catch (e) {
                    console.log(e.reason + e.name);
                }
                checkOrgOnlyCode({ code: value, id: this.orgId }).then(res => {
                    if (res.data) {
                        if (res.data.errorMsg !== '请求成功') {
                            callback(new Error(res.data.errorMsg));
                            return;
                        }
                    } else {
                        if (res.errorMsg !== '请求成功') {
                            callback(new Error(res.errorMsg));
                            return;
                        }
                    }
                    callback();
                }).catch(err => {
                    console.log('修改失败', err);
                    callback(new Error(err.errorMsg));
                });
            };
            return {
                formSize: CONFIG.baseFormSize,
                btnSize: CONFIG.baseBtn,
                addForm: {
                    name: '',
                    code: '',
                    parentId: '',
                    roleGroupCode: '',
                    remark: ''
                },
                orgName: '',
                orgData: [
                ],
                treeShow: false,
                defaultProps: {
                    children: 'childOrg',
                    label: 'name',
                    disabled: 'disabled'
                },
                // 表单验证
                rules: Object.assign({}, rules, {
                    code: [
                        { trigger: 'blur', validator: checkOnlyCode, required: true }
                    ]
                }),
                // 角色组数据
                roleGroupData: []
            };
        },
        props: {
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            isEdit: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            orgId: {
                type: Number,
                default () {
                    return '';
                }
            }
        },
        created () {
            if (this.isEdit) {
                getOrgDetail({id: this.orgId}).then(res => {
                    let {orgName, code, orgCode, parentId, remark, pertainOrgName} = res.data;
                    this.orgName = pertainOrgName;
                    this.addForm = {
                        name: orgName,
                        code,
                        roleGroupCode: orgCode,
                        parentId,
                        remark
                    };
                });
            }
            // 获取组织接口
            queryOrganizationTree().then(res => {
                /*
                res.data.forEach(element => {
                    if (element.id === this.orgId) {
                        element.disabled = true;
                    }
                    let tempArr = element.childOrg || [];
                    tempArr.forEach(element2 => {
                        if (element2.id === this.orgId) {
                            element2.disabled = true;
                        }
                        let tempArr2 = element2.childOrg || [];
                        tempArr2.forEach(element3 => {
                            if (element3.id === this.orgId) {
                                element3.disabled = true;
                            }
                        });
                    });
                });
                */
                this.orgData.push(res.data);
            });
            getRoleGroupAll().then(res => {
                this.roleGroupData = res.data;
            });
        },
        methods: {
            checkInfo () {
                this.$refs.addForm.validate(value => {
                    if (!value) {
                        return false;
                    }
                });
            },
            // 提交保存
            handlerSubmit () {
                this.$refs.addForm.validate(value => {
                    if (!value) {
                        return false;
                    }
                    if (this.isEdit) {
                        this.addForm.id = this.orgId;
                        orgUpdate(this.addForm).then(res => {
                            this.$emit('input', false);
                            // 新增成功告诉父级更新
                            this.$emit('update');
                        });
                    } else {
                        orgInsert(this.addForm).then(res => {
                            this.$emit('input', false);
                            // 新增成功告诉父级更新
                            this.$emit('update');
                        });
                    }

                });
            },
            handlerCancel () {
                this.$emit('input', false);
            },
            handleSelectOrg () {
                this.treeShow = true;
            },
            // 组织树节点  点击
            handleNodeClick ({id, name, code, parentId}) {
                if (id === this.orgId) {
                    this.$toast('你所选择所属组织不能是当前组织');
                    return;
                }
                this.treeShow = false;
                this.orgName = name;
                this.addForm.parentId = id;
            }
        }
    };
</script>

<style scoped lang="scss">
    .p-t-40 {
        padding-top: 40px;
    }
    .orgs-tree {
        width: 100%;
        position: absolute;
        top: 8px;
        bottom: 0;
        left: 0;
        cursor: pointer;

    }

    .tree {
        width: 100%;
        position: absolute;
        left: 0;
        top: 35px;
        padding-bottom: 12px;
        z-index: 998;
        background-color: #fff;
    }
    .statusBtn{
        line-height: 40px;
    }
</style>
