<template>
    <el-select v-model="user_id" filterable :disabled="disabled" :clearable="clearable" :placeholder="placeholder" @change="handleChange" @clear="handleClear">
        <el-option v-for="item in userList" :key="item.employee_id" :label="item.full_name" :value="item.employee_id">
            <span class="left">{{item.full_name}}</span>
            <span class="right">{{item.mobile}}</span>
        </el-option>
    </el-select>
</template>
<script>
export default {
    name: 'ep-user-picker',
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
    },
    data() {
        return {
            user_id: '',
            userList: []
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.user_id = val;
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            const params = {
                ...this.search,
                page: 1,
                pagesize: 99999
            };
            this.dataLoading = true;
            this.$utils.gateway(this.$utils.api.getUserList, params).then(res => {
                this.dataLoading = false;
                if (!res) {
                    return;
                }
                if (res.code === 0 && res.content && Array.isArray(res.content.lists)) {
                    this.userList = res.content.lists;
                    if (this.value) {
                        const obj = this.userList.find(item => item.path_resource_id === this.value);
                        this.user_id = this.value;
                        this.$emit('input', this.value);
                        this.$emit('change', obj);
                    }
                }
            })
        },
        handleChange(val) {
            const obj = this.userList.find(item => item.employee_id === val);
            this.$emit('input', val);
            this.$emit('change', obj);
        },
        handleClear() {
            this.$emit('input', '');
            this.$emit('change', {});
        }
    }
}
</script>