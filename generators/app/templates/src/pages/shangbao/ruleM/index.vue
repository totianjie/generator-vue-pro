<template>
    <section>
        <section class="page h-fill">
            <List-wrap v-if="bSing" v-model="page" :isAdd.sync="isAdd" :mainRuleId.sync="mainRuleId"/>    
            <add-sub-rule v-else v-model="page" :isAdd="isAdd" :mainRuleId.sync="mainRuleId"/>
        </section>
    </section>
</template>
<script>
const ListWrap = () => import("./List.vue");
const AddSubRule = () => import("./Add");

export default {
    data () {
        return {
            isAdd: true,
            page: 'list', // list add
            mainRuleId: "" // 主要用于编辑， 编辑项目的id
        };
    },
    computed: {
        bSing () {
            return this.page === 'list';
        }
    },
    mounted () {
        
    },
    methods: {
        
    },
    components: {
        ListWrap,
        AddSubRule
    }
};
</script>
<style lang="scss">
.el-dialog .el-dialog__header .el-dialog__title {
    display: inline-block;
    padding-left: 10px;
    border-left: 4px solid #4579C5;;
}
</style>


