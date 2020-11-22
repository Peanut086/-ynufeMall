<template>
	<div class="recommend">
		<div v-for="item in recommends">
			<a class="recommend-item" :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RecommendViews",
		// 获取父组件传递过来的首页推荐数据
		props: {
			recommends: {
				type: Array,
				default() {
					return [];
				}
			}
		}
	}
</script>

<style scoped>
	.recommend{
		display: flex;
		justify-content: space-evenly;
		text-align: center;
		padding: 15px 0 35px;
		border-bottom: 10px solid rgba(0,0,0,.1);
	}
	.recommend-item{
		flex: 1;
	}
	.recommend-item img{
		width: 70px;
		height: 70px;
		margin-bottom: 8px;
	}
</style>