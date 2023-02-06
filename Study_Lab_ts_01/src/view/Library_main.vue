<template>
  <n-layout-header position="absolute">
    <HomePageHeader />
  </n-layout-header>
  <n-message-provider>
    <HomePageHeader style="padding: 24px" />

    <div style="padding-left: 5%; padding-right: 5%">
      <h2>书库</h2>
      <h3>碎碎念</h3>
      <ul>
        <li>
          因为选用vite的原因，渲染进程支持node一直没有搞好（找了1天的文档），虽然用ipc可以做到，但是过于麻烦，就放弃了，现在数据库使用的Indexdb，做存储有点麻烦，首页就不写了。
        </li>
        <li>
          <s
            >额，开发模式PDF,EPUB的预览没有问题，要不你们用开发模式试试？？？生产模式大概是路径配置错误吧？我懒得调整了QAQ</s
          >，嗯，已经修好了。
        </li>
        <li>
          以下为书籍搜索接口，搜索完之后请自行复制下载链接到浏览器下载（秒传链接也请按照教程移步到系统浏览器使用）。
        </li>
        <!-- <li>
          书库功能暂时没有实现，下面的只展示大概的布局。
        </li> -->
      </ul>
      <!-- <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
        <n-grid-item>
          <n-card title="书" hoverable> 一本书 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="书" hoverable> 一本书 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="书" hoverable> 一本书 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="书" hoverable> 一本书 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="书" hoverable> 一本书 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="书" hoverable> 一本书 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="书" hoverable> 一本书 </n-card>
        </n-grid-item>
      </n-grid> -->
    </div>
    <div>
      <iframe
            src="https://search.yibook.org/"
            frameborder="0"
            width="100%"
            style="aspect-ratio: 4 / 3;"
        >
        </iframe>
    </div>
  </n-message-provider>
</template>

<script setup lang="ts">
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