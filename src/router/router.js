import Vue from 'vue'
import VueRouter from "vue-router";

// 导入需要路由管理的组件（路由懒加载）
const Home = () => import('views/home/Home')
const Category = ()=> import('views/category/Category')
const Cart = ()=> import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 使用路由
Vue.use(VueRouter)

// 将路由映射关系抽离出来
const routes = [
	/*重定向*/
	{
		path: '/',
		redirect: '/home'
	},
	/*首页*/
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	/*分类*/
	{
		path: '/category',
		component: Category
	},
	/*购物车*/
	{
		path: '/shopcart',
		component: Cart
	},
	/*我的*/
	{
		path: '/profile',
		component: Profile
	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router