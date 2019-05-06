<!--
* @Author: mikey.TIANJIE
* @Date: 2018-06-26 13:30:24
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-07-12 13:30:24
* @remark: 文件上传公共组件
-->
<template>
    <div>
        <el-upload
            class="upload-demo"
            :action="url"
            :file-list="fileList"
            :show-file-list="false"
            :limit="limit"
            :name="filePath"

            :multiple = "multiple"
            :before-upload="handlerBeforeUpload"
            :on-progress="handlerProgress"
            :on-success="handlerSuccess"
            :on-error="handlerError"

            :before-remove="beforeRemove"
            :on-remove="handleRemove"

            :on-preview="handlePreview"
            :on-change="handlerChange"
            :on-exceed="handleExceed"
            :disabled="disabled"

        >
            <el-button :size="btnSize" :type="uploadButtonType" class="uploadBtn" :style="sytleString" :loading="disabled" v-if="disabled">{{holderPlace}}</el-button>
            <el-button :size="btnSize" :type="uploadButtonType" class="uploadBtn" :style="sytleString" v-if="!disabled">{{holderPlace}}</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            <!--
                before-upload   上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
                    在文件上传前做上传格式和大小验证
                    handleBeforeUpload (file) {
                        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                        const extension = testmsg === 'xls'
                        const extension2 = testmsg === 'xlsx'
                        const isLt2M = file.size / 1024 / 1024 < 10
                        if(!extension && !extension2) {
                            this.$message({
                                message: '上传文件只能是 xls、xlsx格式!',
                                type: 'warning'
                            });
                        }
                        if(!isLt2M) {
                            this.$message({
                                message: '上传文件大小不能超过 10MB!',
                                type: 'warning'
                            });
                        }
                        return extension || extension2 && isLt2M
                    }
                on-progress     文件上传时的钩子
                on-success      文件上传成功时的钩子
                on-error        文件上传失败时的钩子

                before-remove   删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
                on-remove       文件列表移除文件时的钩子

                on-preview      点击文件列表中已上传的文件时的钩子
                on-change       文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
                on-exceed	    文件超出个数限制时的钩子

                auto-upload     是否在选取文件后立即进行上传
                limit           最大允许上传个数

                action          必选参数，上传的地址      string
                headers         设置上传的请求头部      object
                multiple	    是否支持多选文件	    boolean
                data            上传时附带的额外参数	object
                name	        上传的文件字段名	string
                with-credentials	支持发送 cookie 凭证信息	boolean
                show-file-list	是否显示已上传文件列表	boolean
            -->
        </el-upload>
        <v-file-list v-if="showFileList || (showFileList && fileList.length > 0)" class="m-t-19" v-model="fileList"></v-file-list>
    </div>
</template>
<script type="text/ecmascript-6">
    import {validateFilePostfix} from 'js/utils/regex';
    import CONFIG from 'src/config';
    import busEvent from 'src/busEvent';

    export default {
        data () {
            return {
                disabled: false
            };
        },
        props: {
            btnSize: {
                type: String,
                deafult: CONFIG.baseBtn
            },
            multiple: {
                type: Boolean,
                deafult: false
            },
            uploadSameFileName: {
                type: Boolean,
                deafult: true
            },
            uploadButtonType: {
                type: String,
                default () {
                    return 'primary';
                }
            },
            limit: {
                type: Number,
                default () {
                    return 10;
                }
            },
            doDefaultOperation: {
                type: Boolean,
                default () {
                    return true;
                }
            },
            maxFilesSize: {
                type: Number,
                default () {
                    return 10;
                }
            },
            maxFilesSizeMap: { // 特殊类型大小  eg. [{type: 'zip', size: 3}] 或 [{reg: /\.(zip)$/, size: 3}]
                type: Array,
                default () {
                    return [];
                }
            },
            reg: { // 对应文件类型正则表达式
                typeof: Function,
                default () {
                    return validateFilePostfix;
                }
            },
            filePath: {
                type: String,
                default () {
                    return 'filePath';
                }
            },
            updateType: {
                type: String,
                default () {
                    return null;
                }
            },
            url: {
                type: String,
                default () {
                    return `${CONFIG.URL}/annexFile/batchUpload`;
                }
            },
            sytleString: {
                type: String,
                default () {
                    return '';
                }
            },
            holderPlace: {
                type: String,
                default () {
                    return '点击上传';
                }
            },
            fileList: {
                type: Array,
                default () {
                    return [];
                }
            },
            showFileList: {
                type: Boolean,
                default () {
                    return true;
                }
            }
        },
        computed: {
            fileCount () {
                return this.fileList.length;
            }
        },
        watch: {
            fileCount (newobj, oldobj) {
                this.$emit('changeResult', this.fileList);
            }
        },
        model: {
            prop: 'fileList'
        },
        methods: {
            handlerBeforeUpload (file) { // 文件上传前
                console.log('tag', file);
                this.$emit("beforeUpload");
                this.disabled = true;
                /*
                * 附件一次最大只能上传10M内文件，
                * 最多只能上传10个，
                * 格式可只支持图片（bmp、jpg、png）、
                * 档格式wps=word（doc）、excel（xls）、csv、PPT、PDF、rar与zip（压缩文件）。
                * */
                let postfix = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                let result = this.reg(postfix);
                if (!result) {
                    this.$toast('不支持上传此类文件');
                    this.disabled = false;
                }
                let isLtTypeSizeBool = true;
                let isLimitBool = file.size / 1024 / 1024 < this.maxFilesSize;
                this.maxFilesSizeMap.forEach(element => {
                    if ('.' + element.type === postfix) {
                        console.info('file upload before match file type');
                        isLimitBool = true;
                        if (element.size > 0) {
                            isLtTypeSizeBool = file.size / 1024 / 1024 < element.size;
                            if (!isLtTypeSizeBool) {
                                this.$toast(`${postfix}类型附件一次最大只能上传${element.size}M内文件`);
                                this.disabled = false;
                            }
                        }
                    } else if (element.reg) {
                        if (element.reg.test(postfix)) {
                            console.info('file upload before match file type');
                            isLimitBool = true;
                            if (element.size > 0) {
                                isLtTypeSizeBool = file.size / 1024 / 1024 < element.size;
                                if (!isLtTypeSizeBool) {
                                    this.$toast(`${postfix}类型附件一次最大只能上传${element.size}M内文件`);
                                    this.disabled = false;
                                }
                            }
                        }
                    }
                });
                if (!isLimitBool && isLtTypeSizeBool) {
                    console.warn('isLimitBool', isLimitBool);
                    this.$toast(`附件一次最大只能上传${this.maxFilesSize}M内文件`);
                    this.disabled = false;
                }
                if (!this.uploadSameFileName) {
                    let count_ = this.fileList.filter(res => {
                        return (res.oldName === file.name);
                    }) || [];
                    if (count_.length > 0) {
                        this.disabled = false;
                        this.$toast(`您已经上传过${file.name}为名字的文件,请勿重名!`);
                        return false;
                    }
                }
                return result && isLimitBool && isLtTypeSizeBool;
                // return false; 在这里return 后会跳直接跳过上传 但是会进入删除的步骤
            },
            handlerProgress (file) { // 文件上传中
                // console.log(file);
            },
            handlerSuccess (result) { // 文件上传成功
                // console.log('result', result);
                if (this.doDefaultOperation) {
                    let code = typeof result.statusCode === 'string' ? Number(result.statusCode) : result.statusCode;
                    if (code === 200) {
                        let {fileNo, oldName} = result.data;
                        this.fileList.push({
                            fileNo,
                            oldName
                        });
                        this.$emit('input', this.fileList);
                        this.$emit('uploadreuslt', result);
                    } else if (code === 403) { // 未登录  登录过期
                        busEvent.$emit('goLogin');
                    } else {
                        busEvent.$emit('alertMassage', result.errorMsg);
                    }
                } else {
                    let code = typeof result.statusCode === 'string' ? Number(result.statusCode) : result.statusCode;
                    if (code === 403) {
                        busEvent.$emit('goLogin');
                    } else if (code === 200) { // 未登录  登录过期
                        this.fileList.push(result.data);
                        this.$emit('input', this.fileList);
                        this.$emit('uploadreuslt', result, true, this.fileList);
                    } else {
                        this.$emit('uploadreuslt', result, false, this.fileList);
                    }
                }
                this.disabled = false;
            },
            handlerError () { // 文件上传失败
                this.$toast('上传失败！！-_-');
                this.disabled = false;
            },

            beforeRemove (file, fileList) { // 删除前
                // return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleRemove (file, fileList) { // 文件删除
                console.log(file, fileList);
            },

            handlePreview (file) { // 点击上传好的文件
                console.log(file);
            },
            handlerChange () { // 文件列表改变时
            },
            handleExceed (files, fileList) { // 文件超出限制大小时
                this.$toast(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            _reset () {
                this.fileList = [];
            }
        }
    };
</script>
<style scopd>
    .m-t-19 {
        margin-top: 19px;
    }
</style>

