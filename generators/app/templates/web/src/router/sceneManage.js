/**
 * @Author: mikey.TIANJIE
 * @Date: 2019-03-10 13:09:57
 * @remark: 场景管理
 */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const Scene = () => import(/* webpackChunkName: "group-sceneManage" */ 'pages/sceneManage/scene'); // 场景列表
const Rule = () => import(/* webpackChunkName: "group-sceneManage" */ 'pages/sceneManage/rule'); // 规则管理
const RuleClassify = () => import(/* webpackChunkName: "group-sceneManage" */ 'pages/sceneManage/ruleClassify'); // 规则分类维护

// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: {title: '场景管理', keepAlive: false},
    children: [
        {path: '/sceneManage/scene', component: Scene, meta: {title: '场景列表', keepAlive: false}},
        {path: '/sceneManage/rule', component: Rule, meta: {title: '规则管理', keepAlive: false}},
        {path: '/sceneManage/ruleDev', component: Rule, meta: {title: '规则创建', keepAlive: false}},
        {path: '/sceneManage/ruleClassify', component: RuleClassify, meta: {title: '规则分类维护', keepAlive: false}}
    ]
};
