/*
 * @Author: your name
 * @Date: 2021-05-26 21:07:11
 * @LastEditTime: 2021-05-27 19:10:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\hooks\useLoadMore.ts
 */
import { ref, ComputedRef, computed } from 'vue'
import { useStore } from 'vuex'

interface LoadParmas {
  currentPage: number // 当前页面
  pageSize: number // 页面
}
// 一直响应式变化的total必须使用计算属性,所有计算属性对应的值是ComputedRef
const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParmas = { currentPage: 2, pageSize: 5 } // 从第二也开始
) => {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  // !发送请求需要的两个参数 返回一个对象
  const requestParmas = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize // 传入就行
  }))

  // 加载更多发送请求了
  const loadMorePage = () => {
    store.dispatch(actionName, requestParmas.value).then(() => {
      currentPage.value++ // 成功就++
    })
  }

  const isLastPage = computed(() => {
    // !total是一个ref响应式对象 ceil 返回一个最小的正整数 1.1 -> 2 最后一页 小于
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
