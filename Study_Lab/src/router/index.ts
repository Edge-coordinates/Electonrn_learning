import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home_main from '@/views/Home_main.vue'
import Home_Browser from '@/views/Home_Browser.vue'
import Home_Apps from '@/views/Apps.vue'

import LibraryView from '@/views/LibraryView.vue'
import Library_main from '@/views/Library_main.vue'
import Library_reader from '@/views/Library_reader.vue'
import Library_about from '@/components/Library/About.vue'

import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {name: 'home_main', path: '', component: Home_main},
        {name: 'home_browser', path: 'browser', component: Home_Browser},
        {name: 'home_apps', path: 'apps', component: Home_Apps}
      ]
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
      children: [
        {name: 'library_main', path: '', component: Library_main},
        {name: 'library_reader', path: 'reader', component: Library_reader},
        {name: 'library_about', path: 'about', component: Library_about}
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    }
  ]
})

export default router
