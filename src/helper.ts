/*
 * @Author: your name
 * @Date: 2021-05-22 14:27:11
 * @LastEditTime: 2021-05-25 15:09:14
 * @LastEditors: Please set LastEditors
 * @Description: 验证函数
 * @FilePath: \bohe\src\helper.ts
 */
import { ColumnProps, ImageProps, UserProps } from './store'

export function generateFitUrl(
  data: ImageProps,
  width: number,
  height: number,
  format = ['m_pad']
) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    ;(data.avatar as unknown) = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
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
interface TestPosts {
  _id: string
  name: string
}
// !需求就是把数组对象,变成key-value形式的obj
const testData: TestPosts[] = [
  { _id: '1', name: 'avatar' },
  { _id: '2', name: '2收2' }
]
const testData2: { [key: string]: TestPosts } = {
  1: { _id: '1', name: 'avatar' },
  2: { _id: '2', name: '2收2' }
}

// !传来的数组类型不确定
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  // 数组归并操作
  return arr.reduce((prev, current) => {
    // !约束泛型,让泛型上面必须存在这个条件_id extends { _id?: string }
    if (current._id) {
      // !对象推断成了一个对象,需要一个类型断言成[key: string]: T
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
// !把对象变成数组
export const objToArr = <T>(obj: { [key: string]: T }) => {
  // 获得对象的key 把数组的值变成数组的value
  return Object.keys(obj).map((key) => obj[key])
}

const result = arrToObj(testData)
const result2 = objToArr(testData2)
// console.log('result2', result2)
// console.log('result', result)

// export function generateFitUrl(column: ColumnProps, width: number, height: number) {
//   if (column.avatar) {
//     column.avatar.fitUrl =
//       column.avatar.url + `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
//   } else {
//     column.avatar = {
//       fitUrl: require('@/assets/column.jpg')
//     }
//   }
// }
