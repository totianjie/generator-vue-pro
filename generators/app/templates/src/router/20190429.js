/**
 *  Created by TIANJIE on 2019/04/29
 *  ps: 不作为Home组件的子页面展示的页面
 * */
const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const test1 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/test1'); // 疾病对照
const demoA6 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/demoA6'); // 特定(单)病种质量监测指标
const demoA4 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/demoA4'); // 住院重点疾病管理
const demoA5 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/demoA5'); // 住院重点手术管理
// 大师兄的页面

const index1 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/dsx/index'); // 测试文件
const index2 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/dsx/index2'); // 测试文件
const index3 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/dsx/index3');
const index4 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/dsx/index4'); // 测试文件

const Item1 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/Pro1Item'); // 深圳市妇幼保健院绩效考核管理系统/医疗质量管理
const Item2 = () => import(/* webpackChunkName: "group-20190429" */ 'pages/20190429/Pro2Item'); // 深圳市妇幼保健院医疗质量综合管理系统/住院患者死亡例数
// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: {title: '基础数据对照', keepAlive: false},
    children: [
        {path: '/20190429/test1', component: test1, meta: {title: 'test1', keepAlive: false}},
        {path: '/20190429/demoA4', component: demoA4, meta: {title: '住院重点疾病管理', keepAlive: false}},
        {path: '/20190429/demoA5', component: demoA5, meta: {title: '住院重点手术管理', keepAlive: false}},
        {path: '/20190429/demoA6', component: demoA6, meta: {title: '特定(单)病种质量监测指标', keepAlive: false}},
        {path: '/20190429/dsx1', component: index1, meta: {title: '运营效率管理', keepAlive: false}},
        {path: '/20190429/dsx2', component: index2, meta: {title: '持续发展能力评估', keepAlive: false}},
        {path: '/20190429/dsx3', component: index3, meta: {title: '满意度调查', keepAlive: false}},
        {path: '/20190429/dsx4', component: index4, meta: {title: '医疗数据质量分析统计', keepAlive: false}},

        {path: '/20190429/pro1item', component: Item1, meta: {title: '医疗质量管理', keepAlive: false}},
        {path: '/20190429/pro2item', component: Item2, meta: {title: '住院患者死亡例数', keepAlive: false}}
    ]
};
