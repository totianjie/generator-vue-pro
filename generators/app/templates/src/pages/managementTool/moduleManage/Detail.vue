<!-- Created by Nelson on 2018/9/18 -->
<template>
    <div>
        <el-col :span="12" :offset="6">
            <v-item-detail :tooltip="false" label="模板名称：" :span="span" class="m-t-34">
                <span class="block text-ellipsis">{{detailData.templetName}}</span>
                <div slot="content" class="tooltip-item">{{detailData.templetName}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="false" label="模板号：" :span="span">
                <span class="block text-ellipsis">{{detailData.templetCode}}</span>
                <div slot="content" class="tooltip-item">{{detailData.templetCode}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="更新时间：" :span="span">
                <span class="block text-ellipsis">{{detailData.updateTime | formatDateTime}}</span>
                <div slot="content" class="tooltip-item">{{detailData.updateTime | formatDateTime}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="导入临床路径 Id：" :span="span">
                <span class="block text-ellipsis">{{detailData.templetDrugId}}</span>
                <div slot="content" class="tooltip-item">{{detailData.templetDrugId}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="创建时间 Id：" :span="span">
                <span class="block text-ellipsis">{{detailData.createTime || detailData.creatTime | formatDateTime}}</span>
                <div slot="content" class="tooltip-item">{{detailData.createTime || detailData.creatTime | formatDateTime}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="模板类型：" :span="span">
                <span class="block text-ellipsis">{{detailData.templetType}}</span>
                <div slot="content" class="tooltip-item">{{detailData.templetType}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="备注：" :span="span">
                <span class="block text-ellipsis">{{detailData.remark}}</span>
                <div slot="content" class="tooltip-item">{{detailData.remark}}</div>
            </v-item-detail>
            <div class="text-center m-t-32">
                <el-button :size="btnSize" @click="handleBack">返回</el-button>
            </div>
        </el-col>
    </div>
</template>
<script>
    /**

     * */
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                span: 8,
                bSing: false,
                btnSize: CONFIG.baseBtn,
                detailData: {}
            };
        },
        props: {
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            id: {
                type: Number,
                default () {
                    return '';
                }
            },
            modelEx: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        created () {
            this.detailData = this.modelEx;
        },
        methods: {
            handleBack () {
                this.$emit('input', false);
            },
            formateArr (arr) {
                let a = [];
                arr.forEach((item) => {
                    a.push(item.name);
                });
                return a.join('/');
            }
        },
        filters: {
            formatDateTime (inputTime) {
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            }
        }
    };
</script>

<style scoped lang="scss">

    .m-t-32 {
        margin-top: 32px;
    }

    .m-t-34 {
        margin-top: 34px;
    }

    .item {
        display: block;
    }

</style>
