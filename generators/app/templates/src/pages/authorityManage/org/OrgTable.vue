<!-- Created by TIANJIE on 2018/6/15 -->
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
                prop="code"
                label="组织编码">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="orgName"
                label="组织名称">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="handleDetail(scope.row)" type="text" size="small">{{scope.row.orgName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="pertainOrgName"
                label="所属组织">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="pertainRoleName"
                label="所属角色组">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="createUser"
                label="创建人"
            >
            </el-table-column>
            <el-table-column
                prop="createDate"
                :min-width="colWidth"
                show-overflow-tooltip
                label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createDate | dateTimeDowith }}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                :show-overflow-tooltip="true"
                width="139px"
            >
                <template slot-scope="scope">
                    <el-button class="edit-btn-class"  @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button class="edit-btn-class"  @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import {deleteOrg} from 'js/api/authorityManage/org';
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
            // 编辑
            handleEdit (data) {
                this.$emit('edit', data);
            },
            // 删除
            handleDel ({id}) {
                this._$confirm().then(() => {
                    deleteOrg({id}).then(res => {
                        this._send();
                    });
                }).catch(() => false);

            },
            // 查看详情
            handleDetail (data) {
                this.$emit('detail', data);
            },
            // 禁用  启用
            handleCommand ({status, id}, {value, label}) {
                if (status === value) {
                    return false;
                }
                let text = value === '1' ? '是否需要对该用户账户进行启用' : '是否需要对该用户账户进行禁用';
                let title = value === '1' ? '启用' : '禁用';
                this._$confirm({content: text, title}).then(() => {
                    // updateStatus({status: value, id: id}).then(res => {
                    //     this._send();
                    // });
                    this._send();
                }).catch(() => {
                    return false;
                });
            },
            _send () {
                this.$emit('update');
            }
        },

        filters: {
            formatStatus (input) {
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
</style>
