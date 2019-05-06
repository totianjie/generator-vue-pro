import Vue from 'vue';
import Loading from 'vendor/loading';
import Toast from 'vendor/toast';
import TreeTable from 'vendor/treeTable';
import Gauge from 'vendor/gauge';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition);

// import 'static/plugins/three.min';
// console.log('==============',THREE);

import {
    Button,
    Row,
    Col,
    Container,
    Header,
    Footer,
    Main,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Select,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Tree
    // MessageBox,
    // Message
} from 'element-ui';

// 设置全局信息
// Vue.prototype.$ELEMENT = {size: 'mini', zIndex: 3000};

Vue.use(Loading);
Vue.use(Toast); // this.$toast(msg, duration);
Vue.use(TreeTable);
Vue.use(Gauge);

Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tree);
// Vue.use(MessageBox);
// Vue.use(Message);

// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// // Vue.prototype.$prompt = MessageBox.prompt;
// // Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;
