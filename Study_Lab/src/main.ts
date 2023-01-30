import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//UI组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import naive from 'naive-ui'

// 字体配置
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(naive)


app.mount('#app')
