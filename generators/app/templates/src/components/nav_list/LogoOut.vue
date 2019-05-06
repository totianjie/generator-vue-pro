<!-- Created by TIANJIE on 2018/6/7 -->
<template>
    <div class="logo-out">
        <el-button :class="['m-r-24 pointer',{activeUserCenter:isShowSelectCenter}]" type="primary" icon="iconfont icon-gongneng" @click="personCenter" >
        </el-button>
        <span class="m-r-40 pointer"> </span>
        <el-button @click="logoutEvent" type="primary" class="submit-btn"><span class="btn_login_out">注销</span></el-button>
        <!-- <div class="goto-user-center" ref="showCenter" v-show="isShowSelectCenter">
            <div role="tooltip" id="el-popover-8445" aria-hidden="false" class="goto-user-center el-icon-arrow-upel-popover el-popper el-popover--plain" tabindex="0" x-placement="bottom">
                    <span class="user-info-center" @click="goToUserCenter">个人资料</span>
                    <span class="user-info-center" @click="changePassword">修改密码</span>
                    <div x-arrow="" class="popper__arrow black-color"></div>
            </div>
        </div> -->
    </div>
</template>
<script type="text/ecmascript-6">
    import {logOut} from "js/api/user";

    export default {
        data () {
            return {
                isShowSelectCenter: false
            };
        },
        name: "LogoOut",
        props: {},
        watch: {},
        computed: {
        },
        methods: {
            logoutEvent () {
                this._$confirm({ content: '您是否确定注销登录' }).then(() => {
                    logOut(); //  直接403 在接口拦截退出登录,同超时登录
                }).catch(() => {
                    return false;
                });
            },
            personCenter () {
                this.$router.push({
                    path: '/userCenter'
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
@import "./../../scss/common";
@import "./../../scss/variables";

.logo-out {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-top: 8px;
    .m-r-40 {
        margin-right: 50px;
        color: $base-color;
        font-size: 24px;
    }
    .m-r-24 {
        margin-right: -44px;
        background-color: white;
        border-color: white;
        padding:1px;
        width: 32px;
        height: 32px;
        vertical-align: middle;
        color: #909399;
        &:hover {
            color: $default-nav-active-bg;
        }
    }
    .submit-btn{
        font-size: 16px;
        color: $base-color;
        background-color: white;
        border: 0px;
        padding: 7px 20px;
        vertical-align: middle;
    }
    .iconfont {
       font-size: 22px;
    }
    .goto-user-center{
        width: 120px !important;
        background-color : black;
        transform-origin: center top 0px; 
        z-index: 2123; 
        position: absolute !important; 
        top: 16px; 
        right: 16px;
    }
    .user-info-center {
        color: $base-color;
        line-height: 30px;
        display: block;
    }
    .black-color{
        border-bottom-color:black !important;
        right: 3.5px;
    }
    .black-color::after {
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color:black !important;
    }
    .activeUserCenter {
        color: $base-color;
    }
}
</style>
