/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-11-23 09:13:55
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  store: state => state.baseApi.store,
  customer: state => state.baseApi.customer,
  year: state => state.baseApi.year,
  season: state => state.baseApi.season,
  months: state => state.baseApi.months,
  listQuery: state => state.baseApi.listQuery,
  top30: state => state.table.top30,
  storeDayAvg: state => state.table.storeDayAvg,
  retailShare: state => state.table.retailShare,
  lastRetailShare: state => state.table.lastRetailShare,
  inSaleStorage: state => state.table.inSaleStorage,
  layoutStructure: state => state.table.layoutStructure

}
export default getters
