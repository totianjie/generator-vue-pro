<template>
    <section>
        <el-tree
            ref="tree"
            :data="ruleTreeData"
            show-checkbox
            node-key="ruleNo"
            :default-checked-keys="checkedKeys"
            :props="defaultProps"
            empty-text="暂无数据"
            default-expand-all
        >
            <span class="custom-tree-node" slot-scope="{ node }">
                <span class="tree-label text-ellipsis" v-text="node.label" :title="node.label" />
            </span>
        </el-tree>
        <el-button @click="getCheckedNodes">获取nodes</el-button>
        <el-button @click="setCheckedNodes">设置nodes</el-button>
    </section>
</template>
<script>
import {parentId2Children} from 'js/utils/utils';
export default {
    data () {
        return {
            ruleTreeData: [],
            checkedKeys: [],
            defaultProps: {
                children: 'children',
                label: 'treeName'
            }
        };
    },
    mounted () {
        let arr = [
            {
                "treeId": "1",
                "treeName": "tree_01",
                "parentId": "",
                "ruleList": [
                    {
                        "ruleNo": "1",
                        "ruleName": "药品"
                    }
                ]
            },
            {
                "treeId": "2",
                "treeName": "tree_02",
                "parentId": "1",
                "ruleList": [
                    {
                        "ruleNo": "2",
                        "ruleName": "诊疗"
                    }
                ]
            }
        ];
        console.log("init==>: ", arr);
        let result = parentId2Children(arr, {id: 'treeId', pid: 'parentId', childrenName: 'children'});
        console.log("result==>: ", JSON.parse(JSON.stringify(result)));

        this.ruleTreeData = Object.assign([], result);
        this._formatData(this.ruleTreeData);
        console.log("format==>: ", this.ruleTreeData);
    },
    methods: {
        _formatData (arr) {
            arr.forEach(element => {
                if (Array.isArray(element.ruleList)) {
                    element.children = element.children.concat(element.ruleList);
                    this._formatData(element.children);
                }
            });
        },
        getCheckedNodes () {
            let nodes = this.$refs.tree.getCheckedNodes();
            console.log("nodes: ", nodes);
        },
        setCheckedNodes () {
            this.$refs.tree.setCheckedNodes([{ruleNo: "2"}]);
        }
        
    }
};
</script>

