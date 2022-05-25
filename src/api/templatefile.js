/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-01-18 13:42:46
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:39
 * @FilePath: /magus-platform-ui-3.0/src/api/templatefile.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

export default {
  // 获取所有的应用
  getAllApps: `${MAGUS_PLATFORM_API}/templateFiles/apps`,
  // 获取模版列表
  getTemplateFileList: `${MAGUS_PLATFORM_API}/templateFiles`,
  // 新增模版文件
  addTemplateFile: `${MAGUS_PLATFORM_API}/templateFiles`,
  // 通过id获取模版信息
  getTemplateInfoByid: (id) => `${MAGUS_PLATFORM_API}/templateFiles/${id}`,
  // 通过id修改模版信息
  editTemplateInfoByid: (id) => `${MAGUS_PLATFORM_API}/templateFiles/${id}`,
  // 通过id删除模版
  deleteTemplateById: (id) => `${MAGUS_PLATFORM_API}/templateFiles/${id}`
};
