/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-03-31 13:20:34
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:20:33
 * @FilePath: /magus-platform-ui-3.0/src/common/utils/socket.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-06-01 14:37:50
 * @LastEditors: wenbin
 * @LastEditTime: 2022-03-25 15:29:53
 * @FilePath: /cloud-data-center-ui/src/common/utils/socket.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import Stomp from 'stompjs';
// import '../link/sockjs.min.js';
// import '../link/stomp.min.js';
// var SockJS = require('../link/sockjs.min.js')
// var Stomp = require('../link/stomp.min.js')

class socket {
  constructor(socketUrl) {
    // debugger;
    this.sock = new SockJS(socketUrl);
    // console.log(this.sock);
  }

  initWebSocket(callback) {
    // this.connect(callback)
    const self = this;
    // 断开重连机制,尝试发送消息,捕获异常发生时重连

    this.timer = setInterval(() => {
      self.connect(callback);
    }, 5000);
  }

  connect(callback) {
    this.stompClient = Stomp.over(this.sock);
    this.stompClient.debug = null;
    const userInfo = localStorage.getItem('userInfo');
    const sendData = {};
    if (userInfo) {
      const userInfoData = JSON.parse(userInfo);
      sendData.token_login_id = `${userInfoData.loginId}`;
    }
    // const token = sessionStorage.getItem('cookieaccess_token')
    // 向服务器发起websocket连接
    this.stompClient.connect(
      sendData,
      () => {
        // console.log('connect', url);
        // console.log('connect', message);
        // this.subscribe(url)
        console.log('成功');
        if (this.timer) {
          clearInterval(this.timer);
        }
        callback();
      },
      (error) => {
        console.log('error_connect', error);
        console.log(this.sock);
        this.initWebSocket(callback);
      }
    );
  }

  sender(url, datas = {}) {
    this.stompClient.send(url, {}, JSON.stringify(datas));
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      if (this.timer) {
        clearInterval(this.timer);
      }
      console.log('Disconnected');
    }
  }

  subscribe(url, callback) {
    // 订阅公告
    const _this = this;
    _this.stompClient.subscribe(url, function (msg) {
      if (msg && msg.body) {
        callback(JSON.parse(msg.body));
      }
    });
  }
}

export default socket;
