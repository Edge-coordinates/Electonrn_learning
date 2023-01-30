<template>
    <n-switch>
        <template #checked> 自然赠予你，树冠 微风 肩头的暴雨 </template>
        <template #unchecked> 片刻后生成，平衡 忠诚 不息的身体 </template>
    </n-switch>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useDialog } from 'naive-ui'

export default defineComponent({
    setup() {
        const message = useMessage()
        const dialog = useDialog()

        return {
            handleButtonClick(to:any) {
                dialog.success({
                    title: '关闭',
                    content: '你确定？',
                    positiveText: '确定',
                    negativeText: '不确定',
                    maskClosable: false,
                    onPositiveClick: () => {
                        window.location.href=to.fullPath
                    },
                    onMaskClick: () => {
                        message.success('不能关闭')
                    },
                    onEsc: () => {
                        message.success('通过 esc 关闭')
                    },
                })
            },
        }
    },
    beforeRouteLeave(to, from, next) {
        console.log(to)
        this.handleButtonClick(to)
    },
})
</script>
