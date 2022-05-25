<!--
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-09-06 09:31:59
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-20 16:34:36
 * @FilePath: /magus-platform-ui-3.0/src/views/platform/enterprise/manage.vue
 * Copyright (C) 2021 wenbin. All rights reserved.
-->
<template>
  <magus-main-layout>
    <!-- 上方搜索空间，如果不需要请删除 -->
    <template #layoutSearch>
      <!-- 搜索组件 -->
      <magus-search>
        <template #form>
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('platform.company.type')">
                <magus-dict-select
                  v-model="query.status"
                  size="small"
                  clearable
                  :code="$dicts.enterpriseState"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.company.name')">
                <el-input
                  v-model="query.name"
                  :text="true"
                  type="primary"
                  size="small"
                  :placeholder="$t('platform.company.name')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('platform.company.enterpriseAlias')">
                <el-input
                  v-model="query.code"
                  :text="true"
                  type="primary"
                  size="small"
                  :placeholder="$t('platform.company.enterpriseAlias')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 15px">
              <el-button type="primary" size="small" @click="queryEnterprice">
                {{ $t('global.action.search') }}
              </el-button>
            </el-col>
          </el-row>
        </template>
      </magus-search>
    </template>
    <template #layoutMain>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        size="small"
        height="100%"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          :label="$t('platform.company.name')"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="code"
          :label="$t('platform.company.enterpriseAlias')"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="owner"
          :label="$t('platform.company.contact')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="mobile"
          :label="$t('platform.company.telphone')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="email"
          :label="$t('platform.company.email')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="business"
          :label="$t('platform.company.business')"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remark"
          :label="$t('platform.company.remark')"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="address"
          :label="$t('platform.company.businessAddress')"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="uscc"
          :label="$t('platform.company.unifySocialCreditCodes')"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="license"
          :label="$t('platform.company.businessLicense')"
          min-width="100"
          show-overflow-tooltip
        >
          <template #default="scope">
            <!-- <el-button
                @click="watchLicense(scope.row.license)"
                :text="true"
                size="small"
                >{{ $t("platform.action.watch") }}</el-button
              > -->
            <el-image
              style="width: 40px; height: 40px"
              :src="$filters.getImage(scope.row.license)"
              :preview-src-list="[`${$filters.getImage(scope.row.license)}`]"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="appName"
          :label="$t('platform.company.type')"
          min-width="100"
          :formatter="$dictFormat('status', $dicts.enterpriseState)"
          show-overflow-tooltip
        />
        <el-table-column
          prop="appName"
          :label="$t('platform.createTime')"
          :formatter="$dateFormat('createTime', 'yyyy-MM-dd hh:mm:ss')"
          min-width="140"
          show-overflow-tooltip
        />
        <el-table-column
          fixed="right"
          :label="$t('platform.table.operation')"
          width="80"
        >
          <template #default="scope">
            <el-button
              v-show="scope.row.status === 'PENDING'"
              :text="true"
              size="small"
              class="magusdip-iconfont magusdiptpngguo1"
              :title="$t('platform.action.agree')"
              @click="agreeRow(scope.row)"
            />
            <el-button
              v-show="scope.row.status === 'PENDING'"
              :text="true"
              size="small"
              class="magusdip-iconfont magusdipbutongguo"
              :title="$t('platform.action.refused')"
              @click="refusedRow(scope.row)"
            />
            <el-dropdown
              trigger="click"
              size="small"
              @command="(command) => changeSetting(scope.row, command)"
            >
              <el-button
                v-show="scope.row.status !== 'PENDING'"
                :text="true"
                type="primary"
                size="small"
                class="magusdip-iconfont magusdippeizhi"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-if="scope.row.status === 'DISABLED'"
                    command="enableRow"
                  >
                    {{ $t('platform.action.enable') }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.status === 'NORMAL'"
                    command="disableRow"
                  >
                    {{ $t('platform.action.disable') }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.status === 'NORMAL'"
                    command="lockRow"
                  >
                    {{ $t('platform.action.locked') }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.status === 'LOCKED'"
                    command="unlockRow"
                  >
                    {{ $t('platform.action.unLocked') }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.status === 'REJECTED'"
                    command="agreeRow"
                  >
                    {{ $t('platform.action.agree') }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #mainPagebar>
      <!-- 分页器组件 -->
      <magus-paging
        :current-page="query.page"
        :page-size="query.limit"
        layout="sizes, prev, pager, next, jumper"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </magus-main-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import enterpriceApi from '@/api/enterprise';
export default defineComponent({
  name: 'Manage',
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const state = reactive({
      query: {
        dir: '',
        sort: '',
        code: '',
        status: '',
        name: '',
        page: 1,
        limit: 20
      },
      loading: false,
      tableData: [],
      count: 0
    });
    const methods = {
      /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */

      init() {
        methods.queryEnterprice();
      },
      /**
       * @description: 修改设置
       * @param {*} datas
       * @param {*} type
       * @return {*}
       */
      changeSetting(datas, type) {
        methods[type](datas);
      },
      // watchLicense(license) {
      //   window.open(`/api/docCenter/download/${license}.jpeg`, "_blank");
      // },
      queryEnterprice() {
        state.query.page = 1;
        methods.getEnterpriceList();
      },
      handleSizeChange(val) {
        state.query.limit = val;
        methods.getEnterpriceList();
      },
      handleCurrentChange(val) {
        state.query.page = val;
        methods.getEnterpriceList();
      },
      /**
       * @description: 修改状态
       * @param {*} id
       * @param {*} type
       * @return {*}
       */

      changeEnterpriceType(id, type) {
        proxy.$magusCloudApi.apiConfig
          .put(enterpriceApi.changeEnterpriceStatus(id), { status: type })
          .then(() => {
            proxy.$message({
              type: 'success',
              message: t('global.text.success')
            });
            methods.getEnterpriceList();
          });
      },
      /**
       * @description: 同意
       * @param {*}
       * @return {*}
       */

      agreeRow(datas) {
        proxy
          .$confirm(t('platform.text.agree'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            methods.changeEnterpriceType(datas.id, 'NORMAL');
          })
          .catch(() => {});
      },
      /**
       * @description: 拒绝
       * @param {*}
       * @return {*}
       */

      refusedRow(datas) {
        proxy
          .$confirm(t('platform.text.refused'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            methods.changeEnterpriceType(datas.id, 'REJECTED');
          })
          .catch(() => {});
      },
      /**
       * @description: 启用
       * @param {*}
       * @return {*}
       */

      enableRow(datas) {
        proxy
          .$confirm(t('platform.text.enable'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            methods.changeEnterpriceType(datas.id, 'NORMAL');
          })
          .catch(() => {});
      },
      /**
       * @description:  禁用
       * @param {*}
       * @return {*}
       */

      disableRow(datas) {
        proxy
          .$confirm(t('platform.text.disable'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            methods.changeEnterpriceType(datas.id, 'DISABLED');
          })
          .catch(() => {});
      },
      /**
       * @description:  锁定
       * @param {*}
       * @return {*}
       */

      lockRow(datas) {
        proxy
          .$confirm(t('platform.text.locked'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning',
            draggable: true
          })
          .then(() => {
            methods.changeEnterpriceType(datas.id, 'LOCKED');
          })
          .catch(() => {});
      },
      /**
       * @description:  锁定
       * @param {*}
       * @return {*}
       */

      unlockRow(datas) {
        proxy
          .$confirm(t('platform.text.unlocked'), t('global.text.notice'), {
            confirmButtonText: t('global.action.confirm'),
            cancelButtonText: t('global.action.cancel'),
            type: 'warning'
          })
          .then(() => {
            methods.changeEnterpriceType(datas.id, 'NORMAL');
          })
          .catch(() => {});
      },
      /**
       * @description: 获取企业列表
       * @param {*}
       * @return {*}
       */

      getEnterpriceList() {
        state.loading = true;
        proxy.$magusCloudApi.apiConfig
          .get(enterpriceApi.getEnterprice, state.query)
          .then((res) => {
            state.tableData = res.content;
            state.count = res.totalElements;
            state.loading = false;
          })
          .catch(() => {
            state.loading = false;
          });
      }
    };
    methods.init();
    return {
      ...toRefs(state),
      ...methods
    };
  }
});
</script>
