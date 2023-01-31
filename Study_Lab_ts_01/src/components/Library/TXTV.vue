<template>
  <div id="reader_tools">
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-icon size="40" color="#EC5E42">
        <EllipsisHorizontalCircleSharp />
      </n-icon>
    </n-dropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useMessage } from "naive-ui";
  import { EllipsisHorizontalCircleSharp } from "@vicons/ionicons5";
  import storage from 'electron-localstorage';
  // import { db, test } from '@/utils/Store'
  // import { test } from '@/utils/Store'
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
    methods:{
      teststore() {
        // console.log(db.get('TXTV.regular'))
        

        let filepath = storage.getItem('main_db')
        console.log(filepath)
      }
    },
    created() {
      console.log("ddd")
      this.teststore()
    },
    setup() {
      const message = useMessage();
      const showDropdownRef = ref(false);
      return {
        options: [
          {
            label: "设置",
            key: "setting_for_txv"
          },
          {
            label: "目录",
            key: "txv_contents"
          }
          // {
          //   label: "亚特兰蒂斯巴哈马，拿骚",
          //   key: "atlantis nahamas, nassau"
          // },
          // {
          //   label: "比佛利山庄酒店，洛杉矶",
          //   key: "the beverly hills hotel, los angeles"
          // }
        ],
        showDropdown: showDropdownRef,
        handleSelect(key: string | number) {
          message.info(String(key));
        },
        handleClick() {
          showDropdownRef.value = !showDropdownRef.value;
        }
      };
    }
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
