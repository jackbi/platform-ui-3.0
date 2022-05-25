/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-18 16:33:05
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:27
 * @FilePath: /magus-platform-ui-3.0/src/api/menus.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;
const MENUS_API = {
  // 菜单管理树
  getMenusTree: `${MAGUS_PLATFORM_API}/menus/tree`,
  // 查询子菜单
  getChildMenu: `${MAGUS_PLATFORM_API}/menus/child`,
  // 获取资源树
  getResouceTree: `${MAGUS_PLATFORM_API}/menus/getAllPages`,
  // 新增菜单
  addMenu: `${MAGUS_PLATFORM_API}/menus`,
  // 通过id查询菜单
  getMenuById: (id) => {
    return `${MAGUS_PLATFORM_API}/menus/${id}`;
  },
  // 通过id修改菜单
  putMenuById: (id) => {
    return `${MAGUS_PLATFORM_API}/menus/${id}`;
  },
  // 通过id删除菜单
  deleteMenuById: (id) => {
    return `${MAGUS_PLATFORM_API}/menus/${id}`;
  },
  // 获取登陆菜单信息
  getLoginMenu: `${MAGUS_PLATFORM_API}/menus`
};

export default MENUS_API;
