/*
 * @Author: your name
 * @Date: 2021-05-21 11:18:51
 * @LastEditTime: 2021-05-21 21:00:47
 * @LastEditors: Please set LastEditors
 * @Description: 函数式创建message组件
   TODO 要实现的功能是类似全局的alert发生 alert('111')
 * @FilePath: \bohe\src\components\CreateMessage.ts
 */
import { createApp } from 'vue'

import Message from './Message.vue'

// ?它应该是一个字符串字面量样式,给用户足够的选择空间
export type MessageType = 'success' | 'error' | 'default'

//TODO: 这个函数需要完成的事情有,
//TODO: 创建一个节点,
//TODO: 接收外部传来的两个信息,一个是错误信息,一个是类型信息,还要给他一个超时时间判断
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // !函数式创造一个组件 第一个参数组件名,第二个参数 props
  const messageInstance = createApp(Message, {
    message,
    type
  })
  // !挂载组件 先创建一个节点 再挂载
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode) // 挂载成功
  // !超时处理 2000
  setTimeout(() => {
    // !记得卸载组件
    messageInstance.unmount() //mountNode
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
