import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from "vue-router";

import HomeView from "@/view/HomeView.vue";
import Home_main from "@/view/Home_main.vue";
import Home_Browser from "@/view/Home_Browser.vue";
import Home_Apps from "@/view/Apps.vue";

import LibraryView from "@/view/LibraryView.vue";
import Library_main from "@/view/Library_main.vue";
import Library_reader from "@/view/Library_reader.vue";
import Library_about from "@/components/Library/About.vue";

import rss_main from "@/view/rss_main.vue"

import AboutView from "@/view/AboutView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      { name: "home_main", path: "", component: Home_main },
      { name: "home_browser", path: "browser", component: Home_Browser },
      { name: "home_apps", path: "apps", component: Home_Apps },
      { name: "rss_main", path: "apps", component: rss_main },
      { name: "about", path:'about', component: AboutView}
    ]
  },
  {
    path: "/library",
    name: "library",
    component: LibraryView,
    children: [
      { name: "library_main", path: "", component: Library_main },
      { name: "library_reader", path: "reader", component: Library_reader },
      { name: "library_about", path: "about", component: Library_about }
    ]
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: AboutView
  // }
];
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

// router.afterEach((to, from) => {
//   // 设置过渡方向
//   if (to.meta.sort && from.meta.sort) {
//     (to.meta.sort as number) > (from.meta.sort as number)
//       ? (to.meta.transition = "totop")
//       : (to.meta.transition = "tobottom");
//   }
// });

export default router;
export { routes };
