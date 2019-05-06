<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div class="role-wrap-auth">
        <div class="role-height">
            <el-col class="form" ref="detailForm" :model="detailRoleGroupForm" label-width="110px">
                <v-item-detail :tooltip="true" label="角色组名称：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis">{{detailRoleGroupForm.name}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleGroupForm.name}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{detailRoleGroupForm.createBy}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleGroupForm.createBy}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{detailRoleGroupForm.createTime}}</span>
                    <div slot="content" class="tooltip-item">{{detailRoleGroupForm.createTime}}</div>
                </v-item-detail>
            </el-col>
        </div>
    </div>
</template>

<script>
    import { getRoleGroupDetail } from "js/api/authorityManage/role";
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                span: 8,
                bSing: false,
                btnSize: CONFIG.baseBtn,
                detailRoleGroupForm: {
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
                }
            };
        },
        props: {
            id: {
                type: Number,
                default () {
                    return -1;
                }
            }
        },

        watch: {
            id (newId, oldId) {
                getRoleGroupDetail({id: this.id}).then((res) => {
                    this.detailRoleGroupForm = {};
                    res.data.createTime = this.formatDateTime(res.data.createTime);
                    this.detailRoleGroupForm = res.data;// 给模型赋值在页面渲染显示
                }).catch((err) => {
                    console.error('详细信息', err);
                });
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
                getRoleGroupDetail({id: this.id}).then((res) => {
                    res.data.createTime = this.formatDateTime(res.data.createTime);
                    this.detailRoleGroupForm = res.data;// 给模型赋值在页面渲染显示
                    // 获取角色组勾选中的菜单
                }).catch((err) => {
                    console.error('详细信息', err);
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
        margin-top: 32px;
    }
    .m-t-32 {
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

