/*
 * @Author: your name
 * @Date: 2021-05-18 11:17:57
 * @LastEditTime: 2021-05-26 21:22:02
 * @LastEditors: Please set LastEditors
 * @Description: Vuex
 * @FilePath: \bohe\src\store.ts
 */
import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import { arrToObj, objToArr } from './helper'
// import { testPosts } from './testData'

// 用户需要存在的信息
export interface UserProps {
  isLogin: boolean // 是否登录自己加的
  _id?: string // 这两种类型可以不传，因为有isLogin的存在
  nickName?: string
  column?: number // 作者对应创建的专栏
  email?: string
  avatar?: ImageProps // 加上作者有自己的图片或者默认
  description?: string // 描述
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
  _id?: string // 唯一id
  title: string // 标题
  excerpt?: string // 摘要
  content?: string // 内容
  image?: ImageProps | string // 图片
  createdAt?: string // 创建时间
  column: string | number // 为了分页
  author?: string | UserProps //作者
}

// 重新定义图片的类型 图片可以不存在
export interface ImageProps {
  _id?: string // id
  url?: string // 图片url
  createdAt?: string // 创建时间
  fitUrl?: string // 是否使用占位图片
}
// 接口泛型,把ColumnProps和PostProps变成可索引的类型
interface ListProps<P> {
  [id: string]: P
}

export interface GlobalColumnsProps {
  data: ListProps<ColumnProps>
  loaded: boolean // 是否
  total: number // 分页
}
export interface GlobalPostsProps {
  data: ListProps<PostProps>
  loadedColumns: string[] // 数组
  loadedDetails: string[] // 数组
}
// 使用TS规定整个store的类型全局
export interface GlobalDataProps {
  token: string
  error: GlobalErrorProps // 错误
  loading: boolean // 是否处于加载的状态
  columns: GlobalColumnsProps // !Array 专栏  改变成hasMap对象
  posts: GlobalPostsProps // !Array 专栏
  user: UserProps // 用户
}
// 全局错误封装一下 对象类型
export interface GlobalErrorProps {
  status: boolean // 是否出错
  message?: string // 错误信息类型 如果为true就直接没有message
}
// 全局获得的响应格式 data不确定,但是默认是一个空对象
export interface ResponseType<T = {}> {
  code: number
  message: string
  data: T //泛型对象
}

// export interface rawDataType<T = {}> {
//   count: number
//   currentPage: number
//   list?: T
//   data?: T
// }
// *GET方法封装获取 三个参数,url mutationName,commit 有一个在vuex里面的Commit类型
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data // 返回一个Promise
}
// *POST方法封装获取 四个参数,url mutationName,commit 有一个在vuex里面的Commit类型 payload data数据
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  try {
    const { data } = await axios.post(url, payload)
    commit(mutationName, data)
    return data // !由于是async类型会返回一个promise
  } catch (err) {
    return Promise.reject(new Error('network issue'))
  }
}
// !支持选择的封装类型参数 extraData?:any 是否加载更多
const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: 'get' },
  extraData?: any
) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    try {
      commit(mutationName, data)
      return data // !由于是async类型会返回一个promise
    } catch (err) {
      return Promise.reject(new Error('network issue'))
    }
  }
}

// 支持传入一个泛型
const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    error: { status: false },
    loading: false,
    columns: { data: {}, loaded: false, total: 0 },
    posts: { data: {}, loadedColumns: [], loadedDetails: [] },
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
      // state.posts.push(newPost)
      state.posts.data[newPost.id] = newPost // ?直接对象赋值
    },
    // *获取所有的文章 ok
    fetchColumns(state, rawData) {
      // console.log(rawData)
      // const { data } = rawData
      // state.columns.data = arrToObj(data.list) // ?数组变成对象
      const { data } = state.columns
      const { list, count } = rawData.data
      state.columns = {
        data: { ...data, ...arrToObj(list) }, // 不断添加
        total: count,
        loaded: true
      }
    },
    // *获取对应的文章 ok
    fetchColumn(state, rawData) {
      // console.log(rawData)
      // 问题解决为什么是数组的原因,是因为前面规定了多篇文章是[{}]的形式
      const { data } = rawData
      state.columns.data[data._id] = data // ?key-value赋值
    },
    // *获取专栏对应的文章
    fetchPosts(state, { data: rawData, extraData: columnId }) {
      const { data } = rawData
      // !记得里面的操作是不断合并的过程,而不是替换的过程
      state.posts.data = { ...state.posts.data, ...arrToObj(data.list) } // 对象
      // ?已经请求过的就存起来
      state.posts.loadedColumns.push(columnId)
    },
    // *获取对应文字
    fetchPost(state, rawData) {
      state.posts.data[rawData.data._id] = rawData.data
    },
    // *更新文字
    updatePost(state, { data }) {
      // state.posts = state.posts.map((post) => {
      //   if (post._id === data._id) {
      //     return data // 更新
      //   } else {
      //     return post // 保持原来
      //   }
      // })
      state.posts.data[data._id] = data // ?拿到id就赋值
    },
    deletePost(state, rawData) {
      const { data } = rawData
      //!满足两者之间不相等的情况       相等的数据就给你删除了
      // state.posts = state.posts.filter((post) => post._id !== data._id)
      delete state.posts.data[data._id]
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
    },
    // *全局登出方法 拿个状态就行
    loginout(state) {
      state.token = '' //!1,设置token为空
      state.user = { isLogin: false } // !2,此时登录状态设置为false
      // !3.在本地缓存中删除token
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization'] // !4.删除默认的请求头
    }
  },

  // !其实action的本质就是一个Promise当然支持多层Promise嵌套来实现需求 解构context方法
  actions: {
    // *获取所有的文章 修改async await
    // TODO : 分页版本 多一个参数 params ={}
    fetchColumns({ state, commit }, params = {}) {
      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)
      const { currentPage = 1, pageSize = 6 } = params
      // ?1.向mutation来提交数据
      // if (!state.columns.loaded) {
      //   return asyncAndCommit('/columns', 'fetchColumns', commit)
      // }
      return asyncAndCommit(
        `/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
        'fetchColumns',
        commit
      )
    },
    // *展开运算就是直接把context解构出来 原来的写法在第一个上面
    fetchColumn({ commit }, cid) {
      // const { data } = await axios.get(`/columns/${cid}`)
      // commit('fetchColumn', data)
      // ?第二个参数就是从页面中传过来的数据
      return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ state, commit }, cid) {
      // const { data } = await axios.get(`/columns/${cid}/posts`)
      // commit('fetchPosts', data)
      // ?第二个参数就是从页面中传过来的数据 // 如果不包含里面就进行一次请求
      if (!state.posts.loadedColumns.includes(cid)) {
        return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
      }
    },
    // !对应文章
    fetchPost({ state, commit }, id) {
      const { data } = state.posts
      const certainPost = data[id]
      // !当前文章不存在,或者内容没有就再发一次ajax请求
      if (!certainPost || !certainPost.content) {
        return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: certainPost }) // !返回一个Promise来手动解决11-6的报错
      }
    },
    // !delete
    deletePost({ commit }, id) {
      return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, { method: 'delete' })
    },
    // 更新文字
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    },
    // 获取当前哟用户登录信息
    fetchCurrentUser({ commit }) {
      return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    // 登录
    login({ commit }, payload) {
      // !return返回出去 相当于一个promise
      return asyncAndCommit('/user/login', 'login', commit, { method: 'post', data: payload })
    },
    createPost({ commit }, payload) {
      // !return返回出去 相当于一个promise
      return asyncAndCommit('/posts', 'createPost', commit, { method: 'post', data: payload })
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
      // return state.columns.find((c) => c._id === id)
      return state.columns.data[id]
    },
    // *根据文章id来寻找下面的文章id
    getPostsByCid: (state) => (cid: string) => {
      // ?数组过滤器返回满足条件的值
      return objToArr(state.posts.data).filter((post) => post.column == cid)
    },
    // *根据文章id找文章
    getCurrentPost: (state) => (id: string) => {
      // return state.posts.find((post) => post._id === id)
      return state.posts.data[id]
    },
    // 获取所有文章
    getColumns: (state) => {
      return objToArr(state.columns.data) // !把当前的对象变成数组
    }
  }
})
// console.log(store.state)

export default store
