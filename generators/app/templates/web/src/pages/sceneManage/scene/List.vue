<template>
    <section class="list-wrap">
        <section class="h-fill">
            <el-button @click="handlerAdd" type="primary" :size="btnSize" class="add-btn">新增</el-button>

            <list-table 
                style="width: 100%"
                @edit="handlerEdit"
                @detail="handlerDetail"
                :tableData="sceneList"
            />

            <v-paging
                class="footer-paging"
                :total="paging.total"
                ref="Fpage"
                @pagingChange="handlePagingChange"
            ></v-paging>
        </section>
    </section>
</template>
<script>
    import CONFIG from 'src/config';
    import ListTable from './components/ListTable';
    import {createNamespacedHelpers} from 'vuex';
    const {mapMutations, mapGetters, mapActions} = createNamespacedHelpers('scene');
    export default {
        data () {
            return {
                total: 0, // 分页总条数
                btnSize: CONFIG.homeBtn
            };
        },
        props: {
            
        },
        computed: {
            ...mapGetters(['paging', 'sceneList'])
        },
        created () {
        },
        methods: {
            // 新增
            handlerAdd () {
                this.getRuleTree().then(res => {
                    this.setPageType('firstStep');
                });
            },
            async handlerDetail ({appId}) {
                await this.getRuleTree();
                this.getInfoByAppid({appId}).then(() => {
                    this.setPageType('detail');
                });
            },
            // 编辑
            async handlerEdit ({appId}) {
                await this.getRuleTree();
                this.getInfoByAppid({appId}).then(() => {
                    this.setPageType('edit');
                });
            },
            // 分页变化
            handlePagingChange (data) {
                this.setPaging(data);
                this.getSceneList();
            },
            ...mapMutations(['setPageType', 'setPaging']),
            ...mapActions(['getSceneList', 'getRuleTree', 'getInfoByAppid'])
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
        .add-btn {
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


