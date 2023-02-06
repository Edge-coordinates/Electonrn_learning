<template>
    <HomePageHeader class="about-header" style="padding: 24px" />
    <div style="padding-left: 5%; padding-right: 5%">
        <h2>关于-春诵夏弦</h2>
        <p>
            这是一个电脑阅读器~可以根据用户配置的正则表达式进行小说的自动分章等操作，同时支持pdf,epub阅读
        </p>
    </div>
</template>


<script setup lang="ts">
import HomePageHeader from '@/components/Library/LibraryPageHeader.vue'
</script>

<style scoped>
.about-header {
    background-color: bisque;
    padding: 24px;
    opacity: 1;
    z-index: 999;
}
</style>