<!-- Created by Nelson on 2018/10/25 -->
<template>
    <div>
        <role-table ref="tableView" 
                    :tableData="tableData"
                    @authSelect="authSelect"
                    @editRoleAuth="editRoleAuth"
                    @detailRoleGroup="detailRoleGroup"
                    class="role-table">
        </role-table>
        <setting-authorize v-if="isEdit" :roleId="currentRoleId" @cancel="cancel"></setting-authorize>
        <detail-setting v-if="isDetail&&!isRoleGroup" :roleId="currentRoleId" ref="detail"></detail-setting>
        <detail-role-group class="detail-role-group"
                           :id="currentRoleGroupId"
                           v-if="isRoleGroup&&isDetail">
        </detail-role-group>
        <!-- <div v-if="!isEdit && !isDetail" style="margin-top:80px;margin-left:80px;float:left;font-size:30px;">请选择角色进行查看,编辑,删除操作</div> -->
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import RoleTable from './RoleTable';
    import DetailSetting from './DetailSetting.vue';
    import { getRoleGroupList, getRoleGroupDetail} from "js/api/authorityManage/role";
    import SettingAuthorize from './SettingAuthorize.vue';
    import DetailRoleGroup from './DetailRoleGroup';

    export default {
        props: {

        },
        data () {
            return {
                isEdit: false, // 是否编辑
                isDetail: false, // 详情状态如否
                btnSize: CONFIG.homeBtn,
                isRoleGroup: true, // 是否是角色组
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
            this.initRoleGroupData({isRoleGroup: true});
        },
        methods: {
            cancel (id = -1, roleGroupId = -1) {
                console.info('cancel');
                this.isEdit = false;
                this.isDetail = true;
                this.currentRoleId = id;
                this.currentRoleGroupId = roleGroupId;
            },
            authSelect (item) {
                console.info('authSelect', item);
                this.isEdit = false;
                this.isDetail = true;
                this.isRoleGroup = false;
                this.currentRoleId = item.id;
                this.currentRoleGroupId = item.roleGroupId;
            },
            editRoleAuth (item) {
                console.info('editRoleAuth', item);
                this.isDetail = false;
                this.isEdit = true;
                this.currentRoleId = item.id;
                this.currentRoleGroupId = item.roleGroupId;
            },
            // 角色组列表
            initRoleGroupData (updateData) {
                if (this.isEdit) {
                    if (updateData.isRoleGroup) {
                        this.currentRoleGroupId = updateData.id;
                    } else {
                        this.currentRoleId = updateData.id;
                    }
                    this.isDetail = true;
                    this.isAdd = false;
                    this.isEdit = false;
                    this.isRoleGroup = updateData.isRoleGroup;
                    return;
                }
                this.$refs.tableView.refreshTableView();
                getRoleGroupList().then((res) => {
                    // updateData.id要新增或编辑的时候才执行，否则是没有值，默认进来是没有值的，就执行下去的if (!updateData.id)
                    if (updateData.isRoleGroup) {
                        this.currentRoleGroupId = updateData.id;
                    } else {
                        this.currentRoleId = updateData.id;
                    }
                    try {
                        this.roleGroupData = [];
                        this.tableData = [];
                        // 如果updateData.id传过来没值，默认初始化列表第一条数据显示右侧角色组的详细信息
                        if (!updateData.id) {
                            this.currentRoleGroupId = res.data[0].id;
                        }
                        res.data.forEach((item, index) => {
                            item.groupIndex_ = index;
                            item.isRoleGroup = true;
                            this.roleGroupData.children = [];
                            this.roleGroupData.push(item);
                        });
                        this.tableData = this.roleGroupData;
                        if (res.data.length > 0) {
                            // 如果是角色组就调用角色组详情
                            if (updateData.isRoleGroup) {
                                this._roleGroupDetail(this.currentRoleGroupId);
                                this.$refs.tableView.updateSelect(this.currentRoleGroupId, null, true);
                            } else {
                                // 否则调用角色详情
                                this.isDetail = true;
                                this.isAdd = false;
                                this.isEdit = false;
                                this.isRoleGroup = false;
                                // 父组件调用子组件的_getData()方法
                            }
                        }
                    } catch (e) {
                        console.log("catch->> " + e.name + e.reason);
                    }
                }).catch((err) => {
                    console.log('角色组列表失败', err);
                });
            },
            _roleGroupDetail (id) {
                try {
                    console.log("_roleGroupDetail", id);
                    getRoleGroupDetail({id}).then((res) => {
                        this.currentRoleGroupId = res.data.id;
                        this.isDetail = true;
                        this.isAdd = false;
                        this.isEdit = false;
                        this.isRoleGroup = true;
                        this.roleGroupId = res.data.id;
                        this.roleGroupDetail = res.data;// 给模型赋值在页面渲染显示
                    }).catch((err) => {
                        console.log('详细信息', err);
                    });
                } catch (e) {
                    console.log('角色组列表失败', e.name + e.reason);
                }
            },
            detailRoleGroup (data) {
                this.isDetail = false;
                this.isAdd = false;
                this.isEdit = false;
                this.isDetail = true;
                this.isRoleGroup = true;
                this.currentRoleGroupId = data.id;
                this.currentRoleId = -1;
            }
        },
        components: {
            DetailSetting,
            RoleTable,
            DetailRoleGroup,
            SettingAuthorize
        }
    };
</script>
<style lang="scss" scoped>
    .role-table {
        // margin-top: 20px;
        // margin-bottom: 20px;
        float: left;
        background-color: #fff;
        border-radius: 6px;
        height: 100%;
    }
</style>

