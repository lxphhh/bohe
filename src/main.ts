/*
 * @Author: your name
 * @Date: 2021-05-17 08:50:36
 * @LastEditTime: 2021-05-17 16:34:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\main.ts
 */
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
