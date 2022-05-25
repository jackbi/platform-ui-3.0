<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-03 15:14:26
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:37:21
 * @FilePath: /magus-platform-ui-3.0/src/components/imageCropper.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-dialog
    :is-show="isShow"
    :title="$t('platform.cropperImage')"
    :before-close="cancel"
    width="50%"
  >
    <template #dialogContent>
      <div style="height: 45vh">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :output-size="option.outputSize"
          :output-type="option.outputType"
          :info="option.info"
          :can-scale="option.canScale"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :fixed="fixed"
          :fixed-number="fixedNumber"
          :full="option.full"
          :fixed-box="option.fixedBox"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :original="option.original"
          :center-box="option.centerBox"
          :height="option.height"
          :info-true="option.infoTrue"
          :max-img-size="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @real-time="realTime"
          @img-load="imgLoad"
        />
      </div>
    </template>
    <template #dialogBtn>
      <!-- 弹窗底部按钮区域-->
      <el-button size="small" @click="cancel">
        {{ $t('global.action.cancel') }}
      </el-button>
      <el-button size="small" type="primary" @click="confirm">
        {{ $t('global.action.confirm') }}
      </el-button>
    </template>
  </magus-dialog>
</template>

<script>
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
export default defineComponent({
  name: 'ImageCropper',
  components: {
    VueCropper
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    fixedNumber: {
      // 截图框的宽高比例
      type: Array,
      default: () => {
        return [1, 1];
      }
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'confirm'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    let state = reactive({
      previews: {},
      fileName: '',
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png', // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        // fixed: false, //是否开启截图框宽高固定比例
        full: false, // false按原比例裁切图片，不失真
        fixedBox: false, // 固定截图框大小，不允许改变
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: '300px 300px' // 图片默认渲染方式
      }
    });
    const methods = {
      // 初始化函数
      imgLoad(msg) {
        console.log('工具初始化函数=====' + msg);
      },
      // 实时预览函数
      realTime(data) {
        state.previews = data;
      },
      // 选择图片
      setImage(datas) {
        state.option.img = datas;
      },
      /**
       * @description: 取消
       * @param {*}
       * @return {*}
       */

      cancel() {
        emit('cancel');
      },
      /**
       * @description: 确定截取
       * @param {*}
       * @return {*}
       */

      confirm() {
        proxy.$refs.cropper.getCropBlob(async (data) => {
          const files = new window.File([data], 'avatar.png', {
            type: data.type
          });
          emit('confirm', files);
        });
      }
    };
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped></style>
