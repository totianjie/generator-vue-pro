<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 违规信息
-->
<template>
    <section class="illegal-information">
        <div class="title-wrap">
            <span :class="['pull-left title line-button',{btn:sysOrResult}]" @click="aduitSys">系统审核</span>
            <span :class="['pull-left line-button',{btn:!sysOrResult}]" @click="aduitResult">各审核结果</span>
        </div>
        <div v-show="sysOrResult" class="head-style">
            <ul class="w-fill" style="height:calc(100%-32px);" v-show="list.length" v-for="(item, index) in list"
            :key="index">
                <li class="btn-right">
                    <el-tooltip :content="item.ruleName" placement="top" v-if="item.ruleName&&item.ruleName.length>20">
                        <el-button class="clearfix-padding-margin-border text-ellipsis max-fill" 
                                    @click="handlerViewDetails(item)" 
                                    style="margin-bottom:10px;color:#4579C5;">
                                    {{item.ruleName}}
                        </el-button>
                    </el-tooltip>
                    <el-button class="clearfix-padding-margin-border text-ellipsis max-fill" 
                                    @click="handlerViewDetails(item)"
                                    v-if="item.ruleName&&item.ruleName.length<21" 
                                    style="margin-bottom:10px;color:#4579C5;">
                                    {{item.ruleName}}
                    </el-button>
                </li>
                <ul class="clearfix-padding-margin-border btn-right" 
                    style="margin-bottom:0px;margin-right:10px;">
                    <li class="m-b-15 text-ellipsis max-fill" 
                       style="max-height:16px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient: vertical;line-height:16px;" v-for="(item2, index2) in item.detailVoList"
            :key="index2" v-if="index2<2">
                    <el-tooltip :content="item2.projectName" placement="top" v-if="item2.projectName&&item2.projectName.length>20">
                        <span class="w-fill text-ellipsis" style="display:inline-block;">{{item2.projectName}}</span>
                    </el-tooltip>
                    <span class="w-fill text-ellipsis" v-if="item2.projectName&&item2.projectName.length<21" style="display:inline-block;">{{item2.projectName}}</span>
                    </li>
                    <li class="m-b-15" 
                       style="max-height:16px;display: -webkit-box;-webkit-line-clamp:1;-webkit-box-orient: vertical;line-height:16px;" v-for="(item2, index2) in item.detailVoList"
            :key="index2" v-if="index2>1&&index2===2">
                      ...
                    </li>
                </ul>
            </ul>
        </div>
        <div v-show="!sysOrResult && resultList.length" class="head-style">
            <div v-for="(item, index) in resultList" :key="index">
                <dt class="text-ellipsis" style="margin-bottom:9px;width:280px;">{{item.nodeName}}:</dt>
                <dd style="margin-left:60px;width:calc(100% - 86px)" 
                    @click.stop="handlerViewSuggest(item)">{{item.result=='Y'?'正常病例 ':(item.result=='N'?'违规病例 ':'申诉病例 ')}}<span class="" style="display:inline-block;color:#4579C5;padding-left:8px;margin-bottom:8px;">{{item.classType==1?"申诉信息":"审核意见"}}</span>
                    <div class="dd2 text-ellipsis" style="margin-top:0;margin-left:55px;width:calc(100% - 60px);color:#4579C5;">
                        <dt class="text-ellipsis" style="padding-bottom:9px;color:#4579C5;" 
                            @click.stop="handlerViewFileShow(item2)" 
                            v-for="(item2, index2) in item.filesVos" 
                            :key="index2">
                                <el-tooltip :content="item2.oldName" v-if="item2.oldName&&item2.oldName.length>=11" placement="top">
                                    <div class="text-ellipsis">
                                        {{item2.oldName | oldNameFormat}}
                                    </div>
                                </el-tooltip>
                                <div class="text-ellipsis" v-if="item2.oldName&&item2.oldName.length<11">
                                    {{item2.oldName}}
                                </div>
                        </dt>
                        <dd>
                        </dd>
                    </div>
                </dd>
            </div>
        </div>   
        <dialog-suggest-info :suggestInfoShow.sync="suggestInfoShow" :detail="detail"/>
        <dialog-complaint-info :comoplaintInfoShow.sync="comoplaintInfoShow" :detail="detail"/>
        <dialog-illegal-details :illegalDetailsShow.sync="illegalDetailsShow" :detail="detail"/>
        <files-show :fileShow.sync="fileShow" :htmlGet="htmlGet" :fileObj="fileObj"/>
    </section>
</template>

<script>
    import DialogIllegalDetails from './DialogIllegalDetails';
    import DialogSuggestInfo from './DialogSuggestInfo';
    import DialogComplaintInfo from './DialogComplaintInfo';
    import FilesShow from './FilesShow';
    import CONFIG from 'src/config';
    import {getIllegalInformation, getListRecords, getLook} from 'js/api/workbench/auditCase/index';
    export default {
        data () {
            return {
                htmlGet: '',
                show: true,
                list: [],
                resultList: [],
                comoplaintInfoShow: false, //  申诉信息展示
                suggestInfoShow: false, //  展示审核意见
                illegalDetailsShow: false, // 违规详情
                fileShow: false, //  是否显示文件
                fileObj: {}, //  文件对象
                jzcode: '',
                detail: {},
                sysOrResult: true
            };
        },
        props: {
            rowData: {
                type: Object,
                default: {

                }
            },
            currentItem: {
                type: Object,
                default: {
                    current: '',
                    nodeName: '',
                    nodeCode: ''
                }
            }
        },
        watch: {
            rowData (val) {
                console.info('tag', val);
                if (JSON.stringify(val) === "{}") {
                    this.detail = {};
                    this.jzcode = '';
                    this.list = [];
                    this.$nextTick(() => {
                        // this._reset();
                    });
                } else {

                }
            }
        },
        methods: {
            handlerViewFileShow (obj) {
                this.fileObj = Object.assign({}, obj);
                this.comoplaintInfoShow = false;
                this.suggestInfoShow = false;
                getLook(this.fileObj.id || '0').then(res => {
                    console.log('getLook', res);
                    if (res.indexOf("png") !== -1 || res.indexOf("jpg") !== -1 || res.indexOf('jpeg') !== -1) {
                        let url = `${CONFIG.URL}/${res}`;
                        this.htmlGet = `<img src="${url}" style="max-width: calc(100% - 40px);max-height: calc(100% - 65px);margin: 0 auto;display: block;" alt="图片请求失败" class="pc-img">`;
                        this.fileShow = true;
                    } else {
                        let url = `${CONFIG.URL}/${res}`;
                        let maxHeight = window.innerHeight - 150;
                        this.htmlGet = `<iframe src="${url}" style="max-width: calc(100% - 40px);max-height:${maxHeight};height:400px;width:800px;display:block;margin: 0 auto;"></iframe>`;
                        this.fileShow = true;
                    }
                }).catch(err => {
                    console.log('修改失败', err);
                });
                console.log('打开文件');
                console.log(this.fileShow, this.fileObj);
            },
            handlerViewComplaintInfo (item) {
                this.comoplaintInfoShow = true;
                this.detail = Object.assign([], item);
                console.log('申诉信息');
                console.log(this.comoplaintInfoShow, this.detail);
            },
            handlerViewSuggest (item) {
                if (item.result === 'A') {
                    this.handlerViewComplaintInfo(item);
                    return;
                }
                this.suggestInfoShow = true;
                this.detail = Object.assign({}, item);
                console.log('审核意见');
                console.log(this.suggestInfoShow, this.detail);
            },
            handlerViewDetails (item) {
                this.illegalDetailsShow = true;
                this.detail = Object.assign({}, item);
                console.log('查看详情');
                console.log(this.illegalDetailsShow, this.detail);
            },
            aduitSys () {
                this.sysOrResult = true;
                if (this.jzcode) {
                    getIllegalInformation({jzcode: this.jzcode}).then(({data}) => {
                        this.list = Object.assign([], Array.isArray(data[0]) ? data[0] : data);
                    });
                }
            },
            aduitResult () {
                this.sysOrResult = false;
                if (this.jzcode) {
                    getListRecords({jzcode: this.jzcode}).then(({data}) => {
                        data.forEach(element => {
                            if (element.nodeName.indexOf('医院') !== -1 || element.nodeName.indexOf('申诉') !== -1) {
                                element.classType = 1;
                            } else {
                                element.classType = 0;
                            }
                            let ass = element.filesVos.filter(element2 => {
                                return element2.oldName === null;
                            });
                            if (ass.length > 0) {
                                alert("数据异常");
                            }
                            element.filesVos = element.filesVos.filter(element2 => {
                                return element2.oldName && element2.oldName.length > 0;
                            });
                        });
                        this.resultList = Object.assign([], data);
                    });
                }
            },
            _reset () { // 重置方法
                console.log('_reset');
                this.detail = {};
                this.jzcode = '';
                this.list = [];
                this.resultList = [];
                this.sysOrResult = true;
                this.suggestInfoShow = false;
                this.illegalDetailsShow = false;
                console.log('_reset');
            },
            _getData ({jzcode}) { // 获取数据
                this.jzcode = jzcode;
                console.log('_getData-jzcode', this.jzcode);
                getIllegalInformation({jzcode}).then(({data}) => {
                    console.info('data', data);
                    let data_ = JSON.parse(JSON.stringify(data));
                    this.list = Object.assign([], Array.isArray(data_[0]) ? data_[0] : data_);
                });
                getListRecords({jzcode}).then(({data}) => {
                    console.info('data', data);
                    let data_ = JSON.parse(JSON.stringify(data));
                    data_.forEach(element => {
                        if (element.nodeName.indexOf('医院') !== -1) {
                            element.classType = 1;
                        } else {
                            element.classType = 0;
                        }
                        let ass = element.filesVos.filter(element2 => {
                            return element2.oldName === null;
                        });
                        if (ass.length > 0) {
                            alert("数据异常");
                        }
                        element.filesVos = element.filesVos.filter(element2 => {
                            return element2.oldName && element2.oldName.length > 0;
                        });
                    });
                    this.resultList = Object.assign([], data_);
                });
            }
        },
        filters: {
            oldNameFormat (oldName) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                let oldNameArr = oldName.split('.');
                return oldName.substr(0, 5) + "..." + oldNameArr[oldNameArr.length - 1];
            }
        },
        components: {DialogIllegalDetails, DialogSuggestInfo, DialogComplaintInfo, FilesShow}
    };
</script>

<style scoped lang="scss">
    .illegal-information {
        display: flex;
        flex-direction: column;
        // overflow-y: scroll;
        .title-wrap {
            flex: 0 0 30px;
            line-height: 30px;
            font-size: 14px;
            border-bottom: 1px solid #EFF2F6;
            .title {
                margin-left: 20px;
                position: relative;
                &::after {
                    content: '';
                    width: 4px;
                    height: 14px;
                    background: #4579c5;
                    position: absolute;
                    left: -11px;
                    top: 8px;
                }
            }
            .btn {
                // margin-right: 13px;
                color: #4579C5;
            }
        }
        .content {
            flex: 1;
            padding-top: 15px;
            padding-left: 8px;
            padding-bottom: 20px;
            overflow: auto;
            .item {
                .title {
                    color: #4579C5;
                    padding-bottom: 5px;
                    .title-text {
                        display: inline-block;
                        max-width: 210px;
                        margin-left: 5px;
                        color: #4579C5;
                        transform: translateY(5px);
                        cursor: pointer;
                    }
                    .on {
                        color: #FF0000;
                        float: right;
                        margin-right: 5px;
                        transform: translateY(5px);
                    }
                }
                .text {
                    padding: 5px 20px 5px 24px;
                    max-width: 270px;
                }
            }
        }
    }
    .line-button{
        display: inline-block;
        margin-right: 30px;
        cursor: pointer;
    }
    .m-b-15{
        margin-bottom: 15px;
    }
    .clearfix-padding-margin-border 
    {
        border:0;
        padding:0;
        margin:0
    }
    .head-style
    {
        margin-left:20px;
        margin-right:0;
        margin-top:16px;
        overflow-y:scroll;
        width: 320px;
        overflow-x: hidden;
    }
    .btn-right{
        width:calc(100% - 15px);
    }
    .max-fill {
        max-width: 100%;
    }
</style>
