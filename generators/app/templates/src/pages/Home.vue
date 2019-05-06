<template>
    <section class="home-wrap">
        <!-- 侧边菜单 -->
        <aside
            class="home-aside-menu"
            :style="{width: `${asideWidth}px`}"
        >
            <aside-menu @pullMenu="pullMenu"></aside-menu>
        </aside>
        <section
            class="home-box"
            :style="{'padding-left': `${asideWidth}px`}"
        >
            <!-- 头部导航 -->
            <nav class="home-nav">
                <top-nav ref="nav_wrap"></top-nav>
                <logo-out></logo-out>
            </nav>
            <!-- 页面主体 -->
            <section class="home-main">
                <transition :name="transitionName">
                    <keep-alive>
                        <router-view v-if="keepAlive" class="router-wrap"/>
                    </keep-alive>
                </transition>
                <transition :name="transitionName">
                    <router-view v-if="!keepAlive" class="router-wrap">
                        <router-view></router-view>
                    </router-view>
                </transition>
            </section>
        </section>
    </section>
</template>

<script>
    import AsideMenu from 'components/aside_menu/AsideMenu';
    import CONFIG from 'src/config';
    import TopNav from 'components/nav_list/NavList';
    import LogoOut from 'components/nav_list/LogoOut';
    import Login from 'pages/login/Login';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Home',
        data () {
            return {
                transitionName: 'move',
                trans: '',
                // 侧边菜单宽度
                asideWidth: CONFIG.menuMaxW
            };
        },
        computed: {
            minWidth () {
                return CONFIG.bodyMinW - this.asideWidth;
            },
            keepAlive () {
                if ((this.route.query && this.route.query.hasOwnProperty('keepAlive')) || (this.$route.meta.hasOwnProperty('keepAlive') && this.$route.meta.keepAlive)) {
                    return true;
                }
                return false;
            },
            ...mapGetters(['navCurrentIndex', 'navList', 'route', 'menuList'])
        },

        created () {
            // 默认打开页面 如果是空就是第一次打开页面 反之则是在其它页面过来
            if (this.navList.length === 0) {
                this.goPage(CONFIG.defaultPage);
                this.navListChange({path: CONFIG.defaultPage});
            }
        },
        mounted () {
            // this.$load.show();
            //
            // setTimeout(() => {
            //     this.$load.hide();
            // }, 5000);

            // this.$toast('你好');
            // console.log(this.$route);
            // console.log(this.$store);
        },
        methods: {
            // 点击收起（展开）侧边菜单
            pullMenu ({bPullMenuLeft}) {
                this.asideWidth = bPullMenuLeft ? CONFIG.menuMaxW : CONFIG.menuMinW;
                this.$refs.nav_wrap.pullMenu();
            },
            // 路由跳转
            goPage (path) {
                this.$router.push({
                    path
                });
            },
            ...mapActions(['navListChange'])
        },
        components: {
            AsideMenu,
            TopNav,
            Login,
            LogoOut
        },
        watch: {
            '$route.name' (to, from) {
                if (!this.$route.query.timestamp) {
                    this.trans = 'fade';
                } else if (!this.$router.direct()) { // back
                    this.trans = 'slide-right';
                } else { // in
                    this.trans = 'slide-left';
                }
            },
            '$route.path' (to, from) {
                // console.log(to);
                // console.log(this.$route.matched);
                // console.log(this.$router);
                // console.log(this.$route.query);
                let path = this.$route.matched.length > 2 ? this.$route.matched[1].path : to;
                this.navListChange({path});
            }
        }
    };
</script>

<style lang="scss">
    @import './../scss/common';
    @import './../scss/variables';

    .home-wrap {
        // 侧边菜单
        height: 100%;
        width: 100%;
        position: relative;
        background-color: #F0F0F0;
        .home-aside-menu {
            width: 150px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            transition: 0.5s all ease;
            background: $default-menu-bg;
        }
        .home-box {
            height: 100%;
            transition: 0.5s all ease;
            box-sizing: border-box;
            .home-nav {
                height: 50px;
                width: 100%;
                padding-right: 150px;
                position: relative;
                box-sizing: border-box;
                background: #fff;
            }
            // 主体
            .home-main {
                width: 100%;
                height: calc(100% - 50px);
                /*overflow: hidden;*/
                position: relative;
            }
        }
    }

    .router-wrap {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: auto;
        background: #fff;
        // 最小宽度设置
        .page {
            // 除菜单外的宽度
            width: 100%;
            min-width: 1150px;

            *zoom: 1;
            &:before,
            &:after {
                content: '\200B'; // 1
                display: block; // 2
                height: 0;
                visibility: hidden;
            }
            &:after {
                clear: both;
            }
        }
    }

    .move-enter {
        transform: translateX(200px);
        opacity: 0.5;
    }

    .move-enter-active {
        transition: 0.3s all ease;
    }

    .move-leave-active {
        transition: 0.3s all ease;
        opacity: 0;
        transform: translateX(0);
    }

    /* 滑入滑出动画 */
    .slide-left-enter-active, .slide-right-enter-active {
        transition: all .3s ease;
    }

    .slide-left-leave-active, .slide-right-leave-active {
        /*transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
        transition: all .1s ease;
    }

    .slide-left-enter, .slide-left-leave-active {
        transform: translateX(20px);
        opacity: 0.1;
    }

    .slide-right-enter, .slide-right-leave-active {
        transform: translateX(-20px);
        opacity: 0.1;
    }

</style>
