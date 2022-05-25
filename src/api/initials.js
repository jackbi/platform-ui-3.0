/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-07-22 15:16:20
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:25
 * @FilePath: /magus-platform-ui-3.0/src/api/initials.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;
const INIT_API = {
  // 参数缓存
  getParamaCatch: `${MAGUS_PLATFORM_API}/initials/param`,
  // 获取字典缓存
  getDictCatch: `${MAGUS_PLATFORM_API}/initials/dict`
};

export default INIT_API;
