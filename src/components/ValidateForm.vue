<!--
 * @Author: your name
 * @Date: 2021-05-16 23:20:46
 //TODO实现的目标有，
 //TODO 1需要一个大表单部分把这个自定义表单包裹起来
 //TODO 2并且对于整个表单需要有一个提交方法，并且分别可以对表单提交的每一项进行一次校验，
 //TODO 3支持插槽可以拓展性，并且满足html语义化
 * @Description: 自定义表单校验
 * @FilePath: \bohe\src\components\ValidateForm.vue
-->
<template>
  <form class="validate-form-container">
    <!-- 默认区域插槽 name="default"-->
    <slot name="default"></slot>
    <!-- 提交区域 可以加 prevent来阻止默认行为-->
    <div class="submit-area" @click.prevent="sumbitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ValidateForm',
  // 自定义事件集合，这里是一个数组来触发我们的事件
  // 需要点击的时候触发
  emits: ['form-sumbit'],
  setup(props, context) {
    const sumbitForm = () => {
      context.emit('form-sumbit', true)
    }
    return { sumbitForm }
  }
})
</script>

<style></style>
