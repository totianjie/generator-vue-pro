<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div class="add-role-group-wrap role-height" @click="treeShow = false">
        <el-col :span="15" >
            <el-form ref="addRoleGroupForm" :model="addRoleGroupForm" :rules="rules" label-width="110px">
                <el-form-item label="角色组名称：" prop="name">
                    <el-input v-model="addRoleGroupForm.name" placeholder="请输入角色组名称"></el-input>
                </el-form-item>
                <el-form-item label="角色组授权：" prop="menus" style="position:relative;">
                    <el-tree
                        v-model="addRoleGroupForm.menus"
                        ref="tree"
                        empty-text="暂无数据..."
                        :expand-on-click-node="false"
                        :data="roleGroupTree"
                        :props="defaultProps"
                        @check="addRoleGroupHandleClick"
                        node-key="id"
                        show-checkbox
                        class="dataTree">
                    </el-tree>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input
                        :rows="3"
                        type="textarea"
                        autosize
                        v-model="addRoleGroupForm.remark"
                        maxlength="200"
                        placeholder="在此添加备注">
                    </el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="cancelBtn(addRoleGroupForm)">取消</el-button>
                    <el-button type="primary" @click="submitBtn">确定</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>
<script>
    import { checkRoleGroupOnly, addRoleGroup, getEditRoleGroup, getRoleMenuAll, getRoleGroupDetail, getRoleGropMenus} from "js/api/authorityManage/role";
    import rules from './grouprolerules.js';
    export default {
        data () {
            const checkSelect = (rule, value, callback) => {
                let selctArr = this.getCheckedArr();
                if (selctArr.length <= 0) {
                    return callback(new Error('请选择角色组授权'));
                } else {
                    return callback();
                }
            };
            const checkName = (rule, value, callback) => {
                try {
                    console.log(value);
                    if (typeof value !== 'string') {
                        return callback(new Error('请输入角色组名称'));
                    }
                    if (!value.length) {
                        return callback(new Error('请输入角色组名称'));
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
                    checkRoleGroupOnly({name: value, id: this.id}).then(res => {
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
                keepData: {},
                otherInfos: [],
                selectRole: false,
                defaultProps: { // 所属角色对象的选项的配置参数
                    children: 'children',
                    label: 'name'
                },
                bSing: false,
                treeShow: false,
                addRoleGroupForm: {
                    id: '', // 角色组主键
                    name: '', // 角色组名称
                    menus: [], // 角色组菜单
                    code: '', // 角色组代码
                    remark: '', // 备注
                    enable: '', // 是否启用
                    name_: '', // 角色名称
                    roleGroupId: '', // 提交的角色组ID
                    parentId: '' // eslint-disable-line
                },
                roleGroupTree: [],
                rules: Object.assign({}, rules, {
                    menus: [
                        { trigger: 'change', validator: checkSelect, required: true }
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
            isEdit: {
                type: Boolean,
                default () {
                    return false;
                }
            }
        },
        mounted () {

        },
        created () {
            this._getData();
        },
        methods: {
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
            addRoleGroupHandleClick (opeation, data) {
                this.addRoleGroupForm.menus = data.checkedNodes;
            },
            _getData () {
                getRoleMenuAll().then((res) => {
                    this.roleGroupTree = res.data;
                    if (this.id) {
                        this._roleGroupDetail(this.id);
                    }
                }).catch((err) => {
                    console.error('失败', err);
                });
            },
            _roleGroupDetail (id) {
                if (id === -1) {
                    return;
                }
                getRoleGroupDetail({id}).then((res) => {
                    this.addRoleGroupForm = res.data;// 给模型赋值在页面渲染显示
                    this.keepData = JSON.parse(JSON.stringify(res.data));
                    this.addRoleGroupForm.menus = [];
                    // 获取角色组勾选中的菜单
                    getRoleGropMenus({id}).then(res => {
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
                        this.$refs.tree.setCheckedNodes(this.otherInfos.filter(item => {
                            return item.mark === "2";
                        }));
                    }).catch(err => {
                        console.error(err);
                    });
                }).catch((err) => {
                    console.error('详细信息', err);
                });
            },
            cancelBtn (data) {
                // 角色组
                console.log(data);
                this.$emit('input', false);
                this.$emit("update", {id: data.id, isRoleGroup: true, cancel: true}); // 取消取data.id
            },
            submitBtn () {
                this.selectRole = true;
                this.$refs.addRoleGroupForm.validate(value => {
                    if (!value) {
                        return false;
                    }
                    let selctArr = this.getCheckedArr() || [];
                    if (selctArr.length <= 0) return false;
                    this.addRoleGroupForm.menus = this.getCheckedArr();

                    if (this.isEdit) {
                        getEditRoleGroup(this.addRoleGroupForm).then(res => {
                            this.$emit('input', false);
                            // 后台有返回id = res.data，但在当前编辑就用之前保存的id: this.id
                            if (this.keepData.name !== this.addRoleGroupForm.name) {
                                this.$emit("update", {id: this.id, isRoleGroup: true, groupId: this.id});
                                this.$emit("updateGroupName", {id: this.id, newGroupName: this.addRoleGroupForm.name, oldGroupName: this.keepData.name});
                            } else {
                                this.$emit("update", {id: this.id, isRoleGroup: true, groupId: this.id});
                            }
                        });
                    } else {
                        addRoleGroup(this.addRoleGroupForm).then((res) => {
                            this.$emit('input', false);
                            // 从后台拿到当前新增角色组的id = res.data传给父组件
                            this.$emit("update", {id: res.data, isRoleGroup: true, groupId: res.data});
                        }).catch((err) => {
                            console.error('err====', err);
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
    .role-height{
        height: 100%;
    }
</style>
