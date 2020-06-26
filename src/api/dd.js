
import request from '@/utils/request'

var url = process.env.NODE_ENV === 'development' ? 'https://oapi.dingtalk.com/department/list?access_token=62a9d55f7eaf33a084286906c067c9ec&fetch_child=false' : ''

// 大数据看板-全国
export function getBigData(params) {
  return request({
    url: url + '/Q/r.do?o=dsjkb',
    method: 'get',
    params
  })
}
