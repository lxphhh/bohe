<!--
 * @Author: your name
 * @Date: 2021-05-22 23:53:09
 * @LastEditTime: 2021-05-23 16:00:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\views\PostDetail.vue
-->
<template>
  <div class="post-detail-page">
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
        <button type="button" class="btn btn-danger">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps } from '../store'
import UserProfile from '../components/UserProfile.vue'

export default defineComponent({
  name: 'post-detail',
  components: {
    UserProfile
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id
    const md = new MarkdownIt()
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
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    return {
      currentPost,
      currentHTML,
      currentImageUrl,
      showEditArea
    }
  }
})
</script>
