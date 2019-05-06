<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark:
-->
<template>
    <nav class="nav-wrap">
        <span class="pre" @click="handlerPre"><i class="el-icon-caret-left"></i></span>
        <div class="nav-list" ref="navWrap">
            <ul class="list" ref="listWrap">
                <li
                    class="item"
                    v-for="(item, index) in navList"
                    :key="index"
                    v-text="item.text"
                    :class="{active: index === active}"
                    @click="handlerClick({item, index})"
                ></li>
            </ul>
        </div>
        <span class="next" @click="handlerNext"><i class="el-icon-caret-right"></i></span>
    </nav>
</template>

<script>
    import {addEvent, prefixStyle} from 'js/utils/dom';
    import busEvent from 'src/busEvent';

    const transform = prefixStyle('transform');
    console.log(transform);
    export default {
        data () {
            return {
                offset: 0,
                navWrapWidth: 0,
                listWrapWidth: 0,
                active: 0,
                navList: [
                    {value: 'DiagnoseTable', text: '诊断信息归类'},
                    {value: 'VisitDetail', text: '就诊信息'},
                    {value: 'VisitDiagnoseTable', text: '就诊诊断信息'},
                    {value: 'CaseDetail', text: '病案首页信息'},
                    {value: 'CaseDiagnoseTable', text: '病案首页诊断信息'},
                    {value: 'MedicalInfoTable', text: '医嘱信息'},
                    {value: 'ChargeTable', text: '收费明细'},
                    {value: 'LeaveHosTable', text: '出院小结'},
                    {value: 'CaseOperationTable', text: '病案首页手术信息'},
                    {value: 'OperationRecordTable', text: '手术记录信息'},
                    {value: 'CheckReportTable', text: '检验报告'},
                    {value: 'CheckResultsTable', text: '检查结果报告'},
                    {value: 'IllnessReportTable', text: '病理报告'}
                ]
            };
        },
        mounted () {
            busEvent.$on('component/aside_menu', () => { // 左边菜单缩小及放大动作
                setTimeout(() => {
                    this._getNavWidth();
                }, 500);
            });
            this.$nextTick(() => {
                this.navWrap = this.$refs.navWrap;
                this.listWrap = this.$refs.listWrap;
                this._getNavWidth();
                this._setWidth();
                addEvent(window, 'resize', ev => {
                    let oEvent = ev || event;
                    this._getNavWidth();
                    oEvent.preventDefault && oEvent.preventDefault();
                    return false;
                });
            });
        },
        methods: {
            handlerClick ({item, index}) { // tabs  click
                this.active = index;
                this.$emit('change', {item, index});
            },
            _getNavWidth (dom) { // 获取最外层宽度
                this.navWrapWidth = this.navWrap.getBoundingClientRect().width;
            },
            _setWidth () { // 设置list-wrap的宽度
                let aItems = this.listWrap.children;
                let w = 0;
                [...aItems].forEach((item) => {
                    w += item.getBoundingClientRect().width;
                });
                this.listWrapWidth = w;
                this.listWrap.style.width = w + 50 + 'px';
            },
            handlerPre () { // 上一页
                if (this.offset > 0) {
                    this.offset -= (this.navWrapWidth / 2);
                    if (this.offset < 0) {
                        this.offset = 0;
                    }
                }
                this._move();
            },
            handlerNext () { // 下一页
                if ((this.listWrapWidth - this.offset) > this.navWrapWidth) {
                    this.offset += (this.navWrapWidth / 2);

                    if (this.offset > this.listWrapWidth - this.navWrapWidth) {
                        this.offset = this.listWrapWidth - this.navWrapWidth;
                    }
                }
                this._move();
            },
            _move () {
                this.listWrap.style[transform] = `translateX(${-(this.offset)}px)`;
            },
            _reset () {
                this.active = 0;
                this.offset = 0;
                this._move();
                // this.$emit('change', {item: {value: '', text: ''}, index: -1});
                // setTimeout(() => { // TODO 此方法不好 目前不使用
                //     this.$emit('change', {item: {value: 'DiagnoseTable', text: '诊断信息归类'}, index: 0});
                // }, 50);

            }
        }
    };
</script>

<style scoped lang="scss">
    @import './../../../../scss/variables';

    .nav-wrap {
        box-sizing: border-box;
        display: flex;
        .pre, .next {
            flex: 0 0 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 22px;
            color: #909399;
            /*background-color: #ccc;*/
            &:hover {
                color: $default-nav-active-bg;
            }
        }
        .pre {
        }
        .next {
        }
        .nav-list {
            flex: 1;
            overflow: hidden;
            .list {
                height: 100%;
                width: 1500px;
                transition: 0.5s all linear;
                .item {
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0 16px;
                    background: #98B6E2;
                    border-right: 1px solid #EFF2F6;
                    color: #fff;
                    cursor: pointer;
                    &.active {
                        background-color: #2A3D59;
                    }
                }
            }
        }
    }
</style>
