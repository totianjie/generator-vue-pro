/**
 * @Author: mikey.TIANJIE
 * @Date: 2019-01-21
 * @remark: 任务管理
 */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const batchTasks = () => import(/* webpackChunkName: "group-taskManage" */ 'pages/taskManage/batchTasks'); // 批次划分任务
const runManage = () => import(/* webpackChunkName: "group-taskManage" */ 'pages/taskManage/runManage'); // 跑批任务
// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '任务管理', keepAlive: false },
    children: [
        { path: '/taskManage/batchTasks', component: batchTasks, meta: { title: '批次划分任务', keepAlive: false } },
        { path: '/taskManage/runManage', component: runManage, meta: { title: '跑批任务', keepAlive: false } }
    ]
};
