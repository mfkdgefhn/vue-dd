/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-14 15:04:30
 * @LastEditors: anan
 * @LastEditTime: 2019-10-14 15:05:04
 */
const files = require.context('.', false, /\.json$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.json)/g, '')] = files(key).default
})

export default modules
