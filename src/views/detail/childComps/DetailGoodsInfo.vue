<template>
	<div v-if="Object.keys(goodsInfo).length !== 0" class="goodsContainer">
		<!-- 头部 -->
		<div class="goods-detail-hd clear-fix">
			<div class="start"></div>
			<div class="desc">{{goodsInfo.desc}}</div>
			<div class="end"></div>
			<div class="goods-detail-title">
				<img src="../../../assets/img/detail/selledshow.svg">
				{{goodsInfo.key}}
			</div>
		</div>
		<!-- 图片展示 -->
		<div class="goods-detail-bd">
			<div  class="imgComtainer" v-for="(item,index) in goodsInfo.list">
				<img :src="'http:' + item" @load="imgLoaded">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailGoodsInfo',
		props: {
			goodsInfo: {
				type: Object,
			}
		},
		data(){
			return {
				listLength: 0 ,// 保存图片数量
				counter: 0,
			}
		},
		methods: {
			// 监听图片加载完成， 发送事件刷新content
			imgLoaded(){
				// 加载完最后一张   发送自定义事件
				if(++this.counter === this.listLength){
					this.$emit('loaded')
				}
			}
		},
		watch: {
			// 监听goodsInfo对象变化
			goodsInfo: function(){
				this.listLength = this.goodsInfo.list.length;
			}
		}
	}
</script>

<style>
	.goodsContainer{
		width: 100%;
		margin-top: 20px;
	}
	
	/* 头部desc */
	.goods-detail-hd{
		padding: 10px 15px;
	}
	
	.goods-detail-hd>.desc{
		color: #626262;
		font-size: 18px;
		margin: 20px 0;
	}
	
	.goods-detail-hd>.start,
	.goods-detail-hd>.end{
		position: relative;
		height: 1px;
		width: 90px;
		background-color: #aaaaaa;
	}
	
	.goods-detail-hd>.end{
		float: right;
	}
	
	.goods-detail-hd>.start::before,
	.goods-detail-hd>.end::before{
		position: absolute;
		content: "";
		height: 10px;
		width: 10px;
		display: block;
		background-color: pink;
	}
	
	.goods-detail-hd>.start::before{
		top: -10px;
	}
	
	.goods-detail-hd>.end::before{
		top: -10px;
		right: 0px;
	}
	
	.goods-detail-hd>.goods-detail-title{
		color: #595959;
		font-size: 20px;
	}
	
	.goods-detail-title img{
		width: 20px;
		height: 20px;
	}

	/* 图片展示 */
	.goods-detail-bd{
		width: 100%;
	}
	
	.goods-detail-bd .imgComtainer{
		width: 100%;
	}
	
	.imgComtainer>img{
		width: 100%;
		height: 100%;
	}
</style>
