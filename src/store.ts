/*
 * @Author: your name
 * @Date: 2021-05-18 11:17:57
 * @LastEditTime: 2021-05-21 10:54:48
 * @LastEditors: Please set LastEditors
 * @Description: Vuex
 * @FilePath: \bohe\src\store.ts
 */
import { createStore, Commit } from 'vuex'
import axios from 'axios'
// import { testPosts } from './testData'

// 用户需要存在的信息
export interface UserProps {
  isLogin: boolean // 是否登录自己加的
  _id?: string // 这两种类型可以不传，因为有isLogin的存在
  nickName?: string
  column?: number // 作者对应创建的专栏
  email?: string
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

// 重新定义图片的类型 图片可以不存在
export interface ImageProps {
  _id?: string // id
  url?: string // 图片url
  createdAt?: string // 创建时间
}

// 使用TS规定整个store的类型全局
export interface GlobalDataProps {
  token: string
  error: GlobalErrorProps // 错误
  loading: boolean // 是否处于加载的状态
  columns: ColumnProps[] // Array 专栏
  posts: PostProps[] // Array 专栏
  user: UserProps // 用户
}
// 全局错误封装一下 对象类型
export interface GlobalErrorProps {
  status: boolean // 是否出错
  message?: string // 错误信息类型 如果为true就直接没有message
}

// *GET方法封装获取 三个参数,url mutationName,commit 有一个在vuex里面的Commit类型
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
// *POST方法封装获取 四个参数,url mutationName,commit 有一个在vuex里面的Commit类型 payload data数据
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data // !由于是async类型会返回一个promise
}

// 支持传入一个泛型
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    columns: [],
    posts: [],
    // user: { isLogin: false }
    user: { isLogin: false }
  },
  // !因为mutations不支持异步的方法,因为异步方法会破坏vuex当中的单向数据流
  // !由action提交一个方法到mutations里面去处理最后的业务逻辑
  mutations: {
    // *登录JWT验证 ok
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      // TODO:1.初始化localStorage=> APP.vue =>
      // TODO:2.当用户未登录的时候且token可以在localStorage里面的时候设置头(代表以前已经登录过)
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    // *处理新建文章的逻辑
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    // *获取所有的文章 ok
    fetchColumns(state, rawData) {
      const { data } = rawData
      state.columns = data.list
    },
    // *获取对应的文章 ok
    fetchColumn(state, rawData) {
      // console.log(rawData)
      // 问题解决为什么是数组的原因,是因为前面规定了多篇文章是[{}]的形式
      const { data } = rawData
      state.columns = [data] // *里面是一个数组 由columns决定的
    },
    // *获取专栏对应的文章
    fetchPosts(state, rawData) {
      const { data } = rawData
      state.posts = data.list // 对象
    },
    // *获取当前登录用户
    fetchCurrentUser(state, rawData) {
      // console.log(rawData)
      state.user = { isLogin: true, ...rawData.data } // !展开运算符可以添加对象信息
    },
    // *全局加载组件 =>axios全局拦截器
    setLoading(state, status) {
      state.loading = status //
    },
    // *全局错误加载 =>axios全局拦截器
    setError(state, err: GlobalErrorProps) {
      state.error = err
    }
  },

  // !其实action的本质就是一个Promise当然支持多层Promise嵌套来实现需求 解构context方法
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
    // 获取当前哟用户登录信息
    fetchCurrentUser({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    // 登录
    login({ commit }, payload) {
      // !return返回出去 相当于一个promise
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    // !组合登录,可以登录并且从登录中获取当前用户
    loginAndFetch({ dispatch }, loginData) {
      // console.log(dispatch)
      // TODO:1.登录 2.获取当前登录用户
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
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
