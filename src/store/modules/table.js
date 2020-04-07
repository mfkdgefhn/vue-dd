/*
 * @Description: 全部需要存入vuex的接口基础数据
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-11-26 13:37:46
 */

const state = {
  top30: [], // 全国日销TOP30 全部数据
  storeDayAvg: [], // 系统客户日均单店
  retailShare: [], // 冬季零售占比
  inSaleStorage: [], // 进销存
  layoutStructure: []
}

const mutations = {
  // 设置Top30数据
  SET_TOP30: (state, top30) => {
    state.top30 = top30
  },
  SET_STORE_DAY_AVG: (state, storeDayAvg) => {
    state.storeDayAvg = storeDayAvg
  },
  SET_RETAIL_SHARE: (state, retailShare) => {
    state.retailShare = retailShare
  },
  SET_IN_SALE_STORAGE: (state, inSaleStorage) => {
    state.inSaleStorage = inSaleStorage
  },
  SET_LAYOUT_STRUCTURE: (state, layoutStructure) => {
    state.layoutStructure = layoutStructure
  }
}

const actions = {
  setTop30({ commit }, data) {
    // commit('SET_TOP30', Object.assign({}, data))
    commit('SET_TOP30', data)
  },
  setStoreDayAvg({ commit }, data) {
    commit('SET_STORE_DAY_AVG', data)
  },
  setRetailShare({ commit }, data) {
    commit('SET_RETAIL_SHARE', data)
  },
  setInSaleStorage({ commit }, data) {
    commit('SET_IN_SALE_STORAGE', data)
  },
  setLayoutStructure({ commit }, data) {
    commit('SET_LAYOUT_STRUCTURE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

