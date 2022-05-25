/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 16:21:28
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:12:42
 * @FilePath: /magus-platform-ui-3.0/src/store/modules/alarm.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
import { defineStore } from 'pinia';
import * as types from '../mutation-types';
import SocketJs from '@/common/utils/socket.js';
import SpeakFun from '@/common/utils/speak.js';
import { ElNotification } from 'element-plus';
import magusUI from '@maguscloud/maguscloud-plus';
// import magusUI from '@maguscloud/maguscloud-plus/packages';

export const useAlarmStore = defineStore({
  id: 'alarmStore',
  state() {
    return {
      speakArr: [],
      speakInstance: null,
      alarmSocket: null,
      isConnect: false
    };
  },
  getters: {},
  actions: {
    [types.GET_ALARM_CONNECT_WEBSOCKET](url) {
      const _this = this;
      if (url) {
        const socket = new SocketJs(url);
        if (_this.alarmSocket) {
          _this.alarmSocket.disconnect();
          _this.isConnect = false;
        }
        _this.alarmSocket = socket;
        _this.alarmSocket.connect(() => {
          _this.isConnect = true;
          _this.alarmSocket.subscribe('/app/initialData', (res) => {
            _this.speakArr = res.data || [];
          });
          _this.alarmSocket.subscribe('/user/queue/add', (res) => {
            if (res && res.id) {
              _this.speakArr = [..._this.speakArr, ...[res]];
              ElNotification({
                title: '新的告警',
                type: 'warning',
                dangerouslyUseHTMLString: true,
                customClass: 'alarm-card',
                message: `
                  <div class="alarm-box">
                    <div class="alarm-box-item">
                      <div class="alarm-box-item-list">
                        <span class="alarm-box-item-list-title">告警级别：</span>
                        <span class="alarm-box-item-list-content" style="padding: 0 10px;color: #fff;background: ${magusUI.exportApi.commonUtils.getDictLabel(
                          'WARN_LEVEL_COLOR',
                          res.warnLevel
                        )}">${magusUI.exportApi.commonUtils.getDictLabel(
                  'WARN_LEVEL',
                  res.warnLevel
                )}</span>
                      </div>
                      <div class="alarm-box-item-list">
                        <span class="alarm-box-item-list-title">告警类型：</span>
                        <span class="alarm-box-item-list-content" style="color: ${
                          res.warnColor
                        }">${magusUI.exportApi.commonUtils.getDictLabel(
                  'WARN_STATUS',
                  res.status
                )}</span>
                      </div>
                    </div>
                    <div class="alarm-box-item">
                      <div class="alarm-box-item-list">
                        <span class="alarm-box-item-list-title">告警名称：</span>
                        <span class="alarm-box-item-list-content">${
                          res.warnName
                        }</span>
                      </div>
                      <div class="alarm-box-item-list">
                        <span class="alarm-box-item-list-title">告警值：</span>
                        <span class="alarm-box-item-list-content">${
                          res.latestValue
                        }</span>
                      </div>
                    </div>
                    <div class="alarm-box-item">
                      <div class="alarm-box-item-list" style="width: 100%">
                        <span class="alarm-box-item-list-title">告警描述：</span>
                        <span class="alarm-box-item-list-content">${
                          res.warnDesc
                        }</span>
                      </div>
                    </div>
                  </div>
                `
              });
            }
          });
          _this.alarmSocket.subscribe('/user/queue/reduce', (res) => {
            if (res && res.id) {
              const index = _this.speakArr.findIndex((i) => i.id === res.id);
              if (index !== -1) {
                _this.speakArr.splice(index, 1);
              }
            }
          });
        });
      }
    },
    [types.GET_ALARM_SPEAK_INIT](url) {
      const _this = this;
      if (url) {
        _this.speakInstance = new SpeakFun(_this.speakArr);
      }
    }
  }
});
