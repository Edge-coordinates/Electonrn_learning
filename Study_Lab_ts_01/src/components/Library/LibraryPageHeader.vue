<template>
    <n-page-header subtitle="是阅读器呀">
        <template #title>
            春诵夏弦
        </template>
        <template #avatar>
            <n-avatar
                src="./icon.png"
            />
        </template>
    </n-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
    setup() {
        const message = useMessage()
        return {
        }
    },
})
</script>
