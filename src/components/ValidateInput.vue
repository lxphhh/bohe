<!--
 * @Author: your name
 * @Date: 2021-05-16 11:26:37
 * @Description: 自定义验证组件
  //TODO 实现规则的校验集合，并且可以校验多种类型的代码，string，email，password，null校验并且支持可拓展性
  //TODO 需要让这个组件实现v-model 功能 :value="inputRef.val" @input="updateValue" 发送出去
  //TODO  v-bind="$attrs" 可以替换之前的类型，就可以支持选择类型了text password
  //TODO 新增功能支持textarea
 * @FilePath: \bohe\src\components\ValidateInput.vue
-->
<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    />
    <!-- 新增功能支持textarea -->
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    ></textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, computed } from 'vue'

import { emitter } from './ValidateForm.vue'

// 好用的邮箱格式正则表达式 JS当中正则表达式RegExp类型，下面方法test可以匹配模式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// 自定义校验规则集 RuleProp
export interface RuleProp {
  type: 'required' | 'email' | 'custom' // 可以拓展 自定义校验规则,是一个函数且返回的是boolean
  message: string
  validator?: () => boolean
}
// *声明一个是RuleProps类型的数组 RulesProp 多个规则集合
export type RulesProp = RuleProp[]

// *传入一个字符串的字面量，可以让用户手动添加类型
export type TagType = 'input' | 'textarea'

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String, // 通过这个属性来支持v-model
    // 通过这个属性来支持传入多个类型
    tag: {
      type: String as PropType<TagType>,
      default: 'input' // *默认渲染input标签
    }
  },
  // !禁用Arrts的继承，让这个元素不用传到上个元素的根节点
  inheritAttrs: false,
  setup(props, context) {
    // console.log(context.attrs)
    // *输入要包含当前的值，包含错误，包含信息多对象集合 采用reactive
    const inputRef = reactive({
      // !第一种写法
      // val: props.modelValue || '',
      // !第二种写法计算属性
      val: computed({
        get: () => props.modelValue || '',
        set: (val) => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false, // 没有错误
      message: '' // 提示语
    })
    // 校验规则开始，由于多模式匹配，使用switch case来实现
    const validateInput = () => {
      // 先判断传过来的rules有无
      if (props.rules) {
        // ?every检查数组是否满足所有条件方法是否通过，通过就是true 一个不通过就是false
        const allPassed = props.rules.every((rule) => {
          let passed = true // 中间变量一开始通过
          inputRef.message = rule.message
          // !判断变量类型匹配
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== '' // 去除空格以后不为空
              break
            case 'email':
              passed = emailReg.test(inputRef.val) // 匹配正则表达式
              break
            case 'custom': // ?自定义校验规则函数
              passed = rule.validator ? rule.validator() : true // 如果这里面有函数要校验就运行校验函数,没有就是true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed // 发生错误
        return allPassed // 对外返回错误或者失败
      }
      return true // 如果props.rules不存在永远为true
    }
    // // 需要支持v-model的方法 拿到键盘输入
    // const updateValue = (e: KeyboardEvent) => {
    //   // 拿到键盘实时输入的值 断言成 HTMLInputElement
    //   const targetValue = (e.target as HTMLInputElement).value
    //   // 把值赋给targetValue
    //   inputRef.val = targetValue
    //   // !把事件发送出去 事件名称 ，要发送的值targetValue
    //   context.emit('update:modelValue', targetValue)
    // }
    // 挂载的时候发送 整个验证函数
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return { validateInput, inputRef }
  }
})
</script>

<style></style>
