<template>
    <div class="ep-tools-bar">
        <tool-icon></tool-icon>
        <el-breadcrumb separator="&gt;">
            <!-- <el-breadcrumb-item v-if="currentRoute.name === 'function-and-data'">{{parentRouteMap['system-menus']}}</el-breadcrumb-item> -->
            <el-breadcrumb-item >{{parentRouteMap[currentRoute.name]}}</el-breadcrumb-item>
            <template v-if='currentRoute'>
                <!-- <el-breadcrumb-item :to="{path:'/system-menus'}" v-if="currentRoute.name === 'function-and-data'">{{parentRouteMap[currentRoute.name]}}</el-breadcrumb-item> -->
                <el-breadcrumb-item>{{currentRoute.meta.title}}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
        <div class="ep-tools-bar-right">
            <!-- <head-search></head-search> -->
            <div class='setting ml10'>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link setting">{{loginInfo.full_name ? loginInfo.full_name : (loginInfo.user_name  || loginInfo.mobile)}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="todolist">每日待办</el-dropdown-item>
                        <el-dropdown-item command="gotoEmail">企业邮箱</el-dropdown-item>
                        <el-dropdown-item command="clearcache">清除缓存</el-dropdown-item>
                        <el-dropdown-item>{{loginInfo.role_name}}</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

    </div>
</template>
<script>
import ToolIcon from "./ToolIcon";
// import HeadSearch from "./HeadSearch";
import { mapState } from 'vuex';
export default {
    name: "app-nav",
    components: {
        ToolIcon,
        // HeadSearch
    },
    data() {
        return {
            parentRouteMap: {
                "system-menus": "权限系统",
                "role-authorize": "权限系统",
                "user-authorize": "权限系统",
                "function-and-data": "系统菜单",
                "role-management": "角色管理",
                "user-management": "角色管理",
                "account-management": "账号管理",
                "log-management": "权限日志",
                "interface-management": "接口管理"
            }
        }
    },
    computed: {
        ...mapState(['currentRoute', 'loginInfo'])
    },
    created() {

    },
    methods: {
        clearcache: function () {
            this.$msgbox({
                title: "提示",
                message: "清除缓存操作也将清除当前用户信息,需要重新登录",
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                beforeClose: (action, instance, done) => {
                    if (action === "confirm") {
                        this.logout();
                    } else {
                        done();
                    }
                }
            });
        },
        logout() {
            window.localStorage.clear();
            window.sessionStorage.clear();
            this.$store.commit('setLoginInfo',{});
            window.location.href = `${window.config[process.env.NODE_ENV].authhost}/member/login?&scope=uims&state=dd&app_id=uNoilxyVl7fO0uMKKqCP&redirect_uri=${window.location.origin + window.location.pathname}`;
        },
        goTodolist() {
            this.$router.push({ path: "/todolist" });
        },
        handleCommand: function (command) {
            // var vm = this;
            if (command == "clearcache") {
                this.clearcache();
                return;
            }
            if (command == "todolist") {
                this.goTodolist();
                return;
            }
            if (command == "gotoEmail") {
                window.open("https://exmail.qq.com/cgi-bin/loginpage");
                return;
            }
            if (command == "logout") {
               this.logout();
               return;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.ep-tools-bar {
    box-shadow: 0 0 5px #eee;
    border-bottom: 1px solid #f7f7f7;
    display: flex;
    align-items: center;
    &-right {
        flex: 1;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 15px;
        .el-dropdown-link{
            cursor: pointer;
        }
    }
}
</style>