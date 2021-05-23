/*
 * @Author: your name
 * @Date: 2021-05-17 16:26:07
 * @LastEditTime: 2021-05-22 23:54:56
 * @LastEditors: Please set LastEditors
 * @Description: 路由页面
   TODO:需要一个功能,路由守卫,当用户没有登录的时候不让用户登录我们的主页面
   ?采用多个meta当成路由元信息,来判断多种条件的路由信息
 * @FilePath: \bohe\src\router.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
import axios from 'axios'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import PostDetail from './views/PostDetail.vue'
import store from './store'

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
      component: Login,
      // *假如已经登录了 判断是否需要这个状态
      meta: { requiredAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      // *路由元信息
      meta: { requiredLogin: true }
    },
    {
      path: '/column/:id', // 动态路由拼id
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/signup', // 动态路由拼id
      name: 'signup',
      component: Signup,
      // *假如已经登录了
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/postdetail/:id', // id
      name: 'postdetail',
      component: PostDetail
    }
  ]
})
// ?全局前置守卫 按照创建顺序依次调用异步解析执行
// ?to去那里,from从哪里来,next
// *next() // 有点像koa的洋葱模型 一层层往下走 重新理顺登录流程
router.beforeEach((to, from, next) => {
  const { user, token } = store.state // !当前用户,token
  const { requiredLogin, redirectAlreadyLogin } = to.meta // !需要登录创建文章.需要登录
  // TODO: 用户没有登录 判断token
  if (!user.isLogin) {
    // TODO:没有登录 判断token
    if (token) {
      // !token存在
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      store
        .dispatch('fetchCurrentUser')
        .then(() => {
          if (redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        })
        .catch((error) => {
          // !失败清除Token
          console.log(error)
          store.commit('loginout') // 清除token
        })
    } else {
      // !不存在
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    // TODO: 用户登录了
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next() // 什么也不做
    }
  }
})

export default router

// router.beforeEach((to, from, next) => {
//   // console.log('to.meta', to.meta)
//   // !to.meta.requiredLogin有这个login,同时用户的登录信息没有默认跳转登录页面
//   if (to.meta.requiredLogin && !store.state.user.isLogin) {
//     // !没有默认跳转登录页面
//     next({ name: 'login' })
//     // !满足to.meta.requiredAlreadyLogin为真,且在vuex当中的登录信息存在
//   } else if (to.meta.requiredAlreadyLogin && store.state.user.isLogin) {
//     next('/') // 主页面
//   } else {
//     next()
//   }
// })
