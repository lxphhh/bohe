<!--
 * @Author: your name
 * @Date: 2021-05-16 11:26:37
 * @Description: 自定义验证组件
  //TODO 实现规则的校验集合，并且可以校验多种类型的代码，string，email，password，null并且支持可拓展性
 * @FilePath: \bohe\src\components\ValidateInput.vue
-->
<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      v-model="inputRef.val"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'

// 好用的邮箱格式正则表达式 JS当中正则表达式RegExp类型，下面方法test可以匹配模式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// 自定义校验规则集 RuleProp
export interface RuleProp {
  type: 'required' | 'email' // 可以拓展
  message: string
}
// *声明一个是RuleProps类型的数组 RulesProp
export type RulesProp = RuleProp[]

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>
  },
  setup(props) {
    // 要包含当前的值，包含错误，包含信息多对象集合
    const inputRef = reactive({
      val: '',
      error: false, // 没有错误
      message: '' // 提示语
    })
    // 校验规则开始，由于多模式匹配，使用switch case来实现
    const validateInput = () => {
      // 先判断传过来的rules有无
      if (props.rules) {
        // every检查数组是否满足所有条件方法是否通过，通过就是true 一个不通过就是false
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
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed // 发生错误
      }
    }
    return { validateInput, inputRef }
  }
})
</script>

<style></style>
