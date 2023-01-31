<template>
  <div id="reader_tools">
    <n-icon size="40" color="#EC5E42">
      <EllipsisHorizontalCircleSharp />
    </n-icon>
  </div>
</template>

<script lang="ts">
  import { EllipsisHorizontalCircleSharp } from "@vicons/ionicons5";
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      fileUrl: {
        type: String,
        default: ""
      }
    },
    components: {
      EllipsisHorizontalCircleSharp
    },
  });
</script>

<style>
  #reader_tools {
    /* position: absolute; */
    position: fixed;
    right: 5%;
    bottom: 5%;
  }
</style>
