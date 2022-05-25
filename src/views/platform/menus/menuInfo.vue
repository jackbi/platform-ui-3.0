<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-05-14 11:05:54
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-19 14:21:56
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/menus/menuInfo.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <div class="MenuInfo">
    <magus-add-template
      :title="
        $route.name === 'platformMenusPageAdd'
          ? $t('platform.menus.addmenu')
          : $t('platform.menus.menuinfo')
      "
    >
      <template #main>
        <div style="padding: 10px 0">
          <el-form
            ref="formRef"
            :model="menuData"
            label-width="80px"
            size="small"
            :rules="rules"
          >
            <el-form-item :label="$t('platform.menus.menuname')" prop="name">
              <el-input
                v-model="menuData.name"
                :placeholder="$t('platform.menus.menuname')"
              />
            </el-form-item>
            <el-form-item :label="$t('platform.menus.menucode')" prop="code">
              <el-input
                v-model="menuData.code"
                :disabled="$route.name !== 'platformMenusPageAdd'"
                :placeholder="$t('platform.menus.menucode')"
              />
            </el-form-item>
            <el-form-item :label="$t('platform.menus.menuicon')">
              <!-- <div class="form-icon" @click="isShowIconDia = true">
                <magus-icon :icon="menuData.icon"></magus-icon>
              </div> -->
              <label class="icon-view" @click="isShowIconDia = true">
                <magus-icon v-if="menuData.icon" :icon="menuData.icon" />
                <span v-else>{{ $t('platform.action.choose_icon') }}</span>
              </label>
              <el-button
                v-show="menuData.icon"
                class="icon-view-button"
                style="margin-left: 15px"
                type="danger"
                size="small"
                @click="menuData.icon = ''"
              >
                {{ $t('global.action.delete') }}
              </el-button>
            </el-form-item>
            <el-form-item :label="$t('platform.table.isleaf')">
              <el-radio-group v-model="menuData.leaf" size="small">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              :label="$t('platform.menus.menuparams')"
              prop="params"
            >
              <el-input
                v-model.trim="menuData.params"
                type="textarea"
                :rows="4"
                resize="none"
                :placeholder="$t('platform.menus.menuparams')"
              />
            </el-form-item>
            <el-form-item
              v-show="menuData.leaf"
              :label="$t('platform.menus.menurouter')"
            >
              <!-- <el-input v-model="menuData.routerId"></el-input> -->
              <magus-select-tree
                v-model="menuData.routerId"
                :options="routerData"
                :placeholder="$t('platform.menus.menurouter')"
              />
            </el-form-item>
            <el-form-item :label="$t('platform.menus.menuwindow')">
              <el-tooltip
                :content="menuData.window ? '打开' : '关闭'"
                placement="top"
              >
                <el-switch
                  v-model="menuData.window"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="true"
                  :inactive-value="false"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item :label="$t('platform.table.order')">
              <el-input
                v-model="menuData.order"
                :placeholder="$t('platform.table.order')"
              />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <el-button
          v-show="$route.name === 'platformMenusPageAdd'"
          size="small"
          @click="$back()"
        >
          {{ $t('global.action.back') }}
        </el-button>
        <el-button
          type="primary"
          :loading="saveLoading"
          size="small"
          @click="goSave"
        >
          {{ $t('global.action.save') }}
        </el-button>
      </template>
    </magus-add-template>
    <magus-choose-icon
      :is-show="isShowIconDia"
      @change-icon="changeIcon"
      @cancel-choose="isShowIconDia = false"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  inject
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import menuApi from '@/api/menus.js';
export default defineComponent({
  name: 'MenuInfo',
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const formRef = ref();
    const { proxy } = getCurrentInstance();
    const getTree = inject('getTree');
    const checkParams = (rule, value, callback) => {
      if (value && typeof value == 'string') {
        try {
          const obj = JSON.parse(value);
          if (typeof obj == 'object' && obj) {
            callback();
          } else {
            callback(t('platform.menus.menuparams_error'));
          }
        } catch (e) {
          console.log('error：' + value + '!!!' + e);
          callback(t('platform.menus.menuparams_error'));
        }
      } else if (value && typeof value !== 'string') {
        callback(t('platform.menus.menuparams_error'));
      } else if (!value) {
        callback();
      }
    };

    const state = reactive({
      menuData: {
        routerId: '',
        routerName: '',
        code: '',
        icon: '',
        image: '',
        leaf: false,
        name: '',
        order: 0,
        params: '',
        parentId: '',
        window: false
      },
      isShowIconDia: false,
      routerData: [],
      saveLoading: false,
      rules: {
        name: [
          {
            required: true,
            message: t('platform.menus.menuname'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: t('platform.menus.menucode'),
            trigger: 'blur'
          }
        ],
        params: [
          {
            validator: checkParams,
            trigger: 'blur'
          }
        ]
      }
    });

    const methods = {
      async init() {
        await methods.getAllResources();
        const {
          params: { entityId },
          name
        } = route;
        if (name === 'platformMenusPageAdd') {
          if (entityId === 'root') {
            state.menuData.parentId = '';
          } else {
            state.menuData.parentId = entityId;
          }
        } else {
          methods.getMenuById(entityId);
        }
        state.menuData.params = JSON.stringify({}, null, 4);
      },
      /**
       * @description: 保存
       * @param {*}
       * @return {*}
       */
      goSave() {
        const {
          params: { entityId },
          name: routerName
        } = route;
        formRef.value.validate((valid) => {
          if (valid) {
            state.saveLoading = true;
            let method, api;
            if (routerName === 'platformMenusPageAdd') {
              method = 'post';
              api = menuApi.addMenu;
            } else {
              method = 'put';
              api = menuApi.putMenuById(entityId);
            }
            proxy.$magusCloudApi.apiConfig[method](api, state.menuData)
              .then(() => {
                proxy.$message({
                  type: 'success',
                  message: t('global.text.success')
                });
                if (routerName === 'platformMenusPageAdd') {
                  proxy.$back();
                }
                getTree();
              })
              .finally(() => {
                state.saveLoading = false;
              });
          } else {
            return false;
          }
        });
      },
      /**
       * @description: 获取图标
       * @param {*} datas
       * @return {*}
       */
      changeIcon(datas) {
        if (datas.icon) {
          state.menuData.icon = datas.icon.replace('#', '');
          state.isShowIconDia = false;
        }
      },
      /**
       * @description: 获取资源
       * @param {*}
       * @return {*}
       */
      getAllResources() {
        return new Promise((resolve, reject) => {
          proxy.$magusCloudApi.apiConfig
            .get(menuApi.getResouceTree, {})
            .then((res) => {
              state.routerData = res.children;
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      /**
       * @description: 通过id获取菜单详情
       * @param {*} id
       * @return {*}
       */
      getMenuById(id) {
        proxy.$magusCloudApi.apiConfig
          .get(menuApi.getMenuById(id), {})
          .then((res) => {
            Object.keys(state.menuData).forEach((item) => {
              state.menuData[item] = res[item];
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
.MenuInfo {
  width: 100%;
  height: 100%;
}
.form-icon {
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  cursor: pointer;
  i {
    font-size: 18px;
  }
}
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
</style>
