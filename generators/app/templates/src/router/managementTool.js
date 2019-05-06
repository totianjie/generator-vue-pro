/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-09-14
 * @remark: 管理工具
 */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const ModuleManage = () => import(/* webpackChunkName: "group-managementTool" */ 'pages/managementTool/moduleManage'); // 模块管理
const TaskManage = () => import(/* webpackChunkName: "group-managementTool" */ 'pages/managementTool/taskManage'); // 任务管理
const OutPutTool = () => import(/* webpackChunkName: "group-managementTool" */ 'pages/managementTool/outPutTool'); // 数据导出

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '管理工具', keepAlive: false },
    children: [
        { path: '/managementTool/moduleManage', component: ModuleManage, meta: { title: '模板管理', keepAlive: false } },
        { path: '/managementTool/taskManage', component: TaskManage, meta: { title: '任务管理', keepAlive: false } },
        { path: '/managementTool/outPutTool', component: OutPutTool, meta: { title: '数据导出', keepAlive: false } }
    ]
};
