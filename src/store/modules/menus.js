/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-20 11:42:55
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:18:59
 * @FilePath: /magus-platform-ui-3.0/src/store/modules/menus.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
import { defineStore } from 'pinia';
import * as types from '../../../mutation-types';
import menuApi from '@/api/menus.js';

export const useMenuStore = defineStore({
  id: 'menuStore',
  state() {
    return {
      menusTree: []
    };
  },
  getters: {
    getMenusTree: function () {
      return this.menusTree;
    }
  },
  actions: {
    [types.GET_MENUS_TREE](magusUI) {
      const _this = this;
      return new Promise((resolve, reject) => {
        magusUI.apiConfig
          .get(menuApi.getMenusTree)
          .then((res) => {
            const treeNode = [
              {
                nodeId: 'root',
                nodePid: 'root',
                entityId: 'root',
                entityType: 'root',
                icon: 'magusdipjiankong-',
                text: '菜单树',
                leaf: false,
                checked: false,
                expanded: false,
                extend: {
                  appUri: '',
                  uri: '',
                  uriType: '',
                  params: ''
                },
                children: []
              }
            ];
            treeNode[0].children = res.children;
            _this.menusTree = treeNode;
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
});
