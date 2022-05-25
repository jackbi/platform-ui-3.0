<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-13 14:30:43
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 14:42:55
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/auths/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout class="container-inner">
    <!-- 左侧树空间，如果不需要请删除 -->
    <template #layoutLeft>
      <div v-loading="loading" class="platform-auths-roles">
        <div class="platform-auths-rolesinput">
          <el-input
            v-model="searchName"
            size="small"
            :placeholder="$t('platform.roles.role_name')"
          />
        </div>
        <ul class="platform-auths-rolescontent">
          <li
            v-for="(item, index) in roleList.filter(
              (item) => item.name.indexOf(searchName) != -1
            )"
            :key="index"
            :class="item.id === checkedRoleData.id ? 'active' : ''"
            @click="checkRole(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </template>
    <!-- 上方TAB空间，如果不需要请删除 -->
    <template #layoutTab>
      <magus-tab :tab-data="tabData" @go-path="goPath">
        <template #tabName>{{ checkedRoleData.name }}</template>
      </magus-tab>
    </template>
    <!-- 内容部分 -->
    <template #layoutMain>
      <!--  -->
      <router-view />
    </template>
  </magus-main-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import auths from '@/api/auth.js';
export default defineComponent({
  name: 'PlatformAuths',
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      treeData: [],
      tabData: [
        { text: t('platform.auth.fun_auth'), path: '/platform/auths/page' },
        {
          text: t('platform.auth.user_auth'),
          path: '/platform/auths/users'
        }
      ],
      checkedRoleData: {},
      searchName: '',
      roleList: [],
      loading: false
    });
    const methods = {
      /**
       * @description: 获取角色
       * @param {*}
       * @return {*}
       */

      init() {
        methods.getRoles();
      },
      goPath(datas) {
        router.push({ path: datas.path, query: route.query });
      },
      clickNode(datas) {
        return datas;
      },
      checkRole(datas) {
        const routerName = route.name;
        const whitePath = ['platformAuthsPage', 'platformAuthsUsers'];
        state.checkedRoleData = datas;
        if (whitePath.findIndex((i) => i === routerName) != -1) {
          router.push({ query: { id: datas.id } });
        } else {
          router.push({
            name: 'platformAuthsPage',
            query: { id: datas.id }
          });
        }
      },
      /**
       * @description: 获取所有角色
       * @param {*}
       * @return {*}
       */

      getRoles() {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .get(auths.getAuthRoles, {})
          .then((res) => {
            state.roleList = res;
            const {
              query: { id }
            } = route;
            if (res && res.length) {
              if (id) {
                const roleData = res.find((i) => i.id === id);
                state.checkedRoleData = roleData;
              } else {
                state.checkedRoleData = res[0];
                router.push({ query: { id: res[0].id } });
              }
            }
          })
          .finally(() => {
            state.loading = false;
          });
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.platform-auths-roles {
  width: 100%;
  height: 100%;
  position: relative;
  .platform-auths-rolesinput {
    position: absolute;
    width: 100%;
    height: 100%;
    height: 35px;
    top: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding: 5px 15px;
  }
  .platform-auths-rolescontent {
    box-sizing: border-box;
    padding-top: 45px;
    height: 100%;
    overflow: auto;
    li {
      line-height: 35px;
      height: 35px;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      padding-left: 15px;
      border-left: 4px solid transparent;
      &:hover {
        background-color: #e6e6ff;
        border-left-color: #cccce6;
      }
    }
    li.active {
      background-color: #e6e6ff;
      border-left-color: #cccce6;
    }
  }
}
</style>
