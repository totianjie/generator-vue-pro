/**
 * @Author: Nelson Hsiao
 * @Date: 2019-01-04
 * @remark: 标准数据库
 */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const consumables = () => import(/* webpackChunkName: "group-standardLibrary" */ 'pages/standardLibrary/consumables'); // 标准耗材目录
const diagnosisTreatment = () => import(/* webpackChunkName: "group-standardLibrary" */ 'pages/standardLibrary/diagnosisTreatment'); // 标准诊疗目录
const drugs = () => import(/* webpackChunkName: "group-standardLibrary" */ 'pages/standardLibrary/drugs'); // 标准药品目录
const operation = () => import(/* webpackChunkName: "group-standardLibrary" */ 'pages/standardLibrary/operation'); // 标准手术目录
const disease = () => import(/* webpackChunkName: "group-standardLibrary" */ 'pages/standardLibrary/disease'); // 标准疾病目录

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '标准数据库', keepAlive: false },
    children: [
        { path: '/standardLibrary/consumables', component: consumables, meta: { title: '标准耗材目录', keepAlive: false } },
        { path: '/standardLibrary/diagnosisTreatment', component: diagnosisTreatment, meta: { title: '标准诊疗目录', keepAlive: false } },
        { path: '/standardLibrary/drugs', component: drugs, meta: { title: '标准药品目录', keepAlive: false } },
        { path: '/standardLibrary/operation', component: operation, meta: { title: '标准手术目录', keepAlive: false } },
        { path: '/standardLibrary/disease', component: disease, meta: { title: '标准疾病目录', keepAlive: false } }
    ]
};

