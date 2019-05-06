/**
 *  Created by Nelson on 2018/8/19
 *  ps: 作为Home组件的子页面展示但是不在左侧菜单显示的路由
 * */
const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const UserCenter = () => import(/* webpackChunkName: "group-userCenter" */ 'pages/userCenter/UserInfo'); // 个人中心
// 作为Home组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    children: [
        { path: '/userCenter', component: UserCenter, meta: { title: '个人中心', keepAlive: false } }
    ]
};
