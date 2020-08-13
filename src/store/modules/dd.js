/*
 * @Description: 全部需要存入vuex的接口基础数据
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-11-26 13:37:46
 */

import { getToken, getJsapiTicket } from '@/api/dd'

const state = {
  token: '',
  jsapiTicket: ''
}

const mutations = {
  // 设置会员挖掘数据
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_JSAPI_TICKET: (state, jsapiTicket) => {
    state.jsapiTicket = jsapiTicket
  }
}

const actions = {
  // 获取会员零售信息
  getToken({ commit }) {
    const params = {
      appkey: 'ding8nlgzrdxw3ihperi',
      appsecret: 'lpYTNARGRwExsAR1BKDPxXqhSeCb-aHGA7kJwleJqMzy49U9F6gTFKQSIUB4BOHN'
    }
    return new Promise((resolve, reject) => {
      getToken(params).then(response => {
        if (response.errmsg === 'ok') {
          commit('SET_TOKEN', response.access_token)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取jsapi_ticket零售信息
  getJsapiTicket({ commit }) {
    return new Promise((resolve, reject) => {
      getJsapiTicket({ 'access_token': state.token }).then(response => {
        commit('SET_JSAPI_TICKET', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

