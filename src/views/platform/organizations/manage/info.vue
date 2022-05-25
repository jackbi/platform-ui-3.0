<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-02-18 14:29:29
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 10:19:54
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/organizations/manage/info.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <magus-add-template
    :title="
      $route.name === 'platformOrgsPageAgencyinfo'
        ? $t('platform.orgs.manage.agency_info')
        : $route.name === 'platformOrgsPageEditAgency'
        ? $t('platform.orgs.manage.edit_agency')
        : $t('platform.orgs.manage.add_agency')
    "
  >
    <template #main>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        size="small"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('platform.orgs.manage.org_name')" prop="name">
          <el-input
            v-model="formData.name"
            :placeholder="$t('platform.orgs.manage.org_name')"
          />
        </el-form-item>
        <el-form-item :label="$t('platform.orgs.manage.org_code')" prop="code">
          <el-input
            v-model="formData.code"
            :placeholder="$t('platform.orgs.manage.org_code')"
            :disabled="$route.name !== 'platformOrgsPageAddAgency'"
          />
        </el-form-item>
        <el-form-item
          :label="$t('platform.orgs.manage.org_level')"
          prop="levelId"
        >
          <el-select
            v-model="formData.levelId"
            :disabled="$route.name !== 'platformOrgsPageAddAgency'"
            :placeholder="$t('platform.orgs.manage.org_level')"
            clearable
            filterable
          >
            <el-option
              v-for="item in allLevel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('platform.orgs.manage.org_sort')" prop="order">
          <el-input
            v-model="formData.order"
            :placeholder="$t('platform.orgs.manage.org_sort')"
          />
        </el-form-item>
        <el-form-item :label="$t('global.table.description')" prop="remark">
          <el-input
            v-model="formData.remark"
            type="textarea"
            resize="none"
            :rows="3"
            :placeholder="$t('global.table.description')"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button
        v-show="$route.name === 'platformOrgsPageAddAgency'"
        size="small"
        @click="$back()"
      >
        {{ $t('global.action.back') }}
      </el-button>
      <el-button type="primary" :loading="loading" size="small" @click="save">
        {{ $t('global.action.save') }}
      </el-button>
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
  inject,
  watch
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import orgApi from '@/api/organizations.js';
export default defineComponent({
  name: 'OrgInfo',
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props) {
    const getTree = inject('getTree');
    const { nodeData } = toRefs(props);
    const formRef = ref();
    const { t } = useI18n();
    const route = useRoute();
    const {
      params: { entityId },
      name
    } = route;
    const { proxy } = getCurrentInstance();
    const state = reactive({
      formData: {
        code: '',
        levelId: '',
        name: '',
        order: 0,
        remark: '',
        parentId: ''
      },
      formRules: {
        name: [
          {
            required: true,
            message: t('platform.orgs.manage.org_name'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.orgs.manage.org_code'),
            trigger: 'blur'
          }
        ],
        levelId: [
          {
            required: true,
            message: t('platform.orgs.manage.org_level'),
            trigger: 'change'
          }
        ]
      },
      loading: false,
      allLevel: []
    });
    const methods = {
      async init() {
        await methods.getAllOrgLevel();
        if (name !== 'platformOrgsPageAddAgency') {
          methods.getOrgInfo();
        }
      },
      /**
       * @description: 获取机构信息
       * @param {*}
       * @return {*}
       */

      getOrgInfo() {
        proxy.$magusCloudApi.apiConfig
          .get(orgApi.getOrgById(entityId))
          .then((res) => {
            Object.keys(state.formData).forEach((item) => {
              state.formData[item] = res[item];
            });
          });
      },
      /**
       * @description: 获取所有的层级
       * @param {*}
       * @return {*}
       */

      getAllOrgLevel() {
        const { extend } = nodeData.value;
        return new Promise((resolve, reject) => {
          proxy.$magusCloudApi.apiConfig
            .get(orgApi.getAllLevel)
            .then((res) => {
              if (
                extend &&
                extend.levelName &&
                name === 'platformOrgsPageAddAgency'
              ) {
                state.allLevel = res.filter((i) => i.level > extend.levelNo);
              } else {
                state.allLevel = res;
              }

              resolve(state.allLevel);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */

      save() {
        formRef.value.validate((valid) => {
          if (valid) {
            let method, api;
            let params = proxy.$magusCloudApi.commonUtils.deepCopy(
              state.formData
            );
            if (name === 'platformOrgsPageAddAgency') {
              method = 'post';
              api = orgApi.addOrg;
              params.parentId = entityId !== 'root' ? entityId : '';
            } else {
              method = 'put';
              api = orgApi.editOrgById(entityId);
            }
            state.loading = true;
            proxy.$magusCloudApi.apiConfig[method](api, params)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                getTree();
                if (name !== 'platformOrgsPageAgencyinfo') {
                  proxy.$back();
                }
              })
              .finally(() => {
                state.loading = false;
              });
          } else {
            return false;
          }
        });
      }
    };
    const { extend } = nodeData.value;
    if (nodeData.value && extend) {
      methods.init();
    }
    watch(
      () => nodeData.value,
      () => {
        methods.init();
      },
      { flush: 'post' }
    );
    return {
      ...toRefs(state),
      ...methods,
      formRef
    };
  }
});
</script>
