<template>
    <div class="ui-project-item">
        <div class="ui-project-item__header">
            <div class="ui-project-item__header-left"><span v-if="required">*</span>{{label}}</div>
            <div class="ui-project-item__header-right" v-if="btnObj.showMe">
                <el-button size="mini" type="primary" @click="handleClick">{{btnObj.name}}</el-button>
            </div>
        </div>
        <div class="ui-project-item__content" :class="hasError?'ui-project-item__error':''">
            <slot></slot>
        </div>
        <div v-if="hasError" class="red font-size12">{{errorMsg}}</div>
    </div>
</template>
<script>
export default {
    name: 'table-divide',
    props: {
        label: {
            type: String,
            default: ''
        },
        btnObj: {
            type: Object,
            default() {
                return {
                    showMe: false,
                    name: ''
                }
            }
        },
        required:{
            type:Boolean,
            default(){
                return false
            }
        },
        hasError:{
            type:Boolean,
            default(){
                return false
            }
        },
        errorMsg:{
            type:String,
            default:''
        }
    },
    data() {
        return {}
    },
    methods: {
        handleClick() {
            this.$emit('handleClick')
        }
    },
}
</script>
<style lang="scss" scoped>
    .ui-project-item{
        margin-bottom: 20px;
        &__header{
            width:100%;
            height:36px;
            line-height:36px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            background-color:#f2f2f2;
            padding:5px 10px 10px 10px;
            &-left{
                span{
                    color:#F56C6C;
                }
            }
        }
        &__content{
            padding:5px 10px 10px 10px;
            ::v-deep{
                .el-checkbox{
                    line-height: 30px;
                }
            }
        }
        &__error{
            border:1px solid #F56C6C;
        }
    }
</style>