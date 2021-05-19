/*
 * @Author: your name
 * @Date: 2021-05-18 11:17:57
 * @LastEditTime: 2021-05-19 11:59:15
 * @LastEditors: Please set LastEditors
 * @Description: Vuex
 * @FilePath: \bohe\src\store.ts
 */
import { createStore } from 'vuex'

import { testData, testPosts, ColumnProps } from './testData'

// 用户需要存在的信息
export interface UserProps {
  isLogin: boolean
  id?: string // 这两种类型可以不传，因为有isLogin的存在
  name?: string
  columnId?: number // 作者对应创建的专栏
}

// 一篇文章所需要的有的信息有
export interface PostProps {
  id: number // 唯一id
  title: string // 标题
  content: string // 内容
  image?: string // 图片
  createdAt: string // 创建时间
  columnId: number // 为了分页
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
    // user: { isLogin: false }
    user: { isLogin: true, name: 'viking', columnId: 1 }
  },
  mutations: {
    login(state) {
      // ?采用新对象替换掉老对象 ...state.user 对象展开运算符
      state.user = { ...state.user, isLogin: true, name: '张三' }
    },
    // 处理新建文章的逻辑
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  },
  // 当值发生变化才会重新开始计算
  // !相当于vue里面的计算属性
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter((c) => c.id > 2).length
    },
    // *根据id来寻找文章 返回一个函数
    getColumnById: (state) => (id: number) => {
      // ?find就是寻找匹配的项
      return state.columns.find((c) => c.id === id)
    },
    // *根据文章id来寻找下面的文章id
    getPostsByCid: (state) => (cid: number) => {
      // ?数组过滤器返回满足条件的值
      return state.posts.filter((post) => post.columnId == cid)
    }
  }
})
// console.log(store.state)

export default store
