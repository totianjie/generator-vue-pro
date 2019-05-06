<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark:
-->
<template>
    <div class="wrap">
        <el-button-group class="btn-group">
            <el-button @click="handlerBtnClick(0)" :size="btnSize" :class="{'btn-action': btnAction === 0}">规则</el-button>
            <el-button @click="handlerBtnClick(1)" :size="btnSize" :class="{'btn-action': btnAction === 1}">疾病</el-button>
        </el-button-group>
        <div class="search-wrap">
            <v-search-input v-model="input" @search="handlerSearch"/>
        </div>
        <el-menu
            class="vertical-menu"
            ref="menu"
            :default-openeds="defaultOpeneds"
            @open="handleOpen"
            @select="handleSelect"
            @close="handleClose">
            <el-submenu :disabled="item.disabled" :index="item.code" v-for="item in menuList" :key="item.code">
                <template slot="title">
                    <div class="title-wrap" :class="{active: activeIndex === item.code}">
                        <i class="el-icon-document icon"></i>
                        <span class="text text-ellipsis" :title="item.title" v-text="item.name"></span>
                    </div>
                </template>
                <el-menu-item
                    :index="childrenItem.code"
                    :title="childrenItem.title"
                    :disabled="childrenItem.disabled"
                    v-for="childrenItem in item.childRuleList"
                    :key="childrenItem.code"
                >
                    {{childrenItem.name}}
                </el-menu-item>
            </el-submenu>
        </el-menu>

    </div>
</template>

<script>
    import CONFIG from 'src/config';
    import {deepCopy} from 'js/utils/utils';
    import busEvent from 'src/busEvent';
    import {
        getListDisease, // 疾病
        getListRule // 规则
    } from 'js/api/workbench/caseDisplay/index';

    export default {
        data () {
            return {
                btnSize: CONFIG.homeBtn,
                // formSize: CONFIG.homeFormSize,
                formSize: 'mini',
                btnAction: 0, // 默认是规则
                input: '',
                activeIndex: -1, // 当前先中的项是在哪个el-submenu 下  存的是submenu的index
                defaultOpeneds: [], // 默认打开的菜单数组
                menuList: [],
                oldMenuList: []
            };
        },
        created () {
            this._getData();
        },
        mounted () {
            this.$nextTick(() => { // 默认进来打开全部
                // this.$refs.menu.open(1);
                // this.$refs.menu.open(2);
            });
        },
        methods: {
            _getData (n = 0) {
                let query = n === 0 ? getListRule : getListDisease;
                this.$load.show();
                query().then((result) => {
                    this.menuList = Object.assign([], result.data);
                    this.defaultOpeneds = []; // 打开所有菜单
                    if (this.menuList.length > 0) {
                        this.menuList.forEach((item) => {
                            if (!item.disabled) {
                                this.defaultOpeneds.push(item.code);
                            }
                        });
                    }
                    this.oldMenuList = deepCopy(this.menuList);
                    this.$load.hide();
                }).catch(err => {
                    console.error('修改失败', err);
                    this.menuList = [];
                    this.$load.hide();
                });
            },
            handlerBtnClick (index) { // 规则  疾病  切换
                if (this.btnAction === index) { // 当前项点击
                    return false;
                }
                this.input = '';
                this.btnAction = index;
                this.activeIndex = -1;
                this._getData(index);
            },
            handlerSearch () { // 查询
                let keyword = this.input;
                let newArr = deepCopy(this.oldMenuList);

                if (!keyword) {
                    this.menuList = Object.assign([], newArr);
                    return false;
                }

                fn(newArr);
                newArr = newArr.filter((item) => item.display);
                newArr.forEach((item) => {
                    item.childRuleList = item.childRuleList.filter((child) => child.display);
                });
                this.menuList = Object.assign([], newArr);

                function fn (arr = []) {
                    if (Array.isArray(arr) && arr.length > 0) {
                        arr.forEach((item) => {
                            item.display = item.name.includes(keyword);
                            if (!item.display) {
                                item.display = fn(item.childRuleList);
                            }
                        });
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
                busEvent.$emit('workbench/caseDisplay.menuSelect', {key, pathKey, status: this.btnAction});
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
</style>
