/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-27 15:07:30
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:29
 * @FilePath: /magus-platform-ui-3.0/src/api/message.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_MBOXMS_EXCEPTION_API = import.meta.env
  .VITE_APP_MAGUS_MBOXMS_EXCEPTION_API;
const MAGUS_MASSAGE_API = {
  // 获取异常数量
  getExceptionNum: `${MAGUS_MBOXMS_EXCEPTION_API}/count`
};

export default MAGUS_MASSAGE_API;
