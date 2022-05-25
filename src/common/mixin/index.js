/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-12-09 11:45:27
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-17 16:49:37
 * @FilePath: /magus-platform-ui-3.0/src/common/mixin/index.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
export const aliveBase = {
  methods: {
    /**
     * @description: 数据重制
     * @param {*} val
     * @return {*}
     */

    reset(val) {
      console.log(val);
      for (let i in val) {
        if (!['page', 'dir', 'sort', 'limit'].includes(i)) {
          val[i] = '';
        }
      }
    }
  },
  activated() {
    /**
     * @description: 初始化，页面当中必须包含初始化方法
     * @param {*}
     * @return {*}
     */
    // this.init();
    console.log('111');
  },
  /**
   * @description: 进入页面之前判定是否属于同类
   * @param {*} to
   * @param {*} from
   * @param {*} next
   * @return {*}
   */

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.meta.aliveName !== from.meta.aliveName) {
        vm.reset(vm.query);
      }
    });
  }
};
