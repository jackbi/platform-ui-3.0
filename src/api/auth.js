/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-25 15:00:13
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:16
 * @FilePath: /magus-platform-ui-3.0/src/api/auth.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_AUTH_API = import.meta.env.VITE_APP_MAGUS_AUTHCENTER_API;
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

const AUTH_API = {
  // 登陆
  userLogin: `${MAGUS_AUTH_API}/login`,
  // 退出
  userLogout: `${MAGUS_AUTH_API}/logout`,
  // 授权获取角色
  getAuthRoles: `${MAGUS_PLATFORM_API}/auths/roles`,
  // 获取已授权的用户
  getAuthUsers: `${MAGUS_PLATFORM_API}/auths/authUser/authedUsers`,
  // 获取未授权的用户
  getUnAuthUsers: `${MAGUS_PLATFORM_API}/auths/authUser/unAuthedUsers`,
  // 保存授权用户
  saveAuthUsers: `${MAGUS_PLATFORM_API}/auths/authUser`,
  // 删除授权用户
  deleteAuthUsers: `${MAGUS_PLATFORM_API}/auths/authUser`,
  // 获取功能列表
  getAllApp: `${MAGUS_PLATFORM_API}/auths/authApp/apps`,
  // 保存授权功能
  saveAuthApp: `${MAGUS_PLATFORM_API}/auths/authApp`,
  // 登录获取验证码
  getCapcha: `${MAGUS_AUTH_API}/login/captcha`
};

export default AUTH_API;
