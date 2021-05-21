/*
 * @Author: your name
 * @Date: 2021-05-21 10:47:04
 * @LastEditTime: 2021-05-21 10:50:54
 * @LastEditors: Please set LastEditors
 * @Description:新建一个DOM节点
 * @FilePath: \bohe\src\hooks\useDOMCreate.ts
 */
import { onUnmounted } from 'vue'

function useDOMCreate(nodeId: string) {
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node) // 向body节点添加一个<div id="message"></div>
  // 卸载
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDOMCreate
