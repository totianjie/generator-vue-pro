<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <div>
        {{test}}
        <el-table
            height="100%"
            width="100%"
            :size="tableSize"
            :data="YJTableList"
            border
            :highlight-current-row="true"
            :stripe="true">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="noticeName"
                label="预警配置名称"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="remark"
                show-overflow-tooltip
                label="备注">
            </el-table-column>
            <el-table-column width="110" label="操作">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button class="edit-btn-class" @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {deleteTaskInfo} from 'js/api/settingManage/warningList/warningList.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('settingManage');
    export default {
        data () {
            return {
                test: '',
                tableSize: CONFIG.tableSize,
                colWidth: "100px"
            };
        },
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        computed: {
            ...mapGetters(['YJIsEdit', 'YJIsAdd', 'YJTableList'])
        },
        methods: {
            // 编辑
            handleEdit (data) {
                console.log('编辑', data);
                this.setYJEditObj(data);
                this.setYJIsEdit(true);
            },
            handleDel (data) {
                console.log('删除', data);
                let text = '是否删除此配置';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    deleteTaskInfo(data).then(res => {
                        this.getWarningList();
                    });
                }).catch(() => {
                    return false;
                });
            },
            ...mapMutations({
                setYJIsDetail: 'setYJIsDetail',
                setYJIsEdit: 'setYJIsEdit',
                setYJIsAdd: 'setYJIsAdd',
                setYJTableList: 'setYJTableList',
                setYJEditObj: 'setYJEditObj',
                setYJtotal: 'setYJtotal'
            }),
            ...mapActions(['YJreset', 'getWarningList'])
        }
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
