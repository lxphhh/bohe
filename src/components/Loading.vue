<!--
 * @Author: your name
 * @Date: 2021-05-20 00:03:27
 * @LastEditTime: 2021-05-21 10:52:23
 * @LastEditors: Please set LastEditors
 * @Description: 加载组件 使用到了传送门组件
 * @FilePath: \bohe\src\components\Loading.vue
-->
<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="loading-content">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">{{ text || '奋力加载中' }}...</span>
        </div>
        <p v-if="text" class="text-success small">{{ text }}...</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useDOMCreate from '@/hooks/useDOMCreate'

export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String // 自定义字符串外部传入
    },
    background: {
      type: String // 背景外部传入
    }
  },
  setup() {
    // TODO:需要在组件挂载之前就创建一个关于back的节点<div id="back"></div>
    useDOMCreate('back')
    // const node = document.createElement('div')
    // node.id = 'back'
    // document.body.appendChild(node) // ?向DoM的body添加node id为 back的节点
    // // !记得删除节点
    // onUnmounted(() => {
    //   document.body.removeChild(node) //?移除节点的api
    // })
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
