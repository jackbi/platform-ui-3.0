/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 14:23:49
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 10:03:48
 * @FilePath: /magus-platform-ui-3.0/.eslintrc.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', 'standard'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    window: true,
    ActiveXObject: true
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    semi: 0,
    quotes: 'off',
    'space-before-function-paren': 0,
    eqeqeq: ['off'],
    'vue/multi-word-component-names': 'off',
    // 建议使用const
    'no-const-assign': 'off',
    'prefer-const': 'off',
    'prefer-regex-literals': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5
      }
    ],
    'vue/block-tag-newline': [
      'error',
      {
        //  标签直接的换行规范
        singleline: 'always',
        multiline: 'always',
        maxEmptyLines: 0,
        blocks: {
          script: {
            singleline: 'always',
            multiline: 'always',
            maxEmptyLines: 0
          },
          template: {
            singleline: 'always',
            multiline: 'always',
            maxEmptyLines: 0
          },
          'my-block': {
            singleline: 'always',
            multiline: 'always',
            maxEmptyLines: 0
          }
        }
      }
    ],
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-indent': 'off',
    'vue/valid-attribute-name': 'off'
  }
};
