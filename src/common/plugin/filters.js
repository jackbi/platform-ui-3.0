/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-08-23 09:28:44
 * @LastEditors: wenbin
 * @LastEditTime: 2022-06-06 10:14:56
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

export const CHECK_URL = function (url) {
  // url= 协议://(ftp的登录信息)[IP|域名](:端口号)(/或?请求参数)
  let strRegex =
    '^((https|http|ftp)://)?' + // (https或http或ftp):// 可有可无
    "(([\\w_!~*'()\\.&=+$%-]+: )?[\\w_!~*'()\\.&=+$%-]+@)?" + // ftp的user@  可有可无
    '(([0-9]{1,3}\\.){3}[0-9]{1,3}' + // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
    '|' + // 允许IP和DOMAIN（域名）
    '(localhost)|' + // 匹配localhost
    "([\\w_!~*'()-]+\\.)*" + // 域名- 至少一个[英文或数字_!~*\'()-]加上.
    '\\w+\\.' + // 一级域名 -英文或数字  加上.
    '[a-zA-Z]{1,6})' + // 顶级域名- 1-6位英文
    '(:[0-9]{1,5})?' + // 端口- :80 ,1-5位数字
    '((/?)|' + // url无参数结尾 - 斜杆或这没有
    "(/[\\w_!~*'()\\.;?:@&=+$,%#-]+)+/?)$"; // 请求参数结尾- 英文或数字和[]内的各种字符

  // var strRegex1 = '^(?=^.{3,255}$)((http|https|ftp)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/)?(?:\/(.+)\/?$)?(\/\w+\.\w+)*([\?&]\w+=\w*|[\u4e00-\u9fa5]+)*$';
  let re = new RegExp(strRegex, 'i'); // i不区分大小写
  // console.log(re);
  // 将url做uri转码后再匹配，解除请求参数中的中文和空字符影响
  if (re.test(encodeURI(url))) {
    return true;
  } else {
    return false;
  }
};

// 格式化url
export const formatData = function (datas, magusUI) {
  if (magusUI.judgeUtils.isArray(datas)) {
    datas.forEach((item) => {
      if (item.extend && item.extend.appUri && item.extend.uri) {
        if (CHECK_URL(item.extend.uri)) {
          return;
        } else {
          item.extend.uri = item.extend.appUri + item.extend.uri;
          let urlParams = '';
          if (item.extend.params && item.extend.params !== '{}') {
            let params = JSON.parse(item.extend.params);
            urlParams = magusUI.commonUtils.queryParams(params, false);
            if (item.extend.uri.indexOf('?') !== -1) {
              item.extend.routerUrl = `${item.extend.uri}&${urlParams}`;
            } else {
              item.extend.routerUrl = `${item.extend.uri}?${urlParams}`;
            }
          } else {
            item.extend.routerUrl = `${item.extend.uri}`;
          }
        }
      }
      if (item.children && item.children.length) {
        formatData(item.children);
      }
    });
  }
  if (magusUI.judgeUtils.isObj(datas)) {
    if (datas.extend && datas.extend.appUri && datas.extend.uri) {
      if (CHECK_URL(datas.extend.uri)) {
        return;
      }
      datas.extend.uri = datas.extend.appUri + datas.extend.uri;
      let urlParams = '';
      if (datas.extend.params && datas.extend.params !== '{}') {
        let params = JSON.parse(datas.extend.params);
        urlParams = magusUI.commonUtils.queryParams(params, false);
        if (datas.extend.uri.indexOf('?') !== -1) {
          datas.extend.routerUrl = `${datas.extend.uri}&${urlParams}`;
        } else {
          datas.extend.routerUrl = `${datas.extend.uri}?${urlParams}`;
        }
      } else {
        datas.extend.routerUrl = `${datas.extend.uri}`;
      }
    }
  }
};
