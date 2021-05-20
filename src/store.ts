/*
 * @Author: your name
 * @Date: 2021-05-18 11:17:57
 * @LastEditTime: 2021-05-20 21:53:06
 * @LastEditors: Please set LastEditors
 * @Description: Vuex
 * @FilePath: \bohe\src\store.ts
 */
import { createStore, Commit } from 'vuex'
import axios from 'axios'
// import { testPosts } from './testData'

// 用户需要存在的信息
export interface UserProps {
  isLogin: boolean // 是否登录
  id?: string // 这两种类型可以不传，因为有isLogin的存在
  name?: string
  columnId?: number // 作者对应创建的专栏
}

// 专栏信息接口定义
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

// 一篇文章所需要的有的信息有
export interface PostProps {
  _id: string // 唯一id
  title: string // 标题
  excerpt?: string // 摘要
  content?: string // 内容
  image?: ImageProps // 图片
  createdAt: string // 创建时间
  column: string // 为了分页
}

// 重新定义图片的类型
export interface ImageProps {
  _id?: string // id
  url?: string // 图片url
  createdAt?: string // 创建时间
}

// 使用TS规定整个store的类型全局
export interface GlobalDataProps {
  token: string
  loading: boolean // 是否处于加载的状态
  columns: ColumnProps[] // Array 专栏
  posts: PostProps[] // Array 专栏
  user: UserProps // 用户
}

// *方法封装获取 三个参数,url mutationName,commit 有一个在vuex里面的Commit类型
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
// *方法封装获取 四个参数,url mutationName,commit 有一个在vuex里面的Commit类型 payload data数据
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data // !由于是async类型会返回一个promise
}

// 支持传入一个泛型
const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    loading: false,
    columns: [],
    posts: [],
    // user: { isLogin: false }
    user: { isLogin: false, name: 'viking', columnId: 1 }
  },
  // !因为mutations不支持异步的方法,因为异步方法会破坏vuex当中的单向数据流
  mutations: {
    // login(state) {
    //   // ?采用新对象替换掉老对象 ...state.user 对象展开运算符
    //   state.user = { ...state.user, isLogin: true, name: '张三' }
    // },
    login(state, rawData) {
      state.token = rawData.data.token
    },
    // *处理新建文章的逻辑
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    // *获取所有的文章
    fetchColumns(state, rawData) {
      const { data } = rawData
      state.columns = data.list
    },
    // *获取对应的文章
    fetchColumn(state, rawData) {
      // console.log(rawData)
      // 问题解决为什么是数组的原因,是因为前面规定了多篇文章是[{}]的形式
      const { data } = rawData
      state.columns = [data] // *里面是一个数组
    },
    // *获取专栏对应的文章
    fetchPosts(state, rawData) {
      const { data } = rawData
      state.posts = data.list // 对象
    },
    // 全局加载组件
    setLoading(state, status) {
      state.loading = status //
    }
  },
  actions: {
    // *获取所有的文章 修改async await
    fetchColumns({ commit }) {
      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)
      // ?1.向mutation来提交数据
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    // *展开运算就是直接把context解构出来 原来的写法在第一个上面
    fetchColumn({ commit }, cid) {
      // const { data } = await axios.get(`/columns/${cid}`)
      // commit('fetchColumn', data)
      // ?第二个参数就是从页面中传过来的数据
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      // const { data } = await axios.get(`/columns/${cid}/posts`)
      // commit('fetchPosts', data)
      // ?第二个参数就是从页面中传过来的数据
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    // 登录
    login({ commit }, payload) {
      // return返回出去
      return postAndCommit('/user/login', 'login', commit, payload)
    }
  },
  // 当值发生变化才会重新开始计算
  // !相当于vue里面的计算属性
  getters: {
    // biggerColumnLen(state) {
    //   return state.columns.filter((c) => c._id > 2).length
    // },
    // *根据id来寻找文章 返回一个函数 返回一个箭头函数
    getColumnById: (state) => (id: string) => {
      // ?find就是寻找匹配的项
      return state.columns.find((c) => c._id === id)
    },
    // *根据文章id来寻找下面的文章id
    getPostsByCid: (state) => (cid: string) => {
      // ?数组过滤器返回满足条件的值
      return state.posts.filter((post) => post.column == cid)
    }
  }
})
// console.log(store.state)

export default store
