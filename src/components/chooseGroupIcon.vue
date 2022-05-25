<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-11-23 15:02:57
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 17:31:06
 * @FilePath: /magus-platform-ui-3.0/src/components/chooseGroupIcon.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-dialog
    :is-show="isShow"
    :title="$t('platform.orgs.hierarchy.choose_icon')"
    :before-close="cancel"
    width="50%"
  >
    <template #dialogContent>
      <!-- 弹窗内容区域-->
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane :label="$t('platform.orgs.hierarchy.org')" name="org">
          <div class="choose-iconfont-inner">
            <ul class="choose-iconfont-inner-con">
              <li
                v-for="(item, index) in iconData"
                :key="index"
                @click="changeIcon(item)"
              >
                <p>
                  <magus-icon
                    :icon="item.icon"
                    :size="20"
                    :color="item.color"
                  />
                </p>
                <p class="icon-name">
                  <span>{{ item.name }}</span>
                </p>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </magus-dialog>
</template>

<script>
import * as iconfont from '@/common/resource/iconfont';
import { defineComponent, reactive, toRefs, watch } from 'vue';
export default defineComponent({
  name: 'ChooseGroupIcon',
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['changeIcon', 'cancel'],
  setup(props, { emit }) {
    const state = reactive({
      iconData: [],
      tabName: 'org'
    });
    const methods = {
      init() {
        methods.getIconData();
      },
      getIconData() {
        state.iconData = iconfont.groupIcon.filter(
          (i) => i.type === state.tabName
        );
      },
      /**
       * @description: 选择图标
       * @param {*} datas
       * @return {*}
       */

      changeIcon(datas) {
        emit('changeIcon', datas);
      },
      cancel() {
        emit('cancel');
      }
    };
    watch(
      () => state.tabName,
      () => {
        methods.getIconData();
      }
    );
    methods.init();
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.choose-iconfont-inner {
  // height: 350px;
  // overflow: auto;
  .choose-iconfont-inner-con {
    &:after {
      content: '';
      display: block;
      line-height: 0;
      clear: both;
    }
    li {
      float: left;
      padding: 10px 5px;
      width: 200px;
      text-align: center;
      cursor: pointer;
      .icon-name {
        margin-top: 5px;
        color: #333;
        font-size: 12px;
      }
    }
  }
}
</style>
