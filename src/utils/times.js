var moment = require('moment')

/**
 * 获取时间年月日
 * @param {*} count 0：代表当日，1：代表明天，-1：代表昨天
 * @param {*} str 参数可为Y M D分别代表返回年 月  日，可自由选择，自由搭配，不选择默认为年月日，选择其他字符则选择空
 */
export function getDateStr(count, str) {
  count = (count === undefined) ? 0 : count
  str = (str === undefined) ? '' : str
  var dd = new Date()
  dd.setDate(dd.getDate() + count)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1
  var d = dd.getDate()
  m = m > 9 ? m : '0' + m
  d = d > 9 ? d : '0' + d
  if (str === '') {
    return '' + y + m + d
  } else if (str === 'Y') {
    return '' + y
  } else if (str === 'M') {
    return '' + m
  } else if (str === 'D') {
    return '' + d
  } else if (str === 'YM') {
    return '' + y + m
  } else if (str === 'MD') {
    return '' + m + d
  } else if (str === 'YMD') {
    return '' + y + m + d
  }
  return ''
}

/**
 * 获取季节,例:  getSeason('M',-1) 获取上人月的季节，返回值：春季
 * @param {*} str 格式为M：代表月 D：代表日
 * @param {*} count 可为正负整数，根据str的值来计算出提前几天或者几月后或前的日期
 */
export function getSeason(date) {
  var m = (date === undefined) ? moment().month() + 1 : moment(date).month() + 1
  var season = ''

  switch (m) {
    case 1: case 2: case 3:
      season = '春季'
      break
    case 4: case 5: case 6:
      season = '夏季'
      break
    case 7: case 8: case 9:
      season = '秋季'
      break
    case 10: case 11: case 12:
      season = '冬季'
      break
    default:
      season = ''
      break
  }
  return season
}

export function getSeasonNew(date) {
  var j = moment(date).format('Q')
  var season = ''
  switch (j) {
    case '1':
      season = '春'
      break
    case '2':
      season = '夏'
      break
    case '3':
      season = '秋'
      break
    case '4':
      season = '冬'
      break
    default:
      break
  }
  return season
}
