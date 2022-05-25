<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 11:46:20
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 13:46:47
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/users/add.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template
    :title="
      $route.query.id
        ? $t('platform.users.user_edit')
        : $t('platform.users.user_add')
    "
  >
    <template #main>
      <el-form
        ref="formRef"
        :model="userInfo"
        :rules="rules"
        label-width="80px"
        style="padding: 10px 0"
        size="small"
      >
        <el-form-item :label="$t('platform.users.user_name')" prop="loginId">
          <el-input
            v-model="userInfo.loginId"
            :disabled="Boolean($route.query.id)"
            :placeholder="$t('platform.users.user_name')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.users.nick_name')" prop="userName">
          <el-input
            v-model="userInfo.userName"
            :placeholder="$t('platform.users.nick_name')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.users.user_status')" prop="status">
          <el-radio-group v-model="userInfo.status" size="small">
            <el-radio-button label="LOCKED"> 锁定 </el-radio-button>
            <el-radio-button label="NORMAL"> 正常 </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('platform.users.user_mobile')" prop="mobile">
          <el-input
            v-model="userInfo.mobile"
            :placeholder="$t('platform.users.user_mobile')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.users.user_email')" prop="email">
          <el-input
            v-model="userInfo.email"
            :placeholder="$t('platform.users.user_email')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.users.user_wechat')">
          <el-input
            v-model="userInfo.wechat"
            :placeholder="$t('platform.users.user_wechat')"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div>
        <el-button size="small" @click="$back()">
          {{ $t('global.action.back') }}
        </el-button>
        <el-button
          v-loading="saveLoading"
          size="small"
          type="primary"
          @click="goSave"
        >
          {{ $t('global.action.save') }}
        </el-button>
      </div>
    </template>
  </magus-add-template>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import userApi from '@/api/users.js';
export default defineComponent({
  name: 'PlatformUsersAdd',
  setup() {
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const formRef = ref();
    const route = useRoute();
    const state = reactive({
      userInfo: {
        id: '',
        avatar: '',
        email: '',
        loginId: '',
        mobile: '',
        status: 'LOCKED',
        userName: '',
        wechat: ''
      },
      saveLoading: false,
      rules: {
        loginId: [
          {
            pattern: proxy.$magusCloudApi.validateUtils.en_num_line(3, 20),
            required: true,
            message: t('platform.users.user_name_validate'),
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: t('platform.users.nick_name'),
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: t('platform.users.status'),
            trigger: 'change'
          }
        ],
        mobile: [
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            // required: true,
            message: t('platform.users.user_mobile_validate'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            pattern: proxy.$magusCloudApi.validateUtils.email(0, 50),
            // required: true,
            message: t('platform.users.user_email_validate'),
            trigger: 'blur'
          }
        ]
      }
    });
    const methods = {
      init() {
        const {
          query: { id }
        } = route;
        if (id) {
          methods.getUserById(id);
        }
      },
      /**
       * @description: 点击保存
       * @param {*}
       * @return {*}
       */

      goSave() {
        formRef.value.validate((valid) => {
          if (valid) {
            state.saveLoading = true;
            const {
              query: { id }
            } = route;
            if (id) {
              methods.goEditUser(state.userInfo);
            } else {
              methods.goCreateUser(state.userInfo);
            }
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 编辑用户
       * @param {*} datas
       * @return {*}
       */

      goEditUser(datas) {
        proxy.$magusCloudApi.apiConfig
          .put(userApi.putUserById(datas.id), datas)
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            proxy.$back();
          })
          .finally(() => {
            state.saveLoading = false;
          });
      },
      /**
       * @description: 新增用户信息
       * @param {*} datas
       * @return {*}
       */

      goCreateUser(datas) {
        const userInfo = proxy.$magusCloudApi.commonUtils.deepCopy(datas);
        if (userInfo.id) {
          delete userInfo.id;
        }
        proxy.$magusCloudApi.apiConfig
          .post(userApi.addUser, userInfo)
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            proxy.$back();
          })
          .finally(() => {
            state.saveLoading = false;
          });
      },
      /**
       * @description: 通过id 获取用户信息
       * @param {*} id
       * @return {*}
       */

      getUserById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(userApi.getUserById(id), {})
          .then((res) => {
            Object.keys(state.userInfo).forEach((i) => {
              state.userInfo[i] = res[i];
            });
          })
          .catch(() => {});
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      ...methods,
      formRef
    };
  }
});
</script>
