/*
 * @Author: your name
 * @Date: 2021-05-17 08:50:36
 * @LastEditTime: 2021-05-18 14:22:44
 * @LastEditors: Please set LastEditors
 * @Description: 导入main.ts
 * @FilePath: \bohe\src\main.ts
 */
import { createApp } from 'vue'

import router from './router'
import store from './store'

import App from './App.vue'

const app = createApp(App)
// 使用插件方法
app.use(router)
app.use(store)
app.mount('#app')
