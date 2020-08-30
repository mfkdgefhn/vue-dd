/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2020-08-29 15:41:24
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  store: state => state.baseApi.store,
  customer: state => state.baseApi.customer,
  productStyle: state => state.baseApi.productStyle,
  productType: state => state.baseApi.productType,
  year: state => state.baseApi.year,
  season: state => state.baseApi.season,
  months: state => state.baseApi.months,
  listQuery: state => state.baseApi.listQuery,
  vipExcavate: state => state.baseApi.vipExcavate,
  vipRetail: state => state.baseApi.vipRetail,
  vipType: state => state.baseApi.vipType,
  hywjStores: state => state.baseApi.hywjStores,
  top30: state => state.table.top30,
  storeDayAvg: state => state.table.storeDayAvg,
  retailShare: state => state.table.retailShare,
  lastRetailShare: state => state.table.lastRetailShare,
  lastMaxRetailShare: state => state.table.lastMaxRetailShare,
  inSaleStorage: state => state.table.inSaleStorage,
  layoutStructure: state => state.table.layoutStructure,
  qxszCustomer: state => state.baseApi.qxszCustomer,
  qxszStore: state => state.baseApi.qxszStore,
  apiLog: state => state.baseApi.apiLog,
  retailItemAnalysis: state => state.baseApi.retailItemAnalysis,
  ddToken: state => state.dd.token,
  jsapiTicket: state => state.dd.jsapiTicket,
  xnclsfx: state => state.baseApi.xnclsfx,
  yjdctbfx: state => state.baseApi.yjdctbfx
}
export default getters
