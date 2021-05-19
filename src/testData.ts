/*
 * @Author: your name
 * @Date: 2021-05-17 22:38:16
   TODO 在测试的数据中先暂时不考虑多层循环嵌套，需要先把所有的数据先展示处理
 * @Description: In User Settings Edit
 * @FilePath: \bohe\src\testData.ts
 */

// 用户需要存在的信息
export interface UserProps {
  isLogin: boolean
  id?: string // 这两种类型可以不传，因为有isLogin的存在
  name?: string
}

// 一篇文章所需要的有的信息有
export interface PostProps {
  id: number // 唯一id
  title: string // 标题
  content: string // 内容
  image?: string // 图片
  createdAt: string // 创建时间
  columnId: number // 为了分页
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

// 重新定义图片的类型
export interface ImageProps {
  _id?: string // id
  url?: string // 图片url
  createdAt?: string // 创建时间
}
export const testData: ColumnProps[] = [
  {
    _id: '1',
    title: 'test1的专栏',
    description:
      '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar:
    //   'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
  }
  // {
  //   id: 2,
  //   title: 'test2的专栏',
  //   description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
  //   avatar:
  //     'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  // },
  // {
  //   id: 3,
  //   title: 'test3的专栏',
  //   description:
  //     '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
  //   // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  // },
  // {
  //   id: 4,
  //   title: 'test4的专栏',
  //   description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
  //   avatar:
  //     'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  // }
]

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '这是我的第一篇文章',
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 2,
    title: '这是我的第二篇文章',
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 3,
    title: '这是我的第三篇文章',
    content:
      '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image:
      'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  }
]
