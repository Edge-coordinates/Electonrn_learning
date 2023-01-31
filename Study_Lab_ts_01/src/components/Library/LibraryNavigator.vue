<template>
    <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger="bar"
        @collapse="collapsed = true"
        @expand="collapsed = false"
    >
        <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
        />
    </n-layout-sider>
</template>

<script lang="ts">
import { h, ref, defineComponent, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { Library, Reader, InformationCircle, ChevronBackCircle } from '@vicons/ionicons5'
import { RouterLink, RouterView } from 'vue-router'

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'home_apps',
                    },
                },
                { default: () => '返回' }
            ),
        key: 'backback',
        icon: renderIcon(ChevronBackCircle),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'library_main',
                    },
                },
                { default: () => '书库' }
            ),
        key: 'home-main',
        icon: renderIcon(Library),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'library_reader',
                    },
                },
                { default: () => '阅读器' }
            ),
        key: 'browser',
        icon: renderIcon(Reader),
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'library_about',
                    },
                },
                { default: () => '关于' }
            ),
        key: 'tools0',
        icon: renderIcon(InformationCircle),
    },
]

export default defineComponent({
    setup() {
        return {
            collapsed: ref(true),
            menuOptions,
            renderMenuLabel(option: MenuOption) {
                if ('href' in option) {
                    return h(
                        'a',
                        { href: option.href, target: '_blank' },
                        option.label as string
                    )
                }
                return option.label
            },
        }
    },
})
</script>
