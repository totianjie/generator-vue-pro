<!-- Created by TIANJIE on 2018/6/15 -->
<!--
id (integer, optional): 主键 ,
lowerNodeName (string, optional): 记录下级节点 ,
nodeName (string, optional): 节点名称 ,
rejectedName (integer, optional): 驳回节点 ,
remark (string, optional): 备注 ,
steps (integer, optional): 步骤 ,
turnToName (integer, optional) 转向节点
-->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="tableData"
            highlight-current-row
            :border="true" 
            :stripe="true"
            height="100%"
            width="100%"
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
                prop="nodeName"
                label="节点名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="remark"
                label="备注">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="lowerNodeName"
                label="下级节点">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="rejectedName"
                label="驳回节点">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="turnToName"
                label="转向节点"
            >
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
