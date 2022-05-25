/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-04-18 15:16:58
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-25 11:41:00
 * @FilePath: /magus-platform-ui-3.0/src/router/index.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      isNeedLayout: false,
      title: '登陆'
    }
  },
  {
    path: '/platform/company/join',
    name: 'joinCompany',
    component: () =>
      import(
        /* webpackChunkName: "Enterprise" */ '@/views/platform/enterprise/joinCompany.vue'
      ),
    meta: {
      isNeedLayout: true,
      title: '加入企业'
    }
  },
  {
    path: '/platform/company/create',
    name: 'createCompany',
    component: () =>
      import(
        /* webpackChunkName: "Enterprise" */ '@/views/platform/enterprise/createCompany.vue'
      ),
    meta: {
      isNeedLayout: true,
      title: '创建企业'
    }
  },
  {
    path: '/platform/welcome',
    name: 'Welcome',
    component: () =>
      import(/* webpackChunkName: "Welcome" */ '@/views/welcome/index.vue'),
    meta: {
      isNeedLayout: true,
      title: '欢迎'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () =>
      import(/* webpackChunkName: "error" */ '@/views/test/index.vue'),
    meta: {
      isNeedLayout: true,
      title: '测试'
    }
  },
  {
    path: '/platform/iframe',
    name: 'Iframe',
    component: () =>
      import(/* webpackChunkName: "Iframe" */ '@/views/iframe/index.vue'),
    meta: {
      isNeedLayout: true,
      title: '外部页面'
    }
  },
  {
    path: '/platform',
    name: 'platform',
    component: () =>
      import(/* webpackChunkName: "platform" */ '@/views/platform/index.vue'),
    meta: {
      isNeedLayout: true,
      title: '平台管理'
    },
    children: [
      {
        path: '/platform/apps/page',
        name: 'platformApps',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/apps/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '应用管理'
        },
        children: [
          {
            path: '/platform/apps/page/list/:entityId',
            name: 'platformAppsPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/list/:entityId/add',
            name: 'platformAppsPageAdd',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/appInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/info/:entityId',
            name: 'platformAppsAppInfo',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/appInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/module/:entityId',
            name: 'platformAppsModules',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/modules.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/module/:entityId/add',
            name: 'platformAppsModulesAdd',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/moduleInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/moduleinfo/:entityId',
            name: 'platformAppsModuleInfo',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/moduleInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/funs/:entityId',
            name: 'platformAppsFuns',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/funs.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/funs/:entityId/add',
            name: 'platformAppsFunsAdd',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/funInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/apps/page/funs/:entityId/edit/:id',
            name: 'platformAppsFunsEdit',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/apps/funInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          }
        ]
      },
      {
        path: '/platform/menus/page',
        name: 'platformMenus',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/menus/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '菜单管理'
        },
        children: [
          {
            path: '/platform/menus/page/list/:entityId',
            name: 'platformMenusPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/menus/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/menus/page/list/:entityId/add',
            name: 'platformMenusPageAdd',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/menus/menuInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/menus/page/menuInfo/:entityId',
            name: 'platformMenusMenuInfo',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/menus/menuInfo.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          }
        ]
      },
      {
        path: '/platform/users',
        name: 'platformUsers',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/users/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '用户管理'
        },
        children: [
          {
            path: '/platform/users/page',
            name: 'platformUsersPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/users/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/users/add',
            name: 'platformUsersAdd',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/users/add.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          }
        ]
      },
      {
        path: '/platform/personal',
        name: 'platformPersonal',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/users/personal/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '个人中心'
        },
        children: [
          {
            path: '/platform/personal/basic',
            name: 'platformPersonalBasic',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/users/personal/basic.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '基本信息'
            }
          },
          {
            path: '/platform/personal/safe',
            name: 'platformPersonalSafe',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/users/personal/safe.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '安全信息'
            }
          }
        ]
      },
      {
        path: '/platform/roles',
        name: 'platformRoles',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/roles/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '角色管理'
        },
        children: [
          {
            path: '/platform/roles/page',
            name: 'platformRolesPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/roles/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/roles/add',
            name: 'platformRolesAdd',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/roles/add.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          }
        ]
      },
      {
        path: '/platform/license/page',
        name: 'platformLicense',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/license/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: 'license管理'
        }
      },
      {
        path: '/platform/auths',
        name: 'platformAuths',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/auths/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '授权管理'
        },
        children: [
          {
            path: '/platform/auths/page',
            name: 'platformAuthsPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/auths/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/auths/users',
            name: 'platformAuthsUsers',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/auths/users.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/auths/users/add',
            name: 'platformAuthsAddUser',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/auths/addUser.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          }
        ]
      },
      {
        path: '/platform/dicts',
        name: 'platformDicts',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/dicts/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '字典管理',
          aliveName: 'dicts'
        },
        children: [
          {
            path: '/platform/dicts/page',
            name: 'platformDictsPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/dicts/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '',
              keepAlive: true,
              aliveName: 'dicts'
            }
          },
          {
            path: '/platform/dicts/addDicts',
            name: 'platformDictsAddDicts',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/dicts/addDicts.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '',
              aliveName: 'dicts'
            }
          },
          {
            path: '/platform/writeDicts/:id',
            name: 'platformDictsWriteDicts',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/dicts/addDicts.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '',
              aliveName: 'dicts'
            }
          },
          {
            path: '/platform/dicts/params/:id',
            name: 'platformDictsParams',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/dicts/params.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '',
              aliveName: 'dicts'
            }
          },
          {
            path: '/platform/dicts/addParams',
            name: 'platformDictsAddParams',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/dicts/addParams.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '',
              aliveName: 'dicts'
            }
          }
        ]
      },
      {
        path: '/platform/systemInfos',
        name: 'platformSystem',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/system/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '系统管理'
        },
        children: [
          {
            path: '/platform/systemInfos/page',
            name: 'platformSystemPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/system/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/systemInfos/add',
            name: 'platformSystemAdd',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/system/addOrWrite.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '新增系统信息'
            }
          },
          {
            path: '/platform/systemInfos/write/:id',
            name: 'platformSystemWrite',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/system/addOrWrite.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '编辑系统信息'
            }
          },
          {
            path: '/platform/systemInfos/menus/:id',
            name: 'platformSystemMenus',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/system/bindMenus.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '绑定菜单'
            }
          }
        ]
      },
      {
        path: '/platform/params',
        name: 'platformParameter',
        component: () =>
          import(
            /* webpackChunkName: "platform" */ '@/views/platform/parameter/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '参数管理'
        },
        children: [
          {
            path: '/platform/params/page',
            name: 'platformParameterPage',
            component: () =>
              import(
                /* webpackChunkName: "platform" */ '@/views/platform/parameter/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          }
        ]
      },
      {
        path: '/platform/tenants/page',
        name: 'platformEnterprise',
        component: () =>
          import(
            /* webpackChunkName: "Enterprise" */ '@/views/platform/enterprise/manage.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '企业管理'
        }
      },
      {
        path: '/platform/tenants/info',
        name: 'platformEnterpriseInfo',
        component: () =>
          import(
            /* webpackChunkName: "Enterprise" */ '@/views/platform/enterprise/info.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '企业信息'
        }
      },
      {
        path: '/platform/tenantCustoms/page',
        name: 'platformEnterpriseSystem',
        component: () =>
          import(
            /* webpackChunkName: "Enterprise" */ '@/views/platform/enterprise/system.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '企业定制化'
        }
      },
      {
        path: '/platform/joinTenants/page',
        name: 'platformJoinTenantsPage',
        component: () =>
          import(
            /* webpackChunkName: "Enterprise" */ '@/views/platform/enterprise/applyUser.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '企业用户申请'
        }
      },
      {
        path: '/platform/templateFiles',
        name: 'platformTemplateFiles',
        component: () =>
          import(
            /* webpackChunkName: "TemplateFiles" */ '@/views/platform/templatefile/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '模版文件管理'
        },
        children: [
          {
            path: '/platform/templateFiles/page',
            name: 'platformTemplateFilesPage',
            component: () =>
              import(
                /* webpackChunkName: "TemplateFiles" */ '@/views/platform/templatefile/page.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: ''
            }
          },
          {
            path: '/platform/templateFiles/add',
            name: 'platformTemplateFilesAdd',
            component: () =>
              import(
                /* webpackChunkName: "TemplateFiles" */ '@/views/platform/templatefile/addorWrite.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '新增'
            }
          },
          {
            path: '/platform/templateFiles/edit/:id',
            name: 'platformTemplateFilesEdit',
            component: () =>
              import(
                /* webpackChunkName: "TemplateFiles" */ '@/views/platform/templatefile/addorWrite.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '编辑'
            }
          }
        ]
      },
      {
        path: '/platform/orgs',
        name: 'platformOrgs',
        component: () =>
          import(
            /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/index.vue'
          ),
        meta: {
          isNeedLayout: true,
          title: '组织管理'
        },
        children: [
          {
            path: '/platform/orgs/page',
            name: 'platformOrgsPage',
            component: () =>
              import(
                /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/manage/index.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '组织管理'
            },
            children: [
              {
                path: '/platform/orgs/page/agencyinfo/:entityId?',
                name: 'platformOrgsPageAgencyinfo',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/manage/info.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '机构信息'
                }
              },
              {
                path: '/platform/orgs/page/nextagency/:entityId?',
                name: 'platformOrgsPageNextagency',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/manage/page.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '下级机构'
                }
              },
              {
                path: '/platform/orgs/page/nextagency/:entityId?/add',
                name: 'platformOrgsPageAddAgency',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/manage/info.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '新增下级机构'
                }
              },
              {
                path: '/platform/orgs/page/nextagency/:entityId?/edit',
                name: 'platformOrgsPageEditAgency',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/manage/info.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '编辑下级机构'
                }
              },
              {
                path: '/platform/orgs/page/employee/:entityId?',
                name: 'platformOrgsPageEmployee',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/manage/user.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '员工信息'
                }
              },
              {
                path: '/platform/orgs/page/employee/:entityId?/auth',
                name: 'platformOrgsPageEmployeeAuth',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/manage/addUser.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '授权用户'
                }
              }
            ]
          },
          {
            path: '/platform/orgs/level',
            name: 'platformOrgsLevel',
            component: () =>
              import(
                /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/level/index.vue'
              ),
            meta: {
              isNeedLayout: true,
              title: '组织层级'
            },
            children: [
              {
                path: '/platform/orgs/level/page',
                name: 'platformOrgsLevelPage',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/level/page.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: ''
                }
              },
              {
                path: '/platform/orgs/level/add',
                name: 'platformOrgsLevelAdd',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/level/change.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '新增组织'
                }
              },
              {
                path: '/platform/orgs/level/edit/:id',
                name: 'platformOrgsLevelEdit',
                component: () =>
                  import(
                    /* webpackChunkName: "Orgs" */ '@/views/platform/organizations/level/change.vue'
                  ),
                meta: {
                  isNeedLayout: true,
                  title: '编辑组织'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/platform/:pathMatch(.*)', // 和以前配置有所不一样 or  /:catchAll(.*)
    component: () =>
      import(/* webpackChunkName: "error" */ '@/views/error/index.vue'),
    meta: {
      isNeedLayout: false,
      title: '404'
    },
    hidden: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由配置上定义 路由独享的守卫
// beforeEnter: (to, from) => {
//   // reject the navigation
//   return false
// },

// 导航守卫
// onBeforeRouteLeave, onBeforeRouteUpdate

export default router;
