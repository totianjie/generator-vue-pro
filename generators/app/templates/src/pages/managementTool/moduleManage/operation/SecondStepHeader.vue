<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第2步 头部 
-->
<template>
    <div class="step2-header">
        <div class="button--group" v-if="templetType===3">
            <div class="download-btn download--template">
                <div class="el-download el-download--text">
                    <el-button size="small" type="" style="font-family:system-ui!important;text-align:center;font-weight:400;color: #333333;border-color: #999999" @click="downDocument">下载模板</el-button>
                </div>
            </div>
            <div class="download-btn w-104">
                <v-upload 
                    :url="url"
                    ref="uploadRef" 
                    sytleString="" 
                    holderPlace="导入临床路径" 
                    @uploadreuslt="uploadreuslt"
                    filePath="file"
                    :doDefaultOperation="false"
                    :showFileList="false"
                    :reg="reg"
                    maxFilesSize="2"
                    limit="1"
                    uploadButtonType=""
                >
                </v-upload>
            </div>
	    </div>
        <div class="button--right--group">
            <el-button size="small" type="primary" @click="lastStep">上一步</el-button>
            <el-button size="small" type="primary" @click="keep">保存</el-button>
        </div>
    </div>
</template>
<script>
    import CONFIG from 'src/config';
// import busEvent from 'src/busEvent';
    export default {
        data () {
            return {
                url: `${CONFIG.URL}/data/templet/upload/drug`,
                dataList: [],
                filePath: '',
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.baseBtn
            };
        },
        props: {
            templetType: {
                type: Number,
                default () {
                    return 0;
                }
            }
        },
        mounted () {

        },
        methods: {
            keep () {
                this.$emit("keep", this.dataList);
            },
            lastStep () {
                this.$emit("backLast", 1);
            },
            downDocument () {
                window.open(`${CONFIG.URL}/data/templet/download`, '_blank');
            },
            uploadreuslt (res, resBool) {
                if (resBool) {
                    this.$emit('upResult', res.data);
                } else {
                    this.$emit('noticeInfo', res.errorMsg);
                }
                this.$refs.uploadRef._reset();
            },
            reg (file) {
                let re = /\.(xls|xlsx|csv)$/;
                return re.test(file);
            }
        }
    };
</script>

<style scoped lang="scss">
@import "./../../../../scss/common";
@import "./../../../../scss/variables";
    .step2-header{
        height: 70px;
        width: 100%;
        // background-color: #f90;
    }
    .button--group{
        margin-top: 19px;
        // margin-bottom: 15px;
        width: 800px;
        display: inline-block;
        /deep/ .el-button:focus, .el-button:hover {
            color: #4579C5;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
        }
    }
    .button--right--group{
        margin-top: 19px;
        display: block;
        margin-right: 28px;
        float: right;
        position: relative;
    }
    .button--right--group button{
        background: $base-color !important;
    }
    .download-btn {
        width: 90px;
        height: 32px;
        padding-left: 28px;
        display:inline-block;
        /deep/ .el-upload{
            color: #4579C5 !important;
            border-color: #c6e2ff !important;
            background-color: #ecf5ff !important;
        }
        /deep/ .el-button:focus-within, .el-button:hover {
            color: #4579C5 !important;
            border-color: #c6e2ff !important;
            background-color: #ecf5ff !important;
        }
    }
    .download--template button{
        height: 32px;
        width: 90px;
        border-width: 1px;
        background-color:white !important;
        color: #333333 !important;
        border-color: rgb(220, 223, 230) !important;
        font-weight:400 !important;
        font-size:12px !important;
        font-family:'Microsoft YaHei',Helvetica,Arial,sans-serif !important;
        text-align: center !important;
    }
    .notice-info-wrong {
        background-color:rgba(0, 0, 0, 0.6);
        z-index: 2045;
    }
    /deep/ .uploadBtn{
        // background-color: white;
        // color: rgb(51, 51, 51);
        // border-color: rgb(153, 153, 153);
        font-size: 12px !important;
        text-align: center !important;
        height: 32px !important;
        .uploadBtn:focus-within, .uploadBtn:hover {
            color: #4579C5 !important;
            border-color: #c6e2ff !important;
            background-color: #ecf5ff !important;
            /deep/ .el-button:focus-within, .el-button:hover {
            color: #4579C5 !important;
            border-color: #c6e2ff !important;
            background-color: #ecf5ff !important;
            }
        }
    }    
    .w-104{
        width: 104px;
    }
</style>
