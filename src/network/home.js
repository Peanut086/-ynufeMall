import request from "./request";

/*首页轮播、推荐部分数据请求函数*/
function getHomeMultidata() {
	return request({
		url: '/home/multidata'
	})
}

/*首页流行、新款、精选商品数据请求函数*/
function getHomeGoods(type,page) {
	return request({
		url: '/home/data',
		params: {
			type,
			page
		}
	})
}

export {
	getHomeMultidata,
	getHomeGoods
}