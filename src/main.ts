/*
 * @Author: your name
 * @Date: 2021-05-17 08:50:36
 * @LastEditTime: 2021-05-19 23:57:07
 * @LastEditors: Please set LastEditors
 * @Description: 导入main.ts
 * @FilePath: \bohe\src\main.ts
 */
import { createApp } from 'vue'

import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'

// *默认带上的参数
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// *axios拦截器规则
axios.interceptors.request.use((config) => {
  // 1 loading拦截器
  store.commit('setLoading', true)
  // 对象展开符代表前面的参数都需要
  // *get 请求，添加到 url 中
  config.params = { ...config.params, icode: '36C1A30D1795DB99' }
  // 其他请求，添加到 body 中
  // *如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '36C1A30D1795DB99')
  } else {
    // *普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '36C1A30D1795DB99' }
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use((config) => {
  store.commit('setLoading', false)
  return config
})
// 使用插件方法
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

// // *axios的get请求
// axios.get('/columns').then((response) => {
//   console.log(response.data)
// })
// async await 更加完美的异步请求方法,可以在async当中书写await方法并且,await方法必须等promise结束以后完成
// async function hello() {
//   const greeting = await Promise.resolve('wwwww')
//   return greeting
// }
// hello().then((resp) => console.log(resp))
