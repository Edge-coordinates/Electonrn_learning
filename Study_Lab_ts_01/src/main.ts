// import './assets/js/xml2json.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router"
import { initData } from './utils/initData'

//UI组件
import naive from 'naive-ui'

// 字体配置
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(router)
app.use(naive)
initData()

app.mount('#app')
