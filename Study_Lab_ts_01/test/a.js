const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

const initData = {
    TXTV: {
      regular: ["第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節)"],
      regnum: 0,
      front_size: 17
    }
  };

// Set some defaults
// db.defaults({ posts: [], user: {} }).write();

// // Add a post
// db.get("posts").push({ id: 1, title: "lowdb is awesome" }).write();

// // Set a user using Lodash shorthand syntax
// db.set("user.name", "typicode").write();


// console.log();
// console.log(db.get("posts").value());
db.setState(initData).write()
// if (db.data) {
//   db.data = initData;
//   console.log(db.data.TXTV);
//   db.write();
// }
