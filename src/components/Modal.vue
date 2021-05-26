<!--
 * @Author: your name
 * @Date: 2021-05-24 22:03:59
 * @LastEditTime: 2021-05-25 09:21:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\components\Modal.vue
-->
<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 任意往里面加对象 -->
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onClose">
              {{ cancelText }}
            </button>
            <button type="button" class="btn btn-primary" @click="onConfirm">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export default defineComponent({
  name: 'modal',
  // 标题类型
  props: {
    title: String,
    // 是否出现
    visible: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  // 两个事件,是否关闭,内容
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup(props, context) {
    // 创建一个节点
    useDOMCreate('modal')
    // 关闭
    const onClose = () => {
      // console.log(111)

      context.emit('modal-on-close')
    }
    // 提交
    const onConfirm = () => {
      context.emit('modal-on-confirm')
    }
    return {
      onClose,
      onConfirm
    }
  }
})
</script>
