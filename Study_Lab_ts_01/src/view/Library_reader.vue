<template>
  <n-upload v-if="!isbookok" :show-file-list="false" :on-before-upload="openTheBook">
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
  <div v-else>
    <PDFV v-if="fileend == 'pdf'" :fileUrl_left="filepath" />
    <TXTV v-else-if="fileend == 'txt'"/>
    <div v-else><h2>此文件类型暂不支持！</h2></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { useMessage, useDialog } from "naive-ui";
  import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
  import PDFV from "@/components/Library/PDFV.vue";
  import TXTV from "@/components/Library/TXTV.vue"
  export default defineComponent({
    data() {
      return {
        isbookok: false,
        canopen: true,
        filepath: "",
        fileend: ""
      };
    },
    methods: {
      async prebook() {
        this.fileend = this.filepath.split(".").pop().toLowerCase();
        this.isbookok = true;
      },
      openTheBook(file) {
        this.filepath = file.file.file.path;
        // console.log(this.filepath)
        this.prebook();
        return false;
      }
    },
    components: {
      ArchiveIcon
    },
    beforeRouteLeave(to, from) {
      const answer = window.confirm("直接离开书籍进度可能会丢失哦~");
      if (!answer) return false;
    }
    // beforeRouteLeave(to, from, next) {
    //     if(!this.handleButtonClick(to)) console.log("ddd")
    // },
  });
</script>

<style>
  .n-layout-header {
    display: none;
  }
  .n-page-header-wrapper {
    display: none;
  }
</style>
