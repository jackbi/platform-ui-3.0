/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-20 11:17:25
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:18:51
 * @FilePath: /magus-platform-ui-3.0/src/store/modules/apps.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
import * as types from '../../../mutation-types';
import appsApi from '@/api/apps.js';

export default {
  state: {
    appsTree: []
  },
  getters: {
    appsTree: (state) => state.appsTree
  },
  mutations: {
    [types.SET_APPS_TREE](state, datas) {
      state.appsTree = datas;
    }
  },
  actions: {
    [types.GET_APPS_TREE]({ commit }, magusUI) {
      return new Promise((resolve, reject) => {
        magusUI.apiConfig
          .get(appsApi.getAppsTree)
          .then((res) => {
            const treeNode = [
              {
                nodeId: 'root',
                nodePid: 'root',
                entityId: 'root',
                entityType: 'root',
                icon: 'magusdipjiankong-',
                text: '应用功能树',
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
            commit('SET_APPS_TREE', treeNode);
            resolve(treeNode);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
};
