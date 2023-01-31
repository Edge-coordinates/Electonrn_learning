import Low from "lowdb";
import FileSync from 'lowdb/adapters/FileSync';
import { app } from "electron";
import { join } from "path";
const storage = require('electron-localstorage')

const initData = {
  TXTV: {
    regular: ["第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節)"],
    regnum: 0,
    front_size: 17
  }
};
function initializationData() {
  const path = app.getPath("userData");
  const file = join(path, "/db.json");
  const adapter = new FileSync<any>(file);
  const db = new Low(adapter);
  
  storage.setItem('main_db', file)
  if(!db.getState()){
    db.setState(initData).write()
    // console.log('ddd')
  }
  
  return
}

export { initializationData };
