/*
 * @Author: your name
 * @Date: 2021-05-17 08:50:36
 * @LastEditTime: 2021-05-19 15:26:22
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
  console.log(config)

  // 对象展开符代表前面的参数都需要
  config.params = { ...config.params, icode: '36C1A30D1795DB99' }
  return config
})
// *axios的get请求
axios.get('/columns').then((response) => {
  console.log(response.data)
})
const app = createApp(App)
// 使用插件方法
app.use(router)
app.use(store)
app.mount('#app')
