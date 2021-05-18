/*
 * @Author: your name
 * @Date: 2021-05-17 08:50:36
 * @LastEditTime: 2021-05-18 08:47:25
 * @LastEditors: Please set LastEditors
 * @Description: 导入main.ts
 * @FilePath: \bohe\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')
