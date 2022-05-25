/*
 * @Description: 
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-11 13:28:36
 * @LastEditors: wenbin
 * @LastEditTime: 2021-05-14 11:52:17
 * @FilePath: /maguscloud-platform-web/src/common/utils/index.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
import Vue from 'vue';

Vue.prototype.$back = function () {
  this.$router.back();
}
