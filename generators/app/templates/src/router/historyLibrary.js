/**
 * @Author: GOTINTIN
 * @Date: 2019-1-5
 * @remark: 历史数据库
 */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const Disease = () => import(/* webpackChunkName: "group-historyLibrary" */ 'pages/historyLibrary/disease'); // 疾病历史对照数据
const Operation = () => import(/* webpackChunkName: "group-historyLibrary" */ 'pages/historyLibrary/operation'); // 手术历史对照数据
const Cost = () => import(/* webpackChunkName: "group-historyLibrary" */ 'pages/historyLibrary/cost'); // 收费历史对照数据
// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '历史数据库', keepAlive: false },
    children: [
        { path: '/historyLibrary/disease', component: Disease, meta: { title: '疾病历史对照数据', keepAlive: false } },
        { path: '/historyLibrary/operation', component: Operation, meta: { title: '手术历史对照数据', keepAlive: false } },
        { path: '/historyLibrary/cost', component: Cost, meta: { title: '收费历史对照数据', keepAlive: false } }
    ]
};
