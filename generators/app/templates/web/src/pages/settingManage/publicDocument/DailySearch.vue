<!--
* @Author: GOTINTIN
* @Date: 2019-1-21
* @remark: 日志的查询
-->
<template>
    <div class="over-hidden">
        <div class="search-wrap over-auto">
            <v-search-box class="page">
                <div class="clearfix">
                    <el-col :span="span">
                        <v-input label="操作人：" :span="8">
                            <el-input v-model="optUser"  placeholder="请输入" :size="formSize"></el-input>
                        </v-input>
                    </el-col>
                    <el-col :span="span">
                        <v-input label="起止时间：" :span="8">
                            <el-date-picker
                                :size="formSize"
                                value-format="yyyy-MM-dd"
                                class="w-fill"
                                v-model="date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </v-input>
                    </el-col>
                    <el-col :span="span">
                        <v-input label="操作内容：" :span="8">
                            <el-input v-model="optContent " placeholder="请输入" :size="formSize"></el-input>
                        </v-input>
                    </el-col>
                    <el-col class="m-t-8" :span="span">
                        <v-input label="客户端IP：" :span="8">
                            <el-input v-model="clientIP" placeholder="请输入" :size="formSize"></el-input>
                        </v-input>
                    </el-col>
                    <el-col class="m-t-8" :span="span">
                        <v-input label="操作结果：" :span="8">
                            <el-input v-model="optResult" placeholder="请输入" :size="formSize"></el-input>
                        </v-input>
                    </el-col>
                    <el-col class="m-t-8" :span="span">
                        <v-input label="模块名称：" :span="8">
                            <el-input v-model="modelName" placeholder="请输入" :size="formSize"></el-input>
                        </v-input>
                    </el-col>
                </div>
                <div slot="btn">
                    <el-button type="primary" style="margin-left: 20px;" @click="handlerBack" :size="btnSize">返回</el-button>
                    <el-button type="primary" style="margin-left: 20px; margin-top: 8px;" @click="handlerSearch" :size="btnSize">查询</el-button>
                </div>
            </v-search-box>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                span: '8',
                formSize: CONFIG.homeFormSize, // 外页form尺寸
                btnSize: CONFIG.homeBtn, // 外页按钮尺寸
                optUser: '', // 操作人
                date: '', // 日期
                optContent: '', // 操作内容
                clientIP: '', // 客户端IP
                optResult: '', // 操作结果
                modelName: '' // 模块名称
            };
        },
        props: {

        },
        computed: {
            beginDate () {
                return Array.isArray(this.date) ? this.date[0] : '';
            },
            endDate () {
                return Array.isArray(this.date) ? this.date[1] : '';
            }
        },
        methods: {
            // 查询
            handlerSearch () {
                let form = {
                    optUser: this.optUser,
                    beginDate: this.beginDate,
                    endDate: this.endDate,
                    optContent: this.optContent,
                    clientIP: this.clientIP,
                    optResult: this.optResult,
                    modelName: this.modelName
                };
                this.$emit('search', form);
            },
            // 返回
            handlerBack () {
                this.$emit('handlerBack');
            }
        }
    };
</script>
<style lang="scss" scoped>
    .search-wrap{
        .m-t-8{
            margin-top: 8px;
        }
        .el-range-editor--small.el-input__inner{
            width: 100%;
        }
    }
</style>
