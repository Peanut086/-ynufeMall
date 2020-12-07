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


// 用于整合商品信息轮播图下的detailBaseInfo组件所需的数据
export class Goods{
	constructor(columns,itemInfo,services){
		this.columns = columns;
		this.title = itemInfo.title;
		this.oldPrice = itemInfo.oldPrice;
		this.lowNowPrice = itemInfo.lowNowPrice;
		this.services = services.shopInfo.services;
		this.discountDesc = itemInfo.discountDesc;
		this.discountBgColor = itemInfo.discountBgColor;
	}
}