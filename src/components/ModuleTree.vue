<template>
    <div class="ui-module-tree">
        <el-popover placement="bottom-start" width="300" trigger="focus" :disabled="disabled" v-model="isShow">
            <el-scrollbar ref="scrollContainer" class="ui-module-tree__scrollbar" :horizontal="false" vertical>
                <div class="ui-module-tree__dialog">
                    <el-tree ref="tree" :data="treeData" node-key="ac_module_id" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick">
                        <span class="custom-tree-node" slot-scope="{ node }">
                            <span>{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </el-scrollbar>
            <div class="ui-module-tree__input" slot="reference">
                <el-input ref="treeInput" v-model.trim="module_name" :placeholder="placeholder" :clearable="clearable" :disabled="disabled" :readonly="readonly" @focus="showDialog"></el-input>
            </div>
        </el-popover>
    </div>
</template>
<script>
export default {
    name: "ep-module-tree",
    props: {
        value: [String, Number],
        source_id:[String, Number],
        clearable: {
            type: Boolean,
            default() {
                return true;
            }
        },
        placeholder: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default() {
                return false;
            }
        },
        readonly:{
            type: Boolean,
            default() {
                return false;
            }
        },
        noRoot:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    data() {
        return {
            module_name: "",
            treeData: [
                {
                    ac_module_id:0,
                    module_name:"根模块",
                    child:[],
                }
            ],
            defaultProps: {
                label: "module_name",
                children: "child"
            },
            isShow: false,
            currentNode: {},
            oneLevelData: [],
            module_id:''
        };
    },
    watch: {
        value: {
            handler: function(val) {
                if (val === "" || val === null || val === undefined) {
                    this.module_name = "";
                    this.$emit("input", "");
                    this.$emit("change", {});
                }else{
                    this.module_id = val;
                }
            },
            immediate: true
        },
        module_name:{
            handler:function(val){
                this.$refs.tree && this.$refs.tree.filter(val);
            },
            immediate:true,
            deep:true
        },
        source_id:{
            handler:function(val){
                this.initTreeData(val);
            },
            immediate:true,
            deep:true
        },
        module_id(val){
            this.initTreeData(val);
        }
    },
    created() {
        this.initTreeData();
    },
    methods: {
        async initTreeData(source_id) {
            const res = await this.getModules(source_id);
            if (res.code === 0 && Array.isArray(res.content)) {
                if(this.noRoot){
                    this.treeData = res.content;
                }else{
                    this.treeData[0].child = res.content;
                }
                
                this.transTreeData(this.treeData);
                let obj = this.oneLevelData.find(item => item.ac_module_id === this.module_id);
                if (obj) {
                    this.module_name = obj.module_name;
                    this.$emit("input", obj.ac_module_id);
                    this.$emit("change", obj);
                } else {
                    this.module_name = "";
                    this.$emit("input", "");
                    this.$emit("change", {});
                }
            } else {
                this.module_name = "";
                this.$emit("input", "");
                this.$emit("change", {});
            }
        },
        transTreeData(arr) {
            if (Array.isArray(arr)) {
                arr.map(item => {
                    if (item.child.length > 0) {
                        this.oneLevelData.push(item);
                        this.transTreeData(item.child);
                    } else {
                        this.oneLevelData.push(item);
                    }
                });
            }
        },
        handleNodeClick(data) {
            window.console.log(data);
            this.currentNode = data;
            this.module_name = this.currentNode.module_name;
            this.$emit("input", this.currentNode.ac_module_id);
            this.$emit("change", this.currentNode);
            this.closeDialog();
        },
        getModules(source_id) {
            return this.$utils.gateway(this.$utils.api.getModuleTree, { source_id });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.module_name.indexOf(value) !== -1;
        },
        showDialog() {
            this.isShow = true;
            setTimeout(() => {
                this.$refs.tree && this.$refs.tree.filter(this.module_name);
            })
        },
        closeDialog() {
            this.isShow = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.ui-module-tree {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    &__dialog {
        width: 100%;
    }
    &__scrollbar {
        width: 100%;
        height: 100%;
        overflow: hidden;
        ::v-deep {
            .el-scrollbar__wrap {
                height: 200px;
            }
        }
    }
}
</style>
