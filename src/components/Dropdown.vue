<!--
 * @Author: your name
 * @Date: 2021-05-15 19:48:47
  //TODO 开发需求分析：我们需要实现一个下拉的按钮，并且我们要实现可以点击的功能，点击下拉，登录退出登录
 * @FilePath: \bohe\src\components\Dropdown.vue
-->
<template>
  <div class="dropdown" ref="dropdowmRef">
    <!-- 自定义标签样式dropdown-toggle -->
    <!-- 这里面加一个prenvent可以阻止a标签的默认跳转行为 -->
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block', textAlign: 'center' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    // 是一个对象类型
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    // ?在setup拿到dom节点的方法ref
    // ?初始值是null因为当vue还没有挂载的时候 还是不是一个 dom节点 为 null 挂载之后有 HTMLElement
    const dropdowmRef = ref<null | HTMLElement>(null)
    const isOpen = ref(false) // 默认关闭
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // TODO 这个函数要完成的任务是在mounted的时候添加一个点击事件，并且在unMounted的时候消除这个事件
    // TODO 拿到Dropdown的dom 元素并且进行判断判断是否包含该元素的dom节点用来判断是否关闭这个
    const handler = (e: MouseEvent) => {
      if (dropdowmRef.value) {
        // ?console.log(dropdowmRef.value) // DOM节点拿到了
        // ?contains表示不包含点击的节点 e。target不一定是html节点 as HTMLElement
        // 如果该isOpen.value为true,可以直接不写判断，写isOpen.value
        if (!dropdowmRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
      // 两个关闭条件1.是否包含该dom节点，2，isOpen属性是否打开
    }
    onMounted(() => {
      // 监听一个点击事件
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      // 记得删除
      document.removeEventListener('click', handler)
    })
    return { isOpen, toggleOpen, dropdowmRef }
  }
})
</script>

<style>
a {
  text-decoration: none;
  color: #000;
}
</style>
