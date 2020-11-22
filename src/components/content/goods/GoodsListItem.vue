<template>
	<!--用于显示父组件传递过来的子商品内容内容-->
	<div>
		<img :src="goodsItem.show.img" alt="">
	</div>
</template>

<script>
	export default {
		name: "GoodListItem",
		props: {
			goodsItem: {
				type: Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	img{
		display: block!important;
		width: 100%;
		height: 100%;
	}
</style>