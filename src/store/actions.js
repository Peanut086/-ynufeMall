// 导入常量
import {
	ADD_COUNT,
	ADD_ITEM
} from './mutations_type.js'

export default {
		// 先判断数组中是否已经存在要添加的商品  不用解构赋值的话：addCartItem({commit},products)
		addCartItem({state,commit},products){
			// context  上下文对象  默认参数  
			let oldProduct = state.cartList.find(item => products.iid === item.iid)
			
			// 如果存在
			if(oldProduct){
				commit(ADD_COUNT,oldProduct)
			}else{
				commit(ADD_ITEM,products)
			}
		}
	}