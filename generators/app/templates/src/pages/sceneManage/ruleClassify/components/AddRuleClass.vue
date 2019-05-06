<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div class="add-wrap class-height" @click="treeShow = false">
        <el-col :span="15" :offset="4">
            <el-form ref="addFromRef" :model="RCEditData" :rules="rules" label-width="120px">
                <el-form-item label="状态：" prop="currentStatus">
                    <el-input v-model="currentStatus" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="父级分类名称：" prop="parentClassName" v-if="!RCIsHaveFather">
                    <el-input v-model="RCEditData.parentClassName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="分类名称：" prop="className">
                    <el-input v-model="RCEditData.className" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input
                        :rows="3"
                        type="textarea"
                        autosize
                        v-model="RCEditData.remark"
                        maxlength="200"
                        placeholder="在此添加备注">
                    </el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="cancelBtn">取消</el-button>
                    <el-button type="primary" @click="submitBtn">确定</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('scene/ruleClassify');
    export default {
        data () {
            return {
                bSing: false,
                treeShow: false,
                rules: Object.assign({}, {}, {
                    className: [
                        { required: true, message: '请输入分类名称'}
                    ]
                })
            };
        },
        computed: {
            currentStatus () {
                if (this.RCPageSatus === 'add') {
                    return '新增分类';
                } else if (this.RCPageSatus === 'edit') {
                    return '编辑分类';
                }
            },
            ...mapGetters(['RCPageSatus', 'RCCurrentNodeKey', 'RCIsHaveFather', 'RCEditData'])
        },
        props: {
        },
        mounted () {

        },
        created () {
        },
        methods: {
            cancelBtn (data) {
                this.setRCEditData({});
                this.setRCPageSatus('detail');
            },
            submitBtn () {
                this.selectRuleClass = true;
                this.$refs.addFromRef.validate(value => {
                    if (!value) {
                        return false;
                    }
                    if (this.RCPageSatus === 'edit') {
                        this.editRuleClass(this.RCEditData);
                    } else {
                        this.addRuleClass(this.RCEditData);
                    }
                });
            },
            ...mapActions(['addRuleClass', 'editRuleClass']),
            ...mapMutations(['setRCEditData', 'setRCFatherClassId', 'setRCIsHaveFather', 'setRCPageSatus', 'setRCCurrentNodeKey'])
        }
    };
</script>

<style lang="scss" scoped>
    .add-wrap{
        padding-top: 40px;
    }
    .dataTree{
        max-height:200px;
        padding: 8px 0;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #fff;
        overflow: auto;
    }
    .class-height{
        height: 100%;
    }
</style>
