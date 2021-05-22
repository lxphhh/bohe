<!--
 * @Author: your name
 * @Date: 2021-05-15 14:28:05
 * @LastEditTime: 2021-05-22 11:49:03
 * @LastEditors: Please set LastEditors
 * @Description: 主文件入口
 * @FilePath: \Bohe\bohe\src\App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <message type="error" :message="error.message" v-if="error.status"></message> -->
    <!-- 通过传送门把这个遮罩层创送到了app这个dom节点下 -->
    <loading v-if="isLoading" text="奋力加载中"></loading>
    <!-- <column-list :list="list"></column-list> -->
    <!-- 路由占位符 -->
    <router-view></router-view>
    <PageFooter></PageFooter>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

import GlobalHeader from './components/GlobalHeader.vue'
import PageFooter from './components/PageFooter.vue'
import Loading from './components/Loading.vue'
import createMessage from './components/CreateMessage'

import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    PageFooter,
    Loading
    // Message
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user) // 当前用户
    const isLoading = computed(() => store.state.loading) // 是否加载
    // const token = computed(() => store.state.token) // token
    const error = computed(() => store.state.error) // error
    // onMounted(() => {
    //   // *如果当前用户没有登录,和token存在且为真 记得现在的token是ref类型需要加value
    //   if (!currentUser.value.isLogin && token.value) {
    //     // !直接向它添加一个token头
    //     axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
    //     // !获取当前用户并且赋值
    //     store.dispatch('fetchCurrentUser')
    //   }
    // })
    // !需要监听error的变化 error中某个值发生变化的时候就显示
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value
        // 如果status为真或者message(有可能是undefined)存在 代表错误发生了
        if (status && message) {
          createMessage(message, 'error')
        }
      }
    )
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style></style>

// emailRules, // passwordRules, // passwordValue, // emailVal, // onFormSubmit, // inputRef
