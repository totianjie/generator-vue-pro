/**
 * @Author: mikey.TIANJIE
 * @Date: 2019-01-21
 * @remark: 任务管理
 */

const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const SubRuleManage = () => import(/* webpackChunkName: "group-shangbao" */ 'pages/shangbao/subRuleManage'); // 子规则管理
const RuleM = () => import(/* webpackChunkName: "group-shangbao" */ 'pages/shangbao/ruleM'); // 规则管理
const BusinessManage = () => import(/* webpackChunkName: "group-shangbao" */ 'pages/shangbao/businessManage'); // 保险管理
// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '商保', keepAlive: false },
    children: [
        { path: '/shangbao/subRuleManage', component: SubRuleManage, meta: { title: '子规则管理', keepAlive: false } },
        { path: '/shangbao/ruleM', component: RuleM, meta: { title: '规则管理', keepAlive: false } },
        { path: '/shangbao/businessManage', component: BusinessManage, meta: { title: '保险管理', keepAlive: false } }
    ]
};
