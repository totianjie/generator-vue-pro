<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div class="add-role-group-wrap role-height" @click="treeShow = false">
        <el-col :span="15" >
            <el-form ref="addRoleForm" :model="addRoleForm" :rules="rules" label-width="110px">
                <el-form-item label="角色名称：" prop="name">
                    <el-input v-model="addRoleForm.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="所属角色组：" prop="roleGroupId">
                    <el-select v-model="item.id" placeholder="请选择角色组" class="w-fill" disabled="true" @change="changeGroupRole($event, item)">
                        <el-option
                            v-for="item in tableData"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色授权：" prop="menus" style="position:relative;">
                    <el-tree v-model="addRoleForm.menus"
                             ref="tree"
                             empty-text="暂无数据..."
                             :expand-on-click-node="false"
                             :data="roleTree"
                             :props="defaultProps"
                             @check="addRoleHandleClick"
                             node-key="id"
                             show-checkbox
                             class="dataTree">
                    </el-tree>
                    <div class="el-form-item__error" v-show="addRoleForm.menus.length&&selectRole">请选择角色授权</div>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input
                        :rows="3"
                        type="textarea"
                        autosize=""
                        v-model="addRoleForm.remark"
                        placeholder="在此添加备注" maxlength="200">
                    </el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="cancelBtn(addRoleForm)">取消</el-button>
                    <el-button type="primary" @click="submitBtn">确定</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>
<script>
    import { checkRoleOnly, getEditRole, getRoleDetail, getRoleMenus, getRoleGropMenus, getAddRole } from "js/api/authorityManage/role";
    import rules from './rolerules.js';
    export default {

        data () {
            const checkSelect = (rule, value, callback) => {
                let selctArr = this.getCheckedArr();
                if (selctArr.length <= 0) {
                    return callback(new Error('请选择角色授权'));
                } else {
                    return callback();
                }
            };
            const checkRoleGroupId = (rule, value, callback) => {
                return callback();
            };
            const checkName = (rule, value, callback) => {
                try {
                    if (typeof value !== 'string') {
                        return callback(new Error('请输入角色名称'));
                    }
                    if (!value.length) {
                        return callback(new Error('请输入角色名称'));
                    }
                    let re = /^[\u4e00-\u9fa5]+$/;
                    let checkResult = re.test(value);
                    let checkResult2 = (value.length < 2 || value.length > 20);
                    if (!checkResult) {
                        return callback(new Error('您输入不正确(须中文输入，2~20位字符)'));
                    }
                    if (checkResult2) {
                        return callback(new Error('您输入不正确(须中文输入，2~20位字符)'));
                    }
                    checkRoleOnly({name: value, id: this.id, groupId: this.groupId}).then(res => {
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
                        console.error('修改失败', err);
                        if (err.data) {
                            callback(new Error(err.data.errorMsg));
                        } else {
                            callback(new Error(err.errorMsg));
                        }
                    });
                } catch (e) {
                    console.error(e.reason + e.name);
                    return callback(new Error('您输入不正确(须中文输入，2~20位字符)'));
                }
            };
            return {
                otherInfos: [],
                selectRole: false,
                defaultProps: { // 所属角色对象的选项的配置参数
                    children: 'children',
                    label: 'name'
                },
                bSing: false,
                treeShow: false,
                isSelectGroupRole: false,
                addRoleForm: {
                    id: '', // 角色组主键
                    name: '', // 角色组名称
                    menus: [], // 角色组菜单
                    code: '', // 角色组代码
                    remark: '', // 备注
                    enable: '', // 是否启用
                    name_: '', // 角色名称
                    roleGroupId: '', // 提交的角色组ID
                    parentId: '', // eslint-disable-line
                    roleGroupCode: '',
                    roleGroupName: ''
                },
                item: {
                    id: '',
                    name: '',
                    code: ''
                },
                roleGroupMenus: [],
                roleTree: [],
                rules: Object.assign({}, rules, {
                    menus: [
                        { trigger: 'change', validator: checkSelect, required: true }
                    ],
                    roleGroupId: [
                        { trigger: 'change', required: true, validator: checkRoleGroupId}
                    ],
                    name: [
                        { required: true, trigger: 'blur', validator: checkName }
                    ]
                })
            };
        },
        computed: {

        },
        props: {
            id: {
                type: Number,
                default () {
                    return -1;
                }
            },
            groupId: {
                type: Number,
                default () {
                    return -1;
                }
            },
            roleGroupDetail: {
                type: Object,
                default () {
                    return {};
                }
            },
            isEdit: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        mounted () {

        },
        created () {
            this._getData();
        },
        watch: {
            id (newId, oldId) {
                this._getData();
            },
            roleGroupDetail (val) {
                this.item.id = this.roleGroupDetail.roleGroupId;
                this.item.code = this.roleGroupDetail.roleGroupCode;
                this.item.name = this.roleGroupDetail.roleGroupName;
            }
        },
        methods: {
            addRoleHandleClick (data, data2) {
                this.addRoleForm.menus = data2.checkedNodes;
            },
            _getGroupData (currentId) {
                this.addRoleForm.id = this.id;
                getRoleGropMenus({id: currentId}).then(res => {
                    this.roleGroupMenus = res.data;
                    this.roleTree = res.data;
                    if (this.isEdit) {
                        getRoleMenus({id: this.addRoleForm.id}).then(res => {
                            this.otherInfos = res.data;
                            console.log("getRoleMenus" + JSON.stringify(res.data));
                            this.otherInfos.forEach((item) => {
                                if (item.hasOwnProperty('children')) {
                                    this.otherInfos = [...this.otherInfos, ...item.children];
                                    item.children = [];
                                }
                            });
                            this.otherInfos.forEach((item) => {
                                if (item.hasOwnProperty('children')) {
                                    this.otherInfos = [...this.otherInfos, ...item.children];
                                    item.children = [];
                                }
                            });
                            this.otherInfos.forEach((item) => {
                                if (item.hasOwnProperty('children')) {
                                    this.otherInfos = [...this.otherInfos, ...item.children];
                                    item.children = [];
                                }
                            });
                            // this.otherInfos = this.otherInfos.filter(item => {
                            //     return item.mark === "2";
                            // });
                            this.$refs.tree.setCheckedNodes(this.otherInfos.filter(item => {
                                return item.mark === "2";
                            }));
                        }).catch(err => {
                            console.error(err);
                        });
                    }
                }).catch(err => {
                    console.error(err);
                });
            },
            changeGroupRole (roleGroupId) {
                // 打印出绑定的对象
                try {
                    this.addRoleForm.roleGroupId = roleGroupId;
                    this.tableData.forEach(element => {
                        console.log(element);
                        if (element.id === roleGroupId) {
                            this.addRoleForm.roleGroupName = element.name;
                            this.addRoleForm.roleGroupCode = element.code;
                        }
                    });
                    this.isSelectGroupRole = true;
                    this._getGroupData(roleGroupId);
                } catch (e) {
                    console.error("error" + e.name + e.reason);
                }
            },
            getCheckedArr () {
                // 目前被选中的节点所组成数组(选中节点和父节点)
                let checkdArr = this.$refs.tree.getCheckedNodes();
                checkdArr.forEach((item) => {
                    item.mark = "2"; // 2代表选中,后台返回前端的状态
                });
                // 目前半选中的节点所组成的数组
                let halfCheckdArr = this.$refs.tree.getHalfCheckedNodes();
                halfCheckdArr.forEach((item) => {
                    item.mark = "1";// 1代表展开,后台不需要返回给前端的状态
                });
                // 选中与半选中节点的拼接
                let newCheckArr = checkdArr.concat(halfCheckdArr);
                return newCheckArr;
            },
            _getData () {
                if (this.id === -1) {
                    if (this.roleGroupDetail) {
                        let roleObj = JSON.parse(JSON.stringify(this.roleGroupDetail));
                        this.addRoleForm.roleGroupName = roleObj.roleGroupName;
                        this.addRoleForm.roleGroupId = roleObj.roleGroupId;
                        this.item.id = roleObj.roleGroupId;
                        this.item.name = roleObj.roleGroupName;
                        this.item.code = roleObj.roleGroupCode;
                        this.addRoleForm.menus = [];
                    }
                    return;
                }
                getRoleDetail({id: this.id}).then(res => {
                    this.addRoleForm = res.data;
                    this.addRoleForm.menus = [];
                    if (this.roleGroupDetail) {
                        let roleObj = JSON.parse(JSON.stringify(this.roleGroupDetail));
                        this.addRoleForm.roleGroupName = roleObj.roleGroupName;
                        this.addRoleForm.roleGroupId = roleObj.roleGroupId;
                        this.item.id = roleObj.roleGroupId;
                        this.item.name = roleObj.roleGroupName;
                        this.item.code = roleObj.roleGroupCode;
                    }
                }).catch(err => {
                    console.error(err);
                });
                this._getGroupData(this.groupId);
                if (this.isEdit) {
                    getRoleMenus({id: this.id}).then(res => {
                        this.otherInfos = res.data;
                        this.otherInfos.forEach((item) => {
                            if (item.hasOwnProperty('children')) {
                                this.otherInfos = [...this.otherInfos, ...item.children];
                                item.children = [];
                            }
                        });
                        this.otherInfos.forEach((item) => {
                            if (item.hasOwnProperty('children')) {
                                this.otherInfos = [...this.otherInfos, ...item.children];
                                item.children = [];
                            }
                        });
                        this.otherInfos.forEach((item) => {
                            if (item.hasOwnProperty('children')) {
                                this.otherInfos = [...this.otherInfos, ...item.children];
                                item.children = [];
                            }
                        });
                        this.otherInfos = this.otherInfos.filter(item => {
                            return item.mark === "2";
                        });
                        this.$refs.tree.setCheckedNodes(this.otherInfos.filter(item => {
                            return item.mark === "2";
                        }));
                    }).catch(err => {
                        console.error(err);
                    });
                }
            },
            cancelBtn (data) {
                // 角色组
                this.$emit('input', false);
                console.log(data);
                this.$emit("update", {id: data.id, isRoleGroup: false, cancel: true, groupId: this.addRoleForm.roleGroupId}); // 取消取data.id
            },
            submitBtn () {
                this.selectRole = true;
                this.$refs.addRoleForm.validate(value => {
                    if (!value) {
                        return false;
                    }
                    let selctArr = this.getCheckedArr();
                    if (selctArr.length <= 0) return false;
                    this.addRoleForm.menus = this.getCheckedArr();
                    if (this.isEdit) {
                        getEditRole(this.addRoleForm).then(res => {
                            this.$emit('input', false);
                            console.log(this.addRoleForm, this.roleGroupDetail);
                            // 后台有返回id = res.data，但在当前编辑就用之前保存的id: this.id
                            if (this.addRoleForm.name !== this.roleGroupDetail.roleName) {
                                let roleOldName = this.roleGroupDetail.roleName;
                                this.$emit("update", {id: this.id, roleId: this.id, isRoleGroup: false, groupId: this.roleGroupDetail.roleGroupId});
                                this.$emit("updateRoleName", {
                                    id: this.id,
                                    roleOldName: roleOldName,
                                    roleNewName: this.addRoleForm.name,
                                    roleGroupId: this.roleGroupDetail.roleGroupId,
                                    roleRemark: this.addRoleForm.remark || '',
                                    roleGroupName: this.roleGroupDetail.roleGroupName
                                });
                            } else {
                                this.$emit("update", {id: this.id, roleId: this.id, isRoleGroup: false, groupId: this.roleGroupDetail.roleGroupId});
                            }
                        }).catch(err => {
                            console.error('编辑角色', err);
                        });
                    } else {
                        // 验证判断角色授权未勾选时返回空数组length，则为false
                        getAddRole(this.addRoleForm).then(res => {
                            this.$emit('input', false);
                            // 从后台拿到当前新增角色组的id = res.data传给父组件
                            this.$emit("update", {id: res.data, roleId: res.data, isRoleGroup: false, groupId: this.roleGroupDetail.roleGroupId});
                        }).catch(err => {
                            console.error('新建角色', err);
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .add-role-group-wrap{
        padding-top: 40px;
    }
    .dataTree{
        max-height:200px;
        padding: 8px 0;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #fff;
        overflow: auto;
    }
    .result{
        padding-top: 10px;
    }
    .role-height{
        height: 100%;
    }
</style>
