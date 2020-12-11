<template>
	<div class="base-container" v-if="Object.keys(goodsData).length !== 0">
		<p class="title">{{goodsData.title}}</p>
		
		<div class="columns">
			<div v-for="item in goodsData.columns">{{item}}</div>
		</div>
		
		<div class="price">
			<span class="old-price">{{goodsData.price}}</span>
			<span class="now-price">{{goodsData.lowNowPrice}}</span>
			<span class="discount" :style="{backgroundColor: goodsData.discountBgColor}">{{goodsData.discountDesc}}</span>
		</div>
		
		<div class="services">
			<div class="services-item" v-for="item in goodsData.services">
				<img :src="item.icon" class="icon"></img>
				<span class="item-name">{{item.name}}</span>
			</div>
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
	.base-container{
		width: 100%;
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
		font-size: 12px;
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
		border-bottom: 1px solid #ccc;
	}
	
	.old-price{
		float: left;
		font-size: 16px;
		font-weight: 600;
		color: rgb(255, 88, 120);
	}
	
	.now-price{
		color: #999999;
		float: left;
		margin-left: 6px;
		margin-top: 3px;
		font-size: 12px;
		text-decoration: line-through;
	}
	
	.discount{
		display: inline-block;
		font-size: 12px;
		text-align: center;
		margin-left: 6px;
		padding: 0 2px;
		border-radius: 3px;
		color: #0F0F0F;
		vertical-align: middle;
	}
	
	.services{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 2px;
	}
	
	.services-item{
		flex: 1;
		text-align: center;
	}
	.services-item> img{
		width: 10px;
		height: 10px;
	}
	.services-item>.item-name{
		font-size: 12px;
	}
</style>
