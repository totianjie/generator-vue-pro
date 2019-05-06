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
            :data="ListData"
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
                prop="name"
                label="许可证名称"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="mac"
                label="mac地址"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="validTime"
                label="有效时长(天)"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="craeteUser"
                label="创建人"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="createTime"
                label="创建时间"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    {{scope.row.createTime | dateTimeDowith }}
                </template>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                prop="remark"
                show-overflow-tooltip
                label="备注">
            </el-table-column>
            <el-table-column width="70" label="操作">
                <template slot-scope="scope">
                    <el-button class="edit-btn-class" @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('safeManage');
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
            ...mapGetters(['ListData'])
        },
        methods: {
            // 编辑
            handleDetail (data) {
                console.log('查看', data);
                this.getDetail(data);
                this.setPageType("detail");
            },
            ...mapMutations(['setPageType', 'setParameters']),
            ...mapActions(['getDetail'])
        },
        filters: {
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
<style lang="scss" scoped>
    /deep/ .el-table th.gutter{
        display: table-cell!important;
    }

    /deep/ .el-table colgroup.gutter{
        display: table-cell!important;
    }
    @import "./../../../scss/common";
    @import "./../../../scss/variables";
    .edit-btn-class{
        color: $base-color !important;
        // font-size: 12px;
        // font-weight: 400;
    }
</style>
