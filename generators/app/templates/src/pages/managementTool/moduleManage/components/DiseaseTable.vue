<!-- Created by TIANJIE on 2018/6/9 -->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="diseaseList"
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
                width="70"
            >
            </el-table-column>
            <el-table-column
                label="临床路径名称"
                show-overflow-tooltip
                prop="name"
                width="250"
                :min-width="colWidth"
            >
            </el-table-column>
            <el-table-column
                label="备注"
                width="180"
                show-overflow-tooltip
                prop="remark"
                :min-width="colWidth"
            >
            </el-table-column>
            <el-table-column
                label="版本：1普通，2手术版，3化疗，4放疗，5手术+化疗，6手术+放疗，7手术+放疗+化疗，8化疗+放疗"
                show-overflow-tooltip
                :min-width="colWidth"
                prop="version"
            >
                <!-- <template slot-scope="scope">
                    {{scope.row.version | formatVersion }}
                </template> -->
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="type"     
                width="200"
                label="类型：1全国，2县级">
                <!-- <template slot-scope="scope">
                    {{scope.row.type | formatType }}
                </template> -->
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="releaseTime"
                width="120"
                label="发布时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth
            };
        },
        props: {
            diseaseList: {
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
            }
        },
        filters: {
            dateTimeDowith (datetime) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            },
            formatType (type_) {
                let s = parseInt(type_);
                if (isNaN(s)) {
                    return type_;
                }
                switch (type_) {
                case 1: {
                    return '普通';
                }
                case 2: {
                    return '手术版';
                }
                case 3: {
                    return '化疗';
                }
                case 4: {
                    return '放疗';
                }
                case 5: {
                    return '手术+化疗';
                }
                case 6: {
                    return '手术+放疗';
                }
                case 7: {
                    return '手术+放疗+化疗';
                }
                case 8: {
                    return '化疗+放疗';
                }
                default: {
                    return '其他';
                }
                }
            },
            formatVersion (version_) {
                let v_ = parseInt(version_);
                if (isNaN(v_)) {
                    return version_;
                }
                switch (version_) {
                case 1: {
                    return '全国';
                }
                case 2: {
                    return '县级';
                }
                default: {
                    return '其他';
                }
                }
            }
        }
    };
</script>

<style scoped lang="scss">
@import "./../../../../scss/common";
@import "./../../../../scss/variables";
.deepBlue{
    color: $base-color;
}
/deep/ .el-table th.gutter{
    display: table-cell!important;
}

/deep/ .el-table colgroup.gutter{
    display: table-cell!important;
}
</style>
