<!-- Created by TIANJIE on 2018/6/8 -->
<template>
    <div>
        <div class="page p-t-40" @click="treeShow = false">
            <el-col :span="10" :offset="5">
                <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" :size="formSize">
                    <el-form-item label="用户名：" prop="userName">
                        <el-input placeholder="请输入用户名" v-model="addForm.userName" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input placeholder="请输入姓名" v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" prop="phone">
                        <el-input placeholder="请输入手机号吗" v-model="addForm.phone" maxlength='11'></el-input>
                    </el-form-item>
                    <el-form-item label="所属组织：" prop="pertainOrgs">
                        <el-input placeholder="请选择所选组织" v-model="orgName">
                        </el-input>
                        <div class="orgs-tree" @click.stop="handleSelectOrg">
                            <v-input-box class="tree box-shadow" v-if="treeShow">
                                <el-tree
                                    :data="orgData"
                                    empty-text="暂无数据..."
                                    :props="defaultProps"
                                    @node-click="handleNodeClick"
                                    accordion
                                    highlight-current
                                    :expand-on-click-node="false"
                                ></el-tree>
                            </v-input-box>
                        </div>
                    </el-form-item>
                    <el-form-item label="所属角色：" prop="pertainRoles">
                        <el-input v-show="!roleList.length&&orgName.length" disabled placeholder="暂无相关数据"></el-input>
                        <v-input-box v-show="roleList.length>0">
                            <el-checkbox-group v-model="roleResult">
                                <el-checkbox
                                    v-for="item in roleList"
                                    :label="item.id"
                                    :key="item.id"
                                    class="checkbox"
                                >
                                    <el-tooltip v-show="item.name.length>25" class="item" effect="dark" :content="item.name" placement="top-start">
                                        <span>{{item.name}}</span>
                                    </el-tooltip>
                                    <span v-show="item.name.length<=25" >{{item.name}}</span>
                                </el-checkbox>
                            </el-checkbox-group>
                        </v-input-box>
                        <el-input v-show="orgName.length==0" disabled placeholder="选择组织后才可选择角色"></el-input>
                    </el-form-item>
                    <el-form-item label="关联数据角色：" prop="pertainDataRoles">
                        <el-input v-show="!dataRoleList.length" disabled placeholder="暂无相关数据"></el-input>
                        <v-input-box  v-show="dataRoleList.length>0">
                            <el-checkbox-group v-model="dataRoleResult">
                                <el-checkbox
                                    v-for="item in dataRoleList"
                                    :label="item.id"
                                    :key="item.code"
                                    class="checkbox text-ellipsis"
                                >
                                    <el-tooltip v-show="item.name.length>25" class="item" effect="dark" :content="item.name" placement="top-start">
                                        <span>{{item.name}}</span>
                                    </el-tooltip>
                                    <span v-show="item.name.length<=25" >{{item.name}}</span>
                                </el-checkbox>
                            </el-checkbox-group>
                        </v-input-box>
                    </el-form-item>
                    <el-form-item v-if="isEdit" label="状态：" prop="status">
                        <el-radio-group v-model="addForm.status" class="radio-group">
                            <el-radio class="radio" label="1">启用</el-radio>
                            <el-radio class="radio" label="0">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" autosize v-model="addForm.remark" maxlength='200'></el-input>
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
    *   userName	是	string	用户名
        userType	是	string	用户类型
        name	否	string	姓名
        phone	是	int	手机号码
        initialPassword	是	string	初始化密码
        pertainOrgs	是	list	所属组织列表
        pertainRoles	是	list	所属角色列表
        pertainDataRoles	否	list	关联数据角色列表
    * */
    import CONFIG from 'src/config';
    import rules from './rules';
    import {checkUserNameOnly, queryOrganizationTree, getDataRoleList, getRoleGropLowerRoles, userInsert, getUserDetail, userUpdate} from 'js/api/authorityManage/user';
    import REG from 'js/utils/regex';

    export default {
        data () {
            const checkOnlyUserName = (rule, value, callback) => {
                if (this.isEdit) {
                    callback();
                    return;
                }
                if (typeof value !== 'string') {
                    return callback(new Error('请输入用户名'));
                }
                if (!value.length) {
                    callback(new Error("请输入用户名"));
                    return;
                }
                console.log("checkOnlyUserName");
                let re = REG.textAlphaNumber;
                let checkResult = re.test(value);
                if (!checkResult) {
                    return callback(new Error('您输入不正确(须英文和数字输入，2~20 位字符)，请重新输入。'));
                }
                if (value.length < 2 || value.length > 20) {
                    return callback(new Error('您输入不正确(须英文和数字输入，2~20 位字符)，请重新输入。'));
                }
                if (this.id === -1) {
                    this.id = '';
                }
                checkUserNameOnly({username: value}).then(res => {
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
                    if (err.data) {
                        callback(new Error(err.data.errorMsg));
                    } else {
                        callback(new Error(err.errorMsg));
                    }
                });
            };
            return {
                radio: '1',
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseFormSize,
                addForm: {
                    userName: '',
                    userType: '',
                    name: '',
                    phone: '',
                    initialPassword: '',
                    // pertainOrgs: {
                    //     id: '',
                    //     name: '',
                    //     code: ''
                    // },
                    pertainOrgs: '',
                    pertainRoles: [],
                    pertainDataRoles: [],
                    code: '',
                    remark: '',
                    status: 1
                },
                orgName: '',
                // 关联数据角色的结果
                dataRoleResult: [],
                // 所属角色结果
                roleResult: [],
                roleList: [
                ],
                dataRoleList: [
                ],
                orgData: [
                ],
                treeShow: false,
                defaultProps: {
                    children: 'childOrg',
                    label: 'name'
                },
                // 表单验证
                rules: Object.assign({}, rules, {
                    userName: [
                        { trigger: 'blur', validator: checkOnlyUserName, required: true }
                    ]
                })
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
            id: {
                type: Number,
                default () {
                    return '';
                }
            }
        },
        created () {
            this.status = '';
            if (this.isEdit) {
                this.$load.show();
                getUserDetail({id: this.id}).then(res => {
                    let {code, userName, userType = '', name, phone, initialPassword, pertainOrgs, pertainRoles = [], pertainDataRoles = [], status, remark} = res.data;
                    this.addForm = {
                        code,
                        userName,
                        userType,
                        name,
                        phone,
                        initialPassword,
                        pertainOrgs,
                        pertainRoles,
                        pertainDataRoles,
                        status,
                        remark
                    };
                    this.orgName = pertainOrgs.hasOwnProperty('name') && pertainOrgs.name;
                    Promise.all([getRoleGropLowerRoles({id: this.addForm.pertainOrgs.roleGroupId}), getDataRoleList()]).then(result => {
                        console.log("getRoleGropLowerRoles " + result);
                        this.roleList = result[0].data;
                        this.dataRoleList = result[1].data;
                        if (pertainRoles.length > 0) {
                            pertainRoles.forEach(roleItem => {
                                this.roleResult.push(roleItem.id);
                            });
                        }
                        if (pertainDataRoles.length > 0) {
                            pertainDataRoles.forEach(dataRoleItem => {
                                this.dataRoleResult.push(dataRoleItem.id);
                            });
                        }
                        this.$load.hide();

                    });
                });
            } else {
                // 关联数据角色接口
                getDataRoleList().then(res => {
                    this.dataRoleList = res.data;
                });
            }
            // 获取组织接口
            queryOrganizationTree().then(res => {
                this.orgData = res.data.childOrg;
                // this.orgData.push(res.data);
            });
        },
        methods: {
            // 提交保存
            handlerSubmit () {
                this.$refs.addForm.validate(value => {
                    console.log(value);
                    if (!value) return false;
                    if (this.isEdit) {
                        this.addForm.id = this.id;
                        userUpdate(this.addForm).then(res => {
                            this.$emit('input', false);
                            // 新增成功告诉父级更新
                            this.$emit('update');
                        });
                    } else {
                        userInsert(this.addForm).then(res => {
                            if (res.data) {
                                this.$toast(res.data.errorMsg);
                            } else {
                                this.$toast(res.errorMsg);
                            }
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
            handleNodeClick ({id, name, code, roleGroupId}) {
                this.treeShow = false;
                this.orgName = name;
                this.addForm.pertainOrgs = {id, name, code, roleGroupId};
                // 获取所属角色数据
                getRoleGropLowerRoles({id: roleGroupId}).then(res => {
                    this.roleList = res.data;
                    this.roleResult = [];
                });

            }
        },
        watch: {
            dataRoleResult (newDataRole) {
                if (newDataRole.length > 0) {
                    // 处理关联数据角色的数据
                    this.addForm.pertainDataRoles = [];
                    newDataRole.forEach((id) => {
                        let location = this.dataRoleList.findIndex(dataRoleItem => dataRoleItem.id === id);
                        if (location !== -1) {
                            let {id, code, name} = this.dataRoleList[location];
                            this.addForm.pertainDataRoles.push({id, name, code});
                        }
                    });
                } else {
                    this.addForm.pertainDataRoles = [];
                }
            },
            roleResult (newRole) {
                if (newRole.length > 0) {
                    // 所属角色
                    this.addForm.pertainRoles = [];
                    newRole.forEach((id) => {
                        let location = this.roleList.findIndex(roleItem => roleItem.id === id);
                        if (location !== -1) {
                            let {id, code, name } = this.roleList[location];
                            this.addForm.pertainRoles.push({id, code, name});
                        }
                    });
                } else {
                    this.addForm.pertainRoles = [];
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .p-t-40 {
        padding-top: 40px;
    }

    .el-checkbox + .el-checkbox.radio, .el-checkbox + .el-checkbox.checkbox, .el-checkbox.checkbox, .el-checkbox.radio {
        // width: 90px;
        margin-right: 10px;
        margin-bottom: 8px;
        box-sizing: border-box;
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
        z-index: 2000;
        background-color: #fff;
    }
    
    .radio-group {
        margin-top: 12px;
    }

    .radio {
        margin-right: 32px;
    }
</style>
