<!--
 * @Author: your name
 * @Description: 创建文章
 // TODO需求分析：一个文章作者对应一个专栏，一个专栏底下对应多篇文章，靠id来维系
 * @FilePath: \bohe\src\views\CreatePost.vue
-->
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
      @file-uploaded-error="onFileUploadedError"
    >
      <h3>点击上传文章图片</h3>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h3>正在上传中</h3>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500" />
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          tag="input"
          type="text"
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '../store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '../components/Uploader.vue'
import createMessage from '../components/CreateMessage'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleVal = ref('')
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
    const contentVal = ref('')
    const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // 拿columnId
        const { column } = store.state.user
        // *新建文章 模拟
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column // 有可能是undefined ,加一层存在判断
          }
          // 向vuex提交一个同步的变化
          store.commit('createPost', newPost)
          router.push({
            name: 'column',
            params: { id: column }
          })
        }
      }
    }
    // 上传图片之前的校验
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/png' || 'image/jpeg'
      // 没有通过校验
      if (!isJPG) {
        createMessage('上传图片只能是JPG格式的!', 'error')
      }
      return isJPG // T or F
    }
    // ?上传图片 返回的数据 返回数据满足格式,图片满足格式ResponseType<ImageProps>
    // ?主要还是获得响应里面的图片信息 所以图片信息要当泛型传进去
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id} 成功!`, 'success')
    }
    // ?失败
    const onFileUploadedError = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id} 失败!`, 'error')
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  border-radius: 3px;
}
.create-post-page .file-upload-container img {
  height: 100%;
  width: 100%;
  cursor: pointer;
  padding: 7px;
  /* 高度一致 */
  object-fit: cover;
}
</style>
