/**
 *  Created by TIANJIE on 2018/6/19
 *  ps: 不作为Home组件的子页面展示的页面
 * */
const Login = resolve => require(['pages/login/Login'], resolve); // 登录页面
const Error404 = resolve => require(['pages/errorPage/Error404'], resolve); // 404错误页面
const Error500 = resolve => require(['pages/errorPage/Error500'], resolve); // 500错误页面
const ErrorChrome = resolve => require(['pages/errorPage/ErrorChrome'], resolve); // 非chrome进入此页面
const ElementDemo = resolve => require(['components/test/ElementDemo'], resolve);

// 不作为Home组件的子页面展示的页面单独写，如下
export default [
    {
        path: '/login',
        component: Login,
        meta: {title: '登录'}
    },
    {
        path: '*',
        component: Error404,
        meta: {title: '404页面'}

    },
    {
        path: '/error500',
        component: Error500,
        meta: {title: '服务器错误', keepAlive: false}
    },
    {
        path: '/chrome',
        component: ErrorChrome,
        meta: {title: 'chrome下载页面', keepAlive: false}
    },
    {path: '/elementDemo', component: ElementDemo, meta: {title: 'element-demo', keepAlive: false}}
];
