/*
 * @Description: 全部需要存入vuex的接口基础数据
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2020-08-29 15:41:15
 */

import {
  getProductType, getProductStyle, getCustomer, getStore, getStores,
  getYear, getSeason, getVipExcavate, getVipRetail, getVipType,
  getHywjStores, getQxszCustomer, getQxszStore, getRetailItemAnalysis,
  getRetailItemAnalysis1, getRetailItemAnalysis2, getRetailItemAnalysis3,
  getRetailItemAnalysis4, getRetailItemAnalysis5, getRetailItemAnalysis6,
  xnclsfx, yjdctbfx
} from '@/api/gmqApi'

const state = {
  productStyle: [], // 款号风格
  productType: [], // 款号类别
  store: [],
  stores: [],
  customer: [],
  year: [],
  season: [],
  months: '',
  listQuery: {},
  vipExcavate: [],
  vipRetail: [],
  vipType: [],
  hywjStores: [],
  qxszCustomer: [],
  qxszStore: [],
  apiLog: [],
  retailItemAnalysis: [],
  xnclsfx: [],
  yjdctbfx: []
}

const mutations = {
  // 设置会员挖掘数据
  SET_VIP_EXCAVATE: (state, vipExcavate) => {
    state.vipExcavate = vipExcavate
  },
  // 设置会员卡类型
  SET_VIP_TYPE: (state, vipType) => {
    state.vipType = vipType
  },
  // 设置会员零售信息
  SET_VIP_RETAIL: (state, vipRetail) => {
    state.vipRetail = vipRetail
  },
  // 设置会员挖掘店仓信息
  SET_HYWJ_STORES: (state, hywjStores) => {
    state.hywjStores = hywjStores
  },
  // 设置款号风格
  SET_PORDUCTSTYLE: (state, productStyle) => {
    state.productStyle = productStyle
  },
  // 设置款号类别
  SET_PORDUCTTYPE: (state, productType) => {
    state.productType = productType
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
  },
  SET_QXSZ_CUSTOMER: (state, qxszCustomer) => {
    state.qxszCustomer = qxszCustomer
  },
  SET_QXSZ_STORE: (state, qxszStore) => {
    state.qxszStore = qxszStore
  },
  // 接口访问统计
  SET_APILOG: (state, apiLog) => {
    state.apiLog = apiLog
  },
  SET_RETAIL_ITEM_ANALYSIS: (state, retailItemAnalysis) => {
    state.retailItemAnalysis = retailItemAnalysis
  },
  SET_XNCLSFX: (state, xnclsfx) => {
    state.xnclsfx = xnclsfx
  },
  SET_YJDCTBFX: (state, yjdctbfx) => {
    state.yjdctbfx = yjdctbfx
  }
}

const actions = {

  // 获取零售信息
  getRetailItemAnalysis({ commit }, count) {
    return new Promise((resolve, reject) => {
      if (count.singleAmount) { // 单笔金额
        getRetailItemAnalysis1(count).then(response => {
          commit('SET_RETAIL_ITEM_ANALYSIS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else if (count.membershipPoints) { // 会员积分
        getRetailItemAnalysis2(count).then(response => {
          commit('SET_RETAIL_ITEM_ANALYSIS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else if (count.frequency) { // 次数
        getRetailItemAnalysis3(count).then(response => {
          commit('SET_RETAIL_ITEM_ANALYSIS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else if (count.pieceQty) { // 次数
        getRetailItemAnalysis4(count).then(response => {
          commit('SET_RETAIL_ITEM_ANALYSIS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else if (count.cycle) { // 次数
        getRetailItemAnalysis5(count).then(response => {
          commit('SET_RETAIL_ITEM_ANALYSIS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else if (count.amount) { // 次数
        getRetailItemAnalysis6(count).then(response => {
          commit('SET_RETAIL_ITEM_ANALYSIS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else { // 其它计算方式
        getRetailItemAnalysis(count).then(response => {
          commit('SET_RETAIL_ITEM_ANALYSIS', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  },

  // 获取会员零售信息
  getVipRetail({ commit }, count) {
    return new Promise((resolve, reject) => {
      getVipRetail(count).then(response => {
        commit('SET_VIP_RETAIL', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取会员挖掘信息
  getVipExcavate({ commit }, count) {
    return new Promise((resolve, reject) => {
      getVipExcavate(count).then(response => {
        commit('SET_VIP_EXCAVATE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取会员卡类型
  getVipType({ commit }, count) {
    return new Promise((resolve, reject) => {
      getVipType(count).then(response => {
        commit('SET_VIP_TYPE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取全部店仓
  getHywjStores({ commit }, count) {
    return new Promise((resolve, reject) => {
      if (state.stores.length > 0) {
        resolve()
      } else {
        getHywjStores(count).then(response => {
          commit('SET_HYWJ_STORES', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  },

  // 获取款号风格
  getProductStyle({ commit }) {
    return new Promise((resolve, reject) => {
      getProductStyle().then(response => {
        const arrData = response.result
        var ob = ''
        const arr = []
        for (let i = 0; i < arrData.length; i++) {
          ob = {
            value: arrData[i].id,
            name: arrData[i].attribname
          }
          arr.push(ob)
        }
        commit('SET_PORDUCTSTYLE', arr)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取款号类别
  getProductType({ commit }) {
    return new Promise((resolve, reject) => {
      getProductType().then(response => {
        const arrData = response.result
        var ob = ''
        const arr = []
        for (let i = 0; i < arrData.length; i++) {
          ob = {
            value: arrData[i].id,
            name: arrData[i].attribname
          }
          arr.push(ob)
        }
        commit('SET_PORDUCTTYPE', arr)
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
  // 获取权限设置-经销商
  getQxszCustomer({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.customer.length === 0) {
        getQxszCustomer().then(response => {
          commit('SET_QXSZ_CUSTOMER', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve()
      }
    })
  },
  // 获取权限设置-店仓
  getQxszStore({ commit }, params) {
    return new Promise((resolve, reject) => {
      if (state.customer.length === 0) {
        getQxszStore(params).then(response => {
          commit('SET_QXSZ_STORE', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve()
      }
    })
  },
  // 获取经销商
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
  },
  // 接口访问统计
  setApiLog({ commit }, apiLog) {
    return new Promise((resolve, reject) => {
      commit('SET_APILOG', apiLog)
      resolve()
    })
  },
  // 新南昌零售分析
  xnclsfx({ commit }, params) {
    return new Promise((resolve, reject) => {
      xnclsfx(params).then(response => {
        commit('SET_XNCLSFX', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新南昌零售分析
  yjdctbfx({ commit }, params) {
    return new Promise((resolve, reject) => {
      yjdctbfx(params).then(response => {
        commit('SET_YJDCTBFX', response)
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

