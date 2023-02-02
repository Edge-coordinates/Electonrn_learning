<template>
  <div>
    <!-- <h1>Vue 实现 EPUB 文件在线预览</h1> -->
    <iframe
      id="epubLeft"
      :src="'./epubjs/index.html?bookPath=' + fileUrl"
      frameborder="0"
      width="100%"
      :height="theHeight">
    </iframe>
  </div>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="设置"
    size="huge"
    :bordered="false"
    :segmented="segmented">
    <h2>字体大小设置</h2>
    <n-space vertical>
      <n-slider v-model:value="hnum" :step="10" :max="2000" :min="200" />
      <n-input-number v-model:value="hnum" size="small" />
    </n-space>
    <template #footer>
      <h2>相关</h2>
      <ul>
        <li>按键支持：没有</li>
      </ul>
      <h3>碎碎念</h3>
      <ul>
        <li>这玩意用的第三方库，魔改版本，是本地库，不用担心</li>
        <li>因为Layout的问题，高度没法自适应窗口，或者说很麻烦，干脆整了个高度设置。</li>
        <li>
          退出阅读器目前只有点到别的路由，比如书库页或关于页，如果要做退出键得每个阅读器都写一个，麻烦，懒得整。
        </li>
      </ul>
    </template>
  </n-modal>
  <div id="reader_tools">
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-icon size="40" color="#EC5E42">
        <EllipsisHorizontalCircleSharp />
      </n-icon>
    </n-dropdown>
  </div>
</template>

<script lang="ts">
  // let fileUrl_left = 'https://www.hks-power.com.cn/uploadfiles/2020/09/20200909200802308.pdf'
  import { ref } from "vue";
  import { EllipsisHorizontalCircleSharp } from "@vicons/ionicons5";
  export default {
    props: {
      fileUrl: {
        type: String,
        default: "https://s3.amazonaws.com/epubjs/books/alice.epub"
      }
    },
    methods: {
      handleSelect(key: string | number) {
        if (String(key) == "setting_for_txv") {
          this.showModal = true;
        }
      }
    },
    components: {
      EllipsisHorizontalCircleSharp
    },
    computed:{
        theHeight() {
            return `${this.hnum}px`
        }
    },
    data() {
      return {
        hnum: 1000,
        bodyStyle: {
          width: "600px"
        },
        segmented: {
          content: "soft",
          footer: "soft"
        } as const,
        showModal: ref(false),
        options: [
          {
            label: "设置",
            key: "setting_for_txv"
          }
          //   {
          //     label: "目录",
          //     key: "txv_contents"
          //   }
        ]
      };
    }
  };
</script>

<style>
  #reader_tools {
    /* position: absolute; */
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 999;
  }
</style>
