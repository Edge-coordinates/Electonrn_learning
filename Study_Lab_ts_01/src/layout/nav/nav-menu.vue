<template>
  <n-layout-sider
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger="bar"
    @collapse="collapsed = true"
    @expand="collapsed = false">
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions" />
  </n-layout-sider>
</template>

<script lang="ts">
  import { h, ref, defineComponent, Component } from "vue";
  import { NIcon } from "naive-ui";
  import type { MenuOption } from "naive-ui";
  import { Home, Apps, Browsers } from "@vicons/ionicons5";
  import { RouterLink, RouterView } from "vue-router";

  function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }

  const menuOptions: MenuOption[] = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: "home_main"
            }
          },
          { default: () => "主页" }
        ),
      key: "home-main",
      icon: renderIcon(Home)
    },
  ];

  export default defineComponent({
    setup() {
      return {
        collapsed: ref(true),
        menuOptions,
        renderMenuLabel(option: MenuOption) {
          if ("href" in option) {
            return h("a", { href: option.href, target: "_blank" }, option.label as string);
          }
          return option.label;
        }
      };
    }
  });
</script>
