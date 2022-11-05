let holder = document.querySelector(".for_file_drag");
novel_content = $("#novel_content");
let fs = require("fs");
let left = 0,
  right = 0;
let lines = [],
  line = "";
var regular = [
  "第[一二两三四五六七八九十○零百千0-9１２３４５６７８９０]{1,12}(章|节|節)",
];
var regExp = new RegExp(regular[0]);

let position = $(window).scrollTop();
let scrolltrigger = 10;

// 监听滚动滑动窗口
$(window).scroll(function () {
  let scroll = $(window).scrollTop();
  // console.log(`${scroll} : ${winheight}`);
  if (scroll > position) {
    console.log('scrollDown')
    slide_right(50);
  } else {
    // scrollUp
    // slide_left(50);
  }
  position = scroll;
});

// 拦截目录点击事件并重新渲染区间
$("#novle_menu a").click((e) => {
  console.log(e.target.id);
  // rendering_interval(e.target.id, 500);
});

function rendering_interval(l, num) {
  left = l;
  right = l;
  novel_content.empty();
  addrightlines(num); //回头决定区间，左闭右开就是r-l+1
}

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
        addrightlines(600);
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
      //添加一个p
      novel_content.prepend(`<p>${line}</p>`);
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
  // 生成目录列表
  let menu = document.querySelector(".novle_menu");
  for (line of lines) {
    if (regExp.test(line)) {
      let hh = document.createElement("a");
      hh.setAttribute("class", "mdui-list-item");
      hh.setAttribute("href", `#${right}`);
      hh.innerHTML = `${line}`;
      menu.appendChild(hh);
    }
    right++;
  }
  // 重置渲染计数器
  right = 0;
}
