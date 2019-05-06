<!-- 查看 -->
<template>
    <section class="detail-wrap page w-h-fill">
        <div class="detailContent">
            <el-col :span="10" :offset="1">
                <v-item-detail :tooltip="true" label="规则名称：" :span="span">
                    <span class="block text-ellipsis">{{detailData.ruleName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.ruleName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="规则分类：" :span="span">
                    <span class="block showAllText">{{detailData.remark}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{detailData.remark}}</div> 
                </v-item-detail>
                <v-item-detail :tooltip="true" label="违规描述：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeType}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeType}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="违规模板：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeIds}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeIds}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="违规等级：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeIds}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeIds}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="医疗类别：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeType}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeType}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="监管阶段：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeIds}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeIds}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建者：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeIds}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeIds}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="更新者：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeIds}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeIds}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeIds}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeIds}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="更新时间：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeIds}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeIds}}</div>
                </v-item-detail>
            </el-col>
            <el-col :span="10" :offset="1">
                <div  style="margin-bottom: 10px;">
                    <span class="bold">规则细则</span>
                </div>
                <v-item-detail  
                    :tooltip="true" 
                    :prop="'preValue.' + index + '.defaultValue'"
                    :label="item.name"
                    v-for="(item, index) in detailData.preValue"
                    :key="item.id"
                    :span="span"
                >
                    <span class="block text-ellipsis">{{item.defaultValue}}</span>
                    <div slot="content" class="tooltip-item">{{item.defaultValue}}</div>
                </v-item-detail>
            </el-col>
        </div>
        <div style="height: 64px;">
            <el-col :span="12" :offset="6">
                <div class="text-center m-t-16 m-b-16">
                    <el-button :size="btnSize" @click="isDev?setDevPageSatus('list'):setMedPageSatus('list')">返回</el-button>
                </div>
            </el-col>
        </div>
    </section>
</template>
<script>
import CONFIG from 'src/config';
import {createNamespacedHelpers} from 'vuex';
const {mapGetters, mapMutations} = createNamespacedHelpers('scene/rule');
export default {
    data () {
        return {
            span: 8,
            btnSize: CONFIG.baseBtn,
            formSize: CONFIG.homeFormSize,
            detailData: {
                ruleName: '22222'
            }
        };
    },
    computed: {
        isDev () {
            return this.CurrentPage !== 'med';
        },
        ...mapGetters(['RuleTreeData', 'MedPageSatus', 'DevPageSatus', 'CurrentPage'])
    },
    props: {},
    created () {
    },
    mounted () {
    },
    methods: {
        ...mapMutations(['setDevPageSatus', 'setMedPageSatus'])
    },
    filters: {
        dateTimeDowith (datetime) {
            if (datetime === null || datetime === undefined) {
                return '';
            }
            if (typeof datetime === 'number') {
                let date = new Date(datetime);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                let second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            }
            return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
        }
    }
};
</script>
<style lang="scss" scoped>
    .m-t-16 {
        margin-top: 16px;
    }
    .m-b-16 {
        margin-bottom: 16px;
    }
    .detailContent{
        flex: 1;
        display: flex;
        height: calc(100% - 65px);
        padding-top: 30px;
        box-sizing: border-box;
        // /deep/ .v-item-detail .text{
        //     border-bottom-width: 0;
        // }
    }
    .detail-class{
        margin-left: 15px;
        margin-top: 8px;
        overflow: auto;
        width:60%;
    }
</style>



