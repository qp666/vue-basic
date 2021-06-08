export default {
    /**
     * @author pretender
     * @description 设置用户登录信息
     * @param {Object} state 
     * @param {Object} data 
     */
    setLoginInfo(state, data) {
        state.loginInfo = data;
    },
    /**
     * @author pretender
     * @description 设置状态栏路由
     * @param {Object} state 
     * @param {Object} data 
     */
    setStatusBar(state, data) {
        state.currentRoute = data;
        let bars = window.sessionStorage.getItem("statusBar");
        if(bars){
            state.statusBar = JSON.parse(bars);
        }
        let routeObj = state.statusBar.find(item => item.name === data.name);
        if (routeObj) {
            return;
        }else{
            state.statusBar.push(data);
            window.sessionStorage.setItem("statusBar",JSON.stringify(state.statusBar));
        }
        
    },
    /**
     * @author pretender
     * @description 设置当前路由
     * @param {Object} state 
     * @param {Object} data 
     */
    setCurrentRoute(state,data){
        state.currentRoute = data;
    },
    /**
     * @author pretender
     * @description 移除当前路由
     * @param {Object} state 
     * @param {Object} data 
     */
    removeCurrentRoute(state, data) {
        let currentIndex = state.statusBar.findIndex(item => item.name === data.name);
        if (currentIndex !== -1) {
            state.statusBar.splice(currentIndex, 1);
            window.sessionStorage.setItem("statusBar",JSON.stringify(state.statusBar));
        }
    },
    /**
     * @author pretender
     * @description 移除除当前路由外其他路由
     * @param {Object} state
     */
    removeOtherRoutes(state) {
        state.statusBar = [];
        window.sessionStorage.setItem("statusBar",JSON.stringify(state.statusBar));
    },
    /**
     * @author pretender
     * @description 全局配置设置
     * @param {Object} state 
     * @param {Object} data 
     */
    changeSetting(state, data) {
        state[data.key] && (state[data.key] = data.value);
    },
    /**
     * @author pretender
     * @description 缓存页设置
     * @param {Object} state 
     * @param {String} data 
     */
    setCachePages(state, data) {
        let i = state.cachePages.findIndex(item => {
            return item === data;
        });
        if (i === -1) {
            state.cachePages.push(data);
        }
    },
    /**
     * @author pretender
     * @description 缓存页移除
     * @param {Object} state 
     * @param {String} data 
     */
    removeCachePage(state, data) {
        let i = state.cachePages.findIndex(item => {
            return item === data;
        });
        if (i !== -1) {
            state.cachePages.splice(i, 1);
        }
    },
    /**
     * @author pretender
     * @description 设置当前子系统
     * @param {Object} state 
     * @param {Object} data 
     */
    setCurrentSystem(state,data){
        window.sessionStorage.setItem("currentSystem", JSON.stringify(data));
        state.currentSystem = data;
        console.log("当前系统数据：",state.currentSystem);
    },
    /**
     * @author pretender
     * @description 设置左侧菜单栏展开状态
     * @param {Object} state 
     * @param {Boolean} data 
     */
    setExpand(state,data){
        state.isExpand = data;
    },
};
