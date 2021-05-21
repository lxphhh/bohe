<!--
 * @Author: your name
 * @Date: 2021-05-21 10:05:57
 //TODO: 我们要实习一个全局的错误,成功提示,需要捕获到错误,并且需要把成功的信息添加到根节点上去
 //TODO 并且要实现这个message可以关闭要有个关闭按钮
 * @Description: 全局消息组件
 * @FilePath: \bohe\src\components\Message.vue
-->
<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button type="button" class="btn-close" @click.prevent="ishide">
        <!-- <span aria-hidden="true">&times;</span> -->
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import useDOMCreate from '@/hooks/useDOMCreate'

// ?它应该是一个字符串字面量样式,给用户足够的选择空间
export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  name: 'Message',
  // *做两件事,1是显示错误或者正确的信息,选择组件的类型
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default' // 默认普通
    }
  },
  emits: ['close-message'], // ?消失的时候拿到生命周期事件名称
  setup(props, context) {
    useDOMCreate('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    // 是否隐藏
    const ishide = () => {
      isVisible.value = false
      context.emit('close-message', true) //?发送一个
    }
    return {
      isVisible,
      classObject,
      ishide
    }
  }
})
</script>

<style></style>
