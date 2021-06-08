<template>
    <div class="ep-slide-bar">
        <ep-logo />
        <ep-menus></ep-menus>
    </div>
</template>
<script>
import EpLogo from './Logo'
import EpMenus from './Menus'
export default {
    name:'app-side',
    components:{
        EpLogo,
        EpMenus
    }
}
</script>
<style lang="scss" scoped>
    .ep-slide-bar{
        height:100%;
        color:#bfcbd9;
    }
</style>