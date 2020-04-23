import request from '@/utils/request'

var url = process.env.NODE_ENV === 'development' ? 'http://10.10.1.41:443' : ''
// var url = 'http://10.10.1.41'
// var url = ''

// http://10.10.1.41/Q/p.do?o=qgrxTOP30&showSql=gmqdbcenter

export function getTop30(params) {
  return request({
    url: url + '/Q/r.do?o=qgrxTOP30',
    method: 'get',
    params
  })
}

export function getStoreDayAvg(params) {
  return request({
    url: url + '/Q/r.do?o=xtkhrjdd',
    method: 'get',
    params
  })
}

export function getRetailShare(params) {
  return request({
    url: url + '/Q/r.do?o=djlszb',
    method: 'get',
    params
  })
}

export function getInSaleStorage(params) {
  return request({
    url: url + '/Q/r.do?o=xsfxJxc',
    method: 'get',
    params
  })
}

export function getLayoutStructure(params) {
  return request({
    url: url + '/Q/r.do?o=bmjg',
    method: 'get',
    params
  })
}

// export function getTop30(params) {
//   return request({
//     url: 'https://easy-mock.com/mock/5d0c221d15fc6012866760fe/example/getTop30',
//     method: 'get',
//     params
//   })
// }
