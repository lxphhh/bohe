/*
 * @Author: your name
 * @Date: 2021-05-18 11:17:57
 * @LastEditTime: 2021-05-18 14:44:36
 * @LastEditors: Please set LastEditors
 * @Description: Vuex
 * @FilePath: \bohe\src\store.ts
 */
import { createStore } from 'vuex'

import { testData, testPosts, ColumnProps, PostProps } from './testData'

// 用户需要存在的信息
export interface UserProps {
  isLogin: boolean
  id?: string // 这两种类型可以不传，因为有isLogin的存在
  name?: string
}

// 使用TS规定整个store的类型全局
export interface GlobalDataProps {
  columns: ColumnProps[] // Array
  posts: PostProps[] // Array
  user: UserProps
}
// 支持传入一个泛型
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login(state) {
      // 采用新对象替换掉老对象 ...state.user 对象展开运算符
      state.user = { ...state.user, isLogin: true, name: '张三' }
    }
  }
})
console.log(store.state)

export default store
