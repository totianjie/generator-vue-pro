<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 病例展示
-->
<template>
    <section class="case-display-wrap" :class="pageType">
        <section class="page">
            <div class="w-fill bgcolor-border-color" v-show="pageType!=='all'" >
                <div class="tabBox">
                    <el-button class="el-button--default el-button--small" 
                               type="" 
                               v-for="(item, index) in menu"
                               :key="index" 
                               :class="item.active===active?'btn-action':''" 
                               @click="click(item)">
                                    {{item.nodeName}}
                    </el-button>
                </div>
            </div>
            <search-box ref="searchResultRef" 
                        @search="handleSearch" 
                        class="search-box" 
                        :pageType="pageType"/>
        </section>
        <section class="page h-fill wrapper" 
                 ref="mainRef" 
                 :class="pageType==='all'? 'wrapper-48': 'wrapper-80'">
            <Aside ref="aSiseRef" 
                   :currentItem="currentItem" 
                   :searchParameter="searchParameter" 
                   @menuSelect="menuSelect"
                   :pageType="pageType" 
                   :finishRequest="finishRequest"
                   class="aside-wrap"/>
            <Main ref="contentWarpRef" 
                  :currentItem="currentItem" 
                  :searchParameter="searchParameter" 
                  class="content-wrap"
                  @refresh="refresh" 
                  @displayCasePage="displayCasePage" 
                  :pagingData="pagingData" 
                  :pageType="pageType" 
                  :class="pageType"/>
        </section>
    </section>
</template>

<script>
    import SearchBox from './template/SearchBox';
    import Main from './Main';
    import Aside from './Aside';
    import CONFIG from 'src/config';
    import {defaultPage, oriList} from './list.js';
    import {mapActions, mapGetters} from 'vuex';
    import {getListAuth} from 'js/api/workbench/auditCase/index';
    export default {
        data () {
            return {
                finishRequest: false,
                currentItem: {
                    current: '',
                    nodeName: '',
                    nodeCode: ''
                },
                defaultPage: '',
                oriList: [],
                menu: [],
                active: -1,
                pageWidth: 0,
                pagingData: {
                    limit: CONFIG.limit,
                    offset: 1
                },
                pageType: 'all',
                defaultPageType: 's0',
                searchParameter: {
                }
            };
        },
        created () {
            this.pageType = this.$route.query.page;
            console.log('tag', this.pageType);
            console.log('tag', this.pageType, this.$route.path);
            let path_ = this.$route.path;
            if (path_.indexOf('auditCaseAll') !== -1) {
                this.pageType = 'all';
            }
            // sessionStorage.removeItem('list_auth');
            // this.menu = JSON.parse(sessionStorage.getItem('list_auth')) || [];
            if (!this.menu.length) {
                console.log('getListAuth', "获取授权-1");
            }
            this._getListAuth();
        },
        mounted () {
            // this.$nextTick(() => {
            //     // 在vue中操作dom尽量用ref, 但它不是响应式的
            //     this.pageWidth = Math.max(this.$refs.mainRef.scrollWidth + 10, this.$refs.mainRef && this.$refs.mainRef.clientWidth);
            // });
            // const that = this;
            // window.onresize = () => {
            //     return (() => {
            //         window.screenWidth = document.body.clientWidth;
            //         that.screenWidth = window.screenWidth;
            //         this.$nextTick(() => {
            //             // 在vue中操作dom尽量用ref, 但它不是响应式的
            //             this.pageWidth = Math.max(this.$refs.mainRef && this.$refs.mainRef.scrollWidth + 10, this.$refs.mainRef && this.$refs.mainRef.clientWidth);
            //         });
            //     })();
            // };
        },
        watch: {
            '$route' (to, from) {
                // data数据操作
                this.pageType = this.$route.query.page || this.defaultPageType;
                let path_ = this.$route.path;
                console.log("$route", path_);
                if (path_.indexOf('auditCaseAll') !== -1) {
                    this.pageType = 'all';
                }
                this._getListAuth();
                console.log('route', this.$route.query.page);
                if (this.$route.query.page === undefined && path_.indexOf('auditCaseAll') === -1) {
                    this.active = 1;
                    this.pageType = this.defaultPageType;
                    if (this.menu.length > 0) {
                        this.currentItem = this.menu[0] || {page: 'all'};
                    }
                } else {
                    this.currentItem = {
                        current: '',
                        nodeName: '',
                        nodeCode: ''
                    };
                }
                try {
                    let path = this.$route.path;
                    let page = this.$route.query.page;
                    this.navListChange({path, page});
                } catch (error) {
                    console.error("001", error.name, error.message);
                }
                try {
                    if (this.$refs.searchResultRef) {
                        this.$refs.searchResultRef._reset();
                    }
                } catch (error) {
                    console.error("002", error.name, error.message);
                }
                try {
                    if (this.$refs.aSiseRef) {
                        this.$refs.aSiseRef._reset();
                    }
                } catch (error) {
                    console.error("003", error.name, error.message);
                }
                try {
                    if (this.$refs.contentWarpRef) {
                        this.$refs.contentWarpRef._reset(true);
                    }
                } catch (error) {
                    console.error("004", error.name, error.message);
                }
                this.$nextTick(() => {
                    if (this.$refs.aSiseRef) {
                        this.$refs.aSiseRef.defaultResult();
                    }
                });
            },
            pageType (val) {
                this._reset();
            }
        },
        computed: {
            ...mapGetters(['route'])
        },
        methods: {
            _getListAuth () {
                getListAuth().then(res => {
                    console.log('getListAuth', "获取授权");
                    res.data.map((res2, index) => {
                        res2.active = index + 1;
                        oriList.forEach((res3, index) => {
                            if ((res2.current + '') === (res3.mark + '')) {
                                res2.page = res3.page;
                                res2.oldName = res3.name;
                            }
                        });
                        if (res2.page === undefined) {
                            res2.page = defaultPage;
                        }
                        return res2;
                    });
                    this.menu = res.data;
                    this.defaultPageType = this.menu[0].page || defaultPage;
                    if (this.pageType !== 'all') {
                        this.active = 1;
                        this.pageType = this.defaultPageType;
                        this.currentItem = this.menu[0] || {page: 'all'};
                    }
                    this.finishRequest = true;
                }).catch((err) => {
                    console.error('失败', err);
                    this.menu = oriList.map((res3, index) => {
                        res3.active = index + 1;
                        res3.nodeName = res3.name;
                        res3.nodeCode = '10000' + index;
                        return res3;
                    });
                    this.defaultPageType = this.menu[0].page;
                    if (this.pageType !== 'all') {
                        this.active = 1;
                        this.pageType = this.defaultPageType;
                        this.currentItem = this.menu[0] || {page: 'all'};
                    }
                    sessionStorage.setItem('list_auth', JSON.stringify(this.menu || []));
                });
            },
            refresh (val) {
                if (val === 'Aside') {
                    if (this.$refs.aSiseRef) {
                        console.log('refresh-getData');
                        this.$refs.aSiseRef._getData();
                    }
                }
            },
            click (item) {
                console.log('tag', this.active);
                this.active = item.active;
                this.pageType = item.page;
                this.currentItem = item;
                if (this.active === 1) {
                    return;
                }
                // this.$nextTick(() => {
                //     console.log('aSiseRef', '1111');
                //     if (this.$refs.aSiseRef) {
                //         this.$refs.aSiseRef.defaultResult();
                //     }
                // });
            },
            menuSelect (obj) {
                console.log('tag', 'menuSelect');
                if (this.$refs.contentWarpRef) {
                    this.$refs.contentWarpRef.menuSelect(obj);
                }
            },
            displayCasePage (obj) {
                this.pagingData = obj;
            },
            handleSearch (val) { // 查询
                console.log('handleSearch', val);
                try {
                    if (this.$refs.aSiseRef) {
                        let clearObj = false;
                        if (JSON.stringify(val) === '{}') {
                            clearObj = true;
                        }
                        this.$refs.aSiseRef._reset(!val.outHpDateStart && val.jzCode && val.jzCode === 0, clearObj);
                    }
                } catch (error) {
                    console.error("003", error.name, error.message);
                }
                try {
                    if (this.$refs.contentWarpRef) {
                        this.$refs.contentWarpRef._reset(true);
                    }
                } catch (error) {
                    console.error("004", error.name, error.message);
                }
                if (val.outHpDateStart) {
                    this.searchParameter = val;
                    if (this.$refs.aSiseRef) {
                        this.$refs.aSiseRef.changeResult(this.searchParameter);
                    }
                } else {
                    this.searchParameter = val;
                    if (this.$refs.aSiseRef) {
                        this.$refs.aSiseRef.changeResult(this.searchParameter);
                    }
                }
            },
            _reset () {
                this.searchParameter = {};
                try {
                    if (this.$refs.searchResultRef) {
                        this.$refs.searchResultRef._reset();
                    }
                } catch (error) {
                    console.error("002", error.name, error.message);
                }
                try {
                    if (this.$refs.aSiseRef) {
                        this.$refs.aSiseRef._reset(null, true);
                    }
                } catch (error) {
                    console.error("003", error.name, error.message);
                }
                try {
                    if (this.$refs.contentWarpRef) {
                        this.$refs.contentWarpRef._reset(true);
                    }
                } catch (error) {
                    console.error("004", error.name, error.message);
                }
            },
            ...mapActions(['navListChange'])
        },
        components: {SearchBox, Main, Aside}
    };
</script>

<style scoped lang="scss">
    @import "./../../../scss/common";
    @import "./../../../scss/variables";
    .case-display-wrap {
        background: none;
        .wrapper {
            height: calc(100% - 80px);
            display: flex;
            .aside-wrap {
                flex: 0 0 174px;
                overflow: auto;
                background-color: #fff;
                margin-top: 8px;
            }
            .content-wrap {
                flex: 1;
                margin-left: 8px;
                overflow: auto;
            }
        }
        .wrapper-48{
            height: calc(100% - 48px);
        }
        & /deep/ .dialog-title {
            padding-left: 11px;
            font-size: 18px;
            color: #333333;
            border-left: 4px solid #4579C5;
        }
        .tabBox{
            background-color: #fff;
            line-height: 30px;
            /deep/ .el-button+.el-button {
                margin-left:0;
            }
            display: inline-flex;
            /deep/ .el-button{
                border: none;
                padding: 0 10px 0 10px;
                line-height: 30px;
                height: 30px;
                border-radius: 0;
                border-right: 1px solid #dcdfe6;
            }
        }
        .btn-action {
            background-color:$base-color;
            color: #fff;
        }
        .bgcolor-border-color{
            color: #fff;
            background-color:#fff;
            border-bottom: 1px solid #dcdfe6;
        }
        .wrapper-80{
            height: calc(100% - 80px) !important;
        }
    }
</style>
