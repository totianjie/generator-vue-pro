<!-- Created by TIANJIE on 2018/6/9 -->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="tableData"
            :highlight-current-row="true"
            :stripe="true"
            border
            @row-click="handleRowClick"
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
                prop="name"
                label="菜单名称">
                <!-- <template slot-scope="scope">
                    <el-button @click="detail(scope.row)" type="text" size="small">{{scope.row.name}}</el-button>
                </template> -->
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="parentName"
                label="上级菜单">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="icon"
                label="图标" width=100>
                <template slot-scope="scope">
                    <i :class="scope.row.icon"></i>
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="typeText"
                label="类型" width=100>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="url"
                label="请求地址">
            </el-table-column>
             <el-table-column
                prop="enableText"
                :min-width="colWidth"
                label="状态" width=100>
                <template slot-scope="scope">
                    <el-dropdown trigger="click" class="pointer">
                        <span class="el-dropdown-link font-12">
                            {{scope.row.enable | formatStatus }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handlerChange(scope.row, item)" v-for="item in options" :key="item.value">{{item.label}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
                </el-table-column>
            <el-table-column 
                :min-width="colWidth"
                fixed="right" 
                label="操作" 
                :show-overflow-tooltip="true" 
                width="110">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button class="edit-btn-class" @click="del(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import CONFIG from 'src/config';
    import {updateMenu} from "js/api/authorityManage/menu";

    export default {
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
        props: {
            value: {
                type: Number,
                default () {
                    return -1;
                }

            },
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            edit (data) {
                this.$emit("edit", data);
            },
            del (data) {
                this.$emit("del", data);
            },
            detail (data) {
                this.$emit("detail", data);
            },
            handlerChange (id, data) {
                let objc = id;
                if (data.value === 0 || data.value === "0") {
                    if (!objc.enable) {
                        return;
                    }
                } else {
                    if (objc.enable) {
                        return;
                    }
                }
                if (!objc.enable) {
                    let objc2 = Object.assign(objc, {enable: true});
                    updateMenu(objc2).then(res => {
                        objc.enable = true;
                        objc.enableText = data.label;
                        this.$emit("update", data);
                        this.$toast("此菜单已启用", 2000);
                    });
                } else {
                    let text = '禁用此对象后,无法引用该对象以及该对象下级所有对象,你确认要禁用此对象吗?';
                    let title = '禁用';
                    this._$confirm({content: text, title}).then(() => {
                        let objc2 = Object.assign(objc, {enable: false});
                        updateMenu(objc2).then(res => {
                            objc.enable = false;
                            objc.enableText = title;
                            this.$emit("update", data);
                        });
                    }).catch(() => {
                        return false;
                    });
                }
            }
        },
        filters: {
            formatStatus (input) {
                return input ? '启用' : '禁用';
            },
            dateTimeDowith (datetime) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            }
        }
    };
</script>

<style scoped lang="scss">
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
