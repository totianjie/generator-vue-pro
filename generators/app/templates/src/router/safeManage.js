/**
 * @Author:Nelson
 * @Date: 2019/04/19
 * @remark: 安全部署管理
 * */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const Safe = () => import(/* webpackChunkName: "group-safeManage" */ 'pages/safeManage/safeManage'); // 许可证管理

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '安全管理', keepAlive: false },
    children: [
        { path: '/safeManage/safeManage', component: Safe, meta: { title: '许可证管理', keepAlive: false } }
    ]
};
