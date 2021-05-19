/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-14 14:16:41
 * @LastEditors: anan
 * @LastEditTime: 2019-10-14 14:16:41
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  if (!echarts.registerMap) {
    log('ECharts Map is not loaded')
    return;
  }
  echarts.registerMap('地区名': { json文件的内容 })
}));