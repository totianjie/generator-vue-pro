<template>
    <v-search-box>
        <div>
            <el-col :span="span">
                <v-input label="标准目录：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <v-select
                        v-model="searchParams.versionId"
                        :list="diseaseVersionsList"
                        :props="selectProps"
                        :size="formSize"
                    >
                    </v-select>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8">
                <v-input label="标准编码：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-input v-model="searchParams.diseaseCode" placeholder="请输入标准编码" :size="formSize"></el-input>
                </v-input>
            </el-col>
            <el-col :span="span" class="m-t-8">
                <v-input label="标准名称：" :span="5" :pxUnit="true" :labelWidth="lableWidth">
                    <el-input v-model="searchParams.diseaseName" placeholder="请输入标准名称" :size="formSize"></el-input>
                </v-input>
            </el-col>
        </div>
        <div slot="btn">
            <el-button @click="handlerSearch" type="primary" class="m-l-20" :size="btnSize">查询</el-button>
            <el-button @click="handlerClear" type="primary" style="margin-left: 20px; margin-top: 8px;" class="m-l-20 block" :size="btnSize">清空</el-button>
        </div>
    </v-search-box>
</template>
<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                lableWidth: 136,
                span: 24,
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn,
                selectData: [],
                selectProps: {
                    name: 'keyName',
                    value: 'keyValue'
                }
            };
        },
        props: {
            diseaseVersionsList: {
                type: [Array],
                default: []
            },
            searchParams: {
                type: Object,
                default: {
                    versionId: '',
                    diseaseCode: '',
                    diseaseName: ''
                }
            }
        },
        methods: {
            // 查询
            handlerSearch () {
                let bSing = false;
                for (let value of Object.values(this.searchParams)) {
                    if (value !== '' && value) {
                        bSing = true;
                        break;
                    }
                }
                if (bSing) {
                    this.$emit('search', this.searchParams);
                    return false;
                }
                this.$toast('请输入查询条件');
            },
            handlerClear () {
                this.$emit('clear');
            }
        }
    };
</script>
<style scoped>
    .m-t-8 {
        margin-top: 8px;
    }
</style>

