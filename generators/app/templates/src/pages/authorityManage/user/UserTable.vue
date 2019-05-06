<!-- Created by TIANJIE on 2018/6/7 -->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="tableData"
            highlight-current-row
            :stripe="true"
            height="100%"
            width="100%"
            border
        >
            <el-table-column
                label="序号"
                type="index"
                width="50"
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="userName"
                label="用户名(登录账户)">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class"
                    		   @click="handleLook(scope.row)"
                    		   type="text"
                    		   size="small">{{scope.row.userName}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="phone"
                label="手机号码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="pertainOrgs.name"
                label="所属组织"
            >
            </el-table-column>
            <el-table-column
                prop="status"
                :min-width="colWidth"
                label="状态" width=100>
                <template slot-scope="scope">
                    <el-dropdown trigger="click" class="pointer">
                        <span class="el-dropdown-link font-12">
                            {{scope.row.status | formatStatus }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleCommand(scope.row, item)"
                            				  v-for="(item, index) in options"
                            				  :key="item.value">{{item.label}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="createUser"
                label="创建人">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="createDate"
                label="创建时间">
                 <template slot-scope="scope">
                         {{scope.row.createDate | dateTimeDowith }}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200"
            >
                <template slot-scope="scope">
                    <el-button class="edit-btn-class"
                    		   @click="handleEdit(scope.row)"
                    		   type="text"
                    		   size="small">编辑
                    </el-button>
                    <el-button class="edit-btn-class"
                    		   @click="handleDel(scope.row)"
                    		   type="text"
                    		   size="small">删除
                    </el-button>
                    <el-button class="edit-btn-class"
                    		   @click="handleInit(scope.row)"
                    		   type="text"
                    		   size="small">初始化密码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import {deleteUser, initialPassWord, updateStatus} from 'js/api/authorityManage/user';
    import CONFIG from 'src/config';

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
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth,
                options: [
                    {
                        value: '0',
                        label: '禁用'
                    },
                    {
                        value: '1',
                        label: '启用'
                    }
                ],
                userList: [
                    {
                        "id": null,
                        "userName": "用户名",
                        "name": "姓名",
                        "phone": "手机号码",
                        "account": "账号",
                        "pertainOrg": "所属组织",
                        "pertainRoles": "所属角色",
                        "pertainDataRoles": "关联数据角色",
                        "status": 0, // 1是启用  0 禁用
                        "createUser": "创建人",
                        "createDate": "创建时间"
                    },
                    {
                        "id": null,
                        "userName": "用户名",
                        "name": "姓名",
                        "phone": "手机号码",
                        "account": "账号",
                        "pertainOrg": "所属组织",
                        "pertainRoles": "所属角色",
                        "pertainDataRoles": "关联数据角色",
                        "status": 1,
                        "createUser": "创建人",
                        "createDate": "创建时间"
                    },
                    {
                        "id": null,
                        "userName": "用户名",
                        "name": "姓名",
                        "phone": "手机号码",
                        "account": "账号",
                        "pertainOrg": "所属组织",
                        "pertainRoles": "所属角色",
                        "pertainDataRoles": "关联数据角色",
                        "status": 0,
                        "createUser": "创建人",
                        "createDate": "创建时间"
                    }
                ]
            };
        },

        computed: {},

        watch: {},

        created () {
            // 用于记录状态改变
            this.oldStatus = '';
        },

        methods: {
            // 初始化密码
            handleInit ({id}) {
                this._$confirm({title: '初始化密码', content: '是否需要对该用户账户密码进行初始化密码'}).then(() => {
                    initialPassWord({id}).then(res => {
                        this.$toast(res.errorMsg);
                        this._send();
                    });
                }).catch(() => false);
            },
            // 编辑
            handleEdit (data) {
                this.$emit('edit', data);
                this._send();
            },
            // 查看
            handleLook (data) {
                this.$emit('viewDetail', data);
            },
            // 删除
            handleDel ({id}) {
                this._$confirm().then(() => {
                    deleteUser({id}).then(res => {
                        this._send();
                    });
                }).catch(() => false);

            },
            // 禁用  启用
            handleCommand ({status, id}, {value, label}) {
                if (status === value) {
                    return false;
                }
                console.log("handleCommand ->value" + value + typeof value);
                if (value === "1") {
                    updateStatus({status: value, id: id}).then(res => {
                        this._send();
                        this.$toast("此用户已启用", 2000);
                    });
                } else {
                    let text = '禁用此对象后,无法引用该对象以及该对象下级所有对象,你确定要禁用此对象吗?';
                    let title = '状态';
                    this._$confirm({content: text, title}).then(() => {
                        updateStatus({status: value, id: id}).then(res => {
                            this._send();
                        });
                    }).catch(() => {
                        return false;
                    });
                }
   
            },
            _send () {
                this.$emit('update');
            }
        },

        filters: {
            formatStatus (input) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                return input === '0' ? '禁用' : '启用';
            },
            dateTimeDowith (datetime) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            }
        },
        components: {}
    };
</script>
<style lang="scss" scoped>
@import "./../../../scss/common";
@import "./../../../scss/variables";
.edit-btn-class{
    color: $base-color !important;
    // font-size: 12px;
    // font-weight: 400;
}
.font-12 {
    font-size: 12px;
}
</style>
