<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark:
-->
<template>
    <div class="wrap">
        <el-button-group class="btn-group">
            <el-button @click="handlerBtnClick(2)" :size="btnSize" :class="{'btn-action': btnAction === 2}">医院</el-button>
            <el-button @click="handlerBtnClick(0)" :size="btnSize" :class="{'btn-action': btnAction === 0}">规则</el-button>
            <el-button @click="handlerBtnClick(1)" :size="btnSize" :class="{'btn-action': btnAction === 1}">疾病</el-button>
        </el-button-group>
        <div class="search-wrap">
            <v-search-input v-model="input" @search="handlerSearch" @change="handlerSearch"/>
        </div>
        <el-menu
            class="vertical-menu"
            ref="menu"
            :default-openeds="defaultOpeneds"
            @open="handleOpen"
            @select="handleSelect"
            v-if="menuList.length"
            @close="handleClose">
            <el-submenu :disabled="item.disabled" :index="item.code" v-for="item in menuList" :key="item.code">
                <template slot="title">
                    <div class="title-wrap" :class="{active: activeIndex === item.code}">
                        <i class="el-icon-document icon"></i>
                        <span class="text text-ellipsis" :title="item.title" v-text="item.name"></span>
                    </div>
                </template>
                <el-menu-item
                    :index="childrenItem.onlyKey"
                    :title="childrenItem.title"
                    :disabled="childrenItem.disabled"
                    v-for="childrenItem in item.childRuleList"
                    :key="childrenItem.code"
                >
                    {{childrenItem.name}}
                </el-menu-item>
            </el-submenu>

        </el-menu>
        <div v-if="!menuList.length" class="empty-data">
            <div style="margin-top: 50%;text-align: center;line-height: 150px;">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    import {beginDate} from './list.js';
    import CONFIG from 'src/config';
    import {deepCopy} from 'js/utils/utils';
    // import busEvent from 'src/busEvent';
    import {
        getListDisease, // 疾病
        getListRule, // 规则
        getListOrg
    } from 'js/api/workbench/auditCase/index';

    export default {
        data () {
            return {
                isGetData: false,
                btnSize: CONFIG.homeBtn,
                // formSize: CONFIG.homeFormSize,
                formSize: 'mini',
                pathKeyIndexs: '',
                btnAction: 2, // 默认是规则
                input: '',
                activeIndex: -1, // 当前先中的项是在哪个el-submenu 下  存的是submenu的index
                defaultOpeneds: [], // 默认打开的菜单数组
                menuList: [],
                oldMenuList: []
            };
        },
        created () {
            console.log('created');
            this.isGetData = false;
            this._getData();
        },
        props: {
            searchParameter: {
                type: Object,
                default: {
                }
            },
            finishRequest: {
                type: Boolean,
                default: false
            },
            pageType: {
                type: String,
                default: ''
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
        mounted () {
        
        },
        watch: {
            finishRequest (val) {
                if (val) {
                    this.defaultResult();
                }
            },
            currentItem (val) {
                if (val.nodeName) {
                    console.log('currentItem', val);
                    if (!this.isGetData) {
                        this._getData();
                    }
                }
            }
        },
        methods: {
            stringToDate (dateStr, separator = "-") {
                console.log("stringToDate", dateStr);
                let dateArr = dateStr.split(separator);
                let year = parseInt(dateArr[0]);
                let month;
                // 处理月份为04这样的情况
                let temp = typeof dateArr[1] === "string" ? dateArr[1] : dateArr[1] + "";
                if (temp.indexOf("0") === 0) {
                    month = parseInt(dateArr[1].substring(1));
                } else {
                    month = parseInt(dateArr[1]);
                }
                let day = parseInt(dateArr[2]);
                let date = new Date(year, month - 1, day);
                console.log("stringToDate", date);
                return date;
            },
            defaultResult (n = 2) {
                this.searchParameter = {
                    outHpDateEnd: new Date().getTime(),
                    outHpDateStart: this.stringToDate(beginDate).getTime()
                };
                console.log('defaultResult');
                if (!this.isGetData) {
                    this._getData(n);
                }
            },
            _reset (doIt = false, clearSelect = false) {
                console.info('tag', '_reset-aside');
                this.pathKeyIndexs = '';
                this.activeIndex = -1;
                this.searchParameter = {};
                this.menuList = [];
                this.input = '';
                if (clearSelect) {
                    this.btnAction = 2;
                }
                this.defaultOpeneds = []; // 默认打开的菜单数组
                this.menuList = [];
                this.oldMenuList = [];
                if (doIt) {
                    console.log('_reset', 'defaultResult --- 164');
                    this.defaultResult();
                }
            },
            _getData (n = 2) {
                console.log('_getData', n, this.currentItem, JSON.stringify(this.searchParameter));
                if (this.pageType !== 'all') {
                    if (this.currentItem.nodeCode === '') {
                        console.log('_getData', ' 没有获取节点信息');
                        return;
                    }
                    if (this.currentItem.nodeCode.indexOf("10000") !== -1) {
                        this.$toast("系统初始化异常,请联系管理员!");
                        return;
                    }
                }
                if (this.searchParameter) {
                    let lengthK = this.searchParameter.jzCode && this.searchParameter.jzCode.length || 0;
                    let lengthS = this.searchParameter.outHpDateStart && this.searchParameter.outHpDateStart.toString.length || 0;
                    let lengthE = this.searchParameter.outHpDateEnd && this.searchParameter.outHpDateEnd.toString.length || 0;
                    if ((lengthK + lengthS + lengthE) === 0) {
                        console.log('_getData', 'defaultResult --- 186');
                        this.defaultResult(n);
                        return;
                    }
                } else {
                    console.log('_getData', 'defaultResult --- 192');
                    this.defaultResult(n);
                    return;
                }
                this.isGetData = true;
                let query = n === 0 ? getListRule : (n === 1 ? getListDisease : getListOrg);
                this.$load.show();
                this.searchParameter = Object.assign({}, this.searchParameter, {nodeCode: this.currentItem.nodeCode});
                if (this.searchParameter.outHpDateStart === 0) {
                    this.searchParameter.outHpDateStart = '';
                    this.searchParameter.outHpDateEnd = '';
                }
                console.log('_getData', this.searchParameter);
                query(this.searchParameter).then((result) => {
                    this.isGetData = false;
                    this.menuList = Object.assign([], result.data);
                    this.defaultOpeneds = []; // 打开所有菜单
                    if (this.menuList.length > 0) {
                        this.menuList.forEach((item) => {
                            if (!item.disabled) {
                                this.defaultOpeneds.push(item.code);
                            }
                            item.childRuleList.forEach((res) => {
                                res.onlyKey = item.code + '==##==' + res.code;
                            });
                        });
                    }
                    this.oldMenuList = deepCopy(this.menuList);
                    if (JSON.stringify(this.oldMenuList).indexOf(this.pathKeyIndexs) === -1) {
                        this.activeIndex = -1;
                    }
                    if (this.input.length > 0) {
                        this.handlerSearch();
                    }
                    this.$load.hide();
                }).catch(err => {
                    console.log('修改失败', err);
                    this.menuList = [];
                    this.$load.hide();
                });
            },
            handlerBtnClick (index) { // 规则  疾病  切换
                if (this.btnAction === index) { // 当前项点击
                    console.warn("sssss");
                    return false;
                }
                // this.input = '';
                this.btnAction = index;
                this.activeIndex = -1;
                console.log('handlerBtnClick');
                this._getData(index);
                console.log('handlerBtnClick', index);
            },
            handlerSearch () { // 查询
                let keyword = this.input;
                let newArr = deepCopy(this.oldMenuList);

                if (!keyword) {
                    this.menuList = Object.assign([], newArr);
                    return false;
                }
                fn(newArr);
                console.log('newArr-1->', newArr);
                newArr.forEach((item) => {
                    if (item.group === false) {
                        item.childRuleList = item.childRuleList.filter((child) => child.display);
                        if (item.childRuleList.length === 0) {
                            item = null;
                        }
                    } else {
                        // 如果父子都启动筛选 ，开启下边代码，修改 函数item.display = fn子类第3个默认转入值
                        // if (!item.whole) {
                        //     item.childRuleList = item.childRuleList.filter((child) => child.display);
                        // }
                    }
                    return item;
                });
                console.log('newArr-2->', newArr);
                newArr = newArr.filter((item) => item.display);
                console.log('newArr-3->', newArr);
                this.menuList = Object.assign([], newArr);
                function fn (arr = [], isFrist = true, defaultResult = false) {
                    if (Array.isArray(arr) && arr.length > 0) {
                        arr.forEach((item) => {
                            if (defaultResult) {
                                item.display = true;
                            } else {
                                item.display = item.name.includes(keyword);
                                if (isFrist) {
                                    if (item.display) {
                                        item.group = true;
                                        // 如果要筛选出 父子类对应包含 把最后一个true 改成 false
                                        item.display = fn(item.childRuleList, false, true);
                                    } else {
                                        item.group = false;
                                        item.display = fn(item.childRuleList, false);
                                    }
                                    if (item.childRuleList.length === item.childRuleList.filter((child) => child.display).length) {
                                        item.whole = true;
                                    } else {
                                        item.whole = false;
                                    }
                                }
                            }
                        });
                        if (defaultResult) {
                            return defaultResult;
                        }
                        return arr.some((item) => item.name.includes(keyword));
                    }
                    return false;
                }
            },
            handleOpen (key, pathKey) { // 菜单打开
                console.log('open');
                console.log(key, pathKey);
            },
            handleClose (key, pathKey) { // 菜单关闭
                console.log('close');
                console.log(key, pathKey);
            },
            handleSelect (key, pathKey) { // 菜单选择
                let [activeIndex] = pathKey;
                this.activeIndex = activeIndex;
                this.pathKeyIndexs = pathKey[pathKey.length - 1];
                pathKey = pathKey[pathKey.length - 1].split('==##==');
                this.$emit('menuSelect', {key, pathKey, status: this.btnAction});
            },
            changeResult (val) {
                this.searchParameter = val;
                console.log('changeResult');
                this._getData(this.btnAction);
                console.log('全部数据给后台');
            }
        }
    };
</script>

<style scoped lang="scss">
    .wrap {
        display: flex;
        flex-direction: column;
    }

    .btn-group {
        display: flex;
        justify-content: center;
        padding: 8px 0;
        .btn-action {
            background-color: #4579C5;
            color: #fff;
        }
    }

    .search-wrap {
        padding: 0 10px;
    }

    .vertical-menu {
        padding-top: 10px;
        box-sizing: border-box;
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        border-right: none;
        /* 菜单标题 start */
        /deep/ .el-submenu__title {
            height: 26px;
            line-height: 26px;
            padding: 0 !important;
            background-color: #F6FAFF;
            .title-wrap {
                padding: 0 10px;
                box-sizing: border-box;
                &.active {
                    background-color: #DCECFF;
                    .text, .icon, & + i {
                        color: #4579C5;
                    }
                }
            }
            .text {
                display: inline-block;
                max-width: 108px;
            }
        }
        /deep/ .is-disabled .el-submenu__title {
            background-color: #EAEAEA !important;
        }
        /* 菜单标题 end */

        /* 菜单标题icon start */
        /deep/ .el-submenu [class^=el-icon-] {
            margin-right: 0;
            font-size: 14px;
            width: auto;
        }
        /* 菜单标题icon end */

        /* 菜单下的第一项 start */
        /deep/ .el-submenu .el-menu-item {
            height: 26px;
            padding-left: 38px !important;
            line-height: 26px;
            font-size: 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &.is-disabled {
                background-color: #EAEAEA !important;
            }
            &.is-active {
                background-color: #DCECFF;
            }
        }
        /* 菜单下的第一项 end */
    }
    .empty-data{
        height: calc(100% - 75px);
        margin: 0;
    }
</style>
