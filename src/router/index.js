import Vue from 'vue'
import VueRouter from 'vue-router'
import menus from './menus';
import store from '../store/index';
// import oatuh from "../utils/oauth.js";
// import { MessageBox } from "element-ui";
Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: menus
})
// const redirectUrl = `${window.config[process.env.NODE_ENV].authhost}/member/login?&scope=uims&state=dd&app_id=uNoilxyVl7fO0uMKKqCP&redirect_uri=${encodeURIComponent(window.location.origin + window.location.pathname)}`;

router.beforeEach((to, from, next) => {
  // let token = window.localStorage.getItem("ep_access_token");
  const { name, meta, path, query, params, fullPath } = to;
  store.commit('setStatusBar', { name, meta, path, query, params, fullPath });

  // if (!token && !to.query.code) {
  //   //完全没登录
  //   window.location.href = redirectUrl;
  // } else if (to.query.code && !token) {
  //   //有code  没有token
  //   oatuh.getAccess_token(to.query).then(res => {
  //     if (res && res.content && res.content.access_token) {
  //       window.localStorage.setItem("ep_access_token", res.content.access_token); //设置token
  //       userInfo(next, to, from);
  //     }
  //     if (res.code != 0) {
  //       //code失效，有可能是上次的code也有可能是code时间失效
  //       location.href = window.location.origin + window.location.pathname; //丢弃页面参数重新访问，重新授权
  //     }
  //   });
  // } else {
  //   userInfo(next, to);
  // }

  next();
})

// const userInfo = (next, to) => {
//   oatuh.getUserInfo().then(res => {
//     if (res.code == 10001 || res.code == 10008 || res.code == 90000) {
//       // access_token失效或者没有
//       window.localStorage.setItem("ep_access_token", "");
//       store.commit("setLoginInfo", {});
//       window.location.href = redirectUrl;
//     } else if (res.code == 90003) {
//       //用户
//       window.localStorage.setItem("ep_access_token", "");
//       store.commit("setLoginInfo", {});
//       MessageBox({
//         center: true,
//         title: "请重新登录",
//         message: res.message,
//         callback: () => {
//           window.location.href = redirectUrl;
//         }
//       });
//     } else if (res.content && res.content.member_info) {
//       window.console.log("获取到用户信息", res);
//       store.commit("setLoginInfo", res.content.member_info);
//       window.console.log(to);
//       next();
//     }
//   });
// };

export default router
