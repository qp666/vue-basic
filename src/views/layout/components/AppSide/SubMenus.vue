<template>
    <div>
        <template v-for="item in lists">
            <el-menu-item :key="item.id" v-if="!item.children" :index="item.name">{{item.meta.title}}</el-menu-item>
            <el-submenu v-else :key="item.id">
                <template slot="title" :index="item.name">{{item.meta.title}}</template>
                <sub-menus :lists="item.children"></sub-menus>
            </el-submenu>
        </template>
    </div>
</template>
<script>
import SubMenus from "./SubMenus";
export default {
    name: "sub-menus",
    components: { SubMenus },
    props: ["lists"]
};
</script>
