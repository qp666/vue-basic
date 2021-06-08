<template>
    <div class="ep-logo">
        <div class="ep-logo-container" v-if="isExpand">EP-CORE</div>
        <div class="ep-logo-container" v-else>
            <img src="../../../../assets/logo.png">
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['isExpand'])
    },
}
</script>
<style lang="scss" scoped>
    .ep-logo{
        width:100%;
        height:60px;
        text-align: center;
        line-height:60px;
        font-size:20px;
        &-container{
            vertical-align: middle;
            img{
                vertical-align: middle;
                width:40px;
            }
        }
        
    }
</style>