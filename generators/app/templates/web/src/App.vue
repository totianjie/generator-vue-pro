<template>
    <section id="app" class="app">
        <!-- 全局loading -->
        <Loading :show="loadingShow"></Loading>
        <router-view/>
    </section>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import busEvent from './busEvent';
    export default {
        name: 'App',
        data () {
        },
        computed: {
            ...mapGetters(['loadingShow', 'signinStatus'])
        },
        created () {
        },
        mounted () {
            busEvent.$on('goLogin', () => {
                this.$router.push({
                    path: '/login'
                });
            });
            busEvent.$on('goPage', ({path}) => {
                this.$router.push({ path });
            });
            busEvent.$on('alertMassage', (message) => {
                this.$toast(message);
            });
        },
        methods: {
            ...mapActions(['signIn']),
            ...mapMutations({
                setMenuList: 'SET_MENU_LIST'
            })
        },
        components: {},
        watch: {}
    };
</script>

<style lang="scss">
    @import './scss/reset';
    @import './scss/variables';
    @import './assets/fonts/iconfont.css';

    .app {
        width: $base-height;
        height: $base-width;
        font-size: 14px;
        color: #333;
    }
</style>
