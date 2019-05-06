<!-- Created by Nelson on 2018/9/18 -->
<!--     createTime (string, optional): 创建时间 ,
    dataNum (integer, optional): 知识库数据条数 ,
    remark (string, optional): 备注 ,
    templetCode (string, optional): 模板编码 ,
    templetDrugId (integer, optional): 临床路径导入模板id ,
    tableType (integer, optional): 数据表类型(1 sql语句 2 源表) ,
    templetId (integer, optional): 模板id ,
    templetName (string, optional): 模板名称 ,
    templetType (string, optional): 模板类型（1全量替换2 增量 3 临床路径4 全量新增） , ,
    updateTime (string, optional): 修改时间 -->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="tableData"
            :border="true" 
            :highlight-current-row="true"
            :stripe="true"
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
                label="模板号"
                show-overflow-tooltip
                prop="templetCode"
                :min-width="colWidth"
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="templetName"
                label="模板名称">
                <!-- <template slot-scope="scope">
                    <el-button @click="detail(scope.row)" type="text" size="small">{{scope.row.templetName}}</el-button>
                </template> -->
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="encAndDec"
                width="110"
                label="是否加解密">
                <template slot-scope="scope">
                    {{scope.row | formatSec }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="typeClass"
                label="类型">
                 <template slot-scope="scope">
                    {{scope.row | formatType }}
                </template>
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
                prop="createTime"
                label="创建时间" width=170>
                <template slot-scope="scope">
                    {{scope.row.createTime || scope.row.creatTime | formatDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="updateTime"
                label="修改时间" 
                width=170>
                <template slot-scope="scope">
                    {{scope.row.updateTime | formatDateTime }}
                </template>
            </el-table-column>
            <!-- <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="dataNum"
                width=170
                label="知识库数据条数">
            </el-table-column> -->
            <el-table-column 
                :min-width="colWidth"
                fixed="right" 
                label="操作" 
                :show-overflow-tooltip="true" 
                width="70">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <!-- <el-button @click="del(scope.row)" type="text" size="small">删除</el-button> -->
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
                test: '',
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth
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
            dateTimeDowith (datetime) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            },
            formatDateTime (inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            formatType (row_ = {}) {
                let tableType = [];
                switch (parseInt(row_.tableType)) {
                case 1:
                    tableType.push('sql语句');
                    break;
                case 2:
                    tableType.push('源表');
                    break;
                default:
                    tableType.push('其他');
                    break;
                }
                switch (parseInt(row_.templetType)) {
                case 1:
                    tableType.push('全量替换');
                    break;
                case 2:
                    tableType.push('增量');
                    break;
                case 3:
                    tableType.push('临床路径');
                    break;
                case 4:
                    tableType.push('全量新增');
                    break;
                default:
                    tableType.push('其他');
                    break;
                }
                return tableType.join('+');
            },
            formatSec (row_) {
                if (row_.encAndDec === undefined || row_.encAndDec === '' || row_.encAndDec + '' === '1' || row_.encAndDec === null) {
                    return '否';
                } else {
                    return '是';
                }
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
</style>
