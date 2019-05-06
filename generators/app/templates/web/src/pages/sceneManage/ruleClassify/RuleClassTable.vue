<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div>
        <div class="btn-wrap">
            <el-button size="small" plain icon="iconfont icon-xinjian-weidianji" @click="addClassFirst"><span class="text">新增一级分类</span></el-button>
            <el-button size="small" plain icon="iconfont icon-shanchu-weidianji" @click="addClassChild"><span class="text">新增子分类</span></el-button>
            <el-button size="small" plain icon="iconfont icon-xiugai-weidianji"  @click="editInfo"><span class="text">编辑</span></el-button>
            <el-button size="small" plain icon="iconfont icon-shanchu-weidianji" @click="delInfo"><span class="text">删除</span></el-button>
        </div>
        <div class="ruleClass-wrap">
            <el-tree
                class="tree"
                ref="treeRef"
                :default-expand-all="true"
                :data="RCRuleTreeData" 
                node-key="ruleNo"
                empty-text="暂无数据"
                :highlight-current="true"
                :props="defaultProps" 
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
            >
            </el-tree>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('scene/ruleClassify');
    export default {
        props: {
            tableData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                console.log(this.$refs.treeRef);
                console.log(this.RCCurrentNodeKey);
                if (this.RCCurrentNodeKey === -1) {
                    this.$refs.treeRef.setCurrentKey();
                    return;
                }
                try {
                    this.$refs.treeRef.setCurrentKey(this.RCCurrentNodeKey);
                } catch (error) {
                    console.error(error);
                }
            });
            setTimeout(() => {
                console.log(this.$refs.treeRef);
                console.log(this.RCCurrentNodeKey);
                if (this.RCCurrentNodeKey === -1) {
                    this.$refs.treeRef.setCurrentKey();
                    return;
                }
                try {
                    this.$refs.treeRef.setCurrentKey(this.RCCurrentNodeKey);
                } catch (error) {
                    console.error(error);
                }
            }, 100);
        },
        data () {
            return {
                currentNode: {
                },
                defaultProps: {
                    children: 'children',
                    label: 'ruleName'
                },
                tableSize: CONFIG.tableSize,
                colWidth: CONFIG.colWidth
            };
        },

        computed: {
            ...mapGetters(['RCPageSatus', 'RCDetailData', 'RCpageSatus', 'RCRuleTreeData', 'RCCurrentNodeKey', 'RCIsHaveFather'])
        },

        watch: {
            RCCurrentNodeKey (val) {
                console.log("RCCurrentNodeKey", val);
                if (val === '-1') {
                    this.$refs.treeRef.setCurrentKey();
                } else {
                    this.$nextTick(() => {
                        this.$refs.treeRef.setCurrentKey(val);
                    });
                }
            },
            RCPageSatus (new_, old_) {
                if (new_ === 'detail' && old_ !== 'cancel') {
                    this.$nextTick(() => {
                        console.log('RCPageSatus', new_, old_);
                        this.$refs.treeRef.setCurrentKey(this.RCCurrentNodeKey);
                    });
                }
            }
        },
        created () {
            
        },
        
        methods: {
            addClassFirst () {
                this.setRCIsHaveFather(true);
                this.setRCPageSatus('add');
                let {name} = JSON.parse(sessionStorage.getItem('user_info'));
                this.setRCEditData({createUser: name});
            },
            addClassChild () {
                if (!this.currentNode.className) {
                    this.currentNode = this.RCDetailData;
                }
                this.setRCIsHaveFather(false);
                this.setRCPageSatus('add');
                let {name} = JSON.parse(sessionStorage.getItem('user_info'));
                let obj = Object.assign({}, {createUser: name}, {parentClassName: this.currentNode.ruleName, parentClassNo: this.currentNode.ruleNo, parentId: this.currentNode.id});
                this.setRCEditData(obj);
            },
            editInfo () {
                if (!this.currentNode.className) {
                    this.currentNode = this.RCDetailData;
                }
                if (this.currentNode.parentId) {
                    this.setRCIsHaveFather(false);
                } else {
                    this.setRCIsHaveFather(true);
                }
                this.setRCCurrentNodeKey(this.currentNode.ruleNo);
                let obj = Object.assign({}, this.currentNode);
                this.setRCEditData(obj);
                this.setRCPageSatus('edit');
            },
            delInfo () {
                let text = '请确认是否要删除此分类';
                let title = '提示';
                this.setRCCurrentNodeKey(this.currentNode.ruleNo);
                this._$confirm({content: text, title}).then(() => {
                    this.deleteRuleClass(this.currentNode);
                }).catch(() => {
                    return false;
                });
            },
            filterNode (value, data) {
                if (!value) return true;
                return data[this.defaultProps.label].indexOf(value) !== -1;
            },
            handleNodeClick (val) {
                console.log("handleNodeClick", JSON.stringify(val));
                if (this.RCpageSatus !== 'detail') {
                    this.setRCPageSatus('detail');
                }
                let obj = Object.assign({}, val, {className: val.ruleName, classNo: val.ruleNo});
                this.currentNode = obj;
                this.setRCDetailData(obj);

            },
            ...mapActions(['getRuleClassTree', 'deleteRuleClass']),
            ...mapMutations(['setRCFatherClassId', 'setRCIsHaveFather', 'setRCPageSatus', 'setRCCurrentNodeKey', 'setRCDetailData', 'setRCEditData'])
        },

        filters: {

        },
        components: {

        }
    };
</script>
<style lang="scss" scoped>
@import "./../../../scss/common";
@import "./../../../scss/variables";
    .btn-wrap{
        margin: 20px 0 8px 15px;
        .iconfont{
            margin-right:8px;
        }
        .text{
            padding-left: 6px;
        }
    }
    .ruleClass-wrap{
        width:450px;
        height: 100%;
        border:1px solid #dcdfe6;
        border-radius: 4px;
        padding:8px;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-left: 15px;
    }
    .ruleClass-wrap .tree {
        .active{
            color: $base-color !important;
            background: rgb(243, 248, 251);
        }
        .ruleClassGroupName{
            margin-left: 5px;
        }
        .tree-text{
            .item{
                .ruleClassName{
                    padding: 0 35px 0 68px;
                }
            }
        }
        .item {
            width: 100%;
            cursor: pointer;
            .text {
                width: 100%;
                box-sizing: border-box;
                line-height: 32px;
                position: relative;
                padding: 0 30px 0 35px;
                .left-icon{
                    position: absolute;
                    top: 8px;
                }
                .add-icon{
                    position: absolute;
                    top: 2px;
                }
                .add-icon:hover{
                    cursor: pointer;
                    color: $base-color !important;
                }
                .left-icon {
                    left: 13px;
                }
                .add-icon {
                    right: 10px;
                    padding: 5px;
                }
            }
            ul > .text {
                padding-left: 10px;
            }
        }
    }
    .addruleClassBtn{
        color: #333;
    }
</style>
