<!--
 * @Author: your name
 * @Date: 2021-05-15 21:57:59
  //TODO:由于antd方面采用了html语义化的标签如ul>li 所以我们的下拉框准备
  //TODO:以多个item嵌套而成 dropdown>dropdownItem ,采用slot
  //TODO 需求分析：这个组件有时候要不能点击 disable属性
 * @FilePath: \bohe\src\components\DropdownItem.vue
-->
<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <!-- 自定义内容 -->
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
