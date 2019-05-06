<!-- Created by TIANJIE on 2018/5/31 -->
<template>
    <div class="wrapper">
        <div class="page">
            <img class="img" v-lazy="`./../../../static/img/error404.png`" alt="404页面">
            <div class="content">
                <span class="number">404</span>
                <p class="text">抱歉，你访问的页面不存在</p>
                <el-button size="small" type="primary"><router-link class="color-fff" :to="path">返回首页</router-link></el-button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import CONFIG from 'src/config';
export default {
    name: 'Error404',
    data () {
        return {
            path: CONFIG.defaultPage
        };
    }
};
</script>
<style lang="scss" scoped>
    @import './errorStyle.scss';
</style>
