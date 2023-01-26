<template>
    <el-scrollbar>
        <el-button style="width:100%;" @click="OnClick(0)"><el-icon><MoreFilled/></el-icon></el-button>
        <el-menu :default-openeds="['1']" default-activate="1-1">
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon><icon-menu /></el-icon>Navigator Two
                </template>
                <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="2-1">Option 1</el-menu-item>
                    <el-menu-item index="2-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="2-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="2-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon><setting /></el-icon>Navigator Three
                </template>
                <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="3-1">Option 1</el-menu-item>
                    <el-menu-item index="3-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="3-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="3-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
    import { Menu as IconMenu, Message, Setting, MoreFilled} from '@element-plus/icons-vue'
    let isCollapse:boolean = true
</script>

<script lang="ts">
    export default {
        methods: {
            OnClick(index: number) {
                if (index == 0){
                    isCollapse = !isCollapse
                }
            }
        }
    }
</script>
