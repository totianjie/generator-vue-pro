<!-- 添加第二步 -->
<template>
    <section class="add-second-wrap">
        <el-row class="content">
            <el-col :span="12">
                <form-com ref="form_com" :addParams="addParams" :pageFlag="pageFlag"/>
            </el-col>
            <el-col :span="12">
                <form-other ref="form_other" v-if="pageFlag === 'batchTasks'" :addParams="addParams"/>
                <form-other-run ref="form_other_run" v-if="pageFlag === 'runManage'" :addParams="addParams"/>
            </el-col>
        </el-row>
        <footer class="footer-wrap">
            <el-button :size="btnSize" @click="handleCancel">取消</el-button>
            <el-button :size="btnSize" type="primary" @click="handleOk">确定</el-button>
        </footer>
    </section>
</template>
<script>
    import CONFIG from 'src/config';
    import FormCom from './FormCom';
    import FormOther from './FormOther';
    import FormOtherRun from './FormOtherRun';

    export default {
        data () {
            return {
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.homeFormSize
            };
        },
        props: {
            pageFlag: { // batchTasks(批次划分任务) runManage(跑批任务)
                type: String,
                default: function () {
                    return "";
                }
            },
            addParams: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        methods: {
            // 确定
            async handleOk () {
                console.log(this.addParams);
                await this.$refs.form_com._test();
                let fromTarget = null;
                if (this.pageFlag === "batchTasks") {
                    fromTarget = this.$refs.form_other;
                } else if (this.pageFlag === "runManage") {
                    fromTarget = this.$refs.form_other_run;
                }
                await fromTarget._test();
                this.$emit("ok", {step: "second", result: this.addParams});
            },
            handleCancel () {
                this.$emit("cancel", {step: "second"});
            }
        },
        components: {FormCom, FormOther, FormOtherRun}
    };
</script>

<style lang="scss" scoped>
    .add-second-wrap {
        display: flex;
        flex-direction: column;
        .content {
            flex: 1;
            padding: 15px 80px 0;
            box-sizing: border-box;
            overflow: auto;
        }
        .footer-wrap {
            height: 80px;
            text-align: center;
        }
    }
</style>

