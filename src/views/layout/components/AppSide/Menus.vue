<template>
     <el-menu :default-active="currentRoute.name" :collapse="!isExpand" menu-trigger="click" :background-color="themeBackColor" :text-color="fontWhite" :active-text-color="themeColor" @open="handleOpen" @select="handleSelect" @close="handleClose" :router="false">
        <template v-for="item in menus">
            <el-menu-item v-if="item.children.length === 0" :index="item.name" :key="item.id">
                <i :class="item.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.name" :key="item.id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.meta.title}}</span>
                </template>
                <sub-menus :lists="item.children"></sub-menus>
            </el-submenu>
        </template>
    </el-menu>
</template>
<script>
import allMenu from '../../../../router/menus';
import SubMenus from './SubMenus';
import { mapState } from 'vuex';
export default {
    name: 'menus',
    components: {
        SubMenus
    },
    data() {
        return {
            menus: allMenu,
            oneLevelMenus: []
        }
    },
    created() {
        this.initMenus(this.menus);
    },
    computed: {
        ...mapState(['currentRoute', 'isExpand', 'themeColor', 'themeBackColor', 'fontWhite']),
        currentId() {
            let obj = this.oneLevelMenus.find(item => item.name === this.currentRoute.name);
            return obj.id
        }
    },
    methods: {
        initMenus(arr) {
            arr.map(item => {
                if (Array.isArray(item.children) && item.children.length > 0) {
                    this.oneLevelMenus.push(item);
                    this.initMenus(item.children);
                } else {
                    this.oneLevelMenus.push(item)
                }
            })
        },

        handleOpen(key, keyPath) {
            window.console.log(key, keyPath);

        },
        handleClose(key, keyPath) {
            window.console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            window.console.log(key, keyPath);
            this.skipRoute(key);
        },
        skipRoute(key) {
            window.console.log(key);
            let selectRoute = this.oneLevelMenus.find(item => item.name === key);
            if (selectRoute) {
                this.$store.commit('setCachePages', selectRoute.name);
                this.$router.push({
                    path: selectRoute.path
                })
            }
        }
    }
    // computed:{
    //     ...mapState(['menus'])
    // }
}
</script>
<style lang="scss">
.el-scrollbar {
    overflow: hidden;
    position: relative;
    overflow-y: auto;
    height: calc(100% - 60px);
    padding-bottom: 10px;
}
.ep-route-wrapper {
    .el-menu {
        border-right: 0;
    }

    .el-menu-item,
    .el-submenu__title {
        line-height: 45px;
        height: 45px;
        display: flex;
        align-items: center;
    }
    .el-submenu {
        .el-menu-item {
            max-width: 200px;
        }
    }
}
</style>
