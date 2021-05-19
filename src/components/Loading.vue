<!--
 * @Author: your name
 * @Date: 2021-05-20 00:03:27
 * @LastEditTime: 2021-05-20 00:24:25
 * @LastEditors: Please set LastEditors
 * @Description: 加载组件
 * @FilePath: \bohe\src\components\Loading.vue
-->
<template>
  <div
    class="d-flex justify-content-center align-items-center h-100 loading-container"
    :style="{ backgroundColor: background || '' }"
  >
    <div class="loading-content">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">{{ text || '奋力加载中' }}...</span>
      </div>
      <p v-if="text" class="text-primary small">{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String // 自定义字符串
    },
    background: {
      type: String // 背景
    }
  }
})
</script>

<style scoped>
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 10;
  text-align: center;
}
</style>
