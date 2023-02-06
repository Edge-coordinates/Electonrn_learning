<template>
  <div style="padding-left: 5%; padding-right: 5%">
    <h2>工具集</h2>

    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
      <n-grid-item>
        <router-link to="/library">
          <n-card title="春诵夏弦" hoverable> 是书库哦 </n-card>
        </router-link>
      </n-grid-item>
      <n-grid-item>
        <router-link to="/rss_main">
          <n-card title="RSS" hoverable> 可以添加RSS订阅的小工具 </n-card>
        </router-link>
      </n-grid-item>
    </n-grid>
  </div>
</template>
