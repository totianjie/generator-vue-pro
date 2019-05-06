<!-- 查看 -->
<template>
    <section class="page h-fill">
        <div class="headContent">
            <el-col :span="10" :offset="1">
                <v-item-detail :tooltip="true" label="场景名称：" :span="span">
                    <span class="block text-ellipsis">{{detailData.appName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.appName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="备注：" :span="span">
                    <span class="block showAllText">{{detailData.remark}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{detailData.remark}}</div> 
                </v-item-detail>
                <v-item-detail :tooltip="true" label="保险类型：" :span="span">
                    <span class="block text-ellipsis">{{detailData.safeType==='0'?'医疗保险':'商业保险'}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.safeType==='0'?'医疗保险':'商业保险'}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="险种名称：" :span="span">
                    <span class="block text-ellipsis">{{showNames}}</span>
                    <div slot="content" class="tooltip-item">{{showNames}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="规则总数：" :span="span">
                    <span class="block text-ellipsis">{{detailData.count}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.count}}</div>
                </v-item-detail>
            </el-col>
            <el-col :span="10" :offset="1">
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createUser}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createUser}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="更新人：" :span="span">
                    <span class="block text-ellipsis">{{detailData.updateUser}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.updateUser}}</div>
                </v-item-detail>
                <v-item-detail  :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createTime | dateTimeDowith}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createTime | dateTimeDowith}}</div>
                </v-item-detail>
                <v-item-detail  :tooltip="true" label="更新时间：" :span="span">
                    <span class="block text-ellipsis">{{detailData.updateTime | dateTimeDowith}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.updateTime | dateTimeDowith}}</div>
                </v-item-detail>
            </el-col>
        </div>
        <div class="content">
            <div class="h-fill rule-class">
                <v-item-detail :tooltip="false" label="规则配置：" :span="span" class="h-fill">
                    <el-tree
                        v-model="detailData.ruleList"
                            empty-text="暂无数据"
                            ref="tree"
                            :data="detailData.ruleList"
                            :props="defaultProps"
                            node-key="id"
                            @node-click="handleNodeClick"
                            class="dataTree_ h-fill">
                    </el-tree>
                </v-item-detail>
            </div>
            <div class="detail-class" v-show="cShow">
                <p class="bold"><span v-text="ruleDetailData.ruleName"></span> 参数设定</p>
                <v-item-detail  :tooltip="true" label="违规描述：" :span="span">
                    <span class="block text-ellipsis">{{ruleDetailData.ruleDesc || '暂无'}}</span>
                    <div slot="content" class="tooltip-item">{{ruleDetailData.ruleDesc || '暂无'}}</div>
                </v-item-detail>
                <v-item-detail  :tooltip="true" label="监管阶段：" :span="span">
                    <span class="block text-ellipsis">{{ruleDetailData.ruleSection || '暂无'}}</span>
                    <div slot="content" class="tooltip-item">{{ruleDetailData.ruleSection || '暂无'}}</div>
                </v-item-detail>
                <v-item-detail  :tooltip="true" label="违规模板：" :span="span">
                    <span class="block text-ellipsis">{{ruleDetailData.returnTemplate || '暂无'}}</span>
                    <div slot="content" class="tooltip-item">{{ruleDetailData.returnTemplate || '暂无'}}</div>
                </v-item-detail>
                <v-item-detail  :tooltip="true" label="等级：" :span="span">
                    <span class="block text-ellipsis">{{ruleDetailData.illegalLevel}}</span>
                    <div slot="content" class="tooltip-item">{{ruleDetailData.illegalLevel}}</div>
                </v-item-detail>
                <v-item-detail  
                    :tooltip="true" 
                    :prop="'preValue.' + index + '.defaultValue'"
                    :label="item.keyDesc"
                    v-for="(item, index) in ruleDetailData.preValue"
                    :key="item.id"
                    :rules="ruleObj" :span="span"
                >
                    <span class="block text-ellipsis">{{ruleDetailData.defaultValue}}</span>
                    <div slot="content" class="tooltip-item">{{ruleDetailData.defaultValue}}</div>
                </v-item-detail>
            </div>
        </div>
        <div>
            <div class="sepLine"></div>
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
import {createNamespacedHelpers} from 'vuex';
const {mapMutations, mapGetters, mapActions} = createNamespacedHelpers('scene');
import {getRuleParameterInfo} from 'src/js/api/sceneManage/scene';
import {getList} from "js/api/shangbao/businessManage.js";
export default {
    data () {
        return {
            span: 8,
            filterText: '',
            bShow: true,
            btnSize: CONFIG.baseBtn,
            formSize: CONFIG.homeFormSize,
            safeList: [],
            defaultProps: {
                children: 'children',
                label: 'ruleName'
            },
            ruleList: [],
            rules: {
            },
            cShow: false,
            checkedKeys: [],
            ruleDetailData: {
                
            },
            safeNames: []
        };
    },
    computed: {
        showNames () {
            return this.safeNames.join(';');
        },
        ...mapGetters(['ruleTreeData', 'detailData', 'pageType'])
    },
    props: {},
    created () {
        getList({offset: 1, limit: 500}).then(res => {
            this.safeList = res.data.list;
            let safeIds_ = this.detailData.safeIds.split(';');
            if (safeIds_.length === 0 || res.data.list === 0) {
                return;
            }
            console.log(typeof safeIds_);
            if (this.safeList.length !== 0) {
                safeIds_.forEach((safeId_) => {
                    console.warn("153", safeId_);
                    let tmp = this.safeList.filter((item) => {
                        return safeId_ + '' === item.id + '';
                    })[0] || {insuranceName: '待定' + safeId_};
                    console.warn('157', [tmp]);
                    this.safeNames.push(tmp.insuranceName);
                });
                if (this.detailData.safeType === '0') {
                    this.safeNames = [];
                }
            }
        });
        let ruleList_ = [];
        let ruleString = '';
        this.detailData.dataRules.forEach((item) => {
            ruleList_.push(item.ruleNo);
        });
        console.log(typeof this.detailData.safeIds);
        let safeIds_ = this.detailData.safeIds.split(';');
        console.log(typeof safeIds_);
        if (this.safeList.length !== 0) {
            this.detailData.safeNames = [];
            safeIds_.forEach((safeId_) => {
                console.warn("175", safeId_);
                let tmp = this.safeList.filter((item) => {
                    return safeId_ + '' === item.id + '';
                })[0] || {insuranceName: '待定' + safeId_};
                console.warn('180', [tmp]);
                this.detailData.safeNames.push(tmp.insuranceName);
            });
            if (this.detailData.safeType === '0') {
                this.detailData.safeNames = [];
            }
        }
        ruleList_.push('');
        ruleString = ruleList_.join(';');
        let ruleTreeShow = [];
        this.ruleTreeData.forEach((item) => {
            let temp = this.getRuleList_(item, item.children, ruleString);
            if (temp !== '') {
                ruleTreeShow.push(temp);
            }
        });
        this.detailData.ruleList = ruleTreeShow;
    },
    mounted () {
    },
    methods: {
        getRuleList_ (item, children_, ruleString) {
            let backList = JSON.parse(JSON.stringify(item));
            backList.children = [];
            children_.forEach((temp) => {
                if (temp.children.length > 0) {
                    let temp_ = this.getRuleList_(temp, temp.children, ruleString);
                    if (temp_ !== '') {
                        backList.children = temp_.children;
                    }
                } else {
                    let ruleNo_ = temp.ruleNo + ';';
                    if (ruleString.indexOf(ruleNo_) !== -1) {
                        backList.children.push(temp);
                    }
                }
            });
            if (backList.children.length === 0) {
                return '';
            }
            return backList;
        },
        formatText (applyCaseType) {
            let str = '';
            if (!applyCaseType) {
                return str;
            }
            let obj = {'0': '住院', '1': '门诊', '2': '药店'};

            let arr = applyCaseType.split(';');
            arr.forEach((item, index) => {
                let s = '/';
                if (index === arr.length - 1) {
                    s = '';
                }
                str += (obj[item] + s);
            });

            return str;
        },
        filterNode (value, data) {
            if (!value) return true;
            return data[this.defaultProps.label].indexOf(value) !== -1;
        },
        handleSearch () {
            this.$refs.tree.filter(this.filterText);
        },
        async handleNodeClick (rowObj, node, compoent) {
            let {ruleNo, ruleClass} = rowObj;
            if (ruleClass !== 0) {
                this.cShow = false;
                return false;
            }

            this.cShow = true;
            let {data} = await getRuleParameterInfo({ruleNo});
            this.ruleDetailData = data;
        },
        handleCancel () {
            console.log("cancel");
            this.setPageType();
        },
        ...mapMutations(['setPageType']),
        ...mapActions(['add', 'update'])
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
    .content{
        flex: 1;
        padding-left: 20px;
        display: flex;
        border-top: 8px solid rgba(243, 243, 243, 1);
        height: calc(100% - 298px);
        /deep/ .v-item-detail .text{
            border-bottom-width: 0;
        }
    }
    .detail-class{
        margin-left: 15px;
        margin-top: 8px;
        overflow: auto;
        width:60%;
    }
    .rule-class {
        width: 40%;
        border-right: 1px solid #dcdfe6;
        overflow: auto;
    }
    .sepLine {
        height: 1px;
        width: 100%;
        background-color: #D8D8D8;
    }
    .headContent {
        height:220px;
    }
</style>



