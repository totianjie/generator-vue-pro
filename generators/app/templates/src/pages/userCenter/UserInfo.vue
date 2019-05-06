<!-- Created by Nelson on 2018/8/7 -->
<template>
    <div class="w-fill">
        <v-detail-title label="个人资料" :leftTag="true" class="m-t-105" :boxStyle="boxTop"></v-detail-title>
        <el-row>
            <el-col :offset="1" :span="9">
                <v-item-detail :tooltip="true" label="用户名：" :span="span">
                    <span class="block text-ellipsis" v-text="params.userName"></span>
                    <div slot="content" class="tooltip-item">{{params.userName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属组织：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis" v-text="params.pertainOrgsText"></span>
                    <div slot="content" class="tooltip-item">{{params.pertainOrgsText}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属角色：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis" v-text="params.pertainRolesText"></span>
                    <div slot="content" class="tooltip-item">{{params.pertainRolesText}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="手机号码：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis" v-text="params.phone"></span>
                    <div slot="content" class="tooltip-item">{{params.phone}}</div>
                </v-item-detail>
                <!-- <v-item-detail :tooltip="true" label="上次登录时间：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis" v-text="params.lastLoginTime"></span>
                    <div slot="content" class="tooltip-item">{{params.lastLoginTime}}</div>
                </v-item-detail> -->
                <v-item-detail :tooltip="true" label="数据角色：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis" v-text="params.pertainDataRolesText"></span>
                    <div slot="content" class="tooltip-item">{{params.pertainDataRolesText}}</div>
                </v-item-detail>
                <div class="m-t-40">
                    <el-button class="float-last left-60" :size="btnSize" @click="close" type="primary">返&nbsp;回</el-button>
                    <el-button class="float-last" :size="btnSize" @click="_changePassword" type="primary">修改密码</el-button>
                </div>
            </el-col>
            <el-col :span="9" :offset="3" >
                <v-item-detail :tooltip="false" label="权限：" :span="span">
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
            </el-col>
        </el-row>
        <change-password v-show="changePassword" @closeChange="closeChange">
        </change-password>
    </div>

</template>
<script type="text/ecmascript-6">
    // import busEvent from 'src/busEvent';
    import {getUserInfo} from "js/api/userCenter/user";
    import ChangePassword from './ChangePassword';
    import CONFIG from 'src/config';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data () {
            return {
                span: 7,
                changePassword: false,
                btnSize: CONFIG.baseBtn,
                defaultProps: { // 所属角色对象的选项的配置参数
                    children: 'children',
                    label: 'name'
                },
                params: {
                    id: '',
                    initialPassword: '',
                    pertainRoles: [],
                    phone: '',
                    createDate: '',
                    pertainOrgs: '',
                    pertainRolesText: '',
                    pertainOrgsText: '',
                    pertainDataRolesText: '',
                    menuResponses: [],
                    userName: '',
                    code: '',
                    remark: '',
                    orgId: '',
                    pertainDataRoles: [],
                    account: '',
                    name: '',
                    lastLoginTime: '',
                    status: true
                },
                roleTree: [

                ],
                boxTop: {
                    paddingTop: '40px',
                    paddingBottom: '40px'
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px'
            };
        },
        created () {
            this._userInfo();

        },
        computed: {
            ...mapGetters(['route'])
        },
        methods: {
            closeChange () {
                this.changePassword = false;
            },
            _changePassword () {
                this.changePassword = true;
            },
            close () {
                this.$router.push({
                    path: '/homePage'
                });
            },
            _userInfo () {
                this.navListChangeWithTitle({path: '/userCenter', title: '个人中心'});
                getUserInfo().then(res => {
                    this.roleTree = res.data.menuResponses || [];
                    let { lastLoginTime = '', userName = '', name = '', phone = '', pertainOrgs = {}, pertainRoles = [], pertainDataRoles = []} = res.data;
                    this.params = {
                        lastLoginTime,
                        userName,
                        name,
                        phone,
                        pertainOrgs,
                        pertainRoles,
                        pertainDataRoles
                    };
                    this.params.userName = this.params.userName || this.params.name;
                    this.params.pertainOrgsText = this.params.pertainOrgs ? this.params.pertainOrgs.name : '' || '';
                    this.params.pertainRolesText = this.formateArr(this.params.pertainRoles || []) || '';
                    this.params.pertainDataRolesText = this.formateArr(this.params.pertainDataRoles || []) || '';

                });
            },
            formateArr (arr) {
                let a = [];
                arr.forEach((item) => {
                    a.push(item.name);
                });
                return a.join('/');
            },
            ...mapActions(['navListChangeWithTitle'])

        },
        components: {ChangePassword},
        watch: {

        }
};
</script>
<style lang="scss" scoped>
    .change-password {
        background-color:rgba(0, 0, 0, 0.6);
        z-index: 2045;
    }
    .m-t-40 {
        margin-top: 40px;
        line-height: 40px;
    }
    .left-60{
        margin-left: 29.16667%;
    }
    .float-last {
        float: left;
    }
    .w-120 {
        width: 120px;
        margin-right:30px;
    }
</style>
