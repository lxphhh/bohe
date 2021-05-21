<!--
 * @Author: your name
 * @Date: 2021-05-17 22:05:37
 * @LastEditTime: 2021-05-22 00:22:34
 * @LastEditors: Please set LastEditors
 * @Description: 主页面
 * @FilePath: \bohe\src\views\Home.vue
-->
<template>
  <div class="home-page">
    <!-- <pre>{{ biggerColumnLen }}</pre> -->
    <section class="py-5 text-center container">
      <uploader
        action="/upload"
        :beforeUpload="beforeUpload"
        @file-uploaded="onFileUploaded"
        @file-uploaded-error="onFileUploadedError"
      >
        <template #uploaded="dataProps">
          <img :src="dataProps.uploadedData.data.url" width="500" />
        </template>
      </uploader>
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
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import { GlobalDataProps, ResponseType, ImageProps } from '../store'
import ColumnList from '../components/ColumnList.vue'
import Uploader from '../components/Uploader.vue'
import createMessage from '../components/CreateMessage'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    Uploader
  },
  setup() {
    // GlobalDataProps获得类型补全
    const store = useStore<GlobalDataProps>()
    // !vuex的数据多从计算属性里面读取
    const list = computed(() => store.state.columns)
    // 上传图片之前的校验
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      // 没有通过校验
      if (!isJPG) {
        createMessage('上传图片只能是JPG格式的!', 'error')
      }
      return isJPG // T or F
    }
    // ?上传图片 返回的数据 返回数据满足格式,图片满足格式ResponseType<ImageProps>
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id} 成功!`, 'success')
    }
    // ?失败
    const onFileUploadedError = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id} 失败!`, 'error')
    }
    onMounted(() => {
      // 异步方法
      store.dispatch('fetchColumns')
    })
    return {
      list,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    }
  }
})
</script>
