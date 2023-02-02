<script lang="ts" setup>
  import { hiddenSidebarfn } from "@/utils/hiddenSidebar";
  interface methods {
    [propName: string]: Function;
  }
  const hiddenSidebar = () => hiddenSidebarfn();
  const openDevTool = (key: string) => window.ipc.send("contentMenu", key);
  const fullScreen = (key: string) => window.ipc.send("contentMenu", key);
  const metnods: methods = {
    hiddenSidebar,
    openDevTool,
    fullScreen
  };
  const handleClick = ({ key }: { key: string }) => {
    // metnods[key] && metnods[key](key)
    // if (key == 'openDevTool')  window.ipc.send("contentMenu", key);
    };
</script>
<template>
  <a-dropdown :trigger="['contextmenu']">
    <slot />
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-item key="openDevTool">待拓展功能</a-menu-item>
        <a-menu-item key="hiddenSidebar">带拓展功能</a-menu-item>
        <a-menu-item key="fullScreen">带拓展功能</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
