<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div>
        <role-table ref="tableView" 
                    :tableData="tableData"
                    @createRole="createRole"
                    @createRoleGroup="createRoleGroup"
                    @editRole="editRole"
                    @editRoleGroup="editRoleGroup"
                    @delRole="delRole"
                    @delRoleGroup="delRoleGroup"
                    @detailRole="detailRole"
                    @detailRoleGroup="detailRoleGroup"
                    class="role-table">
        </role-table>
        <add-role-group :id="currentRoleGroupId"
                        v-if="isRoleGroup&&(isAdd||isEdit)"
                        :isEdit="isEdit"
                        @update="initRoleGroupData"
                        class="add-role-group" 
                        @updateGroupName="updateGroupName">
        </add-role-group>
        <add-role :id="currentRoleId"
                  :groupId="currentRoleGroupId"
                  :isEdit="isEdit"
                  @update="initRoleGroupData"
                  @updateRoleName="updateRoleName"
                  v-if="!isRoleGroup&&(isAdd||isEdit)"
                  :roleGroupDetail="roleGroupDetail"
                  :tableData="tableData"
                  class="add-role">
        </add-role>
        <detail-role-group class="detail-role-group"
                           :id="currentRoleGroupId"
                           v-if="isRoleGroup&&isDetail">
        </detail-role-group>
        <detail-role class="detail-role" :id="currentRoleId"
                     :tableData="tableData"
                     v-if="!isRoleGroup&&isDetail">
        </detail-role>
    </div>
</template>
<script type="text/ecmascript-6">
    // import {searchNameOrUrl, searchBtnName} from 'js/utils/userlimit';/// 按钮权限实现
    import CONFIG from 'src/config';
    import RoleTable from './RoleTable';
    import AddRole from './components/AddRole';
    import AddRoleGroup from './components/AddRoleGroup';
    import DetailRole from './components/DetailRole';
    import DetailRoleGroup from './components/DetailRoleGroup';
    import { getRoleGroupList, getRoleGroupDetail, getRoleGropMenus } from "js/api/authorityManage/role";

    export default {
        props: {

        },
        data () {
            return {
                btnSize: CONFIG.homeBtn,
                isAdd: false, // 是否新增
                isRoleGroup: true, // 是否是角色组
                isEdit: false, // 是否编辑
                isDelete: false, // 是否删除
                isDetail: false, // 详情状态如否
                currentRoleId: -1, // 如果已经选择的切换时当前角色的 id
                currentRoleGroupId: -1, // 如果已经选择的切换时当前角色组的 id
                tableData: [],
                roleGroupId: '', // 提交的角色组ID
                initId: '', // 初始显示角色组详细信息ID
                roleGroupData: [], // 角色组的数据
                roleGroupDetail: {}, // 角色的详情数据
                addNewRoleWithGroupData: '',
                roleData: [] // 默认为第一角色组下边的数据
            };
        },
        computed: {

        },
        watch: {

        },
        created () {
        },
        mounted () {
            // 刷新角色组列表数据
            this.initRoleGroupData({isRoleGroup: true, isFirstLoad: true});
            // this.testAddRole();
        },
        methods: {
            // 测试删除角色后的显示
            testDeleteRole () {
                this.initRoleGroupData({isRoleGroup: true, groupId: 90, delete: true});
            },
            // 测试新增角色后的显示
            testAddRole () {
                this.initRoleGroupData({id: 91, isRoleGroup: false, groupId: 125, roleId: 91});
            },
            // 角色组列表
            initRoleGroupData (updateData) {
                if (updateData.cancel) {
                    if (updateData.id) {
                        if (updateData.isRoleGroup) {
                            this.currentRoleId = -1;
                            this.detailRoleGroup(updateData);
                        } else {
                            // 否则调用角色详情
                            // this.is
                            this.currentRoleGroupId = -1;
                            this.detailRole(updateData);
                        }
                        return;
                    } else {
                        if (updateData.isRoleGroup) {
                            this.currentRoleId = -1;
                            updateData.groupId = this.tableData[0].id;
                            let updateData_ = Object.assign({}, updateData, {id: updateData.groupId});
                            this.detailRoleGroup(updateData_);
                            this._roleGroupDetail(this.currentRoleGroupId);
                            this.$refs.tableView.updateSelect(this.currentRoleGroupId, null, true);
                        } else {
                            // 否则调用角色详情
                            // this.is
                            this.currentRoleId = -1;
                            let updateData_ = Object.assign({}, updateData, {id: updateData.groupId});
                            this.detailRoleGroup(updateData_);
                            this._roleGroupDetail(this.currentRoleGroupId);
                            this.$refs.tableView.updateSelect(this.currentRoleGroupId, null);
                        }
                        return;
                    }
                }
                console.log("initRoleGroupData", updateData);
                let isDelete = updateData.delete || false;
                console.log("是否是删除", isDelete ? "是删除" : "不是删除");
                if (this.isEdit && !isDelete) {
                    if (updateData.isRoleGroup) {
                        this.currentRoleGroupId = updateData.groupId;
                    } else {
                        this.currentRoleId = updateData.roleId;
                    }
                    this.isDetail = true;
                    this.isAdd = false;
                    this.isEdit = false;
                    this.isRoleGroup = updateData.isRoleGroup;
                    return;
                }
                this.isRoleGroup = updateData.isRoleGroup;
                console.log('aaaaaa', '');
                if (updateData.isRoleGroup && (updateData.groupId === null || updateData.groupId === undefined || updateData.groupId === '')) {
                    this.$refs.tableView.refreshTableView();
                }
                getRoleGroupList().then((res) => {
                    // updateData.id要新增或编辑的时候才执行，否则是没有值，默认进来是没有值的，就执行下去的if (!updateData.id)
                    if (this.isRoleGroup) {
                        this.currentRoleGroupId = updateData.groupId;
                    } else {
                        this.currentRoleId = updateData.roleId;
                        this.currentRoleGroupId = -1;
                    }
                    try {
                        this.roleGroupData = [];
                        this.tableData = [];
                        // 如果updateData.id传过来没值，默认初始化列表第一条数据显示右侧角色组的详细信息
                        if (!updateData.groupId) {
                            this.currentRoleGroupId = res.data[0].id;
                        }
                        res.data.forEach((item, index) => {
                            item.groupIndex_ = index;
                            item.isRoleGroup = true;
                            item.children = [];
                            this.roleGroupData.push(item);
                        });
                        this.tableData = this.roleGroupData;
                        if (res.data.length > 0) {
                            this.isDetail = true;
                            this.isAdd = false;
                            this.isEdit = false;
                            // 如果是角色组就调用角色组详情
                            if (this.isRoleGroup) {
                                this.currentRoleId = -1;
                                this._roleGroupDetail(this.currentRoleGroupId);
                                this.$refs.tableView.updateSelect(this.currentRoleGroupId, null, updateData.isFirstLoad);
                            } else {
                                // 否则调用角色详情
                                // this.is
                                try {
                                    this.$refs.tableView.updateSelect(updateData.groupId, updateData.roleId);
                                } catch (e) {
                                    console.error("catch-updateSelect>> " + e.name + e.reason);
                                }
                            }
                        }
                    } catch (e) {
                        console.error("catch->> " + e.name + e.reason);
                    }
                }).catch((err) => {
                    console.error('角色组列表失败', err);
                });
            },
            _roleGroupDetail (id) {
                try {
                    if (id === -1) {
                        try {
                            throw new Error("异常数据--index");
                        } catch (error) {
                            console.error(error);
                        }
                        return;
                    }
                    getRoleGroupDetail({id}).then((res) => {
                        this.currentRoleGroupId = res.data.id;
                        this.isDetail = true;
                        this.isAdd = false;
                        this.isEdit = false;
                        this.isRoleGroup = true;
                        this.roleGroupId = res.data.id;
                        this.roleGroupDetail = res.data;// 给模型赋值在页面渲染显示
                        // 获取角色组勾选中的菜单
                        getRoleGropMenus({id}).then(res => {
                            this.roleGroupTree = res.data;
                        }).catch(err => {
                            console.error('catch->' + err);
                        });
                    }).catch((err) => {
                        console.error('详细信息', err);
                    });
                } catch (e) {
                    console.error('角色组列表失败', e.name + e.reason);
                }
            },
            createRoleGroup (data) {
                this.isAdd = true;
                this.isEdit = false;
                this.isDetail = false;
                this.isRoleGroup = true;
                this.currentRoleId = -1;
                this.currentRoleGroupId = -1;
            },
            createRole (data) {
                this.roleGroupDetail = {roleId: '', roleName: '', roleGroupId: data.id,
                    roleGroupCode: data.code, roleGroupRemark: data.remark, roleGroupName: data.name, isNew: true};
                this.isAdd = true;
                this.isRoleGroup = false;
                this.isEdit = false;
                this.isDetail = false;
                this.currentRoleId = '';
                this.currentRoleGroupId = data.id;
            },
            editRole (data) {
                this.roleGroupDetail = {roleId: data.id, roleName: data.name, roleGroupId: data.roleGroupId,
                    roleGroupCode: data.code, roleRemark: data.remark, roleGroupName: data.roleGroupName, isNew: false};
                this.isAdd = false;
                this.isEdit = true;
                this.isDetail = false;
                this.isRoleGroup = false;
                this.currentRoleId = data.id;
                this.currentRoleGroupId = data.roleGroupId;
            },
            editRoleGroup (data) {
                console.log(data);
                this.isAdd = false;
                this.isEdit = true;
                this.isDetail = false;
                this.isRoleGroup = true;
                this.currentRoleGroupId = data.id;
            },
            delRole (data) {
                console.log("delRole", data);
                this.initRoleGroupData({isRoleGroup: true, groupId: data.roleGroupId, delete: true});
            },
            delRoleGroup (data) {
                console.log("delRoleGroup", data);
                this.initRoleGroupData({isRoleGroup: true, delete: true});
            },
            detailRole (data) {
                console.log('detailRole', data);
                this.isDetail = false;
                this.isAdd = false;
                this.isEdit = false;
                this.isDetail = true;
                this.isRoleGroup = false;
                this.currentRoleId = data.id;
                this.currentRoleGroupId = data.roleGroupId;
            },
            detailRoleGroup (data) {
                console.log('detailRoleGroup', data);
                this.isDetail = false;
                this.isAdd = false;
                this.isEdit = false;
                this.isDetail = true;
                this.isRoleGroup = true;
                this.currentRoleGroupId = data.id;
                this.currentRoleId = -1;
            },
            updateRoleName (val) {
                console.log('updateRoleName', val);
                this.tableData.forEach(res => {
                    if (res.id === val.roleGroupId && res.name === val.roleGroupName) {
                        res.children = res.children.map(res2 => {
                            if (res2.id === val.id) {
                                res2.name = val.roleNewName;
                            }
                            return res2;
                        });
                    }
                });
            },
            updateGroupName (val) {
                console.log('updateGroupName', val);
                this.tableData.forEach(res => {
                    if (res.id === val.id && res.name === val.oldGroupName) {
                        res.name = val.newGroupName;
                    }
                });
            }
        },
        components: {
            RoleTable, AddRole, AddRoleGroup, DetailRole, DetailRoleGroup
        }
    };
</script>
<style lang="scss" scoped>
    .role-table {
        float: left;
        background-color: #fff;
        border-radius: 6px;
        height: calc(100% - 74px);
    }
    .add-role-group,.add-role,.detail-role-group, .detail-role{
        float: right;
        display: inline-block;
        width: 62%;
        height: calc(100% - 10px);
        overflow-y: auto;
        overflow: auto;
        box-sizing: border-box;
    }
</style>
