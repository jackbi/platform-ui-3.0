<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-04-13 11:23:15
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:34:01
 * @FilePath: /magus-platform-ui-3.0/src/views/login/index.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="login">
    <el-image
      class="login-bg"
      :src="
        systemInfo.background
          ? $filters.getImage(systemInfo.background)
          : imgUrl
      "
    />
    <div class="login-mask" />
    <div class="login-content">
      <component
        :is="loginType"
        :system-info="systemInfo"
        :is-show-register="isShowRegister"
        :is-show-login-by-captcha="isShowLoginByCaptcha"
        @change-login-type="changeLoginType"
      />
    </div>
    <div v-show="systemInfo.showBeian !== false" class="login-copyright">
      <magus-footer
        v-if="
          (systemInfo.copyright !== '' &&
            systemInfo.copyright !== undefined &&
            systemInfo.copyright !== null) ||
          (systemInfo.icp !== '' &&
            systemInfo.icp !== undefined &&
            systemInfo.icp !== null)
        "
        :copyright="systemInfo.copyright"
        :i-c-p="systemInfo.icp"
      />
    </div>
    <!-- <magus-login
      :title="systemInfo.title1"
      :subTitle="systemInfo.title2"
      :imgUrl="imgUrl"
      :isShowFooter="
        (systemInfo.copyright !== '' &&
          systemInfo.copyright !== undefined &&
          systemInfo.copyright !== null) ||
          (systemInfo.icp !== '' &&
            systemInfo.icp !== undefined &&
            systemInfo.icp !== null)
      "
      @submit="submit"
    ></magus-login> -->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  nextTick,
  computed
} from 'vue';
import { usePlatformStore } from '@/store/modules/index.js';
import login from './components/login.vue';
import register from './components/register.vue';
export default defineComponent({
  components: {
    login,
    register
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const platformStore = usePlatformStore();
    const { getSystemInfo } = platformStore;
    let state = reactive({
      imgUrl: '/image/loginBg.png',
      loading: false,
      loginType: 'login',
      isShowRegister: '',
      isShowLoginByCaptcha: ''
    });
    const methods = {
      getIsShowRegister() {
        const getSignupEnable = proxy.$magusCloudApi.commonUtils.getParamsValue(
          proxy.$params.getSignupEnable
        );
        const getLoginByCaptcha =
          proxy.$magusCloudApi.commonUtils.getParamsValue(
            proxy.$params.getLoginByCaptcha
          );

        state.isShowRegister = getSignupEnable;
        state.isShowLoginByCaptcha = getLoginByCaptcha;
      },
      /**
       * @description: 跳转注册
       * @param {*}
       * @return {*}
       */

      changeLoginType(type) {
        state.loginType = type;
        nextTick(() => {
          if (proxy.$refs.registerForm) {
            proxy.$refs.registerForm.resetFields();
          }
          if (proxy.$refs.loginForm) {
            proxy.$refs.loginForm.resetFields();
          }
        });
      }
    };
    onMounted(() => {
      window.addEventListener('setParams', () => {
        methods.getIsShowRegister();
      });
      methods.getIsShowRegister();
    });
    return {
      ...toRefs(state),
      systemInfo: computed(() => getSystemInfo),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login-bg {
    width: 100%;
    height: 100%;
  }
  .login-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 71, 141, 0.75);
  }
  .login-content {
    width: 449.99px;
    height: 500.004px;
    background: #ffffff;
    border-radius: 5.984px;
    box-shadow: 0px 5.984px 41.004px 4.998px rgba(4, 97, 135, 0.15);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    @include flexs();
    @include flexOther();
  }
  .login-copyright {
    position: absolute;
    bottom: 9.996px;
    left: 0;
    right: 0;
    width: 100%;
  }
}
</style>
