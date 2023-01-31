<template>
    <div v-if="!islistok"><n-spin size="large" /></div>
    <div v-else>
        <n-list hoverable clickable>
            <n-list-item>
                <img
                    id="example-element"
                    align="left"
                    class="transition-all"
                    :src="aworde.pic"
                    style="width: 30%; padding-right: 10px"
                />
                <n-thing
                    title="sentence of the day"
                    content-style="margin-top: 10px;"
                >
                    <b>英文: {{ aworde.en }}</b
                    ><br />
                    <b>中文: {{ aworde.zh }}</b
                    ><br />
                    <audio controls :src="aworde.audio"></audio>
                </n-thing>
            </n-list-item>
        </n-list>
    </div>
</template>
<script lang="ts">
import * as cheerio from 'cheerio'
import * as request from 'superagent'
import type { JsonObject } from 'type-fest'
import { ref } from 'vue'
declare class X2JS {
    xml_str2json(str: string): JsonObject
}
let item_apis = [
    {
        name: 'sentence of the day',
        url: 'https://api.vvhan.com/api/en',
        type: 'json',
        reskey: '',
    },
]

let r_item_apis = [
    {
        name: '每日一文',
        url: 'https://meiriyiwen.com/random',
        type: 'html',
        getter: '#article_show',
        reskey: 'text',
    },
]

export default {
    data() {
        return {
            islistok: false,
            aworde: { zh: '', en: '', pic: '', audio: '' },
            list: [],
            list1: [],
            bodyStyle: {
                width: '70%',
            },
            segmented: {
                content: 'soft',
                footer: 'soft',
            } as const,
        }
    },
    created() {
        this.GetThings()
    },
    methods: {
        async GetThings() {
            this.islistok = false
            let lista = []
            let listb = []
            // API 下面可能有let 冲突
            let api_item = item_apis[0]
            await request.get(api_item.url).then((res) => {
                if (res.status != 200) {
                    this.aworde.zh = '请求出错'
                } else {
                    if (api_item.type == 'json') {
                        this.aworde.en = res.body.data.en
                        this.aworde.zh = res.body.data.zh
                        this.aworde.pic = res.body.data.pic
                        this.aworde.audio =
                            `https://texttospeech.responsivevoice.org/v1/text:synthesize?text=${this.aworde.en}&lang=en&engine=g1&name=&pitch=0.5&rate=0.5&volume=1&key=kvfbSITh&gender=female`
                    } else if (api_item.type == 'xml') {
                    }
                }
            })

            // //获取10个随机数据

            // let apinum = r_item_apis.length
            // for (var i = 0; i < 10; i++) {
            //     listb.push({})
            //     let dnum = Math.floor(Math.random() * apinum)
            //     let api_item = r_item_apis[dnum]
            //     // console.log(api_item)
            //     await request.get(api_item.url).then((res) => {
            //         if (res.status != 200) {
            //             listb[i].isshow = ref(-1)
            //             listb[i].title = '请求出错'
            //         } else {
            //             if (api_item.type == 'html') {
            //                 const $ = cheerio.load(res[api_item.reskey])
            //                 // console.log($('#article_show').html())
            //                 $('a').contents().unwrap().wrap('<b/>')
            //                 listb[i].isshow = ref(0)
            //                 listb[
            //                     i
            //                 ].pic = `https://api.vvhan.com/api/view?+${i}`
            //                 listb[i].title = $('#article_show h1').html()
            //                 listb[i].predata =
            //                     $('.article_text')
            //                         .html()
            //                         .replace(/<\/?.+?>/g, '')
            //                         .replace(/ /g, '')
            //                         .substring(0, 150) + '...'
            //                 listb[i].data = $('#article_show').html()
            //             } else if (api_item.type == 'json') {
            //             }
            //         }
            //     })
            // }
            // // console.log(listb)
            // this.list1 = listb
            this.islistok = true
        },
    },
}
</script>
<style scoped>
.scroll-view {
    /* width: 400px;
    height: 300px; */
    overflow-y: scroll;
    background-color: #68b687;
}

.list-item {
    padding: 40px 0;
}

.list-item:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.2);
}

.list-item:nth-child(2n + 2) {
    background-color: rgba(222, 221, 221, 0.2);
}
</style>
