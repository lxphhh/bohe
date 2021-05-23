<!--
 * @Author: your name
 * @Date: 2021-05-21 17:08:04
  //TODO: 上传组件要实现的功能有,上传一个图片,并且上传前,上传中,上传后
  //TODO: 要有一个完整的生命周期.实现图片预览
 * @Description:
 * @FilePath: \bohe\src\components\Uploader.vue
-->
<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else-if="fileStatus === 'error'" name="error">
        <button class="btn btn-primary" disabled>上传失败请重新选择一张图</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>

      <!-- <span>点击上传</span> -->
    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import axios from 'axios'
// *组件生命周期展示 ready ,loading,success,error 多种情况字符串字面量
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean // 接受一个File类型的文件 是否校验通过

export default defineComponent({
  name: 'Uploader',
  // 上传组件发送的url路径
  props: {
    action: {
      type: String,
      required: true
    },
    // 上传之前校验
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    // 上传以后的图片
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false, // !禁止给父组件继承
  // ?自定义发送事件,成功以后
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    // *在setup中拿dom节点 加点击事件点击它其实获取的是input框的事件
    const fileInput = ref<null | HTMLInputElement>(null)
    // *组件状态 存在就代表上传成功
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    //  ?成功传出去的数据在slot上
    const uploadedData = ref(props.uploaded)
    // !异步传来的数据变化了
    watch(
      () => props.uploaded, // 变成一个fun
      (newValue) => {
        if (newValue) {
          fileStatus.value = 'success'
          uploadedData.value = newValue // 告诉父组件有值就给
        }
      }
    )
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    // *上传变化e:Event
    const handleFileChange = (e: Event) => {
      // !不能让e.target为null
      const currentTarget = e.target as HTMLInputElement // 拿files
      // !里面有值代表已经有选择的文件要上传了
      if (currentTarget.files) {
        // 把对象变成数组
        const files = Array.from(currentTarget.files)
        // console.log(currentTarget.files)
        // !上传之前就要校验了
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]) // 只能上传一项
          if (!result) {
            return // !校验不通过
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('files', files[0]) // 只需要数组的第0项就可
        axios
          .post(props.action, formData, {
            // 自定义请求头
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((resp) => {
            // !成功回调
            // console.log(resp)
            fileStatus.value = 'success'
            uploadedData.value = resp.data
            context.emit('file-uploaded', resp.data)
          })
          .catch((err) => {
            // !错误处理
            // console.log(err)
            fileStatus.value = 'error'
            context.emit('file-uploaded-error', err)
          })
          .finally(() => {
            // !上传完毕最后处理以后把value变成
            if (fileInput.value) {
              fileInput.value.value = '' // 文本框值为空
            }
          })
      }
    }
    return { fileInput, triggerUpload, handleFileChange, fileStatus, uploadedData }
  }
})
</script>

<style></style>
