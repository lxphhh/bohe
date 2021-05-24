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
    class="navbar navbar-dark bs-teal justify-content-between mb-4 px-4"
    style="background-color: #20c997;"
  >
    <router-link to="/" class="navbar-brand" href="#"
      ><i class="iconfont icon-yezi- fontStyle"></i>&nbsp;薄荷专栏</router-link
    >
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" href="#" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <!-- 下拉选择框 -->
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.nickName}`">
          <dropdown-item>
            <router-link to="/create" class="dropdown-item">新建文章</router-link>
          </dropdown-item>
          <dropdown-item
            ><router-link :to="`/column/${user.column}`" class="dropdown-item"
              >我的专栏</router-link
            ></dropdown-item
          >
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item
            ><a href="#" class="dropdown-item" @click.prevent="loginout">退出登录</a></dropdown-item
          >
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserProps, GlobalDataProps } from '../store'
import createMessage from './CreateMessage'

// // 用户需要存在的信息
// export interface UserProps {
//   isLogin: boolean
//   id?: string // 这两种类型可以不传，因为有isLogin的存在
//   name?: string
// }

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  // 这个组件的形式是传过来一个JSON对象
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true // 必传
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    // 退出登录 JWT清除状态
    const loginout = () => {
      store.commit('loginout')
      createMessage('退出登录成功', 'success')
      setTimeout(() => {
        router.push('/')
      })
    }
    return { loginout }
  }
})
</script>

<style scoped>
.fontStyle {
  font-size: 18px;
  color: #fff;
  border: none;
}
</style>
