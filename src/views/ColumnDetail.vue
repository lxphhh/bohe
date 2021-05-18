<!--
 * @Author: your name
 * @Date: 2021-05-17 23:26:11

 * @Description: 列展示
 // TODO 需要获取router的id 用vue3的route来获取
 * @FilePath: \bohe\src\views\ColumnDetail.vue
-->
<template>
  <!-- 预处理标签 -->
  <pre>{{ route }}</pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ColumnDetail',
  setup() {
    const route = useRoute()
    return { route }
  }
})
</script>

<style></style>
