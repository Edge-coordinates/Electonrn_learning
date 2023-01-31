// import Low from "lowdb";
// import FileSync from 'lowdb/adapters/FileSync'
import storage from 'electron-localstorage';

let filepath = storage.getItem('main_db')

// const adapter = new FileSync<any>(filepath)
// const db = new Low(adapter)
const db = ''

function test(){
  console.log(filepath)
}

export { db, test }