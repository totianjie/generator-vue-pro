<!--
* @Author: GOTINTIN
* @Date: 2019-1-5
* @Last Modified by: GOTINTIN
* @Last Modified time: 2019-1-5
* @remark: 历史数据库查询
-->
<template>
    <div class="search-wrap">
        <v-search-box>
            <div class="clearfix">
                <el-col :span="span">
                    <v-input label="区域：" :span="8" :labelWidth="lableWidth">
                        <el-cascader
                            :size="formSize"
                            expand-trigger="hover"
                            placeholder="请选择"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleCascaderChange">
                        </el-cascader>
                    </v-input>
                </el-col>
                <el-col :span="span">
                    <v-input label="数据批次名称:" :span="8" :labelWidth="lableWidth">
                        <el-input v-model="dataFrom"  placeholder="请输入数据批次名称" :size="formSize"></el-input>
                    </v-input>
                </el-col>
            </div>
            <div slot="btn">
                <el-button @click="handlerSearch" type="primary" :size="btnSize" class="m-l-20" >查询</el-button>
            </div>
        </v-search-box>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {getHistoryArea} from 'js/api/historyLibrary/historyLibrary';
    export default {
        data () {
            return {
                span: 9,
                labelWidth: 150,
                formSize: CONFIG.homeFormSize, // 外页form尺寸
                btnSize: CONFIG.homeBtn, // 外页按钮尺寸
                options: [], // 区域数组
                selectedOptions: [], // 区域
                dataFrom: '', // 数据批次名称
                areaParams: {
                    parenId: ''
                }
            };
        },

        props: {
            value: {
                type: [Object],
                default: {
                    areaName: '', // 省
                    areaCode: '' //  市

                }
            }
        },

        created () {
            getHistoryArea(this.areaParams).then(res => {
                this.options = Object.assign([], res.data);
                console.log('this.options历史', this.options);
            });
        },

        mounted () {},

        methods: {
            // 查询
            handlerSearch () {
                let form = {
                    dataFrom: this.dataFrom
                };
                console.log('查询');
                this.$emit('search', form);
            },
            // 区域选择时 reaName=省 areaCode=市
            handleCascaderChange ([areaName, areaCode]) {
                // console.log('areaName, areaCode历史', areaName, areaCode);
                this.$emit('input', Object.assign({}, this.value, {areaName, areaCode}));
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
        .w-fill {
            width: 100%;
        }
    }
</style>
