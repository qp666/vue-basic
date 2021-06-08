import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/common.scss";
import "./assets/css/resetelement.scss";
import "./assets/font/iconfont.css";

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: "small"
});

//引入工具类
import utils from './utils/utils';
Vue.prototype.$utils = utils;

//全局注册所有组件
import EPUI from "./components/index";
Vue.use(EPUI, {
    timeout: {
        time: 5 * 1000,
        message: "请求超时"
    }
});

//引入数字输入指令
import onlyNumber from "./directives/onlyNumber";
Vue.use(onlyNumber);

//引入图片错误占位指令
import errorImg from './directives/errorImg';
Vue.use(errorImg);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
