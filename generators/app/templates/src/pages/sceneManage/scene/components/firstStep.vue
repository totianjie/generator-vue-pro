<!-- 添加第一步 -->
<template>
    <section class="add-first-wrap">
        <div class="content">
            <el-col span="18" offset="3">
                <el-form ref="form" :model="params" :rules="rules" label-width="300px" :size="formSize">
                    <el-form-item prop="isNewCopy" label="新建场景还是复制场景：">
                        <el-radio-group v-model="params.isNewCopy" @change="handleRadioChange" class="radio-group">
                            <el-radio :label="false">新建</el-radio>
                            <el-radio :label="true" class="ml">复制</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="appId" label="请选择已有场景：" v-if="params.isNewCopy">
                        <v-select 
                            :props="listProps" 
                            v-model="params.appId" 
                            :list="sceneList" 
                            placeholder="请选择已有场景" 
                            :filterable="true" 
                            class="select-box"
                            @change="handleSelectChange"
                        />
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
        <footer class="footer">
            <el-button :size="btnSize" @click="handleCancel">取消</el-button>
            <el-button :size="btnSize" type="primary" @click="handleNext">下一步</el-button>
        </footer>
    </section>
</template>
<script>
import CONFIG from 'src/config';
import {createNamespacedHelpers} from 'vuex';
const {mapMutations, mapActions, mapGetters} = createNamespacedHelpers('scene');

export default {
    data () {
        return {
            btnSize: CONFIG.baseBtn,
            formSize: CONFIG.homeFormSize,
            rules: {
                isNewCopy: [
                    {required: true, message: '请选择'}
                ],
                appId: [
                    {required: true, message: '请选择一个模板来去创建新的任务'}
                ]
            },
            // 页面结果
            params: {
                isNewCopy: false,
                appId: ''
            },
            // 下拉框数据
            selectList: [],
            // 下拉框key value值
            listProps: {name: 'appName', value: 'appId'},
            taskTemp: null

        };
    },
    props: {
        pageFlag: { // batchTasks(批次划分任务) runManage(跑批任务)
            type: String,
            default: function () {
                return "";
            }
        }
    },
    computed: {
        ...mapGetters(['paging', 'sceneList'])
    },
    created () {
        this._scenceAll();
    },
    methods: {
        async _scenceAll () {
            // let {data} = await _scenceAll({enable: "0"});
            this._setSelectData({"taskName": '', "taskCode": ''});
        },
        _setSelectData (list) {
            if (Array.isArray(list)) {
                list.forEach((item) => {
                    item.newLabel = item.taskName;
                    item.newValue = item.taskCode;
                });
                this.selectList = Object.assign([], list);
            }
        },
        // 预览
        handlePreview () {
            console.log("预览");
            console.log(this.params);
        },
        handleRadioChange (checkd) {
            console.log("radio: ", checkd);
            this.params.isAddTaskTemp = checkd;
        },
        handleCancel () {
            this.setPageType("list");
        },
        async getData ({appId}) {
            await this.getRuleTree();
            this.getInfoByAppid({appId}).then(() => {
            });
        },
        handleNext () {
            this.$refs.form.validate(val => {
                if (!val) return false;
                console.log("通过");
                console.log(val);
                if (this.params.isNewCopy) {
                    this.getData(this.params);
                    this.setPageType("addCopy");
                } else {
                    this.setPageType("add");
                }
            });
        },
        handleSelectChange (val) {
            console.log(val);
        },
        ...mapMutations(['setPageType', 'setPaging']),
        ...mapActions(['getSceneList', 'getRuleTree', 'getInfoByAppid'])
    }
};
</script>
<style lang="scss" scoped>
.add-first-wrap {
    display: flex;
    flex-direction: column;
    .content{
        flex: 1;
        padding-top: 39px;
        .radio-group {
            // margin-top: 8px;
            .ml{
                margin-left: 57px;;
            }
        }
        .select-box {
            display: inline-block;
            width: calc(100% - 50px);
        }
        .preview {
            color: #4579C5;
            cursor: pointer;
        }
    }
    .footer {
        height: 80px;
        text-align: center;
    }
}
</style>


