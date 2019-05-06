<!-- Created by Nelson on 2019/01/19 -->
<template>
    <div>
        <el-table
            ref="tableRef"
            :size="tableSize"
            :data="DMTableList"
            :highlight-current-row="true"
            :stripe="true"
            :border="true"
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
            <!-- <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[0]"
                label="业务编码">
            </el-table-column> -->
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[0]"
                label="业务名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[1]"
                label="源库地址">
                <template slot-scope="scope">
                    {{oriDo(scope.row[columnTableList[1]])}}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[2]"
                label="中间库地址">
                <template slot-scope="scope">
                    {{midDo(scope.row[columnTableList[2]])}}
                </template>
            </el-table-column>
             <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[3]"
                label="平台数据库地址">
                <template slot-scope="scope">
                    {{platDo(scope.row[columnTableList[3]])}}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[4]"
                label="业务库地址">
                <template slot-scope="scope">
                    {{workDo(scope.row[columnTableList[4]])}}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                :prop="columnTableList[5]"
                label="备注">
            </el-table-column>
            <el-table-column
                :prop="columnTableList[6]"
                :min-width="colWidth"
                label="状态"
                 width=100>
                <template slot-scope="scope">
                    <el-dropdown trigger="click" class="pointer">
                        <span class="el-dropdown-link font-12">
                            {{scope.row[columnTableList[6]] | formatStatus }}
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
        <el-dialog
            title="提示"
            :visible.sync="deleteVisible"
            width="400px"
            :show-close ="true"
            :before-close="handleClose"
            :modal-append-to-body="false"
            @close="handlerClose"
        >
            <span>是否删除此配置</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteItem(false)">取 消</el-button>
                <el-button type="primary" @click="deleteItem(true)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="enableVisible"
            width="400px"
            :show-close ="true"
            :before-close="handleClose"
            :modal-append-to-body="false"
            @close="handlerClose"
        >
            <span>是否禁用此配置</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="enableUse(false)">取 消</el-button>
                <el-button type="primary" @click="enableUse(true)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('settingManage');
    import {deteleSetting, updateStatus} from 'js/api/settingManage/dataManageCenter/dataManageCenter.js';
    export default {
        data () {
            return {
                test: '',
                enableVisible: false,
                deleteVisible: false,
                tableSize: CONFIG.tableSize,
                deleteObj: {},
                enableObj: {},
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
                colWidth: CONFIG.colWidth
            };
        },
        mounted () {
            try {

            } catch (error) {
                console.error(error);
            }
        },
        props: {
            columnTableList: {
                type: Array,
                default () {
                    return ['', '', '', '', '', '', '', '', '', '', '', ''];
                }
            },
            dbObject: {
                type: Object,
                default () {
                    return {
                        ori: [],
                        mid: [],
                        plat: [],
                        work: []
                    };
                }
            }
        },
        computed: {
            ...mapGetters(['DMEditObj', 'DMdbList', 'DMTableList', 'DMParameters', 'DMIsDetail', 'DMIsEdit', 'DMIsAdd', 'DMtotal', 'DMSelectMenu'])
        },
        created () {
            console.log('tag', 'created');
        },
        methods: {
            handleClose () {
                this.deleteVisible = false;
                this.enableVisible = false;
            },
            edit (data) {
                this.setDMEditObj(data);
                this.setDMIsEdit(true);
            },
            deleteItem (val) {
                this.deleteVisible = false;
                if (val) {
                    if (typeof this.deleteObj.enable === 'boolean') {
                        this.deleteObj.enableBool = this.deleteObj.enable;
                        if (this.deleteObj.enableBool) {
                            this.deleteObj.enable = 1;
                        } else {
                            this.deleteObj.enable = 0;
                        }
                    } else {
                        this.deleteObj.enable = 0;
                    }
                    this.deleteObj.deleteFlag = 1;
                    deteleSetting(this.deleteObj).then(res => {
                        this.requestDataDM();
                        this.getBussnissCode();
                        this.deleteObj = {};
                    });
                } else {
                    this.deleteObj = {};
                }
            },
            del (objc) {
                this.deleteObj = objc;
                // this.deleteVisible = true;
                let text = '是否删除此配置';
                let title = '提示';
                this._$confirm({content: text, title}).then(() => {
                    if (typeof this.deleteObj.enable === 'boolean') {
                        this.deleteObj.enableBool = this.deleteObj.enable;
                        if (this.deleteObj.enableBool) {
                            this.deleteObj.enable = 1;
                        } else {
                            this.deleteObj.enable = 0;
                        }
                    } else {
                        this.deleteObj.enable = 0;
                    }
                    this.deleteObj.deleteFlag = 1;
                    deteleSetting(this.deleteObj).then(res => {
                        this.requestDataDM();
                        this.getBussnissCode();
                        this.deleteObj = {};
                    });
                }).catch(() => {
                    this.deleteObj = {};
                    return false;
                });
            },
            detail (data) {

            },
            enableUse (val) {
                this.enableVisible = false;
                if (val) {
                    updateStatus(this.enableObj).then(res => {
                        this.requestDataDM();
                        this.getBussnissCode();
                    });
                } else {
                    this.deleteObj = {};
                }
            },
            handlerChange (id, data) {
                let objc = JSON.parse(JSON.stringify(id));
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
                    this.enableObj = objc2;
                    if (typeof this.enableObj.enable === 'boolean') {
                        this.enableObj.enableBool = this.enableObj.enable;
                        if (this.enableObj.enableBool) {
                            this.enableObj.enable = 1;
                        } else {
                            this.enableObj.enable = 0;
                        }
                    } else {
                        this.enableObj.enable = 0;
                    }
                    this.enableObj.enable = 1;
                    updateStatus(this.enableObj).then(res => {
                        this.requestDataDM();
                        this.getBussnissCode();
                        this.enableObj = {};

                    });
                } else {
                    let objc2 = Object.assign(objc, {enable: false});
                    this.enableObj = objc2;
                    if (typeof this.enableObj.enable === 'boolean') {
                        this.enableObj.enableBool = this.enableObj.enable;
                        if (this.enableObj.enableBool) {
                            this.enableObj.enable = 1;
                        } else {
                            this.enableObj.enable = 0;
                        }
                    } else {
                        this.enableObj.enable = 0;
                    }
                    this.enableObj.enable = 0;
                    let text = '是否禁用此配置';
                    let title = '提示';
                    this._$confirm({content: text, title}).then(() => {
                        updateStatus(this.enableObj).then(res => {
                            this.requestDataDM();
                            this.getBussnissCode();
                            this.enableObj = {};
                        });
                    }).catch(() => {
                        this.enableObj = {};
                        return false;
                    });
                }
            },
            oriDo (val) {
                try {
                    let list = this.DMdbList.ori || [];
                    let returnBack = '';
                    list.forEach(ele => {
                        if (ele.dbCode + '' === val + '') {
                            returnBack = ele.dbName;
                        }
                    });
                    return returnBack;
                } catch (error) {
                    console.error(error);
                }
            },
            midDo (val) {
                try {
                    let list = this.DMdbList.mid || [];
                    let returnBack = '';
                    list.forEach(ele => {
                        if (ele.dbCode + '' === val + '') {
                            returnBack = ele.dbName;
                        }
                    });
                    return returnBack;
                } catch (error) {
                    console.error(error);
                }
            },
            platDo (val) {
                try {
                    let list = this.DMdbList.plat || [];
                    let returnBack = '';
                    list.forEach(ele => {
                        if (ele.dbCode + '' === val + '') {
                            returnBack = ele.dbName;
                        }
                    });
                    return returnBack;
                } catch (error) {
                    
                }
            },
            workDo (val) {
                try {
                    let list = this.DMdbList.work || [];
                    let returnBack = '';
                    list.forEach(ele => {
                        if (ele.dbCode + '' === val + '') {
                            returnBack = ele.dbName;
                        }
                    });
                    return returnBack;
                } catch (error) {
                    console.error(error);
                }
            },
            ...mapMutations({
                setDMParameters: "setDMParameters",
                setDMIsDetail: "setDMIsDetail",
                setDMbussinessCodeList: 'setDMbussinessCodeList',
                setDMdbList: 'setDMdbList',
                setDMTableList: 'setDMTableList',
                setDMEditObj: 'setDMEditObj',
                setDMIsEdit: 'setDMIsEdit',
                setDMtotal: 'setDMtotal'
            }),
            ...mapActions(['getBussnissCode', 'requestDataDM'])
        },
        filters: {
            
            formatStatus (input) {
                return input ? '启用' : '禁用';
            },
            dateTimeDowith (datetime) {
                if (datetime === null || datetime === undefined) {
                    return '';
                }
                if (typeof datetime === 'number') {
                    let date = new Date(datetime);
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    let d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    let h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    let minute = date.getMinutes();
                    let second = date.getSeconds();
                    minute = minute < 10 ? ('0' + minute) : minute;
                    second = second < 10 ? ('0' + second) : second;
                    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
                }
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
    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }
</style>
