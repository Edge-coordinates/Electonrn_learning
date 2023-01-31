<template>
    <div>
        <h1>Vue 实现 PDF 文件在线预览</h1>
        <iframe
            id="pdfLeft"
            :src="'/pdfjs/web/viewer.html?file=' + fileUrl_left"
            frameborder="0"
            width="100%"
            style="aspect-ratio: 3 / 4;"
        >
        </iframe>
    </div>
</template>

<script lang="ts">
// let fileUrl_left = 'https://www.hks-power.com.cn/uploadfiles/2020/09/20200909200802308.pdf'
export default {
  props: {
    fileUrl_left: {
      type: String,
      default: '/e.pdf'
    },
  }
}
</script>
