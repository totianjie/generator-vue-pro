<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第3步
-->
<template>
    <div class="step3-body">
		<img class="img" v-lazy="`./../../static/img/finish.png`" alt="首页">
		<el-button class="back-button" size="small" type="primary" @click="backHome">返回</el-button>
	</div>
</template>

<script>
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                btnSize: CONFIG.baseBtn
            };
        },
        methods: {
            backHome () {
                this.$emit('backHome', 0);
            }
        }
    };
</script>

<style scoped lang="scss">
    .step3-body{
        height: calc(100% - 80px);
        width: 100%;
        display: block;
        text-align: center;
        .img {
            display: inline-block;
            width: 452px;
            height: 355px;
            margin-top:8%;
        }
        .back-button{
            display:block;
            margin: 20px auto;
        }
    }
</style>
