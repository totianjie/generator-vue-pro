<!-- 跑批任务新增 -->
<!-- 添加第二步 -->
<template>
    <el-form ref="form_other_run" :model="addParams" :rules="rules" label-width="200px" :size="formSize">
        <el-form-item prop="splitTaskCode" label="关联批次划分任务：">
            <v-select
                :props="listProps"
                v-model="addParams.splitTaskCode"
                :list="selectList"
                placeholder="请选择批次划分任务名称"
                :filterable="true"
            />
            <span class="look-over-btn" @click="handleLookOver">查看</span>
        </el-form-item>
        <el-form-item prop="appId" label="场景名称：">
            <v-select
                :props="listProps"
                @appearEvent="changeAppName"
                v-model="addParams.appId"
                ref="selectRef"
                :list="appids"
                placeholder="请选择场景名称"
                :filterable="true"
            />
        </el-form-item>
        <!-- <el-form-item prop="code2" label="数据单病例URL：">
            <el-input v-model.trim="addParams.code2" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="code2" label="统计URL：">
            <el-input v-model.trim="addParams.code3" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="code4" label="tokenURL：">
            <el-input v-model.trim="addParams.code4" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="code5" label="场景ID：">
            <el-input v-model.trim="addParams.code5" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="code6" label="最大线程数：">
            <el-input v-model.trim="addParams.code6" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="code7" label="请输入SQL：">
            <el-input v-model.trim="addParams.code7" placeholder="请输入"></el-input>
        </el-form-item> -->
        <!--<el-form-item prop="beginHandle" label="清除前一次结果：">
            <el-radio-group v-model="addParams.beginHandle" class="w-fill">
                <el-col :span="8">
                    <el-radio :label="1" class="block">全部清空</el-radio>
                </el-col>
                <el-col :span="8">
                    <el-radio label="2" class="block">部分清空</el-radio>
                </el-col>
                <el-col :span="8">
                    <el-radio :label="3" class="block">不清除</el-radio>
                </el-col>
            </el-radio-group>
        </el-form-item>-->
        <!--<el-form-item prop="errorHandle" label="跑批异常处理：">
            <el-radio-group v-model="addParams.errorHandle" class="w-fill">
                <el-col :span="8">
                    <el-radio :label="1" class="block">终止并清空</el-radio>
                </el-col>
                <el-col :span="8">
                    <el-radio :label="2" class="block">终止并保留</el-radio>
                </el-col>
                <el-col :span="8">
                    <el-radio :label="3" class="block">不终止</el-radio>
                </el-col>
            </el-radio-group>
        </el-form-item>  -->
    </el-form>
</template>
<script>
    import CONFIG from 'src/config';
    import {appids} from 'js/api/taskManage/runManage.js';
    import {taskAll} from 'js/api/taskManage/batchTasks.js';

    import {createNamespacedHelpers} from 'vuex';
    const {mapMutations} = createNamespacedHelpers('taskManage');
    export default {
        data () {
            return {
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.homeFormSize,
                rules: {
                    splitTaskCode: [{required: true, message: '请选择批次划分任务名称'}],
                    code2: [{required: true, message: '请输入'}],
                    code3: [{required: true, message: '请输入'}],
                    code4: [{required: true, message: '请输入'}],
                    code5: [{required: true, message: '请输入'}],
                    code6: [{required: true, message: '请输入'}],
                    // code7: [{required: true, message: '请输入'}],
                    beginHandle: [{required: true, message: '请选择'}],
                    errorHandle: [{required: true, message: '请选择'}],
                    appId: [{required: true, message: '请选择场景名称'}]
                },
                // 下拉框数据
                selectList: [],
                // 下拉框key value值
                listProps: {name: 'keyName', value: 'keyValue'},
                appids: []
            };
        },
        watch: {
            splitTaskCode_ (new_, old_) {
                this.changeSplitTaskCode(this.addParams.splitTaskCode, old_ === undefined);
            }
        },
        props: {
            addParams: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        computed: {
            splitTaskCode_ () {
                return this.addParams.splitTaskCode;
            }
        },
        created () {
            taskAll({enable: 0}).then(({data}) => {
                this.selectList = [];
                data.forEach((item) => {
                    this.selectList.push({
                        keyName: item.taskName,
                        keyValue: item.taskCode
                    });
                });
            });
            console.log(this.addParams.splitTaskCode);
        },
        mounted () {
            console.log(this.addParams.splitTaskCode);
            this.form2 = this.$refs.form_other_run;
        },
        methods: {
            changeAppName (val) {
                console.log('changeAppName', val, this.addParams.splitTaskCode);
                if (!this.addParams.splitTaskCode) {
                    this.$toast('请先选择批次划分任务名称才能选择和修改场景名称');
                    this.$refs.selectRef.blurEvent();
                }
            },
            changeSplitTaskCode (val, isNew = false) {
                if (!isNew) {
                    this.addParams.appId = '';
                }
                this.appids = [];
                if (val) {
                    appids({splitTaskCode: val}).then(({data}) => {
                        data.forEach((item) => {
                            this.appids.push({
                                keyName: item.appName || item.appId,
                                keyValue: item.appId
                            });
                        });
                    });
                }
            },
            async _test () {
                return await new Promise((resolve, reject) => this.form2.validate(val => val ? resolve(val) : reject(val)));
            },
            handleLookOver () { // 查看
                let {splitTaskCode} = this.addParams;
                console.log(splitTaskCode);
                if (splitTaskCode) {
                    this.RMsetPreviewTaskCode(splitTaskCode);
                    this.RMsetPreview2(true);
                }
            },
            ...mapMutations(["RMsetPreview2", "RMsetPreviewTaskCode"])
        }
    };
</script>

<style lang="scss" scoped>
    .look-over-btn {
        position: absolute;
        right: -30px;
        color: #4579C5;
        cursor: pointer;
    }

    .look-over-btn {
        top: 0;
    }
</style>


