/*
 * @Descripttion:
 * @version:
 * @Author: anan
 * @Date: 2020-04-06 09:31:37
 * @LastEditors: anan
 * @LastEditTime: 2021-01-19 13:18:58
 */
/**
 * 数组分页
 * @param {*} pageNo 第几页，必须为正整数
 * @param {*} pageSize 页条数
 * @param {*} array 传进来的数组
 */
export function pagination(pageNo, pageSize, array) {
  var offset = (pageNo - 1) * pageSize
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
}

/**
 * 将响应的数据为数字的字符串字段转换成数字
 * @param {*} data
 * @param  {...any} arr
 */
export function transNumber(data, ...arr) {
  data.forEach(element => {
    for (const key in element) {
      arr.forEach(array => {
        if (key === array) {
          element[key] = Number.parseInt(element[key])
        }
      })
    }
  })
  return data
}
