/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2021-01-19 13:52:13
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import baseApi from './modules/baseApi'
import table from './modules/table'
import dd from './modules/dd'
import gic from './modules/gic'
import setmeal from './modules/setmeal'
import unitPriceCustomer from './modules/unitPriceCustomer'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    baseApi,
    table,
    dd,
    gic,
    setmeal,
    unitPriceCustomer
  },
  getters
})

export default store
