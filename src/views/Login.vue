<!--
 * @Author: your name
 * @Date: 2021-05-17 15:56:53
 * @LastEditTime: 2021-05-17 16:13:33
 * @LastEditors: Please set LastEditors
 * @Description: 登录组件
 * @FilePath: \bohe\src\views\Login.vue
-->
<template>
  <div>
    <!-- <column-list :list="list"></column-list> -->
    <validate-form @form-sumbit="onFormSubmit">
      <div class="mb-3">
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            type="text"
            :rules="emailRules"
            v-model="emailVal"
            placeholder="请输入邮箱地址"
            ref="inputRef"
          >
          </validate-input>
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            type="password"
            :rules="passwordRules"
            v-model="passwordValue"
            placeholder="请输入密码"
          >
          </validate-input>
        </div>
      </div>
      <!--v-slot:submit 可以被缩写成#submit 层级一定要对 -->
      <template #submit>
        <span type="submit" class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    // 子组件ref id
    const inputRef = ref<any>()
    const emailVal = ref('')
    // 验证邮箱功能集合
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordValue = ref('')
    // 验证密码不能为空
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
    // 接收到校验的结果
    const onFormSubmit = (result: boolean) => {
      // console.log('result', inputRef.value.validateInput())
      console.log('result', result)
    }
    return {
      inputRef,
      emailVal,
      emailRules,
      passwordValue,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style></style>
