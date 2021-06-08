<template>
    <keep-alive :include="cachePages">
        <router-view></router-view>
    </keep-alive>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'pageView',
    computed: {
        ...mapState(['cachePages'])
    }
}
</script>
