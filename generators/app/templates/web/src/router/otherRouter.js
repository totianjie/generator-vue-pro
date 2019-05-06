/**
 *  Created by TIANJIE on 2018/6/19
 *  ps: 作为Home组件的子页面展示但是不在左侧菜单显示的路由
 * */
const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const Error403 = () => import(/* webpackChunkName: "group-otherRouter" */ 'pages/errorPage/Error403'); // 权限不足
const HomePage = () => import(/* webpackChunkName: "group-otherRouter" */ 'pages/HomePage'); // 首页
const DEMO = () => import(/* webpackChunkName: "group-demo" */ 'components/test/DemoTemp'); // DEMO
const ElementDemo = () => import(/* webpackChunkName: "group-demo" */ 'components/test/ElementDemo'); // element-demo
// 作为Home组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export default {
    path: '/',
    component: Home,
    children: [
        {path: '/error403', component: Error403, meta: {title: '权限不足', keepAlive: false}},
        {path: '/homePage', component: HomePage, meta: {title: '首页', keepAlive: false}},
        {path: '/components/test/demo', component: DEMO, meta: {title: 'DEMO', keepAlive: false}},
        {path: '/components/test/element-demo', component: ElementDemo, meta: {title: 'element-demo', keepAlive: false}}
    ]
};
