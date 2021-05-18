<!--
 * @Author: your name
 * @Date: 2021-05-17 23:26:11

 * @Description: 列展示
 // TODO 需要获取router的id 用vue3的route来获取
 // TODO需求分析，头部需要展示专栏的信息，图标，描述
 // TODO下面是一个Array列表 还有一个loading组件
 * @FilePath: \bohe\src\views\ColumnDetail.vue
-->
<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border " />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

// import { testData, testPosts } from '../testData'
import { GlobalDataProps } from '../store'
import PostList from '../components/PostList.vue'

export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    // !tips：可以加一个+号就能从字符串变成number类型
    const currentId = +route.params.id // 拿到当前路由id
    // ?返回数组中满足提供的测试函数的第一个元素的值，
    // ?若没有满足测试函数的元素，则返回undefined
    // *这两行的目的就是把，专栏和专栏下的文章关联起来，一个专栏可以对应多篇文章
    // //const column = testData.find((c) => c.id === currentId) //c代表数组里面的每一个元素
    // //const list = testPosts.filter((post) => post.columnId === currentId) // 过滤出满足条件的
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsByCid(currentId))

    return { column, list }
  }
})
</script>

<style></style>
