<template>
    <ul class="list-wrap">
        <li
            class="item-wrap"
            v-for="(item, index) in menuData"
            :key="item.id"
            :class="{
                'level-1': item.level === 2,
                'level-2': item.level === 3,
                'level-3': item.level === 4,
                'level-4': item.level === 5,
                'active': item.open
            }"
        >
            <div
                class="title"
                @click="selectItem(item)"
                :class="{
                'active': item.open,
                'open-active':item.open && (!item.children || item.children.length === 0)
            }"
            >
                <span class="icon-theme"><i :class="item.hasOwnProperty('icon') && item.icon"></i></span>
                <span class="text" v-text="item.title" :title="item.title"></span>

                <!-- 去除tips样式  如果需要做回原来的把下面的注释打开，上面这一条样式删除 -->
               <!--  <span class="text" v-text="item.title" v-if="item.title.length <= 7"></span>
                <el-tooltip class="item" effect="dark" :content="item.title" placement="top-start" v-if="item.title.length > 7">
                    <span class="text" v-text="item.title"></span>
                </el-tooltip> -->
                <span
                    class="icon-arrow"
                >
                    <i v-if="(item.level === 2 && item.children.length > 0) || (item.level === 3 && item.children.length > 0)" :class="item.open ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
                </span>
            </div>
            <el-collapse-transition>
                <div v-if="item.open">
                    <div v-if="item.children">
                        <MenuList :menuData="item.children"></MenuList>
                    </div>
                </div>
            </el-collapse-transition>
        </li>
    </ul>
</template>
<script type="text/ecmascript-6">
    import {mapGetters, mapActions} from 'vuex';
    // import {findInArr} from "../../js/utils/utils";
    // import CONFIG from 'src/config';

    export default {
        name: 'MenuList',
        props: {
            menuData: {
                type: Array,
                default () {
                    return [];
                }
            }
        },

        data () {
            return {};
        },

        computed: {
            ...mapGetters(['route'])
        },

        watch: {},

        created () {
        },

        mounted () {
        },

        methods: {
            selectItem (item) {
                if ((item.open === true && item.path !== this.route.path) || (item.open === true && item.children.length > 0)) {
                    this.menuListChange({routeId: item.id, switchOpen: true});
                } else {
                    this.menuListChange({routeId: item.id, switchOpen: false});
                }
                if (!item.hasOwnProperty('path') || item.path !== '') {
                    this.$router.push({
                        path: item.path
                    });
                }
            },
            ...mapActions(['menuListChange'])
        },

        components: {}
    };
</script>
<style lang="scss" scoped>
    @import '../../scss/variables';

    .item-wrap {
        position: relative;
        cursor: pointer;
        color: $font-color;
        font-size: 14px;
        .title {
            line-height: 40px;
            height: 40px;
            z-index: 1;
            &:hover {
                background: $default-menu-active-bg;
            }
            /*border-bottom: 1px dashed #fff;*/
            .icon-theme, .text, .icon-arrow {
                float: left;
                height: 100%;
            }
            .icon-theme {
                width: 20%;
                text-align: center;
            }
            .text {
                width: 65%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .icon-arrow {
                width: 15%;
                > i {
                    font-weight: bold
                }
            }
        }
        // 级别class
        &.level-1 {
            font-size: 16px;
        }
        &.level-2 {

        }
        &.level-3 {
            .title > .text {
                padding-left: 15px;
                box-sizing: border-box;
            }

        }
        &.level-4 {
        }
        // 选中状态
        .active {
            color: $default-menu-active-font-color;
        }
        .open-active {
            box-shadow: inset 4px 0 $default-menu-open-active-font-color;
            color: $default-menu-open-active-font-color;
            box-sizing: border-box;
            background-color: $default-menu-active-bg;
        }
    }

    /*.menu-move-enter {*/
    /*}*/

    /*.menu-move-enter-active {*/
    /*transition: 0.3s all linear;*/
    /*}*/

    /*.menu-move-leave-active {*/
    /*transition: 0.3s all linear;*/
    /*}*/

</style>
