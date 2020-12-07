<template>
	<div class="container">
		<p class="title">{{goodsData.title}}</p>
		
		<div class="columns">
			<div v-for="item in goodsData.columns">{{item}}</div>
		</div>
		
		<div class="price">
			<span class="old-price">{{goodsData.oldPrice}}</span>
			<span class="now-price">{{goodsData.lowNowPrice}}</span>
			<span class="discount" :style="{backgroundColor: goodsData.discountBgColor}">{{goodsData.discountDesc}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailkBaseInfo',
		props: {
			// 接收父组件传递的数据
			goodsData: {
				type: Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scope>
	.container{
		width: 100%;
		background-color: #EEE;
		box-shadow: 2px -2px 2px 2px #ccc inset,
								-2px -2px 2px 2px #ccc inset;
		padding: 8px;
	}
	
	.title{
		margin-top: 4px;
		font-size: 18px;
		border-bottom: 1px solid #ccc;
	}
	
	.columns{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.columns>div{
		flex: 1;
		height: 20px;
		line-height: 20px;
		text-align: center;
		color: darkgray;
		margin: 2px;
	}
	
	.price{
		margin-top: 6px;
		padding: 4px;
		font-size: 24px
	}
	
	.old-price{
		float: left;
		color: red;
		text-decoration: line-through;
	}
	
	.now-price{
		color: red;
		float: left;
		margin-left: 6px;
	}
	
	.discount{
		display: inline-block;
		font-size: 18px;
		margin-left: 6px;
		border-radius: 3px;
		color: #0F0F0F;
	}
</style>
