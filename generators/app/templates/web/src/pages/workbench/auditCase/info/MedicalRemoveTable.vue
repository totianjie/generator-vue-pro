<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 医嘱信息和收费明细去重后项目表格
-->
<template>
    <div class="wrap">
        <el-table
            class="table"
            :size="tableSize"
            :data="removeTableData"
            highlight-current-row
            border
            :stripe="true"
            height="calc(100% - 52px)"
            width="100%">
            <el-table-column
                label="序号"
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                prop="itemName"
                :label="`医院${labelText}名称`">
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                tableSize: CONFIG.tableSize
            };
        },
        props: {
            labelText: {
                type: String,
                default: ''
            },
            removeTableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .wrap{
        /*height: 100%;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*overflow: hidden;*/
        /*.table{*/
            /*flex: 1;*/
        /*}*/
        height: calc(100% - 52px - 48px);
        display: flex;
        flex-direction: column;
        .el-row{
            margin: 8px 0;
        }
        .search-wrap{
            height: 30px;
            /deep/ .wrap{
                height: 30px;
            }
            /deep/ .wrap .icon{
                position: absolute;
                left: 6px;
                top: 6px;
            }
            /deep/ .wrap .input{
                height: 29px;
            }
        }
        .btn-action{
            background-color: #4579C5;
            color: #fff;
        }
    }
</style>
