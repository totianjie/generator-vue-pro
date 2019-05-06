<template>
    <div>
        <el-tree
            :data="treeList"
            node-key="id"
            show-checkbox
            ref="tree"
            :props="defaultProps"
            empty-text="暂无数据..."
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
        >
        </el-tree>

        <!--
            **获取当前选中的数据     check-change其实没多大用处
            this.$refs.tree.getCheckedNodes()
            this.$refs.tree.getCheckedKeys()

            :data="treeData"                    表格的数据
            :props="prop"                       显示的字段名
            show-checkbox                       显示checkbox组件
            accordion                           手风琴效果
            @node-click="handleNodeClick"       节点点击时， 返回的是当前节点的数据
            @check-change="handleCheckChange"   checkbox点击变化时
            empty-text="暂无数据..."            无数据时显示的文字
            node-key=""                         当前数据的唯一id

            highlight-current                   是否高亮当前选中的节点
            default-expand-all                  是否默认展开所有节点
            expand-on-click-node                点击图标下拉  还是  点击当前行就可下拉   默认是点击当前行

        -->

        <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            getCheckedNodes () {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys () {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes () {
                this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }]);
            },
            setCheckedKeys () {
                this.$refs.tree.setCheckedKeys([3]);
            },
            resetChecked () {
                this.$refs.tree.setCheckedKeys([]);
            },

            // 节点点击
            handleNodeClick (data) {
                console.log(`节点点击:`, data);
            },
            // checkbox 点击
            handleCheckChange (data, checked, indeterminate) {
                console.log(`checkbox 点击:`, data, checked, indeterminate);
            }
        },
        data () {
            return {
                treeList: [
                    {
                        id: 1,
                        label: '目录1',
                        children: [
                            {
                                id: 2,
                                label: '目录1-1'
                            },
                            {
                                id: 6,
                                label: '目录1-1'
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '目录2',
                        children: [
                            {
                                id: 4,
                                label: '目录2-1',
                                children: [
                                    {
                                        id: 5,
                                        label: '目录2-2'
                                    },
                                    {
                                        id: 9,
                                        label: '目录2-2'
                                    }
                                ]
                            },
                            {
                                id: 7,
                                label: '目录2-1',
                                children: [
                                    {
                                        id: 8,
                                        label: '目录2-2'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                defaultProps: {children: 'children', label: 'label'}
            };
        }
    };
</script>
