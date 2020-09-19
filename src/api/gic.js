/*
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-09-18 09:46:25
 * @LastEditors: anan
 * @LastEditTime: 2020-09-18 16:12:19
 */

import request from '@/utils/request'

var url = process.env.NODE_ENV === 'development' ? 'http://10.10.1.41:443' : ''

//
export function getGicCoupon(params) {
  return request({
    url: url + '/Q/r.do?o=kqsyqk',
    method: 'get',
    params
  })
}

export function getXuliangzhanList() {
  return request({
    url: url + 'https://api.xuliangzhan.com:10443/api/user/list',
    method: 'get'
  })
}

//
export function getXuliangzhan(params) {
  return request({
    url: 'https://api.xuliangzhan.com:10443/api/pub/page/list/10/1',
    method: 'get',
    params
  })
}

//
export function getXuliangzhanDelete() {
  return request({
    url: 'https://api.xuliangzhan.com:10443/api/pub/save',
    method: 'get'
  })
}

//
export function getXuliangzhanSave() {
  return request({
    url: 'https://api.xuliangzhan.com:10443/api/pub/save',
    method: 'get'
  })
}
