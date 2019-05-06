<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 收费明细
-->
<!--收费明细type=1：
药品（单独列表）：去掉医嘱结束执行时间
检查：去掉项目实际数量、计价单位
治疗：去掉项目数量单位、项目实际数量
材料：去掉次数、项目数量单位
其他：去掉次数、项目数量单位、计价单位-->

<template>
    <div class="table-wrap">
        <!--按钮页面-->
        <btns
            @handleBtn="handleBtnClick"
            @handleDetailBtn="handleDetailBtnClick"
            :btnAction="btnAction"
            :btnDetailAction="btnDetailAction"
            @search="handlerSearch"
            v-model="input"
        />
        <!--去重后项目页面-->
        <medical-remove-table v-if="detailType === 0" :removeTableData="removeList" :labelText="labelText"/>
        <!--详细明细：药品页面-->
        <medical-drug-detail-table  v-if="btnAction === '1' && detailType === 1" :detailTableDate="detailList" :caseType="caseType"/>
        <!--详细明细：检查页面-->
        <medical-check-detail-table  v-if="btnAction !== '1' && detailType === 1" :detailTableDate="detailList" :btnAction="btnAction" :caseType="caseType"/>
        <v-paging
            :total="total"
            ref="bPage"
            @pagingChange="handlePagingChange">
        </v-paging>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import Btns from './Btns';
    import MedicalCheckDetailTable from './MedicalCheckDetailTable';
    import MedicalDrugDetailTable from './MedicalDrugDetailTable';
    import MedicalRemoveTable from './MedicalRemoveTable';
    import {getMedicalChargeRemove, getMedicalChargeDetail} from 'js/api/workbench/auditCase/caseinfo';
    export default {
        data () {
            return {
                total: 0, // 分页总条数
                btnSize: CONFIG.homeBtn,
                btnAction: '1', // 默认按钮为药品（左边按钮）
                btnDetailAction: 0, // 默认按钮去重后项目（右边按钮）
                detailType: 0, // 0=去重后项目，1=详细明细按钮的切换
                labelText: '药品', // 只有一列表格的表头label默认名称为药品
                removeList: [], // 去重后项目表格数据
                detailList: [], // 详细明细表格数据
                removeParams: { // 去重后项目表格参数
                    detailFrom: '1', // 1=收费  2=医嘱
                    jzcode: '', // 就诊号
                    keyword: '', // 关键字
                    limit: CONFIG.limit, // 每页限数
                    offset: 1, // 当前页数
                    type: '1' // 类型：1=药品 2=治疗 3=检查 4=耗材 5=其他
                },
                detailParams: { // 详细说明表格参数
                    detailFrom: '1', // 1=收费  2=医嘱
                    jzcode: '', // 就诊号
                    keyword: '', // 关键字
                    limit: CONFIG.limit, // 每页限数
                    offset: 1, // 当前页数
                    type: '1' // 类型：1=药品 2=治疗 3=检查 4=耗材 5=其他
                },
                input: '',
                caseType: 1 // 1=收费  2=医嘱
            };
        },

        mounted () {},

        methods: {
            // 获取去重后项目表格数据
            _getMedicalChargeRemove () {
                getMedicalChargeRemove(this.removeParams).then(res => {
                    this.removeList = res.data.list;
                    this.total = res.data.total;
                    console.log('total', this.total);
                });
            },
            // 获取详细明细表格数据
            _getMedicalChargeDetail () {
                getMedicalChargeDetail(this.detailParams).then(res => {
                    console.log('详细说明res', res);
                    this.detailList = res.data.list;
                    this.total = res.data.total;
                });
            },
            // btnType=左边按钮类型（ 1=药品,2=检查，3=治疗，4=材料，5=其他按钮的切换），text=单击左边按钮文本
            handleBtnClick (btnType, text) {
                this.btnAction = btnType;
                console.log('左边按钮btnAction', this.btnAction);
                this.removeParams.type = btnType;
                console.log('去重项目', this.removeParams.type);
                this.detailParams.type = btnType;
                console.log('详细说明', this.detailParams.type);
                this.labelText = text; // 将按钮的文本赋值给表格的表头
                if (text !== '药品') { // 除了药品按钮外，其他按钮的去重列表头都为项目
                    this.labelText = '项目';
                }
                if (this.btnDetailAction === 0 && this.removeParams.jzcode) { // 点击左边按钮和去重就调去重列表
                    this._getMedicalChargeRemove();
                } else if (this.btnDetailAction === 1 && this.detailParams.jzcode) { // 点击左边按钮和详细就调详细列表
                    this._getMedicalChargeDetail();
                }
            },
            // 去重后项目,详细明细按钮的切换，index就是右边按钮下标
            handleDetailBtnClick (index) {
                console.log('999====>>', this.btnAction);
                this.detailParams.type = this.btnAction; // 将选中左边按钮类型赋值给详细明细的类型
                this.btnDetailAction = index;
                console.log('右边按钮btnDetailAction', this.btnDetailAction);
                this.detailType = index;
                if (index === 0 && this.removeParams.jzcode) { // 点击去重后项目，下标为0，就调用去重后项目列表，否则取就调用详细明细列表
                    this._getMedicalChargeRemove();
                } else if (index === 1 && this.detailParams.jzcode) {
                    this._getMedicalChargeDetail();
                }
                console.log('右边detailType', this.detailType);
            },
            handlerSearch () { // 查询
                console.log('input===>' + this.input);
                console.log("this.removeParams.jzcode" + this.removeParams.jzcode);
                let keyword = this.input;
                let limit_ = this.detailParams.limit;
                console.log('limit_', limit_);
                this.removeParams = Object.assign({}, this.removeParams, {
                    offset: 1
                });
                this.detailParams = Object.assign({}, this.detailParams, {
                    offset: 1
                });
                this.$refs.bPage.currentPage = 1;
                this.removeParams = Object.assign({}, this.removeParams, {
                    keyword: keyword,
                    offset: 1,
                    limit: limit_
                });
                this.detailParams = Object.assign({}, this.detailParams, {
                    keyword: keyword,
                    offset: 1,
                    limit: limit_
                });
                if (this.btnDetailAction === 0) {
                    this._getMedicalChargeRemove();
                } else if (this.btnDetailAction === 1) {
                    this._getMedicalChargeDetail();
                }
            },
            // 分页改变
            handlePagingChange (data) {
                console.log('handlePagingChange', data);
                // 点击去重后项目，下标为0，就调用去重后项目列表，否则取就调用详细明细列表
                this.removeParams = Object.assign({}, this.removeParams, data);
                this.detailParams = Object.assign({}, this.detailParams, data);
                if (this.btnDetailAction === 0 && this.removeParams.jzcode) {
                    this._getMedicalChargeRemove();
                } else if (this.btnDetailAction === 1 && this.detailParams.jzcode) {
                    this._getMedicalChargeDetail();
                }
            },
            // 重置表格数据
            _reset () {
                this.removeList = [];
                this.detailList = [];
                console.log('_reset==>>', Math.random());
            },
            // 获取点击上面表格每一行数据，在下面tabs切换页面展示
            _getData (data) {
                if (data.jzcode) {
                    this.removeParams.jzcode = data.jzcode;
                    this.detailParams.jzcode = data.jzcode;
                    if (this.btnDetailAction === 0) {
                        this._getMedicalChargeRemove();
                    } else if (this.btnDetailAction === 1) {
                        this._getMedicalChargeDetail();
                    }
                }
                console.log('_getData==>>', Math.random(), data);
            }
        },

        components: {Btns, MedicalCheckDetailTable, MedicalDrugDetailTable, MedicalRemoveTable}
    };
</script>
<style lang="scss" scoped>
    .table-wrap{
        /*按钮滚动条样式start*/
        height: 100%;
        overflow: hidden;
        /*按钮滚动条样式end*/
    }
</style>
