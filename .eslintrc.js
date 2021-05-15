/*
 * @Author: your name
 * @Date: 2021-05-15 14:28:04
 * @LastEditTime: 2021-05-15 14:31:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Bohe\bohe\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-irregular-whitespace': 'off',
    'space-before-function-paren': 0,
    'no-unused-vars': 0, // 未使用变量不提示
    'eslint-disable-next-line': 'off'
  }
}
