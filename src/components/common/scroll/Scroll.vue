<template>
	<!--用ref引用比用class引用要好 不会冲突-->
	<div ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	/*导入better-scroll插件*/
	import BetterScroll from '@better-scroll/core'

	// 导入上拉刷新插件
	import Pullup from '@better-scroll/pull-up'

	// 使用上拉刷新插件
	BetterScroll.use(Pullup)

	export default {
		name: "Scroll",
		data(){
			return {
				scroll: null,  // 存储better-scroll对象实例
			}
		},
		mounted() {
			this.scroll = new BetterScroll(this.$refs.wrapper,{
				click: true, // 监听原生点击事件
				pullUpLoad: true, // 提供组件使用者自行决定是否使用上拉刷新
				probeType: 3,  // 采用哪种监听滚动的形式：0/1/2/3
			})

			this.showBackTop()
		},

		methods: {
			/* 
			点击返回顶部的方法
			*/
			backTop(x,y,time=400){
				this.scroll.scrollTo(x,y,time)
			},

			/*控制返回顶部按钮的显示*/
			showBackTop(){
				// this.refreshContent()
				this.scroll.on('scroll',(position)=>{
					this.$emit('scroll',position.y)
				})
			},

			/*重新计算content的大小*/
			refreshContent(){
				this.scroll.refresh()
			},
		}
	}
</script>

<style scoped>
	.content{
		padding-bottom: 49px;
	}
</style>