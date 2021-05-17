/*
 * @Author: your name
 * @Date: 2021-05-17 08:50:36
 * @LastEditTime: 2021-05-17 23:36:36
 * @LastEditors: Please set LastEditors
 * @Description: 导入main.ts
 * @FilePath: \bohe\src\main.ts
 */
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column/:id', // 动态路由
      name: 'column',
      component: ColumnDetail
    }
  ]
})
const app = createApp(App)
app.use(router)
app.mount('#app')
