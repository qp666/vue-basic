<template>
    <div class="ui-frame widthP100">
        <div class="ui-frame-input">
            <el-input ref="frameInput" :readonly="!frame" v-model.trim="frame" placeholder="" :size="size || 'small'" :clearable="clearable || true" @clear="handleClear">
                <el-button slot="append" plain icon="el-icon-search" :disabled="disabled || false" @click.stop="showDialog"></el-button>
            </el-input>
        </div>
        <div class="ui-frame-dialog" v-show="treeShow">
            <el-input ref="filterInput" placeholder="" v-model.trim="filterText" class="mb10" @focus="filterFocus" @blur="filterBlur"></el-input>
            <el-tree ref="frameTree" :check-strictly="false" class="widthP100" :data="allFrame" :props="defaultProps" node-key="frame_id" :filter-node-method="filterNode" :expand-on-click-node="true" :highlight-current="true" @check-change="selectNode" @node-click="nodeClick">
                <div class="widthP100" v-if="!data.children" slot-scope="{ node, data }">
                    <div class="ui-frame-tree-node" :class="{'active':data.isActive}">
                        <div>{{ node.label}}</div>
                        <!-- <div>
                            <el-button size="mini" type="plain" @click.stop="selectNode(node,data)">确认选择</el-button>
                        </div> -->
                    </div>
                </div>
                <div class="widthP100 ui-frame-tree-node" v-else slot-scope="{node}">
                    <span>{{ node.label}}</span>
                </div>
            </el-tree>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ep-frame',
    props: ['value', 'placeholder', 'size', 'clearable', 'disabled', 'multiple'],
    data() {
        return {
            frame: '',
            filterText: '',
            allFrame: [],
            defaultProps: {
                children: "children",
                label: "frame_name"
            },
            treeShow: false,
            focus: false,
            checkedId: null,
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.setData();
                if(val === ''){
                    this.filterText = '';
                }
            },
            immediate: true
        },
        filterText: {
            handler: function (val) {
                if(this.$refs.frameTree){
                    if (val) {
                        this.$refs.frameTree.filter(val);
                    }else{
                        this.$refs.frameTree.filter('');
                    }
                }
            },
            immediate: true
        },
        treeShow(val) {
            if (val) {
                document.body.addEventListener('click', this.closeDialog)
            } else {
                document.body.removeEventListener('click', this.closeDialog)
            }
        }
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            let res = await this.$utils.gateway(this.$utils.api.getFrameList);
            if (res.code === 0 && res.content && Array.isArray(res.content.lists)) {
                this.initLevel(res.content.lists);
                this.setData();
            } else {
                this.allFrame = [];
            }
        },
        initLevel(lists) {
            lists.forEach(item => {
                let level = 1;
                item.level = level;
                if (item.children) {
                    // if(this.multiple){
                    //     item.disabled = false;
                    // }else{
                    //     item.disabled = true;
                    // }
                    this.initLevel(item.children, ++level);
                } else {
                    // item.disabled = false;
                }
            });
            this.allFrame = lists;
            
        },
        setData() {
            if (this.allFrame.length > 0) {
                const obj = this.checkNode(this.value, this.allFrame);
                if (obj) {
                    this.frame = obj.frame_name;
                    // this.$refs.frameTree.setCheckedNodes([obj]);
                    // this.selectNode(obj,false,true);
                    this.$emit('input', obj.frame_id);
                } else {
                    this.frame = '';
                    this.$emit('input', '');
                }
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.frame_name.indexOf(value) !== -1;
        },
        showDialog() {
            this.treeShow = !this.treeShow;
        },
        closeDialog() {
            if (this.treeShow && !this.focus) {
                this.treeShow = false;
            }
        },
        filterFocus() {
            this.focus = true;
        },
        filterBlur() {
            this.focus = false;
        },
        selectNode(data, checked, node) {
            window.console.log("aaaa:", data, checked, node);
            if (checked) {
                this.checkedId = data.frame_id;
                this.$refs.frameTree.setCheckedNodes([data]);
            }

            // this.$emit('input', data.frame_id);
            // 
        },
        nodeClick(data, checked, node) {
            window.console.log("bbbb:", data, checked, node);
            this.checkedId = data.id
            this.$refs.frameTree.setCheckedNodes([data]);
            this.frame = data.frame_name;
            this.$emit('input', data.frame_id);
            this.treeShow = false;
        },
        checkNode(frame_id, mapData) {
            let flag = false, result = null;
            const deepSearch = function (frame_id, mapData) {
                for (let i = 0; i < mapData.length; i++) {
                    if (frame_id === mapData[i].frame_id) {
                        result = mapData[i];
                        flag = true;
                        break;
                    } else if (mapData[i].children && mapData[i].children.length > 0 && !flag) {
                        deepSearch(frame_id, mapData[i].children);
                    }
                }
            }
            deepSearch(frame_id, mapData);
            return result;
        },
        handleClear() {
            this.frame = '';
            this.$emit('input', '');
            this.$emit('clear');
        }
    },
}
</script>
<style lang="scss" scoped>
.ui-frame {
    &-input {
        ::v-deep {
            .el-input-group__append {
                background-color: #fff;
            }
            .el-input-group__append {
                height: 30px;
            }
            .el-button.is-plain:focus,
            .el-button.is-plain:hover {
                color: #666;
                border: none;
                height: 100%;
            }
        }
    }
    &-dialog {
        position: absolute;
        margin-top: 5px;
        max-width: 300px;
        max-height: 300px;
        overflow: auto;
        border: 1px solid #ddd;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        z-index: 10;
    }
    &-tree-node {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        border-bottom: 1px dashed #ddd;
        &.active {
            color: #009ad9;
        }
    }
    ::v-deep {
        .el-tree {
            .el-tree-node {
                margin: 5px 0;
            }
        }
    }
}
</style>