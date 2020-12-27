// 导入常量


export default {
		/* 将要添加的商品加入到数组中 */
		/* 
		不仅是异步操作需要放到actions对象中   类似于下面这样的复杂操作也可以通过actions来修改状态  
		最好是让一个mutation只负责处理一件事情
		addCartItem(state,products){  // state默认参数
			// 先查找数组中是否已经含有要添加的商品
			let oldProduct = state.cartList.find(item => item.iid === products.iid)
			
			// 对数组是否已经包含要添加的商品的信息的两种情况的不同处理方法
			if(oldProduct){
				// 已经包含 此时只需要将该商品的计数属性count+1  不需要对cartList重复添加子元素
				oldProduct.count += 1
			}else{
				// 如果不存在就将当前商品信息添加到数组中   并将其count属性值设置为1
				products.count = 1
				state.cartList.push(products)
			}
		} */
	
		/* 商品第一次被添加  添加商品 */
		addItem(state,payload){
			// 将count重置为1
			payload.count = 1
			// 将对象添加到数组中
			state.cartList.push(payload)
		},
		
		/* 商品已经存在  只需要将计数+1 */
		addCount(state,payload){
			payload.count += 1
		}
	}