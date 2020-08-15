/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-15 10:00:39
 * @LastEditors  : anan
 * @LastEditTime : 2020-01-12 14:59:05
 */
import request from '@/utils/request'

// var url = 'http://10.10.1.41:443' // 测试环境
// var url = '' // 生产环境

var url = process.env.NODE_ENV === 'development' ? 'http://10.10.1.41:443' : ''

// 'http://10.10.1.41/Q/p.do?o=zjxs'

// 大数据看板-全国
export function getBigData(params) {
  return request({
    url: url + '/Q/r.do?o=dsjkb',
    method: 'get',
    params
  })
}

// 大数据看板-省份
export function getProvinceData(params) {
  return request({
    url: url + '/Q/p.do?o=dsjkbProvince',
    method: 'get',
    params
  })
}

// 大数据看板-市
export function getCityData(params) {
  return request({
    url: url + '/Q/p.do?o=dsjkbCity',
    method: 'get',
    params
  })
}

// 看板-零售额度
export function getKBlsedM(params) {
  return request({
    url: url + '/Q/p.do?o=kb-lsed-m',
    method: 'get',
    params
  })
}

// 看板-店铺排名
export function getStoreRankingM(params) {
  return request({
    url: url + '/Q/p.do?o=kb-dppm-m',
    method: 'get',
    params
  })
}

// 看板-省份排名
export function getProvinceSaleM(params) {
  return request({
    url: url + '/Q/r.do?o=kb-sfxs-y',
    method: 'get',
    params
  })
}

// 看板-年同比-销\数量
export function getYearOnYear(params) {
  return request({
    url: url + '/Q/r.do?o=kb-ntb-xsl',
    method: 'get',
    params
  })
}

// 看板-会员复购
export function getVipRepeatPurchase(params) {
  return request({
    url: url + '/Q/r.do?o=kb-hyfg-m',
    method: 'get',
    params
  })
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////

// 总经销商
export function getCustomer(params) {
  return request({
    url: url + '/Q/r.do?o=bi-zjxs',
    method: 'get',
    params
  })
}

// 商品类别
// http://10.10.1.41/Q/p.do?o=bisplb&showSql=gmqdbcenter
export function getProductType(params) {
  return request({
    url: url + '/Q/p.do?o=bisplb',
    method: 'get',
    params
  })
}

// 风格类别
export function getProductStyle(params) {
  return request({
    url: url + '/Q/p.do?o=bifglb',
    method: 'get',
    params
  })
}

/** 零售分析 */
// 时段分析
export function getIntervalAnalysis(params) {
  return request({
    url: url + '/Q/p.do?o=sdfx',
    method: 'get',
    params
  })
}

/** 零售分析 */
// 时段分析-详细
export function getRetailItemAnalysis(params) {
  return request({
    url: url + '/Q/r.do?o=lsfx-xx',
    method: 'get',
    params
  })
}

// 是否会员
export function getVipAnalysis(params) {
  return request({
    url: url + '/Q/p.do?o=hyzb',
    method: 'get',
    params
  })
}

// 码段分析
export function getCodeSegment(params) {
  return request({
    url: url + '/Q/p.do?o=mdfx',
    method: 'get',
    params
  })
}

// 风格分析
export function getStyle(params) {
  return request({
    url: url + '/Q/p.do?o=fgfx',
    method: 'get',
    params
  })
}

/** 会员零售分析 */
// 折扣率
export function getDiscountRate(params) {
  return request({
    url: url + '/Q/p.do?o=zklfx',
    method: 'get',
    params
  })
}

// 单笔金额
export function getSingleSum(params) {
  return request({
    url: url + '/Q/p.do?o=dbjefx',
    method: 'get',
    params
  })
}

// 会员积分
export function getMembershipScore(params) {
  return request({
    url: url + '/Q/p.do?o=hyjffx',
    method: 'get',
    params
  })
}

// 商品类别
export function getCommodityCategory(params) {
  return request({
    url: url + '/Q/p.do?o=splbfx',
    method: 'get',
    params
  })
}

/** 会员购买次数分析 */
// 会员购买次数
export function getNumberOfMemberPurchases(params) {
  return request({
    url: url + '/Q/p.do?o=hygmcsfx',
    method: 'get',
    params
  })
}

// 会员购买件数
export function getNumberOfPurchasesByMembers(params) {
  return request({
    url: url + '/Q/p.do?o=hygmjxfx',
    method: 'get',
    params
  })
}

// 会员购买金额
export function getMemberPurchaseAmount(params) {
  return request({
    url: url + '/Q/p.do?o=hygmjefx',
    method: 'get',
    params
  })
}

// 会员购买周期
export function getMemberBuyingCycle(params) {
  return request({
    url: url + '/Q/p.do?o=hygmzqfx',
    method: 'get',
    params
  })
}
// 获取季节
export function getYear(params) {
  return request({
    url: url + '/Q/p.do?o=biyear',
    method: 'get',
    params
  })
}

// 获取季节
export function getSeason(params) {
  return request({
    url: url + '/Q/p.do?o=biseason',
    method: 'get',
    params
  })
}

// 获取店仓信息
export function getStore(params) {
  return request({
    url: url + '/Q/r.do?o=BIdcs',
    method: 'get',
    params
  })
}

// 获取店仓集信息
export function getStores(params) {
  return request({
    url: url + '/Q/r.do?o=BIdccxjgj',
    method: 'get',
    params
  })
}
// ---------------会员挖掘--------------------------------------------------------

// 获取会员挖掘信息
export function getVipExcavate(params) {
  return request({
    url: url + '/Q/r.do?o=hywj',
    method: 'get',
    params
  })
}
// 获取会员零售信息
export function getVipRetail(params) {
  return request({
    url: url + '/Q/r.do?o=hylsxx',
    method: 'get',
    params
  })
}
// 获取会员卡类型
export function getVipType(params) {
  return request({
    url: url + '/Q/r.do?o=VIPklx',
    method: 'get',
    params
  })
}
// 获取会员挖掘店仓信息
export function getHywjStores(params) {
  return request({
    url: url + '/Q/r.do?o=hywj-dc',
    method: 'get',
    params
  })
}

// -----------------------------------------------------------------------

// 获取员工离职率
export function getHumanCount(params) {
  return request({
    url: url + '/Q/p.do?o=yglzl-year',
    method: 'get',
    params
  })
}

// 获取员工男女比例
export function getSexProportion(params) {
  return request({
    url: url + '/Q/p.do?o=ygxbbl',
    method: 'get',
    params
  })
}

// 获取员工年龄比例
export function getAgeProportion(params) {
  return request({
    url: url + '/Q/p.do?o=ygnlbl',
    method: 'get',
    params
  })
}

// 获取员工地域分布
export function getRegionProportion(params) {
  return request({
    url: url + '/Q/p.do?o=ygdyfb',
    method: 'get',
    params
  })
}

// 获取员工离职原因分布
export function getReasonsForLeavingProportion(params) {
  return request({
    url: url + '/Q/r.do?o=yglzyyfx',
    method: 'get',
    params
  })
}

// 获取员工工龄分析
export function getWorkingYearsProportion(params) {
  return request({
    url: url + '/Q/r.do?o=ygglbl',
    method: 'get',
    params
  })
}

// 获取员工学历分析
export function getEducationProportion(params) {
  return request({
    url: url + '/Q/p.do?o=ygxlfx',
    method: 'get',
    params
  })
}

// ---------------------------------- 权限设置 -------------------------------------

// 总经销商
export function getQxszCustomer(params) {
  return request({
    url: url + '/Q/r.do?o=qxsz-jxs',
    method: 'get',
    params
  })
}
// 查询店仓
export function getQxszStore(params) {
  return request({
    url: url + '/Q/r.do?o=qxsz-sotre',
    method: 'get',
    params
  })
}

// ---------------------------------- 权限设置 -------------------------------------

// 查询店仓
export function getApiLog(params) {
  return request({
    url: url + '/Q/r.do?o=jkfwtj',
    method: 'get',
    params
  })
}

