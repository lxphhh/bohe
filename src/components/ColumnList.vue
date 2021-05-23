<!--
 * @Author: your name
 * //TODO @Description:小列表组件开发开始
   //?前面经过分析我们在做一个组件的时候首先需要分析这个组件需要什么东西，比方说这个组件就具有这几个部分?
   //*1.id（唯一） 用来表示组件的身份
   //*2.avtar 头图 用于表示组件的图片
   //*3.title 组件的标题
   //*4.description：组件的描述部分
 * @FilePath: \Bohe\bohe\src\components\ColumnList.vue
-->
<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <!--column.avatar && column.avatar.url 代表当且仅当存在的时候才进行替换 -->
          <img
            :src="column.avatar && column.avatar.url"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// PropType 接受一个泛型返回传入的类型
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'
import { addColumnAvatar } from '../helper'

export default defineComponent({
  name: 'ColumnList',
  // 组件的灵魂props，数据的形式数组
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, // 只是一个数组目前,添加了PropType就可以把构造函数断言成一个类型
      required: true
    }
  },

  setup(props) {
    // TODO重新组合prop里面的数据 ok
    // TODO重新变成新的数组 ok
    const columnList = computed(() => {
      // *3.1 支持return返回值；
      // *3.2 return是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份数组中的对应项改变了）
      // *3.3 map只能对元素进行加工处理，产生一个新的数组对象。而不能用它来进行筛选（筛选用filter），为什么不能，看个例子就知道了：
      return props.list.map((column) => {
        // 不存在就使用本地的图片 添加本地图片用require关键字
        // if (!column.avatar) {
        //   column.avatar = {
        //     url: require('@/assets/avatar.jpg') // !从本地拿的时候用require来导入
        //   }
        // } else {
        //   // 代表存在
        //   column.avatar.url = column.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
        // }
        // generateFitUrl(column, 50, 50)
        addColumnAvatar(column, 50, 50)
        return column // 记得返回
      })
    })
    return { columnList }
  }
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
