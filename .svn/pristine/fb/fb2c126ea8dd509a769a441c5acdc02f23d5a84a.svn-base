/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-12 15:47:06
 * @LastEditors: anan
 * @LastEditTime: 2019-10-14 17:22:39
 */

import china from 'echarts/map/js/china.js' // 引入中国地图数据

import anhui from 'echarts/map/js/province/anhui.js'
import aomen from 'echarts/map/js/province/aomen.js'
import beijing from 'echarts/map/js/province/beijing.js'
import chongqing from 'echarts/map/js/province/chongqing.js'
import fujian from 'echarts/map/js/province/fujian.js'
import gansu from 'echarts/map/js/province/gansu.js'
import guangdong from 'echarts/map/js/province/guangdong.js'
import guangxi from 'echarts/map/js/province/guangxi.js'
import guizhou from 'echarts/map/js/province/guizhou.js'
import hainan from 'echarts/map/js/province/hainan.js'
import hebei from 'echarts/map/js/province/hebei.js'
import heilongjiang from 'echarts/map/js/province/heilongjiang.js'
import henan from 'echarts/map/js/province/henan.js'
import hubei from 'echarts/map/js/province/hubei.js'
import hunan from 'echarts/map/js/province/hunan.js'
import jiangsu from 'echarts/map/js/province/jiangsu.js'
import jiangxi from 'echarts/map/js/province/jiangxi.js'
import jilin from 'echarts/map/js/province/jilin.js'
import liaoning from 'echarts/map/js/province/liaoning.js'
import neimenggu from 'echarts/map/js/province/neimenggu.js'
import ningxia from 'echarts/map/js/province/ningxia.js'
import qinghai from 'echarts/map/js/province/qinghai.js'
import shandong from 'echarts/map/js/province/shandong.js'
import shanghai from 'echarts/map/js/province/shanghai.js'
import shanxi from 'echarts/map/js/province/shanxi.js'
import shanxi1 from 'echarts/map/js/province/shanxi1.js'
import sichuan from 'echarts/map/js/province/sichuan.js'
import taiwan from 'echarts/map/js/province/taiwan.js'
import tianjin from 'echarts/map/js/province/tianjin.js'
import xianggang from 'echarts/map/js/province/xianggang.js'
import xinjiang from 'echarts/map/js/province/xinjiang.js'
import xizang from 'echarts/map/js/province/xizang.js'
import yunnan from 'echarts/map/js/province/yunnan.js'
import zhejiang from 'echarts/map/js/province/zhejiang.js'

import cityMap from '@/assets/geoJson/china-main-city/china-main-city-map.js' // 引入区县地图

// import { cityMap } from '@/assets/geoJson/china-main-city/china-main-city-map.js' // 引入区县地图

export function getProvince(provinceAlphabet, genJson) {
  switch (provinceAlphabet) {
    case 'china':
      genJson = china
      break
    case 'shanghai':
      genJson = shanghai
      break
    case 'hebei':
      genJson = hebei
      break
    case 'guangxi':
      genJson = guangxi
      break
    case 'shanxi':
      genJson = shanxi
      break
    case 'neimenggu':
      genJson = neimenggu
      break
    case 'liaoning':
      genJson = liaoning
      break
    case 'jilin':
      genJson = jilin
      break
    case 'heilongjiang':
      genJson = heilongjiang
      break
    case 'jiangsu':
      genJson = jiangsu
      break
    case 'zhejiang':
      genJson = zhejiang
      break
    case 'anhui':
      genJson = anhui
      break
    case 'fujian':
      genJson = fujian
      break
    case 'jiangxi':
      genJson = jiangxi
      break
    case 'shandong':
      genJson = shandong
      break
    case 'henan':
      genJson = henan
      break
    case 'hubei':
      genJson = hubei
      break
    case 'hunan':
      genJson = hunan
      break
    case 'guangdong':
      genJson = guangdong
      break
    case 'hainan':
      genJson = hainan
      break
    case 'sichuan':
      genJson = sichuan
      break
    case 'guizhou':
      genJson = guizhou
      break
    case 'yunnan':
      genJson = yunnan
      break
    case 'xizang':
      genJson = xizang
      break
    case 'shanxi1':
      genJson = shanxi1
      break
    case 'gansu':
      genJson = gansu
      break
    case 'qinghai':
      genJson = qinghai
      break
    case 'ningxia':
      genJson = ningxia
      break
    case 'xinjiang':
      genJson = xinjiang
      break
    case 'beijing':
      genJson = beijing
      break
    case 'tianjin':
      genJson = tianjin
      break
    case 'chongqing':
      genJson = chongqing
      break
    case 'xianggang':
      genJson = xianggang
      break
    case 'aomen':
      genJson = aomen
      break
    case 'taiwan':
      genJson = taiwan
      break
    default:
      break
  }
}

export function getCity(cityName, genJson) {
  console.log(cityMap[cityName])
  genJson = require('../assets/geoJson/china-main-city/' + cityMap[cityName] + '.json')
  // getJson(cityMap[cityName])
  // return () => import('@/assets/geoJson/china-main-city/' + cityMap[cityName] + '.json')

  // () => { return import '@/assets/geoJson/china-main-city/' + cityMap[cityName] + '.json' }
}

