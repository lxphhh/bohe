/*
 * @Author: your name
 * @Date: 2021-05-22 14:27:11
 * @LastEditTime: 2021-05-22 22:48:53
 * @LastEditors: Please set LastEditors
 * @Description: 验证函数
 * @FilePath: \bohe\src\helper.ts
 */
import { ColumnProps } from './store'
export function generateFitUrl(column: ColumnProps, width: number, height: number) {
  if (column.avatar) {
    column.avatar.fitUrl =
      column.avatar.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.jpg')
    }
  }
}

// 格式类型 'image/jpeg' | 'image/png'
type FormatTypes = 'image/jpeg' | 'image/png'

// 检查参数类型
interface CheckCondition {
  format?: FormatTypes[] // !多种格式的类型是一个数组
  size?: number
}
// 错误类型
type ErrorType = 'size' | 'format' | null // 没有错误
// 通用校验函数condition: CheckCondition 函数里面传一个对象,两个参数
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  // TODO: 是不是一个合法的格式 数组语法是否包含这一项
  const isValidFormat = format ? format.includes(file.type as FormatTypes) : true // 数组中是否包含里面的类型
  const isValidSize = size ? file.size / 1024 / 1024 < size : true // 传进来的大小比这个小
  let err: ErrorType = null
  if (!isValidFormat) {
    err = 'format'
  }
  if (!isValidSize) {
    err = 'size'
  }
  // ?返回对象里面值告诉用户是否通过 && 全部需要通过 返回一个T or F
  return {
    passed: isValidFormat && isValidSize,
    err
  }
}
