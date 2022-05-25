/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-07-06 14:29:08
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:19
 * @FilePath: /magus-platform-ui-3.0/src/api/dicts.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const MAGUS_PLATFORM_API = import.meta.env.VITE_APP_MAGUS_PLATFORM_API;

const DICTS_API = {
  // 字典分类
  getDictsType: `${MAGUS_PLATFORM_API}/dicts/types`,
  // 应用列表
  getAllApps: `${MAGUS_PLATFORM_API}/dicts/apps`,
  // 新增字典类型
  createDictType: `${MAGUS_PLATFORM_API}/dicts/types`,
  // 新增字典类型
  writeDictType: (id) => `${MAGUS_PLATFORM_API}/dicts/types/${id}`,
  // 通过id获取字典详情
  getDictTypeById: (id) => `${MAGUS_PLATFORM_API}/dicts/types/${id}`,
  // 通过id获取字典详情
  deleteDictTypeById: (id) => `${MAGUS_PLATFORM_API}/dicts/types/${id}`,
  // 获取字典项
  getEntrys: `${MAGUS_PLATFORM_API}/dicts/entrys`,
  // 新增字典项
  createEntrys: `${MAGUS_PLATFORM_API}/dicts/entrys`,
  // 编辑字典项
  writeEntrys: (id) => `${MAGUS_PLATFORM_API}/dicts/entrys/${id}`,
  // 通过ID获取字典项信息
  getEntrysById: (id) => `${MAGUS_PLATFORM_API}/dicts/entrys/${id}`
};

export default DICTS_API;
