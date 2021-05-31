/*
 * @Author: your name
 * @Date: 2021-05-31 21:50:22
 * @LastEditTime: 2021-05-31 22:03:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bohe\vite.config.js
 */
/* eslint-disable */
import * as path from 'path'
import vuePlugin from '@vitejs/plugin-vue'
import legacyPlugin from '@vitejs/plugin-legacy'

// https://cn.vitejs.dev/config/
export default ({ command, mode }) => {
  let rollupOptions = {}

  let optimizeDeps = {}

  let alias = {
    '@': path.resolve(__dirname, '.src'),
    vue$: 'vue/dist/vue.runtime.esm-bundler.js'
  }

  let proxy = {
    '/api': {
      target: 'http://api.vikingship.xyz/api',
      changeOrigin: true,
      ws: true,
      pathRewrite: { '^/api': '' }
    }
  }

  let esbuild = {}

  return {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      alias
    },
    define: {
      'process.env.APP_IS_LOCAL': '"true"'
    },
    server: {
      // 代理
      open: true,
      /* 设置为0.0.0.0则所有的地址均能访问 */
      host: '192.168.0.108',
      port: 8080,
      https: false,
      proxy
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: 'build', // 产出目录
      rollupOptions
    },
    esbuild,
    optimizeDeps,
    plugins: [
      vuePlugin(),
      legacyPlugin({
        targets: [
          'Android > 39',
          'Chrome >= 60',
          'Safari >= 10.1',
          'iOS >= 10.3',
          'Firefox >= 54',
          'Edge >= 15'
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
        }
      }
    }
  }
}
