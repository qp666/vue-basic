<template>
    <div class="ui-justify" :class="required?'has-required':''">
        <div class="required-star">{{required?'*':''}}</div>
        <div class="label">
            <div v-for="(item,index) in labelArr" :key="index">{{item}}{{(hasColon && (index === labelArr.length - 1))?'：':''}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ep-label',
    props: {
        label: {
            type: String,
            default: ''
        },
        hasColon: {
            type: Boolean,
            default() {
                return false
            }
        },
        required: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
        return {
            labelArr: []
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.label) {
                for (let i = 0; i < this.label.length; i++) {
                    this.labelArr.push(this.label[i]);
                }
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.ui-justify {
    display: flex;
    align-items: center;
    width: 100%;
    float: right;
    // &.has-required{
    //     width:85%;
    // }

    .required-star {
        width: 20px;
        text-align:center;
        color: #f56c6c;
    }
    .label {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>