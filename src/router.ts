/*
 * @Author: your name
 * @Date: 2021-05-17 16:26:07
 * @LastEditTime: 2021-05-18 08:56:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\router.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'

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
      path: '/column/:id', // 动态路由拼id
      name: 'column',
      component: ColumnDetail
    }
  ]
})

export default router
