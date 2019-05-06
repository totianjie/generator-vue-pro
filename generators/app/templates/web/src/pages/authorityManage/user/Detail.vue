<!-- Created by TIANJIE on 2018/6/9 -->
<template>
    <div>
        <div class="page">
            <el-col :span="12" :offset="6" v-if="bSing">
                <v-item-detail :tooltip="true" label="用户名：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis">{{detailData.userName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.userName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="姓名：" :span="span">
                    <span class="block text-ellipsis">{{detailData.name}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.name}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="手机号码：" :span="span">
                    <span class="block text-ellipsis">{{detailData.phone}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.phone}}</div>                    
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属组织：" :span="span">
                    <span class="block text-ellipsis">{{detailData.pertainOrgs.name}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.pertainOrgs.name}}</div>                    
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属角色：" :span="span">
                    <span class="block text-ellipsis showAllText">{{detailData.pertainRolesText}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{detailData.pertainRolesText}}</div>   
                </v-item-detail>
                <v-item-detail :tooltip="true" label="关联数据角色：" :span="span">
                    <span class="block text-ellipsis showAllText">{{detailData.pertainDataRolesText}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{detailData.pertainDataRolesText}}</div> 
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createUser}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createUser}}</div> 
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createDate}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createDate}}</div> 
                </v-item-detail>
                <v-item-detail :tooltip="true" label="状态：" :span="span">
                    <span class="block text-ellipsis">{{detailData.statusText}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.statusText}}</div> 
                </v-item-detail>
                <v-item-detail :tooltip="true" label="备注：" :span="span">
                    <span class="block showAllText">{{detailData.remark}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{detailData.remark}}</div> 
                </v-item-detail>
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
                <div class="text-center m-t-32">
                    <el-button :size="btnSize" @click="handleBack">返回</el-button>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import CONFIG from 'src/config';
    import {getUserDetail} from "js/api/authorityManage/user";
    export default {
        data () {
            return {
                radio: '1',
                span: 8,
                bSing: false,
                btnSize: CONFIG.baseBtn,
                detailData: {
                    userName: '',
                    name: '',
                    phone: '',
                    pertainOrgs: {
                        name: ''
                    },
                    pertainRoles: [],
                    pertainRolesText: '',
                    pertainDataRoles: [],
                    pertainDataRolesText: '',
                    createUser: '',
                    status: '',
                    statusText: '',
                    createDate: '',
                    remark: ''
                },
                roleTree: [],
                defaultProps: { // 所属角色对象的选项的配置参数
                    children: 'children',
                    label: 'name'
                }
            };
        },
        props: {
            value: {
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
            getUserDetail({id: this.id}).then(res => {
                res.data.createDate = this.dateTimeDowith(res.data.createDate) || '';
                res.data.pertainOrgs = res.data.pertainOrgs || {};
                res.data.pertainOrgs.name = res.data.pertainOrgs.name || '';
                this.detailData = res.data;
                this.detailData.pertainRolesText = this.formateArr(this.detailData.pertainRoles);
                this.detailData.pertainDataRolesText = this.formateArr(this.detailData.pertainDataRoles);
                this.detailData.statusText = this.formatStatus(this.detailData.status);
                this.detailData.createDate = this.dateTimeDowith(this.detailData.createDate);
                this.roleTree = this.detailData.menuResponses;
                this.bSing = true;
            });
        },
        methods: {
            handleBack () {
                this.$emit('input', false);
            },
            formateArr (arr) {
                let a = [];
                arr.forEach((item) => {
                    a.push(item.name);
                });
                return a.join('/');
            },
            formatStatus (input) {
                return input === '0' ? '禁用' : '启用';
            },
            dateTimeDowith (datetime) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            }
        },
        filters: {
        }
    };
</script>

<style scoped lang="scss">
    .m-t-32 {
        margin-top: 32px;
    }

    .m-t-34 {
        margin-top: 34px;
    }

    .item {
        display: block;
    }
    .statusBtn{
        line-height: 40px;
    }
    .showAllText{
        word-break: break-all;
    }
</style>
