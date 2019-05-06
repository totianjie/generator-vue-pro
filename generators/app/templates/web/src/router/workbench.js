/**
 * @Author: mikey.TIANJIE
 * @Date: 2018/9/6
 * @remark: 工作台
 * */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const CaseDisplay = () => import(/* webpackChunkName: "group-workbench" */ 'pages/workbench/caseDisplay'); // 病例展示
const auditCase = () => import(/* webpackChunkName: "group-workbench" */ 'pages/workbench/auditCase'); // 疑点审核
const CaseDisplayInfo = () => import(/* webpackChunkName: "group-workbench" */ 'pages/workbench/caseDisplay/index-info'); // 病例展示-info

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: {title: '工作台', keepAlive: false},
    children: [
        {path: '/workbench/caseDisplay', component: CaseDisplay, meta: {title: '病例展示', keepAlive: false}},
        {path: '/workbench/caseDisplayInfo', component: CaseDisplayInfo, meta: {title: '病例展示-info', keepAlive: false}},
        {path: '/workbench/auditCaseAll', component: auditCase, meta: {title: '全部病例', keepAlive: false}},
        {path: '/workbench/auditCase', component: auditCase, meta: { title: '疑点审核', keepAlive: false}}
    ]
};
