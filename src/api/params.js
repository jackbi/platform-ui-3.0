/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-07-22 13:22:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:32
 * @FilePath: /magus-platform-ui-3.0/src/api/params.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;
const PARAMS_API = {
  // 获取所有应用
  getAllApps: `${MAGUS_PLATFORM_API}/params/apps`,
  // 获取参数列表
  getParams: `${MAGUS_PLATFORM_API}/params`,
  // 新增参数
  addParams: `${MAGUS_PLATFORM_API}/params`,
  // 编辑参数
  editParams: (id) => `${MAGUS_PLATFORM_API}/params/${id}`,
  // 通过id获取参数
  getParamsById: (id) => `${MAGUS_PLATFORM_API}/params/${id}`,
  // 通过id删除参数
  deleteParamsById: (id) => `${MAGUS_PLATFORM_API}/params/${id}`
};

export default PARAMS_API;
