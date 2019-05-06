<!-- 添加第一步 -->
<template>
    <section class="add-first-wrap">
        <div class="content">
            <el-col span="18" offset="3">
                <el-form ref="form" :model="params" :rules="rules" label-width="300px" :size="formSize">
                    <el-form-item prop="isAddTaskTemp" label="是否通过已有任务为模板创建任务：">
                        <el-radio-group v-model="params.isAddTaskTemp" @change="handleRadioChange" class="radio-group">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false" class="ml">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="taskCode" label="选择已有任务：" v-if="params.isAddTaskTemp">
                        <v-select 
                            :props="listProps" 
                            v-model="params.taskCode" 
                            :list="selectList" 
                            placeholder="请选择一个模板来去创建新的任务" 
                            :filterable="true" 
                            class="select-box"
                            @change="handleSelectChange"
                        />
                        <span class="preview" @click="handlePreview">预览</span>
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

import {
    taskAll as getBatchTasksTaskAll,
    get as getBatchTask
} from 'js/api/taskManage/batchTasks.js';
import {
    taskAll as getRunManageTaskAll,
    get as getRunManageTask
} from 'js/api/taskManage/runManage.js';

import {createNamespacedHelpers} from 'vuex';
const {mapMutations} = createNamespacedHelpers('taskManage');

export default {
    data () {
        return {
            btnSize: CONFIG.baseBtn,
            formSize: CONFIG.homeFormSize,
            rules: {
                isAddTaskTemp: [
                    {required: true, message: '请选择'}
                ],
                taskCode: [
                    {required: true, message: '请选择一个模板来去创建新的任务'}
                ]
            },
            // 页面结果
            params: {
                isAddTaskTemp: false,
                taskCode: ''
            },
            // 下拉框数据
            selectList: [],
            // 下拉框key value值
            listProps: {name: 'newLabel', value: 'newValue'},
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
    created () {
        if (this.pageFlag === "batchTasks") {
            this._getBatchTasksTaskAll();
        } else if (this.pageFlag === "runManage") {
            this._getRunManageTaskAll();
        }
    },
    methods: {
        async _getBatchTasksTaskAll () {
            let {data} = await getBatchTasksTaskAll({enable: "0"});
            this._setSelectData(data);
        },
        async _getRunManageTaskAll () {
            let {data} = await getRunManageTaskAll({enable: "0"});
            this._setSelectData(data);
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
            let {taskCode} = this.params;
            if (!taskCode) return false;
            if (this.pageFlag === "batchTasks") {
                this.setTaskCode(taskCode);
                this.setPreview(true);
            } else if (this.pageFlag === "runManage") {
                this.RMsetTaskCode(taskCode);
                this.RMsetPreview(true);
            }
        },
        handleRadioChange (checkd) {
            console.log("radio: ", checkd);
            this.params.isAddTaskTemp = checkd;
        },
        handleCancel () {
            this.$emit("cancel", {step: "first"});
        },
        handleNext () {
            this.$refs.form.validate(val => {
                if (!val) return false;
                console.log("通过");
                this.$emit("ok", {step: "first", isAddTaskTemp: this.params.isAddTaskTemp, result: this.taskTemp});
            });
        },
        // 选择模版
        handleSelectChange (val) {
            console.log(val);
            this.taskTemp = {};
            if (this.pageFlag === "batchTasks" && val) { // // batchTasks(批次划分任务) runManage(跑批任务)
                getBatchTask({taskCode: this.params.taskCode}).then(({data}) => {
                    this.taskTemp = Object.assign({}, data);
                });
            } else if (this.pageFlag === "runManage" && val) {
                getRunManageTask({taskCode: this.params.taskCode}).then(({data}) => {
                    this.taskTemp = Object.assign({}, data);
                });
            }
        },
        ...mapMutations(['setTaskCode', 'setPreview', 'RMsetTaskCode', 'RMsetPreview'])
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


