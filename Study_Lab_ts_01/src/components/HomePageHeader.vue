<template>
  <n-page-header subtitle="学习中心">
    <template #title> Study Lab </template>
    <template #avatar>
      <n-avatar src="./icon.png" />
    </template>
    <template #extra>
      <n-space>
        <n-button>相关</n-button>
        <n-dropdown :options="options" placement="bottom-start" @select="handleSelect">
          <n-button :bordered="false" style="padding: 0 4px"> ··· </n-button>
        </n-dropdown>
      </n-space>
    </template>
  </n-page-header>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useMessage } from "naive-ui";
  import { RouterLink, RouterView } from "vue-router";

  export default defineComponent({
    setup() {
      const message = useMessage();
      return {
        handleBack() {
          message.info("[onBack]");
        },
        options: [
          {
            label: "关于",
            key: "1"
          },
          {
            label: "这也是关于",
            key: "2"
          },
          {
            label: "这还是关于",
            key: "3"
          }
        ],
        handleSelect(key: string | number) {
          if (key) {
            window.location.href = "#/about";
          }
        }
      };
    }
  });
</script>
