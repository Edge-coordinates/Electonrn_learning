import localforage from "localforage"
import { resultDark } from "naive-ui";
const db = localforage

const preData = {
  TXTV: {
    regular: ["第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節)"],
    regnum: 0,
    front_size: 17
  },
  rss: [
    {
      title: "南方周末",
      url: "https://feedx.ics.ink/rss/infzm.xml"
    }
  ]
};

async function initData(){
  let len = await db.length()
  console.log(`len=${len}`);
  if(len == 0){
    console.log('initData');
    for (const [key, value] of Object.entries(preData)) {
      await db.setItem(key, value)
    }
  }
  // console.log(await db.keys())
}

export { initData }