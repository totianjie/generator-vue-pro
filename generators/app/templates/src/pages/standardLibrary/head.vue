<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <div class="h-57" :class="typeNumber===1?'h-98':''">
        <v-search-box style="padding-bottom: 0;">
            <el-form ref="searchForm" :model="searchForm" :rules="rules" :inline="true" label-width="100px" :size="formSize" class="searchForm pull-left">
                <el-row style="margin-left: 8px;">
                    <el-col :span="span" style="padding-left: 8px;">
                        <el-form-item label="标准目录：" :label-width="lableWidth" prop="selectMenu">
                            <v-select v-model="searchForm.selectMenu" :list="options" :size="formSize" :props="selectProps" placeholder="请选择" @change="change" /> 
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="span" style="padding-left: 8px;">
                        <el-form-item label="标准编码：" :label-width="lableWidth" prop="baseCode">
                            <el-input @blur="searchCheck" v-model="searchForm.baseCode" placeholder="请输入标准编码" :size="formSize"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="span" style="padding-left: 8px;">
                        <el-form-item label="标准名称：" :label-width="lableWidth" prop="baseName">
                            <el-input @blur="searchCheck" v-model="searchForm.baseName" placeholder="请输入标准名称" :size="formSize"></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <!-- <el-row v-show="typeNumber===1" style="margin-left: 16px;">
                    <el-col :span="span" style="padding-left: 8px;">
                        <el-form-item label="附加编码：" :label-width="lableWidth" prop="otherCode">
                            <el-input @blur="searchCheck" v-model="searchForm.otherCode" placeholder="请输入附加编码" :size="formSize"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
            <div slot="btn">
                <el-button @click="handlerSearch" type="primary" class="m-l-20" :size="btnSize">查询</el-button>
            </div>
        </v-search-box>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        props: {
            options: {
                type: Array,
                default () {
                    return [];
                }
            },
            typeNumber: {
                type: Number,
                default () {
                    return 0;
                }
            },
            headObj: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                searchForm: {
                    selectMenu: '',
                    baseCode: '',
                    baseName: '',
                    otherCode: ''
                },
                rules: Object.assign({}, {}, {
                    selectMenu: [
                        { trigger: 'change', message: '请先选择标准目录', required: true }
                    ]
                }),
                selectProps: {
                    name: 'name',
                    value: 'name'
                },
               
                keyword: '',
                lableWidth: 100,
                span: 8,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn
            };
        },
        mounted () {
            this.searchForm = this.headObj;
        },
        computed: {

        },

        watch: {

        },

        methods: {
            getSearchObj () {
                let objArr = [];
                if (this.searchForm.selectMenu.length) {
                    objArr = this.options.filter(res3 => {
                        return res3.name === this.searchForm.selectMenu;
                    }) || [];
                }
                let obj = objArr[0] || {};
                obj = Object.assign({}, obj, {baseCode: this.searchForm.baseCode}, {baseName: this.searchForm.baseName}, {otherCode: this.searchForm.otherCode});
                return obj;
            },
            change (val) {
                this.$emit('handlerSearch', this.getSearchObj());
            },
            searchCheck (val) {
                this.$emit('handlerSearch', this.getSearchObj());
            },
            handlerSearch () {
                this.$refs.searchForm.validate(value => {
                    if (value) {
                        console.log('handlerSearch', this.searchForm.selectMenu);
                        this.$emit('handlerSearch', this.getSearchObj(), true);
                    }
                });
            }
        },
        components: {
            
        }
    };
</script>
<style lang="scss" scoped>
    .m-t-5 {
        margin-top: 5px;
    }
    .search-keyword-class {
        min-width: 350px;
    }
    .search-date-class{
        min-width: 350px;
    }
    .search-status-class{
        min-width: 180px;
        width: 180px;
    }
    .m-t-8{
        margin-top: 8px;
    }
    .m-l-8{
        margin-left: 8px;
    }
    .w-146{
        width: 146px;
    }
    span:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
    .searchForm{
        width: 100%;
    }
    .h-57{
        height: 57px;
    }
    .h-98{
        height: 98px;
    }
    /deep/ .el-form-item--small{
        width: 100%;
    }
    /deep/ .el-form-item__content{
        width: calc(100% - 98px);
    }
    /deep/ .v-search-box > .input-wrap{
        width: calc(100% - 105px) !important;
    }
    /deep/ .v-search-box > .btn-wrap{
        width: 96px !important;
    }
</style>
