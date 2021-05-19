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
    <ul
      class="dropdown-menu"
      :style="{ display: 'block', textAlign: 'left', width: '100px' }"
      v-if="isOpen"
    >
      <!-- 自定义下拉框 slot 默认名字是default 并且只要一个slot的时候不需要名字-->
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'

import useClickOutside from '../hooks/useClickOutside' // 点击dom元素外关闭该下拉框

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
    // ?初始值是null因为当vue还没有挂载的时候 还是不是一个 dom节点 为 null 挂载之后有 HTMLElement 空且它是一个html元素
    const dropdowmRef = ref<null | HTMLElement>(null)
    const isOpen = ref(false) // 默认关闭
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 自定义点击关闭下拉框
    const isClickOutside = useClickOutside(dropdowmRef)
    //?如果isOpen和isClickOutside的值同时为真的话 代表打开且点到外面去=关
    // !这段代码只能执行一次,解决方法用watch监听对象isClickOutside的变化
    watch(isClickOutside, () => {
      // !如果两个为真的话，代表打开且点到外面去了，则关闭这个下拉框
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
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
