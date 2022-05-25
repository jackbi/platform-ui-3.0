/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-07 10:05:07
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:33
 * @FilePath: /magus-platform-ui-3.0/src/api/register.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

const REGISTER_API = {
  // 校验登陆id是否存在
  validateLoginId: `${MAGUS_PLATFORM_API}/register/user/exist`,
  // 注册用户
  registerUser: `${MAGUS_PLATFORM_API}/register/user`,
  // 校验企业code是否存在
  validateTenant: `${MAGUS_PLATFORM_API}/register/tenant/exist`,
  // 创建企业
  createEnterprice: `${MAGUS_PLATFORM_API}/register/tenant`,
  // 请求验证码
  getCapcha: `${MAGUS_PLATFORM_API}/register/user/captcha`
};

export default REGISTER_API;
