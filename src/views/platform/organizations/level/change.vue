<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-02-17 11:56:37
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 17:16:42
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/organizations/level/change.vue
 * Copyright (C) 2022 wenbin. All rights reserved.
-->
<template>
  <div class="addOrEdit">
    <magus-add-template
      :title="
        $route.params.id
          ? $t('platform.orgs.hierarchy.edit')
          : $t('platform.orgs.hierarchy.add')
      "
    >
      <template #main>
        <el-form
          ref="formRef"
          size="small"
          :model="formData"
          :rules="formRules"
          label-width="100px"
        >
          <el-form-item :label="$t('platform.orgs.hierarchy.name')" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item
            :label="$t('platform.orgs.hierarchy.level')"
            prop="level"
          >
            <el-input-number
              v-model="formData.level"
              :disabled="Boolean($route.params.id)"
              :min="0"
            />
          </el-form-item>
          <el-form-item
            :label="$t('platform.orgs.hierarchy.icon')"
            prop="level"
          >
            <label class="icon-view" @click="chooseIcon">
              <magus-icon
                v-if="formData.icon"
                :icon="formData.icon"
                :size="14"
                :color="$filters.getGroupIconColor(formData.icon)"
              />
              <span v-else>{{
                $t('platform.orgs.hierarchy.click_choose')
              }}</span>
            </label>
            <el-button
              v-show="formData.icon"
              class="icon-view-button"
              style="margin-left: 15px"
              type="danger"
              size="small"
              @click="formData.icon = ''"
            >
              {{ $t('global.action.delete') }}
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button size="small" @click="$back()">
          {{ $t('global.action.back') }}
        </el-button>
        <el-button
          type="primary"
          :loading="loading"
          size="small"
          @click="saveGroup"
        >
          {{ $t('global.action.save') }}
        </el-button>
      </template>
    </magus-add-template>
    <choose-group-icon
      :is-show="chooseIconData.isShow"
      @cancel="chooseIconData.isShow = false"
      @change-icon="changeIcon"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import chooseGroupIcon from '@/components/chooseGroupIcon.vue';
import orgApi from '@/api/organizations.js';
export default defineComponent({
  name: 'AddOrEdit',
  components: {
    chooseGroupIcon
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const state = reactive({
      formData: {
        icon: '',
        level: 0,
        name: ''
      },
      formRules: {
        name: [
          {
            required: true,
            message: t('platform.orgs.hierarchy.name'),
            trigger: 'blur'
          }
        ],
        level: [
          {
            required: true,
            message: t('platform.orgs.hierarchy.level'),
            trigger: 'change'
          }
        ]
      },
      chooseIconData: {
        isShow: false
      },
      loading: false
    });
    const methods = {
      init() {
        const {
          params: { id }
        } = route;
        if (id) {
          methods.getGroupLevel(id);
        }
      },
      chooseIcon() {
        state.chooseIconData.isShow = true;
      },
      /**
       * @description: 修改图标
       * @param {*} datas
       * @return {*}
       */

      changeIcon(datas) {
        const { icon } = datas;
        state.formData.icon = icon;
        state.chooseIconData.isShow = false;
      },
      /**
       * @description: 保存层级
       * @param {*}
       * @return {*}
       */

      saveGroup() {
        formRef.value.validate((valid) => {
          if (valid) {
            let method, url;
            const {
              params: { id }
            } = route;
            if (id) {
              url = orgApi.editLevels(id);
              method = 'put';
            } else {
              url = orgApi.addLevels;
              method = 'post';
            }
            state.loading = true;
            proxy.$magusCloudApi.apiConfig[method](url, state.formData)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                proxy.$back();
              })
              .finally(() => {
                state.loading = false;
              });
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 通过id获取信息
       * @param {*} id
       * @return {*}
       */

      getGroupLevel(id) {
        proxy.$magusCloudApi.apiConfig
          .get(orgApi.getLevelInfo(id))
          .then((res) => {
            Object.keys(state.formData).forEach((el) => {
              state.formData[el] = res[el];
            });
          });
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
<style lang="scss" scoped>
.addOrEdit {
  width: 100%;
  height: 100%;
  .icon-view {
    width: 80px;
    height: 28px;
    display: inline-block;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
