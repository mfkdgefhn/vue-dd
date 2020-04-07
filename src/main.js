/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-09-27 16:04:08
 * @LastEditors: anan
 * @LastEditTime: 2019-12-10 17:04:01
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n   该处使用的是英文，需要将其改成中文，不然全部组件都会变成英文
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

// 导入时间插件momentjs
import moment from 'moment'
Vue.prototype.$moment = moment // 赋值使用
moment.locale('zh-cn') // 需要汉化

// 引入PDF插件
import htmlToPdf from '@/utils/htmlToPdf'
Vue.use(htmlToPdf)

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import echarts from 'echarts'
import 'echarts-wordcloud' // 词云图

import BaiduMap from 'vue-baidu-map' // 百度地图

import AMap from 'vue-amap' // 高德地图

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

// 滚动条
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.use(VXETable)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'BpD19viofsmIEpkDSUU4mbYT2E8qog6n'
})

Vue.use(AMap)

AMap.initAMapApiLoader({
  // 高德KEY
  key: '74ba8d73b1e7ffd17da9f4b0d3524b01',
  plugin: ['AMap.Geolocation']
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV !== 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
