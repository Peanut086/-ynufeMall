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
	import BetterScroll from 'better-scroll'

	export default {
		name: "Scroll",
		data(){
			return {
				scroll: null
			}
		},
		mounted() {
			setTimeout(()=>{
				this.scroll = new BetterScroll(this.$refs.wrapper,{
					probeType: 3,
					click: true
				})
			},1000)
		},
		methods: {
			/* 
			点击返回顶部的方法
			*/
			backTop(x,y,time=400){
				this.scroll.scrollTo(x,y,time)
			}
		}
	}
</script>

<style scoped>

</style>