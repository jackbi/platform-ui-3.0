/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-20 15:21:33
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:35
 * @FilePath: /magus-platform-ui-3.0/src/api/roles.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const ROLES_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;
const ROLES_API = {
  // 获取用户列表
  getRoleList: `${ROLES_PLATFORM_API}/roles`,
  // 新增角色
  addRole: `${ROLES_PLATFORM_API}/roles`,
  // 根据ID获取角色信息
  getRoleById: (id) => `${ROLES_PLATFORM_API}/roles/${id}`,
  // 根据ID编辑角色信息
  putRoleById: (id) => `${ROLES_PLATFORM_API}/roles/${id}`,
  // 根据ID删除角色信息
  deleteRoleById: (id) => `${ROLES_PLATFORM_API}/roles/${id}`
};

export default ROLES_API;
