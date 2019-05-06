<!--
* @Author: GOTINTIN
* @Date: 2018-10-11
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-10-11
* @remark: 疑点审核验证
-->
<template>
    <section class="case-audit-form">
        <div class="form-control">
            <el-form  :model="auditForm" ref="form" :label-width="`${labelWidth}px`" :size="formSize">
                <el-form-item :label="`${result}：`"  class="blackItem">
                    <el-button  @click="handleBtnClick(0, btnType)" :size="btnSize" :class="{'btn-action': btnAction === 0}">{{btnType}}</el-button>
                    <el-button  @click="handleBtnClick(1, '违规')" :size="btnSize" :class="{'btn-action': btnAction === 1}">违规</el-button>
                </el-form-item>
                <el-form-item :label="`${opinion}：`" prop="remark" class="blackItem">
                    <div class="input-box">
                        <el-input v-model="auditForm.remark" type="textarea"  maxlength="400" class="textarea-width"></el-input>
                        <span class="input-number">{{auditForm.remark && auditForm.remark.length>0 ? auditForm.remark.length : 0 }}/400</span>
                    </div>
                </el-form-item>
                <el-form-item :label="`${uploadFiles}：`" prop="filePath" class="blackItem m-t-7">
                    <v-upload
                        ref="uploadRef"
                        v-model="auditForm.filePath"
                        :url="url"
                        :reg="reg"
                        maxFilesSize="2"
                        :doDefaultOperation="false"
                        :maxFilesSizeMap="maxFilesSizeMap"
                        filePath="file"
                        holderPlace="添加"
                        limit="6"
                        uploadButtonType="default"
                        @uploadreuslt="uploadreuslt">
                    </v-upload>
                </el-form-item>
                <!--<el-form-item style="height: 15px;">-->
                    <!--<div class="el-form-item__error" style="height: 15px" v-show="showWarning">请先选择就诊号</div>-->
                <!--</el-form-item>-->
                <el-form-item class="btn" label="">
                    <el-button type="primary" :size="btnSize" @click="handleSubmit">提交</el-button>
                    <el-button type="primary" :size="btnSize" @click="handleReset">置空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script>
    import CONFIG from 'src/config';
    import {getNormalSubmit, getTurn} from 'src/js/api/workbench/auditCase/caseinfo';
    export default{
        data () {
            return {
                formSize: CONFIG.baseFormSize,
                btnSize: CONFIG.homeBtn,
                labelWidth: 82,
                btnAction: 0, // 默认按钮 0=正常 1=违规
                btnType: '正常', // 按钮类型: 正常 申诉
                // pageType: 'all', // 菜单名称 all全部病例 sysFirst系统初审 hopFirst医院初审 review复审 hopSec医院复审 expert专家审核 result最终结论
                result: '审核结果', // 审核结果  结果
                opinion: '审核意见', // 审核意见 申诉信息
                uploadFiles: '上传附件', // 上传附件 上传证据showWarning
                // showWarning: false,
                auditForm: {
                    remark: '',
                    filePath: []
                },
                url: `${CONFIG.URL}/file/upload`,
                filePath: '',
                maxFilesSizeMap: [ // 上传图片大小限制：上传图片在4MB以内
                    {reg: /\.(png|jpeg|jpg|tif|tiff|pdf)$/, size: 4}
                ],
                auditSubmitParamas: {
                    createby: "", // 操作人
                    filesVos: [], // 上传文件
                    jzcode: "", // 就诊号
                    mark: "", // 审核意见
                    nodeCode: "", // 节点code
                    result: "" // 审核结果（Y==正常Y ，N==违规 ，A==申诉）
                }
                // pageType: 'all'
            };
        },
        props: {
            pageType: { // 菜单名称 all全部病例 sysFirst系统初审 hopFirst医院初审 review复审 hopSec医院复审 expert专家审核 result最终结论
                type: String,
                default: 'all'
            },
            currentItem: { // 节点
                type: Object,
                default: {
                    current: '',
                    nodeName: '',
                    nodeCode: ''
                }
            }
        },

        watch: {
            // 审核结果，审核意见，上传附件，正常和违规按钮 == sysFirst系统初审，review复审，expert专家审核，result最终结论
            // 结果，申诉信息，上传证据，申诉和违规按钮 == hopFirst医院初审，hopSec医院复审
            // 监听获取左侧菜单的url
            pageType (to, from) {
                console.log('watch this.pageType', this.pageType);
                if (this.pageType) {
                    const pageTypeOneUrl = ['s0', 's2', 's4', 's5'];
                    const pageTypeTwoUrl = ['s1', 's3'];
                    if (pageTypeOneUrl.includes(this.pageType)) {
                        this.result = '审核结果';
                        this.opinion = '审核意见';
                        this.uploadFiles = '上传附件';
                        this.btnType = '正常';
                    } else if (pageTypeTwoUrl.includes(this.pageType)) {
                        this.result = '结果';
                        this.opinion = '申诉信息';
                        this.uploadFiles = '上传证据';
                        this.btnType = '申诉';
                    }
                }
                try {
                    this.$refs.searchResultRef._reset();
                    this.$refs.aSiseRef._reset();
                    this.$refs.contentWarpRef._reset(true);
                } catch (error) {

                }
            }
        },

        methods: {
            // 点上传文件返回结果
            uploadreuslt (res, res2, res3) {
                console.log([this.auditSubmitParamas]);
                if (!this.auditSubmitParamas.jzcode) {
                    // this.showWarning = true;
                    // this.$refs.uploadRef._reset();
                    // return;
                }
            },
            // 审核结果
            handleBtnClick (index, btnType) {
                console.log('btnTypeText===>', index, btnType);
                this.btnAction = index;
                console.log('this.btnAction', this.btnAction);
                this.$emit('handleBtnClick', index, btnType);
            },
            // 提交
            handleSubmit () {
                if (!this.auditSubmitParamas.jzcode) {
                    // this.showWarning = true;
                    this.$toast("请先选择就诊号", 1000);
                    this.auditForm.filePath = []; // 清空上传文件
                    this.auditSubmitParamas.filesVos = [];
                    return false;
                } else {
                    this.$refs.form.validate(value => {
                        if (value) {
                            console.log('提交成功==>', value);
                            let {name} = JSON.parse(sessionStorage.getItem('user_info'));
                            this.auditSubmitParamas = Object.assign({}, this.auditSubmitParamas, {
                                createBy: name,
                                mark: this.auditForm.remark, // 审核意见
                                nodeCode: this.currentItem.nodeCode, // 节点code: this.currentItem.nodeCode  如："nodeCode": "3b426261561f4495a71023a523c1782b"
                                result: (this.btnAction === 1) ? 'N' : (this.btnAction === 0 && this.btnType === '正常') ? 'Y' : 'A' // 审核结果（Y==正常Y ，N==违规 ，A==申诉）
                            });
                            console.log('请求成功审核参数===》', this.auditSubmitParamas.filesVos, [this.auditForm.filePath]);
                            this.auditSubmitParamas.filesVos = this.auditForm.filePath;

                            // 申诉按钮：医院初审，医院复审
                            // getNormalSubmit接口：下一节点   getTurn接口：跨越跳
                            if (this.btnAction === 0 && this.btnType === '申诉') {
                                if (this.pageType === 's1' || this.pageType === 's3') {
                                    getNormalSubmit(this.auditSubmitParamas).then(res => {
                                        this.$toast('已提交成功');
                                        // if (this.$refs.form.resetFields) {
                                        //     this.$refs.form.resetFields(); // 清空表单
                                        // }
                                        this.btnAction = 0;// 设置审核结果默认值为正常
                                        this.auditForm.filePath = []; // 清空上传文件
                                        this.auditSubmitParamas.filesVos = [];
                                        this.$emit('success', value);// 提交成功后通知父组件
                                    });
                                } else {
                                    getTurn(this.auditSubmitParamas).then(res => {
                                        this.$toast('已提交成功');
                                        // if (this.$refs.form.resetFields) {
                                        //     this.$refs.form.resetFields(); // 清空表单
                                        // }
                                        this.btnAction = 0;// 设置审核结果默认值为正常
                                        this.auditForm.filePath = []; // 清空上传文件
                                        this.auditSubmitParamas.filesVos = [];
                                        this.$emit('success', value);// 提交成功后通知父组件
                                    });
                                }
                            }

                            // 违规按钮：系统初审，复审，专家审核，最终结论
                            if (this.btnAction === 1) {
                                if (this.pageType === 's0' || this.pageType === 's2' || this.pageType === 's4' || this.pageType === 's5') {
                                    getNormalSubmit(this.auditSubmitParamas).then(res => {
                                        this.$toast('已提交成功');
                                        // if (this.$refs.form.resetFields) {
                                        //     this.$refs.form.resetFields(); // 清空表单
                                        // }
                                        this.btnAction = 0;// 设置审核结果默认值为正常
                                        this.auditForm.filePath = []; // 清空上传文件
                                        this.auditSubmitParamas.filesVos = [];
                                        this.$emit('success', value);// 提交成功后通知父组件
                                    });
                                } else {
                                    getTurn(this.auditSubmitParamas).then(res => {
                                        this.$toast('已提交成功');
                                        // if (this.$refs.form.resetFields) {
                                        //     this.$refs.form.resetFields(); // 清空表单
                                        // }
                                        this.btnAction = 0;// 设置审核结果默认值为正常
                                        this.auditForm.filePath = []; // 清空上传文件
                                        this.auditSubmitParamas.filesVos = [];
                                        this.$emit('success', value);// 提交成功后通知父组件
                                    });
                                }
                            }

                            // 正常按钮：系统初审,复审; 另专家审核,最终结论正常时走下一节点
                            if (this.btnAction === 0 && this.btnType === '正常') {
                                if (this.pageType === 's0' || this.pageType === 's2') {
                                    getTurn(this.auditSubmitParamas).then(res => {
                                        this.$toast('已提交成功');
                                        // if (this.$refs.form.resetFields) {
                                        //     this.$refs.form.resetFields(); // 清空表单
                                        // }
                                        this.btnAction = 0;// 设置审核结果默认值为正常
                                        this.auditForm.filePath = []; // 清空上传文件
                                        this.auditSubmitParamas.filesVos = [];
                                        this.$emit('success', value);// 提交成功后通知父组件
                                    });
                                } else {
                                    getNormalSubmit(this.auditSubmitParamas).then(res => {
                                        this.$toast('已提交成功');
                                        // if (this.$refs.form.resetFields) {
                                        //     this.$refs.form.resetFields(); // 清空表单
                                        // }
                                        this.btnAction = 0;// 设置审核结果默认值为正常
                                        this.auditForm.filePath = []; // 清空上传文件
                                        this.auditSubmitParamas.filesVos = [];
                                        this.$emit('success', value);// 提交成功后通知父组件
                                    });
                                }
                            }

                        } else {
                            console.log('提交失败', value);
                        }
                    });
                }
            },
            // 重置
            handleReset () {
                // this._$confirm({content: '重置页面信息将无法复原', type: 'error'}).then(res => {});
                this.auditForm.filePath = []; // 清空上传文件
                this.auditForm.remark = '';
                this.btnAction = 0;// 设置审核结果默认值为正常
                // this.auditForm.filePath = []; // 清空上传文件
            },
            // 获取点击上面表格每一行数据，在下面tabs切换页面展示
            _getData (data) {
                console.log('data数据===2222222222》', data);
                if (data.jzcode) {
                    this.auditSubmitParamas = Object.assign({}, this.auditSubmitParamas, {jzcode: data.jzcode});
                    // this.auditSubmitParamas.jzcode = data.jzcode; // 将拿到data数据赋值给this.auditSubmitParamas
                    console.log('_getData this.auditSubmitParamas==>>', Math.random(), data);
                }
            },
            // 重置表单数据
            _reset (tmp) {
                console.log("ssss" + new Date().getTime());
                if (tmp) {
                    // this.showWarning = false;
                    this.auditSubmitParamas = Object.assign({}, this.auditSubmitParamas, {jzcode: tmp.jzcode});
                } else {
                    this.auditSubmitParamas = Object.assign({}, this.auditSubmitParamas, {
                        createby: "", // 操作人
                        filesVos: [], // 上传文件
                        jzcode: "", // 就诊号
                        mark: "", // 审核意见
                        nodeCode: "", // 节点code
                        result: "" // 审核结果（Y==正常Y ，N==违规 ，A==申诉）
                    });
                }
                this.btnAction = 0;// 设置审核结果默认值为正常
                this.auditForm.filePath = []; // 清空上传文件
                this.auditForm.remark = '';
                console.log('_reset==868683>>', Math.random());
            },
            // 上传文件只限：doc,docx,xls,xslx,png,jpeg
            reg (file) {
                let re = /\.(doc|docx|xls|xlsx|png|jpeg|jpg|tif|tiff|pdf)$/;
                return re.test(file);
            }
        }
    };
</script>

<style scoped lang="scss">
    .form-control {
        width: 100%;
        height: 100%;
        padding: 16px 7px 10px 10px;
        box-sizing: border-box;
        /deep/ .blackItem .el-form-item__label {
            color: #333;
            height: 40px;
        }
        /deep/ .textarea-width .el-textarea__inner{
            width: 238px;
            height: 104px;
        }
        /deep/ .el-form-item__content .m-t-19{
            margin-top: 12px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
        .m-t-7 {
            margin-top: 7px;
        }
        .btn-action{
            background-color: #ECF5FF;
            border:1px solid #B3D8FF;
            color: #66A9FF;
        }
        .input-box{
            position: relative;
            .input-number{
                position: absolute;
                right: 5px;
                bottom: -20px;
                color: #999;
                font-size: 12px;
            }
        }
        .btn{
            padding: 10px 0;
        }
    }
</style>
