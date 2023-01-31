<template>
    <div v-if="!islistok"><n-spin size="large" /></div>
    <div v-else>
        <n-list hoverable clickable>
            <n-list-item>
                <n-thing
                    :title="list[0].title"
                    content-style="margin-top: 10px;"
                    @click="showModal0 = true"
                >
                    <img
                        id="example-element"
                        align="left"
                        class="transition-all"
                        src="https://www.dmoe.cc/random.php?0"
                        style="width: 30%; padding-right: 10px"
                    />
                    <div>{{ list[0].predata }}</div>
                </n-thing>
            </n-list-item>
            <n-list-item>
                <n-thing
                    :title="list[1].title"
                    content-style="margin-top: 10px;"
                    @click="showModal1 = true"
                >
                    <img
                        id="example-element"
                        align="left"
                        class="transition-all"
                        src="/imgs/历史上的今天.png"
                        style="width: 100%"
                    />
                </n-thing>
            </n-list-item>
        </n-list>
        <n-modal
            v-model:show="showModal0"
            class="custom-card"
            preset="card"
            :style="bodyStyle"
            :title="list[0].title"
            size="huge"
            :bordered="false"
            :segmented="segmented"
        >
            <div v-html="list[0].data"></div>
        </n-modal>
        <n-modal
            v-model:show="showModal1"
            class="custom-card"
            preset="card"
            :style="bodyStyle"
            :title="list[1].title"
            size="huge"
            :bordered="false"
            :segmented="segmented"
        >
        <div v-html="list[1].data"></div>
        </n-modal>
    </div>
</template>

<script lang="ts">
import * as cheerio from 'cheerio'
import * as request from 'superagent'
import { ref } from 'vue'

let item_apis = [
    {
        name: '每天60秒读懂世界',
        url: 'https://api.vvhan.com/api/60s?type=json',
        type: 'json',
        datakey: 'data',
        datatype: 'array',
    },
    {
        name: '历史上的今天',
        url: 'https://api.vvhan.com/api/hotlist?type=history',
        type: 'json',
        datakey: 'data',
        dayatype: 'array',
        reskey: '',
    },
]

export default {
    data() {
        return {
            showModal0: ref(false),
            showModal1: ref(false),
            islistok: false,
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
        this.GetList()
    },
    methods: {
        async GetList() {
            let lista = [{ title: '', predata: '', data: '' }, {}]
            let api_item = item_apis[0]
            lista[0].title = api_item.name
            await request.get(api_item.url).then((res) => {
                if (res.status != 200) {
                    lista[0].predata = 'API离线'
                } else {
                    lista[0].predata =
                        res.body.data[0] + res.body.data[1] + res.body.data[2]
                    lista[0].data =
                        '<h2 align="center">每天60秒读懂世界</h2>' +
                        '<p align="center">' +
                        res.body.time.join('-') +
                        '</p>' +
                        '<div>· ' +
                        res.body.data.join('</div><br><div>· ') +
                        '</div>'
                }
            })
            api_item = item_apis[1]
            lista[1].title = api_item.name
            await request.get(api_item.url).then((res) => {
                if (res.status != 200) {
                    lista[1].predata = 'API离线'
                } else {
                    let arra = res.body.data
                    let aitem = {title: '', desc: '' }
                    let datahtml = '<h2 align="center">历史上的今天</h2>'
                    for (let i = 0; i < arra.length; i++) {
                        aitem = arra[i]
                        datahtml +=
                            `<h3 align="center">${aitem.title}</h3>` +
                            `<div>${aitem.desc}</div>`
                    }
                    lista[1].data = datahtml
                }
            })
            // console.log(lista)
            this.list = lista
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
