<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div>
        <div class="role-height">
            <el-col :span="14"  v-if="bSing">
                <v-item-detail :tooltip="true" label="角色名称：" :span="span" class="m-t-36">
                    <span class="block text-ellipsis">{{detailRoleForm.name}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleForm.name}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属角色组：" :span="span">
                    <span class="block text-ellipsis">{{detailRoleForm.roleGroupName}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleForm.roleGroupName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{detailRoleForm.createUser}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleForm.createUser}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{detailRoleForm.createTime}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleForm.createTime}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="false" label="角色授权：" :span="span">
                    <span v-show="!roleTree.length" class="block text-ellipsis">暂无数据</span>
                    <el-tree v-show="roleTree.length"
                             empty-text="暂无数据"
                             :default-expand-all="true"
                             :data="roleTree"
                             :props="defaultProps"
                             node-key="id"
                             accordion
                             class="treeGroup">
                    </el-tree>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="备注：" :span="span">
                    <span class="block showAllText">{{detailRoleForm.remark}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{detailRoleForm.remark}}</div>
                </v-item-detail>
                <div class="text-center m-t-30-role">
                    <el-button :size="btnSize" @click="handleBack">返回</el-button>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import { getRoleMenus, getRoleDetail } from "js/api/authorityManage/role";
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                span: 8,
                bSing: false,
                btnSize: CONFIG.baseBtn,
                detailRoleForm: {
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
                defaultProps: { // 所属角色对象的选项的配置参数
                    children: 'children',
                    label: 'name'
                },
                roleTree: []
            };
        },
        props: {
            id: {
                type: Number,
                default () {
                    return -1;
                }
            },
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        created () {
            this.bSing = true;
            this._getData();

        },
        mounted () {

        },
        methods: {
            _getData () {
                try {
                    console.log(this.id);
                    if (this.id === -1) {
                        try {
                            throw new Error("异常数据");
                        } catch (error) {
                            console.error(error);
                        }
                        return;
                    }
                } catch (error) {
                    console.error("id", error);
                }
                try {
                    getRoleDetail({id: this.id}).then(res => {
                        this.detailRoleForm = {};
                        res.data.createTime = this.formatDateTime(res.data.createTime);
                        this.detailRoleForm = res.data;
                    }).catch(err => {
                        console.error("getRoleDetail", err);
                    });
                } catch (error) {
                    console.error("getRoleDetail", error);
                }
                try {
                    getRoleMenus({id: this.id}).then(res => {
                        this.roleTree = [];
                        this.roleTree = res.data;
                    }).catch(err => {
                        console.error("getRoleMenus", err);
                    });
                } catch (error) {
                    console.error("getRoleMenus", error);
                }
            },
            formatDateTime (inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            handleBack () {
                this.$emit('input', false);
            }
        },
        watch: {
            id (newId, oldId) {
                console.log('watch-id', newId);
                this._getData();
            }
        },
        filters: {},
        components: {

        }
    };
</script>

<style lang="scss" scoped>
    .m-t-36 {
        margin-top: 64px;
    }
    .m-t-30-role {
        margin-top: 32px;
        display: none;
    }
    .item {
        display: block;
    }
    .showAllText{
        word-break: break-all;
    }
    .role-height{
        height: 100%;
    }
</style>
