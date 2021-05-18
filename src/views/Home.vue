<!--
 * @Author: your name
 * @Date: 2021-05-17 22:05:37
 * @LastEditTime: 2021-05-18 09:12:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\views\Home.vue
-->
<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">谈天说地，分享一切</h2>
          <p>
            <a
              href="#"
              class="btn btn-primary my-2"
              style="background-color: #20c997;border:1px solid #20c997;"
              >开始写文章</a
            >
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { testData } from '../testData'
import ColumnList from '../components/ColumnList.vue'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup() {
    return {
      list: testData
    }
  }
})
</script>
