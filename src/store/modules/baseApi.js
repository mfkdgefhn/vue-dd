/*
 * @Description: 全部需要存入vuex的接口基础数据
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-11-26 13:37:46
 */

import { getProductstyle, getCustomer, getStore, getStores, getYear, getSeason } from '@/api/gmqApi'

const state = {
  productStyle: [], // 款号类别
  store: [],
  stores: [],
  customer: [],
  year: [],
  season: [],
  months: '111',
  listQuery: {

  }
}

const mutations = {
  // 设置款号类别
  SET_PORDUCTSTYLE: (state, productStyle) => {
    state.productType = productStyle
  },
  // 全部店仓
  SET_STORES: (state, store) => {
    state.store = store
  },
  // 经销商下属店仓
  SET_STORE: (state, store) => {
    state.store = store
  },
  SET_CUSTOMER: (state, customer) => {
    state.customer = customer
  },
  SET_YEAR: (state, year) => {
    state.year = year
  },
  SET_SEASON: (state, season) => {
    state.season = season
  },
  SET_MONTHS: (state, months) => {
    state.listQuery.months = months
    state.listQuery = Object.assign({}, state.listQuery)
  },
  SET_PROVINCE: (state, province) => {
    state.listQuery.province = province
    state.listQuery = Object.assign({}, state.listQuery)
  },
  SET_CITY: (state, city) => {
    state.listQuery.city = city
    state.listQuery = Object.assign({}, state.listQuery)
  },
  SET_PROVINCE_CITY: (state, city) => {
    state.listQuery.city = city
    state.listQuery.province = city
    state.listQuery = Object.assign({}, state.listQuery)
  },
  RESET_LISTQUERY: (state) => {
    state.listQuery = {
      months: state.listQuery.months
    }
    state.listQuery = Object.assign({}, state.listQuery)
  }
}

const actions = {
  // 获取款号类别
  getProductstyle({ commit }) {
    return new Promise((resolve, reject) => {
      getProductstyle().then(response => {
        const arrData = response.result
        var ob = ''
        const arr = []
        for (let i = 0; i < arrData.length; i++) {
          ob = { value: Math.round(1000 * (Math.random())), name: arrData[i].attribname }
          arr.push(ob)
        }
        commit('SET_PORDUCTSTYLE', arr)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取经销商与店仓
  // getStore({ commit }) {
  //   return new Promise((resole, reject) => {
  //     getCustomer().then(response => {
  //       var arr = response
  //       getStore().then(response => {
  //         response.forEach(element => {
  //           for (var i = 0; i < arr.length; i++) {
  //             if (arr[i].id === element.customerId) {
  //               if (arr[i].children) {
  //                 arr[i].children.push({
  //                   'id': element.storeId,
  //                   'name': element.storeName
  //                 })
  //               } else {
  //                 arr[i].children = [{
  //                   'id': element.storeId,
  //                   'name': element.storeName
  //                 }]
  //               }
  //             }
  //           }
  //         })
  //         commit('SET_STORE', arr)
  //       })
  //     })
  //   })
  // },

  getCustomer({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.customer.length === 0) {
        getCustomer().then(response => {
          commit('SET_CUSTOMER', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve()
      }
    })
  },
  // 获取经销商下属店仓
  getStore({ commit }, params) {
    return new Promise((resolve, reject) => {
      getStore({ customerId: params }).then(response => {
        commit('SET_STORE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取全部店仓
  getStores({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.stores.length > 0) {
        resolve()
      } else {
        getStores().then(response => {
          commit('SET_STORES', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  // 获取年份
  getYear({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.year.length > 0) {
        resolve()
      } else {
        getYear().then(response => {
          commit('SET_YEAR', response.result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  // 获取季节
  getSeason({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.season.length > 0) {
        resolve()
      } else {
        getSeason().then(response => {
          commit('SET_SEASON', response.result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  setMonths({ commit }, count) {
    return new Promise((resolve, reject) => {
      if (count) {
        commit('SET_MONTHS', count)
        resolve()
      } else {
        resolve()
      }
    })
  },
  setProvince({ commit }, count) {
    return new Promise((resolve, reject) => {
      commit('SET_PROVINCE', count)
      resolve()
    })
  },
  setCity({ commit }, count) {
    return new Promise((resolve, reject) => {
      commit('SET_CITY', count)
      resolve()
    })
  },
  setProvinceCity({ commit }, count) {
    return new Promise((resolve, reject) => {
      commit('SET_PROVINCE_CITY', count)
      resolve()
    })
  },
  setmonthstest({ commit }, count) {
    return new Promise((resolve, reject) => {
      commit('SET_MONTHS1', count)
      resolve()
    })
  },
  // 重置listQuery
  resetListQuery({ commit }) {
    return new Promise((resolve, reject) => {
      commit('RESET_LISTQUERY')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

