webpackJsonp([27],{Fi0s:function(t,e){},RjX2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Zone"),s={data:function(){return{isShowSelectCenter:!1}},name:"LogoOut",props:{},watch:{},computed:{},methods:{logoutEvent:function(){this._$confirm({content:"您是否确定注销登录"}).then(function(){Object(i.b)()}).catch(function(){return!1})},personCenter:function(){this.$router.push({path:"/userCenter"})}}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"logo-out"},[e("el-button",{class:["m-r-24 pointer",{activeUserCenter:this.isShowSelectCenter}],attrs:{type:"primary",icon:"iconfont icon-gongneng"},on:{click:this.personCenter}}),this._v(" "),e("span",{staticClass:"m-r-40 pointer"}),this._v(" "),e("el-button",{staticClass:"submit-btn",attrs:{type:"primary"},on:{click:this.logoutEvent}},[e("span",{staticClass:"btn_login_out"},[this._v("注销")])])],1)},staticRenderFns:[]};var o=n("VU/8")(s,a,!1,function(t){n("Fi0s")},"data-v-5bb26e8a",null);e.default=o.exports},"Y/OD":function(t,e){},l0F7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Dd8w"),s=n.n(i),a=n("SJI6"),o=n("nRtX"),h=n("QmSG"),r=Object(o.e)("transform"),c={name:"TopNav",props:{},data:function(){return{offset:0,listWidth:"100%",defaultPage:h.a.defaultPage,menuList:this.$router.options.routes,bHome:!1}},computed:s()({},Object(a.mapGetters)(["navList","navCurrentIndex"])),watch:{navList:function(t,e){var n=this;this.$nextTick(function(){if(t.length>0){if(null===n.itemWidth){var e=n.$refs.nav_li[0];n.itemWidth=parseFloat(Object(o.c)(e,"width"))+parseFloat(Object(o.c)(e,"marginLeft"))}n.count=n.itemWidth*t.length,n.listWidth=n.count>n.navWidth?n.count+"px":n.navWidth+"px",t.length>n.oldListLen?n.offset=n.count>n.navWidth?n.count-n.navWidth:0:n.offset-=n.itemWidth,n.oldListLen=t.length}})},navCurrentIndex:function(t,e){if(this.oldListLen===this.navList.length&&this.count>this.navWidth){var n=this.itemWidth*(t+1);this.offset=n-this.navWidth}},offset:function(){this.offset<0&&(this.offset=0),this.navUl.style[r]="translateX("+-this.offset+"px)"}},created:function(){this.navWidth=Number,this.itemWidth=null,this.count=0,this.oldListLen=0},mounted:function(){var t=this;this.$nextTick(function(){t.navUl=t.$refs.nav_ul,t.nav=t.$refs.nav,t.getNavWidth(),Object(o.a)(window,"resize",function(e){var n=e||event,i=t.navWidth;t.getNavWidth();var s=t.navWidth-i;return s>0&&(t.count>t.navWidth?(t.offset=t.offset-s,t.offset<0&&(t.offset=0)):t.offset=0),n.preventDefault&&n.preventDefault(),!1})})},methods:s()({prePage:function(){this.offset>0&&(this.offset-=this.navWidth/2)},nextPage:function(){this.navList.length>0&&this.count>this.navWidth&&(this.offset+=this.navWidth/2,this.offset>=this.count-this.navWidth&&(this.offset=this.count-this.navWidth))},selectItem:function(t){t.isSeparate?(this.navListChangeWithTitle({path:t.path,title:t.title}),this.$router.push({path:t.path})):this.$router.push({path:t.path})},delItem:function(t){if(t===this.navCurrentIndex){var e=1===this.navList.length?0:t-1;this.$router.push({path:this.navList[e].path})}else if(t<this.navCurrentIndex){var n=this.navCurrentIndex-1;this.setNavIndex(n)}this.delNavList(t)},getNavWidth:function(){this.navWidth=this.nav.getBoundingClientRect().width-64},pullMenu:function(){var t=this;this.$nextTick(function(){t.getNavWidth()})}},Object(a.mapMutations)({delNavList:"DEL_NAV_LIST",setNavIndex:"SET_NAV_CURRENT_INDEX"}),Object(a.mapActions)(["navListChangeWithTitle"])),components:{}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{ref:"nav",staticClass:"top-nav"},[n("span",{staticClass:"pre-page",on:{click:t.prePage}},[n("i",{staticClass:"el-icon-caret-left"})]),t._v(" "),n("ul",{ref:"nav_ul",staticClass:"list-wrap",style:{width:t.listWidth}},t._l(t.navList,function(e,i){return n("li",{key:e.id,ref:"nav_li",refInFor:!0,staticClass:"item",class:{active:i===t.navCurrentIndex},on:{click:function(n){return t.selectItem(e)}}},[n("span",{attrs:{title:e.title},domProps:{textContent:t._s(e.title)}}),t._v(" "),e.path!==t.defaultPage?n("i",{staticClass:"el-icon-close close-icon",on:{click:function(e){return e.stopPropagation(),t.delItem(i)}}}):t._e()])}),0),t._v(" "),n("span",{staticClass:"next-page",on:{click:t.nextPage}},[n("i",{staticClass:"el-icon-caret-right"})])])},staticRenderFns:[]};var l=n("VU/8")(c,u,!1,function(t){n("Y/OD")},"data-v-002f1dd1",null);e.default=l.exports}});