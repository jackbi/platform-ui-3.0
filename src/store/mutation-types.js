/*
 * @Description: 定义所有状态常量
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2021-03-31 15:25:07
 * @LastEditors: wenbin
 * @LastEditTime: 2022-05-07 14:19:03
 * @FilePath: /magus-platform-ui-3.0/src/store/mutation-types.js
 * Copyright (C) 2021 wenbin. All rights reserved.
 */

/**
 * @description:菜单管理
 * @param {*}
 * @return {*}
 */
// 菜单的获取
export const GET_MENU_LIST = 'GET_MENU_LIST';
export const SET_MENU_LIST = 'SET_MENU_LIST';

// 菜单树
export const GET_MENUS_TREE = 'GET_MENUS_TREE';
export const SET_MENUS_TREE = 'SET_MENUS_TREE';

/**
 * @description: 应用管理
 * @param {*}
 * @return {*}
 */
// 应用功能树的获取
export const GET_APPS_TREE = 'GET_APPS_TREE';
export const SET_APPS_TREE = 'SET_APPS_TREE';

/**
 * @description: 应用注册
 * @param {*}
 * @return {*}
 */
// 菜单的获取
export const GET_APPS_LIST = 'GET_APPS_LIST';
export const SET_APPS_LIST = 'SET_APPS_LIST';

/**
 * @description: 用户管理
 * @param {*}
 * @return {*}
 */
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';

/**
 * @description: 系统初始化
 * @param {*}
 * @return {*}
 */
//  获取系统信息
export const GET_SYSTEM_INFO = 'GET_SYSTEM_INFO';
export const SET_SYSTEM_INFO = 'SET_SYSTEM_INFO';

/**
 * @description: 实时库告警
 * @param {*}
 * @return {*}
 */
// 连接websocket
export const GET_ALARM_CONNECT_WEBSOCKET = 'GET_ALARM_CONNECT_WEBSOCKET';
export const SET_ALARM_CONNECT_WEBSOCKET = 'SET_ALARM_CONNECT_WEBSOCKET';

// 初始化语音播报
export const GET_ALARM_SPEAK_INIT = 'GET_ALARM_SPEAK_INIT';
export const SET_ALARM_SPEAK_INIT = 'SET_ALARM_SPEAK_INIT';
