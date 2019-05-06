<!-- Created by TIANJIE on 2018/6/4 -->
<template>
    <div>
        <div class="page">
            <el-tree
                :data="treeData"
                :props="defaultProps"
                @node-click="handleClick"
                node-key="id"
                show-checkbox
                accordion
                @check-change="handleCheckChange"
            >
            </el-tree>
            <!--
                :data="treeData"            表格的数据
                :props="prop"               显示的字段名
                @node-click="handleClick"   节点点击时， 返回的是当前节点的数据

            -->
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'TestTree',
        data () {
            return {
                treeData: [
                    {
                        name: '1',
                        id: 1,
                        children: [{name: '2', id: 2, children: [{name: 3, id: 3}]}]
                    },
                    {
                        name: '1',
                        id: 4,
                        children: [{name: '2', id: 5, children: [{name: 3, id: 6}]}]
                    },
                    {
                        name: '1',
                        id: 7,
                        children: [{name: '2', id: 8, children: [{name: 3, id: 9}]}]
                    }
                ],
                defaultProps: {children: 'children', label: 'name'}
            };
        },
        methods: {
            handleClick (data) {
                console.log(`节点点击`, data);
            },
            handleCheckChange (data, checked, indeterminate) {
                console.log(`checkbox点击：`, data, checked, indeterminate);
            }
        }
    };
</script>
<style lang="scss" scoped>
</style>
