<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div>
        <div class="btn-wrap">
            <el-button size="small" plain icon="iconfont icon-xinjian-weidianji" @click="addGroup"><span class="text">新增组</span></el-button>
            <el-button size="small" plain icon="iconfont icon-xiugai-weidianji"  @click="editInfo"><span class="text">编辑</span></el-button>
            <el-button size="small" plain icon="iconfont icon-shanchu-weidianji" @click="delItem"><span class="text">删除</span></el-button>
        </div>
        <div class="role-wrap">
            <ul class="tree" v-if="tableData.length > 0">
                <li class="item" v-for="(item, index) in tableData" :key="index">
                    <div :class="['text text-ellipsis',{active:selectedRoleGroup == item.id}]">
                        <i class="el-icon-caret-bottom" :class="['icontext',{active:selectedRoleGroup == item.id}]"  @click="selectRoleGroupItem(item)" v-if="currentSelectGroupIndex == index && showTreeRoleGourp"></i>
                        <i class="el-icon-caret-right"  :class="['icontext',{active:selectedRoleGroup == item.id}]"  @click="selectRoleGroupItem(item)" v-else></i>
                        <el-tooltip :content="item.name" v-show="item.name.length>10" placement="bottom">
                            <span :class="['roleGroupName',{active:selectedRoleGroup == item.id}]"  @click="selectRoleGroupItem(item)" class="name">{{item.name}}</span>
                        </el-tooltip>
                        <span :class="['roleGroupName',{active:selectedRoleGroup == item.id}]"  @click="selectRoleGroupItem(item)" class="name" v-show="item.name.length<11">{{item.name}}</span>
                        <el-tooltip content="新增角色" placement="bottom-start">
                            <i class="el-icon-circle-plus add-icon iconfont icon-xinjianjiaoseanniu-weidianji addRoleBtn"
                               @click.stop="addRole(item)"></i>
                        </el-tooltip>
                    </div>
                    <ul class="tree-text" v-show="showTreeRoleGourp"  v-if="item.hasOwnProperty('children') && Array.isArray(item.children)" :key="`child_${index}`">
                        <li class="item" v-for="(childrenitem, childrenIndex) in item.children" :key="`child_list${childrenIndex}`">
                            <el-tooltip :content="childrenitem.name"  v-show="childrenitem.name.length>10" placement="bottom">
                                <div class="text text-ellipsis" :class="['roleName',{active:selectedRole == childrenitem.id}]" @click="selectRole(childrenitem,item)">
                                    {{childrenitem.name}}
                                </div>
                            </el-tooltip>
                            <div class="text text-ellipsis" v-show="childrenitem.name.length<11" :class="['roleName',{active:selectedRole == childrenitem.id}]" @click="selectRole(childrenitem,item)">
                                {{childrenitem.name}}
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import { getRole, getDeleteRoleGroup, getDeleteRole} from "js/api/authorityManage/role";

    export default {
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },

        data () {
            return {
                // tableData: [],
                testResult: '',
                currentRoleData: '', // 如果已经选择的切换时当前角色的 id
                currentRoleGroupData: '', // 如果已经选择的切换时当前角色组的 id
                selectedRoleGroup: -1, // 被选中的角色组
                showTreeRoleGourp: false, // 是否已经展开
                selectedRole: -1, // 被选中的角色
                roleGroupId: '',
                roleId: '',
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth
            };
        },

        computed: {

        },

        watch: {

        },

        created () {

        },

        methods: {
            updateSelect (group, role, isFirstLoad = false) {
                console.log("group - update-select", group, role);
                let groupIndex = 0;
                this.tableData.forEach((res, index) => {
                    if (res.id === group) {
                        groupIndex = index;
                    }
                });
                this.currentSelectGroupIndex = groupIndex;

                console.log("groupIndex - update-select", groupIndex, role);
                if (role !== null && role !== undefined) {
                    this.selectedRole = role;
                    this.selectedRoleGroup = -1;
                } else {
                    this.selectedRoleGroup = group;
                }
                if (!isFirstLoad) {
                    this.showTreeRoleGourp = true;
                }

                this.requestRoleList(group);
            },
            requestRoleList (groupId) {
                getRole({'id': groupId}).then((res) => {
                    this.roleGroupId = groupId;
                    let list = res.data;
                    this.tableData.forEach((item, index) => {
                        this.tableData[index].children = [];
                        if (item.id === groupId) {
                            this.roleGroupName = item.name;
                            list.forEach((item2) => {
                                item2.groupIndex_ = index;
                                item2.roleGroupId = groupId;
                                item2.roleGroupName = item.name;
                                this.tableData[index].children.push(item2);
                            });
                        }
                    });
                    this.tableData = this.tableData.concat([]);
                }).catch((err) => {
                    console.log('角色失败数据', err);
                });
            },
            refreshTableView () {
                this.selectedRoleGroup = -1;
                this.selectedRole = -1;
                this.currentSelectGroupIndex = -1;
                this.showTreeRoleGourp = false;
            },
            editInfo () {
                if (this.selectedRole === -1 && this.selectedRoleGroup === -1) {
                    this.$toast('请选择后在编辑');
                    return;
                }
                if (this.selectedRole !== -1) {
                    this.$emit('editRole', JSON.parse(JSON.stringify(this.currentRoleData)));
                } else {

                    this.tableData.forEach((item) => {
                        if (item.id === this.selectedRoleGroup) {
                            this.currentRoleGroupData = item;
                        }
                    });
                    this.$emit('editRoleGroup', JSON.parse(JSON.stringify(this.currentRoleGroupData)));
                }
            },
            delItem () {
                if (this.selectedRole === -1 && this.selectedRoleGroup === -1) {
                    this.$toast('请选择后在删除');
                    return;
                }
                if (this.selectedRole !== -1) {
                    this._$confirm().then(() => {
                        getDeleteRole({id: this.selectedRole}).then(res => {
                            this.$emit('delRole', this.currentRoleData);
                            this.selectedRoleGroup = -1;
                            this.selectedRole = -1;
                            this.currentSelectGroupIndex = -1;
                            this.showTreeRoleGourp = false;
                        });
                    }).catch((err) => {
                        console.error('失败', err);
                    });

                } else {
                    this._$confirm().then(() => {
                        getDeleteRoleGroup({id: this.selectedRoleGroup}).then(res => {
                            this.$emit('delRoleGroup', this.currentRoleGroupData);
                            this.selectedRoleGroup = -1;
                            this.selectedRole = -1;
                            this.currentSelectGroupIndex = -1;
                            this.showTreeRoleGourp = false;
                        });
                    }).catch((err) => {
                        console.error('失败', err);
                    });
                }
            },
            addRole (item) {
                this.$emit('createRole', item);
            },
            addGroup () {
                this.selectedRoleGroup = -1;
                this.selectedRole = -1;
                this.currentSelectGroupIndex = -1;
                this.showTreeRoleGourp = false;
                this.$emit('createRoleGroup', null);
            },
            selectRoleGroupItem (data) {
                try {
                    this.currentRoleGroupData = data;
                    this.currentRoleData = '';
                    // 角色组列表下的角色
                    if (data.isRoleGroup) {
                        try {
                            if (this.currentSelectGroupIndex === data.groupIndex_ && this.showTreeRoleGourp) {
                                this.showTreeRoleGourp = false;
                                this.selectedRoleGroup = data.id;
                                this.selectedRole = -1;
                                this.roleGroupName = data.name;
                                this.roleGroupId = data.isRoleGroup ? data.id : ''; // 角色组id
                                this.roleId = '';
                                this.$emit('detailRoleGroup', data);
                                return;
                            }
                            this.currentSelectGroupIndex = data.groupIndex_;
                            this.showTreeRoleGourp = true;
                            // 角色组点击事件
                            const {name} = data;
                            this.addRoleForm = {
                                name_: name,
                                name: '',
                                menus: [],
                                remark: ''
                            };
                            this.roleGroupId = data.isRoleGroup ? data.id : ''; // 角色组id
                            this.$emit('detailRoleGroup', data);
                            this.roleGroupName = data.name;
                            this.selectedRoleGroup = data.id;
                            this.selectedRole = -1;
                            getRole({'id': data.id}).then((res) => {
                                this.roleGroupId = data.id;
                                this.roleGroupName = data.name;
                                let list = res.data;
                                this.tableData.forEach((item, index) => {
                                    this.tableData[index].children = [];
                                    if (item.id === data.id) {
                                        list.forEach((item2) => {
                                            item2.groupIndex_ = data.groupIndex_;
                                            item2.roleGroupId = data.id;
                                            item2.roleGroupName = data.name;
                                            this.tableData[index].children.push(item2);
                                        });
                                    }
                                });
                                this.tableData = this.tableData.concat([]);
                            }).catch((err) => {
                                console.log('角色失败数据', err);
                            });
                        } catch (e) {
                            console.log("catch->> " + e.name + e.reason);
                        }
                    }
                } catch (e) {
                    console.log("catch->> " + e.name + e.reason);
                }
            },
            selectRole (childrenitem, item) {
                this.testResult = childrenitem;
                this.selectedRole = childrenitem.id;
                this.selectedRoleGroup = -1;
                this.currentRoleData = childrenitem;
                this.currentSelectGroupIndex = childrenitem.groupIndex_;
                this.showTreeRoleGourp = true;
                this.currentRoleGroupData = '';
                this.$emit('detailRole', childrenitem);
            }
        },

        filters: {

        },
        components: {

        }
    };
</script>
<style lang="scss" scoped>
@import "./../../../scss/common";
@import "./../../../scss/variables";
    .btn-wrap{
        margin: 20px 0 8px 15px;
        .iconfont{
            margin-right:8px;
        }
        .text{
            padding-left: 6px;
        }
    }
    .role-wrap{
        width:280px;
        height: 100%;
        border:1px solid #dcdfe6;
        border-radius: 4px;
        padding:8px;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-left: 15px;
    }
    .role-wrap .tree {
        .active{
            color: $base-color !important;
            background: rgb(243, 248, 251);
        }
        .roleGroupName{
            margin-left: 5px;
        }
        .tree-text{
            .item{
                .roleName{
                    padding: 0 35px 0 68px;
                }
            }
        }
        .item {
            width: 100%;
            cursor: pointer;
            .text {
                width: 100%;
                box-sizing: border-box;
                line-height: 32px;
                position: relative;
                padding: 0 30px 0 35px;
                .left-icon{
                    position: absolute;
                    top: 8px;
                }
                .add-icon{
                    position: absolute;
                    top: 2px;
                }
                .add-icon:hover{
                    cursor: pointer;
                    color: $base-color !important;
                }
                .left-icon {
                    left: 13px;
                }
                .add-icon {
                    right: 10px;
                    padding: 5px;
                }
            }
            ul > .text {
                padding-left: 10px;
            }
        }
    }
    .addRoleBtn{
        color: #333;
    }
</style>
