import appRouter from './appRouter'; // 不作为Home组件的子页面展示的页面
import otherRouter from './otherRouter'; // 作为Home组件的子页面展示但是不在左侧菜单显示的路由
import authorityManage from './authorityManage'; // 权限管理
import baseDataContrast from './baseDataContrast'; // 基础数据对照
import workbench from './workbench'; // 工作台
import userCenterRouter from './userCenterRouter'; // 用户个人中心
import managementTool from './managementTool'; // 管理工具
import standardLibrary from './standardLibrary'; // 标准库
import historyLibrary from './historyLibrary'; // 历史数据库
import settingManage from './settingManage'; // 配置管理
import taskManage from './taskManage'; // 任务管理
import watchManage from './watchManage'; // 任务管理
import sceneManage from './sceneManage'; // 场景管理
import shangbao from './shangbao'; // 商保
import safeManage from './safeManage'; // 安全管理

import my20190429 from './20190429'; // 安全管理

export default [
    ...appRouter,
    otherRouter,
    authorityManage,
    baseDataContrast,
    workbench,
    userCenterRouter,
    managementTool,
    standardLibrary,
    historyLibrary,
    settingManage,
    watchManage,
    sceneManage,
    taskManage,
    shangbao,
    safeManage,
    my20190429
];
