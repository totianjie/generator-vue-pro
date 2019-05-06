<template>
    <section class="aside-menu">
        <div class="logo">
            <h1 class="logo-img"></h1>
            <h2 class="name" v-text="systemName"></h2>
            <i
                class="pull-menu el-icon-d-arrow-left"
                @click="pullMenu"
                :class="{'el-icon-d-arrow-right': !bPullMenuLeft}"
            ></i>
        </div>
        <div class="menu-list pos-r">
            <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
                <menu-list
                    :style="{width: `${max}px`}"
                    class="animated max-menu"
                    v-if="bPullMenuLeft"
                    :menuData="menuList"
                ></menu-list>
            </transition>
            <transition enter-active-class="rollIn" leave-active-class="rollOut">
                <mini-menu
                    :style="{width: `${min}px`}"
                    class="animated"
                    v-if="!bPullMenuLeft"
                    :menuData="menuList"
                    @pullMenu="pullMenu"
                ></mini-menu>
            </transition>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import MenuList from './MenuList';
    import MiniMenu from './MiniMenu';
    import {mapGetters} from 'vuex';
    import CONFIG from 'src/config';
    import busEvent from 'src/busEvent';

    export default {
        name: 'aSideMenu',
        props: {},

        data () {
            return {
                systemName: CONFIG.systemName,
                bPullMenuLeft: true,
                max: CONFIG.menuMaxW,
                min: CONFIG.menuMinW
            };
        },

        computed: {
            ...mapGetters(['menuList'])
        },

        methods: {
            // 点击收起菜单
            pullMenu () {
                this.bPullMenuLeft = !this.bPullMenuLeft;
                this.$emit('pullMenu', {bPullMenuLeft: this.bPullMenuLeft});
                busEvent.$emit('component/aside_menu');
            }
        },

        components: {MenuList, MiniMenu}
    };
</script>
<style lang="scss" scoped>
    @import './../../scss/variables';

    .aside-menu {
        height: 100%;
        overflow: hidden;
    }

    .logo {
        height: 78px;
        position: relative;
        background-color: $default-logo-bg;
        background-image: url(./../../assets/images/home-logo.png);
        background-repeat: no-repeat;
        background-position: center 12px;
        .name {
            padding-top: 47px;
            color: #fff;
            font-size: 18px;
            text-align: center;
            white-space: nowrap;
        }
        .pull-menu {
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            height: 78px;
            background-color: $default-logo-bg;
            text-align: center;
            line-height: 78px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            color: #fff;
        }
    }

    .menu-list {
        height: calc(100% - 78px);
        overflow-x: hidden;
        overflow-y: auto;
        .max-menu {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
</style>
