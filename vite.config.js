/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 13:49:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-23 14:49:19
 * @FilePath: /magus-platform-ui-3.0/vite.config.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import eslintPlugin from 'vite-plugin-eslint';

// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
const resolve = (dir) => path.join(__dirname, dir);
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      // 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.jsx', 'src/**/*.ts'],
        cache: false
      })
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ],
    css: {
      postcss: {
        plugins: [
          // 前缀追加
          require('autoprefixer')({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              '> 1%'
            ],
            grid: true
          }),
          require('postcss-flexbugs-fixes')
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/sass/index.scss";'
        }
      }
    },
    base: env.VITE_PUBLIC_PATH, // 打包路径
    resolve: {
      // 设置别名
      alias: {
        '@': resolve('src'),
        // 解决vue-i18n警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      host: '0.0.0.0',
      https: false,
      port: 8000, // 启动端口
      open: true,
      proxy: {
        // '^/api/platform/.*': {
        //   target: 'http://192.168.20.30:12000', //网关
        //   changeOrigin: true, //跨域
        //   rewrite: (path) => path.replace(/^\/api\/platform/, ''),
        // },
        // '^/api/dataCenter/.*': {
        //   target: 'http://192.168.20.30:18000', //网关
        //   // target: 'http://192.168.60.226:18000', //网关
        //   changeOrigin: true, //跨域
        //   rewrite: (path) => path.replace(/^\/api\/dataCenter/, ''),
        // },
        '^/api/.*': {
          target: 'http://192.168.20.30/api',
          changeOrigin: true, // 跨域
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      cors: true
    },
    build: {
      // 生产环境移除 console
      // minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    }
  });
};
