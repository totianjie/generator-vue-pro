<!-- Created by TIANJIE on 2018/6/9 -->
<template>
    <div>
        <div class="page">
            <el-col :span="12" :offset="6" v-if="bSing">
                <v-item-detail :tooltip="true" label="数据角色名称：" :span="span">
                    <span class="block text-ellipsis">{{detailData.dataRoleName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.dataRoleName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属组织：" :span="span">
                    <span class="block text-ellipsis">{{detailData.orgName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.orgName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="false" label="数据角色权限：" :span="span">
                    <el-tree
                      v-model="detailData.warrantOrgs"
                            empty-text="暂无数据"
                            ref="tree"
                            :data="detailData.warrantOrgs"
                            :props="defaultDateProps"
                            node-key="id"
                            default-expand-all
                            class="dataTree">
                    </el-tree>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createUser}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createUser}}</div>
                </v-item-detail>
                <v-item-detail  :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createDate}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createDate}}</div>
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
    import { queryData, orgTreeData } from "js/api/authorityManage/dataRole";
    export default {
        data () {
            return {
                radio: '1',
                span: 8,
                bSing: false,
                btnSize: CONFIG.baseBtn,
                detailData: {},
                defaultDateProps: {
                    children: 'childOrg',
                    label: 'name'
                },
                orgGroup: [], // 新增所属组织
                dataRoleGroup: [ // 新增数据角色授权
                    
                ]
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
            queryData({'id': this.id}).then(res => {
                res.data.createDate = this.dateTimeDowith(res.data.createDate) || '';
                this.type = 'detail';
                this.detailData = {
                    dataRoleName: res.data.dataRoleName || '', // 数据角色名称
                    orgId: res.data.orgId || '', // 所属组织id
                    orgName: res.data.orgName || '', // 所属组织名称
                    id: res.data.id || 0,
                    warrantOrgs: [res.data.authorityOrgs] || [],
                    status: res.data.status,
                    createUser: res.data.createUser || '',
                    createDate: res.data.createDate || ''
                };
                this.bSing = true;
                // this.getOrgTreeData().then(() => {
                //     // this.$refs.tree.setCheckedNodes(res.data.warrantOrgs.filter(item => {
                //     //     return item.mark === "2";
                //     // }));
                // });
            }).catch(err => {
                console.log('查看', err);
            });
    
        },
        methods: {
            getOrgTreeData () {
                return orgTreeData({'id': ''}).then(res => {
                    this.orgGroup.push(res.data);
                    this.dataRoleGroup.push(res.data);
                    return Promise.resolve();
                }).catch(err => {
                    console.log('组织数据', err);
                });
            },
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
    .page{
        margin-top:30px;
    }
</style>
