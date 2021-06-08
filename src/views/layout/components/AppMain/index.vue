<template>
    <div class="view-content">
        <transition name="slide-left">
            <keep-alive :include="cachePages">
                <router-view />
            </keep-alive>
        </transition>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'app-main',
    computed: {
        ...mapState(['cachePages'])
    }
}
</script>
<style>
.slide-left-enter-active {
    transform: translateX(0);
    transition: all .5s;
}
.slide-left-enter, .slide-left-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(100%)
}

.view-content {
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
    flex:1;
}
</style>