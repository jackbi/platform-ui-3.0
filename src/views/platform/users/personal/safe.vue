<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-03 13:50:51
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:35:43
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/users/personal/safe.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="">
    <el-form style="width: 50%" label-width="100px">
      <el-form-item :label="$t('global.password')">
        <div class="form-label">
          <span>*************</span>
          <el-button :text="true" @click="goChangePassword">
            {{ $t('global.action.edit') }}
          </el-button>
        </div>
        <div class="form-tips">{{ $t('platform.users.password_tips') }}</div>
      </el-form-item>
      <el-form-item :label="$t('platform.users.user_mobile')">
        <div class="form-label">
          <span>{{
            userInfo.mobile
              ? userInfo.mobile.substr(0, 3) +
                '****' +
                userInfo.mobile.substr(7)
              : ''
          }}</span>
          <el-button :text="true" @click="bindAccount('MOBILE')">
            {{ $t('global.action.edit') }}
          </el-button>
        </div>
        <div class="form-tips">{{ $t('platform.users.phone_tips') }}</div>
      </el-form-item>
      <el-form-item :label="$t('platform.users.user_email')">
        <div class="form-label">
          <span>{{ userInfo.email }}</span>
          <el-button :text="true" @click="bindAccount('EMAIL')">
            {{ $t('global.action.edit') }}
          </el-button>
        </div>
        <div class="form-tips">{{ $t('platform.users.email_tips') }}</div>
      </el-form-item>
    </el-form>
    <change-password ref="changePassword" />
    <bind-mobile-email
      ref="bindMobileEmail"
      :is-show="bindData.isShow"
      :bind-type="bindData.type"
      @cancel="bindData.isShow = false"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  computed
} from 'vue';
// import userApi from '@/api/users.js';
import { usePlatformStore } from '@/store/modules/index.js';
// import { useI18n } from 'vue-i18n';
import changePassword from '@/components/changePassword.vue';
import bindMobileEmail from '@/components/bindMobileEmail.vue';
export default defineComponent({
  name: 'Safe',
  components: {
    changePassword,
    bindMobileEmail
  },
  setup() {
    // const { t } = useI18n();
    const { proxy } = getCurrentInstance();
    const platformStore = usePlatformStore();
    // const { userInfo } = platformStore;
    let state = reactive({
      changePassData: {
        isShow: false
      },
      bindData: {
        type: '',
        isShow: false
      }
    });
    const methods = {
      goChangePassword() {
        proxy.$refs.changePassword.init();
      },
      /**
       * @description: 手机号、邮箱绑定
       * @param {*}
       * @return {*}
       */

      bindAccount(type) {
        state.bindData.type = type;
        if (type === 'MOBILE') {
          proxy.$refs.bindMobileEmail.init(platformStore.getUserInfo.mobile);
        }
        if (type === 'EMAIL') {
          proxy.$refs.bindMobileEmail.init(platformStore.getUserInfo.email);
        }
        state.bindData.isShow = true;
      }
    };
    return {
      ...toRefs(state),
      userInfo: computed(() => platformStore.getUserInfo),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.form-tips {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #b6bfca;
  line-height: 19px;
  margin-top: 11px;
}

.form-label {
  width: 100%;
  @include flexs();
  @include flexOther($flexOtherJustifybetween, $flexOtherPackjustify);
  span {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: #4e545f;
    // line-height: 21px;
  }
}
</style>
