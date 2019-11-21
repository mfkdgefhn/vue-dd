/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-11-15 11:26:43
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
  season: state => state.baseApi.season
}
export default getters
