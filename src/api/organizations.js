/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-03-01 09:50:04
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:30
 * @FilePath: /magus-platform-ui-3.0/src/api/organizations.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

export default {
  // 组织层级查询
  getAllLevel: `${MAGUS_PLATFORM_API}/orgLevels`,
  // 组织层级新增
  addLevels: `${MAGUS_PLATFORM_API}/orgLevels`,
  // 组织层级编辑
  editLevels: (id) => `${MAGUS_PLATFORM_API}/orgLevels/${id}`,
  // 获取层级信息
  getLevelInfo: (id) => `${MAGUS_PLATFORM_API}/orgLevels/${id}`,
  // 删除层级
  deleteLevel: (id) => `${MAGUS_PLATFORM_API}/orgLevels/${id}`,
  // 获取组织机构树
  getOrgTree: `${MAGUS_PLATFORM_API}/orgs/tree`,
  // 获取子组织列表
  getOrgChild: `${MAGUS_PLATFORM_API}/orgs/child`,
  // 新增机构
  addOrg: `${MAGUS_PLATFORM_API}/orgs`,
  // 新增机构
  editOrgById: (id) => `${MAGUS_PLATFORM_API}/orgs/${id}`,
  // 获取机构信息
  getOrgById: (id) => `${MAGUS_PLATFORM_API}/orgs/${id}`,
  // 删除机构
  deleteOrgById: (id) => `${MAGUS_PLATFORM_API}/orgs/${id}`,
  // 获取授权用户
  getAuthUsers: `${MAGUS_PLATFORM_API}/orgs/authUser/authedUsers`,
  // 删除授权用户
  deleteAuthUsers: `${MAGUS_PLATFORM_API}/orgs/authUser`,
  // 获取授权用户
  getUnAuthUsers: `${MAGUS_PLATFORM_API}/orgs/authUser/unAuthedUsers`,
  // 添加授权用户
  saveAuthUsers: `${MAGUS_PLATFORM_API}/orgs/authUser`
};
