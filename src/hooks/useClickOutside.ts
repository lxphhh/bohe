/*
 * @Author: your name
 * @Date: 2021-05-15 23:17:36
 * @Description: 自定义点击关闭下拉框
   TODO 这个函数要实现的功能点击外部的时候，关闭该下拉框，点击里面的时候不关闭
 * @FilePath: \bohe\src\hooks\useClickOutside.ts
 */
import { ref, onMounted, onUnmounted, Ref } from 'vue'

/**
 * @description: 点击关闭下拉框
 * @param {*} elementRef :Ref<null | HTMLElement>
 * @return {*}
 */
// TODO 拿到Dropdown的dom 元素并且进行判断判断是否包含该元素的dom节点用来判断是否关闭这个
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  // 确定传入的参数是什么
  // 还需要判断用户是否往外面点击
  const isClickOutside = ref(false) // 没有点到外面去

  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      // *e.target点击事件
      // *如果这个节点包含被点击的部分那么不关闭
      // *如果这个节点不包含就关闭
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false // open
      } else {
        isClickOutside.value = true // close
      }
    }
  }

  // TODO 这个函数要完成的任务是在mounted的时候添加一个点击事件，并且在unMounted的时候消除这个事件
  onMounted(() => {
    // 监听一个点击事件
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    // 记得删除
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside

// ?console.log(dropdowmRef.value) // DOM节点拿到了
// ?contains表示不包含点击的节点 e。target不一定是html节点 as HTMLElement
