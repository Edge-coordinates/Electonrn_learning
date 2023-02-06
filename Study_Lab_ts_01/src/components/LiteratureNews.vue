<template>
    <div v-if="!islistok"><n-spin size="large" /></div>
    <div v-else>
        <n-list hoverable clickable>
            <n-list-item>
                <n-thing
                    title="每日的诗"
                    content-style="margin-top: 10px;"
                    @click="gushi.isshow = true"
                >
                    <div v-html="gushi.predata"></div>
                </n-thing>
            </n-list-item>
            <n-list-item v-for="item in list1">
                <n-thing
                    :title="item.title"
                    content-style="margin-top: 10px;"
                    @click="item.isshow = true"
                >
                    <img
                        id="example-element"
                        align="left"
                        class="transition-all"
                        :src="item.pic"
                        style="width: 30%; padding-right: 10px"
                    />
                    <div>{{ item.predata }}</div>
                </n-thing>
            </n-list-item>
        </n-list>
        <n-modal
            v-for="item in list1"
            v-model:show="item.isshow"
            class="custom-card"
            preset="card"
            :style="bodyStyle"
            :title="item.title"
            size="huge"
            :bordered="false"
            :segmented="segmented"
        >
            <div v-html="item.data"></div>
        </n-modal>
        <n-modal
            v-model:show="gushi.isshow"
            class="custom-card"
            preset="card"
            :style="bodyStyle"
            :title="gushi.title"
            size="huge"
            :bordered="false"
            :segmented="segmented"
        >
            <div v-html="gushi.data"></div>
        </n-modal>
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
        name: '每日古诗',
        url: 'https://feedx.ics.ink/rss/shiwen.xml',
        type: 'xml',
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
            gushi:{isshow:ref(), data:'', title:'每日古诗', predata:''},
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
                    this.gushi.isshow = ref(-1)
                    this.gushi.title = '请求出错'
                } else {
                    if (api_item.type == 'xml') {
                        var xmlText = res.text
                        var x2js = new X2JS()
                        var jsonObj = x2js.xml_str2json(xmlText) as any
                        let arr = jsonObj.rss.channel.item
                        if(arr.length == 1){
                            this.gushi.data = arr[0].description
                        }else{
                            this.gushi.data = arr[0].description + '<br>' + arr[1].description
                        }
                        this.gushi.data = this.gushi.data.replace(/gushiwen.org/g, 'gushiwen.cn')
                        this.gushi.predata = this.gushi.data.substring(0, 150) + '...'
                        //输出结果
                        // console.log(arr)
                    } else if (api_item.type == 'json') {
                    }
                }
            })


            //获取10个随机数据

            let apinum = r_item_apis.length
            for (var i = 0; i < 10; i++) {
                listb.push({})
                let dnum = Math.floor(Math.random() * apinum)
                let api_item = r_item_apis[dnum]
                // console.log(api_item)
                await request.get(api_item.url).then((res) => {
                    if (res.status != 200) {
                        listb[i].isshow = ref(-1)
                        listb[i].title = '请求出错'
                    } else {
                        if (api_item.type == 'html') {
                            const $ = cheerio.load(res[api_item.reskey])
                            // console.log($('#article_show').html())
                            $('a').contents().unwrap().wrap('<b/>')
                            listb[i].isshow = ref(0)
                            listb[
                                i
                            ].pic = `https://api.vvhan.com/api/view?+${i}`
                            listb[i].title = $('#article_show h1').html()
                            listb[i].predata =
                                $('.article_text')
                                    .html()
                                    .replace(/<\/?.+?>/g, '')
                                    .replace(/ /g, '')
                                    .substring(0, 150) + '...'
                            listb[i].data = $('#article_show').html()
                        } else if (api_item.type == 'json') {
                        }
                    }
                })
            }
            // console.log(listb)
            this.list1 = listb
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
