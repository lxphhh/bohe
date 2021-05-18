<!--
 * @Author: your name
 * @Date: 2021-05-16 23:20:46
 //TODO实现的目标有，
 //TODO 1需要一个大表单部分把这个自定义表单包裹起来 ok
 //TODO 2并且对于整个表单需要有一个提交方法，并且分别可以对表单提交的每一项进行一次校验，
 //TODO 3支持插槽可以拓展性，并且满足html语义化 ok
 * @Description: 自定义表单校验
 * @FilePath: \bohe\src\components\ValidateForm.vue
-->
<template>
  <form class="validate-form-container">
    <!-- 默认区域插槽 name="default"-->
    <slot name="default"></slot>
    <!-- 提交区域 可以加 prevent来阻止默认行为-->
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

export const emitter = mitt() // 初始化事件发送器
type ValidateFunc = () => boolean // 返回的是boolean
export default defineComponent({
  name: 'ValidateForm',
  // 自定义事件集合，这里是一个数组来触发我们的事件
  // 需要点击的时候触发
  emits: ['form-submit'],
  setup(props, context) {
    // ?建立一个数组把方法全部存起来
    let funcArr: ValidateFunc[] = []

    // TODO 循环调用所有的验证方法返回一个boolean值
    // TODO 一个不通过就都不通过
    const submitForm = () => {
      // !every依次用循环的方法进行匹配，一次不通过就全部不通过
      // !every 只要一个为false就停止匹配
      // ?map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
      const result = funcArr.map((func) => func()).every((result) => result)
      context.emit('form-submit', result)
    }

    const callback = (func?: ValidateFunc) => {
      // !多加一层判断
      if (func) {
        funcArr.push(func)
      }
    }
    // 创建事件监听器
    emitter.on('form-item-created', callback)
    // !记得卸载事件监听器
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = [] // 卸载清空 不需要这个变量
    })
    return { submitForm }
  }
  // 在vue上面已经没有事件监听器$on了
})
</script>

<style></style>
