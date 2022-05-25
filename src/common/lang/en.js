/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-04-21 17:02:05
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-18 15:16:41
 * @FilePath: /magus-platform-ui-3.0/src/common/lang/en.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */
const en = {
  platform: {
    submit: 'submit',
    uploadName: 'Click on the upload',
    exitPlat: 'Logged out',
    userCenter: 'Personal center',
    cropperImage: 'Image capture',
    createTime: 'Creation time',
    updateTime: 'Update time',
    joinTime: 'To apply for time',
    expand_all: 'Expand all',
    packup_all: 'Pack up all',
    tree_common_placeholder: 'Enter the node name',
    action: {
      watch: 'view',
      agree: 'agree',
      refused: 'refused',
      enable: 'enable',
      disable: 'disable',
      locked: 'lock',
      unLocked: 'unlock',
      choose_icon: 'Choose the icon'
    },
    text: {
      agree: 'Confirm consent',
      refused: 'Confirm rejection',
      enable: 'Confirm to enable',
      disable: 'Confirm disable',
      locked: 'Confirm lock',
      unlocked: 'Confirm unlock.',
      image: 'The picture',
      text: 'The text',
      show: 'show',
      hidden: 'hidden',
      validateCodeWarning:
        'The verification code is incorrect. Re-enter the verification code',
      accountValidate: 'only 3 to 20 digits',
      companyCodeRepeat: 'The enterprise code already exists',
      passwordValidate: 'Please enter a 6-20 digit password',
      accountRepeat: 'The account already exists.',
      registerRrror: 'Registration failed'
    },
    login: {
      tips: 'Account and Password Login',
      accountPlaceholder: 'Please enter your account number',
      login_account_placeholder:
        'Please enter your user name or mobile phone number or email',
      passwordPlaceholder: ' Please enter your password',
      loginRegister: 'No account, click',
      register: 'register',
      registerTitle: 'Welcome to register for cloud platform',
      passwordDontMatch: 'The two passwords are inconsistent!',
      haveAccount: 'If you have an account, click',
      validateCode: 'Verification code',
      passord_login: 'Password to login',
      code_login: 'Verification code login',
      phone: 'Mobile phone no.',
      phone_tips: 'Please enter your mobile phone number',
      code: 'Verification code',
      code_tips: 'Please enter the verification code',
      send_code: 'Send verification code',
      send_code_again: 'To resend',
      account_tip: 'The mobile phone number or email address cannot be empty',
      account: 'Mobile phone number/email code',
      vaild_type: 'Verify the way',
      vaild_type_err_tip:
        'You have not bound your mobile phone or email address, please bind your mobile phone number or email address first'
    },
    welcome: {
      title: 'Welcome to MagusCloud, please select the following',
      subTitle:
        'An enterprise domain is a space for device management. Users can manage devices only in an enterprise. If you do not have an enterprise, perform the following operations:',
      joinCompany: 'To join the enterprise',
      createCompany: 'Create an enterprise',
      joinTips:
        'Your organization has an enterprise domain or the device is already in an enterprise created by others.',
      createTips:
        'Your organization does not yet have any enterprises, or you need to manage a new enterprise domain, choose to create enterprises.'
    },
    table: {
      operation: 'Operation',
      isAuth: 'Permission verification',
      isleaf: 'Leaf node',
      order: 'Sorting',
      dictEntry: 'Dictionary entry',
      enable: 'To enable the',
      disable: 'disable'
    },
    company: {
      loginBg: 'Landing background',
      loginBgUploadTips: 'The file format can be JPG, JPEG, or PNG',
      title: 'Business owner title',
      subtitle: 'Enterprise subtitle',
      critype: 'For the record information',
      system: 'Enterprise customized management',
      info: 'Enterprise information',
      contact: 'The contact',
      telphone: 'The phone',
      type: 'Enterprise state',
      name: 'An enterprise name',
      businessLicense: 'The business license',
      unifySocialCreditCodes: 'Unify social credit codes',
      enterpriseAlias: 'Enterprise alias',
      email: 'email',
      businessAddress: 'Business address',
      business: 'industry',
      remark: 'describe',
      nameAndDesc: 'Enterprise name or description',
      uploadFileTips: `All information on the photo must be clearly visible and authentic. No modification is allowed. N Only JPG, JPEG, PNG, BMP and PDF files are supported. \n files must be smaller than 10MB. \n The uploaded file cannot be smaller than 0 bytes`,
      joinCompanyTips:
        'After joining the enterprise, the company cannot apply for joining the enterprise again or create the enterprise before the review is completed. Do you want to continue?',
      changeStatusAgreeTips: 'Do you agree to add the user to the enterprise?',
      changeStatuRejectTips:
        'Are you sure to reject the user from joining the enterprise?',
      favicon: 'Site icon',
      favicon_tip: 'Only ICO files are supported'
    },
    apps: {
      tree: 'Application Function Tree',
      appname: 'Application name',
      apptype: 'Application type',
      appcode: 'Application code',
      app_web_config: 'The front-end configuration',
      app_api_config: 'The backend configuration',
      app_web_host: 'Front of the HOST',
      app_web_port: 'The front-end PORT',
      app_web_baseurl: 'The web BASEURL',
      app_api_baseurl: 'The back-end BASEURL',
      opentype: 'Open type',
      accesspath: 'Access path',
      appip: 'Application of Ip',
      appport: 'Application port',
      appprotocol: 'Protocol type',
      remark: 'description',
      modulename: 'Module name',
      modulecode: 'Module coding',
      modulepath: 'Module path',
      funcname: 'Function name',
      functype: 'Function type',
      funcpath: 'Function path',
      funcode: 'Function coding',
      method: 'Interface method',
      app_add: 'The new application',
      app_list: 'The application list',
      app_info: 'The application of information',
      module_add: 'The new module',
      module_list: 'The module list',
      module_info: 'Module information',
      func_add: 'New features',
      func_list: 'Feature list',
      func_edit: 'Editing features'
    },
    menus: {
      menuinfo: 'Menu information',
      addmenu: 'The new menu',
      menulist: 'Menu list',
      menuname: 'Menu name',
      menucode: 'Menu coding',
      menuicon: 'Menu icon',
      menuparams: 'Menu parameter',
      menurouter: 'Menu resources',
      menuwindow: 'Open a new window',
      menuparams_error:
        'The menu parameters must be in JSON format. Check the menu parameters',
      menutree: 'The menu tree'
    },
    users: {
      append_user: 'Add user',
      user_name: 'login ID',
      nick_name: 'The user name',
      user_status: 'User state',
      user_wechat: 'User WeChat',
      user_email: 'User mailbox',
      user_avatar: 'The avatars',
      user_mobile: 'User phone',
      user_name_validate:
        'Please enter 3-20 Chinese or English or numeric login id',
      user_mobile_validate: 'Please input the correct mobile phone number',
      user_email_validate: 'Please enter the correct email address',
      user_info_center: 'Personal center',
      user_basic_info: 'The basic information',
      user_safe_info: 'Safety information',
      avata_advice:
        'Suggestion: Choose a personal identification photo as your profile picture so that other members can recognize you more easily',
      avata_tips: 'Only JPG and PNG files can be uploaded',
      user_name_tips:
        'The username is used to log in to the current platform. The username can contain only digits and underscores (_).',
      user_nickname_tips:
        'You can give yourself a name, so that people can easily find you.',
      password_tips:
        "If you forget your current password, you can change it using your mobile phone's verification code.",
      phone_tips:
        'When changing a mobile phone number, the system sends a verification code to the new mobile phone number and then enters the verification code to complete the modification.',
      email_tips: 'Please fill in the correct email address for easy contact.',
      change_password: 'Change the password',
      reset_password: 'reset passwords',
      reset_password_tip:
        'This operation will reset the user password to the default password. Are you sure?',
      old_password: 'The old password',
      new_password: 'The new password',
      confirm_password: 'Confirm password',
      user_add: 'New users',
      user_edit: 'Edit the user',
      bind_mobile: 'Bind mobile phone number',
      bind_email: 'Binding email',
      mobile: 'Mobile phone no.',
      email: 'email',
      mobile_error_tip: 'Please enter your mobile phone number',
      email_error_tip: 'Please enter email address'
    },
    roles: {
      role_code: 'Character encoding',
      role_name: 'Character name',
      role_type: 'Role type',
      add: 'The new role',
      edit: 'Editing the role'
    },
    system: {
      system_code: 'System coding',
      system_copyright: 'Copyright information',
      system_icp: 'Icp information',
      system_icpUrl: 'ICP lookup address',
      system_logo: 'System logo',
      system_themeColor: 'System colors',
      system_themeLayout: 'System layout',
      system_title1: 'Main title',
      system_title2: 'subtitle',
      system_homepage: 'Home Page',
      system_login_title1: 'Landing page main title',
      system_login_title2: 'Landing page subtitle',
      system_bind_menu: 'Menu binding'
    },
    dicts: {
      dicts_name: 'Name of the dictionary',
      dicts_app: 'Application of affiliation',
      dicts_code: 'The dictionary coding',
      dicts_entry_code: 'Dictionary entry coding',
      dicts_entry_name: 'Dictionary entry name',
      dicts_entry_value: 'Dictionary entry value',
      dicts_entry_enabled: 'enabled',
      add_dict: 'The new dictionary',
      edit_dict: 'Editing a dictionary',
      add_dicts_entry: 'New dictionary item',
      edit_dicts_entry: 'Edit dictionary items'
    },
    parameter: {
      param_name: 'The parameter name',
      param_code: 'Parameters of the code',
      param_value: 'The parameter value',
      param_remark: 'Parameters of the note',
      param_app: 'Application of affiliation',
      add_param: 'The new parameters',
      edit_param: 'Edit parameters'
    },
    templatefile: {
      templatefile_app: 'Application of affiliation',
      templatefile_name: 'The name of the template',
      templatefile_code: 'Template code',
      templatefile_code_tip:
        'The template can contain 2 to 50 underscores (_) digits',
      templatefile_file: 'Template file',
      templatefile_updateFile: 'Modify the file',
      add: 'A new template',
      edit: 'Edit template'
    },
    auth: {
      user_auth: 'Authorized users',
      fun_auth: 'Authorization capabilities'
    },
    orgs: {
      hierarchy: {
        name: 'The name of the hierarchy',
        level: 'Hierarchy level',
        icon: 'Level icon',
        add: 'The new level',
        edit: 'Edit the hierarchy',
        click_choose: 'Click on the select',
        choose_icon: 'Choose the icon',
        org: 'The organization'
      },
      manage: {
        agency_info: 'Agency information',
        next_agency: 'Institutions at a lower level',
        employee_info: 'Employee information',
        org_name: 'Organization name',
        org_code: 'Organization code',
        org_type: 'pattern of organization',
        org_level: 'Organizational hierarchy',
        org_sort: 'The sorting',
        add_agency: 'The new agency',
        edit_agency: 'Edit institutions',
        no_data: 'Temporarily no data',
        tree_name: 'Organization tree'
      }
    }
  }
};

export default en;
