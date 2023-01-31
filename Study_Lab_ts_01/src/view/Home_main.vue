<template>
    <div style="padding: 25px 50px">
        <h2 @click="OneWord">{{ oneWord }}</h2>
        <n-tabs type="line" animated>
            <n-tab-pane name="literature" tab="文学">
                <LiteratureNews />
            </n-tab-pane>
            <n-tab-pane name="english" tab="英语"> <EnglishNews /> </n-tab-pane>
            <n-tab-pane name="science" tab="科学"> <ScienceNews /> </n-tab-pane>
            <n-tab-pane name="news" tab="新闻"> <NewNews/> </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script setup lang="ts">
// import ScienceNews from '@/components/ScienceNews.vue'
// import LiteratureNews from '@/components/LiteratureNews.vue'
// import EnglishNews from '@/components/EnglishNews.vue'
// import NewNews from "@/components/NewNews.vue"
</script>

<script lang="ts">
import * as request from 'superagent'

export default {
    data() {
        return {
            oneWord: '',
        }
    },
    methods: {
        OneWord() {
            request
                .get('https://v1.hitokoto.cn/?c=i&c=d&c=h&c=k&encode=text')
                .then((res) => {
                    this.oneWord = '“' + res.text + '”'
                })
                .catch((err) => {
                    // err.message, err.response
                })
        },
    },
    created() {
        this.OneWord()
    },
}
</script>

<style scoped>
/* 这个选择器值得参考！！！ */
/* .card-tabs .n-tabs-nav--bar-type {
padding-left: 4px;
} */
</style>
