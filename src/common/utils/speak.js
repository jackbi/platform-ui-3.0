/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-03-31 13:41:20
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:20:11
 * @FilePath: /magus-platform-ui-3.0/src/common/utils/speak.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
export default class speak {
  constructor(speakArr) {
    this.synth = window.speechSynthesis;
    this.msg = new SpeechSynthesisUtterance();
    this.speakArr = speakArr;
    this.speakIndex = 0;
  }

  handleSpeak(text) {
    const _this = this;
    this.msg.text = text;
    this.msg.lang = 'zh-CN';
    this.msg.volume = '1';
    this.msg.rate = 1;
    this.msg.pitch = 1;
    this.msg.onend = function () {
      _this.speakIndex += 1;
      if (_this.speakIndex > _this.speakArr.length - 1) {
        _this.speakIndex = 0;
      }
      _this.handleSpeak(_this.speakArr[_this.speakIndex].message);
    };
    // msg.voiceURI = "Google 粤語（香港）"
    this.synth.speak(this.msg);
  }

  handleStop() {
    this.msg.text = '';
    this.msg.lang = 'zh-CN';
    this.msg.onend = null;
    this.msg.paused = true;
  }
}
