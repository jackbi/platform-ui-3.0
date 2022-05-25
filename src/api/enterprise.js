/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-09 14:56:32
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:21
 * @FilePath: /magus-platform-ui-3.0/src/api/enterprise.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

const ENTERPRICE_API = {
  // 企业列表
  getEnterprice: `${MAGUS_PLATFORM_API}/tenants/pageAll`,
  // 修改企业状态
  changeEnterpriceStatus: (id) => `${MAGUS_PLATFORM_API}/tenants/${id}/status`,
  // 获取当前登陆人的企业信息
  getCurrentEnterprice: `${MAGUS_PLATFORM_API}/tenants/current`,
  // 获取企业定制化信息
  getTenantCustomsCurrent: `${MAGUS_PLATFORM_API}/tenantCustoms/current`,
  // 保存企业定制化信息
  saveTenantCustomsCurrent: `${MAGUS_PLATFORM_API}/tenantCustoms`,
  // 模糊搜索企业
  getRemoteEnterprice: `${MAGUS_PLATFORM_API}/joinTenants/findTenant`,
  // 加入企业
  joinEnterprice: `${MAGUS_PLATFORM_API}/joinTenants`,
  // 获取加入企业列表
  getJoinTenants: `${MAGUS_PLATFORM_API}/joinTenants`,
  // 加入企业审批
  changeJoinTenants: (id) => `${MAGUS_PLATFORM_API}/joinTenants/${id}/status`
};

export default ENTERPRICE_API;
