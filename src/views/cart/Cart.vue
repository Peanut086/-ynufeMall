<template>
	<nav-bar class="cart">
		<div slot="center">购物车({{cartLength}})</div>
	</nav-bar>
</template>

<script>
	// 导入mapGetters辅助函数 
	import { mapGetters } from 'vuex'
	
	// 导入顶部导航组件
	import NavBar from 'components/common/navbar/NavBar.vue'
	
	export default {
		name: "Cart",
		components: {
			NavBar
		},
		computed: {
			// 这里不想改名字了  所以用的是数组形式    要改名字的话采用对象形式
			...mapGetters(['cartLength'])
		}
	}
</script>

<style scoped>
	.cart{
		color: #fff;
		font-size: 18px;
		font-weight: 500;
		background-color: #f1a1b1;
	}
</style>