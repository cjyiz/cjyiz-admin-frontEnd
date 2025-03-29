import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setupStore } from './store'
// 暗黑主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 暗黑模式自定义变量
import '@/styles/dark/css-vars.css'
import '@/styles/index.scss'
// import 'uno.css'

// 全局引入 animate.css
// import 'animate.css'
const app = createApp(App)
setupStore(app)

app.use(router)

app.mount('#app')
