/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-08-23 09:28:44
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-16 17:13:44
 * @FilePath: /magus-platform-ui-3.0/src/common/plugin/filters.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */

import * as iconfont from '../resource/iconfont';

export const getImage = function (val) {
  if (val && val.indexOf('base64') !== -1) {
    return val;
  } else {
    return `/api/docCenter/download/${val}`;
  }
};

/**
 * @description: 获取分组图标颜色
 * @param {*} val
 * @return {*}
 */
export const getGroupIconColor = function (val) {
  if (!val) {
    return '';
  }
  let color = '';
  iconfont.groupIcon.forEach((el) => {
    if (el.icon === val) {
      color = el.color;
    }
  });
  return color;
};

export const magusIconClass = function (node, data) {
  return data.icon;
};

export const magusIconStyle = function (node, data) {
  let datas = {
    color: getGroupIconColor(data.icon) || '#2B78FF'
  };
  return datas;
};
