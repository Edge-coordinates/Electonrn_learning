<template>
    <n-layout position="absolute">
        <n-layout has-sider position="absolute" class="content">
            <HomeNavigator />
            <!-- <n-layout-header position="absolute"><HomePageHeader/></n-layout-header> -->
            <n-layout :native-scrollbar="false">
                <router-view></router-view>
            </n-layout>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HomeNavigator from '@/components/Library/LibraryNavigator.vue'
import HomePageHeader from '@/components/Library/LibraryPageHeader.vue'
</script>

<style scoped>
.n-layout-header {
    background-color: bisque;
    padding: 24px;
    opacity: 1;
    z-index: 999;
}
</style>
