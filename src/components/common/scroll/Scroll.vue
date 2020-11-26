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
				pullUpLoad: { // 是否使用上拉刷新
					type: Boolean,
					default:false
				},
				probeType: {  // 保存监听滚动状态的模式
					type: Number,
					default: 0
				}
			}
		},
		mounted() {
			new Promise((resolve,reject)=>{
				setTimeout(()=>{
					this.scroll = new BetterScroll(this.$refs.wrapper,{
						click: true, // 监听原生点击事件
						pullUpLoad: true, // 使用上拉刷新
						probeType: this.probeType
					})
					this.refreshContent()
					resolve()
				},1000) // 这里需要1s后，数据加载完毕重新计算content
			})
			/*监听滚动，控制返回首页按钮的显示*/
			.then(this.showBackTop)
			/*底部上拉刷新*/
			.then(this.pullUpLoads)
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

			/*上拉刷新方法*/
			pullUpLoads(){
				this.scroll.on('pullingUp',()=>{
					this.$emit('pullUp')
				})
			},

			/*停止本次上拉*/
			stopScroll(){
				this.scroll.finishPullUp()
			}
		}
	}
</script>

<style scoped>

</style>