<template>
    <el-select class="ui-route-picker" v-model="path_resource_id" filterable :disabled="disabled" :clearable="clearable" :placeholder="placeholder" @change="handleChange" @clear="handleClear">
        <el-option v-for="item in routeList" :key="item.path_resource_id" :label="item.route_path" :value="item.path_resource_id"> </el-option>
    </el-select>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ep-route-picker',
    props: {
        value: [String, Number],
        disabled: {
            type: Boolean,
            default() {
                return false
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        clearable: {
            type: Boolean,
            default() {
                return true
            }
        },
        module:[String,Number]
    },
    watch: {
        value(val) {
            if (val) {
                this.path_resource_id = val;
                this.initData(this.module);
            }
        },
        module(val){
            this.initData(val);
        }
    },
    computed: {
        ...mapGetters(['currentSystem'])
    },
    data() {
        return {
            path_resource_id: '',
            routeList: []
        }
    },
    created() {
        // this.currentSystem = this.currentSystem.source_id ? this.currentSystem : JSON.parse(window.sessionStorage.getItem("currentSystem"));
        this.initData(this.module);
    },
    methods: {
        async initData(ac_module_id) {
            const res = await this.getAllRoute(ac_module_id);
            if (res.code === 0 && res.content && Array.isArray(res.content.lists)) {
                this.routeList = res.content.lists;
                if (this.value) {
                    const obj = this.routeList.find(item => item.path_resource_id === this.value);
                    this.path_resource_id = this.value;
                    this.$emit('input', this.value);
                    this.$emit('change', obj);
                }
            }
        },
        getAllRoute(ac_module_id) {
            return this.$utils.gateway(this.$utils.api.getRouteList, { page: 1, pagesize: 999, source_id: this.currentSystem.source_id, resource_type_id: 10016,ac_module_id });
        },
        handleChange(val) {
            const obj = this.routeList.find(item => item.path_resource_id === val);
            this.$emit('input', val);
            this.$emit('change', obj);
        },
        handleClear(){
            this.$emit('input', '');
            this.$emit('change', {});
        }
    }
}
</script>