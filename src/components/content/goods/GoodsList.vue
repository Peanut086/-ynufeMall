<template>
	<div class="goods">
		<!--用于展示首页商品-->
		<goods-list-item v-for="(item,index) in goods" 
			:goodsItem="item" 
			:key="index"
			class="goods-item"></goods-list-item>
	</div>
</template>

<script>
	// 导入子列表组件
	import GoodsListItem from "./GoodsListItem";

	export default {
		name: "GoodsList",
		props: {
			goods: {
				type: Array,
				default(){
					return []
				}
			}
		},
		components: {
			GoodsListItem
		}
	}
</script>

<style scoped>
	.goods{
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	.goods-item{
		width:46%;
		margin-top: 3px;
	}
</style>