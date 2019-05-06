<!--
* @Author: mikey.TIANJIE
* @Date: 2018-05-25 11:02:56
* @Last Modified by:   mikey.TIANJIE
* @Last Modified time: 2018-07-13 11:02:56
* @remark: 主要是用于超过二级路由后，用于当模板
-->
<template>
    <div class="bg-color empty-wrap-over-hidden">
        <transition :name="transitionName">
            <keep-alive>
                <router-view v-if="keepAlive" class="empty-wrap"/>
            </keep-alive>
        </transition>
        <transition :name="transitionName">
            <router-view v-if="!keepAlive" class="empty-wrap">
                <router-view></router-view>
            </router-view>
        </transition>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data () {
        return {
            transitionName: 'move'
        };
    },
    computed: {
        keepAlive () {
            if ((this.route.query && this.route.query.hasOwnProperty('keepAlive')) || (this.$route.meta.hasOwnProperty('keepAlive') && this.$route.meta.keepAlive)) {
                return true;
            }
            return false;
        },
        ...mapGetters(['route'])
    }
};
</script>

<style lang="scss">
    @import './../scss/_variables.scss';
    .bg-color {
        background-color: $body-bg;
    }
    .empty-wrap-over-hidden {
        overflow: hidden !important;
    }
    .empty-wrap {
       position: absolute;
       left: 0;
       top: 0;
       right: 0;
       bottom: 0;
       overflow: auto;
       background: #fff;
    }
</style>

