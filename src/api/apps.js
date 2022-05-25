/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-17 15:27:53
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:10
 * @FilePath: /magus-platform-ui-3.0/src/api/apps.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

const APPS_API = {
  // 系统应用管理树
  getAppsTree: `${MAGUS_PLATFORM_API}/apps/tree`,
  // 应用管理-获取所有应用
  getApps: `${MAGUS_PLATFORM_API}/apps`,
  // 新增应用
  addApp: `${MAGUS_PLATFORM_API}/apps`,
  // 通过id获取应用信息
  getAppById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/${id}`;
  },
  // 通过id获取应用信息
  putAppById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/${id}`;
  },
  // 通过id删除应用
  deleteAppById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/${id}`;
  },
  // 获取所有模块
  getModules: `${MAGUS_PLATFORM_API}/apps/modules`,
  // 新增模块
  addModules: `${MAGUS_PLATFORM_API}/apps/modules`,
  // 通过id获取模块信息
  getModuleById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/modules/${id}`;
  },
  // 通过id修改模块信息
  putModuleById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/modules/${id}`;
  },
  // 通过id删除模块信息
  deleteModuleById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/modules/${id}`;
  },
  // 获取功能列表
  getFunctions: `${MAGUS_PLATFORM_API}/apps/functions`,
  // 新增功能
  addFunction: `${MAGUS_PLATFORM_API}/apps/functions`,
  // 通过ID查询方法
  getFunctionById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/functions/${id}`;
  },
  // 通过ID编辑功能
  putFunctionById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/functions/${id}`;
  },
  // 通过id删除功能
  deleteFunctionById: (id) => {
    return `${MAGUS_PLATFORM_API}/apps/functions/${id}`;
  },
  // 获取所有应用
  getAllApps: `${MAGUS_PLATFORM_API}/initials/webServer`
};

export default APPS_API;
