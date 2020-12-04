import request from './request'

// 商品详情数据请求方法
export function getDetail(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}