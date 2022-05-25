/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-20 13:23:16
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:40
 * @FilePath: /magus-platform-ui-3.0/src/api/users.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const USERS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;
const USERS_API = {
  // 获取用户列表
  getUserList: `${USERS_PLATFORM_API}/users`,
  // 新增用户
  addUser: `${USERS_PLATFORM_API}/users`,
  // 根据id获取用户信息
  getUserById: (id) => `${USERS_PLATFORM_API}/users/${id}`,
  // 根据id修改用户信息
  putUserById: (id) => `${USERS_PLATFORM_API}/users/${id}`,
  // 根据id删除用户信息
  deleteUserById: (id) => `${USERS_PLATFORM_API}/users/${id}`,
  // 获取用户信息
  getUserInfo: `${USERS_PLATFORM_API}/users/profile`,
  // 修改密码
  changePassword: `${USERS_PLATFORM_API}/users/profile/changePass`,
  // 修改头像
  changeAvatar: `${USERS_PLATFORM_API}/users/profile/changeAvatar`,
  // 修改用户信息
  changeUserInfo: `${USERS_PLATFORM_API}/users/profile/changeInfo`,
  // 获取验证方式
  getUserVaildType: `${USERS_PLATFORM_API}/users/profile/validType`,
  // 获取验证码
  getChangePasswordCode: `${USERS_PLATFORM_API}/users/profile/changePass/captcha`,
  // 修改手机号-获取验证码
  getChangeMobileCode: `${USERS_PLATFORM_API}/users/profile/changeMobile/captcha`,
  // 修改邮箱-获取验证码
  getChangeEmailCode: `${USERS_PLATFORM_API}/users/profile/changeEmail/captcha`,
  // 修改手机号
  changeMobile: `${USERS_PLATFORM_API}/users/profile/changeMobile`,
  // 修改邮箱
  changeEmail: `${USERS_PLATFORM_API}/users/profile/changeEmail`,
  // 重置密码
  resetUserPassword: `${USERS_PLATFORM_API}/users/resetPassword`
};

export default USERS_API;
