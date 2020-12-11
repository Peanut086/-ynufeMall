<template>
	<div class="shopInfo">
		<!-- 店铺logo及店铺名 -->
		<div class="shopName">
			<img :src="'http:' + shopInfo.logo" class="logo">
			<span class="name">{{shopInfo.shopName}}</span>
			<span class="level">
				<img src="../../../assets/img/detail/level.svg" 
				class="levelLogo" v-for="item in shopInfo.level">
			</span>
		</div>
		
		<!-- 店铺销量及评分 -->
		<div class="sellInfo">
			<!-- 左边 -->
			<div class="sellInfo-item">
				<span class="csell">
					<span class="cnumber">{{getSells}} 万</span>
					<span class="ctitle">总销量</span>
				</span>
				<span class="cgoods">
					<span class="cnumber">{{shopInfo.goods}}</span>
					<span class="ctitle">全部宝贝</span>
				</span>
			</div>
			<!-- 右边 -->
			<div class="sellInfo-item">
				<div class="score" v-for="item in shopInfo.score">
					<span>{{item.name}}</span>
					<span :class="{colorH: item.score >= 5 , colorL : item.score < 5}">
						{{item.score}}
					</span>
					<span v-if="item.score >= 5" class="colorH">
						高
					</span>
					<span v-else class="colorL">
						低
					</span>
				</div>
			</div>
		</div>
	
		<!-- 进店逛逛 -->
		<div class="comein">
			<div>进店逛逛</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'ShopBaseInfo',
		props: {
			// 接收父组件传过来的店铺信息数据对象
			shopInfo: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		computed: {
			// 处理总销量的显示方式
			getSells(){
				const temp = this.shopInfo.sells / 10000  // 转换为以万计数
				return temp.toFixed(2)
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* 商家信息 */
	.shopInfo{
		width: 100%;
		padding: 0 5px;
		margin-top: 10px;
	}
	
	.shopInfo .shopName{
		overflow: hidden;
		margin-left: 15px;
		padding: 5px;
	}
	
	.shopInfo .shopName .logo{
		float: left;
		width: 80px;
		height: 80px;
		border-radius: 40px;
		box-shadow: 2px -2px 3px 2px #ccc,
		-2px 2px 3px 2px #ccc;
	}
	
	.shopInfo .shopName .name{
		float: left;
		color: #0F0F0F;
		font-size: 24px;
		margin: 24px 0 0 20px;
	}
	
	.shopInfo .shopName .level{
		overflow: hidden;
	}
	
	.level .levelLogo{
		float: left;
		width: 20px;
		height: 20px;
		margin: 32px 0px;
	}
	.sellInfo{
		display: flex;
		flex-direction: row;
		width: 100%;
		border-top: 1px solid #ccc;
	}
	
	/* 销量信息 */
	.sellInfo .sellInfo-item{
		flex: 50%;
		padding: 10px 0;
	}

	/* 左边 */
	.sellInfo .sellInfo-item:nth-child(1){
		display: flex;
		flex-direction: row;
	}
	
	.csell,
	.cgoods{
		flex: 50%;
		padding-top: 20px;
		text-align: center;
	}
	
	.cgoods{
		border-right: 1px solid #ccc;
	}
	
	.csell .cnumber,
	.cgoods .cnumber{
		display: block;
		font-size: 20px;
		font-weight: 600;
	}
	
	.csell .ctitle,
	.cgoods .ctitle{
		color: #A9A9A9;
		font-size: 14px;
	}

	/* 右边 */
	.sellInfo .sellInfo-item:nth-child(2){
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	
	.sellInfo .score{
		flex: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-evenly;
		margin-left: 4px;
		font-size: 16px;
	}
	
	.score>span{
		flex: 1;
		margin: 4px 0;
		text-align: center;
	}
	
	.colorH{
		color: #fdaca2;
	}
	
	.colorL{
		color: #61934b;
	}

	/* 进店逛逛 */
	.comein{
		width: 100%;
		text-align: center;
		padding: 30px 0;
		border-bottom: 15px solid #e2e1e2;
	}
	
	.comein>div{
		width: 40%;
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		font-weight: 600;
		margin: 0 auto;
		border-radius: 8px;
		background-color: #dadada;
		box-shadow: 2px 2px 2px 1px #e5eae9 inset,
		-2px -2px 2px 1px #e5eae9 inset;
	}
</style>
