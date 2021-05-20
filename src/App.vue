<!--
 * @Author: your name
 * @Date: 2021-05-15 14:28:05
 * @LastEditTime: 2021-05-20 08:47:23
 * @LastEditors: Please set LastEditors
 * @Description: 主文件入口
 * @FilePath: \Bohe\bohe\src\App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
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
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import GlobalHeader from './components/GlobalHeader.vue'
import PageFooter from './components/PageFooter.vue'
import Loading from './components/Loading.vue'
import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    PageFooter,
    Loading
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
    }
  }
})
</script>

<style></style>

// emailRules, // passwordRules, // passwordValue, // emailVal, // onFormSubmit, // inputRef
