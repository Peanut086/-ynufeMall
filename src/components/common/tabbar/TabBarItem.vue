<template>
	<div class="tab-bar-item" @click="itemClick">
		<div v-if="!isShow"><slot name="icon"></slot></div>
		<div v-else><slot name="icon_active"></slot></div>
		<div :style="toggleColor"><slot name="text"></slot></div>
	</div>
</template>

<script>
	export default {
		name: "TabBarItem",
		props: {
			path:String,
			/*可以自定义传入激活时tabbar的字体颜色*/
			tabColor: {
				type: String,
				default: 'deeppink'
			}
		},
		methods: {
			itemClick(){
				// 避免多次点击同一个路由报错
				if(this.$route.path !== this.path){
					this.$router.push(this.path)
				}
			}
		},
		computed: {
			// 设置激活的组件图片切换
			isShow(){
				return this.$route.path.indexOf(this.path) !== -1
			},
			toggleColor(){
				return this.isShow ? {color: this.tabColor} : {}
			}
		}
	}
</script>

<style scoped>
.tab-bar-item{
	flex: 1;
	text-align: center;
	color: #0f0f0f;
}

	img{
		display: inline-block;
		height: 22px;
		width: 22px;
		vertical-align: middle;
		margin: 5px 0;
	}
</style>