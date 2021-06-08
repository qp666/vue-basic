<template>
    <div class="ui-pagination" v-if="pageObj.total && pageObj.total > 0" :style="'text-align:' + align">
        <el-pagination v-if="pageObj.showTotal" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageObj.page" :page-sizes="[10, 20, 50, 100]" :page-size="pageObj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total">
        </el-pagination>
        <el-pagination v-else background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageObj.page" :page-sizes="[10, 20, 50, 100]" :page-size="pageObj.pageSize" layout="sizes, prev, pager, next, jumper" :total="pageObj.total">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'ep-pagination',
    props: {
        pageObj: {
            required: true,
            type: Object,
            default() {
                return {
                    page: 1,
                    pageCount: [10, 20, 50, 100],
                    pageSize: 20,
                    showTotal: true
                }
            }
        },
        align:{
            type:String,
            default:'center',
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageObj.page = 1;
            this.pageObj.pageSize = val;
            this.emitChange(this.pageObj);
        },
        handleCurrentChange(val) {
            this.pageObj.page = val;
            this.emitChange(this.pageObj);
        },
        emitChange(obj) {
            this.$emit('handleChange', obj);
        }
    },
}
</script>
<style lang="scss">
    .ui-pagination{
        margin-top:10px;
    }
</style>