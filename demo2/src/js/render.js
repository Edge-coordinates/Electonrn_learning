const Store = require("electron-store");
const store = new Store();
let holder = document.querySelector(".for_file_drag");
var inst = new mdui.Drawer("#drawer", { overlay: true });
novel_content = $("#novel_content");
let fs = require("fs");
let left = 0,
  right = 0;
let lines = [],
  line = "";
let novel_menu_l = [],
  novel_menu_r = [];
let regulars = store.get("regular"),
  regnum = store.get("regnum");
var regExp = new RegExp(regulars[regnum]);

let position = $(window).scrollTop();
let scrolltrigger = 10;
initregmenu();

function initregmenu() {
  (regulars = store.get("regular")), (regnum = store.get("regnum"));
  regExp = new RegExp(regulars[regnum]);
  for (i in regulars) {
    if (i == regnum)
      $("#reg_list").append(
        `<li class="mdui-list-item"><label class="mdui-radio reg_check_label" num="${i}"><input type="radio" name="reg_check" checked/><i class="mdui-radio-icon"></i>${regulars[i]}</label></li>`
      );
    else
      $("#reg_list").append(
        `<li class="mdui-list-item"><label class="mdui-radio reg_check_label" num="${i}"><input type="radio" name="reg_check"/><i class="mdui-radio-icon"></i>${regulars[i]}</label><i class="reg_list_delete mdui-list-item-icon mdui-icon material-icons mdui-float-right" num="${i}">delete</i></li>`
      );
  }
  $("#reg_list_div").append(`<div id="to_add_reg" class="only_line_input">
  <input id="reg_input_content" class="mdui-textfield mdui-textfield-input" type="text" placeholder="请输入正则表达式"/>
  <button id="reg_input_add" class="mdui-btn mdui-btn-icon mdui-color-pink mdui-ripple"><i class="mdui-icon material-icons">add</i></button>
  </div>`);
}

// 监听滚动滑动窗口
// $(window).scroll(function () {
//   let scroll = $(window).scrollTop();
//   // console.log(`${scroll} : ${winheight}`);
//   if (scroll > position) {
//     console.log('scrollDown')
//     slide_right(50);
//   } else {
//     // scrollUp
//     // slide_left(50);
//   }
//   position = scroll;
// });

// 拦截目录点击事件并重新渲染区间
$("#novle_menu a").click((e) => {
  console.log(e.target.id);
  // rendering_interval(e.target.id, 500);
});
$("#novel_content").attr("style", `font-size: ${store.get('front_size')}px;`);
$("#front_num_set").attr("value", store.get('front_size'));

holder.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let div = document.getElementById("hint_txt");
  div.remove();
  if (e.dataTransfer.files.length == 1) {
    const file = e.dataTransfer.files[0];
    console.log(file);
    console.log("文件路径：", "utf-8", file.path);
    fs.readFile(file.path, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        lines = data.toString().split(/\r?\n/);
        generate_directory_listing();
        render_lr(0);
      }
    });
  } else {
    for (const file of e.dataTransfer.files) {
      console.log(file);
      console.log("文件路径：", file.path);
    }
  }
});

holder.addEventListener("dragover", (e) => {
  e.preventDefault(); //取消默认
  e.stopPropagation(); //阻止冒泡
});

function addrightlines(num) {
  let end = Math.min(right + num, lines.length);
  for (; right < end; right++) {
    line = lines[right];
    // console.log(`${right}: ${line}`)
    if (regExp.test(line)) {
      //添加一个H5
      novel_content.append(`<h3 id=${right}>${line}</h3>`);
    } else {
      //添加一个p
      novel_content.append(`<p>${line}</p>`);
    }
  }
  return right + num > lines.length ? lines.length - right : num;
}

function addleftlines(num) {
  let end = Math.max(left - num, 0);
  for (left = left - 1; left >= end; left--) {
    line = lines[left];
    if (regExp.test(line)) {
      //添加一个H5
      novel_content.prepend(`<h3 id=${left}>${line}</h3>`);
    } else {
      //添加一个p      novel_content.prepend(`<p>${line}</p>`);
    }
  }
  return left - num < 0 ? left - 0 : num;
}

function slide_right(num) {
  //新建X个元素
  num = addrightlines(num);
  // 删除X个元素
  let i = 0;
  while (i++ < num) {
    // console.log(`${i} : ${novel_content.children(":first").text()}`);
    novel_content.children(":first").remove();
    left++;
  }
}

function slide_left(num) {
  //新建X个元素
  num = addleftlines(num);
  //如果右侧大于左侧400
  if (right > left + 800) {
    // 删除X个元素
    let i = 0;
    while (i++ < 200) {
      novel_content.children(":last").remove();
      right--;
    }
  }
}

function generate_directory_listing() {
  let count = 0;
  novel_menu_l[count] = 0;
  // 生成目录列表
  let menu = $("#novle_menu");
  menu.append(`<a num=${count} class="mdui-list-item chapter_num">前言</a>`);
  for (line of lines) {
    if (regExp.test(line)) {
      novel_menu_r[count++] = right - 1;
      novel_menu_l[count] = right;
      menu.append(
        `<a class="mdui-list-item chapter_num" num=${count}>${line}</a>`
      );
    }
    right++;
  }
  // 重置渲染计数器
  novel_menu_r[count] = right;
  right = 0;
}

function render_lr(num) {
  num = Number(num);
  let l = novel_menu_l[num],
    r = novel_menu_r[num];
  if (r - l > 5000) {
    novel_content.empty();
    novel_content.append(`<h2>章节表达式错误或章节过长</h2>
    <a href="javascript:location.reload();" class="mdui-btn mdui-btn-block mdui-color-indigo mdui-ripple">重载</a>`);
    return;
  }
  //删除
  novel_content.empty();
  $("#chapter_button").empty();
  novel_content.append(`<h3 id=${l}>${lines[l]}</h3>`);
  for (let i = l + 1; i <= r; ++i) {
    novel_content.append(`<p>${lines[i]}</p>`);
  }
  $("#chapter_button").append(`
  <button class="mdui-btn mdui-ripple chapter_num" num=${
    num - 1
  }>上一章</button>
  <button class="mdui-btn mdui-ripple toggle">章节列表</button>
  <button class="mdui-btn mdui-ripple chapter_num" num=${
    num + 1
  }>下一章</button>
  `);
  $(document).scrollTop(0);
}

$(document).on("click", ".toggle", () => {
  inst.toggle();
});

$(document).on("click", ".chapter_num", (e) => {
  let num = $(e.target).attr("num");
  // console.log(num)
  render_lr(num);
  inst.close();
});

$(document).on("click", "#reg_input_add", () => {
  regulars.push($("#reg_input_content").val());
  store.set("regular", regulars);
  $("#reg_list").empty();
  $("#to_add_reg").remove();
  initregmenu();
});

$(document).on("click", ".reg_check_label", (e) => {
  let num = $(e.currentTarget).attr("num");
  num = Number(num);
  store.set("regnum", num);
  $("#reg_list").empty();
  $("#to_add_reg").remove();
  initregmenu();
  generate_directory_listing();
  $("#novle_menu").empty();
  render_lr(0);
});

$(document).on("click", ".reg_list_delete", (e) => {
  let num = $(e.currentTarget).attr("num");
  num = Number(num);
  regulars.splice(num, 1);
  console.log(regulars);
  store.set("regular", regulars);
  $("#reg_list").empty();
  $("#to_add_reg").remove();
  initregmenu();
});

$("#front_num_set").on("input propertychange", () => {
  let num = $("#front_num_set").val();
  $("#novel_content").attr("style", `font-size: ${num}px;`);
  store.set("front_size", num);
  if (!$("#hint_txt")) {
    generate_directory_listing();
    $("#novle_menu").empty();
    render_lr(0);
  }
});
