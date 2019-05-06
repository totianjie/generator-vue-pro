/**
 *  Created by TIANJIE on 2018/6/19
 *  ps: 权限管理
 * */
const Home = resolve => require(['pages/Home.vue'], resolve); // 首页面
const UserManage = () => import(/* webpackChunkName: "group-authorityManage" */ 'pages/authorityManage/user'); // 用户管理
const MenuManage = () => import(/* webpackChunkName: "group-authorityManage" */ 'pages/authorityManage/menu'); // 菜单管理
const OrgManage = () => import(/* webpackChunkName: "group-authorityManage" */ 'pages/authorityManage/org'); // 组织机构管理
const RoleGroupManage = () => import(/* webpackChunkName: "group-authorityManage" */ 'pages/authorityManage/roleGroup'); // 角色组管理
const DataRoleManage = () => import(/* webpackChunkName: "group-authorityManage" */ 'pages/authorityManage/dataRole'); // 数据角色管理
const ProgressAuthorization = () => import(/* webpackChunkName: "group-auditCase" */ 'pages/authorityManage/progressAuthorization'); // 流程授权管理
const ProcessAudit = () => import(/* webpackChunkName: "group-auditCase" */ 'pages/authorityManage/processAudit'); // 审核流程管理
// 作为Home组件的子页面展示并且在左侧菜单显示的路由
export default {
    path: '/',
    component: Home,
    open: false,
    menuShow: false,
    meta: { title: '权限管理', keepAlive: false },
    children: [
        { path: '/authorityManage/user', component: UserManage, meta: { title: '用户管理', keepAlive: false } },
        { path: '/authorityManage/menu', component: MenuManage, meta: { title: '菜单管理', keepAlive: false } },
        { path: '/authorityManage/roleGroup', component: RoleGroupManage, meta: { title: '角色组管理', keepAlive: false } },
        { path: '/authorityManage/dataRole', component: DataRoleManage, meta: { title: '数据角色管理', keepAlive: false } },
        { path: '/authorityManage/org', component: OrgManage, meta: { title: '组织机构管理', keepAlive: false } },
        { path: '/authorityManage/progressAuthorization', component: ProgressAuthorization, meta: { title: '流程授权管理', keepAlive: false } },
        { path: '/authorityManage/processAudit', component: ProcessAudit, meta: { title: '审核流程管理', keepAlive: false } }
    ]
};
