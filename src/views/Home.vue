<!--
 * @Author: your name
 * @Date: 2021-05-17 15:57:06
 * @LastEditTime: 2021-05-17 17:09:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\views\Home.vue
-->
<template>
  <div class="home-page container-md">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import ColumnList, { ColumnProps } from '../components/ColumnList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  }
})
</script>

<style></style>
