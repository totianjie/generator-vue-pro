<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-07-13 14:19:56 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-07-13 14:19:56 
* @remark: 
-->
<template>
    <div class="wrapper">
        <div class="page">
            <img class="img" v-lazy="`./../../../static/img/error500.png`" alt="404页面">
            <div class="content">
                <span class="number">500</span>
                <p class="text">抱歉，你访问的页面不存在</p>
                <el-button size="small" type="primary"><router-link class="color-fff" :to="path">返回首页</router-link></el-button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import CONFIG from 'src/config';
export default {
    name: 'Error500',
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
