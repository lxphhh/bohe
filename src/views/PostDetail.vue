<!--
 * @Author: your name
 * @Date: 2021-05-22 23:53:09
 * @LastEditTime: 2021-05-25 11:10:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\views\PostDetail.vue
-->
<template>
  <div class="post-detail-page">
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      cancelText="让我想想"
      confirmText="确认删除"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>你确定要删除这篇文章吗 ?</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        :src="currentImageUrl"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
        v-if="currentImageUrl"
      />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <!-- // TODO: 踩坑记录 记得类型保护一下,类型只能是 object不包括string -->
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          ></user-profile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          :to="{ name: 'create', query: { id: currentPost._id } }"
          type="button"
          class="btn btn-primary mx-1"
          >编辑</router-link
        >
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">
          删除
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../store'
import UserProfile from '../components/UserProfile.vue'
import Modal from '../components/Modal.vue'
import createMessage from '../components/CreateMessage'
import router from '@/router'

export default defineComponent({
  name: 'post-detail',
  components: {
    UserProfile,
    Modal
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const currentId = route.params.id
    const md = new MarkdownIt()
    // 判断modal是否出现
    const modalIsVisible = ref(false)
    //!删除并且隐藏
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        console.log(rawData)
        createMessage('删除成功两秒以后返回专栏首页!', 'success', 2000)
        setTimeout(() => {
          router.push({ name: 'column', params: { id: rawData?.data?.column } })
        }, 2000)
      })
    }
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    // *markdown展示
    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content)
      }
    })
    // *是否展示编辑区域
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      // 判断有值,有作者,已经登录
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps // 也是用户这个类型的
        return postAuthor._id === _id // true
      } else {
        return false
      }
    })
    // *当前图片路径
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_972'
      } else {
        return null
      }
    })
    return {
      currentPost,
      currentHTML,
      currentImageUrl,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>
