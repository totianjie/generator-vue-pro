<!-- Created by TIANJIE on 2018/6/9 -->
<template>
    <div>
        <el-table
            :size="tableSize"
            :data="tableData"
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
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diseaseHeadVersionName"
                label="版本名称" width=230>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diseaseCode"
                label="标准疾病编码" width=150>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diseaseName"
                label="标准疾病名称">
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diseaseCodeAdd"
                label="附加编码" width=150>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="diagnosis"
                label="入径诊断标记" width=100>
            </el-table-column>
            <el-table-column
                :min-width="colWidth"
                show-overflow-tooltip
                prop="updateTime"
                label="修改时间" width=140>
                <template slot-scope="scope">
                    {{scope.row.updateBy || scope.row.updateTime | dateTimeDowith }}
                </template>
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
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            },
            coloumns: {
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
            }
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

<style scoped lang="scss">
</style>
