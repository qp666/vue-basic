<template>
    <div id="tags-view-container" class="tags-view-container">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link v-for="tag in statusBar" ref="tag" :key="tag.path" :class="currentRoute.name === tag.name ?'active':''" :to="tag.path" tag="span" class="tags-view-item" @click.middle.native="tag.path !== '/system-menus'?closeSelectedTag(tag):''" @contextmenu.prevent.native="openMenu(tag,$event)">
                {{tag.meta.title}}
                <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
            </router-link>
        </scroll-pane>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="refreshSelectedTag">刷新当前页面</li>
            <li v-if="selectedTag.path !== '/system-menus'" @click="closeSelectedTag(selectedTag)">关闭当前标签</li>
            <li @click="closeOthersTags">关闭其他标签页</li>
            <li @click="closeAllTags">关闭所有标签页</li>
        </ul>
    </div>
</template>
<script>
import ScrollPane from './ScrollPane';
import { mapState } from 'vuex';
export default {
    name: "tags-bar",
    components: {
        ScrollPane
    },
    data() {
        return {
            visible: false,
            left: '',
            top: '',
            selectedTag: {}
        }
    },
    computed: {
        ...mapState(['isExpand', 'statusBar', 'currentRoute', 'themeColor'])
    },
    watch: {
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        },
        $route() {
            this.moveToCurrentTag();
        }
    },
    methods: {
        closeSelectedTag(tag) {
            this.$store.commit('removeCurrentRoute', tag);
            this.$store.commit('removeCachePage',tag.name);
            setTimeout(() => {
                let last = this.statusBar[this.statusBar.length - 1];
                this.$router.push({ path: last.path });
            })
        },
        openMenu(item, e) {
            this.selectedTag = item;
            this.visible = true;
            this.top = e.clientY;
            if (this.isExpand) {
                this.left = e.clientX - 210;
            } else {
                this.left = e.clientX - 64;
            }
        },
        closeMenu() {
            this.visible = false;
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag)
                        // when query is different then update
                        // if (tag.to.fullPath !== this.$route.fullPath) {
                        //     this.$store.dispatch('tagsView/updateVisitedView', this.$route)
                        // }
                        break
                    }
                }
            })
        },
        refreshSelectedTag() {
            window.location.reload();
        },
        closeOthersTags() {
            window.console.log(this.selectedTag);
            this.$store.commit('removeOtherRoutes');
            this.$router.push({ path: this.selectedTag.path });
            this.moveToCurrentTag();
        },
        closeAllTags() {
            this.$store.commit('removeOtherRoutes');

            // this.$store.commit('bar_close_all');
            setTimeout(() => {
                let last = this.statusBar[this.statusBar.length - 1];
                this.$router.push({ path: last.path });
            })
        }
    },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/variables.scss';
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 15px;
            }
            &:last-of-type {
                margin-right: 15px;
            }
            &.active {
                background-color: $theme-color;
                color: $font-white;
                border-color: $theme-color;
                &::before {
                    content: "";
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }
    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>