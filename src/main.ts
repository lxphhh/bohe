/*
 * @Author: your name
 * @Date: 2021-05-17 08:50:36
 * @LastEditTime: 2021-05-19 16:35:55
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
// // *axios的get请求
// axios.get('/columns').then((response) => {
//   console.log(response.data)
// })
const app = createApp(App)
// 使用插件方法
app.use(router)
app.use(store)
app.mount('#app')
