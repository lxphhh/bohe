<!--
 * @Author: your name
 * @Date: 2021-05-15 14:28:05
 * @LastEditTime: 2021-05-18 09:51:53
 * @LastEditors: Please set LastEditors
 * @Description: 主文件入口
 * @FilePath: \Bohe\bohe\src\App.vue
-->
<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <column-list :list="list"></column-list> -->
    <!-- 路由占位符 -->
    <router-view></router-view>
    <PageFooter></PageFooter>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent } from 'vue'

import GlobalHeader from './components/GlobalHeader.vue'
import PageFooter from './components/PageFooter.vue'
import { currentUser } from './testData'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    PageFooter
  },
  setup() {
    return {
      currentUser
      // emailRules,
      // passwordRules,
      // passwordValue,
      // emailVal,
      // onFormSubmit,
      // inputRef
    }
  }
})
</script>

<style></style>
