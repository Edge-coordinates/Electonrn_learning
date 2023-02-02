<template>
  <div style="padding-left: 5%; padding-right: 5%">
    <h2>RSS</h2>
    <h3>碎碎念</h3>
    <ul>
      <li>
        同样因为Vite的原因，没法使用基于核心node模块的数据库，所以不做之前文章存储功能，只能浏览今天文章
      </li>
      <li>删除接口也懒得做了</li>
    </ul>
    <n-input-group>
      <n-input placeholder="名称" v-model:value="newrss_title"  type="text"  />
      <n-input placeholder="链接" v-model:value="newrss_link"  type="text" />
      <n-button type="primary" @click="addrss()" ghost> 增加 </n-button>
    </n-input-group>
    <div v-if="!isok">加载中...</div>
    <n-grid v-else cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen"> 
        <n-grid-item v-for="i in Rss.keys()">
                <n-card :title="Rss[i].title" @click="GetThings(i)" hoverable> {{ Rss[i].title }} </n-card>
            </n-grid-item>
    </n-grid>
  </div>
  <n-modal
    v-model:show="islistok"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    :title="therss.title"
    size="huge"
    :bordered="false"
    :segmented="segmented">
    <div v-html="therss.data"></div>
  </n-modal>
</template>

<script lang="ts">
  import * as request from 'superagent'
  import localforage from "localforage";
  import type { JsonObject } from 'type-fest'
import { anyTypeAnnotation } from '@babel/types';
  const db = localforage;
  declare class X2JS {
      xml_str2json(str: string): JsonObject
  }

  let alldb:any


  export default {
    methods:{
        async GetThings(num: number) {
            // console.log("ddd")
            this.islistok = false
            // API 下面可能有let 冲突
            let therss = {status: 200, title:'', data:'', isshow:1}
            let api_item = alldb[num]
            await request.get(api_item.url).then((res) => {
                // console.log("ddd")
                if (res.status != 200) {
                    therss.status = -1
                    // console.log(therss)
                } else {
                    // console.log("ddd")
                    var xmlText = res.text
                    var x2js = new X2JS()
                    var jsonObj = x2js.xml_str2json(xmlText) as any
                    let arr = jsonObj.rss.channel.item
                    therss.title = api_item.title
                    for (var i=0; i < arr.length; i++){
                        therss.data += ('<h2>' +  arr[i].title + '<h2>' + arr[i].description + "<div>相关内容：" + arr[i].link + " - " + arr[i].pubDate + '</div><br><br><br>')
                    }
                    therss.isshow = 1
                    this.therss = therss
                    //输出结果
                    console.log(therss)
                }
            })
            this.islistok = true
        },
        addrss(){
            this.Rss.push({title: this.newrss_title, url: this.newrss_link})
            alldb = this.Rss
            db.setItem("rss", JSON.stringify(alldb));
        },
        async getDB(){
            // db.clear()
            alldb = await db.getItem('rss')
            // console.log(alldb)
            if(typeof(alldb) == 'string')alldb = JSON.parse(alldb);
            // console.log(alldb)
            this.Rss = alldb
            console.log(alldb)
            this.isok = 1
        }
    },
    created() {
        this.getDB()
    },
    data() {
        return {
            therss:{isshow:0, title:'', data:''},
            isok: 0,
            Rss: [],
            newrss_title: '',
            newrss_link: '',
            list1: [],
            bodyStyle: {
                width: '80%',
            },
            islistok: 0,
            segmented: {
                content: 'soft',
                footer: 'soft',
            } as const,
        }
    },
  }
</script>

<style>
img {
    max-width: 600px !important;
    height: auto !important;
}
</style>