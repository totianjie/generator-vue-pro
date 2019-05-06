/**
 * @Author: mikey.TIANJIE
 * @Date: 2018-08-01 13:09:57
 * @Last Modified by: mikey.TIANJIE
 * @Last Modified time: 2018-08-02 17:31:45
 * @remark: 基础数据对照
 */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const DiseaseControl = () => import(/* webpackChunkName: "group-baseDataContrast" */ 'pages/baseDataContrast/diseaseControl'); // 疾病对照
const Operation = () => import(/* webpackChunkName: "group-baseDataContrast" */ 'pages/baseDataContrast/operation'); // 手术对照
const Cost = () => import(/* webpackChunkName: "group-baseDataContrast" */ 'pages/baseDataContrast/cost'); // 收费对照

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: {title: '基础数据对照', keepAlive: false},
    children: [
        {path: '/baseDataContrast/diseaseControl', component: DiseaseControl, meta: {title: '疾病对照', keepAlive: false}},
        {path: '/baseDataContrast/operation', component: Operation, meta: {title: '手术对照', keepAlive: false}},
        {path: '/baseDataContrast/cost', component: Cost, meta: {title: '收费对照', keepAlive: false}}
    ]
};
