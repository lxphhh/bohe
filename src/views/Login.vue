<!--
 * @Author: your name
 * @Date: 2021-05-17 22:05:37
 * @LastEditTime: 2021-05-20 23:43:48
 * @LastEditors: Please set LastEditors
 * @Description: 登陆部分
 * @FilePath: \bohe\src\views\Login.vue
-->
<template>
  <div class="login-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const emailVal = ref('') // 空
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('') // 空
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]

    const onFormSubmit = (result: boolean) => {
      // console.log('result', result) // T or F
      if (result) {
        // *router.push(`/column/${1}`) 两种写法
        // router.push({ name: 'column', params: { id: 1 } })
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        // 组合发送
        store.dispatch('loginAndFetch', payload).then((data) => {
          console.log(data)
          router.push('/')
          // store.commit('login')
        })
      }
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
