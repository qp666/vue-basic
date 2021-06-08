<template>
    <div class="ep-wrapper">
        <div class="ep-slide-left" :class="isExpand?'is-expand':'no-expand'">
            <ep-side></ep-side>
        </div>
        <div class="ep-slide-right" :class="isExpand?'is-expand':'no-expand'">
            <div class="ep-slide-right__header">
                <ep-nav></ep-nav>
                <tags-bar></tags-bar>
            </div>
            <div class="ep-slide-right__main">
                <ep-main></ep-main>
                <div class="copy-right"> 版权所有 &copy; 2018-2020 深圳懿轩科技有限公司 <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备16034137号-1</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import { EpMain, EpNav, EpSide, TagsBar } from "./components";
import { mapState } from 'vuex';
export default {
    name: "layout",
    components: {
        EpMain,
        EpNav,
        EpSide,
        TagsBar
    },
    computed: {
        ...mapState(['isExpand'])
    }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/variables.scss";
.ep-wrapper {
    width: 100%;
    height: 100%;
}
.ep-slide-left {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    height: 100%;
    overflow: hidden;
    background-color: #304156;
    transition: width 0.28s;
    &.is-expand {
        width: 160px;
        padding: 0 5px;
    }
    &.no-expand {
        width: 60px;
    }
}
.ep-slide-right {
    min-height: 100%;
    transition: margin-left 0.28s;
    position: relative;
    display: flex;
    flex-direction: column;

    &__main {
        width: 100%;
        height: 100%;
        display: flex;
        flex: 1;
        .copy-right {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            height: 40px;
            line-height: 40px;
            a {
                text-decoration: none;
                color: $theme-color;
            }
        }
    }
    &.is-expand {
        margin-left: 160px;
    }
    &.no-expand {
        margin-left: 60px;
    }
}
</style>