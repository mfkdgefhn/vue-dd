/*
 * @Description: 全部需要存入vuex的接口基础数据
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2020-09-19 15:31:47
 */

import { getGicCoupon } from '@/api/gic'
import { deepCompare } from '@/utils/obj'

const state = {
  gicCoupon: [],
  gicSelectParams: {}
}
const mutations = {
  SET_GIC_COUPON: (state, gicCoupon) => {
    state.gicCoupon = gicCoupon
  },
  SET_GIC_SELECT_PARAMS: (state, params) => {
    state.gicSelectParams = params
  }
}

const actions = {
  getGicCoupon({ commit }, params) {
    return new Promise((resolve, reject) => {
      const ben = deepCompare(state.gicSelectParams, params)
      if (ben) {
        if (state.gicCoupon.length === 0) {
          getGicCoupon(params).then(response => {
            if (response) {
              commit('SET_GIC_COUPON', response)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        } else {
          resolve()
        }
      } else {
        commit('SET_GIC_SELECT_PARAMS', params)
        getGicCoupon(params).then(response => {
          if (response) {
            commit('SET_GIC_COUPON', response)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
