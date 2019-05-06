<template>
    <ul class="mini-menu">
        <li
            v-for="(item, index) in menuData"
            :key="item.id"
            class="item"
            :class="{active: item.open}"
            @click="pullMenu(item)"
        >
            <i :class="item.hasOwnProperty('icon') && item.icon"></i>
        </li>
    </ul>
</template>
<script type="text/ecmascript-6">
    import {mapActions} from 'vuex';

    export default {
        name: 'MiniMenu',
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

        computed: {},

        watch: {},

        created () {
        },

        mounted () {
        },

        methods: {
            pullMenu ({id}) {
                this.$emit('pullMenu');
                this.menuListChange({routeId: id});

            },
            ...mapActions(['menuListChange'])
        },

        components: {}
    };
</script>
<style lang="scss" scoped>
    @import './../../scss/variables';

    .mini-menu {
        min-height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2000;
        .item {
            height: 40px;
            line-height: 40px;
            background-color: #47617C;
            color: #fff;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            i {
                transition: 0.2s all linear;
            }
            &:hover, &.active {
                color: $default-menu-open-active-font-color;
            }
            &:hover {
                i {
                    transform: scale(2, 2);
                }
            }
        }
    }
</style>
