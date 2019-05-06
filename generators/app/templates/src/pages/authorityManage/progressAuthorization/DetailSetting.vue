<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div class="role-wrap-auth">
        <div class="role-height">
            <el-col v-if="bSing">
                <v-item-detail :tooltip="true" label="角色名称：" :span="span" class="m-t-34">
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
                <v-item-detail :tooltip="true" label="流程授权：" :span="span">
                    <span class="block text-ellipsis">{{detailRoleForm.nodeInfo}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleForm.nodeInfo}}</div>
                </v-item-detail>
            </el-col>
        </div>
    </div>
</template>

<script>
    import CONFIG from 'src/config';
    import { getRoleDetail } from "js/api/authorityManage/role";
    import { getProces } from "js/api/authorityManage/progressAuthorization";

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
                    nodeInfo: '',
                    parentId: '' // eslint-disable-line
                },
                roleGroupTree: [],
                defaultProps: { // 所属角色对象的选项的配置参数
                    children: 'children',
                    label: 'name'
                }
            };
        },
        props: {
            roleId: {
                type: Number,
                default () {
                    return -1;
                }
            }
        },

        watch: {
            roleId (newId, oldId) {
                if (newId) {
                    this._getData();
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
                console.log('this.id', this.roleId);
                this.detailRoleForm = {};
                getRoleDetail({id: this.roleId}).then(res => {
                    res.data.createTime = this.formatDateTime(res.data.createTime);
                    this.detailRoleForm = Object.assign({}, this.detailRoleForm, res.data);
                }).catch(err => {
                    console.log(err);
                });
                getProces({roleId: this.roleId}).then(res => {
                    let nodeInfo = res.data.map(res2 => {
                        return res2.nodeName;
                    }).join('/');
                    this.detailRoleForm = Object.assign({}, this.detailRoleForm, {nodeInfo});
                }).catch(err => {
                    console.log(err);
                });
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
        filters: {},
        components: {}
    };
</script>

<style lang="scss" scoped>
    .m-t-34 {
        margin-top: 5px;
    }
    .m-t-32 {
        margin-top: 2px;
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
        margin: 0 auto !important;
        float: none;
        min-width:300px;
        max-width: 600px;
        width: 500px;
    }
    .role-wrap-auth{
        height: calc(100% - 50px);
        // margin-top: 20px;
        // margin-bottom: 20px;
        margin-left: 10px;
        padding-bottom: 10px;
        // margin-right: 10px;
        border-left: 1px solid #dcdfe6;
        padding-top: 30px;
        padding: 0 auto 0 auto;
        right: 0;
        float: right;
        width: calc(100% - 380px);
        /deep/ .el-input__inner {
            // border-width: 0;
        }
        .form {
        
        }
    }
</style>

