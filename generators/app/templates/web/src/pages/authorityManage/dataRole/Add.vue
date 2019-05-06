<!-- Created by TIANJIE on 2018/6/8 -->
<template>
    <div>
        <div class="page p-t-40" @click="treeShow = false">
            <el-col :span="10" :offset="5">
                <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" :size="formSize">
                    <el-form-item label="数据角色名称：" prop="dataRoleName">
                        <el-input placeholder="请输入数据角色名称" v-model="addForm.dataRoleName"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组织：" prop="orgName">
                            <el-input
                                placeholder="请选择所属组织"
                                v-model="addForm.orgName"
                                >
                            </el-input>
                            <div class="orgs-tree" @click.stop="handleSelectOrg">
                                <v-input-box class="tree box-shadow" v-if="treeShow">
                                    <el-tree class="orgTree"
                                        :data="orgGroup" empty-text="暂无数据"
                                        :props="defaultDateProps"
                                        @node-click="insertOrgHandleClick"
                                        accordion
                                        highlight-current
                                        node-key="id"
                                        :expand-on-click-node="false"
                                    ></el-tree>
                                </v-input-box>
                            </div>
                    </el-form-item>
                    <el-form-item label="数据角色权限：" prop="warrantOrgs" style="position:relative;">
                        <el-tree
                            v-model="addForm.warrantOrgs"
                            empty-text="暂无数据"
                            ref="tree"
                            :expand-on-click-node="false"
                            :data="dataRoleGroup"
                            :props="defaultDateProps"
                            @check="insertRoleHandleClick"
                            node-key="id"
                            show-checkbox
                            default-expand-all
                            class="dataTree">
                        </el-tree>
                        <div class="el-form-item__error" v-show="!addForm.warrantOrgs.length&&selectRole">请选择数据角色授权</div>
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
    * */
    import CONFIG from 'src/config';
    import rules from './rules';
    import {updateData, orgTreeData, insertData, queryData} from "js/api/authorityManage/dataRole";
    export default {
        data () {
            const checkSelect = (rule, value, callback) => {
                let selctArr = this.getCheckedArr();
                if (selctArr.length <= 0) {
                    return callback(new Error('请选择数据角色权限'));
                } else {
                    return callback();
                }
            };
            return {
                selectRole: false,
                radio: '1',
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseFormSize,
                addForm: {
                    warrantOrgs: [ // 数据角色授权
                        // {
                        //     code: '',
                        //     id: 0,
                        //     mark: '',
                        //     name: '',
                        //     parentId: 0
                        // }
                    ],
                    dataRoleName: '',
                    id: -1,
                    orgId: 0,
                    orgName: '',
                    status: ''
                },
                orgGroup: [], // 新增所属组织
                dataRoleGroup: [ // 新增数据角色授权
                    
                ],
                isShowSelect: false, // 是否显示所属对象的树状选择器
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
                treeShow: false, // 是否展开组织机构
                defaultProps: {
                    children: 'childOrg',
                    label: 'name'
                },
                // 表单验证
                rules: Object.assign({}, rules, {
                    warrantOrgs: [
                        { trigger: 'change', validator: checkSelect, required: true }
                    ]
                }),
                defaultOrgProps: { // 所属角色对象的选项的配置参数
                    children: 'childOrg',
                    label: 'name'
                },
                defaultDateProps: {
                    children: 'childOrg',
                    label: 'name'
                },
                orgTreeOption: [ // 修改所属组织
          
                ]
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
            orgTreeData({'id': ''}).then(res => {
                this.orgGroup = [];
                this.dataRoleGroup = [];
                this.orgGroup = res.data.childOrg;
                // this.dataRoleGroup = res.data.childOrg;
                // this.orgGroup.push(res.data);
                this.dataRoleGroup.push(res.data);
            });
            if (this.isEdit) {
                queryData({'id': this.id}).then(res => {
                    this.type = 'update';
                    this.addForm = {
                        dataRoleName: res.data.dataRoleName || '', // 数据角色名称
                        orgId: res.data.orgId || '', // 所属组织id
                        orgName: res.data.orgName || '', // 所属组织名称
                        id: res.data.id || 0,
                        warrantOrgs: res.data.warrantOrgs || [{}],
                        status: res.data.status
                    };
                    // 复选框勾选中
                    this.getOrgTreeData().then(() => {
                        this.$refs.tree.setCheckedNodes(res.data.warrantOrgs.filter(item => {
                            return item.mark === "2";
                        }));
                    });
                    this.orgTreeOption = res.data.warrantOrgs;
                }).catch(err => {
                    console.log('修改失败', err);
                    let ss = err;
                    if (ss.statusCode === 400 || ss.statusCode === "400") {
                        this.$emit('input', false);
                    }
                });
            }
        },
        methods: {
            getOrgTreeData () {
                return orgTreeData({'id': ''}).then(res => {
                    this.orgGroup = [];
                    this.dataRoleGroup = [];
                    this.orgGroup = res.data.childOrg;
                    // this.dataRoleGroup = res.data.childOrg;
                    // this.orgGroup.push(res.data);
                    this.dataRoleGroup.push(res.data);
                    return Promise.resolve();
                }).catch(err => {
                    console.log('组织数据', err);
                });
            },
            handlerSubmit () {
                this.selectRole = true;
                this.$refs.addForm.validate(value => {
                    if (!value) return false;
                    let selctArr = this.getCheckedArr();
                    if (selctArr.length <= 0) return false;
                    this.addForm.warrantOrgs = this.getCheckedArr();
                    if (this.isEdit) {
                        this.addForm.id = this.id;
                        updateData(this.addForm).then(res => {
                            this.$emit('input', false);
                            // 新增成功告诉父级更新
                            this.$emit('update');
                        });
                    } else {
                        // delete this.addForm.id;
                        insertData(this.addForm).then(res => {
                            this.$emit('input', false);
                            // 新增成功告诉父级更新
                            this.$emit('update');
                        });
                    }
                });
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
            handlerCancel () {
                this.$emit('input', false);
            },
            handleSelectOrg () {
                this.treeShow = true;
            },
            // 组织树节点  点击
            handleNodeClick (data) {
                let id = data.id;
                let name = data.name;
                let code = data.code;
                let parentId = data.parentId;
                this.treeShow = false;
                this.orgName = name;
                this.addForm.pertainOrgs = {id, name, code, parentId};
                this.selectRole = true;
            },
            updateOrgHandleClick (data) {
                this.updateForm.orgName = data.name;
                // 关闭选择器
                this.treeShow = false;
            },
            // 修改数据角色授权的复选框选中事件
            updateRoleHandleClick (data) {
                this.addForm.warrantOrgs = data.name;
                // 关闭选择器
                this.treeShow = false;
            },
            // 新增所属组织复选框选中事件
            insertOrgHandleClick (data) {
                this.addForm.orgName = data.name;
                this.addForm.orgId = data.id;
                // 关闭选择器
                this.treeShow = false;
            },
            // 新增数据角色授权的复选框选中事件
            insertRoleHandleClick (data) {
                // this.insertForm.warrantOrgs.id = data.id;
                this.addForm.warrantOrgs = data.name;
                // 关闭选择器
                this.treeShow = false;
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
                    this.addForm.pertainDataRoles = '';
                }
            },
            roleResult (newRole) {

                if (newRole.length > 0) {
                    // 所属角色
                    this.addForm.pertainRoles = [];
                    newRole.forEach((id) => {
                        let location = this.roleList.findIndex(roleItem => roleItem.id === id);
                        if (location !== -1) {
                            let {id, code, name} = this.roleList[location];
                            this.addForm.pertainRoles.push({id, code, name});
                        }
                    });
                } else {
                    this.addForm.pertainRoles = '';
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
        width: 90px;
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
        padding:10px;
        box-sizing:border-box;
        z-index: 100;

    }

    .dataTree{
        padding: 8px 0;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #fff;
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

    .statusBtn{
        line-height: 40px;
    }

</style>
