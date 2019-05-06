<!-- Created by Nelson on 2018/7/10 -->
<template>
    <div>
        <div class="ruleClass-height">
            <el-col :span="14" :offset="5" v-if="bSing" class="m-t-34">
                <v-item-detail :tooltip="true" label="父级分类名称：" :span="span" v-if="RCDetailData && RCDetailData.parentId">
                    <span class="block text-ellipsis">{{RCDetailData.parentClassName}}</span>
                    <div slot="content" class="tooltip-item">{{RCDetailData.parentClassName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="分类名称：" :span="span">
                    <span class="block text-ellipsis">{{RCDetailData.className}}</span>
                    <div slot="content" class="tooltip-item">{{RCDetailData.className}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{RCDetailData.createUser || '系统导入'}}</span>
                    <div slot="content" class="tooltip-item">{{RCDetailData.createUser || '系统导入'}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{formatDateTime(RCDetailData.createTime)}}</span>
                    <div slot="content" class="tooltip-item">{{formatDateTime(RCDetailData.createTime)}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="更新人：" :span="span">
                    <span class="block text-ellipsis">{{RCDetailData.updateUser || '系统导入'}}</span>
                    <div slot="content" class="tooltip-item">{{RCDetailData.updateUser || '系统导入'}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="更新时间：" :span="span">
                    <span class="block text-ellipsis">{{formatDateTime(RCDetailData.updateTime)}}</span>
                    <div slot="content" class="tooltip-item">{{formatDateTime(RCDetailData.updateTime)}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="备注：" :span="span">
                    <span class="block showAllText">{{RCDetailData.remark}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{RCDetailData.remark}}</div>
                </v-item-detail>
                <div class="text-center m-t-32">
                    <el-button :size="btnSize" @click="handleBack">返回</el-button>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions} = createNamespacedHelpers('scene/ruleClassify');
    export default {
        data () {
            return {
                span: 8,
                bSing: false,
                btnSize: CONFIG.baseBtn
            };
        },
        props: {
        },
        computed: {
            classChange () {
                return this.RCDetailData.ruleNo || this.RCDetailData.classNo;
            },
            ...mapGetters(['RCCurrentNodeKey', 'RCIsHaveFather', 'RCDetailData'])
        },
        watch: {
            id (newId, oldId) {
                console.log('watch-id', newId);
            }
        },
        created () {
            this.bSing = true;
            this._getData();
        },
        mounted () {
            this.detailRuleClass();
        },
        methods: {
            _getData () {
                
            },
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
            },
            handleBack () {
                this.$emit('input', false);
            },
            ...mapActions(['detailRuleClass'])
        },
        filters: {},
        components: {}
    };
</script>

<style lang="scss" scoped>
    .m-t-34 {
        margin-top: 32px;
    }
    .m-t-32 {
        margin-top: 32px;
        display: none;
    }
    .item {
        display: block;
    }
    .showAllText{
        word-break: break-all;
    }
    .ruleClass-height{
        height: 100%;
    }
</style>

