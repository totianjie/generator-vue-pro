<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div class="role-wrap-auth">
        <el-col class="form">
            <el-form ref="settingForm" :model="settingForm" label-width="110px">
                <el-form-item label="角色名称：" prop="name">
                    <el-input v-model="settingForm.name" placeholder="请输入角色名称" disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="所属角色组：" prop="roleGroupName">
                    <el-input v-model="settingForm.roleGroupName" placeholder="请输入角色名称" disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="创建人：" prop="createUser">
                    <el-input v-model="settingForm.createUser" placeholder="请输入角色名称" disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：" prop="createTime">
                    <el-input v-model="settingForm.createTime" placeholder="请输入角色名称" disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="流程授权：" prop="dataList" style="position:relative;" class="menu-style">
                    <el-input v-show="!roleTree.length" disabled placeholder="暂无相关数据"></el-input>
                    <v-input-box v-show="roleTree.length>0&&showTree">
                        <el-checkbox-group v-model="menusList">
                            <el-checkbox
                                v-for="item in roleTree"
                                :label="item.nodeCode"
                                :key="item.id"
                                class="checkbox text-ellipsis"
                            >
                                <el-tooltip v-show="item.nodeName.length>25" 
                                            class="item" 
                                            effect="dark" 
                                            :content="item.nodeName" 
                                            placement="top-start">
                                    <span>{{item.nodeName}}</span>
                                </el-tooltip>
                                <span v-show="item.nodeName.length<=25" >
                                    {{item.nodeName}}
                                </span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </v-input-box>
                    <!-- <el-input v-show="menus.length==0" disabled placeholder="暂无相关数据"></el-input> -->
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="cancelBtn(settingForm)">取消</el-button>
                    <el-button @click="submitBtn">确定</el-button>
                    <el-button @click="clear()">清除所有勾选节点</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>
<script>
    import { getRoleDetail } from "js/api/authorityManage/role";
    import { proceSet } from "js/api/authorityManage/progressAuthorization";
    import { getProces } from "js/api/authorityManage/progressAuthorization";
    import { getStepsList} from "js/api/authorityManage/processAudit";
    // import {getDataRoleList, getRoleGropLowerRoles} from 'js/api/authorityManage/user';
    export default {
        data () {
            return {
                showTree: true,
                settingForm: {
                    name: '',
                    roleGroupName: '',
                    createBy: '',
                    createTime: '',
                    dataList: [],
                    menusList: []
                },
                roleTree: [
                    // { children: [], name: '选择', code: 'de1', id: 1},
                    // { children: [], name: '其他', code: 'de2', id: 2},
                    // { children: [], name: '选择', code: 'de3', id: 3},
                    // { children: [], name: '其他', code: 'de4', id: 4}
                ],
                defaultProps: { // 所属角色对象的选项的配置参数
                    children: 'children',
                    label: 'name'
                },
                menusList: [],
                menus: [
                ]
            };
        },
        computed: {

        },
        props: {
            roleId: {
                type: String,
                default () {
                    return '';
                }
            }
        },
        mounted () {

        },
        created () {
            this._getData();
        },
        watch: {
           
        },
        methods: {
            clear () {
                this.showTree = false;
                console.log('clear', 'clear');
                this.settingForm.dataList = [];
                this.settingForm.menusList = [];
                this.menusList = [];
                this.showTree = true;
            },
            _getData () {
                console.log('this.id', this.roleId);
                this.settingForm = {};
                getRoleDetail({id: this.roleId}).then(res => {
                    res.data.createTime = this.formatDateTime(res.data.createTime);
                    this.settingForm = res.data;

                    // Promise.all([getRoleGropLowerRoles({id: 112}), getDataRoleList()]).then(result => {
                    Promise.all([getProces({roleId: this.roleId}), getStepsList()]).then(result => {
                        let result1 = result[0].data;
                        this.settingForm.dataList = result1;
                        this.settingForm.menusList = result1.map(res2 => {
                            return res2.nodeCode;
                        });
                        this.menusList = this.settingForm.menusList;
                        let result2 = result[1].data;
                        this.roleTree = result2;
                    });
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
            cancelBtn (data) {
                // 角色组
                this.$emit('input', false);
                console.info('tag', '33333333', data);
                this.$emit("cancel", this.roleId); // 取消取data.id
            },
            submitBtn () {
                this.selectRole = true;
                let nodes = this.roleTree.filter(res => {
                    let temp = this.menusList.filter(res2 => {
                        return res.nodeCode === res2;
                    });
                    if (temp && temp.length > 0) {
                        return res;
                    }
                });
                console.log('nodes', nodes);
                this.$refs.settingForm.validate(value => {
                    console.log('tag', this.settingForm);
                    proceSet({roleId: this.roleId, nodes: nodes}).then(res => {
                        this.$emit("cancel", this.roleId); // 取消取data.id
                    });
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
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
            margin: 0 auto !important;
            float: none;
            min-width:300px;
            max-width: 600px;
            width: 500px;
        }
    }
    .menu-style {
        /deep/ .el-form-item__content{
            margin-top: 10px;
        }
    }
    .el-checkbox + .el-checkbox.radio, .el-checkbox + .el-checkbox.checkbox, .el-checkbox.checkbox, .el-checkbox.radio {
        // width: 90px;
        margin-right: 10px;
        margin-bottom: 8px;
        box-sizing: border-box;
    }
</style>
