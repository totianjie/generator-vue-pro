<!-- Created by Nelson on 2018/10/25 -->
<template>
    <div>
        <div class="function-wrap" v-if="!setShow" >
            <el-button @click="setAudit" :size="btnSize">设置</el-button>
        </div>
        <list-table
            v-if="!setShow"
            class="list-table"
            :tableData="tableData"
            @update="_getData"
        ></list-table>
        <div class="content-page" style="" v-show="setShow">
            <div class="center-style">
                <v-steps :active="activeIndex" class="step-wrap p-l-r-40">
                    <v-step title="流程节点数量设置"></v-step>
                    <v-step title="流程节点配置设置"></v-step>
                </v-steps>
            </div>
            <div class="button--right--group">
                <el-button size="small" type="" @click="lastStep">{{activeIndex==1?"取消":"上一步"}}</el-button>
                <el-button size="small" type="primary" @click="nextStep">{{activeIndex==1?"下一步":"执行"}}</el-button>
            </div>
            <section class="first m-t-45 core-body" v-if="activeIndex===1">
                <first-step
                @delData='delData'
                @changeData="changeData"
                :tableData="tableData"
                />
            </section>
            <section class="second m-t-45 core-body" v-if="activeIndex===2">
                <second-step
                :delData = "delDataArr"
                @changeData="changeData"
                :tableData="tableData2"
                />
            </section>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {deepCopy} from 'js/utils/utils';
    import ListTable from './ListTable';
    import FirstStep from './components/FirstStep';
    import SecondStep from './components/SecondStep';
    import { getStepsList, stepUpdate, stepNext} from "js/api/authorityManage/processAudit";
    export default {
        props: {},
        data () {
            return {
                tableData2: [],
                delDataArr: [],
                tableData: [],
                createBy: '',
                createTime: '',
                total: 0,
                activeIndex: 1,
                setShow: false,
                btnSize: CONFIG.homeBtn,
                listParams: {
                    limit: CONFIG.limit,
                    offset: 1
                }
            };
        },
        computed: {

        },
        watch: {
            activeIndex (index_) {
                if (index_ === 0) {
                    this.setShow = false;
                } else {
                    this.setShow = true;
                }
            }
        },
        created () {
            this._getData();
            // this.activeIndex = 1;
            // this.setShow = true;
        },
        methods: {
            setAudit () {
                this.activeIndex = 1;
                this.setShow = true;
            },
            changeData (val, pageIndex) {
                if (pageIndex === 1) {
                    this.tableData = val;
                }
                if (pageIndex === 2) {
                    this.tableData2 = val;
                }
            },
            _getData () {
                getStepsList().then((res) => {
                    res.data.map((item, index) => {
                        item.delete = true;
                        item.add = true;
                        item.rejectedName = item.rejectedName || '无';
                        item.turnToName = item.turnToName || '无';
                        item.lowerNodeName = item.lowerNodeName || '无';
                        item.turnToCode = item.turnTo || '';
                        item.rejectedCode = item.rejected || '';

                        return item;
                    });

                    this.tableData = res.data;
                    this.total = this.tableData.length;
                });
            },
            delData (item) {
                this.delDataArr.push(item);
            },
            lastStep () {
                this.tableData2 = [];
                if (this.activeIndex === 1) {
                    this.setShow = false;
                    this.delDataArr = [];
                    this.tableData = [];
                    this._getData();
                    this.activeIndex = 0;
                    return;
                }
                if (this.activeIndex > 1) {
                    this.activeIndex--;
                }
            },
            nextStep () {
                if (this.activeIndex >= 2) {
                    let tableDataBack = this.tableData2.map((res, index) => {
                        let {id, nodeCode, rejectedCode, turnToCode} = res;
                        return {id, nodeCode, rejected: rejectedCode, turnTo: turnToCode};
                    });
                    stepUpdate(tableDataBack).then(res => {
                        this.setShow = false;
                        this.activeIndex = 0;
                        this.delDataArr = [];
                        this.tableData = [];
                        this.tableData2 = [];
                        this._getData();
                    });
                    return;
                }
                if (this.tableData.length === 0) {
                    this.$toast('请新增节点并完善信息!');
                    return;
                }
                let result = this.tableData.filter((item2, index) => {
                    return item2.nodeName.length === 0;
                });
                console.info('nextStep', result);
                if (result.length > 0) {
                    this.$toast('您还有节点信息没有完善,请完善节点信息!');
                    return;
                }
                let tableDataBack = this.tableData.map((res, index) => {
                    res.steps = index;
                    let {nodeCode, nodeName, remark, steps} = res;
                    return {nodeCode, nodeName, remark, steps};
                });
                stepNext(tableDataBack).then(res => {
                    res.data.map((item, index) => {
                        item.delete = true;
                        item.add = true;
                        item.remark = item.remark || '';
                        item.rejectedName = item.rejectedName || '无';
                        item.turnToName = item.turnToName || '无';
                        item.lowerNodeName = item.lowerNodeName || '无';
                        item.turnToCode = item.turnTo || '';
                        item.rejectedCode = item.rejected || '';
                    });
                    this.tableData = res.data;
                    this.tableData.map((item, index) => {
                        if (index === 0) {
                            item.rejectedName = '';
                            item.rejectedCode = '';
                        }
                        if (index === this.tableData.length - 2) {
                            item.turnToName = '';
                            item.turnToCode = '';
                        }
                        if (index === this.tableData.length - 1) {
                            item.turnToName = '';
                            item.turnToCode = '';
                        }
                        item.index = index;
                        item.steps = index;
                        return item;
                    });
                    this.tableData2 = deepCopy(this.tableData);
                    this.activeIndex++;
                });
            }
        },
        components: {
            ListTable,
            FirstStep,
            SecondStep
        }
    };
</script>
<style lang="scss" scoped>
    .p-l-r-40 {
        margin: 0 auto;
        width: 600px;
        margin-top: 4px;
    }
    .center-style {
        width: calc(100% - 170px);
        min-width: 650px;
        float: left;
    }
    .button--right--group{
        display: block;
        margin-right: 15px;
        float: right;
        position: relative;
    }
    .list-table{
        height: calc(100% - 58px);
    }
    .modify-info {
        float: left;
        margin-left: 20px;
        margin-top: 20px;
    }
    .m-t-45{
        margin-top: 45px;
    }
    .core-body{
        height: calc(100% - 45px);
    }
    .content-page{
        height: calc(100% - 10px);
        width: 100%;
        margin-top: 10px;
        display: inline-block;
        min-width: 1024px;
    }
</style>
