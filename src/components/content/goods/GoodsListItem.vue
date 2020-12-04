<template>
	<!--用于显示父组件传递过来的子商品内容内容-->
	<div class="container" @click="itemClick">
		<a>
			<div>
				<img :src="goodsItem.show.img" alt="" @load="imgLoad">
			</div>
			<div class="info">
				<p class="title">{{goodsItem.title}}</p>
				<span class="price">￥{{goodsItem.price}}</span>
				<span class="icon"></span>
				<span>{{goodsItem.cfav}}</span>
			</div>
		</a>
	</div>
</template>

<script>
	export default {
		name: "GoodListItem",
		props: {
			// 父组件传递过来的要显示的商品的数据
			goodsItem: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		methods: {
			/*监听每个子元素的图片加载*/
			imgLoad(){
				this.$bus.$emit('imgLoaded') // 发送到Home组件
			},
			/* 监听每个子元素的点击事件，进行商品详情页的跳转 */
			itemClick(){
				// 点击后跳转到详情页  这里业务需求需要返回  所以使用push更合适
				// 跳转的同时携带被点击的商品的id
				this.$router.push('/detail/' + this.goodsItem.iid)
			}
		}
	}
</script>

<style scoped>
	.container{
		display: flex;
		flex-direction: row;
		padding-bottom: 10px;
	}
	.container div{
		flex: 50%;
	}

	.container div img{
		width: 100%;
		height: 100%;
		border-radius: 5%;
	}

	.info{
		/*height: 30px;*/
		/*line-height: 30px;*/
		border: 1px solid #ccc;
		border-radius: 5px;

		/*阴影*/
		box-shadow: -3px -3px 5px 3px #efeeee inset;
	}

	.info .title{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		margin-bottom: 5px;
	}

	.info>.price{
		color: #ff5777;
		margin-left: 10px;
	}

	.info>.icon{
		display: inline-block;
		width: 20px;
		height: 20px;
		vertical-align: middle;
		background-image: url("~assets/img/home/collect.svg");
		background-position: 0 0;
		background-size: cover;
		margin-left: 10px;
	}
</style>