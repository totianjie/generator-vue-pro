<template>
    <section class="login-box">
        <section class="login-wrap">
            <section class="title-wrap min-width">
                <div>
                    <img class="logo" src="./../../assets/images/login-logo.png">
                    <p class="title" v-text="logoinTitle"></p>
                </div>
            </section>
            <section class="body-wrap min-width" ref="bodyWrap" :style="{paddingTop: `${padding / 2}px`}">
                <div ref="bodyChildren" class="over-hidden">
                    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form" :size="formSize">
                        <el-form-item class="user-login">
                            <span class="name">用户登录</span>
                            <span class="line"></span>
                        </el-form-item>
                        <el-form-item prop="username">
                            <el-input
                                placeholder="请输入帐号"
                                v-model="loginForm.username"
                                class="el-input m-t-18"
                            >
                                <i slot="prefix" class="icon iconfont icon-yonghuming icon-color"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                type="password"
                                placeholder="请输入密码"
                                v-model="loginForm.password"
                                class="el-input"
                            >
                                <i slot="prefix" class="icon iconfont icon-mima icon-color"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="validate">
                            <el-input
                                placeholder="验证码"
                                v-model="loginForm.validate"
                                class="el-input validate"
                            >
                                <i slot="prefix" class="icon iconfont icon-mima icon-color"></i>
                            </el-input>
                            <img @click="getImg" v-if="bLoadImg" :src="url" alt="图片请求失败" class="validate-img">
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handlerSubmit" type="primary" class="submit-btn">登&nbsp;&nbsp;录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </section>
            <section class="foot-wrap min-width">
                <p class="m-t-25">
                    <a href="javascript:;">在线客服</a>
                    <span>&nbsp;|&nbsp;</span>
                    <a href="javascript:;">技术支持</a>
                    <span>&nbsp;|&nbsp;</span>
                    <a href="javascript:;">关于我们</a>
                </p>
                <p class="m-t-10">深圳智慧医保科技有限公司&nbsp;&copy;&nbsp;版权所有&nbsp;粤ICP备12061299号</p>
            </section>
        </section>
    </section>
</template>
<script type="text/ecmascript-6">
    import {setCookie} from 'js/utils/cookies';
    import {mapActions, mapMutations} from 'vuex';
    import {addEvent} from 'js/utils/dom';
    import {getUserMenus, login} from 'js/api/user';
    import {deepCopy} from 'js/utils/utils';
    import rules from './rules';
    import md5 from 'static/plugins/md5.min.js';
    import CONFIG from 'src/config';

    export default {
        name: 'login',
        props: {},
        data () {
            return {
                logoinTitle: CONFIG.logoinTitle,
                url: `${CONFIG.URL}/captcha.jpg`,
                formSize: 'small',
                bLoadImg: true,
                _redirect: '',
                loginForm: {
                    username: '',
                    password: '',
                    validate: ''
                },
                rules: rules,
                padding: 0
            };
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm._redirect = CONFIG.defaultPage;
            });
        },

        computed: {},

        watch: {},

        created () {
        },

        mounted () {
            this.bodyWrap = this.$refs.bodyWrap;
            this.bodyChildren = this.$refs.bodyChildren;

            this.padding = this.bodyWrap.getBoundingClientRect().height - this.bodyChildren.getBoundingClientRect().height;

            addEvent(window, 'resize', () => {
                this.padding = this.bodyWrap.getBoundingClientRect().height - this.bodyChildren.getBoundingClientRect().height;
            });
        },

        methods: {
            getImg () {
                this.loginForm.validate = '';
                this.bLoadImg = false;
                setTimeout(() => {
                    this.bLoadImg = true;
                }, 20);
            },
            handlerSubmit () {
                try {
                    this.$refs.loginFormRef.validate(value => {
                        if (value) {
                            this._login();
                            // this._devLogin();
                        } else {
                            return false;
                        }
                    });
                } catch (e) {
                    console.log("error " + e.reason + e.name);
                }
            },
            _login () {
                let userLogin = deepCopy(this.loginForm);
                userLogin.password = md5(userLogin.password);
                login(userLogin).then(loginRes => {
                    let userInfo = loginRes.data;
                    let userInfo2 = {id: userInfo.id, code: userInfo.code, orgId: userInfo.orgId, name: userInfo.name};
                    setCookie('user_info', JSON.stringify(userInfo2));
                    sessionStorage.setItem('user_info', JSON.stringify(userInfo));
                    getUserMenus().then(userMenuRes => {
                        let menuList = userMenuRes.data;
                        sessionStorage.setItem('menu_list', JSON.stringify(menuList));
                        this.signIn({userInfo});
                        this.setMenuList(menuList);
                        this.$router.push({
                            path: this._redirect
                        });
                    });
                }).catch((err) => {
                    this.getImg();
                    // 用于开发本地登录
                    this.$toast(err.data ? err.data.errorMsg : '网络开小差,请稍后再试');
                    this._devLogin();
                });
            },
            // 用于开发登录
            _devLogin () {
                let userList = [
                    {username: 'test', password: 1008611}
                ];
                let {username, password} = this.loginForm;
                // TODO 这个只是用于开发环境登录 主要是权限管理在测试菜单有变动， 上线时要删除
                if (userList.some(item => item.username === username && item.password === parseInt(password))) {
                    let menuList = [
                        {
                            "id": 1,
                            "parentId": "-1",
                            "type": "1",
                            "name": "场景列表",
                            "url": "/sceneManage/scene",
                            "remark": null,
                            "icon": "el-icon-edit-outline",
                            "enable": true,
                            "parentName": "",
                            "perms": "",
                            "mark": null,
                            "code": "CD109",
                            "level": 2,
                            "orderby": null,
                            "open": false,
                            "path": "/sceneManage/scene",
                            "title": "场景列表",
                            "children": []
                        },
                        {
                            "id": 2,
                            "parentId": "-1",
                            "type": "1",
                            "name": "子规则管理",
                            "url": "/shangbao/subRuleManage",
                            "remark": null,
                            "icon": "el-icon-edit-outline",
                            "enable": true,
                            "parentName": "",
                            "perms": "",
                            "mark": null,
                            "code": "CD109",
                            "level": 2,
                            "orderby": null,
                            "open": false,
                            "path": "/shangbao/subRuleManage",
                            "title": "子规则管理",
                            "children": []
                        },
                        {
                            "id": 3,
                            "parentId": "-1",
                            "type": "1",
                            "name": "规则管理",
                            "url": "/shangbao/rule",
                            "remark": null,
                            "icon": "el-icon-edit-outline",
                            "enable": true,
                            "parentName": "",
                            "perms": "",
                            "mark": null,
                            "code": "CD109",
                            "level": 2,
                            "orderby": null,
                            "open": false,
                            "path": "/shangbao/rule",
                            "title": "规则管理",
                            "children": []
                        },
                        {
                            "id": 4,
                            "parentId": "-1",
                            "type": "1",
                            "name": "保险管理",
                            "url": "/shangbao/businessManage",
                            "remark": null,
                            "icon": "el-icon-edit-outline",
                            "enable": true,
                            "parentName": "",
                            "perms": "",
                            "mark": null,
                            "code": "CD109",
                            "level": 2,
                            "orderby": null,
                            "open": false,
                            "path": "/shangbao/businessManage",
                            "title": "保险管理",
                            "children": []
                        }
                    ];
                    let userInfo = {"id": 1, "code": "test", "orgId": 1, name: 'test'};
                    setCookie('user_info', JSON.stringify(userInfo));
                    sessionStorage.setItem('menu_list', JSON.stringify(menuList));
                    sessionStorage.setItem('user_info', JSON.stringify(userInfo));
                    this.signIn({userInfo});
                    this.setMenuList(menuList);
                    this.$router.push({
                        path: this._redirect
                    });
                }
            },
            ...mapActions(['signIn']),
            ...mapMutations({
                setMenuList: 'SET_MENU_LIST'
            })
        },

        components: {}
    };
</script>
<style lang="scss" scoped>
    @import './../../scss/variables';
    @import './../../scss/mixins';
    @import './../../scss/common';

    .login-box {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .login-wrap {
        height: $base-height;
        width: $base-width;
        min-height: 635px;
        background: #fff;
        color: #999999;
        .min-width {
            min-width: 1366px;
        }
        .title-wrap {
            height: 15%;
            position: relative;
            padding-left: 10%;
            box-sizing: border-box;
            vertical-align: bottom;
            > div {
                position: absolute;
                bottom: 14px;
            }
            .logo, .title {
                color: $base-color;
                float: left;
            }
            .logo {
                width: 80px;
                height: 28px;
                margin-right: 14px;
                margin-top: 6px;
            }
            .title {
                padding-left: 14px;
                font-size: 28px;
                border-left: 2px solid $base-color;
            }
        }
        .body-wrap {
            height: 70%;
            padding-right: 150px;
            box-sizing: border-box;
            background: url(./../../assets/images/login-bg.png) no-repeat;
            .login-form {
                width: 442px;
                padding: 20px 32px 0;
                box-sizing: border-box;
                @include float(right);
                background: #fff;
                border-radius: 4px;
                .user-login {
                    padding-bottom: 14px;
                    border-bottom: 1px solid #E5E5E5;
                    font-size: 24px;
                    position: relative;
                    .name {
                        font-size: $font-size-24;
                    }
                    .line {
                        width: 96px;
                        position: absolute;
                        left: 0;
                        bottom: -15px;
                        border-bottom: 1px solid $base-color;
                    }
                }
                .validate {
                    width: 236px;
                }
                .validate-img {
                    display: inline-block;
                    width: 126px;
                    height: 32px;
                    @include float(right);
                    cursor: pointer;
                    background-color: #EBEEF5;
                }
                .el-form-item {
                    margin-bottom: 20px;
                }
                /*.el-input > input {*/
                /*height: 48px;*/
                /*}*/
                .submit-btn {
                    width: $base-width;
                    height: 36px;
                    font-size: 22px;
                    margin-top: 15px;
                    margin-bottom: 23px;
                    line-height: 0;
                }
            }

        }
        .m-t-18 {
            margin-top: 18px;
        }
        .foot-wrap {
            height: 15%;
            padding-top: 30px;
            box-sizing: border-box;
            text-align: center;
            font-size: 14px;
            a {
                color: #999999;
            }
        }
        .icon-color {
            color: #0084DA;
        }
    }

    .m-t-25 {
        display: none;
    }
</style>
