<template>
    <div>
        <h1>Vue 实现 PDF 文件在线预览</h1>
        <iframe
            id="pdfLeft"
            :src="'/pdfjs/web/viewer.html?file=' + fileUrl_left"
            frameborder="0"
            height="560"
            width="100%"
        >
        </iframe>
    </div>
</template>

<script setup lang="ts">
// let fileUrl_left = 'https://www.hks-power.com.cn/uploadfiles/2020/09/20200909200802308.pdf'
let fileUrl_left = '/e.pdf'
// import PDFV from '@/components/PDFV.vue'
</script>
