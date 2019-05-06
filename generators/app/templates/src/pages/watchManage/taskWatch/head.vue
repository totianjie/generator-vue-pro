<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <div class="over-hidden">
        <div class="v-search-box">
            <div class="w-c-246" :class="taskName.length>0?'input-wrap':'input-wrap2'">
                <el-col :span="11"  class="m-l-8">
                    <v-input :label="headTitle" :span="6" :pxUnit="true" :labelWidth="lableWidth">
                        <v-select v-model="selectMenu" :list="statusEnum" :size="formSize" class="" :props="selectProps" placeholder="请选择" />
                    </v-input>
                </el-col>
                <el-col :span="11" v-show="!isShowAll"  class="m-l-8">
                    <div   class="v-item-detail clearfix">  
                        <div  class="v-input clearfix pull-left" style="width: 110px;line-height: 32px;">{{headTitle2}}</div> 
                        <div  class="pull-left text" style="width: calc(100% - 110px);line-height: 32px;height: 32px;"> 
                            <div >
                                <el-tooltip :content="`${taskName}, 提示:当前为单任务监控!`" v-show="`${taskName}, 提示:当前为单任务监控!`.length>7" placement="bottom">
                                    <span>{{`${taskName}, 提示:当前为单任务监控!`}}</span>
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
            <!-- <div :class="!isShowAll?'btn-wrap':'btn-wrap2'"> -->
            <div class="btn-wrap" :class="taskName.length>0?'btn-wrap':'btn-wrap2'">
                <el-button type="primary" @click="changeAll" :size="btnSize" v-show="!isShowAll">切换全部监控</el-button>
                <el-button type="primary" @click="changeAll" :size="btnSize" v-show="isShowAll && taskName.length>0 && false">切换单个监控</el-button>
                <el-button type="primary" @click="handlerSearch" :size="btnSize">查询</el-button>
                <!-- <el-button type="primary" @click="back" :size="btnSize" v-show="showBack">返回</el-button> -->
            </div>
        </div>
    </div>
</template>
<script>
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('watchManage');
    export default {
        props: {
            headTitle: {
                type: String,
                default () {
                    return '';
                }
            },
            selectMenuP: {
                type: String,
                default () {
                    return '';
                }
            }
        },
        data () {
            return {
                headTitle2: '当前任务名称为: ',
                lableWidth: 70,
                lableWidth2: 110,
                selectProps: {
                    name: 'name',
                    value: 'name'
                },
                span: 11,
                selectMenu: '',
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn
            };
        },

        computed: {
            ...mapGetters(['taskName', 'taskType', 'excStatus', 'statusEnum', 'taskCode', 'isShowAll'])
        },

        watch: {

        },
        create () {
            console.log("1", this.excStatus);
        },
        methods: {
            selectStatus (val) {
                this.selectMenu = val;
            },
            handlerSearch () {
                console.log('handlerSearch', this.selectMenu);
                if (this.selectMenu === undefined) {
                    this.setExcStatus('');
                    this.resetOffset();
                    this.requestData();
                    this.$emit("resetPage");
                    return;
                }
                if (!this.selectMenu.length) {
                    this.setExcStatus('');
                    this.resetOffset();
                    this.requestData();
                    this.$emit("resetPage");
                    return;
                }
                let objArr = this.statusEnum.filter(res3 => {
                    return res3.name === this.selectMenu;
                }) || [];
                let obj = objArr[0] || {};
                console.log([obj]);
                this.setExcStatus(obj.excStatus);
                this.resetOffset();
                this.requestData();
                this.$emit("resetPage");
            },
            back () {
                this.$emit('back');
            },
            changeAll () {
                this.setIsShowAll(!this.isShowAll);
                this.setTaskName('');
                this.requestData();
            },
            ...mapMutations({
                setTaskName: "setTaskName",
                setTaskType: "setTaskType",
                setExcStatus: 'setExcStatus',
                setParameters: 'setParameters',
                setTaskCode: 'setTaskCode',
                setIsShowAll: 'setIsShowAll',
                setList: 'setList',
                setStatusEnum: 'setStatusEnum'
            }),
            ...mapActions(['requestData', 'resetOffset'])

        },
        components: {
            
        }
    };
</script>
<style lang="scss" scoped>
    .m-t-5 {
        margin-top: 5px;
    }
    .search-status-class{
        min-width: 350px;
    }
    .btn-wrap {
        width: 246px !important;
    }
    .input-wrap{
        width: calc(100% - 246px) !important;;
    }
    .btn-wrap2 {
        width: 146px !important;
    }
    .input-wrap2 {
        width: calc(100% - 146px) !important;;
    }
    .v-search-box {
        padding: 8px 0;
        overflow: hidden;
        > .input-wrap, > .btn-wrap {
            float: left;
        }
        > .input-wrap2, > .btn-wrap2 {
            float: left;
        }
    }
    .m-t-8 {
        margin-top: 8px;
    }
    .m-l-8{
        margin-left: 8px;
    }
</style>
