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

// 详情页推荐商品数据请求方法
export function getRecommend(){
	return request({
		url: '/recommend'
	})
}


// 用于整合商品信息轮播图下的detailBaseInfo组件所需的数据
export class Goods{
	constructor(columns,itemInfo,services){
		this.columns = columns;
		this.title = itemInfo.title;
		this.oldPrice = itemInfo.oldPrice;
		this.lowNowPrice = itemInfo.lowNowPrice;
		this.price = itemInfo.price;
		this.services = services;
		this.discountDesc = itemInfo.discountDesc;
		this.discountBgColor = itemInfo.discountBgColor;
	}
}

// 整合商家信息展示所需的数据
export class Shop{
	constructor(data){
		this.shopName = data.name;
		this.logo = data.shopLogo;
		this.fans = data.cFans;
		this.sells = data.cSells;
		this.goods = data.cGoods;
		this.shopUrl = data.shopUrl;
		this.score = data.score;
		this.level = data.level;
	}
}

// 整合商品详情数据
export class GoodsInfo{
	constructor(detail){
		this.desc = detail.desc;
		this.key = detail.detailImage[0].key;
		this.list = detail.detailImage[0].list;
	}
}

// 整合商品参数所需要的数据
export class ItemParam{
	constructor(info,rule){
		// 有些可能没有图片
		this.image = info.image ? info.image : "";
		this.infoKey = info.key;
		this.ruleKey = rule.key;
		this.set = info.set;
		
		this.disclaimer = rule.disclaimer;
		this.table = rule.tables[0];
	}
}

// 整合用户评论相关的数据
export class Comment{
	constructor(cRate,list){
		this.cRate = cRate;
		// 当评论数据不为0时保存其他数据
		if(cRate !== 0){
			this.comment = list[0].content;
			this.explain = list[0].explain;
			this.cretaed = list[0].created;
			
			this.images = list[0].images;
			this.userIcon = list[0].user.avatar;
			this.userName = list[0].user.uname;
			this.style = list[0].style;
		}
	}
}