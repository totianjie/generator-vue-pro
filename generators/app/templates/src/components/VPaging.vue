<!--
* @Author: mikey.TIANJIE
* @Date: 2018-06-08 13:38:09
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-07-12 13:38:09
* @remark: 公共分页组件
* @params: total   总条数
* @return: pagingChange  分页改变时的事件
-->
<template>
    <div class="v-page">
        <el-pagination
            :small="small"
            class="page-wrap"
            :class="className"
            v-if="bSing"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :layout="layout"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                newCurrentPage: 1,
                bSing: true,
                newPageSize: CONFIG.limit
            };
        },
        props: {
            currentPage: {
                type: Number,
                default () {
                    return 1;
                }
            },
            total: {
                type: Number,
                default () {
                    return 0;
                }
            },
            pageSize: {
                type: Number,
                default () {
                    return CONFIG.limit;
                }
            },
            pageSizes: {
                type: Array,
                default () {
                    return CONFIG.pageSizes;
                }
            },
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            small: {
                type: Boolean,
                default: false
            },
            className: {
                type: [String, Array, Object],
                default: ''
            }
        },
        computed: {
            pageData () {
                return {
                    offset: this.newCurrentPage,
                    limit: this.newPageSize
                };
            }
        },

        methods: {
            handleSizeChange (val) {
                this.newPageSize = val;
                this.$emit('pagingChange', this.pageData);
            },
            handleCurrentChange (val) {
                console.log(val);
                this.newCurrentPage = val;
                this.$emit('pagingChange', this.pageData);
            },
            _init () {
                this.newCurrentPage = 1;
                this.newPageSize = this.pageSize;
                this.bSing = false;
                setTimeout(() => {
                    this.bSing = true;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .v-page {
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .page-wrap {
            float: right;
        }
    }
</style>
