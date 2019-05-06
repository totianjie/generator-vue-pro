/**
 * @Author:Nelson
 * @Date: 2019/01/19
 * @remark: 配置管理
 * */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const WarningList = () => import(/* webpackChunkName: "group-settingManage" */ 'pages/settingManage/warningList'); // 任务预警配置
const DataManageCenter = () => import(/* webpackChunkName: "group-settingManage" */ 'pages/settingManage/dataManageCenter'); // 业务数据配置中心
const HostManage = () => import(/* webpackChunkName: "group-settingManage" */ 'pages/settingManage/hostManage'); // 跑批主机管理

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '配置管理', keepAlive: false },
    children: [
        { path: '/settingManage/warningList', component: WarningList, meta: { title: '任务预警配置', keepAlive: false } },
        { path: '/settingManage/dataManageCenter', component: DataManageCenter, meta: { title: '业务数据配置中心', keepAlive: false } },
        { path: '/settingManage/hostManage', component: HostManage, meta: { title: '跑批主机管理', keepAlive: false } }
    ]
};
