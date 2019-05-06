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
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="dataRoleName"
                label="数据角色名称">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="detailBtn(scope.row)" type="text" size="small">{{scope.row.dataRoleName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="orgName"
                label="所属组织">
            </el-table-column>
             <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="createUser"
                label="创建人">
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
                width="110"
            >
                <template slot-scope="scope">
                       <el-button type="text" class="edit-btn-class" size="small" @click="updateBtn(scope.row)">编辑</el-button>
                        <el-button type="text" class="edit-btn-class"  size="small" @click="deleteBtn(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import {listData, updateStatusUser, deteleData} from "js/api/authorityManage/dataRole";
    import CONFIG from 'src/config';
    import rules from './rules';
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
                radio: 1,
                // dataRoleList: [], // 返回列表结果
                date: '',
                valueDate: '',
                span: 8,
                type: 'list', // list默认列表页，insert新增，update修改，query查询
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
                queryParams: { // 查询
                    name: '',
                    beginDate: '',
                    endDate: '',
                    offset: 1, // 当前页变动时
                    limit: 20 // 每页只限20条
                },
                rules: rules,
                total: 0, // 总数
                pageSize: 20, // 每页的条数
                pageSizes: [20, 40, 60, 100], // 每页显示个数选择器的选项设置
                currentPage: 1 // 当前页数
            };
        },

        computed: {},

        watch: {},

        created () {
            // 用于记录状态改变
            this.oldStatus = '';
        },
        mounted () {
            // 首次进来获取数据
            this.getList();
        },

        methods: {
            getList () {
                listData(this.queryParams).then(res => {
                    this.total = res.data.total;
                    this.currentPage = res.data.pageNum;
                    this.pageSize = res.data.pageSize;
                    this.dataRoleList = res.data.list;
                }).catch(err => {
                    console.log(err);
                });
            },
            // 禁用  启用
            handlerChange ({status, id}, {value, label}) {
                let text = status === '1' ? '是否需要对该用户账户进行启用' : '是否需要对该用户账户进行禁用';
                let title = status === '1' ? '启用' : '禁用';
                this._$confirm({content: text, title}).then(() => {
                    updateStatusUser({status: status, id: id}).then(res => { // 用户管理--修改状态
                        this._send();
                    });
                }).catch(() => {
                    this.getList();// 没修改成功返回列表页
                    return false;
                });
            },
            // 编辑按钮
            updateBtn (data) {
                this.$emit("edit", data);
            },
            // 删除按钮
            deleteBtn (data) {
                this._$confirm({ content: "此操作将永远删除,是否继续?" }).then(() => {
                    deteleData({id: data.id}).then(res => {
                        this._send();
                        // this.getList();
                    }).catch(err => {
                        console.log('删除', err);
                    });
                }).catch(() => false);
            },
            // 查看按钮或者事件
            detailBtn (data) {
                this.$emit("detail", data);
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
</style>
