/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-04-21 17:00:47
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 15:16:19
 * @FilePath: /magus-platform-ui-3.0/src/common/lang/zhCN.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const zhCN = {
  platform: {
    submit: '提交',
    uploadName: '点击上传',
    exitPlat: '退出登陆',
    userCenter: '个人中心',
    cropperImage: '图片截取',
    createTime: '创建时间',
    updateTime: '更新时间',
    joinTime: '申请时间',
    expand_all: '全部展开',
    packup_all: '全部收起',
    tree_common_placeholder: '请输入节点名称',
    action: {
      watch: '查看',
      agree: '同意',
      refused: '拒绝',
      enable: '启用',
      disable: '禁用',
      locked: '锁定',
      unLocked: '解锁',
      choose_icon: '选择图标'
    },
    text: {
      agree: '是否确认同意',
      refused: '是否确认拒绝',
      enable: '是否确认启用',
      disable: '是否确认禁用',
      locked: '是否确认锁定',
      unlocked: '是否确认解锁',
      image: '图片',
      text: '文字',
      show: '显示',
      hidden: '隐藏',
      validateCodeWarning: '图形校验码错误请重新输入',
      accountValidate: '只支持3-20英文数字',
      passwordValidate: '请输入6-20位密码',
      accountRepeat: '账号已存在',
      companyCodeRepeat: '企业编码已存在',
      registerRrror: '注册失败'
    },
    login: {
      tips: '账号密码登录',
      accountPlaceholder: '请输入您的账号',
      login_account_placeholder: '请输入您的用户名或手机号或邮箱',
      passwordPlaceholder: ' 请输入您的密码',
      passwordAgainPlaceholder: ' 请再次输入您的密码',
      loginRegister: '没有账号，点击',
      register: '注册',
      registerTitle: '欢迎注册云平台',
      passwordDontMatch: '两次输入密码不一致!',
      haveAccount: '已有账号，点击',
      validateCode: '图形校验码',
      passord_login: '密码登录',
      code_login: '验证码登录',
      phone: '手机号',
      phone_tips: '请输入手机号',
      code: '验证码',
      code_tips: '请输入验证码',
      send_code: '发送验证码',
      send_code_again: '重新发送',
      account_tip: '手机号/邮箱不能为空',
      account: '手机号/邮箱',
      vaild_type: '验证方式',
      vaild_type_err_tip: '你还未绑定手机或邮箱，请先绑定手机号或者邮箱'
    },
    welcome: {
      title: '欢迎进入MagusCloud!',
      subTitle:
        '企业域是设备管理区隔的空间，用户需要在企业内才可以管理设备，您当前还未有任何企业，请选择以下操作：',
      joinCompany: '加入企业',
      createCompany: '创建企业',
      joinTips:
        '您的单位已有企业域，或设备已经在他人创建的企业内，选择加入企业。',
      createTips:
        '您的单位还没有任何企业，或您需要管理新的企业域，选择创建企业。'
    },
    company: {
      loginBg: '登陆背景图',
      loginBgUploadTips: '文件格式只支持jpg、jpeg、png',
      title: '企业主标题',
      subtitle: '企业副标题',
      critype: '备案信息',
      system: '企业定制管理',
      info: '企业信息',
      contact: '联系人',
      telphone: '电话',
      type: '企业状态',
      name: '企业名称',
      businessLicense: '营业执照',
      unifySocialCreditCodes: '统一社会信用代码',
      enterpriseAlias: '企业编码',
      email: '邮箱',
      businessAddress: '企业地址',
      business: '行业',
      remark: '描述',
      nameAndDesc: '企业名称或描述',
      uploadFileTips: `照片上所有信息需清晰可见，内容真实有效，不得做任何修改\n文件格式只支持jpg、jpeg、png、bmp和pdf。\n文件必须小于10MB。\n上传的文件不能小于0字节`,
      joinCompanyTips:
        '加入企业后，审核完成前将不能再次申请加入企业，或者创建企业，是否继续？',
      changeStatusAgreeTips: '是否确认同意该用户加入企业？',
      changeStatuRejectTips: '是否确认拒绝该用户加入企业？',
      favicon: '网站小图标',
      favicon_tip: '文件格式只支持ico'
    },
    table: {
      operation: '操作',
      isAuth: '权限验证',
      isleaf: '叶子节点',
      order: '排序',
      dictEntry: '字典项',
      enable: '启用',
      disable: '禁用'
    },
    apps: {
      tree: '应用功能树',
      appname: '应用名称',
      appcode: '应用编码',
      apptype: '应用类型',
      app_web_config: '前端配置',
      app_api_config: '后端配置',
      app_web_host: '前端HOST',
      app_web_port: '前端PORT',
      app_web_baseurl: '前端BASEURL',
      app_api_baseurl: '后端BASEURL',
      opentype: '开通状态',
      accesspath: '访问路径',
      appip: '应用Ip',
      appport: '应用端口',
      appprotocol: '协议类型',
      remark: '描述',
      modulename: '模块名称',
      modulecode: '模块编码',
      modulepath: '模块路径',
      funcname: '功能名称',
      functype: '功能类型',
      funcpath: '功能路径',
      funcode: '功能编码',
      method: '接口方法',
      app_add: '新增应用',
      app_list: '应用列表',
      app_info: '应用信息',
      module_add: '新增模块',
      module_list: '模块列表',
      module_info: '模块信息',
      func_add: '新增功能',
      func_list: '功能列表',
      func_edit: '编辑功能'
    },
    menus: {
      menuinfo: '菜单信息',
      addmenu: '新增菜单',
      menulist: '菜单列表',
      menuname: '菜单名称',
      menucode: '菜单编码',
      menuicon: '菜单图标',
      menuparams: '菜单参数',
      menurouter: '菜单资源',
      menuwindow: '打开新窗口',
      menuparams_error: '菜单参数需要JSON格式，请检查菜单参数',
      menutree: '菜单树'
    },
    users: {
      append_user: '添加用户',
      user_name: '登陆账号',
      nick_name: '用户名称',
      user_status: '用户状态',
      user_wechat: '用户微信',
      user_email: '用户邮箱',
      user_avatar: '用户头像',
      user_mobile: '用户手机',
      user_name_validate: '请输入3-20中文或英文或数字登陆账号',
      user_mobile_validate: '请输入正确的手机号',
      user_email_validate: '请输入正确的邮箱',
      user_info_center: '个人中心',
      user_basic_info: '基本信息',
      user_safe_info: '安全信息',
      avata_advice:
        '建议：选择一张个人证明照片作为头像，其它成员可以更容易认识你',
      avata_tips: '仅支持JPG、PNG格式上传',
      user_name_tips:
        '此用户名用于登录当前平台，用户名只能是英文、数字和下划线组成。',
      user_nickname_tips: '您可以给自己设置姓名，这样也可以方便大家找到你。',
      password_tips: '如果你忘记了当前密码，可以通过手机号验证码进行密码更改。',
      phone_tips:
        '修改手机号时系统会发送验证码到新的手机号码上，然后输入验证码后即可完成修改。',
      email_tips: '请填写正确的邮箱地址，方便联系。',
      change_password: '修改密码',
      reset_password: '重置密码',
      reset_password_tip: '此操作会重置用户密码为默认密码，是否确认？',
      old_password: '旧密码',
      new_password: '新密码',
      confirm_password: '确认密码',
      user_add: '新增用户',
      user_edit: '编辑用户',
      bind_mobile: '绑定手机号',
      bind_email: '绑定邮箱',
      mobile: '手机号',
      email: '邮箱',
      mobile_error_tip: '请输入手机号',
      email_error_tip: '请输入邮箱'
    },
    roles: {
      role_code: '角色编码',
      role_name: '角色名称',
      role_type: '角色类型',
      add: '新增角色',
      edit: '编辑角色'
    },
    system: {
      system_code: '系统编码',
      system_copyright: '版权信息',
      system_icp: 'icp信息',
      system_icpUrl: 'icp查询地址',
      system_logo: '系统logo',
      system_themeColor: '系统颜色',
      system_themeLayout: '系统布局',
      system_title1: '主标题',
      system_title2: '副标题',
      system_homepage: '首页路由',
      system_login_title1: '登陆页主标题',
      system_login_title2: '登陆页副标题',
      system_bind_menu: '菜单绑定'
    },
    dicts: {
      dicts_name: '字典名称',
      dicts_app: '所属应用',
      dicts_code: '字典编码',
      dicts_entry_code: '字典项编码',
      dicts_entry_name: '字典项名称',
      dicts_entry_value: '字典项值',
      dicts_entry_enabled: '启用状态',
      add_dict: '新增字典',
      edit_dict: '编辑字典',
      add_dicts_entry: '新增字典项',
      edit_dicts_entry: '编辑字典项'
    },
    parameter: {
      param_name: '参数名称',
      param_code: '参数编码',
      param_value: '参数值',
      param_remark: '参数备注',
      param_app: '所属应用',
      add_param: '新增参数',
      edit_param: '编辑参数'
    },
    templatefile: {
      templatefile_app: '所属应用',
      templatefile_name: '模版名称',
      templatefile_code: '模版编码',
      templatefile_code_tip: '模版编码支持2-50位英文数字下划线',
      templatefile_file: '模版文件',
      templatefile_updateFile: '修改文件',
      add: '新增模版',
      edit: '编辑模版'
    },
    auth: {
      user_auth: '授权用户',
      fun_auth: '授权功能'
    },
    orgs: {
      hierarchy: {
        name: '层级名称',
        level: '层级等级',
        icon: '层级图标',
        add: '新增层级',
        edit: '编辑层级',
        click_choose: '点击选择',
        choose_icon: '选择图标',
        org: '组织机构'
      },
      manage: {
        agency_info: '机构信息',
        next_agency: '下级机构',
        employee_info: '员工信息',
        org_name: '组织名称',
        org_code: '组织编码',
        org_type: '组织类型',
        org_level: '组织层级',
        org_sort: '排序',
        add_agency: '新增机构',
        edit_agency: '编辑机构',
        no_data: '暂无数据',
        tree_name: '组织机构树'
      }
    }
  }
};

export default zhCN;
