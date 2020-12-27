import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

// 使用vuex插件
Vue.use(Vuex)

// 创建vuex的实例
const store = new Vuex.Store({  // 大坑！！！！S一定要注意大写
	/* 保存公共的状态 */
	state: {
		cartList: [],  // 用于保存商品
	},
	mutations,
	actions
})

// 导出
export default store