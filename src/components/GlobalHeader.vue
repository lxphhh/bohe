<!--
 * @Author: your name
  //TODO:1.通过组件的分析我们可以得到，该组件有两种状态
  //TODO:状态1，该用户为登录的时候显示一种状态。
  //TODO:状态2，该用户已经登录的时候是一种状态 字段1 islogin
  //TODO:需求是有用户登录的状态islogin，用户名name，并且后端需要有一个唯一的标识符来判断id
 * @Description: 头部组件开始
 * @FilePath: \bohe\src\components\GlobalHeader.vue
-->
<template>
  <nav
    class="navbar navbar-dark justify-content-between mb-4 px-4"
    style="background-color: #a7d676;"
  >
    <a class="navbar-brand" href="#"><i class="iconfont icon-yezi- fontSize"></i>薄荷专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.name}`"></dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import Dropdown from './Dropdown.vue'

export interface UserProps {
  isLogin: boolean
  id?: string // 这两种类型可以不传，因为有isLogin的存在
  name?: string
}

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown
  },
  // 这个组件的形式是传过来一个JSON对象
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true // 必传
    }
  }
})
</script>

<style scoped>
.fontSize {
  font-size: 18px;
  color: #fff;
  border: none;
}
</style>
