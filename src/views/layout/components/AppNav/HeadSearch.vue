<template>
    <div :class="{'show':show}" class="header-search">
        <div class="search-icon" @click.stop="click">
            <i class="el-icon-search search"></i>
        </div>
        <el-select ref="headerSearchSelect" v-model="routeName" filterable default-first-option placeholder="栏目名称" class="header-search-select" @change="change">
            <el-option v-for="item in oneLevelMenus" :key="item.path" :value="item.path" :label="item.meta.title" />
        </el-select>
    </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import allMenu from '../../../../router/menus';
export default {
    name: 'head-search',
    data() {
        return {
            routeName: '',
            menus: allMenu,
            oneLevelMenus:[],
            // catalog: [],
            show: false
        }
    },
    created() {
      this.initMenus(this.menus);
    },
    mounted() {
        this.getData();
    },
    watch: {
        show(value) {
            if (value) {
                document.body.addEventListener('click', this.close)
            } else {
                document.body.removeEventListener('click', this.close)
            }
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
        getData() {
            const handleCatalog = arr => {
                //封装数据 成 [{value: '路由名称',path: '路由地址'}]的形式
                let res = [];
                if (!Array.isArray(arr) || !(arr.length > 0)) {
                    return res;
                }
                arr.forEach(item => {
                    res = res.concat(
                        item.lists.filter(i => {
                            return i.is_display == '1';
                        }).map(i => {
                            return { value: i.name, path: i.path };
                        })
                    );
                });
                return res;
            };
            this.catalog = handleCatalog(JSON.parse(window.sessionStorage.getItem('catalog')));
        },
        click() {
            this.show = !this.show
            //   if (this.show) {
            //     this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
            //   }
        },
        close() {
            this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
            this.show = false
        },
        change(val) {
            this.$router.push({ path: val });
            this.routeName = ''
            this.$nextTick(() => {
                this.show = false
            })
        },
        // createFilter(queryString) {
        // 	return item => {
        // 		return item.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
        // 	};
        // },
        // querySearch(query) {
        //   if (query !== '') {
        //     const lists = this.catalog;
        // 	let result = query ? lists.filter(this.createFilter(query)) : lists;
        //   } else {
        //     this.catalog = []
        //   }
        // },

    }
}
</script>

<style lang="scss">
.header-search {
    font-size: 0 !important;
    display: flex;
    align-items: center;
    .search-icon {
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
    }
    .header-search-select {
        font-size: 18px;
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
        background: transparent;
        border-radius: 0;
        display: inline-block;
        vertical-align: middle;
        .el-input__inner {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }
    &.show {
        .header-search-select {
            width: 210px;
            margin-left: 10px;
        }
    }
}
</style>