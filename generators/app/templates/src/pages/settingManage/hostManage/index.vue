<!--
* @Author: GOTINTIN
* @Date: 2019-1-22
* @remark: 跑批主机管理
-->
<template>
    <section class="page">
        <list v-if="bSing" v-model="page" :isAdd.sync="isAdd" :rbsClientId.sync="rbsClientId"></list>
        <add v-else v-model="page" :isAdd="isAdd" :rbsClientId.sync="rbsClientId"></add>
    </section>
</template>
<script type="text/ecmascript-6">
    import List from './List';
    import Add from './Add';
    export default {
        data () {
            return {
                isAdd: true, // 默认新增页面为true
                page: 'list', // 列表页=list 新增页=add
                rbsClientId: '' // 主要用于编辑，编辑的id
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
        components: {List, Add}
    };
</script>
<style lang="scss" scoped>
</style>
