<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-08-02 11:07:10 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-08-02 11:07:10 
* @remark: 左边  原始数据模块  功能提交
-->
<template>
    <section class="wrap">
        <el-button size="mini" @click="handleClick(6, '自动对照')">自动对照</el-button>
        <!-- <el-button v-show="tabsActive !== 4" size="mini" @click="handleClick(0, '批量学习')">批量学习</el-button> -->
        <el-button v-show="tabsActive !== 4 && tabsActive !== 6" size="mini" @click="handleClick(1, '多项对照')">多项对照</el-button>
        <el-button v-show="tabsActive !== 4 && tabsActive !== 6" size="mini" @click="handleClick(2, '不能对照')">不能对照</el-button>
        <el-button v-show="tabsActive === 0 || tabsActive === 2 || tabsActive === 3 || tabsActive === 5" size="mini" @click="handleClick(3, '审核')">审核</el-button>
        <el-button v-show="tabsActive === 0 || tabsActive === 4 || tabsActive === 6" size="mini" @click="handleClick(4, '撤销审核')">撤销审核</el-button>
        <el-button v-show="tabsActive === 0 || tabsActive === 1" size="mini" @click="handleClick(5, '提交')">提交</el-button>
        <el-button size="mini" @click="handleClick(7, '下载模板')">下载模板</el-button>
        <!-- <el-button size="mini" @click="handleClick(8, '上传')">上传</el-button> -->
        <v-upload
            class="m-l-10"
            style='display: inline-block;'
            :showFileList='false'
            btnSize='mini'
            holderPlace='上传'
            uploadButtonType='default'
            :url='url'
            filePath='file'
            :fileList="fileList"
            @uploadreuslt='handleUploadSuccess'
            :maxFilesSize="5"
            :reg="regMethod"
        ></v-upload>
        <el-button size="mini" @click="handleClick(9, '同步')" class="m-l-10">同步</el-button>
    </section>
</template>
<script>
import {URL} from "js/api/baseDataContrast/operation";
import CONFIG from 'src/config';
export default {
    data () {
        return {
            fileList: [],
            url: `${CONFIG.URL}${URL.upload}`,
            btnList: ['批量学习', '多项对照', '不能对照', '审核', '提交']
        };
    },
    props: {
        tabsActive: {
            type: [Number],
            default: 0
        }
    },
    methods: {
        regMethod (val) {
            return /\.(xls|xlsx)$/.test(val);
        },
        handleClick (index, item) {
            this.$emit('submit', {index, text: item});
        },
        handleUploadSuccess () {
            this.fileList = [];
            this.handleClick(8, '上传');
        }
    }
};
</script>

<style scoped>
.wrap {
    padding: 8px 15px;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
}
</style>
