<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 13:20:16
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 10:48:31
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/roles/add.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-add-template
    :title="
      $route.query.id ? $t('platform.roles.edit') : $t('platform.roles.add')
    "
  >
    <template #main>
      <el-form
        ref="formRef"
        :model="roleInfo"
        :rules="rules"
        label-width="80px"
        style="padding: 10px 0"
        size="small"
      >
        <el-form-item :label="$t('platform.roles.role_name')" prop="name">
          <el-input
            v-model="roleInfo.name"
            :placeholder="$t('platform.roles.role_name')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.roles.role_code')" prop="code">
          <el-input
            v-model="roleInfo.code"
            :placeholder="$t('platform.roles.role_code')"
            :disabled="Boolean($route.query.id)"
          >
            <template #prepend>
              {{ userInfo.tenantCode + '@' }}
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('platform.roles.role_type')">
          <magus-dict-select
            v-model="roleInfo.type"
            :code="$dicts.rolesTypes"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.apps.remark')">
          <el-input
            v-model="roleInfo.remark"
            type="textarea"
            :rows="4"
            resize="none"
            :placeholder="$t('platform.apps.remark')"
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
          size="small"
          :loading="saveLoading"
          type="primary"
          @click="goSave()"
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
  getCurrentInstance,
  computed,
  onMounted
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import rolesApi from '@/api/roles.js';
import { usePlatformStore } from '@/store/modules/index.js';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'PlatformUsersAdd',
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const platformStore = usePlatformStore();
    const formRef = ref();
    const { t } = useI18n();
    let state = reactive({
      roleInfo: {
        code: '',
        name: '',
        remark: '',
        type: 'GENERAL'
      },
      tenantCode: '',
      saveLoading: false,
      rules: {
        code: [
          {
            required: true,
            message: t('platform.roles.role_code'),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: t('platform.roles.role_name'),
            trigger: 'blur'
          }
        ]
      }
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        const routerData = route.query;
        if (routerData.id) {
          methods.getRoleById(routerData.id);
        }
      },
      /**
       * @description: 编辑角色
       * @param {*} datas
       * @return {*}
       */

      editRole(datas) {
        proxy.$magusCloudApi.apiConfig
          .put(rolesApi.putRoleById(datas.id), datas)
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            router.back();
            state.saveLoading = false;
          })
          .catch(() => {
            state.saveLoading = false;
          });
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
            const routerData = route.query;
            if (routerData.id) {
              methods.editRole(state.roleInfo);
            } else {
              methods.createRole(state.roleInfo);
            }
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 新增角色
       * @param {*} datas
       * @return {*}
       */

      createRole(datas) {
        proxy.$magusCloudApi.apiConfig
          .post(rolesApi.addRole, datas)
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            router.back();
            state.saveLoading = false;
          })
          .catch(() => {
            state.saveLoading = false;
          });
      },
      /**
       * @description: 通过id 获取角色信息
       * @param {*} id
       * @return {*}
       */

      getRoleById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(rolesApi.getRoleById(id), {})
          .then((res) => {
            state.roleInfo = res;
          })
          .catch(() => {});
      }
    };
    onMounted(() => {
      methods.init();
    });
    return {
      ...toRefs(state),
      userInfo: computed(() => platformStore.getUserInfo),
      formRef,
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.platform-users-add {
  width: 100%;
  height: 100%;
}
</style>
