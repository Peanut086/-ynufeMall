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
		props: {
			// 用于自定义是否使用上拉刷新
			pullUpLoad: {
				type: Boolean,
				default: false
			},
			// 用于自定义使用哪种监听模式
			probeType: {
				type: Number,
				default: 0
			}
		},
		mounted() {
			this.scroll = new BetterScroll(this.$refs.wrapper,{
				click: true, // 监听原生点击事件
				pullUpLoad: this.pullUpLoad, // 提供组件使用者自行决定是否使用上拉刷新
				probeType: this.probeType,  // 采用哪种监听滚动的形式：0/1/2/3
			})

			this.showBackTop()

			/*监听在底部时上拉页面滚动*/
			this.scroll.on('pullingUp',()=>{
				// 发送自定义事件
				this.$emit('loading')
			})
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

			/*结束上拉刷新*/
			stopScrollUp(){
				this.scroll.finishPullUp()
			},

			/*返回离开首页时滚动的位置*/
			recover(){

			}
		}
	}
</script>

<style scoped>
	.content{
		padding-bottom: 49px;
	}
</style>