/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-06-24 17:22:10
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 15:25:41
 * @FilePath: /magus-platform-ui-3.0/src/api/system.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

const SYSTEM_API = {
  // 获取系统列表
  getSystemList: `${MAGUS_PLATFORM_API}/systemInfo`,
  // 新增系统信息
  addSystem: `${MAGUS_PLATFORM_API}/systemInfo`,
  // 编辑系统信息
  editSystem: (id) => `${MAGUS_PLATFORM_API}/systemInfo/${id}`,
  // 通过id获取系统信息
  getSystemInfoById: (id) => `${MAGUS_PLATFORM_API}/systemInfo/${id}`,
  // 获取菜单数据
  getSystemMenu: `${MAGUS_PLATFORM_API}/systemInfo/menus`,
  // 分配菜单
  chooseMenus: `${MAGUS_PLATFORM_API}/systemInfo/menus`,
  // 删除菜单
  deleteMenuById: (id) => `${MAGUS_PLATFORM_API}/systemInfo/${id}`,
  // 获取系统信息
  systemFacade: `${MAGUS_PLATFORM_API}/initials/systemFacade`
};

export default SYSTEM_API;
