<template>
	<div class="bottom-nav">
		<div class="left">
			<div class="nav-item">
				<span class="btm-icon one"></span>
				<span class="btm-title">客服</span>
			</div>
			<div class="nav-item">
				<span class="btm-icon two"></span>
				<span class="btm-title">店铺</span>
			</div>
			<div class="nav-item" @click="toggleBg">
				<span class="btm-icon three" :style="{backgroundPosition:collectBg}"></span>
				<span class="btm-title">收藏</span>
			</div>
		</div>
		<div class="right">
			<!-- 需要监听点击事件 -->
			<div class="add-to-cart" @click="addToCart">加入购物车</div>
			<div class="buy-now">立即购买</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailBottomNav',
		data(){
			return {
				isToggle: false, // 记录收藏图标是否切换
				collectBg: '', // 保存收藏图标背景y值
			}
		},
		methods: {
			/* 点击收藏，切换背景 */
			toggleBg(){
				if(!this.isToggle){
					this.collectBg = 'center -39px'
					this.isToggle = true
					return
				}
				this.collectBg = 'center 2px'
				this.isToggle = false
			},
			
			/* 点击添加到购物车 */
			addToCart(){
				// 发送自定义事件到父组件
				this.$emit('addGoods')
			}
		}
	}
</script>

<style>
	.bottom-nav{
		/* position: relative;
		bottom: 49px;
		left: 0;
		right: 0;
		height: 100%;
		z-index: 1000; */
		
		/* 用下面的写法  上面写法移动端浏览器显示有问题 */
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 49px;
		
		/* 布局 */
		display: flex;
		flex-direction: row;
	}
	.bottom-nav .left,
	.bottom-nav .right{
		flex: 50%;
		height: 100%;
		text-align: center;
	}
	
	.bottom-nav .left{
		display: flex;
		flex-direction: row;
		background-color: #fff;
	}
	.bottom-nav .left .nav-item{
		flex: 33%;
	}
	
	.btm-icon{
		display: block;
		height: 30px;
		width: 100%;
		background-size: 46%!important;
	}
	.nav-item .one{
		background: url(../../../assets/img/detail/detail_bottom.png) center -76px no-repeat;
	}
	.nav-item .two{
		background: url(../../../assets/img/detail/detail_bottom.png) center -141px no-repeat;
	}
	.nav-item .three{
		background: url(../../../assets/img/detail/detail_bottom.png) center 2px no-repeat;
	}
	
	.btm-title{
		font-size: 14px;
		height: 15px;
		line-height: 15px;
	}

	.right{
		display: flex;
		flex-direction: row;
		font-size: 16px;
	}
	.right .add-to-cart,
	.right .buy-now{
		flex: 50%;
		height: 49px;
		line-height:  49px;
	}
	.right .add-to-cart{
		color: #ff547d;
		background-color: #ffe6e8;
	}
	.right .buy-now{
		color: #FFE6E8;
		background-color: #ff547d;
	}
</style>
