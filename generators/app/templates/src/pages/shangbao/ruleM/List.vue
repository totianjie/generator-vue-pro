<template>
    <section class="list-wrap">
        <section class="page h-fill">
            <div class="btn-group">
                <el-button @click="handleAdd" :size="btnSize" type="primary" class="add-btn">新增</el-button>
                <el-button @click="handleAudit" :size="btnSize" type="primary" class="add-btn">审核</el-button>
                <el-button @click="handleDelete" :size="btnSize" type="primary" class="add-btn">删除</el-button>
            </div>

            <list-table
                style="width: 100%"
                v-model="selectList"
                @edit="handleEdit"
                :listParams.sync="listParams"
                :total.sync="total"
                ref="listTable"
            />

            <v-paging
                class="footer-paging"
                :total="total"
                ref="paging"
                @pagingChange="handlePagingChange"
            ></v-paging>
        </section>
    </section>

</template>
<script>
    import CONFIG from 'src/config';
    import ListTable from './ListTable';
    import {deleteRule, auditRule} from 'src/js/api/shangbao/ruleM';
    export default {
        data () {
            return {
                total: 0, // 分页总条数
                btnSize: CONFIG.homeBtn,
                listParams: { // 请求参数
                    offset: 1,
                    limit: CONFIG.limit
                },
                // 已选择的表格项
                selectList: []
            };
        },
        props: {
            value: {
                type: String,
                default () {
                    return 'list';
                }
            },
            isAdd: {
                type: Boolean,
                default () {
                    return true;
                }
            },
            mainRuleId: {
                type: String,
                default () {
                    return "";
                }
            }
        },
        mounted () {
            this.listTable = this.$refs.listTable;
            this.pagingVue = this.$refs.paging;
        },
        methods: {
            _refresh () {
                this.listTable._getData().then(res => {
                    this.selectList.length = 0;
                });
            },
            _inttPaging () {
                // 初始化分页
                this.pagingVue._init();
                this.listParams = { // 分页参数
                    offset: 1,
                    limit: CONFIG.limit
                };
            },
            handleAdd () {
                console.log("添加");
                this.$emit('input', 'add');
                this.$emit('update:isAdd', true);
            },
            async handleAudit () {
                console.log('审核');
                if (this.selectList.length === 0) {
                    this.$toast("请先选择");
                    return false;
                }
                console.log(this.selectList.map(item => item.mainRuleId).join(','));
                await auditRule({ids: this.selectList.map(item => item.mainRuleId).join(',')});
                this._refresh();
                this._inttPaging();
            },
            async handleDelete () {
                console.log('删除');
                if (this.selectList.length === 0) {
                    this.$toast("请先选择");
                    return false;
                }
                await deleteRule({ids: this.selectList.map(item => item.mainRuleId).join(',')});
                this._refresh();
                this._inttPaging();

            },
            handleEdit (row) {
                console.log("row编辑", row);
                this.$emit("update:mainRuleId", row.mainRuleId);
                this.$emit('input', 'add');
                this.$emit('update:isAdd', false);
            },
            // 分页变化
            handlePagingChange (data) {
                console.log(data);
                this.listParams = Object.assign({}, this.listParams, data);
                setTimeout(() => {
                    this._refresh();
                });
            }
        },
        components: {
            ListTable
        }
    };
</script>
<style lang="scss" scoped>
    @import "./../../../scss/common";
    @import "./../../../scss/variables";
    .list-wrap {
        height: 100%;
        padding: 48px 0 52px;
        box-sizing: border-box;
        position: relative;
        .btn-group {
            position: absolute;
            left: 23px;
            top: 9px;
        }
        .footer-paging {
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
</style>


