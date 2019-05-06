<template>
    <section class="top-nav" ref="nav">
        <span @click="prePage" class="pre-page"><i class="el-icon-caret-left"></i></span>
        <ul
            class="list-wrap"
            ref="nav_ul"
            :style="{width: listWidth}"
        >
            <li
                class="item"
                :class="{active: index === navCurrentIndex}"
                v-for="(item, index) in navList"
                :key="item.id"
                ref="nav_li"
                @click="selectItem(item)"
            >
                <span :title="item.title" v-text="item.title"></span>
                <i
                    class="el-icon-close close-icon"
                    @click.stop="delItem(index)"
                    v-if="item.path !== defaultPage"
                ></i>
            </li>
        </ul>
        <span @click="nextPage" class="next-page"><i class="el-icon-caret-right"></i></span>
    </section>
</template>
<script type="text/ecmascript-6">
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import {addEvent, getStyle, prefixStyle} from 'js/utils/dom';
    import CONFIG from 'src/config';

    const transform = prefixStyle('transform');

    const WIDTH = 64; // 左右两个按钮的总宽度  上一页 下一页
    export default {
        name: 'TopNav',
        props: {},

        data () {
            return {
                // 移动的距离
                offset: 0,
                listWidth: '100%',
                defaultPage: CONFIG.defaultPage,
                menuList: this.$router.options.routes,
                bHome: false
            };
        },

        computed: {
            ...mapGetters(['navList', 'navCurrentIndex'])
        },

        watch: {
            // 当前navList数据变化
            navList (newList, oldList) {
                this.$nextTick(() => {
                    if (newList.length > 0) {
                        if (this.itemWidth === null) {
                            let oLi = this.$refs.nav_li[0];
                            this.itemWidth = parseFloat(getStyle(oLi, 'width')) + parseFloat(getStyle(oLi, 'marginLeft'));
                        }
                        this.count = this.itemWidth * newList.length;
                        this.listWidth = this.count > this.navWidth ? `${this.count}px` : `${this.navWidth}px`;
                        // 添加
                        if (newList.length > this.oldListLen) {
                            this.offset = this.count > this.navWidth ? this.count - this.navWidth : 0;
                        } else {
                            // 删除
                            this.offset -= this.itemWidth;
                        }
                        this.oldListLen = newList.length;
                    }
                });
            },
            // 当前nav导航索引变化
            navCurrentIndex (newIndex, oldIndex) {
                // 当前导航的index索引变了，但列表数据没变
                if (this.oldListLen === this.navList.length) {
                    if (this.count > this.navWidth) {
                        let curW = this.itemWidth * (newIndex + 1);
                        this.offset = curW - this.navWidth;
                    }
                }
            },
            // 监听offset变化，nav导航左右移动
            offset: function () {
                if (this.offset < 0) {
                    this.offset = 0;
                }
                // console.log(this.offset);
                this.navUl.style[transform] = `translateX(${-(this.offset)}px)`;
            }
        },

        created () {
            // ps：如果不需要vue监听变化的数据都放在created里面

            // 导航宽度
            this.navWidth = Number;
            // 每一个导航的item宽度
            this.itemWidth = null;
            // item总和宽度
            this.count = 0;
            // 导航数据，旧的，用户比较，是新增还是删除了导航
            this.oldListLen = 0;
        },

        mounted () {
            this.$nextTick(() => {
                this.navUl = this.$refs.nav_ul;
                this.nav = this.$refs.nav;
                this.getNavWidth();
                addEvent(window, 'resize', ev => {
                    let oEvent = ev || event;
                    let oldNavWidth = this.navWidth;

                    this.getNavWidth();

                    // 新最的宽度 - 上一次的宽度，如果放大就是正数， 缩小就是负数
                    let scale = this.navWidth - oldNavWidth;
                    // 只有在屏幕放大时做了动态，缩小时速度太快，没有必要
                    if (scale > 0) {
                        if (this.count > this.navWidth) {
                            this.offset = this.offset - (scale); // 这是一个负数  相减刚好是相加
                            if (this.offset < 0) {
                                this.offset = 0;
                            }
                        } else {
                            this.offset = 0;
                        }
                    }
                    oEvent.preventDefault && oEvent.preventDefault();
                    return false;
                });
            });
        },

        methods: {
            // 上一页
            prePage () {
                console.log(this.offset);
                if (this.offset > 0) {
                    this.offset -= this.navWidth / 2;
                }
            },
            // 下一页
            nextPage () {
                if (this.navList.length > 0 && (this.count > this.navWidth)) {
                    this.offset += this.navWidth / 2;

                    if (this.offset >= (this.count - this.navWidth)) {
                        this.offset = this.count - this.navWidth;
                    }
                }
            },
            // 切换
            selectItem (item) {
                console.info('tag', item);
                if (item.isSeparate) {
                    this.navListChangeWithTitle({path: item.path, title: item.title});
                    this.$router.push({
                        path: item.path
                    });
                } else {
                    this.$router.push({
                        path: item.path
                        // query: {keepAlive: true}
                    });
                }

            },
            // 删除
            delItem (index) {
                if (index === this.navCurrentIndex) { // 关闭当前选中的页面
                    let n = this.navList.length === 1 ? 0 : index - 1; // 做这个判断主要是转为删除最后一个报错了， 做个默认首页就不会了。。。
                    this.$router.push({
                        path: this.navList[n].path
                        // query: {keepAlive: true}
                    });
                } else if (index < this.navCurrentIndex) {
                    let n = this.navCurrentIndex - 1;
                    this.setNavIndex(n);
                }
                this.delNavList(index);
            },
            getNavWidth () {
                this.navWidth = this.nav.getBoundingClientRect().width - WIDTH;
            },
            // 给于父级调用，左侧菜单收缩和展开时 获取nav的width
            pullMenu () {
                this.$nextTick(() => {
                    this.getNavWidth();
                });
            },
            ...mapMutations({
                delNavList: 'DEL_NAV_LIST',
                setNavIndex: 'SET_NAV_CURRENT_INDEX'
            }),
            ...mapActions(['navListChangeWithTitle'])

        },

        components: {}
    };
</script>
<style lang="scss" scoped>
    @import './../../scss/variables';

    .top-nav {
        height: 100%;
        padding: 8px 32px 0;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        .list-wrap {
            height: 100%;
            transition: 0.3s all ease;
            overflow: hidden;
            .item {
                width: 110px;
                height: 100%;
                float: left;
                padding: 0 20px 0 10px;
                position: relative;
                border: 1px solid #E4E7EE;
                box-sizing: border-box;
                cursor: pointer;
                text-align: center;
                line-height: 42px;
                color: $default-nav-font-color;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                border-radius: 3px 3px 0 0;
                white-space: nowrap;
                .close-icon {
                    position: absolute;
                    right: 5px;
                    top: 12px;
                    padding: 2px;
                }
                &.active {
                    background-color: $default-nav-active-bg;
                    color: $default-nav-active-font-color;
                    border: none;
                    border-bottom: 1px solid #E4E7EE;
                }
            }
        }
        .pre-page, .next-page {
            height: calc(100% - 8px);
            font-size: 32px;
            position: absolute;
            z-index: 2;
            box-sizing: border-box;
            bottom: 0;
            cursor: pointer;
            background-color: #fff;
            color: #909399;
            &:hover {
                /*transition: 0.3s all linear;*/
                color: $default-nav-active-bg;
                i {
                    /*transition: 0.3s all linear;*/
                }
            }
        }
        .pre-page {
            left: 0;
        }
        .next-page {
            right: 0;
        }
    }
</style>
