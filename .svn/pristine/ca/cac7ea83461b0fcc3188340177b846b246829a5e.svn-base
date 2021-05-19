/*
 * @Description: 获取token工具
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-09-27 16:20:39
 */

import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
