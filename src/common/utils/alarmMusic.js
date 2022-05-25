/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-01 10:06:36
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-10 11:50:13
 * @FilePath: /magus-platform-ui-3.0/src/common/utils/alarmMusic.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
window.AudioContext =
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.msAudioContext;

const context = new window.AudioContext();
export let source = null;
let audioBuffer = null;

export const stopSound = function () {
  if (source) {
    source.stop(0); // 立即停止
  }
};

export const playSound = function () {
  source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = true; // 循环播放
  source.connect(context.destination);
  source.start(0); // 立即播放
};

export const initSound = function (arrayBuffer) {
  context.decodeAudioData(
    arrayBuffer,
    function (buffer) {
      // 解码成功时的回调函数
      audioBuffer = buffer;
      playSound();
    },
    function (e) {
      // 解码出错时的回调函数
      console.log('Error decoding file', e);
    }
  );
};

export const loadAudioFile = function (url) {
  const xhr = new XMLHttpRequest(); // 通过XHR下载音频文件
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    // 下载完成
    initSound(this.response);
  };
  xhr.send();
};
