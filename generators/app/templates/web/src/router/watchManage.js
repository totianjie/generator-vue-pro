/**
 * @Author:Nelson
 * @Date: 2019/01/19
 * @remark: 监控管理
 * */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const WarningList = () => import(/* webpackChunkName: "group-watchManage" */ 'pages/watchManage/taskWatch'); // 任务监控管理

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '监控管理', keepAlive: false },
    children: [
        { path: '/watchManage/taskWatch', component: WarningList, meta: { title: '任务管理监控', keepAlive: false } }
    ]
};
