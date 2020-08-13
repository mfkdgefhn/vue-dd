
import request from '@/utils/request'

var url = process.env.NODE_ENV === 'development' ? 'https://oapi.dingtalk.com/department/list?access_token=62a9d55f7eaf33a084286906c067c9ec&fetch_child=false' : ''

// var ddUrl = 'https://oapi.dingtalk.com'

// 大数据看板-全国
export function getBigData(params) {
  return request({
    url: url + '/Q/r.do?o=dsjkb',
    method: 'get',
    params
  })
}

// 获取Token
export function getToken(params) {
  return request({
    url: 'dd/gettoken',
    method: 'get',
    params
  })
}

// 获取jsapi_ticket
export function getJsapiTicket(params) {
  return request({
    url: 'dd/get_jsapi_ticket',
    method: 'get',
    params
  })
}
