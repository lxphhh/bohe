<!--
 * @Author: your name
 * @Date: 2021-05-15 19:48:47
  //TODO 开发需求分析：我们需要实现一个下拉的按钮，并且我们要实现可以点击的功能，点击下拉，登录退出登录
 * @FilePath: \bohe\src\components\Dropdown.vue
-->
<template>
  <div class="dropdown">
    <!-- 自定义标签样式dropdown-toggle -->
    <!-- 这里面加一个prenvent可以阻止a标签的默认跳转行为 -->
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block', textAlign: 'center' }" v-if="isOpen">
      <li class="dropdown-item">
        <a href="#">新建文章</a>
      </li>
      <li class="dropdown-item">
        <a href="#">编辑资料</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return { isOpen, toggleOpen }
  }
})
</script>

<style>
a {
  text-decoration: none;
  color: #000;
}
</style>
