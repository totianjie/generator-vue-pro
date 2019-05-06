<!-- 查看 -->
<template>
    <section class="detail-wrap page w-h-fill">
        <div class="detailContent">
            <el-col :span="12" :offset="5">
                <v-item-detail :tooltip="true" label="许可证名称：" :span="span">
                    <span class="block text-ellipsis">{{DetailData.name}}</span>
                    <div slot="content" class="tooltip-item">{{DetailData.name}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="许可证备注：" :span="span">
                    <span class="block showAllText">{{DetailData.remark}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{DetailData.remark}}</div> 
                </v-item-detail>
                <v-item-detail :tooltip="true" label="部署地点：" :span="span">
                    <span class="block text-ellipsis">{{DetailData.deployAddr}}</span>
                    <div slot="content" class="tooltip-item">{{DetailData.deployAddr}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{DetailData.craeteUser}}</span>
                    <div slot="content" class="tooltip-item">{{DetailData.craeteUser}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{DetailData.createTime | dateTimeDowith}}</span>
                    <div slot="content" class="tooltip-item">{{DetailData.createTime | dateTimeDowith}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="有效时长(天)：" :span="span">
                    <span class="block text-ellipsis">{{DetailData.validTime}}</span>
                    <div slot="content" class="tooltip-item">{{DetailData.validTime}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" :label="index===0?'mac地址：':''" :span="span" v-for="(item, index) in macList" :key="index">
                    <span class="block text-ellipsis">{{item}}</span>
                    <div slot="content" class="tooltip-item">{{item}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" :label="index===0?'授权包列表：':''" :span="span" v-for="(item, index) in packages" :key="index">
                    <i class="el-icon-document pull-left" style="padding-right: 6px;line-height: 20px;"></i>
                    <el-tooltip v-show="item.oldName.length>18" 
                        class="item" 
                        effect="dark" 
                        :content="item.oldName" 
                        placement="top-start">
                        <span class="block text-ellipsis package-class pull-left">{{item.oldName}}</span>
                    </el-tooltip>
                    <span v-show="item.oldName.length<19" class="block text-ellipsis package-class pull-left">{{item.oldName}}</span>
                    <span class="pull-right loadDown-btn pointer block" @click="loadDown(index, item)" style="padding-right: 6px;" v-if="item.status!==0">下载</span>
                    <span class="pull-right pointer block" @click="loadDown(index, item)" style="padding-right: 6px;" v-if="item.status===0">处理中</span>
                    <div slot="content" class="tooltip-item">{{item.oldName}}</div>
                </v-item-detail>
            </el-col>
        </div>
        <div style="height: 64px;">
            <el-col :span="12" :offset="6">
                <div class="text-center m-t-16 m-b-16">
                    <el-button :size="btnSize" @click="setPageType('list')">返回</el-button>
                </div>
            </el-col>
        </div>
    </section>
</template>
<script>
import CONFIG from 'src/config';
import {outDownload} from "js/api/safeManage/safeManage.js";
console.log(outDownload);
import {createNamespacedHelpers} from 'vuex';
const {mapGetters, mapMutations} = createNamespacedHelpers('safeManage');
export default {
    data () {
        return {
            span: 8,
            btnSize: CONFIG.baseBtn,
            formSize: CONFIG.homeFormSize
        };
    },
    computed: {
        macList () {
            try {
                let macString = this.DetailData.mac || '';
                let macArr = macString.split(';').map((item) => {
                    if (item.indexOf(':') === -1 && item.indexOf('-') === -1) {
                        item = (item.substr(0, 2) || '**') + ':' + (item.substr(2, 2) || '**') + ':' + (item.substr(4, 2) || '**') + ':' + (item.substr(6, 2) || '**') + ':' + (item.substr(8, 2) || '**') + ':' + (item.substr(10, 2) || '**');
                    }
                    return item;
                });
                return macArr;
            } catch (error) {
                console.error(error);
            }
        },
        packages () {
            return this.DetailData.zipList;
        },
        ...mapGetters(['DetailData'])
    },
    props: {},
    created () {
    },
    mounted () {
    },
    methods: {
        loadDown (index, data_) {
            let zipId = data_.id;
            outDownload({zipId}).then((res) => {
                console.log('loaddown-success');
            }).catch((err) => {
                console.error('catch', err);
            });
        },
        ...mapMutations(['setPageType'])
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
        overflow: auto;
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
    .package-class{
        width: calc(100% - 100px);
    }
    .loadDown-btn{
        color: #3B99FC;
    }
</style>



