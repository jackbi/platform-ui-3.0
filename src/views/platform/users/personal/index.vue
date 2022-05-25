<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-03 13:49:57
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:35:34
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/users/personal/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="userInfo">
    <magus-main-layout>
      <template #layoutTab>
        <magus-tab :tab-data="tabData" @go-path="goPath">
          <template #tabName>
            {{ $t('platform.users.user_info_center') }}
          </template>
        </magus-tab>
      </template>
      <!-- 内容部分 -->
      <template #layoutMain>
        <router-view />
      </template>
    </magus-main-layout>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'UserInfo',
  components: {},
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    let state = reactive({
      tabData: [
        {
          text: t('platform.users.user_basic_info'),
          path: '/platform/personal/basic'
        },
        {
          text: t('platform.users.user_safe_info'),
          path: '/platform/personal/safe'
        }
      ]
    });
    const methods = {
      handleSizeChange() {},
      handleCurrentChange() {},
      goPath(datas) {
        router.push({ path: datas.path });
      }
    };
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.userInfo {
  height: 100%;
  width: 100%;
}
</style>
