const state = {
    loadingShow: false,
    position: Object.create({}), // 保存每个路由进入的时间
    signinStatus: false, // 登陆状态
    menuList: [], // 权限菜单
    userInfo: { // 登陆用户信息
        id: '',
        name: ''
    },
    // 头部导航数据
    navList: [],
    // 当前选择的nav索引
    navCurrentIndex: -1
};

export default state;
