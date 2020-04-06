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
