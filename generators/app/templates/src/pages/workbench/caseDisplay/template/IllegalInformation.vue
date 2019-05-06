<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 违规信息
-->
<template>
    <section class="illegal-information">
        <div class="title-wrap">
            <span class="pull-left title">违规信息</span>
            <span class="pull-right btn modify" @click="handlerExport">导出</span>
            <span class="pull-right btn" @click="handlerModifyRepository">修改知识库</span>
            <span class="pull-right btn" @click="handlerModifyContrast">修改对照</span>
        </div>
        <ul class="content">
            <li v-for="item in list" :key="item.ruleNo">
                <dl class="item">
                    <dt class="title">
                        <el-checkbox v-model="item.checked" @change="handleCheckboxChange"></el-checkbox>
                        <span class="title-text text-ellipsis" @click="handlerViewDetails(item)" :title="item.ruleName" v-text="item.ruleName"></span>
                        <span class="on" v-show="item.updateFlag">对照已修改</span>
                    </dt>
                    <dd
                        class="text text-ellipsis"
                        v-for="(details, index) in item.detailVoList"
                        v-text="details.projectName"
                        :title="details.projectName"
                        :key="index"
                        v-show="index < 2"
                    >
                    </dd>
                    <dd class="text text-ellipsis" v-show="index >= 2">...</dd>
                </dl>
            </li>
            <!--<li>
                <dl class="item">
                    <dt class="title">
                        <el-checkbox v-model="checked2"></el-checkbox>
                        <span class="title-text text-ellipsis" @click="handlerViewDetails">冠状动脉粥样硬化性心脏病(详情)</span>
                        <span class="on">对照已修改</span>
                    </dt>
                    <dd class="text text-ellipsis">实验室检验缺失的项目【糖及其代谢物</dd>
                    <dd class="text text-ellipsis">谢物测定，尿常</dd>
                    <dd class="text text-ellipsis">...</dd>
                </dl>
            </li>-->
        </ul>
        <!-- 查看违规信息 -->
        <dialog-illegal-details :illegalDetailsShow.sync="illegalDetailsShow" :detail="detail"/>
        <!-- 修改知识库 -->
        <dialog-modify-repository :modifyRepositoryShow.sync="modifyRepositoryShow"/>
        <!-- 修改对照 -->
        <dialog-modify-contrast :modifyContrastShow.sync="modifyContrastShow"/>
    </section>
</template>

<script>
    import DialogIllegalDetails from './DialogIllegalDetails';
    import DialogModifyRepository from './DialogModifyRepository';
    import DialogModifyContrast from './DialogModifyContrast';
    import {getIllegalInformation} from 'js/api/workbench/caseDisplay/index';

    export default {
        data () {
            return {
                list: [],
                modifyContrastShow: false, // 修改对照
                modifyRepositoryShow: false, // 修改知识库
                illegalDetailsShow: false, // 违规详情
                jzcode: '',
                detail: {}
            };
        },
        methods: {
            // 导出
            handlerExport () { // 先选择病例才可以做导出
                console.log('导出');
                // if (!this.jzcode) { // TODO 目前这个版本先不做
                //     this.$toast('请先选择病例');
                //     return false;
                // }
            },
            handleCheckboxChange (val) { // 复选框值变化
                console.log(val);
                console.log(this.list);
            },
            // 修改知识库
            handlerModifyRepository () { // TODO 目前这个版本先不做
                // if (!this._isChecked()) return false;
                // this.modifyRepositoryShow = true;
                console.log('修改知识库');

            },
            // 修改对照
            handlerModifyContrast () { // TODO 目前这个版本先不做
                // if (!this._isChecked()) return false;
                // this.modifyContrastShow = true;
                console.log('修改对照');
            },
            _isChecked () { // 复选框是否有被选中
                if (this.list.some((item) => item.checked)) {
                    return true;
                }
                this.$toast('请选选择违规信息');
            },
            // 查看详情
            handlerViewDetails (item) {
                this.illegalDetailsShow = true;
                this.detail = Object.assign([], item);
                console.log('查看详情');
                console.log(this.illegalDetailsShow);
            },
            _getData ({jzcode}) { // 获取数据
                console.log('违规信息获取数据');
                this.jzcode = jzcode;
                getIllegalInformation({jzcode}).then(({data}) => {

                    this.list = Object.assign([], data);
                });
            },
            _reset () { // 重置方法
                this.detail = {};
                this.jzcode = '';
                this.list = [];
                console.log('违规信息重置');
            }
        },
        components: {DialogIllegalDetails, DialogModifyRepository, DialogModifyContrast}
    };
</script>

<style scoped lang="scss">
    .illegal-information {
        display: flex;
        flex-direction: column;
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
                margin-right: 13px;
                color: #4579C5;
                cursor: pointer;
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
</style>
